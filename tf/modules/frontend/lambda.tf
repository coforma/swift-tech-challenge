resource "aws_iam_role" "iam_for_lambda" {
  name               = format("%sFrontendLambdaRole", title(var.environment))
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy_attachment" "exec" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaDynamoDBExecutionRole"
}

data "aws_iam_policy_document" "backend" {
  statement {
    sid    = "ReadDynamoDB"
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:BatchGetItem",
      "dynamodb:Scan",
      "dynamodb:Query",
      "dynamodb:ConditionCheckItem"
    ]
    resources = [
      "arn:aws:dynamodb:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:table/${var.institutions_dynamodb_table}"
    ]
  }
  statement {
    sid = "ListImagesBucket"
    actions = [
      "s3:ListBucket"
    ]
    resources = [
      var.images_bucket_arn
    ]
  }
  statement {
    sid = "ReadBucket"
    actions = [
      "s3:GetObject"
    ]
    resources = [
      "${var.images_bucket_arn}/*"
    ]
  }
}

resource "aws_iam_policy" "backend" {
  policy = data.aws_iam_policy_document.backend.json
  name   = format("%sAppBackendAccessPolicy", title(var.environment))
}

resource "aws_iam_role_policy_attachment" "backend" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.backend.arn
}

resource "aws_lambda_function" "frontend" {
  s3_bucket     = var.artifact_bucket
  s3_key        = "${var.artifact_path}${var.zip_file_name}"
  function_name = "${var.environment}-frontend"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "run.sh"

  runtime = "nodejs20.x"

  environment {
    variables = {
      AWS_LAMBDA_EXEC_WRAPPER = "/opt/bootstrap"
      PORT                    = "8080"
    }
  }
  layers = [
    "arn:aws:lambda:${data.aws_region.current.name}:753240598075:layer:LambdaAdapterLayerX86:20"
  ]
  logging_config {
    log_format = "JSON"
  }
}




data "aws_iam_policy_document" "gw_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}
