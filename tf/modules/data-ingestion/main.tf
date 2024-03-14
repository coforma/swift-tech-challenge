locals {
  descriptions_queue = "${var.environment}-descriptions"
  images_queue       = "${var.environment}-images"
}

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
