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
  type        = string
  default     = "coforma/swift-tech-challenge"
  description = "Github repo to grant lambda deployment permissions to"
}

variable "app_deploy_restrictions" {
  type        = list(string)
  default     = ["environment:prod"]
  description = "Github branches or environments to grant lambda deployment permissions to"
}

variable "bootstrap_remote_state_config" {
  type        = map(string)
  description = "Values for terraform_remote_state configuration for bootstrap s3 backend"
}

variable "images_bucket_arn" {
  type        = string
  description = "Arn of existing bucket containing images for application"
}

variable "provisioned_concurrency" {
  type        = number
  description = "Provisioned Concurrency for Lambda function"
  default     = 1
}

variable "static_bucket" {
  type = string
}

variable "static_next_path" {
  type    = string
  default = "next/"
}
