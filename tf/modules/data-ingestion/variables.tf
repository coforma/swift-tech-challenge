variable "environment" {
  type = string
}

variable "institutions_dynamodb_table" {
  type    = string
  default = "institutions"
}

variable "source_bucket" {
  type = object({
    name    = string
    account = string
  })
}

variable "images_bucket" {
  type = object({
    name    = string
    account = string
  })
}
