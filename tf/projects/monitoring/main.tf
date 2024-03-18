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

locals {
  application_lambda_function = var.application_lambda_function == null ? "${var.environment}-frontend" : var.application_lambda_function
  institutions_dynamodb_table = var.institutions_dynamodb_table == null ? "institutions-${var.environment}" : var.institutions_dynamodb_table
  applicants_dynamodb_table   = var.applicants_dynamodb_table == null ? "applicants-${var.environment}" : var.applicants_dynamodb_table
}
