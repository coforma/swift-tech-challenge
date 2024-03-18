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
    name    = aws_sqs_queue.descriptions.name
    account = data.aws_caller_identity.current.account_id
    arn     = aws_sqs_queue.descriptions.arn
  }
}

module "get_images" {
  source                      = "./modules/get-images"
  environment                 = var.environment
  images_bucket               = var.images_bucket
  institutions_dynamodb_table = var.institutions_dynamodb_table
  queue = {
    name    = aws_sqs_queue.images.name
    account = data.aws_caller_identity.current.account_id
    arn     = aws_sqs_queue.images.arn
  }
}

module "process_applications" {
  source                      = "./modules/process-applications"
  environment                 = var.environment
  institutions_dynamodb_table = var.institutions_dynamodb_table
  source_bucket               = var.source_bucket
}

module "process_institutions" {
  source                      = "./modules/process-institutions"
  environment                 = var.environment
  institutions_dynamodb_table = var.institutions_dynamodb_table
  source_bucket               = var.source_bucket
  images_queue = {
    url  = aws_sqs_queue.images.url
    name = aws_sqs_queue.images.name
  }
  descriptions_queue = {
    url  = aws_sqs_queue.descriptions.url
    name = aws_sqs_queue.descriptions.name
  }
}

## This must be declared at the data-ingestion scope because terraform only supports a single notification
## instance for each bucket

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = var.source_bucket.name

  lambda_function {
    lambda_function_arn = module.process_applications.lambda_function_arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "applications/"
    filter_suffix       = ".csv"
  }
  lambda_function {
    lambda_function_arn = module.process_institutions.lambda_function_arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "institutions/"
    filter_suffix       = ".csv"
  }

  depends_on = [
    module.process_applications,
    module.process_institutions
  ]
}
