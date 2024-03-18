artifact_bucket         = "artifacts-50b620bb"
environment             = "test"
frontend_artifact_path  = "main/"
frontend_zip_filename   = "frontend.zip"
github_repo             = "coforma/swift-tech-challenge"
app_deploy_restrictions = ["environment:test"]
bootstrap_remote_state_config = {
  bucket = "tf-4e24be90"
  region = "us-east-1"
  key    = "bootstrap-global.tfstate"
}
images_bucket = {
  arn  = "arn:aws:s3:::swift-institution-images-c20cd252"
  name = "swift-institution-images-c20cd252"
}
provisioned_concurrency = 1
static_bucket           = "public-static-3a96b108"
static_next_path        = ""
