output "api_gw_url" {
  value = aws_apigatewayv2_stage.stage.invoke_url
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.distribution.domain_name
}