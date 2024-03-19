data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = "${path.module}/tmp/lambda.zip"

  source {
    content  = file("${path.module}/../../../../../utilities/data-ingestion/get-institution-image-from-bedrock.py")
    filename = "lambda_function.py"
  }
}

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

resource "aws_iam_role" "role" {
  name               = format("%sGetImagesRole", title(var.environment))
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
    resources = ["arn:aws:s3:::${var.images_bucket.name}"]
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
    resources = ["arn:aws:s3:::${var.images_bucket.name}/*"]
  }
  statement {
    sid    = "ReadQueue"
    effect = "Allow"
    actions = [
      "sqs:DeleteMessage",
      "sqs:ReceiveMessage",
      "sqs:GetQueueAttributes",
    ]
    resources = [
      var.queue.arn,
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
  filename         = "${path.module}/tmp/lambda.zip"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  function_name    = "${var.environment}-get-images"
  role             = aws_iam_role.role.arn
  handler          = "lambda_function.lambda_handler"

  runtime     = "python3.12"
  timeout     = 20
  memory_size = 512
  environment {
    variables = {
      DYNAMODB_TABLE = var.institutions_dynamodb_table
      IMAGES_BUCKET  = var.images_bucket.name
    }
  }
  logging_config {
    application_log_level = "INFO"
    log_format            = "JSON"
    system_log_level      = "INFO"
  }
}

resource "aws_lambda_permission" "sqs_lambda" {
  statement_id   = "SQSInvokeFunction"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.function.function_name
  principal      = "sqs.amazonaws.com"
  source_account = var.queue.account
  source_arn     = var.queue.arn
}

resource "aws_lambda_event_source_mapping" "trigger" {
  event_source_arn = var.queue.arn
  function_name    = aws_lambda_function.function.arn
  batch_size       = 1
  scaling_config {
    maximum_concurrency = 7
  }
}
