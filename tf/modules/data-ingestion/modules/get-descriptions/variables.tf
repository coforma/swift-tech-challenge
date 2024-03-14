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
  })
}
variable "source_code" {
  type = object({
    path     = string
    relative = bool
  })
  description = "Absolute path of file containing lambda code, set relative to true if path is relative"
  default = {
    path     = "../../../utilities/data-ingestion/get-institution-description-from-bedrock.py"
    relative = true
  }
}
