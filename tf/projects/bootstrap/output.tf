output "s3_bucket" {
  value = aws_s3_bucket.terraform.bucket
}

output "iac_deployer" {
  value = aws_iam_role.iac_deployer.arn
}

output "iac_validator" {
  value = aws_iam_role.iac_validator.arn
}
