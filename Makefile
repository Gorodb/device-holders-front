DOCKER_COMPOSE_FILE := docker-compose.yml
WEB_BASE_IMAGE_REPOSITORY := registry.restream.ru:5000/ramis-vakazov/device-mon-frontend
APP_DIR := /apt/app/device-mon-backend

.PHONY: update-image
update-image:
	docker build --no-cache --pull --tag "$(WEB_BASE_IMAGE_REPOSITORY)" .
	docker push "$(WEB_BASE_IMAGE_REPOSITORY)"

.PHONY: copy_env
copy_env:
	scp /Users/ramisvakazov/projects/device-holders-front/.env.production root@10.50.168.65:projects/.env.production
