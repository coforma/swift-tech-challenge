locals {
  descriptions_queue = "${var.environment}-descriptions"
  images_queue       = "${var.environment}-images"
}

data "aws_caller_identity" "current" {}

resource "aws_sqs_queue" "descriptions" {
  name                       = local.descriptions_queue
  delay_seconds              = 0
  max_message_size           = 262144
  message_retention_seconds  = 345600
  receive_wait_time_seconds  = 20
  visibility_timeout_seconds = 30
}

resource "aws_sqs_queue" "images" {
  name                       = local.images_queue
  delay_seconds              = 0
  max_message_size           = 262144
  message_retention_seconds  = 345600
  receive_wait_time_seconds  = 20
  visibility_timeout_seconds = 30
}

module "get_descriptions" {
  source                      = "./modules/get-descriptions"
  environment                 = var.environment
  institutions_dynamodb_table = var.institutions_dynamodb_table
  source_bucket               = var.source_bucket
  queue = {
    name    = local.images_queue
    account = data.aws_caller_identity.current.account_id
  }
}
