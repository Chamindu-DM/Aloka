# Complete AWS Setup & Terraform Deployment Guide for Aloka

## Overview

This guide walks you through:
1. **Creating AWS credentials** from your AWS account
2. **Configuring your local machine** to use those credentials
3. **Setting up Terraform backend** in AWS
4. **Deploying your Aloka application** to AWS

---

## Phase 1: Create AWS Credentials (5 minutes)

### Step 1.1: Log into AWS Console

1. Go to https://console.aws.amazon.com
2. Sign in with your AWS account email and password
3. You'll land on the AWS Management Console (Dashboard)

### Step 1.2: Create an IAM User

1. In the search bar, type **IAM** and click the IAM service
2. On the left sidebar, click **Users**
3. Click the **Create user** button
4. Enter username: `terraform-user`
5. Click **Next**

### Step 1.3: Attach Permissions

1. Select **Attach policies directly**
2. Search for `AdministratorAccess` policy
3. Click the checkbox to select it
4. Click **Next** → **Create user**

✅ **You now have an IAM user!**

### Step 1.4: Create Access Keys

1. Click on the user `terraform-user` you just created
2. Go to the **Security credentials** tab
3. Scroll to **Access keys** section
4. Click **Create access key**
5. Select **Command Line Interface (CLI)** as the use case
6. Accept the warning checkbox
7. Click **Create access key**

**🔴 IMPORTANT:** You'll see a screen with:
- **Access Key ID** (starts with AKIA...)
- **Secret Access Key** (long string)

**Copy these immediately and save them somewhere safe.** You can't retrieve the secret key again!

---

## Phase 2: Configure AWS Credentials on Your Machine (3 minutes)

### Option A: Using AWS CLI Configure (RECOMMENDED)

Open your terminal and run:

```bash
aws configure --profile default
```

You'll be prompted for:

```
AWS Access Key ID [None]: AKIA... (paste from Step 1.4)
AWS Secret Access Key [None]: wJalr... (paste from Step 1.4)
Default region name [None]: us-east-1
Default output format [None]: json
```

### Option B: Using Environment Variables

If you prefer not to store credentials on disk, open `~/.zshrc` and add:

```bash
export AWS_ACCESS_KEY_ID="AKIA..."
export AWS_SECRET_ACCESS_KEY="wJalr..."
export AWS_DEFAULT_REGION="us-east-1"
```

Then reload:

```bash
source ~/.zshrc
```

### Step 2.1: Verify Your Credentials

```bash
aws sts get-caller-identity
```

You should see output like:

```json
{
    "UserId": "AIDAI...",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/terraform-user"
}
```

✅ **If you see this, your credentials are working!**

---

## Phase 3: Create S3 Backend Bucket (5 minutes)

Terraform needs to store its state in an S3 bucket. Let's create one:

### Step 3.1: Create the S3 Bucket

Run this command in your terminal:

```bash
# Create a unique bucket name (S3 names must be globally unique)
BUCKET_NAME="aloka-terraform-state-$(whoami)-$(date +%s)"

# Create the bucket
aws s3api create-bucket \
  --bucket "$BUCKET_NAME" \
  --region us-east-1

# Enable versioning (recommended for state files)
aws s3api put-bucket-versioning \
  --bucket "$BUCKET_NAME" \
  --versioning-configuration Status=Enabled

echo "✅ Bucket created: $BUCKET_NAME"
```

