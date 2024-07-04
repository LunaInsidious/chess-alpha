ENV_GITLABCI_FILE := .env.gitlabci
ENV_GITLABCI = $(shell cat $(ENV_GITLABCI_FILE))
# コンマ区切りで go の package を列挙する
COVERAGE_TARGET_PACKAGES = chess-alpha/server/adapter/database,chess-alpha/server/adapter/database/model,chess-alpha/server/api/handler,chess-alpha/server/api/router,chess-alpha/server/api/schema,chess-alpha/server/config,chess-alpha/server/domain/constructor,chess-alpha/server/domain/entconst,chess-alpha/server/domain/entity,chess-alpha/server/domain/validation,chess-alpha/server/log,chess-alpha/server/usecase/input_port,chess-alpha/server/usecase/interactor,chess-alpha/server/usecase/output_port,chess-alpha/server/util/set

TEST_NAME := Test
APP_NAME := cdk-ecs-rds-template

# App Server
.PHONY: run-dev
run-dev:
	docker compose -f docker-compose.dev.yml up --build --no-recreate

.PHONY: run-test
run-test:
	docker compose -f docker-compose.test.yml up --build --no-recreate

.PHONY: destroy
destroy:
ifeq ($(ENV),development)
# 開発コンテナ
	rm -rf mysql/mysql-data
else ifeq ($(ENV),test)
# テストコンテナ
	@echo "[warning] test environment does not have persistent data."
else ifeq ($(ENV),devcontainer)
# devcontainerのターミナル
	rm -rf mysql/mysql-data
else
# devcontainer以外のターミナル
	docker compose -f docker-compose.dev.yml -f docker-compose.test.yml down --volumes --remove-orphans
	rm -rf mysql/mysql-data || rd /s /q mysql\mysql-data
endif


# MySQL
.PHONY: init-db
init-db:
ifeq ($(ENV),development)
	go run cmd/initdb/initdb.go
else ifeq ($(ENV),test)
	@echo "[warning] this is test environment. init-db should be run on development environment"
else ifeq ($(ENV),devcontainer)
	docker exec -it $(APP_NAME)_devcontainer-api-1 sh -c 'go run cmd/initdb/initdb.go'
else
	docker exec server-api-1 go run cmd/initdb/initdb.go
endif

# Tools
.PHONY: tools
tools:
	go install github.com/cosmtrek/air@v1.49.0
	go install github.com/golang/mock/mockgen@latest
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.54.1

# Lint, Format
.PHONY: lint-initial
lint-init: tools
	golangci-lint run ./... --timeout=5m

.PHONY: lint
lint:
	golangci-lint run ./... --timeout=5m

.PHONY: format-initial
format-init: tools
	golangci-lint run ./... --fix

.PHONY: format
format:
	golangci-lint run ./... --fix

.PHONY: test
test:
ifeq ($(ENV),development)
	@echo "[warning] this is development environment.test should be run on test environment"
else ifeq ($(ENV),test)
	go test -v ./...
else ifeq ($(ENV),devcontainer)
	docker exec -it $(APP_NAME)_devcontainer-test-api-1 sh -c 'go test -v ./...'
else
	docker exec api-test-api-1 go test -v ./...
endif

.PHONY: partial-test
partial-test:
ifeq ($(ENV),development)
	@echo "[warning] this is development environment.test should be run on test environment"
else ifeq ($(ENV),test)
	go test -v ./integration_test -run $(TEST_NAME)
else ifeq ($(ENV),devcontainer)
	docker exec -it $(APP_NAME)_devcontainer-test-api-1 sh -c 'go test -v ./integration_test -run $(TEST_NAME)'
else
	docker exec api-test-api-1 go test -v ./integration_test -run $(TEST_NAME)
endif

.PHONY: test-without-db
test-without-db:
ifeq ($(ENV),development)
	@echo "[warning] this is development environment.test should be run on test environment"
else ifeq ($(ENV),test)
	go test `go list ./... | grep -v chess-alpha/server/integration_tests`
else ifeq ($(ENV),devcontainer)
	docker exec -it $(APP_NAME)_devcontainer-test-api-1 sh -c 'go test `go list ./... | grep -v chess-alpha/server/integration_tests`'
else
	docker exec api-test-api-1 go test `go list ./... | grep -v chess-alpha/server/integration_tests`
endif

.PHONY: test-github
test-github:
	go test -v -cover -coverpkg $(COVERAGE_TARGET_PACKAGES) ./... -coverprofile=coverage.txt && go tool cover -func coverage.txt
	go get github.com/boumenot/gocover-cobertura
	go run github.com/boumenot/gocover-cobertura < coverage.txt > coverage.xml

.PHONY: test-coverage
test-coverage:
ifeq ($(ENV),development)
	@echo "[warning] this is development environment.test should be run on test environment"
else ifeq ($(ENV),test)
	go test -v -cover -coverpkg $(COVERAGE_TARGET_PACKAGES) ./... -coverprofile=cover.out && go tool cover -html=cover.out -o cover.html && go tool cover -func cover.out
else ifeq ($(ENV),devcontainer)
	docker exec -it $(APP_NAME)_devcontainer-test-api-1 sh -c 'go test -v -cover -coverpkg $(COVERAGE_TARGET_PACKAGES) ./... -coverprofile=cover.out && go tool cover -html=cover.out -o cover.html && go tool cover -func cover.out'
else
	docker exec api-test-api-1 sh -c 'go test -v -cover -coverpkg $(COVERAGE_TARGET_PACKAGES) ./... -coverprofile=cover.out && go tool cover -html=cover.out -o cover.html && go tool cover -func cover.out'
endif

.PHONY: migrate
migrate:
ifeq ($(ENV),development)
	migrate -path mysql/migrations -database "mysql://$$DB_USER:$$DB_PASSWORD@tcp($$DB_HOST:$$DB_PORT)/$$DB_NAME?multiStatements=true" up
else ifeq ($(ENV),test)
	migrate -path mysql/migrations -database "mysql://$$DB_USER:$$DB_PASSWORD@tcp($$DB_HOST:$$DB_PORT)/$$DB_NAME?multiStatements=true" up
else ifeq ($(ENV),devcontainer)
	docker exec -it $(APP_NAME)_devcontainer-api-1 sh -c 'migrate -path mysql/migrations -database "mysql://$$DB_USER:$$DB_PASSWORD@tcp($$DB_HOST:$$DB_PORT)/$$DB_NAME?multiStatements=true" up'
else
	docker exec api-api-1 migrate -path mysql/migrations -database "mysql://$$DB_USER:$$DB_PASSWORD@tcp($$DB_HOST:$$DB_PORT)/$$DB_NAME?multiStatements=true" up
endif

.PHONY: check
check:
	echo "called"
