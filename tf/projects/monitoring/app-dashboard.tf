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

resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = format("%s-ApplicationDashboard", title(var.environment))

  dashboard_body = jsonencode({
    "widgets" : [
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
            ["AWS/Lambda", "Errors", "FunctionName", "${local.application_lambda_function}"],
            ["AWS/Lambda", "Throttles", "FunctionName", "${local.application_lambda_function}"]
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
            ["AWS/Lambda", "Invocations", "FunctionName", "${local.application_lambda_function}"]
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
            ["AWS/Lambda", "Duration", "FunctionName", "${local.application_lambda_function}"]
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
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/ProvisionedConcurrencySpilloverInvocations/${local.application_lambda_function}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Throttles/${local.application_lambda_function}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Duration/${local.application_lambda_function}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/Lambda/Errors/${local.application_lambda_function}/",
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
        "width" : 12,
        "y" : 48,
        "x" : 0,
        "type" : "metric",
        "properties" : {
          "view" : "timeSeries",
          "stacked" : false,
          "metrics" : [
            ["AWS/DynamoDB", "ReturnedRecordsCount", "TableName", "${local.institutions_dynamodb_table}"],
            ["AWS/DynamoDB", "ReturnedRecordsCount", "TableName", "${local.applicants_dynamodb_table}"],
            ["AWS/DynamoDB", "SuccessfulRequestLatency", "TableName", "${local.applicants_dynamodb_table}"],
            ["AWS/DynamoDB", "SuccessfulRequestLatency", "TableName", "${local.institutions_dynamodb_table}"],
            ["AWS/DynamoDB", "ReturnedBytes", "TableName", "${local.applicants_dynamodb_table}"],
            ["AWS/DynamoDB", "ReturnedBytes", "TableName", "${local.institutions_dynamodb_table}"],
            ["AWS/DynamoDB", "ReturnedItemCount", "TableName", "${local.applicants_dynamodb_table}"],
            ["AWS/DynamoDB", "ReturnedItemCount", "TableName", "${local.institutions_dynamodb_table}"],
          ],
          "region" : "us-east-1",
          "accountId" : data.aws_caller_identity.current.account_id
        }
      },
      {
        "height" : 6,
        "width" : 12,
        "y" : 48,
        "x" : 12,
        "type" : "metric",
        "properties" : {
          "view" : "timeSeries",
          "stacked" : false,
          "metrics" : [
            ["AWS/DynamoDB", "SystemErrors", "TableName", "${local.institutions_dynamodb_table}"],
            ["AWS/DynamoDB", "SystemErrors", "TableName", "${local.applicants_dynamodb_table}"]
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
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/SystemErrors/${local.institutions_dynamodb_table}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/ConsumedReadCapacityUnits/${local.institutions_dynamodb_table}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/ConsumedWriteCapacityUnits/${local.institutions_dynamodb_table}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/SystemErrors/${local.applicants_dynamodb_table}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/ConsumedReadCapacityUnits/${local.applicants_dynamodb_table}/",
            "arn:aws:cloudwatch:us-east-1:905418154281:alarm:ApplicationInsights/${aws_resourcegroups_group.application.name}/AWS/DynamoDB/ConsumedWriteCapacityUnits/${local.applicants_dynamodb_table}/"
          ],
          "accountId" : data.aws_caller_identity.current.account_id
        }
      }
    ]
  })
}
