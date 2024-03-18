provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Environment = "Global"
      Project     = "Global_Alarms"
      ManagedBy   = "Terraform"
    }
  }
}

terraform {
  backend "s3" {}
}

resource "aws_cloudwatch_metric_alarm" "account_concurrency" {
  alarm_name          = "ClaimedAccountConcurrency"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 10
  metric_name         = "ClaimedAccountConcurrency"
  namespace           = "AWS/Lambda"
  period              = 60
  statistic           = "Maximum"
  threshold           = 900
  alarm_description   = "This metric measures total function concurrency"
  datapoints_to_alarm = 10
}
