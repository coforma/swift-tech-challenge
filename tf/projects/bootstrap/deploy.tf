## Buckets for aritifacts
resource "aws_s3_bucket" "artifacts" {
  bucket = var.artifact_bucket
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "artifacts" {
  bucket = aws_s3_bucket.artifacts.id
  versioning_configuration {
    status = "Enabled"
  }
}

## Github OIDC delegation to restricted environments or branches
resource "aws_iam_role" "artifact_deployer" {
  name        = "AppArtifactDeployer"
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
            "token.actions.githubusercontent.com:sub" : [for rest in var.artifact_deploy_restrictions : "repo:${var.github_repo}:${rest}"]
          }
        }
      }
    ]
  })
}

## Gives permission to upload to any location in the artifact bucket
resource "aws_iam_policy" "artifact_deploy" {
  name = "DeployAppArtifacts"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:ListBucket"]
        Effect   = "Allow"
        Resource = [aws_s3_bucket.artifacts.arn]
      },
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Effect   = "Allow"
        Resource = ["${aws_s3_bucket.artifacts.arn}/*"]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "artifact_deploy" {
  role       = aws_iam_role.artifact_deployer.name
  policy_arn = aws_iam_policy.artifact_deploy.arn
}

## Github OIDC delegation to any branch/environment
resource "aws_iam_role" "unprotected_artifact_deployer" {
  name        = "UnprotectedAppArtifactDeployer"
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
            "token.actions.githubusercontent.com:sub" : ["repo:${var.github_repo}:*"]
          }
        }
      }
    ]
  })
}

## Gives permission to upload to only issue/* folder in artifact bucket
resource "aws_iam_policy" "unprotected_artifact_deploy" {
  name = "DeployUnprotectedAppArtifacts"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:ListBucket"]
        Effect   = "Allow"
        Resource = [aws_s3_bucket.artifacts.arn]
      },
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Effect   = "Allow"
        Resource = ["${aws_s3_bucket.artifacts.arn}/issue/*"]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "unprotected_artifact_deployer" {
  role       = aws_iam_role.unprotected_artifact_deployer.name
  policy_arn = aws_iam_policy.unprotected_artifact_deploy.arn
}