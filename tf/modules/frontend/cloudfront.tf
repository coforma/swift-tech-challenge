data "aws_cloudfront_cache_policy" "disabled" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_origin_request_policy" "all" {
  name = "Managed-AllViewerExceptHostHeader"
}

data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}


resource "aws_cloudfront_distribution" "distribution" {
  origin {
    domain_name         = local.api_gw_origin_id
    origin_id           = local.api_gw_origin_id
    connection_attempts = 3
    connection_timeout  = 10

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "https-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1.2",
      ]
    }
  }
  origin {
    domain_name              = aws_s3_bucket.static.bucket_regional_domain_name
    origin_id                = "next-static-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_path              = var.static_next_path
  }
  ordered_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS",
    ]
    cache_policy_id = data.aws_cloudfront_cache_policy.optimized.id
    cached_methods = [
      "GET",
      "HEAD",
    ]
    compress               = true
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0
    path_pattern           = "/institution-images/*"
    smooth_streaming       = false
    target_origin_id       = "next-static-origin"
    trusted_key_groups     = []
    trusted_signers        = []
    viewer_protocol_policy = "redirect-to-https"
  }
  ordered_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS",
    ]
    cache_policy_id = data.aws_cloudfront_cache_policy.optimized.id
    cached_methods = [
      "GET",
      "HEAD",
    ]
    compress               = true
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0
    path_pattern           = "/_next/static/*"
    smooth_streaming       = false
    target_origin_id       = "next-static-origin"
    trusted_key_groups     = []
    trusted_signers        = []
    viewer_protocol_policy = "redirect-to-https"
  }

  enabled         = true
  is_ipv6_enabled = true

  #TODO: Add logging

  default_cache_behavior {
    allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods  = ["GET", "HEAD"]

    viewer_protocol_policy   = "allow-all"
    min_ttl                  = 0
    cache_policy_id          = data.aws_cloudfront_cache_policy.disabled.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all.id
    compress                 = true
    default_ttl              = 0
    max_ttl                  = 0
    target_origin_id         = local.api_gw_origin_id
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
  price_class = "PriceClass_100"
}

resource "aws_s3_bucket" "static" {
  bucket = var.static_bucket
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "cloudfront OAC (${var.environment})"
  description                       = "Default S3 OAC (${var.environment})"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_iam_policy_document" "static" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "aws:SourceArn"
      values   = [aws_cloudfront_distribution.distribution.arn]
    }
  }
  statement {
    actions = ["s3:GetObject", "s3:ListBucket"]
    resources = [
      "${aws_s3_bucket.static.arn}/*",
      "${aws_s3_bucket.static.arn}"
    ]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_policy" "static" {
  bucket = aws_s3_bucket.static.id
  policy = data.aws_iam_policy_document.static.json
}
