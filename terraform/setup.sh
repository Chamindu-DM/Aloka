#!/bin/bash
# Aloka Terraform AWS Setup Script
# This script helps you configure AWS credentials and initialize Terraform

set -e

echo "🚀 Aloka Terraform AWS Setup Script"
echo "===================================="
echo ""

# Step 1: Check AWS CLI
echo "✓ Checking AWS CLI..."
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Install it from: https://aws.amazon.com/cli/"
    exit 1
fi
echo "✓ AWS CLI is installed: $(aws --version)"
echo ""

# Step 2: Check/Create AWS credentials
echo "📝 AWS Credentials Setup"
echo "------------------------"
if aws sts get-caller-identity &> /dev/null; then
    echo "✓ AWS credentials already configured!"
    aws sts get-caller-identity
else
    echo "❌ AWS credentials not configured."
    echo ""
    echo "Please follow these steps:"
    echo "1. Open: https://console.aws.amazon.com"
    echo "2. Go to IAM → Users → Create user (name: terraform-user)"
    echo "3. Attach 'AdministratorAccess' policy"
    echo "4. Create access keys and copy them"
    echo "5. Then run: aws configure --profile default"
    echo "6. Enter your Access Key ID and Secret Access Key"
    echo ""
    echo "Once done, run this script again."
    exit 1
fi
echo ""

# Step 3: Check S3 bucket
BUCKET_NAME="aloka-terraform-state-$(date +%s)"
echo "🪣 S3 Backend Bucket Setup"
echo "------------------------"
echo "Creating S3 bucket: $BUCKET_NAME"
aws s3api create-bucket \
    --bucket "$BUCKET_NAME" \
    --region us-east-1 \
    --create-bucket-configuration LocationConstraint=us-east-1 || true

echo ""
echo "⚠️  Update provider.tf with your bucket name:"
echo "   bucket = \"$BUCKET_NAME\""
echo ""

# Step 4: Navigate to terraform dir
cd "$(dirname "$0")"

# Step 5: Initialize Terraform
echo "🏗️  Initializing Terraform..."
terraform init || {
    echo "❌ Terraform init failed. Check credentials and bucket name."
    exit 1
}

# Step 6: Validate
echo "✅ Validating Terraform configuration..."
terraform validate || {
    echo "❌ Terraform validation failed."
    exit 1
}

# Step 7: Show plan
echo ""
echo "📋 Terraform Plan"
echo "=================="
terraform plan -out=tfplan

echo ""
echo "✨ Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Review the plan above"
echo "2. Update terraform.tfvars with your desired values (especially db_password)"
echo "3. Run: terraform apply tfplan"
echo ""
echo "To apply (deploy to AWS):"
echo "  cd $(pwd)"
echo "  terraform apply tfplan"
echo ""
