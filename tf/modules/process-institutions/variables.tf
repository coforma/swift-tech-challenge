variable "institutions_dynamodb_table" {
  type    = string
  default = "institutions"
}

variable "environment" {
  type = string
}
variable "source" {
  type = object({
    bucket  = string
    account = string
  })
}
variable "source_bucket" {
  type = string
}
variable "institution_images_bucket" {
  type = string
}

variable "artifact_bucket" {
  type = string
}

variable "artifact_path" {
  type    = string
  default = "main/institutions.py"
}

variable "handler_file" {
  type    = string
  default = "institutions"
}
