locals {
  lambda_s3_key = var.artifact.path != "" ? "${var.artifact.path}/${var.artifact.handler_file}.py" : "${var.artifact.handler_file}.py"
}

resource "aws_iam_role" "ingest" {
  name               = format("%IngestApplicationsRole", title(var.environment))
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

#Policy Doc for creating logs in CloudWatch
data "aws_iam_policy_document" "logging" {
  statement {
    effect    = "Allow"
    actions   = ["logs:CreateGroup"]
    resources = ["arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:log-group:aws/lambda/${aws_lambda_function.process_applications.function_name}:*"]
  }
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
    actions   = ["s3:ListBucket"]
    effect    = "Allow"
    resources = [var.source.bucket]
  }
  statement {
    actions = [
      "s3:GetObject",
      "s3:List*"
    ]
    effect    = "Allow"
    resources = ["arn:aws:s3:::${var.source.bucket}/*"]
  }
}

resource "aws_iam_policy" "logging" {
  name        = format("%sProcAppLoggingPolicy", title(var.environment))
  description = "Allows creating and writing to ${var.environment} process applications log group"
  policy      = data.aws_iam_policy_document.logging.json
}

resource "aws_iam_role_policy_attachment" "logging" {
  role       = aws_iam_role.ingest.name
  policy_arn = aws_iam_policy.logging.arn
}

resource "aws_lambda_function" "process_applications" {
  s3_bucket     = var.artifact.bucket
  s3_key        = local.lambda_s3_key
  function_name = "${var.environment}-ingest-applications"
  role          = aws_iam_role.ingest.arn
  handler       = "${var.artifact.handler_file}.lambda_handler"

  runtime = "python3.12"

  logging_config {
    application_log_level = "INFO"
    log_format            = "json"
    system_log_level      = "INFO"
  }
}

resource "aws_lambda_permission" "s3_lambda" {
  statement_id   = "S3InvokeFunction"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.ingest.function_name
  principal      = "s3.amazonaws.com"
  source_account = var.source.account
  source_arn     = "arn:aws:s3:::${var.source.bucket}"
}
