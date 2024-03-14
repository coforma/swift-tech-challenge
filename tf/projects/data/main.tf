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

terraform {
  backend "s3" {}
}

# resource "aws_dynamodb_table" "institutions" {
#   name           = var.institutions_dynamodb_table
#   deletion_protection_enabled = false
#   hash_key                    = "institutionId"
#   range_key                   = "recordType"
#   stream_enabled              = false

#   table_class                 = "STANDARD"

#    attribute {
#       name = "institutionId"
#       type = "N"
#   }
#   attribute {
#       name = "recordType"
#       type = "S"
#   }


#   point_in_time_recovery {
#       enabled = false
#   }
#   read_capacity = 1
#   write_capacity = 1
# }

# resource "aws_s3_bucket" "source" {
#   bucket = var.source_bucket
# }

# resource "aws_s3_bucket" "institution_images" {
#   bucket = var.institution_images_bucket
# }
