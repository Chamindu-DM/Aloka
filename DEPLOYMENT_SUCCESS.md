# ✅ Two-Server Deployment Successful!

**Deployment Date:** February 14, 2026

## 🎉 Infrastructure Overview

Your Aloka application is now running on a proper two-server DevOps architecture:

### 🔧 Jenkins CI/CD Server (t3.micro)
- **Public IP:** 18.232.168.120
- **Jenkins URL:** http://18.232.168.120:8080
- **Instance ID:** i-00446b4ef3b49e4eb
- **Purpose:** Continuous Integration and Deployment
- **Features:**
  - Docker-in-Docker enabled
  - GitHub webhook support
  - Automated builds and deployments

### 🌐 Application Server (t3.micro)
- **Public IP:** 34.205.139.80
- **Frontend URL:** http://34.205.139.80
- **Backend URL:** http://34.205.139.80:5001
- **Instance ID:** i-04e9a525bde497b27
- **Running Services:**
  - PostgreSQL Database (port 5434)
  - Node.js Backend API (port 5001)
  - React Frontend (port 80)

### 💾 PostgreSQL RDS Database
- **Engine:** PostgreSQL 17.7
- **Instance Class:** db.t3.micro
- **Storage:** 20 GB
- **Location:** Private subnets (secure)

---

## 🔐 Jenkins Initial Setup

### Step 1: Access Jenkins
Go to: http://18.232.168.120:8080

### Step 2: Unlock Jenkins
Use this initial admin password:
```
b30e2f526da145a180c5bb149987de22
```

### Step 3: Install Plugins
Choose "Install suggested plugins" when prompted.

### Step 4: Create Admin User
Create your Jenkins admin account.

---

## 🔑 Configure Jenkins Credentials

After completing the initial setup, add these three credentials:

### 1. Docker Hub Credentials
- **ID:** `dockerhub-credentials`
- **Type:** Username with password
- **Username:** chamindudm (your Docker Hub username)
- **Password:** Your Docker Hub password/token

### 2. AWS SSH Key
- **ID:** `aws-ssh-credentials`
- **Type:** SSH Username with private key
- **Username:** ec2-user
- **Private Key:** Content of `~/.ssh/aloka-deployment-key-new.pem`

### 3. App Server IP
- **ID:** `ec2-host-ip`
- **Type:** Secret text
- **Secret:** `34.205.139.80`

---

## 🚀 Create Jenkins Pipeline

### Step 1: Create New Pipeline Job
1. Click "New Item"
2. Name it "Aloka-Deployment"
3. Select "Pipeline" type
4. Click OK

### Step 2: Configure Pipeline
1. Scroll to "Pipeline" section
2. Definition: "Pipeline script from SCM"
3. SCM: Git
4. Repository URL: Your GitHub repo URL
5. Branch: main (or your default branch)
6. Script Path: `Jenkinsfile.advanced`
7. Click "Save"

---

## 🔔 Setup GitHub Webhook

### Step 1: Go to GitHub Repository Settings
1. Navigate to your GitHub repository
2. Go to Settings → Webhooks → Add webhook

### Step 2: Configure Webhook
- **Payload URL:** `http://18.232.168.120:8080/github-webhook/`
- **Content type:** application/json
- **Which events:** Just the push event
- **Active:** ✓ (checked)

### Step 3: Save
Click "Add webhook"

---

## ✅ Test the Complete Pipeline

### Manual Test
1. In Jenkins, open "Aloka-Deployment" job
2. Click "Build Now"
3. Watch the build progress

### Automatic Test
1. Make a code change in your repository:
   ```bash
   echo "Test: $(date)" >> README.md
   git add .
   git commit -m "Test two-server deployment"
   git push
   ```
2. GitHub webhook triggers Jenkins
3. Jenkins builds Docker images
4. Images pushed to Docker Hub
5. App server pulls and runs new images

---

## 🔍 Monitoring & Troubleshooting

### Check Application Status
```bash
# SSH to app server
ssh -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@34.205.139.80

# View container logs
docker-compose logs -f

# Check container status
docker-compose ps
```

### Check Jenkins Status
```bash
# SSH to Jenkins server
ssh -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@18.232.168.120

# View Jenkins container logs
docker logs jenkins

# Check Docker inside Jenkins
docker exec jenkins docker --version
```

### View Jenkins Build Logs
1. Go to Jenkins → Aloka-Deployment
2. Click on a build number
3. Click "Console Output"

---

## 💰 Cost Optimization

Your current setup costs approximately **$25-30/month**:
- 2x t3.micro EC2 instances: ~$15/month
- 1x db.t3.micro RDS: ~$10-15/month
- Data transfer: ~$3-5/month

### To Save Money:
1. **Stop instances when not in use:**
   ```bash
   # Stop instances
   aws ec2 stop-instances --instance-ids i-00446b4ef3b49e4eb i-04e9a525bde497b27
   
   # Start instances
   aws ec2 start-instances --instance-ids i-00446b4ef3b49e4eb i-04e9a525bde497b27
   ```

2. **Schedule automatic start/stop:**
   - Use AWS Lambda + EventBridge
   - Stop at night, start in morning

3. **Delete RDS snapshots:**
   - Manual snapshots cost $0.095/GB-month
   - Keep only recent snapshots

---

## 📚 Architecture Benefits

✅ **Security:**
- Jenkins has elevated Docker permissions, app doesn't
- Database in private subnet, not publicly accessible
- Security groups isolate different services

✅ **Reliability:**
- Jenkins crashes won't affect running application
- Independent server maintenance
- Application stays available during CI/CD updates

✅ **Scalability:**
- Scale Jenkins and app servers independently
- Add more app servers behind load balancer
- Jenkins handles increased build load separately

✅ **Industry Standard:**
- Docker Hub serves as central image registry
- CI/CD infrastructure isolated from production
- Follows DevOps best practices

---

## 🎯 Next Steps

1. ✅ **Setup Complete** - Both servers running
2. ⏳ **Configure Jenkins** - Add credentials and create pipeline
3. ⏳ **Setup GitHub Webhook** - Enable automatic deployments
4. ⏳ **Test Pipeline** - Run a test build
5. ⏳ **Verify Application** - Check frontend and backend

---

## 📖 Additional Resources

- [Full Deployment Guide](TWO_SERVER_DEPLOYMENT.md)
- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Docker Hub](https://hub.docker.com/u/chamindudm)
- [AWS EC2 Console](https://console.aws.amazon.com/ec2/)

---

## 🆘 Quick Reference

### SSH Commands
```bash
# Jenkins Server
ssh -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@18.232.168.120

# App Server
ssh -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@34.205.139.80
```

### URLs
- Jenkins: http://18.232.168.120:8080
- Frontend: http://34.205.139.80
- Backend: http://34.205.139.80:5001

### Terraform Commands
```bash
cd terraform

# View current state
terraform show

# Destroy everything (when done)
terraform destroy

# View outputs
terraform output
```

---

## 🎉 Congratulations!

You now have a production-ready, industry-standard DevOps setup with:
- Automated CI/CD pipeline
- Separate Jenkins and application servers
- Secure database in private subnet
- Docker Hub image registry
- GitHub webhook integration

**Happy Deploying! 🚀**
