output "tf_backend_bucket" {
  value = aws_s3_bucket.terraform.bucket
}

output "iac_deployer" {
  value = aws_iam_role.iac_deployer.arn
}

output "iac_validator" {
  value = aws_iam_role.iac_validator.arn
}

output "artifact_deployer" {
  value = aws_iam_role.artifact_deployer.arn
}

output "artifact_bucket" {
  value = aws_s3_bucket.artifacts.bucket
}

output "unprotected_artifact_deployer" {
  value = aws_iam_role.unprotected_artifact_deployer.arn
}

output "github_oidc_arn" {
  value = aws_iam_openid_connect_provider.github.arn
}
