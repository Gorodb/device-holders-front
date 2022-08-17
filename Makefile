DOCKER_COMPOSE_FILE := docker-compose.yml
WEB_BASE_IMAGE_REPOSITORY := rvakazov/allure-server:latest
APP_DIR := /apt/app/device-mon-backend

.PHONY: update-image
update-image:
	docker build --no-cache --pull --tag "$(WEB_BASE_IMAGE_REPOSITORY)" .
	docker push "$(WEB_BASE_IMAGE_REPOSITORY)"

.PHONY: copy_env
copy_env:
	scp /Users/ramisvakazov/projects/device-holders-front/.env.production root@:projects/.env.production
