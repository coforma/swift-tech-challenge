artifact_bucket         = "artifacts-50b620bb"
environment             = "prod"
frontend_artifact_path  = "main/"
frontend_zip_filename   = "frontend.zip"
github_repo             = "coforma/swift-tech-challenge"
app_deploy_restrictions = ["environment:prod"]
bootstrap_remote_state_config = {
  bucket = "tf-4e24be90"
  region = "us-east-1"
  key    = "bootstrap-global.tfstate"
}
#TODO switch to prod images bucket when available
images_bucket_arn       = "arn:aws:s3:::swift-institution-images"
provisioned_concurrency = 4
static_bucket           = "public-static-f0671608"
static_next_path        = ""
