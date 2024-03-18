variable "environment" {
  type        = string
  description = "Environment label for resources"
}

variable "application_lambda_function" {
  default = null
}

variable "institutions_dynamodb_table" {
  default = null
}

variable "applicants_dynamodb_table" {
  default = null
}
