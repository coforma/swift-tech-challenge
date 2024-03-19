provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Environment = title(var.environment)
      Project     = "Data"
      ManagedBy   = "Terraform"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  alias  = "ingestion-aws"
  default_tags {
    tags = {
      Environment = title(var.environment)
      Project     = "DataIngestion"
      ManagedBy   = "Terraform"
    }
  }
}

terraform {
  backend "s3" {}
}

data "terraform_remote_state" "network" {
  backend = "s3"
  config  = var.network_remote_state_config
}

data "aws_caller_identity" "current" {}

locals {
  vpc = data.terraform_remote_state.network.outputs.vpc
  #TODO go to single subnet group because dax doesn't support public endpoints anyway
  dax_subnet_group = var.dax_public ? data.terraform_remote_state.network.outputs.public_dax_subnet_group.name : data.terraform_remote_state.network.outputs.private_dax_subnet_group.name
  dax_cidr_ipv4    = var.dax_public ? "0.0.0.0/0" : local.vpc.vpc_cidr_block
}

resource "aws_dynamodb_table" "institutions" {
  name                        = var.institutions_dynamodb_table
  deletion_protection_enabled = false
  hash_key                    = "institutionId"
  range_key                   = "recordType"
  stream_enabled              = false
  billing_mode                = "PAY_PER_REQUEST"

  table_class = "STANDARD"

  attribute {
    name = "institutionId"
    type = "N"
  }
  attribute {
    name = "recordType"
    type = "S"
  }


  point_in_time_recovery {
    enabled = false
  }
}

resource "aws_s3_bucket" "source" {
  bucket = var.source_bucket
}

resource "aws_s3_bucket" "institution_images" {
  bucket = var.institution_images_bucket
}

resource "aws_dynamodb_table" "applicants" {
  name                        = var.applicants_dynamodb_table
  deletion_protection_enabled = false
  hash_key                    = "email"
  range_key                   = "recordType"
  stream_enabled              = false
  billing_mode                = "PAY_PER_REQUEST"

  table_class = "STANDARD"

  attribute {
    name = "email"
    type = "S"
  }
  attribute {
    name = "recordType"
    type = "S"
  }

  point_in_time_recovery {
    enabled = false
  }
}

resource "aws_s3_bucket_public_access_block" "institution_images" {
  bucket = aws_s3_bucket.institution_images.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public" {
  bucket = aws_s3_bucket.institution_images.id
  policy = data.aws_iam_policy_document.public.json
}

data "aws_iam_policy_document" "public" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
      "s3:ListBucket",
    ]

    resources = [
      aws_s3_bucket.institution_images.arn,
      "${aws_s3_bucket.institution_images.arn}/*",
    ]
  }
}



module "data_ingestion" {
  source                      = "../../modules/data-ingestion"
  institutions_dynamodb_table = aws_dynamodb_table.institutions.name
  source_bucket = {
    name    = aws_s3_bucket.source.bucket
    account = data.aws_caller_identity.current.account_id
  }
  images_bucket = {
    name    = aws_s3_bucket.institution_images.bucket
    account = data.aws_caller_identity.current.account_id
  }
  environment = var.environment
  providers = {
    aws = aws.ingestion-aws
  }
}

data "aws_iam_policy_document" "dax_assume" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["dax.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "dynamodb_access" {
  statement {
    sid    = "DynamoDB"
    effect = "Allow"
    actions = [
      "dynamodb:DescribeTable",
      "dynamodb:PutItem",
      "dynamodb:GetItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:ConditionCheckItem"
    ]
    resources = [
      aws_dynamodb_table.institutions.arn,
      aws_dynamodb_table.applicants.arn
    ]
  }
}

resource "aws_iam_role" "dax" {
  name               = format("%sDaxRole", title(var.environment))
  assume_role_policy = data.aws_iam_policy_document.dax_assume.json
}

resource "aws_iam_policy" "dynamodb_access" {
  name   = format("%sDaxDynamoPolicy", title(var.environment))
  policy = data.aws_iam_policy_document.dynamodb_access.json
}

resource "aws_iam_role_policy_attachment" "dynamodb_access" {
  role       = aws_iam_role.dax.name
  policy_arn = aws_iam_policy.dynamodb_access.arn
}

resource "aws_security_group" "allow_dax" {
  name        = "${var.environment}_allow_dax"
  description = "Allow DAX inbound traffic (${title(var.environment)})"
  vpc_id      = local.vpc.vpc_id

  tags = {
    Name = "${var.environment}_allow_dax"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_dax_ipv4_unencrypted" {
  count             = var.dax_encrypted ? 0 : 1
  security_group_id = aws_security_group.allow_dax.id
  cidr_ipv4         = local.dax_cidr_ipv4
  from_port         = 8111
  ip_protocol       = "tcp"
  to_port           = 8111
}
resource "aws_vpc_security_group_ingress_rule" "allow_dax_ipv4_encrypted" {
  count             = var.dax_encrypted ? 1 : 0
  security_group_id = aws_security_group.allow_dax.id
  cidr_ipv4         = local.dax_cidr_ipv4
  from_port         = 9111
  ip_protocol       = "tcp"
  to_port           = 9111
}

resource "aws_dax_cluster" "dax" {
  cluster_name       = "${var.environment}-dax"
  iam_role_arn       = aws_iam_role.dax.arn
  node_type          = "dax.t3.small"
  replication_factor = 1
  subnet_group_name  = local.dax_subnet_group
  security_group_ids = [aws_security_group.allow_dax.id, local.vpc.default_security_group_id]
  server_side_encryption {
    enabled = var.dax_encrypted
  }
}

resource "aws_lb" "dax" {
  name               = "${var.environment}-dax"
  internal           = false
  load_balancer_type = "network"
  subnets            = tolist(local.vpc.public_subnets)
}

resource "aws_lb_target_group" "dax" {
  name        = "${var.environment}-dax"
  port        = 8111
  protocol    = "TCP"
  target_type = "ip"
  vpc_id      = local.vpc.vpc_id
}


resource "aws_lb_target_group_attachment" "dax" {
  target_group_arn = aws_lb_target_group.dax.arn
  target_id        = "10.0.101.161"
  port             = 8111
}


resource "aws_lb_listener" "dax" {
  load_balancer_arn = aws_lb.dax.arn
  port              = "8111"
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.dax.arn
  }
}

resource "aws_vpc_endpoint_service" "dax" {
  acceptance_required        = false
  network_load_balancer_arns = [aws_lb.dax.arn]
}
