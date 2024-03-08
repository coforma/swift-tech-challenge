# 7. Use Terraform for IaC

Date: 2024-03-08

## Status

Accepted

## Context

Current best practices mandate that infrastructure is managed as code (Infrastructure as Code / IaC).

Terraform is the most commonly IaC tool with extensive support for our target platforms of AWS and Github.
Terraform has significant performance advantages over comparable tools such as AWS CDK or AWS CloudFormation

## Decision

We will use Terraform as our IaC tool.

## Consequences

Managing our infrastructure becomes easier, more secure, and more reliable with an IaC tool such as Terraform.
Certain "bleeding-edge" AWS features may be unavailable due to slight lag in support of new AWS APIs.
Lack of native support for bootstrapping directly into the cloud necessitates a small amount of manual work to bootstrap Terraform in our Cloud environment.
