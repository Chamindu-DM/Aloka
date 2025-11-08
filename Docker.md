# Common Docker Commands

## Stop all containers (keeps data)
docker-compose down

## Stop and remove volumes (deletes database data)
docker-compose down -v

## Restart a specific service
docker-compose restart backend

## Rebuild and restart
docker-compose up --build

## Run in background (detached mode)
docker-compose up -d

## Stop background containers
docker-compose stop

## View container status
docker-compose ps

# Access Container Shell

## Access backend container
docker exec -it aloka-backend sh

## Access database container
docker exec -it postgres-db psql -U postgres -d aloka-db

## Access frontend container
docker exec -it aloka-frontend sh

# Check If Everything Works
## Test Database Connection:
docker exec -it postgres-db psql -U postgres -d aloka-db -c "\dt"

## Check Backend Logs:
docker-compose logs backend | grep "Connected to PostgreSQL"

# Troubleshooting
## If containers don't start:

## View error logs
docker-compose logs

## Remove old containers and volumes
docker-compose down -v
docker system prune -f

## Rebuild from scratch
docker-compose up --build

## Frontend	http://localhost	React app UI
## Backend API	http://localhost:5001	REST API
## Database	localhost:5433	PostgreSQL (external access)