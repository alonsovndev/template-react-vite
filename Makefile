.PHONY: install dev test lint format ci

install:
	npm ci

dev:
	npm run dev

test:
	npm run test

lint:
	npm run lint

format:
	npm run format

# Runs exactly what the CI workflow runs.
ci:
	npm run format:check
	npm run verify
