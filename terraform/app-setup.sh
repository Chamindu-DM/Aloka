#!/bin/bash
set -e

echo "🚀 Setting up Application Server..."

# Update system
dnf update -y

# Install Docker
dnf install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

echo "✅ Application Server setup complete!"
echo "Server IP: $(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
