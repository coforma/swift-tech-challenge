variable "environment" {
  type = string
}
variable "images" {
  type = object({
    bucket  = string
    account = string
  })
}

variable "artifact" {
  type = object({
    bucket = string
    path   = string
  })
}

variable "queue" {
  type = object({
    name    = string
    account = string
  })
}

variable "handler" {
  type    = string
  default = "lambda_function.lambda_handler"
}

variable "source_file" {
  type    = string
  default = "get-images.py"
}
