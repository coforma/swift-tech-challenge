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
applicants_dynamodb_table   = "applicants-test"
provisioned_concurrency     = 0
static_bucket               = "public-static-3a96b108"
static_next_path            = ""
institutions_dynamodb_table = "institutions"
vpc_config = {
  security_group_ids = ["sg-061424e040e256d2b"]
  subnet_ids = [
    "subnet-0f8e7ed39482a94bb",
    "subnet-07d8c7bfc70542d67",
    "subnet-03af32f1fbdc85a82",
  ]
}
dax_endpoint = "test-dax.4kpcab.dax-clusters.us-east-1.amazonaws.com"
