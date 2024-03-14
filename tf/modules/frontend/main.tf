## Gets data on current AWS account
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

# Policy Doc for delegating role to AWS Lambda
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