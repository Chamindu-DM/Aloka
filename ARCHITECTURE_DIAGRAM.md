# Aloka AWS Architecture Diagram

## Overall Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                     AWS (us-east-1)                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  VPC: 10.0.0.0/16                                    │  │
│  │                                                      │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │  Internet Gateway                           │  │  │
│  │  └─────────────────┬──────────────────────────┘  │  │
│  │                    │                              │  │
│  │  ┌────────────────┴────────────────┐             │  │
│  │  │      NAT Gateway               │             │  │
│  │  └────────────────┬────────────────┘             │  │
│  │                   │                              │  │
│  │  PUBLIC SUBNETS   │   PRIVATE SUBNETS            │  │
│  │  ─────────────────┼──────────────────            │  │
│  │                   │                              │  │
│  │  ┌──────────┐     │    ┌──────────────────┐     │  │
│  │  │   EC2    │────┼───▶│  RDS PostgreSQL  │     │  │
│  │  │ t3.small │◀───┼────│  db.t3.micro     │     │  │
│  │  │          │    │    │                  │     │  │
│  │  │ (Docker) │    │    │  alokadb (20GB)  │     │  │
│  │  │          │    │    │                  │     │  │
│  │  └──────────┘    │    └──────────────────┘     │  │
│  │  10.0.1.0/24     │    10.0.10.0/24             │  │
│  │  10.0.2.0/24     │    10.0.11.0/24             │  │
│  │                  │                              │  │
│  │  App Security    │    DB Security               │  │
│  │  Group (HTTP,    │    Group (5432 from         │  │
│  │  HTTPS from web) │    app SG only)              │  │
│  │                  │                              │  │
│  └──────────────────┴──────────────────────────────┘  │
│                                                        │
│  STATE: Stored in S3 bucket (aloka-terraform-state)  │
│         with versioning enabled                      │
│                                                        │
└─────────────────────────────────────────────────────────────┘
```

## Network Flow

```
Internet Users
    ↓ HTTP/HTTPS (ports 80, 443)
    ↓
┌──────────────────────────────────────┐
│   Internet Gateway                   │
└────────────┬─────────────────────────┘
             ↓
┌──────────────────────────────────────┐
│   EC2 Instance (Public Subnet)       │
│   - IP: from 10.0.1.0/24 or 10.0.2.0/24
│   - Public IP: Assigned by AWS       │
│   - Runs Docker & Docker Compose     │
│   - Port 80, 443 accessible from web │
└────────────┬─────────────────────────┘
             ↓ (Internal AWS network)
             ↓ (Port 5432 - PostgreSQL)
             ↓ (Security group controlled)
┌──────────────────────────────────────┐
│   RDS PostgreSQL (Private Subnet)    │
│   - IP: from 10.0.10.0/24 or 10.0.11.0/24
│   - NO public IP (not internet-accessible)
│   - Only accessible from EC2         │
│   - Database: alokadb                │
│   - User: postgres                   │
└──────────────────────────────────────┘

EC2 → NAT Gateway → Internet
(for downloading packages, updates, etc.)
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Application Security Group (aloka-app-sg)              │
│                                                         │
│  Ingress Rules:                                         │
│  ├─ Port 80 (HTTP) from 0.0.0.0/0  ✅ (from internet) │
│  ├─ Port 443 (HTTPS) from 0.0.0.0/0 ✅ (from internet) │
│  └─ All ports from itself (for internal comms)         │
│                                                         │
│  Egress Rules:                                          │
│  └─ All traffic to anywhere  ✅ (for internet access)  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Database Security Group (aloka-db-sg)                  │
│                                                         │
│  Ingress Rules:                                         │
│  ├─ Port 5432 (PostgreSQL)                             │
│  │  from: aloka-app-sg only  ✅ (EC2 can connect)     │
│  │  NO access from internet   ✅ (private only)        │
│  └─ All other ports: DENIED   ✅ (locked down)        │
│                                                         │
│  Egress Rules:                                          │
│  └─ All traffic to anywhere  ✅                        │
└─────────────────────────────────────────────────────────┘

Benefits:
✅ Public can only access EC2 (via HTTP/HTTPS)
✅ EC2 can reach database (via port 5432)
✅ Database completely hidden from internet
✅ No database credentials exposed
```

## Data Flow: User → App → Database

```
Step 1: User visits your app
└─ Browser → HTTP/HTTPS → EC2 Public IP:80/443

Step 2: Docker container handles request
└─ Docker receives request
└─ Application code processes request
└─ If needed, queries database

Step 3: App connects to database
└─ EC2 sends SQL query → RDS
└─ Source: EC2 Security Group ✅ Allowed
└─ Destination: Port 5432 ✅ Allowed
└─ RDS processes query
└─ RDS sends results back → EC2

