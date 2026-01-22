# 📚 Complete Documentation Index

## 🎯 Start Here

**New to this?** Follow this order:

1. **Read:** This file you're reading now (overview)
2. **Read:** `DEPLOYMENT_CHECKLIST.md` (step-by-step)
3. **Run:** `terraform/interactive-setup.sh` (automated setup)
4. **Reference:** Other guides as needed

---

## 📖 Available Guides

### Quick Start Guides

| Guide | Purpose | Read Time |
|-------|---------|-----------|
| `DEPLOYMENT_CHECKLIST.md` | Step-by-step checklist | 5 min |
| `terraform/README_AWS_SETUP.md` | Quick reference | 3 min |
| `SETUP_COMPLETE_SUMMARY.md` | What's been done + next steps | 5 min |

### Detailed Guides

| Guide | Purpose | Read Time |
|-------|---------|-----------|
| `TERRAFORM_DEPLOYMENT_GUIDE.md` | Complete setup guide with explanations | 20 min |
| `AWS_SETUP_GUIDE.md` | AWS credential setup in detail | 15 min |
| `ARCHITECTURE_DIAGRAM.md` | Visual diagrams and architecture | 10 min |

### Helper Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `terraform/interactive-setup.sh` | Guided interactive setup | `bash terraform/interactive-setup.sh` |
| `terraform/setup.sh` | Automated setup | `bash terraform/setup.sh` |

---

## 🚀 Three Ways to Deploy

### Option 1: Interactive Setup (Easiest! 🌟)
```bash
bash /Users/chamindu/Documents/GitHub/Aloka/terraform/interactive-setup.sh
```
- Walks you through each step
- Automates S3 bucket creation
- Handles Terraform init/plan/apply
- **Recommended for first-time users**

### Option 2: Follow the Checklist
1. Open `DEPLOYMENT_CHECKLIST.md`
2. Follow each step carefully
3. Verify each step works before moving on
4. **Good if you want to understand each step**

### Option 3: Manual Commands
```bash
# 1. Create S3 bucket
BUCKET_NAME="aloka-terraform-state-$(date +%s)"
aws s3api create-bucket --bucket "$BUCKET_NAME" --region us-east-1

# 2. Update provider.tf with bucket name

# 3. Initialize Terraform
cd terraform && terraform init

# 4. Validate
terraform validate

# 5. Plan
terraform plan -out=tfplan

# 6. Apply
terraform apply tfplan

# 7. View outputs
terraform output
```
**Advanced users only**

---

## 📋 What Gets Deployed

```
AWS Infrastructure
├─ VPC (10.0.0.0/16)
│  ├─ Public Subnets (2)
│  │  └─ EC2 t3.small (Docker, Docker Compose)
│  │     └─ Security Group: HTTP/HTTPS from internet
│  │
│  └─ Private Subnets (2)
│     └─ RDS PostgreSQL 15.4 db.t3.micro
│        └─ Database: alokadb
│        └─ Security Group: Port 5432 from EC2 only
│
├─ NAT Gateway (for internet access from private)
├─ Internet Gateway (for EC2 access from internet)
└─ State File in S3 (aloka-terraform-state)
```

**Cost:** ~$85/month

**Time to Deploy:** 15-20 minutes

---

## 🔑 Key Files

### Terraform Configuration
| File | Purpose |
|------|---------|
| `terraform/provider.tf` | AWS provider, S3 backend, version constraints |
| `terraform/variables.tf` | Variable definitions (what can be configured) |
| `terraform/terraform.tfvars` | Variable values (your settings) |
| `terraform/main.tf` | All AWS resources (VPC, EC2, RDS, Security Groups) |
| `terraform/outputs.tf` | Output values (IPs, DNS, endpoints) |

### Documentation
| File | Content |
|------|---------|
| `DEPLOYMENT_CHECKLIST.md` | Step-by-step checklist |
| `TERRAFORM_DEPLOYMENT_GUIDE.md` | Detailed guide with explanations |
| `AWS_SETUP_GUIDE.md` | AWS credential setup |
| `ARCHITECTURE_DIAGRAM.md` | Diagrams and architecture |
| `terraform/README_AWS_SETUP.md` | Quick reference |

---

## 🛠️ Required Prerequisites

✅ **AWS CLI** - Already installed
✅ **Terraform** - Already installed (usually)
❓ **AWS Credentials** - Need to create (5 min)
❓ **S3 Backend Bucket** - Need to create (3 min)

### Get AWS Credentials

1. Open: https://console.aws.amazon.com
2. Go to **IAM** → **Users** → **Create user**
3. Name: `terraform-user`
4. Attach: `AdministratorAccess` policy
5. Create **access keys**
6. Copy Access Key ID and Secret Access Key

### Configure Locally

```bash
aws configure --profile default
```

Paste your Access Key ID and Secret Access Key when prompted.

---

## 🎯 Step-by-Step (50,000 ft view)

### Phase 1: Prepare (10 minutes)
- [ ] Create AWS IAM user and get credentials
- [ ] Run `aws configure --profile default`
- [ ] Verify: `aws sts get-caller-identity`

