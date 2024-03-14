locals {
  descriptions_queue = "${var.environment}-descriptions"
  images_queue       = "${var.environment}-images"
}

data "aws_caller_identity" "current" {}

resource "aws_iam_role" "process" {
  name               = format("%ProcessApplicationsRole", title(var.environment))
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "aws_iam_policy_document" "process" {
  version = "2012-10-17"
  statement {
    sid    = "ListAndDescribe"
    effect = "Allow"
    actions = [
      "dynamodb:List*",
      "dynamodb:DescribeReservedCapacity*",
      "dynamodb:DescribeLimits",
      "dynamodb:DescribeTimeToLive"
    ]
    resources = ["*"]
  }
  statement {
    sid    = "SpecificTable"
    effect = "Allow"
    actions = [
      "dynamodb:BatchGet*",
      "dynamodb:DescribeStream",
      "dynamodb:DescribeTable",
      "dynamodb:Get*",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchWrite*",
      "dynamodb:CreateTable",
      "dynamodb:Delete*",
      "dynamodb:Update*",
      "dynamodb:PutItem"
    ]
    resources = ["arn:aws:dynamodb:*:*:table/${var.institutions_dynamodb_table}"]
  }
  statement {
    sid       = "ListBuckets"
    actions   = ["s3:ListBucket"]
    effect    = "Allow"
    resources = [var.source.bucket]
  }
  statement {
    sid = "S3ReadOnly"
    actions = [
      "s3:GetObject",
      "s3:List*"
    ]
    effect    = "Allow"
    resources = ["arn:aws:s3:::${var.source.bucket}/*"]
  }
  statement {
    sid    = "WriteQueue"
    effect = "Allow"
    actions = [
      "sqs:SendMessage"
    ]
    resources = [
      "arn:aws:sqs:*:${data.aws_caller_identity.current.account_id}:${local.descriptions_queue}",
      "arn:aws:sqs:*:${data.aws_caller_identity.current.account_id}:${local.images_queue}",
    ]
  }

}

resource "aws_iam_role_policy_attachment" "basic" {
  role       = aws_iam_role.process.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "process" {
  policy = data.aws_iam_policy_document.process.json
  name   = format("%sProcInstPolicy", title(var.environment))
}

resource "aws_iam_role_policy_attachment" "process" {
  role       = aws_iam_role.process.name
  policy_arn = aws_iam_policy.process.arn
}


resource "aws_lambda_function" "process" {
  s3_bucket     = var.artifact_bucket
  s3_key        = var.artifact_path
  function_name = "${var.environment}-process-applications"
  role          = aws_iam_role.process.arn
  handler       = "${var.handler_file}.lambda_handler"

  runtime = "python3.12"

  environment {
    variables = {
      AWS_LAMBDA_EXEC_WRAPPER = "/opt/bootstrap"
      PORT                    = "8080"
    }
  }
  logging_config {
    application_log_level = "INFO"
    log_format            = "json"
    system_log_level      = "INFO"
  }
}

resource "aws_lambda_permission" "s3_lambda" {
  statement_id   = "S3InvokeFunction"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.process.function_name
  principal      = "s3.amazonaws.com"
  source_account = var.source.account
  source_arn     = "arn:aws:s3:::${var.source.bucket}"
}

resource "aws_sqs_queue" "descriptions" {
  name                       = local.descriptions_queue
  delay_seconds              = 0
  max_message_size           = 262144
  message_retention_seconds  = 345600
  receive_wait_time_seconds  = 20
  visibility_timeout_seconds = 30
}
