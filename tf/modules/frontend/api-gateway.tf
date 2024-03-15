locals {
  api_gw_origin_id = "${aws_apigatewayv2_api.app.id}.execute-api.${data.aws_region.current.name}.amazonaws.com"
}

resource "aws_apigatewayv2_api" "app" {
  name          = "App${var.environment}"
  protocol_type = "HTTP"
  description   = format("Serverless REST API - (%s)", title(var.environment))
}

resource "aws_apigatewayv2_integration" "app" {
  api_id                 = aws_apigatewayv2_api.app.id
  integration_type       = "AWS_PROXY"
  connection_type        = "INTERNET"
  description            = "Lambda Integration"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_alias.alias.invoke_arn
}

resource "aws_apigatewayv2_route" "app" {
  api_id    = aws_apigatewayv2_api.app.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.app.id}"
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id      = aws_apigatewayv2_api.app.id
  name        = "$default"
  auto_deploy = true
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

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.frontend.function_name
  principal     = "apigateway.amazonaws.com"
  qualifier     = aws_lambda_alias.alias.name
  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "${aws_apigatewayv2_api.app.execution_arn}/*/*/{proxy+}"
}
