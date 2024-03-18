provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Environment = title(var.environment)
      Project     = "Application"
      ManagedBy   = "Terraform"
    }
  }
}

terraform {
  backend "s3" {}
}

data "terraform_remote_state" "bootstrap" {
  backend = "s3"
  config  = var.bootstrap_remote_state_config
}

module "frontend" {
  source          = "../../modules/frontend"
  environment     = var.environment
  artifact_bucket = var.artifact_bucket
  artifact_path   = var.frontend_artifact_path
  zip_file_name   = var.frontend_zip_filename
  images_bucket   = var.images_bucket
  github = {
    repo                    = var.github_repo
    app_deploy_restrictions = var.app_deploy_restrictions
    oidc_arn                = data.terraform_remote_state.bootstrap.outputs.github_oidc_arn
  }
  provisioned_concurrency   = var.provisioned_concurrency
  static_bucket             = var.static_bucket
  static_next_path          = var.static_next_path
  applicants_dynamodb_table = var.applicants_dynamodb_table
}
