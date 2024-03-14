variable "environment" {
  type = string
}

variable "institutions_dynamodb_table" {
  type    = string
  default = "institutions"
}

variable "source" {
  type = object({
    bucket  = string
    account = string
  })
}

variable "images" {
  type = object({
    bucket  = string
    account = string
  })
}

variable "arifact" {
  type = object({
    bucket = string
    path   = string
  })
}

variable "proccess_application_handler_file" {
  type    = string
  default = ""
}

variable "proccess_institutions_handler_file" {
  type    = string
  default = "institutions"
}

variable "get_descriptions_handler_file" {
  type    = string
  default = ""
}

variable "get_images_handler_file" {
  type    = string
  default = ""
}
