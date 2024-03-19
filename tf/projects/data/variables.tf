variable "institutions_dynamodb_table" {
  type    = string
  default = "institutions"
}

variable "environment" {
  type = string
}
variable "source_bucket" {
  type = string
}
variable "institution_images_bucket" {
  type = string
}

variable "applicants_dynamodb_table" {
  type = string
}
