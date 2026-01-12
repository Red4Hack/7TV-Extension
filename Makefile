
prod: production
production:
	bun build:prod

dev:
	bun build:dev

stage:
	bun build:stage

format:
	bun format

deps:
	bun install

lint:
	bun lint
