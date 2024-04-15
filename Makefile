SHELL := /bin/bash

ENV ?= prod

.PHONY: build
build:
	docker compose up --build -d

.PHONY: down
down:
	docker compose down --remove-orphans -v --rmi all

.PHONY: re-build
re-build:
	$(MAKE) down
	$(MAKE) build

.PHONY: logs
logs:
	docker compose logs -f

.PHONY: deploy
deploy:
	php composer.phar install
	php bin/console cache:clear
	npm run build

.PHONY: quality
quality:
	composer phpcs
	composer phpstan
	composer phpmd
