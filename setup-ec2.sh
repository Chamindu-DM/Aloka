#!/bin/bash
# Automated EC2 Setup Script for Aloka Project

EC2_IP="44.222.219.180"
SSH_KEY="~/.ssh/aloka-deployment-key-new.pem"
APP_DIR="/home/ec2-user/aloka"

echo "🚀 Setting up Aloka on EC2: $EC2_IP"
echo "================================================"

# Wait for EC2 to be fully ready
echo "⏳ Waiting for EC2 instance to be ready..."
sleep 10

# Test connection
echo "🔗 Testing SSH connection..."
if ! ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 -i $SSH_KEY ec2-user@$EC2_IP 'echo "✅ Connected!"'; then
    echo "❌ Cannot connect to EC2. Please wait a few more minutes for the instance to boot."
    exit 1
fi

echo ""
echo "📁 Creating application directory..."
ssh -i $SSH_KEY ec2-user@$EC2_IP "mkdir -p $APP_DIR/backend"

echo ""
echo "📤 Uploading docker-compose.yml..."
scp -i $SSH_KEY docker-compose.prod.yml ec2-user@$EC2_IP:$APP_DIR/docker-compose.yml

echo ""
echo "📝 Creating backend .env file..."
ssh -i $SSH_KEY ec2-user@$EC2_IP << 'ENDSSH'
cat > /home/ec2-user/aloka/backend/.env << 'EOF'
DB_USER=postgres
DB_HOST=db
DB_DATABASE=aloka-db
DB_PASSWORD=1234
DB_DBPORT=5432
PORT=5001
EOF
echo "✅ .env file created"
ENDSSH

echo ""
echo "🐳 Deploying Docker containers..."
ssh -i $SSH_KEY ec2-user@$EC2_IP << 'ENDSSH'
cd /home/ec2-user/aloka
echo "Pulling Docker images..."
docker-compose pull
echo ""
echo "Starting containers..."
docker-compose up -d
echo ""
echo "Waiting for containers to start..."
sleep 10
echo ""
echo "📊 Container status:"
docker-compose ps
ENDSSH

echo ""
echo "================================================"
echo "✅ Deployment Complete!"
echo ""
echo "🌐 Access your application:"
echo "  Frontend:  http://$EC2_IP"
echo "  Backend:   http://$EC2_IP:5001"
echo "  Jenkins:   http://$EC2_IP:8080"
echo ""
echo "📝 Next steps:"
echo "  1. Update Jenkins credential 'ec2-host-ip' to: $EC2_IP"
echo "  2. Update Jenkins credential 'aws-ssh-credentials' to use aloka-deployment-key-new.pem"
echo "  3. Set up GitHub webhook pointing to: http://$EC2_IP:8080/github-webhook/"
echo ""
