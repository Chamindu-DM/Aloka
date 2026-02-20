#!/bin/bash
set -e

echo "🚀 Setting up Jenkins Server..."

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

# Wait for Docker to be ready
sleep 10

# Run Jenkins container with Docker support
docker run -d \
  --name jenkins \
  --restart=always \
  -p 8080:8080 \
  -p 50000:50000 \
  -u root \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts

# Wait for Jenkins to start
sleep 30

# Install Docker CLI inside Jenkins container
docker exec -u root jenkins bash -c "
  apt-get update && 
  apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release &&
  curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg &&
  echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bullseye stable' | tee /etc/apt/sources.list.d/docker.list > /dev/null &&
  apt-get update &&
  apt-get install -y docker-ce-cli docker-compose-plugin
"

# Fix Docker socket permissions
chmod 666 /var/run/docker.sock

# Create systemd service for Docker socket permissions
cat > /etc/systemd/system/docker-socket-permissions.service << 'SYSTEMD'
[Unit]
Description=Fix Docker Socket Permissions for Jenkins
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
ExecStart=/bin/chmod 666 /var/run/docker.sock
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
SYSTEMD

systemctl daemon-reload
systemctl enable docker-socket-permissions.service
systemctl start docker-socket-permissions.service

echo "✅ Jenkins Server setup complete!"
echo "Access Jenkins at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8080"
