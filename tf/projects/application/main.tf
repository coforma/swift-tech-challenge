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
  github = {
    repo                    = var.github_repo
    app_deploy_restrictions = var.app_deploy_restrictions
    oidc_arn                = data.terraform_remote_state.bootstrap.outputs.github_oidc_arn
  }
}
