#!/bin/bash
# Interactive AWS & Terraform Setup Guide
# Run this script to be guided through the entire setup process

set -e

RESET='\033[0m'
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'

echo -e "${BOLD}${BLUE}"
echo "╔════════════════════════════════════════════════════════╗"
echo "║         Aloka AWS Terraform Setup Guide               ║"
echo "║                                                        ║"
echo "║   This script will help you set up AWS and deploy     ║"
echo "║   your Aloka application to AWS using Terraform       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo -e "${RESET}"
echo ""

# Function to prompt user
prompt() {
    local message="$1"
    local default="$2"

    if [ -z "$default" ]; then
        read -p "$(echo -e ${BOLD}$message${RESET})" response
    else
        read -p "$(echo -e ${BOLD}$message (default: $default)${RESET})" response
        response=${response:-$default}
    fi
    echo "$response"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo -e "${YELLOW}Step 1: Check Prerequisites${RESET}"
echo "========================================="

# Check AWS CLI
if command_exists aws; then
    echo -e "${GREEN}✓${RESET} AWS CLI is installed: $(aws --version | head -1)"
else
    echo -e "${RED}✗${RESET} AWS CLI not found"
    echo "  Install from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check Terraform
if command_exists terraform; then
    echo -e "${GREEN}✓${RESET} Terraform is installed: $(terraform version | head -1)"
else
    echo -e "${RED}✗${RESET} Terraform not found"
    echo "  Install from: https://www.terraform.io/downloads.html"
    exit 1
fi

echo -e "${GREEN}✓${RESET} All prerequisites installed!"
echo ""

echo -e "${YELLOW}Step 2: AWS Credentials${RESET}"
echo "========================================="
echo ""
echo "You need to get credentials from AWS Console:"
echo "1. Go to: https://console.aws.amazon.com"
echo "2. Go to IAM → Users → Create user 'terraform-user'"
echo "3. Attach 'AdministratorAccess' policy"
echo "4. Create access keys and copy them"
echo ""

if aws sts get-caller-identity >/dev/null 2>&1; then
    echo -e "${GREEN}✓${RESET} AWS credentials already configured!"
    echo "  Current identity:"
    aws sts get-caller-identity | sed 's/^/    /'
else
    echo "Now configuring AWS credentials locally..."
    echo "Run: aws configure --profile default"
    echo "Then paste your Access Key ID and Secret Access Key"
    echo ""

    read -p "Press Enter when ready to configure AWS credentials..."

    aws configure --profile default

    echo ""
    if aws sts get-caller-identity >/dev/null 2>&1; then
        echo -e "${GREEN}✓${RESET} AWS credentials configured successfully!"
    else
        echo -e "${RED}✗${RESET} Failed to configure credentials"
        exit 1
    fi
fi

echo ""

echo -e "${YELLOW}Step 3: Create S3 Backend Bucket${RESET}"
echo "========================================="

# Generate unique bucket name
BUCKET_NAME="aloka-terraform-state-$(date +%s)"

echo "Creating S3 bucket: $BUCKET_NAME"
echo ""

if aws s3api create-bucket \
    --bucket "$BUCKET_NAME" \
    --region us-east-1 \
    --create-bucket-configuration LocationConstraint=us-east-1 2>/dev/null || true; then

    # Enable versioning
    aws s3api put-bucket-versioning \
        --bucket "$BUCKET_NAME" \
        --versioning-configuration Status=Enabled

    echo -e "${GREEN}✓${RESET} S3 bucket created: $BUCKET_NAME"
else
    echo -e "${YELLOW}⚠${RESET} Could not create bucket (may already exist)"
    BUCKET_NAME=$(prompt "Enter your S3 bucket name:")
fi

echo ""

echo -e "${YELLOW}Step 4: Update Terraform Backend${RESET}"
echo "========================================="

TERRAFORM_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROVIDER_FILE="$TERRAFORM_DIR/provider.tf"

echo "Updating $PROVIDER_FILE with bucket: $BUCKET_NAME"

# Check if provider.tf needs updating
if grep -q '"aloka-terraform-state"' "$PROVIDER_FILE"; then
    # Update the bucket name
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|bucket = \"aloka-terraform-state\"|bucket = \"$BUCKET_NAME\"|g" "$PROVIDER_FILE"
    else
        # Linux
        sed -i "s|bucket = \"aloka-terraform-state\"|bucket = \"$BUCKET_NAME\"|g" "$PROVIDER_FILE"
    fi

    echo -e "${GREEN}✓${RESET} Updated provider.tf with bucket name"
else
    echo -e "${GREEN}✓${RESET} provider.tf already has correct bucket"
fi

echo ""

echo -e "${YELLOW}Step 5: Update Terraform Variables${RESET}"
echo "========================================="

TFVARS_FILE="$TERRAFORM_DIR/terraform.tfvars"

echo "Checking $TFVARS_FILE..."

if [ -f "$TFVARS_FILE" ]; then
    echo -e "${GREEN}✓${RESET} terraform.tfvars exists"

    # Generate strong password
    STRONG_PASSWORD=$(openssl rand -base64 16)

    echo ""
    echo "Generated strong password: $STRONG_PASSWORD"
    echo ""
    echo "Please edit $TFVARS_FILE and:"
    echo "  1. Keep aws_region = \"us-east-1\""
    echo "  2. Keep aws_profile = \"default\""
    echo "  3. Replace db_password with: $STRONG_PASSWORD"
    echo ""

    read -p "Press Enter when you've updated terraform.tfvars..."
else
    echo -e "${RED}✗${RESET} terraform.tfvars not found"
    exit 1
fi

echo ""

echo -e "${YELLOW}Step 6: Initialize Terraform${RESET}"
echo "========================================="

cd "$TERRAFORM_DIR"

echo "Running: terraform init"
echo ""

if terraform init; then
    echo -e "${GREEN}✓${RESET} Terraform initialized successfully"
else
    echo -e "${RED}✗${RESET} Terraform init failed"
    echo "  Check your credentials and bucket name"
    exit 1
fi

echo ""

echo -e "${YELLOW}Step 7: Validate Configuration${RESET}"
echo "========================================="

if terraform validate; then
    echo -e "${GREEN}✓${RESET} Terraform configuration is valid"
else
    echo -e "${RED}✗${RESET} Terraform validation failed"
    exit 1
fi

echo ""

echo -e "${YELLOW}Step 8: Review Deployment Plan${RESET}"
echo "========================================="

echo "Running: terraform plan"
echo ""
echo "This shows what will be created in AWS:"
echo "  - VPC with public/private subnets"
echo "  - Security groups"
echo "  - RDS PostgreSQL database"
echo "  - EC2 application server"
echo ""

terraform plan -out=tfplan

echo ""
echo -e "${BOLD}Review the plan above carefully!${RESET}"
echo ""

read -p "Do you want to proceed with deployment? (yes/no): " proceed

if [ "$proceed" != "yes" ]; then
    echo "Deployment cancelled. To resume later, run:"
    echo "  cd $TERRAFORM_DIR"
    echo "  terraform apply tfplan"
    exit 0
fi

echo ""

echo -e "${YELLOW}Step 9: Deploy to AWS${RESET}"
echo "========================================="

echo "Running: terraform apply tfplan"
echo ""
echo -e "${YELLOW}⏳ This may take 10-15 minutes...${RESET}"
echo ""

if terraform apply tfplan; then
    echo -e "${GREEN}✓${RESET} Deployment completed successfully!"
else
    echo -e "${RED}✗${RESET} Deployment failed"
    exit 1
fi

echo ""

echo -e "${YELLOW}Step 10: Display Outputs${RESET}"
echo "========================================="

echo ""
terraform output

echo ""
echo -e "${BOLD}${GREEN}"
echo "╔════════════════════════════════════════════════════════╗"
echo "║           🎉 Deployment Successful! 🎉               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo -e "${RESET}"

echo ""
echo "Your Aloka infrastructure is now deployed to AWS!"
echo ""

APP_IP=$(terraform output -raw app_public_ip 2>/dev/null || echo "N/A")
DB_ENDPOINT=$(terraform output -raw db_endpoint 2>/dev/null | cut -d':' -f1 || echo "N/A")

echo "Key Information:"
echo "  Application Server IP: $APP_IP"
echo "  Database Endpoint: $DB_ENDPOINT"
echo ""

echo "Next Steps:"
echo "1. SSH into your EC2 instance:"
echo "   ssh -i ~/.ssh/aloka-key.pem ec2-user@$APP_IP"
echo ""
echo "2. Deploy your application:"
echo "   git clone <your-repo>"
echo "   cd Aloka"
echo "   docker-compose up -d"
echo ""
echo "3. Access your application:"
echo "   http://$APP_IP"
echo ""

echo "To clean up (delete all resources):"
echo "  cd $TERRAFORM_DIR"
echo "  terraform destroy"
echo ""
