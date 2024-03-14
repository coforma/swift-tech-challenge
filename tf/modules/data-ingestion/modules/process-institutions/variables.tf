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

variable "images_bucket" {
  type = object({
    name    = string
    account = string
  })
}

variable "artifact" {
  type = object({
    bucket = string
    path   = string
  })
}

variable "handler" {
  type    = string
  default = "lambda_function.lambda_handler"
}

variable "source_file" {
  type    = string
  default = "ingest-institutions.py"
}


variable "descriptions_queue" {
  type = string
}

variable "images_queue" {
  type = string
}
