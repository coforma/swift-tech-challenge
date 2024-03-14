

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

  environment {
    variables = {
      AWS_LAMBDA_EXEC_WRAPPER = "/opt/bootstrap"
      PORT                    = "8080"
    }
  }
  layers = [
    "arn:aws:lambda:${data.aws_region.current.name}:753240598075:layer:LambdaAdapterLayerX86:20"
  ]
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