Step 4: Response to user
└─ Application generates response
└─ Docker sends response → Browser
└─ Browser displays result to user
```

## File Organization in Terraform

```
terraform/
│
├── provider.tf          # AWS configuration & S3 backend
│   ├─ region: us-east-1
│   ├─ profile: default (from aws_profile variable)
│   ├─ backend: S3 (aloka-terraform-state)
│   └─ state location: s3://bucket/prod/terraform.tfstate
│
├── variables.tf         # Input variables definition
│   ├─ aws_region (default: us-east-1)
│   ├─ aws_profile (default: null, can be "default" or "aloka-dev")
│   ├─ environment (default: dev)
│   ├─ project_name (default: aloka)
│   └─ db_password (required, sensitive)
│
├── terraform.tfvars     # Variable values (your settings)
│   ├─ aws_region: us-east-1
│   ├─ aws_profile: default
│   ├─ environment: dev
│   ├─ project_name: aloka
│   └─ db_password: ChangeMe123!Secure (CHANGE THIS!)
│
├── main.tf              # Infrastructure resources
│   ├─ module.vpc (using terraform-aws-modules/vpc)
│   │  ├─ VPC: 10.0.0.0/16
│   │  ├─ Public subnets: 10.0.1.0/24, 10.0.2.0/24
│   │  ├─ Private subnets: 10.0.10.0/24, 10.0.11.0/24
│   │  ├─ NAT Gateway: 1 (for internet access from private)
│   │  └─ DNS hostnames: enabled
│   │
│   ├─ aws_security_group.app (Application)
│   │  ├─ Port 80: HTTP from anywhere
│   │  ├─ Port 443: HTTPS from anywhere
│   │  └─ Egress: All traffic allowed
│   │
│   ├─ aws_security_group.db (Database)
│   │  ├─ Port 5432: PostgreSQL from app SG only
│   │  └─ Egress: All traffic allowed
│   │
│   ├─ aws_db_subnet_group.main
│   │  └─ Spans private subnets (for RDS placement)
│   │
│   ├─ aws_db_instance.postgres (RDS)
│   │  ├─ Engine: PostgreSQL 15.4
│   │  ├─ Instance: db.t3.micro
│   │  ├─ Storage: 20GB
│   │  ├─ Database: alokadb
│   │  ├─ User: postgres
│   │  ├─ Password: from variable
│   │  ├─ In private subnets: YES
│   │  ├─ Publicly accessible: NO
│   │  └─ Backup/snapshot: disabled
│   │
│   └─ aws_instance.app (EC2)
│      ├─ AMI: Amazon Linux 2
│      ├─ Type: t3.small
│      ├─ Subnet: Public (10.0.1.0/24 or 10.0.2.0/24)
│      ├─ Security group: app SG
│      └─ User data: Install Docker & Docker Compose
│
├── outputs.tf           # Output values
│   ├─ app_public_ip: IP address of EC2
│   ├─ app_public_dns: DNS name of EC2
│   ├─ db_endpoint: RDS endpoint (hostname:port)
│   ├─ db_subnet_group_name: DB subnet group name
│   ├─ app_security_group_id: App SG ID
│   ├─ db_security_group_id: DB SG ID
│   └─ vpc_id: VPC ID
│
└── .terraform/          # Terraform working directory
    ├─ providers/        # Downloaded providers (AWS plugin)
    ├─ modules/          # Downloaded modules (VPC module)
    └─ terraform.lock    # Dependency lock file
```

## Deployment Timeline

```
$ terraform init
├─ Downloads AWS provider
├─ Downloads VPC module
├─ Creates .terraform/ directory
└─ Initializes S3 backend

$ terraform plan -out=tfplan
├─ Reads infrastructure code
├─ Compares with actual AWS resources
└─ Generates execution plan

$ terraform apply tfplan
├─ Creates VPC (1-2 min)
├─ Creates Subnets (1 min)
├─ Creates NAT Gateway (5-10 min)
├─ Creates Security Groups (1 min)
├─ Creates RDS Instance (10-15 min) ⏳ SLOWEST
├─ Creates EC2 Instance (2-3 min)
├─ Runs user_data script (installs Docker)
└─ Saves state to S3
TOTAL TIME: 15-20 minutes
```

## Resource Dependencies

```
VPC
├─ Subnets (depends on VPC)
│  ├─ EC2 Instance (depends on public subnet)
│  └─ RDS Subnet Group (depends on private subnets)
│     └─ RDS Database (depends on subnet group)
│
Security Groups (depend on VPC)
├─ App SG (for EC2)
└─ DB SG (for RDS, depends on App SG)

EC2 Instance (depends on)
├─ Public subnet
├─ App security group
└─ Internet Gateway (via VPC)

RDS Instance (depends on)
├─ DB subnet group
├─ DB security group
└─ App security group (referenced by DB SG)

NAT Gateway (depends on)
├─ Public subnet
├─ Elastic IP
└─ Internet Gateway
```

## Environment Variables in Use

```
AWS_REGION="us-east-1"           # AWS region
AWS_PROFILE="default"            # AWS CLI profile (optional)
AWS_ACCESS_KEY_ID="AKIA..."      # From IAM user
AWS_SECRET_ACCESS_KEY="wJalr..." # From IAM user
TF_VAR_db_password="..."         # Database password
```

## State File Location

```
Local Development:
├─ terraform.tfstate          # Local copy of state
└─ terraform.tfstate.backup   # Backup of previous state

Production (S3 Backend):
├─ S3 Bucket: aloka-terraform-state
│  └─ Key: prod/terraform.tfstate
│     └─ Content: JSON with all resource info
│     └─ Versioning: Enabled (all versions kept)
│     └─ Lock: DynamoDB (optional, prevents concurrent changes)
└─ Access: Restricted to IAM user credentials
```

---

**Next Step:** Read DEPLOYMENT_CHECKLIST.md and start deploying! 🚀
