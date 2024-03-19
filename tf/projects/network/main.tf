provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Environment = title(var.environment)
      Project     = "Network"
      ManagedBy   = "Terraform"
    }
  }
}

terraform {
  backend "s3" {}
}

data "aws_region" "current" {}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = format("%s-VPC", title(var.environment))
  cidr = "10.0.0.0/16"

  azs             = [for az in var.azs : "${data.aws_region.current.name}${az}"]
  private_subnets = [for i in range(length(var.azs)) : format("10.0.%d.0/24", i + 1)]
  public_subnets  = [for i in range(length(var.azs)) : format("10.0.%d.0/24", i + 101)]

  enable_nat_gateway = true

  tags = {
    Environment = title(var.environment)
    Project     = "Network"
    ManagedBy   = "Terraform"
  }
}


resource "aws_vpc_endpoint" "s3" {
  vpc_id          = module.vpc.vpc_id
  service_name    = "com.amazonaws.${data.aws_region.current.name}.s3"
  route_table_ids = tolist(module.vpc.private_route_table_ids)
}

resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id          = module.vpc.vpc_id
  service_name    = "com.amazonaws.${data.aws_region.current.name}.dynamodb"
  route_table_ids = tolist(module.vpc.private_route_table_ids)
}
