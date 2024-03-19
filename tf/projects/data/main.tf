provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Environment = title(var.environment)
      Project     = "Data"
      ManagedBy   = "Terraform"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  alias  = "ingestion-aws"
  default_tags {
    tags = {
      Environment = title(var.environment)
      Project     = "DataIngestion"
      ManagedBy   = "Terraform"
    }
  }
}

terraform {
  backend "s3" {}
}

data "aws_caller_identity" "current" {}

resource "aws_dynamodb_table" "institutions" {
  name                        = var.institutions_dynamodb_table
  deletion_protection_enabled = false
  hash_key                    = "institutionId"
  range_key                   = "recordType"
  stream_enabled              = false
  billing_mode                = "PAY_PER_REQUEST"

  table_class = "STANDARD"

  attribute {
    name = "institutionId"
    type = "N"
  }
  attribute {
    name = "recordType"
    type = "S"
  }


  point_in_time_recovery {
    enabled = false
  }
}

resource "aws_s3_bucket" "source" {
  bucket = var.source_bucket
}

resource "aws_s3_bucket" "institution_images" {
  bucket = var.institution_images_bucket
}

resource "aws_dynamodb_table" "applicants" {
  name                        = var.applicants_dynamodb_table
  deletion_protection_enabled = false
  hash_key                    = "email"
  range_key                   = "recordType"
  stream_enabled              = false
  billing_mode                = "PAY_PER_REQUEST"

  table_class = "STANDARD"

  attribute {
    name = "email"
    type = "S"
  }
  attribute {
    name = "recordType"
    type = "S"
  }

  point_in_time_recovery {
    enabled = false
  }
}

resource "aws_s3_bucket_public_access_block" "institution_images" {
  bucket = aws_s3_bucket.institution_images.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public" {
  bucket = aws_s3_bucket.institution_images.id
  policy = data.aws_iam_policy_document.public.json
}

data "aws_iam_policy_document" "public" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
      "s3:ListBucket",
    ]

    resources = [
      aws_s3_bucket.institution_images.arn,
      "${aws_s3_bucket.institution_images.arn}/*",
    ]
  }
}



module "data_ingestion" {
  source                      = "../../modules/data-ingestion"
  institutions_dynamodb_table = aws_dynamodb_table.institutions.name
  source_bucket = {
    name    = aws_s3_bucket.source.bucket
    account = data.aws_caller_identity.current.account_id
  }
  images_bucket = {
    name    = aws_s3_bucket.institution_images.bucket
    account = data.aws_caller_identity.current.account_id
  }
  environment = var.environment
  providers = {
    aws = aws.ingestion-aws
  }
}
