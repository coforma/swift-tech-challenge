environment                 = "test"
institutions_dynamodb_table = "institutions-test"
source_bucket               = "swift-c5292867"
institution_images_bucket   = "swift-institution-images-c20cd252"
applicants_dynamodb_table   = "applicants-test"
network_remote_state_config = {
  bucket = "tf-4e24be90"
  region = "us-east-1"
  key    = "network-test.tfstate"
}
dax_public = true
