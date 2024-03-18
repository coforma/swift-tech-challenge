resource "aws_applicationinsights_application" "application" {
  resource_group_name = aws_resourcegroups_group.application.name
}

resource "aws_resourcegroups_group" "application" {
  name = format("%s-Application", title(var.environment))

  resource_query {
    query = jsonencode({
      ResourceTypeFilters = [
        "AWS::Lambda::Function",
        "AWS::ApiGateway::Stage",
        "AWS::CloudFront::Distribution"
      ]

      TagFilters = [
        {
          Key = "Environment"
          Values = [
            var.environment,
            title(var.environment)
          ]
        },
        {
          Key = "Project"
          Values = [
            "Application"
          ]
        },
      ]
    })
  }
}

resource "aws_cloudwatch_metric_alarm" "concurrency" {
  dimensions = {
    Environment  = title(var.environment)
    FunctionName = aws_lambda_function.frontend.function_name
  }
  alarm_name                = format("%s-ConcurrentExecutions", title(var.environment))
  comparison_operator       = "GreaterThanThreshold"
  evaluation_periods        = 10
  metric_name               = "ConcurrentExecutions"
  namespace                 = "AWS/Lambda"
  period                    = 60
  statistic                 = "Maximum"
  threshold                 = 360
  alarm_description         = "This metric measures function concurrency"
  insufficient_data_actions = []
  datapoints_to_alarm       = 10
}

resource "aws_cloudwatch_metric_alarm" "errors" {
  dimensions = {
    Environment  = title(var.environment)
    FunctionName = aws_lambda_function.frontend.function_name
  }
  alarm_name          = format("%s-ApplicationErrors", title(var.environment))
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 3
  metric_name         = "Errors"
  namespace           = "AWS/Lambda"
  period              = 60
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "This alarm detects high error counts. Errors includes the exceptions thrown by the code as well as exceptions thrown by the Lambda runtime. You can check the logs related to the function to diagnose the issu"
  datapoints_to_alarm = 3
}

resource "aws_cloudwatch_metric_alarm" "throttles" {
  dimensions = {
    Environment  = title(var.environment)
    FunctionName = aws_lambda_function.frontend.function_name
  }
  alarm_name          = format("%s-ApplicationThrottles", title(var.environment))
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 5
  metric_name         = "Throttles"
  namespace           = "AWS/Lambda"
  period              = 60
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "This alarm detects a high number of throttled invocation requests."
  datapoints_to_alarm = 5
}

resource "aws_cloudwatch_metric_alarm" "duration" {
  dimensions = {
    Environment  = title(var.environment)
    FunctionName = aws_lambda_function.frontend.function_name
  }
  alarm_name          = format("%s-ApplicationDuration", title(var.environment))
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 15
  metric_name         = "Errors"
  namespace           = "AWS/Lambda"
  period              = 60
  threshold           = 10
  alarm_description   = "This alarm detects long duration times for processing an event by a Lambda function."
  datapoints_to_alarm = 15
  extended_statistic  = "p90"
}

# resource "aws_cloudwatch_metric_alarm" "memory_utilization" {
#   alarm_name                = format("%s-ApplicationMemoryUtil",title(var.environment))
#   comparison_operator       = "GreaterThanThreshold"
#   evaluation_periods        = 10
#   metric_name               = "Errors"
#   namespace                 = "AWS/Lambda"
#   period                    = 60
#   statistic                 = "Sum"
#   threshold                 = 90.0
#   alarm_description         = "This alarm is used to detect if the memory utilization of a lambda function is approaching the configured limit."
#   datapoints_to_alarm       = 1
# }
