

resource "aws_iam_role" "iam_for_lambda" {
  name               = format("%sFrontendLambdaRole", title(var.environment))
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
    resources = ["arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:log-group:aws/lambda/${aws_lambda_function.frontend.function_name}:*"]
  }
}

resource "aws_iam_policy" "logging" {
  name        = format("%sFrontendLoggingPolicy", title(var.environment))
  description = "Allows creating and writing to Frontend log group"
  policy      = data.aws_iam_policy_document.logging.json
}

resource "aws_iam_role_policy_attachment" "logging" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.logging.arn
}

resource "aws_lambda_function" "frontend" {
  s3_bucket     = var.artifact_bucket
  s3_key        = "${var.artifact_path}${var.zip_file_name}"
  function_name = "${var.environment}-frontend"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "run.sh"

  runtime = "nodejs20.x"
  timeout = 10

  environment {
    variables = {
      AWS_LAMBDA_EXEC_WRAPPER            = "/opt/bootstrap"
      PORT                               = "8080"
      CDN_HOST                           = aws_cloudfront_distribution.distribution.domain_name
      NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN = data.aws_secretsmanager_secret_version.mixpanel.secret_string
      API_GATEWAY                        = local.api_gw_origin_id
    }
  }
  layers = [
    "arn:aws:lambda:${data.aws_region.current.name}:753240598075:layer:LambdaAdapterLayerX86:20"
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
