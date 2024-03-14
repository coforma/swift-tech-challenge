variable "artifact_bucket" {
  type        = string
  description = "Bucket containing Lambda deployable artifacts"
}

variable "artifact_path" {
  type        = string
  description = "Path within S3 bucket where var.zip_file_name can be found"
}

variable "environment" {
  type        = string
  description = "Environment label for resources"
}

variable "zip_file_name" {
  type        = string
  default     = "frontend.zip"
  description = "Filename of zip file containing lambda deployable artifact"
}


## Github variables for deployment delegation
## "repo" is the github repo that can update the application code
## "app_deploy_restrictions" are :sub restrictions to add to the OIDC provider
## "oidc_arn" is the ARN of the Github oidc provider in AWS
variable "github" {
  type = object({
    repo                    = string
    app_deploy_restrictions = list(string)
    oidc_arn                = string
  })
  description = "Github settings for deployment. Requires 'repo', 'app_deploy_restrictions', and 'oidc_arn'"
}
