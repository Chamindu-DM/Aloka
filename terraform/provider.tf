terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }

  backend "s3" {
    bucket = "aloka-terraform-state-chamindu-1769088839" # Replace with bucket from Step 3.1
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
    # Optional: Add this after creating DynamoDB table:
    # dynamodb_table = "aloka-terraform-locks"
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}