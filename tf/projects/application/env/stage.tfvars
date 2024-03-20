artifact_bucket         = "artifacts-50b620bb"
environment             = "stage"
frontend_artifact_path  = "main/"
frontend_zip_filename   = "frontend.zip"
github_repo             = "coforma/swift-tech-challenge"
app_deploy_restrictions = ["environment:stage"]
bootstrap_remote_state_config = {
  bucket = "tf-4e24be90"
  region = "us-east-1"
  key    = "bootstrap-global.tfstate"
}
images_bucket = {
  arn  = "arn:aws:s3:::swift-institution-images-9a86eb74"
  name = "swift-institution-images-9a86eb74"
}
applicants_dynamodb_table   = "applicants-stage"
provisioned_concurrency     = 1
static_bucket               = "public-static-ada5ffab"
static_next_path            = ""
institutions_dynamodb_table = "institutions-stage"
