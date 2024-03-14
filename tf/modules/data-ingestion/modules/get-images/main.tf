
locals {
  lambda_s3_key = var.artifact.path != "" ? "${var.artifact.path}/${source_file}" : var.source_file
}

resource "aws_iam_role" "role" {
  name               = format("%GetImagesRole", title(var.environment))
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "aws_iam_policy_document" "policy_doc" {
  version = "2012-10-17"
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
    resources = ["arn:aws:s3:::${var.images.bucket}/*"]
  }
  statement {
    sid    = "ReadQueue"
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

resource "aws_iam_policy" "get_image" {
  policy = data.aws_iam_policy_document.policy_doc.json
  name   = format("%sGetImagePolicy", title(var.environment))
}

resource "aws_iam_role_policy_attachment" "get_image" {
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.get_image.arn
}

resource "aws_iam_role_policy_attachment" "bedrock" {
  role       = aws_iam_role.role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonBedrockFullAccess"
}

resource "aws_lambda_function" "function" {
  s3_bucket     = var.artifact.bucket
  s3_key        = local.lambda_s3_key
  function_name = "${var.environment}-get-images"
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
  source_account = var.queue.account
  source_arn     = "arn:aws:sqs:::${var.queue.name}"
}
