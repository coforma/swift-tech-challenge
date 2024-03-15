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
#TODO switch to stage images bucket when available
images_bucket_arn       = "arn:aws:s3:::swift-institution-images"
provisioned_concurrency = 1
static_bucket           = "public-static-ada5ffab"
static_next_path        = "next/"
