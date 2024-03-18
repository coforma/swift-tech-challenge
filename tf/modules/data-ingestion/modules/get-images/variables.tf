variable "environment" {
  type = string
}
variable "images_bucket" {
  type = object({
    name    = string
    account = string
  })
}

variable "queue" {
  type = object({
    name    = string
    account = string
    arn     = string
  })
}

variable "institutions_dynamodb_table" {
  type    = string
  default = "institutions"
}
