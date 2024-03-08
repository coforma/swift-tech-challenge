## Temporary Project to validate pipelines
## TODO: Remove when real project exists

provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {}
}

resource "aws_s3_bucket" "test" {
  bucket = var.bucket_name
}