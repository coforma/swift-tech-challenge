output "vpc" {
  value = module.vpc
}

output "private_dax_subnet_group" {
  value = aws_dax_subnet_group.private
}

output "public_dax_subnet_group" {
  value = aws_dax_subnet_group.private
}
