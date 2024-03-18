provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Environment = title(var.environment)
      Project     = "Monitoring"
      ManagedBy   = "Terraform"
    }
  }
}

terraform {
  backend "s3" {}
}

data "aws_caller_identity" "current" {}
