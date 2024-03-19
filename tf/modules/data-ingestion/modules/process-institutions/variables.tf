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

variable "descriptions_queue" {
  type = object({
    name = string
    url  = string
  })
}

variable "images_queue" {
  type = object({
    name = string
    url  = string
  })
}
