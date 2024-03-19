variable "institutions_dynamodb_table" {
  type    = string
  default = "institutions"
}

variable "environment" {
  type = string
}
variable "source_bucket" {
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