### Phase 2: Create Backend (5 minutes)
- [ ] Create S3 bucket for Terraform state
- [ ] Update `provider.tf` with bucket name
- [ ] Enable S3 versioning

### Phase 3: Configure (5 minutes)
- [ ] Update `terraform/terraform.tfvars` with settings
- [ ] Generate strong password for database
- [ ] Keep `aws_region = "us-east-1"`
- [ ] Keep `aws_profile = "default"`

### Phase 4: Deploy (15 minutes)
- [ ] Run `terraform init`
- [ ] Run `terraform validate`
- [ ] Run `terraform plan -out=tfplan`
- [ ] Review the plan
- [ ] Run `terraform apply tfplan`
- [ ] Wait 15-20 minutes for resources to create

### Phase 5: Verify (5 minutes)
- [ ] Run `terraform output` to see IPs/endpoints
- [ ] SSH into EC2 instance
- [ ] Verify Docker is running
- [ ] Verify database is accessible

### Phase 6: Deploy App (10 minutes)
- [ ] Clone your Aloka repository on EC2
- [ ] Run `docker-compose up -d`
- [ ] Access your app at `http://<public-ip>`

---

## ✅ Success Indicators

You'll know it's working when:

✅ `terraform apply` completes without errors
✅ `terraform output` shows IP addresses and endpoints
✅ EC2 instance appears in AWS console
✅ RDS database appears in AWS console
✅ Can SSH into EC2 instance
✅ Docker is installed and running on EC2
✅ Application is accessible via browser

---

## 🆘 Troubleshooting Quick Guide

| Problem | Solution |
|---------|----------|
| "No valid credential sources found" | Run `aws configure --profile default` |
| S3 bucket creation fails | Bucket names must be globally unique |
| "Backend initialization failed" | Update bucket name in `provider.tf` |
| "terraform validate" fails | Run `terraform init` first to download providers |
| "access denied" for S3 | Check IAM user has `AdministratorAccess` |
| Can't SSH to EC2 | Create EC2 key pair first |
| RDS not accessible | Check security group rules |

**See full troubleshooting in `TERRAFORM_DEPLOYMENT_GUIDE.md`**

---

## 📱 Commands You'll Need

```bash
# Check AWS credentials
aws sts get-caller-identity

# Create S3 bucket
aws s3api create-bucket --bucket NAME --region us-east-1

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Show what will be created
terraform plan -out=tfplan

# Deploy to AWS
terraform apply tfplan

# View outputs
terraform output

# Destroy everything (cleanup)
terraform destroy

# SSH into EC2
ssh -i ~/.ssh/aloka-key.pem ec2-user@PUBLIC_IP

# Deploy application
docker-compose up -d

# View logs
docker-compose logs -f
```

---

## 🎓 Understanding the Setup

### Why S3 Backend?
- Stores Terraform state remotely (not on your machine)
- Enables team collaboration
- Keeps state safe with versioning
- Prevents accidental state deletion

### Why Private RDS?
- Database not accessible from internet
- More secure - only EC2 can access it
- Follows AWS best practices
- Data stays internal to your VPC

### Why NAT Gateway?
- Allows private subnets to reach internet
- For downloading packages and updates
- Keeps database "behind" the gateway
- Costs ~$32/month to run

### Why Security Groups?
- Firewall rules for each resource
- App SG: Allow HTTP/HTTPS from internet
- DB SG: Allow PostgreSQL (5432) from app only
- Follows principle of least privilege

---

## 🚀 Ready to Start?

### Quick Path (20 minutes)
```bash
# Step 1: Get credentials from AWS
# (https://console.aws.amazon.com → IAM → Users → Create user)

# Step 2: Configure AWS locally
aws configure --profile default

# Step 3: Run the interactive setup
/Users/chamindu/Documents/GitHub/Aloka/terraform/interactive-setup.sh

# Done! Your infrastructure is now deployed!
```

### Detailed Path (30 minutes)
1. Open `DEPLOYMENT_CHECKLIST.md`
2. Follow each step
3. Take your time understanding each part

---

## 📞 Need Help?

1. **Check the docs** - They have comprehensive answers
2. **Review AWS Console** - See what resources were created
3. **Check Terraform logs** - Run with `terraform apply -v`
4. **Read error messages** - They're usually helpful!

---

## 🎉 You're Ready!

Everything is set up and documented. 

**Next Step:** Run the interactive setup script or follow the checklist.

**Time to Deploy:** 30-40 minutes total (including waiting for AWS to create resources)

**Good luck! 🚀**

---

## 📚 Documentation Quick Links

- **Start here:** `DEPLOYMENT_CHECKLIST.md`
- **AWS setup:** `AWS_SETUP_GUIDE.md`
- **Full guide:** `TERRAFORM_DEPLOYMENT_GUIDE.md`
- **Architecture:** `ARCHITECTURE_DIAGRAM.md`
- **Quick ref:** `terraform/README_AWS_SETUP.md`

---

**Last Updated:** January 2026
**Status:** ✅ Complete and Ready to Deploy
