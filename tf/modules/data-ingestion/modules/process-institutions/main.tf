
data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = "${path.module}/tmp/lambda.zip"

  source {
    content  = file("${path.module}/../../../../../utilities/data-ingestion/ingest-institutions.py")
    filename = "lambda_function.py"
  }
}

data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "process" {
  name               = format("%sProcessInstitutionsRole", title(var.environment))
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
    resources = ["arn:aws:s3:::${var.source_bucket.name}"]
  }
  statement {
    sid = "S3ReadOnly"
    actions = [
      "s3:GetObject",
      "s3:List*"
    ]
    effect    = "Allow"
    resources = ["arn:aws:s3:::${var.source_bucket.name}/*"]
  }
  statement {
    sid    = "WriteQueue"
    effect = "Allow"
    actions = [
      "sqs:SendMessage"
    ]
    resources = [
      "arn:aws:sqs:*:${data.aws_caller_identity.current.account_id}:${var.descriptions_queue.name}",
      "arn:aws:sqs:*:${data.aws_caller_identity.current.account_id}:${var.images_queue.name}",
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
  filename         = "${path.module}/tmp/lambda.zip"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  function_name    = "${var.environment}-process-institutions"
  role             = aws_iam_role.process.arn
  handler          = "lambda_function.lambda_handler"
  timeout          = 600
  runtime          = "python3.12"

  environment {
    variables = {
      DYNAMODB_TABLE         = var.institutions_dynamodb_table
      IMAGES_QUEUE_URL       = var.images_queue.url
      DESCRIPTIONS_QUEUE_URL = var.descriptions_queue.url
    }
  }
  logging_config {
    application_log_level = "INFO"
    log_format            = "JSON"
    system_log_level      = "INFO"
  }
}

resource "aws_lambda_permission" "s3_lambda" {
  statement_id   = "S3InvokeFunction"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.process.function_name
  principal      = "s3.amazonaws.com"
  source_account = var.source_bucket.account
  source_arn     = "arn:aws:s3:::${var.source_bucket.name}"
}
