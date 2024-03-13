variable "artifact_bucket" {
  type        = string
  description = "Bucket containing Lambda deployable artifacts"
}

variable "environment" {
  type        = string
  description = "Environment label for resources"
}

variable "frontend_artifact_path" {
  type        = string
  description = "Path within S3 bucket where var.frontend_zip_file_name can be found"
}

variable "frontend_zip_filename" {
  type        = string
  default     = "frontend.zip"
  description = "Filename of zip file containing frontend lambda deployable artifact"
}

variable "github_repo" {
  type    = string
  default = "coforma/swift-tech-challenge"
}

variable "app_deploy_restrictions" {
  type    = list(string)
  default = ["environment:prod"]
}

variable "bootstrap_remote_state_config" {
  type        = map(string)
  description = "Values for terraform_remote_state configuration for bootstrap s3 backend"
}

