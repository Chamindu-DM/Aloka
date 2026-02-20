# Two-Server DevOps Architecture Deployment Guide

## Architecture Overview

```
┌─────────────────────────────┐
│   Jenkins Server (EC2)      │
│   - CI/CD Pipeline          │
│   - Docker Build            │
│   - Push to Docker Hub      │
│   - Port: 8080              │
└─────────────┬───────────────┘
              │
              │ SSH Deploy
              ↓
┌─────────────────────────────┐
│  Application Server (EC2)   │
│  - Frontend (Port 80)       │
│  - Backend (Port 5001)      │
│  - PostgreSQL Database      │
└─────────────────────────────┘
              ↑
              │
         Docker Hub
    (chamindudm/aloka-*)
```

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI configured with your credentials
3. Terraform installed (v1.0+)
4. SSH key pair: `aloka-deployment-key-new`
5. Docker Hub account: `chamindudm`

## Deployment Steps

### Step 1: Destroy Old Infrastructure (if exists)

```bash
cd terraform
terraform destroy -auto-approve
```

### Step 2: Deploy New Two-Server Architecture

```bash
cd terraform
terraform init
terraform plan
terraform apply -auto-approve
```

Wait 5-10 minutes for both servers to initialize.

### Step 3: Get Server IPs

```bash
terraform output
```

You'll see:
- `jenkins_url` - Jenkins CI/CD server
- `app_frontend_url` - Your application frontend
- `app_backend_url` - Your application backend API

### Step 4: Setup Application Server

```bash
# Get the application server IP
APP_IP=$(terraform output -raw app_public_ip)

# SSH to application server
ssh -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@$APP_IP

# Create application directory
mkdir -p /home/ec2-user/aloka
cd /home/ec2-user/aloka

# Exit
exit

# Copy docker-compose file from local machine
scp -i ~/.ssh/aloka-deployment-key-new.pem \
    ../docker-compose.app.yml \
    ec2-user@$APP_IP:/home/ec2-user/aloka/docker-compose.yml

# Deploy application
ssh -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@$APP_IP \
    'cd /home/ec2-user/aloka && docker-compose pull && docker-compose up -d'
```

### Step 5: Configure Jenkins

1. **Access Jenkins:**
   ```bash
   JENKINS_IP=$(terraform output -raw jenkins_public_ip)
   echo "Jenkins URL: http://$JENKINS_IP:8080"
   ```

2. **Get Initial Admin Password:**
   ```bash
   ssh -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@$JENKINS_IP \
       'docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword'
   ```

3. **Complete Jenkins Setup:**
   - Open Jenkins URL in browser
   - Paste the admin password
   - Install suggested plugins
   - Create admin user

4. **Add Credentials in Jenkins:**
   
   **a. Docker Hub Credentials**
   - Manage Jenkins → Credentials → (global) → Add Credentials
   - Kind: Username with password
   - Username: `chamindudm`
   - Password: Your Docker Hub password
   - ID: `dockerhub-credentials`

   **b. Application Server SSH Key**
   - Add Credentials → SSH Username with private key
   - ID: `aws-ssh-credentials`
   - Username: `ec2-user`
   - Private Key: Paste contents of `aloka-deployment-key-new.pem`

   **c. Application Server IP**
   - Add Credentials → Secret text
   - Secret: Your App Server IP (from terraform output)
   - ID: `ec2-host-ip`

5. **Create Jenkins Pipeline:**
   - New Item → `Aloka-Deployment` → Pipeline
   - Build Triggers: ✅ GitHub hook trigger for GITScm polling
   - Pipeline:
     - Definition: Pipeline script from SCM
     - SCM: Git
     - Repository URL: `https://github.com/Chamindu-DM/Aloka.git`
     - Branch: `*/main`
     - Script Path: `Jenkinsfile.advanced`
   - Save

### Step 6: Configure GitHub Webhook

1. Go to: `https://github.com/Chamindu-DM/Aloka/settings/hooks`
2. Add webhook:
   - Payload URL: `http://YOUR_JENKINS_IP:8080/github-webhook/`
   - Content type: `application/json`
   - Events: Just the push event
   - Active: ✅

### Step 7: Test the Pipeline

```bash
cd /Users/chamindu/Documents/GitHub/Aloka
echo "" >> README.md
echo "Testing two-server architecture: $(date)" >> README.md
git add README.md
git commit -m "Test two-server CI/CD pipeline"
git push origin main
```

Watch the build at: `http://YOUR_JENKINS_IP:8080/job/Aloka-Deployment/`

## How It Works

1. **Developer pushes code** → GitHub repository
2. **GitHub webhook triggers** → Jenkins server
3. **Jenkins builds Docker images** → Backend + Frontend
4. **Jenkins pushes images** → Docker Hub
5. **Jenkins SSHs to App Server** → Pulls new images from Docker Hub
6. **App Server restarts containers** → Deployment complete!

## Benefits

✅ **Separation of Concerns**: Jenkins isolated from production  
✅ **Security**: CI/CD server has elevated permissions, app doesn't  
✅ **Scalability**: Scale Jenkins and app independently  
✅ **Reliability**: If Jenkins crashes, app keeps running  
✅ **Docker Hub**: Central image registry for multiple deployments  
✅ **Industry Standard**: Professional DevOps architecture  

## Verification

After deployment:

```bash
# Check Jenkins is running
curl -I http://$(terraform output -raw jenkins_public_ip):8080

# Check application is running
curl http://$(terraform output -raw app_public_ip)
curl http://$(terraform output -raw app_public_ip):5001/api/campaigns
```

## Troubleshooting

### Jenkins can't connect to App Server
- Verify SSH key is correct in Jenkins credentials
- Check App Server IP is correct in `ec2-host-ip` credential
- Test SSH manually: `ssh -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@APP_IP`

### Docker Hub push fails
- Verify Docker Hub credentials in Jenkins
- Check Docker Hub repository exists and is public

### App not updating after deployment
- SSH to app server and check container status: `docker-compose ps`
- Check logs: `docker-compose logs backend frontend`
- Verify images were pulled: `docker images | grep chamindudm`

## Cost Optimization

- **Jenkins Server**: t2.medium (~$0.0464/hour)
- **App Server**: t2.micro (~$0.0116/hour)
- **Total**: ~$42/month

Stop Jenkins when not actively developing:
```bash
aws ec2 stop-instances --instance-ids $(terraform output -raw jenkins_instance_id)
```

## Cleanup

To destroy all resources:

```bash
cd terraform
terraform destroy -auto-approve
```

---

**Your professional two-server CI/CD pipeline is ready!** 🚀
