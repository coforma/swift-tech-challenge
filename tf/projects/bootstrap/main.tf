provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {}
}

resource "aws_s3_bucket" "terraform" {
  bucket = var.s3_bucket
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform" {
  bucket = aws_s3_bucket.terraform.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "terraform" {
  name           = var.dynamodb_table
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}




resource "aws_iam_openid_connect_provider" "github" {
  client_id_list = ["sts.amazonaws.com"]
  ## Thumbprint list is no longer used by AWS, but this must remain for compatability with the aws provider
  ## Remove once the terraform aws provider is updated to reflect this change
  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd"
  ]
  url = "https://token.actions.githubusercontent.com"
}

## Allows only specified branch/environment in the github repo to assume IaC deploy role
resource "aws_iam_role" "iac_deployer" {
  name        = "IaCDeployer"
  description = "Role for deploying IaC"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" : "sts.amazonaws.com"
            "token.actions.githubusercontent.com:sub" : [for rest in var.deploy_restrictions : "repo:${var.github_repo}:${rest}"]
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "iac_deployer_admin" {
  role       = aws_iam_role.iac_deployer.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}


## Allows any branch/environment in the github repo to assume IaC validation role
resource "aws_iam_role" "iac_validator" {
  name        = "IaCValidator"
  description = "Role for validating IaC"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" : "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" : "repo:${var.github_repo}:*"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "iac_validator_ro" {
  role       = aws_iam_role.iac_validator.name
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

resource "aws_iam_policy" "tfstate_access" {
  name = "TerraformValidationAccess"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:ListBucket"]
        Effect   = "Allow"
        Resource = [aws_s3_bucket.terraform.arn]
      },
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Effect   = "Allow"
        Resource = ["${aws_s3_bucket.terraform.arn}/*"]
      },
      {
        Action = [
          "dynamodb:DescribeTable",
          "dynamodb:GetItem",
          "dyanmodb:PutItem",
          "dynamodb:DeleteItem"
        ]
        Effect   = "Allow"
        Resource = [aws_dynamodb_table.terraform.arn]
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "iac_validator_tfstate" {
  role       = aws_iam_role.iac_validator.name
  policy_arn = aws_iam_policy.tfstate_access.arn
}