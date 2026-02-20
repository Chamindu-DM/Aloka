#!/bin/bash
set -e

echo "🚀 Deploying Two-Server DevOps Architecture"
echo "============================================="
echo ""

# Change to terraform directory
cd "$(dirname "$0")/terraform"

# Check if destroying old infrastructure
if [ "$1" == "--destroy-old" ]; then
    echo "⚠️  Destroying old infrastructure..."
    terraform destroy -auto-approve || true
    echo ""
fi

# Initialize and apply Terraform
echo "📦 Initializing Terraform..."
terraform init

echo ""
echo "📋 Planning infrastructure..."
terraform plan

echo ""
read -p "📝 Apply this plan? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🏗️  Creating infrastructure..."
terraform apply -auto-approve

echo ""
echo "⏳ Waiting for servers to initialize (3 minutes)..."
sleep 180

echo ""
echo "📊 Getting server information..."
JENKINS_IP=$(terraform output -raw jenkins_public_ip)
APP_IP=$(terraform output -raw app_public_ip)

echo ""
echo "✅ Infrastructure deployed successfully!"
echo ""
echo "================================================"
echo "🔧 JENKINS SERVER"
echo "================================================"
echo "IP:  $JENKINS_IP"
echo "URL: http://$JENKINS_IP:8080"
echo ""
echo "To get admin password:"
echo "  ssh -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@$JENKINS_IP \\"
echo "    'docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword'"
echo ""
echo "================================================"
echo "🌐 APPLICATION SERVER"
echo "================================================"
echo "IP:       $APP_IP"
echo "Frontend: http://$APP_IP"
echo "Backend:  http://$APP_IP:5001"
echo ""
echo "================================================"

# Setup application server
echo ""
read -p "🚢 Deploy application to app server now? (yes/no): " DEPLOY_APP
if [ "$DEPLOY_APP" == "yes" ]; then
    echo ""
    echo "📤 Copying docker-compose.yml to application server..."
    cd ..
    scp -o StrictHostKeyChecking=no -i ~/.ssh/aloka-deployment-key-new.pem \
        docker-compose.app.yml ec2-user@$APP_IP:/home/ec2-user/docker-compose.yml
    
    echo ""
    echo "🐳 Deploying containers on application server..."
    ssh -o StrictHostKeyChecking=no -i ~/.ssh/aloka-deployment-key-new.pem ec2-user@$APP_IP << 'ENDSSH'
        cd /home/ec2-user
        docker-compose pull
        docker-compose up -d
        echo ""
        echo "📊 Container status:"
        docker-compose ps
ENDSSH
    
    echo ""
    echo "✅ Application deployed successfully!"
fi

echo ""
echo "================================================"
echo "📝 NEXT STEPS"
echo "================================================"
echo "1. Access Jenkins at: http://$JENKINS_IP:8080"
echo "2. Complete Jenkins setup (install plugins, create admin user)"
echo "3. Add Jenkins credentials:"
echo "   - dockerhub-credentials (Docker Hub login)"
echo "   - aws-ssh-credentials (SSH key for app server)"
echo "   - ec2-host-ip (App server IP: $APP_IP)"
echo "4. Create pipeline job pointing to Jenkinsfile.advanced"
echo "5. Add GitHub webhook: http://$JENKINS_IP:8080/github-webhook/"
echo ""
echo "📖 Full guide: TWO_SERVER_DEPLOYMENT.md"
echo ""
echo "🎉 Deployment complete!"
