
## See https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-aws for examples
variable "tf_deploy_restrictions" {
  type        = list(string)
  default     = ["ref:refs/heads/main"]
  description = "values to match with Github OIDC ':sub' string for IaC Deployer role"
}

variable "github_repo" {
  type        = string
  description = "Github repo to allowed to execute commands on AWS account"
}

variable "s3_bucket" {
  type        = string
  description = "S3 bucket for Terraform state files"
}

variable "dynamodb_table" {
  type        = string
  description = "DynamoDB table for Terraform lock files"
  default     = "terraform"
}

variable "artifact_bucket" {
  type        = string
  description = "S3 bucket for deployment artifacts"
}

variable "artifact_deploy_restrictions" {
  type        = list(string)
  default     = ["ref:refs/heads/main"]
  description = "values to match with Github OIDC ':sub' string for Artifact Deployer role"
}