**Copy the bucket name** (you'll need it in the next step).

### Step 3.2: Update provider.tf

Edit `/Users/chamindu/Documents/GitHub/Aloka/terraform/provider.tf`:

```terraform
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "YOUR_BUCKET_NAME_HERE"  # Replace with bucket from Step 3.1
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
```

---

## Phase 4: Update Terraform Variables (2 minutes)

Edit `/Users/chamindu/Documents/GitHub/Aloka/terraform/terraform.tfvars`:

```terraform
# AWS Configuration
aws_region   = "us-east-1"
aws_profile  = "default"

# Application Configuration
environment  = "dev"
project_name = "aloka"

# Database Configuration - Generate a strong password!
# Use: openssl rand -base64 16
db_password  = "YourStrongPassword123!"
```

**Generate a strong password:**

```bash
openssl rand -base64 16
```

---

## Phase 5: Initialize and Deploy Terraform (10 minutes)

### Step 5.1: Navigate to Terraform Directory

```bash
cd /Users/chamindu/Documents/GitHub/Aloka/terraform
```

### Step 5.2: Initialize Terraform

```bash
terraform init
```

**Expected output:**
```
Initializing the backend...
Initializing modules...
- vpc in .terraform/modules/vpc

Terraform has been successfully configured!
```

### Step 5.3: Validate Configuration

```bash
terraform validate
```

**Should output:** `Success! The configuration is valid.`

### Step 5.4: Preview Changes

```bash
terraform plan -out=tfplan
```

This shows what will be created in AWS:
- VPC with public/private subnets
- Security groups for app and database
- RDS PostgreSQL database
- EC2 instance for your application

**Review the output carefully!**

### Step 5.5: Deploy to AWS

```bash
terraform apply tfplan
```

⏳ **This will take 5-15 minutes.** Watch for any errors.

**Expected output at the end:**
```
Outputs:

app_public_dns = "ec2-1-2-3-4.compute-1.amazonaws.com"
app_public_ip = "1.2.3.4"
db_endpoint = "aloka-db.c9akciq32.us-east-1.rds.amazonaws.com:5432"
```

✅ **Your infrastructure is now deployed to AWS!**

---

## Phase 6: Access Your Deployed Resources (5 minutes)

### Step 6.1: View All Outputs

```bash
terraform output
```

### Step 6.2: SSH into EC2 Instance

First, create an EC2 key pair:

```bash
aws ec2 create-key-pair \
  --key-name aloka-key \
  --region us-east-1 \
  --query 'KeyMaterial' \
  --output text > ~/.ssh/aloka-key.pem

chmod 600 ~/.ssh/aloka-key.pem
```

Then update `main.tf` to use this key pair. In the `aws_instance` block, add:

```terraform
resource "aws_instance" "app" {
  # ... existing config ...
  key_name = "aloka-key"  # Add this line
}
```

Then re-apply:

```bash
terraform apply
```

Now SSH in:

```bash
ssh -i ~/.ssh/aloka-key.pem ec2-user@$(terraform output -raw app_public_ip)
```

### Step 6.3: Connect to Database

From your EC2 instance:

```bash
psql -h $(terraform output -raw db_endpoint | cut -d':' -f1) \
     -U postgres \
     -d alokadb
```

---

## Phase 7: Troubleshooting

### ❌ "No valid credential sources found"

**Solution:**
```bash
aws configure --profile default
# Enter your Access Key ID and Secret Access Key
```

### ❌ "access denied" for S3

**Solution:** Your IAM user needs `s3:*` permissions. Re-check Step 1.3.

### ❌ "InvalidInput.Conflict" for S3 bucket

**Solution:** S3 bucket names are globally unique. Add a random suffix:
```bash
BUCKET_NAME="aloka-terraform-state-$(date +%s)"
```

### ❌ "InvalidKeyPair.NotFound" during apply

**Solution:** Create the key pair first (Step 6.2) and update `main.tf`.

### ❌ "Backend initialization required" after updating bucket name

**Solution:**
```bash
terraform init -reconfigure
```

---

## Best Practices & Next Steps

### Security
- 🔒 Never commit credentials or `terraform.tfstate` to git
- 🔒 Use AWS Secrets Manager for production passwords
- 🔒 Rotate access keys every 90 days
- 🔒 Enable MFA on your AWS root account

### Production Checklist
- [ ] Use DynamoDB for state locking
- [ ] Enable S3 versioning on state bucket
- [ ] Restrict S3 bucket access via bucket policy
- [ ] Use separate AWS accounts for dev/prod
- [ ] Enable CloudTrail for audit logging
- [ ] Set up automated backups for RDS

### Useful Terraform Commands

```bash
# View all resources
terraform state list

# View specific resource details
terraform state show aws_instance.app

# Destroy everything (use with caution!)
terraform destroy

# Import existing resources
terraform import aws_instance.app i-1234567890abcdef0
```

---

## Useful Links

- AWS Console: https://console.aws.amazon.com
- IAM User Guide: https://docs.aws.amazon.com/iam/
- Terraform AWS Provider: https://registry.terraform.io/providers/hashicorp/aws/latest
- AWS CLI: https://aws.amazon.com/cli/

---

## Need Help?

- Check AWS CloudFormation events in the console if deployment fails
- Review Terraform logs: `terraform apply -v`
- Check application logs in EC2: `docker logs <container-id>`

**You're all set! 🎉**
