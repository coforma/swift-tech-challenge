

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
    sid    = "WriteApplicantsDynamoDB"
    effect = "Allow"
    actions = [
      "dynamodb:*"
    ]
    resources = [
      "arn:aws:dynamodb:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:table/${var.applicants_dynamodb_table}"
    ]
  }
  statement {
    sid = "ListImagesBucket"
    actions = [
      "s3:ListBucket"
    ]
    resources = [
      var.images_bucket.arn
    ]
  }
  statement {
    sid    = "ReadImagesBucket"
    effect = "Allow"
    actions = [
      "s3:GetObject"
    ]
    resources = [
      "${var.images_bucket.arn}/*"
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

resource "aws_iam_role_policy_attachment" "insights_policy" {
  role       = aws_iam_role.iam_for_lambda.id
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLambdaInsightsExecutionRolePolicy"
}

resource "aws_lambda_function" "frontend" {
  s3_bucket     = var.artifact_bucket
  s3_key        = "${var.artifact_path}${var.zip_file_name}"
  function_name = "${var.environment}-frontend"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "run.sh"

  runtime     = "nodejs20.x"
  timeout     = 30
  memory_size = 512

  environment {
    variables = {
      AWS_LAMBDA_EXEC_WRAPPER            = "/opt/bootstrap"
      PORT                               = "8080"
      CDN_HOST                           = aws_cloudfront_distribution.distribution.domain_name
      NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN = data.aws_secretsmanager_secret_version.mixpanel.secret_string
      API_GATEWAY                        = local.api_gw_origin_id
      IMAGES_BUCKET                      = var.images_bucket.name
      INSTITUTIONS_DYNAMODB_TABLE        = var.institutions_dynamodb_table
      APPLICANTS_DYNAMODB_TABLE          = var.applicants_dynamodb_table
    }
  }
  layers = [
    "arn:aws:lambda:${data.aws_region.current.name}:753240598075:layer:LambdaAdapterLayerX86:20",
    "arn:aws:lambda:${data.aws_region.current.name}:580247275435:layer:LambdaInsightsExtension:49"
  ]
  logging_config {
    log_format = "JSON"
  }
  publish = true
}

resource "aws_lambda_alias" "alias" {
  name             = "${var.environment}-app-latest"
  description      = "Lambda Alias exposed to API Gateway"
  function_name    = aws_lambda_function.frontend.arn
  function_version = aws_lambda_function.frontend.version
  lifecycle {
    ignore_changes = [
      routing_config,
      function_version
    ]
  }
}

resource "aws_lambda_provisioned_concurrency_config" "baseline" {
  #If provisioned concurrency is 0 then do not create this resource
  count                             = var.provisioned_concurrency == 0 ? 0 : 1
  function_name                     = aws_lambda_function.frontend.function_name
  provisioned_concurrent_executions = var.provisioned_concurrency
  qualifier                         = aws_lambda_alias.alias.name
}

resource "aws_secretsmanager_secret" "mixpanel" {
  name = "${var.environment}/app/mixpanel"
}

data "aws_secretsmanager_secret_version" "mixpanel" {
  secret_id = aws_secretsmanager_secret.mixpanel.id
}
