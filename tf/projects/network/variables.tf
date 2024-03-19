variable "environment" {
  type = string
}

variable "azs" {
  type        = list(string)
  default     = ["a", "b", "c"]
  description = "AWS Availability Zone letters, e.g. a,b,c,d,etc."
}
