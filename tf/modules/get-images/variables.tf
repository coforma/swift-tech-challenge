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

variable "artifact" {
  type = object({
    bucket       = string
    path         = string
    handler_file = string
  })
}
