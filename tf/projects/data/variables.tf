variable "institutions_dynamodb_table" {
  type    = string
  default = "institutions"
}

variable "environment" {
  type = string
}
variable "source_bucket" {
  type = string
}
variable "institution_images_bucket" {
  type = string
}

variable "applicants_dynamodb_table" {
  type = string
}

variable "network_remote_state_config" {
  type        = map(string)
  description = "Values for terraform_remote_state configuration for networking s3 backend"
}

variable "dax_public" {
  type        = bool
  default     = false
  description = "Sets the dax instance to publicly accessible"
}

variable "dax_encrypted" {
  type        = bool
  default     = true
  description = "Set the dax instance to encrypted"
}
