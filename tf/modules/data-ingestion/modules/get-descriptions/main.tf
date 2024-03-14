
locals {
  lambda_s3_key = var.artifact.path != "" ? "${var.artifact.path}/${source_file}" : var.source_file
}

resource "aws_iam_role" "role" {
  name               = format("%GetDescriptionsRole", title(var.environment))
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "aws_iam_policy_document" "policy_doc" {
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
    sid = "S3ReadWrite"
    actions = [
      "s3:PutObject",
      "s3:DeleteObject",
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
      "sqs:DeleteMessage",
      "sqs:RecieveMessage",
      "sqs:GetQueueAttributes",
    ]
    resources = [
      "arn:aws:sqs:*:${var.queue.account}:${var.queue.name}",
    ]
  }
}

resource "aws_iam_role_policy_attachment" "basic" {
  role       = aws_iam_role.role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "get_desc" {
  policy = data.aws_iam_policy_document.policy_doc.json
  name   = format("%sGetDescPolicy", title(var.environment))
}

resource "aws_iam_role_policy_attachment" "get_desc" {
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.get_desc.arn
}

resource "aws_iam_role_policy_attachment" "bedrock" {
  role       = aws_iam_role.role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonBedrockFullAccess"
}

resource "aws_lambda_function" "function" {
  s3_bucket     = var.artifact.bucket
  s3_key        = local.lambda_s3_key
  function_name = "${var.environment}-get-descriptions"
  role          = aws_iam_role.role.arn
  handler       = "${var.artifact.handler_file}.lambda_handler"

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

resource "aws_lambda_permission" "sqs_lambda" {
  statement_id   = "SQSInvokeFunction"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.function.function_name
  principal      = "sqs.amazonaws.com"
  source_account = var.source.account
  source_arn     = "arn:aws:sqs:::${var.queue.name}"
}
