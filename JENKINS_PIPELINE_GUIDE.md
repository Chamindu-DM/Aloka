# Jenkins CI/CD Pipeline Guide for Aloka Project

This guide explains how to use the Jenkins CI/CD pipeline to automatically build and deploy Docker images for the Aloka project.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Daily Workflow](#daily-workflow)
- [Jenkins Pipeline Usage](#jenkins-pipeline-usage)
- [Docker Commands Reference](#docker-commands-reference)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Overview

The Aloka project uses Jenkins for automated CI/CD with the following components:

- **PostgreSQL Database** (port 5433)
- **Backend API** (port 5001)
- **Frontend** (port 80)
- **Jenkins** (port 8080)

**Jenkins Pipeline automatically:**
- Builds Docker images for backend and frontend
- Runs tests
- Pushes images to Docker Hub
- Supports dev, staging, and production environments

---

## Prerequisites

- Docker Desktop installed and running
- Docker Hub account (username: `chamindudm`)
- Git installed
- Access to Jenkins at `http://localhost:8080`

---

## Getting Started

### 1. Start All Services

```bash
# Navigate to project directory
cd /Users/chamindu/Documents/GitHub/Aloka

# Start all services (PostgreSQL, Backend, Frontend, Jenkins)
docker-compose up -d

# Verify all containers are running
docker-compose ps

# Expected output: All 4 containers with status "Up"
```

### 2. Access Services

- **Frontend**: http://localhost
- **Backend API**: http://localhost:5001
- **Jenkins**: http://localhost:8080
- **PostgreSQL**: localhost:5433

### 3. View Logs

```bash
# View all services logs
docker-compose logs -f

# View specific service logs
docker logs -f jenkins
docker logs -f aloka-backend
docker logs -f aloka-frontend
docker logs -f postgres-db

# Press Ctrl+C to stop viewing logs
```

---

## Daily Workflow

### Morning - Start Work

```bash
# 1. Start all services
cd /Users/chamindu/Documents/GitHub/Aloka
docker-compose up -d

# 2. Verify everything is running
docker-compose ps

# 3. Check Jenkins is accessible
open http://localhost:8080
```

### During Development

```bash
# Make code changes
# ... edit your files ...

# Commit and push changes
git add .
git commit -m "Your commit message"
git push origin main

# Jenkins will automatically detect changes (within 5 minutes)
# and build new Docker images
```

### End of Day - Shutdown

```bash
# Option 1: Stop containers (keeps data)
docker-compose stop

# Option 2: Stop and remove containers (keeps volumes/data)
docker-compose down

# Option 3: Stop and remove everything including data
docker-compose down -v  # ⚠️ WARNING: Deletes database data!
```

---

## Jenkins Pipeline Usage

### Access Jenkins

1. Open: http://localhost:8080
2. Login with your credentials
3. Go to **Aloka-Docker-Pipeline**

### Manual Build

#### For Development Build

1. Click **"Build with Parameters"**
2. Select:
   - **DEPLOY_ENV**: `dev`
   - **VERSION_TAG**: (leave empty)
3. Click **"Build"**
4. Monitor progress in **Console Output**

**Result:** 
- Images built locally
- Tagged as `dev` and `build-X`
- NOT pushed to Docker Hub

#### For Staging Build

1. Click **"Build with Parameters"**
2. Select:
   - **DEPLOY_ENV**: `staging`
   - **VERSION_TAG**: (optional, e.g., `v1.0.0-rc1`)
3. Click **"Build"**

**Result:**
- Images built and tested
- Tagged as `staging` and version (if provided)
- Pushed to Docker Hub

#### For Production Release

1. Click **"Build with Parameters"**
2. Select:
   - **DEPLOY_ENV**: `production`
   - **VERSION_TAG**: `v1.0.0` (recommended)
3. Click **"Build"**

**Result:**
- Images built and tested
- Tagged as `production`, `latest`, and `v1.0.0`
- Pushed to Docker Hub
- Available at: https://hub.docker.com/u/chamindudm

### Automatic Builds

Jenkins automatically checks GitHub every 5 minutes for new commits:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Wait ~5 minutes
# Jenkins will automatically build using 'dev' environment
```

### View Build History

1. Go to **Aloka-Docker-Pipeline**
2. See **Build History** on left sidebar
3. Click on build number to see details
4. Click **"Console Output"** to see build logs

---

## Docker Commands Reference

### Starting Services

```bash
# Start all services in background
docker-compose up -d

# Start all services with logs visible
docker-compose up

# Start specific service only
docker-compose up -d jenkins
docker-compose up -d backend
```

### Stopping Services

```bash
# Stop all services (keeps containers)
docker-compose stop

# Stop and remove containers (keeps data)
docker-compose down

# Stop and remove containers + volumes (⚠️ deletes data)
docker-compose down -v

# Stop specific service
docker-compose stop jenkins
docker-compose stop backend
```

### Restarting Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker restart jenkins
docker restart aloka-backend
docker restart aloka-frontend
docker restart postgres-db
```

### Viewing Status

```bash
# List all running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Check service status via docker-compose
docker-compose ps
```

### Viewing Logs

```bash
# View logs for all services
docker-compose logs

# Follow logs (real-time)
docker-compose logs -f

# View logs for specific service
docker logs jenkins
docker logs aloka-backend

# Follow logs for specific service
docker logs -f jenkins

# View last 100 lines
docker logs --tail 100 jenkins
```

### Accessing Containers

```bash
# Access Jenkins container
docker exec -it jenkins bash

# Access Backend container
docker exec -it aloka-backend sh

# Access PostgreSQL container
docker exec -it postgres-db sh

# Run command in container without entering
docker exec jenkins docker ps
docker exec postgres-db psql -U postgres -d aloka-db
```

### Managing Images

```bash
# List all Docker images
docker images

# List Aloka images only
docker images | grep aloka

# Remove specific image
docker rmi chamindudm/aloka-backend:dev

# Remove unused images
docker image prune

# Remove all unused images
docker image prune -a
```

### Managing Volumes

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect aloka_postgres_data

# Remove specific volume (⚠️ deletes data)
docker volume rm aloka_postgres_data

# Remove unused volumes
docker volume prune
```

### Database Operations

```bash
# Access PostgreSQL database
docker exec -it postgres-db psql -U postgres -d aloka-db

# List all tables
docker exec -it postgres-db psql -U postgres -d aloka-db -c "\dt"

# Query users table
docker exec -it postgres-db psql -U postgres -d aloka-db -c "SELECT * FROM users;"

# Backup database
docker exec postgres-db pg_dump -U postgres aloka-db > backup.sql

# Restore database
docker exec -i postgres-db psql -U postgres aloka-db < backup.sql
```

### Cleanup Commands

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Clean everything (⚠️ DANGEROUS - removes everything)
docker system prune -a --volumes
```

---

## Troubleshooting

### Jenkins Won't Start

```bash
# Check logs
docker logs jenkins

# Restart Jenkins
docker restart jenkins

# If still failing, recreate container
docker-compose down
docker-compose up -d jenkins
```

### Can't Access Jenkins UI

```bash
# Check if Jenkins is running
docker ps | grep jenkins

# Check Jenkins logs for errors
docker logs -f jenkins

# Verify port is not in use
lsof -i :8080

# If port is busy, change port in docker-compose.yml
# ports:
#   - "8081:8080"  # Change from 8080 to 8081
```

### Pipeline Build Fails

```bash
# Check Jenkins has Docker access
docker exec jenkins docker ps

# If error, reinstall Docker in Jenkins
docker exec -it -u root jenkins bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker jenkins
chmod 666 /var/run/docker.sock
exit

# Restart Jenkins
docker restart jenkins
```

### Database Connection Issues

```bash
# Check if database is running
docker ps | grep postgres

# Check database logs
docker logs postgres-db

# Verify database is healthy
docker exec postgres-db pg_isready -U postgres

# Restart database
docker restart postgres-db
```

### Out of Disk Space

```bash
# Check disk usage
docker system df

# Clean up unused resources
docker system prune -a

# Remove old images
docker images
docker rmi <image-id>

# Remove old volumes (⚠️ check before deleting)
docker volume ls
docker volume rm <volume-name>
```

### Port Already in Use

```bash
# Check what's using the port
lsof -i :8080  # Jenkins
lsof -i :5001  # Backend
lsof -i :80    # Frontend
lsof -i :5433  # PostgreSQL

# Kill the process using the port
kill -9 <PID>

# Or change port in docker-compose.yml
```

### Can't Push to Docker Hub

```bash
# Login to Docker Hub from terminal
docker login

# Verify credentials in Jenkins
# Manage Jenkins → Credentials → Check dockerhub-credentials

# Test manual push
docker tag chamindudm/aloka-backend:dev chamindudm/aloka-backend:test
docker push chamindudm/aloka-backend:test
```

---

## Best Practices

### 1. Daily Development Workflow

```bash
# Morning
docker-compose up -d
git pull origin main

# During work
# Make changes → commit → push
# Jenkins builds automatically

# Evening
docker-compose stop
```

### 2. Before Committing Code

```bash
# Test locally first
docker-compose up -d

# Access application
open http://localhost

# Check logs for errors
docker-compose logs

# If OK, commit and push
git add .
git commit -m "Descriptive message"
git push origin main
```

### 3. Versioning Strategy

- **Development**: Auto-built as `dev` tag
- **Staging**: Manual build with RC version (e.g., `v1.0.0-rc1`)
- **Production**: Manual build with version tag (e.g., `v1.0.0`)

Example:
```bash
# Staging release
Build with: DEPLOY_ENV=staging, VERSION_TAG=v1.0.0-rc1

# Production release (after testing staging)
Build with: DEPLOY_ENV=production, VERSION_TAG=v1.0.0
```

### 4. Regular Maintenance

```bash
# Weekly: Clean unused Docker resources
docker system prune -f

# Monthly: Backup database
docker exec postgres-db pg_dump -U postgres aloka-db > backup_$(date +%Y%m%d).sql

# Check disk usage regularly
docker system df
```

### 5. Safe Shutdown

```bash
# Always use docker-compose for shutdown
docker-compose down

# Never force kill unless necessary
# Avoid: docker kill <container>
```

### 6. Environment-Specific Builds

- **dev**: For local testing, not pushed to Docker Hub
- **staging**: For QA testing, pushed to Docker Hub
- **production**: For live deployment, pushed as `latest` tag

---

## Quick Reference Card

### Most Used Commands

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View all logs
docker-compose logs -f

# Restart Jenkins
docker restart jenkins

# Check status
docker-compose ps

# Clean up
docker system prune -f

# Access Jenkins
open http://localhost:8080

# View specific service logs
docker logs -f <container-name>
```

### Emergency Commands

```bash
# Everything is broken - nuclear option
docker-compose down -v
docker system prune -a --volumes
docker-compose up -d

# Jenkins frozen
docker restart jenkins

# Database corrupted
docker-compose down
docker volume rm aloka_postgres_data
docker-compose up -d
```

---

## Additional Resources

- **Docker Documentation**: https://docs.docker.com/
- **Jenkins Documentation**: https://www.jenkins.io/doc/
- **Docker Hub Repository**: https://hub.docker.com/u/chamindudm
- **Project Repository**: https://github.com/Chamindu-DM/Aloka

---

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. View container logs: `docker logs -f <container-name>`
3. Check Jenkins build console output
4. Verify all services are running: `docker-compose ps`

---

**Last Updated**: November 11, 2025
**Pipeline Version**: v1.0.0
**Author**: Aloka Development Team
