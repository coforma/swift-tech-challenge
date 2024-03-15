resource "aws_iam_role" "github_deployer" {
  name        = format("%sFrontendDeployer", title(var.environment))
  description = "Role for Deploying Frontend Application"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = var.github.oidc_arn
        }
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" : "sts.amazonaws.com"
            "token.actions.githubusercontent.com:sub" : [for rest in var.github.app_deploy_restrictions : "repo:${var.github.repo}:${rest}"]
          }
        }
      }
    ]
  })
}

## Gives permission to update lambda code
resource "aws_iam_policy" "app_deploy" {
  name = format("%sUpdateFrontendCode", title(var.environment))
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "lambda:UpdateFunctionCode",
          "lambda:PublishVersion",
          "lambda:Get*",
          "lambda:UpdateAlias"
        ]
        Effect = "Allow"
        Resource = [
          aws_lambda_function.frontend.arn,
          "${aws_lambda_function.frontend.arn}:*",
        aws_lambda_alias.alias.arn]
      },
      {
        Action = ["s3:ListBucket"]
        Effect = "Allow"
        Resource = [
          "arn:aws:s3:::${var.artifact_bucket}",
          "arn:aws:s3:::${var.static_bucket}"
        ]
      },
      {
        Action = [
          "s3:GetObject"
        ]
        Effect = "Allow"
        Resource = [
          "arn:aws:s3:::${var.artifact_bucket}/*",
          "arn:aws:s3:::${var.static_bucket}/*",
        ]
      },
      {
        Action = [
          "s3:PutObject",
          "s3:PutObjectAcl",
          "s3:PutObjectTagging"
        ]
        Effect = "Allow"
        Resource = [
          "arn:aws:s3:::${var.static_bucket}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "app_deploy" {
  role       = aws_iam_role.github_deployer.name
  policy_arn = aws_iam_policy.app_deploy.arn
}
