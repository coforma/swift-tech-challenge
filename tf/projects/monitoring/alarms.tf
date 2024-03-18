resource "aws_applicationinsights_application" "application" {
  resource_group_name = aws_resourcegroups_group.application.name
  auto_config_enabled = true
  auto_create         = true
  cwe_monitor_enabled = true
}

resource "aws_resourcegroups_group" "application" {
  name = format("%s-Application", title(var.environment))

  resource_query {
    query = jsonencode({
      ResourceTypeFilters = [
        "AWS::AllSupported"
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
            "Application",
            "Data"
          ]
        },
      ]
    })
  }
}

resource "aws_cloudwatch_metric_alarm" "concurrency" {
  dimensions = {
    Environment  = title(var.environment)
    FunctionName = var.application_lambda_function
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

resource "aws_cloudwatch_metric_alarm" "memory" {
  dimensions = {
    Environment  = title(var.environment)
    FunctionName = var.application_lambda_function
  }
  alarm_name                = format("%s-ApplicationMemoryUtil", title(var.environment))
  comparison_operator       = "GreaterThanThreshold"
  evaluation_periods        = 10
  metric_name               = "memory_utilization"
  namespace                 = "LambdaInsights"
  period                    = 60
  statistic                 = "Maximum"
  threshold                 = 90
  alarm_description         = "This metric measures memory utilization"
  insufficient_data_actions = []
  datapoints_to_alarm       = 10
}

# resource "aws_cloudwatch_metric_alarm" "errors" {
#   dimensions = {
#     Environment  = title(var.environment)
#     FunctionName = var.application_lambda_function
#   }
#   alarm_name          = format("%s-ApplicationErrors", title(var.environment))
#   comparison_operator = "GreaterThanThreshold"
#   evaluation_periods  = 3
#   metric_name         = "Errors"
#   namespace           = "AWS/Lambda"
#   period              = 60
#   statistic           = "Sum"
#   threshold           = 5
#   alarm_description   = "This alarm detects high error counts. Errors includes the exceptions thrown by the code as well as exceptions thrown by the Lambda runtime. You can check the logs related to the function to diagnose the issu"
#   datapoints_to_alarm = 3
# }

# resource "aws_cloudwatch_metric_alarm" "throttles" {
#   dimensions = {
#     Environment  = title(var.environment)
#     FunctionName = var.application_lambda_function
#   }
#   alarm_name          = format("%s-ApplicationThrottles", title(var.environment))
#   comparison_operator = "GreaterThanOrEqualToThreshold"
#   evaluation_periods  = 5
#   metric_name         = "Throttles"
#   namespace           = "AWS/Lambda"
#   period              = 60
#   statistic           = "Sum"
#   threshold           = 5
#   alarm_description   = "This alarm detects a high number of throttled invocation requests."
#   datapoints_to_alarm = 5
# }

# resource "aws_cloudwatch_metric_alarm" "duration" {
#   dimensions = {
#     Environment  = title(var.environment)
#     FunctionName = var.application_lambda_function
#   }
#   alarm_name          = format("%s-ApplicationDuration", title(var.environment))
#   comparison_operator = "GreaterThanThreshold"
#   evaluation_periods  = 15
#   metric_name         = "Errors"
#   namespace           = "AWS/Lambda"
#   period              = 60
#   threshold           = 10
#   alarm_description   = "This alarm detects long duration times for processing an event by a Lambda function."
#   datapoints_to_alarm = 15
#   extended_statistic  = "p90"
# }


resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = format("%s-ApplicationDashboard")

  dashboard_body = jsonencode({
    "widgets" : [
      {
        "height" : 2,
        "width" : 24,
        "y" : 0,
        "x" : 0,
        "type" : "text",
        "properties" : {
          "markdown" : "# Application Integration"
        }
      },
      {
        "height" : 2,
        "width" : 24,
        "y" : 2,
        "x" : 0,
        "type" : "text",
        "properties" : {
          "markdown" : "### SQS"
        }
      },
      {
        "height" : 6,
        "width" : 12,
        "y" : 4,
        "x" : 0,
        "type" : "metric",
        "properties" : {
          "view" : "timeSeries",
          "stacked" : false,
          "metrics" : [
            ["AWS/SQS", "NumberOfMessagesSent", "QueueName", "${var.environment}-descriptions"],
            ["AWS/SQS", "NumberOfMessagesSent", "QueueName", "{var.environment}-images"]
          ],
          "region" : "us-east-1",
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 6,
        "width" : 12,
        "y" : 4,
        "x" : 12,
        "type" : "metric",
        "properties" : {
          "view" : "timeSeries",
          "stacked" : false,
          "metrics" : [
            ["AWS/SQS", "ApproximateAgeOfOldestMessage", "QueueName", "{var.environment}-descriptions"],
            ["AWS/SQS", "ApproximateAgeOfOldestMessage", "QueueName", "{var.environment}-images"]
          ],
          "region" : "us-east-1",
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 6,
        "width" : 24,
        "y" : 10,
        "x" : 0,
        "type" : "metric",
        "properties" : {
          "view" : "timeSeries",
          "stacked" : false,
          "metrics" : [
            ["AWS/SQS", "ApproximateNumberOfMessagesVisible", "QueueName", "{var.environment}-descriptions"],
            ["AWS/SQS", "ApproximateNumberOfMessagesVisible", "QueueName", "{var.environment}-images"]
          ],
          "region" : "us-east-1",
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 6,
        "width" : 24,
        "y" : 16,
        "x" : 0,
        "type" : "alarm",
        "properties" : {
          "title" : "Alarms",
          "alarms" : [
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/SQS/NumberOfMessagesSent/${var.environment}-descriptions/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/SQS/ApproximateNumberOfMessagesVisible/${var.environment}-descriptions/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/SQS/ApproximateAgeOfOldestMessage/${var.environment}-descriptions/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/SQS/NumberOfMessagesSent/${var.environment}-images/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/SQS/ApproximateNumberOfMessagesVisible/${var.environment}-images/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/SQS/ApproximateAgeOfOldestMessage/${var.environment}-images/"
          ],
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 2,
        "width" : 24,
        "y" : 22,
        "x" : 0,
        "type" : "text",
        "properties" : {
          "markdown" : "# Compute"
        }
      },
      {
        "height" : 2,
        "width" : 24,
        "y" : 24,
        "x" : 0,
        "type" : "text",
        "properties" : {
          "markdown" : "### Lambda"
        }
      },
      {
        "height" : 6,
        "width" : 12,
        "y" : 26,
        "x" : 0,
        "type" : "metric",
        "properties" : {
          "view" : "timeSeries",
          "stacked" : false,
          "metrics" : [
            ["AWS/Lambda", "Errors", "FunctionName", "${var.environment}-process-institutions"],
            ["AWS/Lambda", "Errors", "FunctionName", "${var.environment}-frontend"],
            ["AWS/Lambda", "Errors", "FunctionName", "${var.environment}-get-descriptions"],
            ["AWS/Lambda", "Errors", "FunctionName", "${var.environment}-process-applications"],
            ["AWS/Lambda", "Errors", "FunctionName", "${var.environment}-get-images"]
          ],
          "region" : "us-east-1",
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 6,
        "width" : 12,
        "y" : 26,
        "x" : 12,
        "type" : "metric",
        "properties" : {
          "view" : "timeSeries",
          "stacked" : false,
          "metrics" : [
            ["AWS/Lambda", "Throttles", "FunctionName", "${var.environment}-process-institutions"],
            ["AWS/Lambda", "Throttles", "FunctionName", "${var.environment}-frontend"],
            ["AWS/Lambda", "Throttles", "FunctionName", "${var.environment}-get-descriptions"],
            ["AWS/Lambda", "Throttles", "FunctionName", "${var.environment}-process-applications"],
            ["AWS/Lambda", "Throttles", "FunctionName", "${var.environment}-get-images"]
          ],
          "region" : "us-east-1",
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 6,
        "width" : 24,
        "y" : 32,
        "x" : 0,
        "type" : "metric",
        "properties" : {
          "view" : "timeSeries",
          "stacked" : false,
          "metrics" : [
            ["AWS/Lambda", "Duration", "FunctionName", "${var.environment}-process-institutions"],
            ["AWS/Lambda", "Duration", "FunctionName", "${var.environment}-frontend"],
            ["AWS/Lambda", "Duration", "FunctionName", "${var.environment}-get-descriptions"],
            ["AWS/Lambda", "Duration", "FunctionName", "${var.environment}-process-applications"],
            ["AWS/Lambda", "Duration", "FunctionName", "${var.environment}-get-images"]
          ],
          "region" : "us-east-1",
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 6,
        "width" : 24,
        "y" : 38,
        "x" : 0,
        "type" : "alarm",
        "properties" : {
          "title" : "Alarms",
          "alarms" : [
            aws_cloudwatch_metric_alarm.memory.arn,
            aws_cloudwatch_metric_alarm.concurrency.arn,
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Throttles/${var.environment}-process-institutions/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Duration/${var.environment}-process-institutions/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Errors/${var.environment}-process-institutions/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/ProvisionedConcurrencySpilloverInvocations/${var.environment}-frontend/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Throttles/${var.environment}-frontend/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Duration/${var.environment}-frontend/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Errors/${var.environment}-frontend/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Throttles/${var.environment}-get-descriptions/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Duration/${var.environment}-get-descriptions/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Errors/${var.environment}-get-descriptions/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Throttles/${var.environment}-process-applications/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Duration/${var.environment}-process-applications/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Errors/${var.environment}-process-applications/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Throttles/${var.environment}-get-images/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Duration/${var.environment}-get-images/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Errors/${var.environment}-get-images/"

          ],
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 2,
        "width" : 24,
        "y" : 44,
        "x" : 0,
        "type" : "text",
        "properties" : {
          "markdown" : "# Database"
        }
      },
      {
        "height" : 2,
        "width" : 24,
        "y" : 46,
        "x" : 0,
        "type" : "text",
        "properties" : {
          "markdown" : "### DynamoDB"
        }
      },
      {
        "height" : 6,
        "width" : 24,
        "y" : 48,
        "x" : 0,
        "type" : "metric",
        "properties" : {
          "view" : "timeSeries",
          "stacked" : false,
          "metrics" : [
            ["AWS/DynamoDB", "SystemErrors", "TableName", "institutions-${var.environment}"],
            ["AWS/DynamoDB", "SystemErrors", "TableName", "applicants-${var.environment}"]
          ],
          "region" : "us-east-1",
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 6,
        "width" : 24,
        "y" : 54,
        "x" : 0,
        "type" : "alarm",
        "properties" : {
          "title" : "Alarms",
          "alarms" : [
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/SystemErrors/institutions-${var.environment}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/ConsumedReadCapacityUnits/institutions-${var.environment}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/ConsumedWriteCapacityUnits/institutions-${var.environment}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/SystemErrors/applicants-${var.environment}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/ConsumedReadCapacityUnits/applicants-${var.environment}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/ConsumedWriteCapacityUnits/applicants-${var.environment}/"
          ],
          "accountId" : data.aws_caller_identity.current.account_id
        }
      }
    ]
  })
}
