# Variables
COMPOSE=docker compose -f docker-compose.yaml
DOCKER_BE=docker build --build-arg FLASK_APP=app -t taskly-backend -f taskly-backend/Dockerfile taskly-backend
DOCKER_FE=docker build --build-arg VITE_API_BASE_URL=http://localhost:5001/ -t taskly-frontend -f taskly-frontend/Dockerfile taskly-frontend

# Build both frontend and backend images
build:
	$(DOCKER_BE)
	$(DOCKER_FE)

# Start containers (detached mode)
up:
	$(COMPOSE) up --build

# Stop and remove containers
down:
	$(COMPOSE) down

# Restart containers
restart: down up

# View logs
logs:
	$(COMPOSE) logs -f

# Run backend shell
backend-shell:
	docker exec -it taskly-backend sh

# Run frontend shell
frontend-shell:
	docker exec -it taskly-frontend sh

# Clean up dangling Docker images & volumes
clean:
	docker system prune -f
	docker volume prune -f
