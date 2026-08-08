DB_HOST     ?= 127.0.0.1
DB_PORT     ?= 3312
DB_USER     ?= user
DB_PASSWORD ?= password
DB_NAME     ?= db
DOCKER_COMPOSE := docker compose -f docker/docker-compose.yml
CONTAINER_NAME := sophia_mariadb

.PHONY: up-db down-db clean rebuild-db rebuild migrate-up migrate-down schema-dump new-migration fill-testdata db-wait db-shell \
        up down help

help:
	@echo "=== DB ==="
	@echo "  make up-db          - Start MariaDB"
	@echo "  make down-db        - Stop MariaDB"
	@echo "  make clean          - Stop MariaDB and remove volume"
	@echo "  make rebuild-db     - clean + up-db + wait + migrate + testdata"
	@echo "  make db-wait        - Wait until MariaDB accepts connections"
	@echo "  make db-shell       - Open MariaDB shell"
	@echo "  make migrate-up     - Apply pending migrations"
	@echo "  make migrate-down   - Revert last migration"
	@echo "  make schema-dump    - Dump schema to db/schema.sql"
	@echo "  make new-migration [NAME=x] - Create new migration file"
	@echo "  make fill-testdata  - Load test data"
	@echo ""
	@echo "=== Combined ==="
	@echo "  make rebuild        - rebuild-db"
	@echo "  make up             - Start MariaDB"
	@echo "  make down           - Stop MariaDB"
	@echo ""
	@echo "  DB : 127.0.0.1:$(DB_PORT)  user/password  db"

# ── DB targets ────────────────────────────────────────────────────────────────

up-db:
	$(DOCKER_COMPOSE) up -d mariadb

down-db:
	$(DOCKER_COMPOSE) stop mariadb

clean:
	$(DOCKER_COMPOSE) rm -f -s -v mariadb
	@docker volume rm -f $$(docker volume ls -q | grep sophia_mariadb_data) 2>/dev/null || true
	@echo "DB volume removed."

rebuild-db: clean
	@$(MAKE) up-db
	@$(MAKE) db-wait
	@$(MAKE) migrate-up
	@$(MAKE) fill-testdata
	@echo "Rebuild done: migrations applied, test data loaded."

db-wait:
	@echo "Waiting for MariaDB..."
	@for i in 1 2 3 4 5 6 7 8 9 10; do \
		if docker exec $(CONTAINER_NAME) mariadb -h 127.0.0.1 -P 3306 -u $(DB_USER) -p$(DB_PASSWORD) -e "SELECT 1" 2>/dev/null; then \
			echo "MariaDB is ready."; \
			exit 0; \
		fi; \
		sleep 2; \
	done; \
	echo "Timeout waiting for MariaDB."; exit 1

migrate-up:
	DOCKER_CONTAINER=$(CONTAINER_NAME) DB_USER=$(DB_USER) DB_PASSWORD=$(DB_PASSWORD) DB_NAME=$(DB_NAME) bash db/scripts/migrate.sh
	@$(MAKE) schema-dump

migrate-down:
	DOCKER_CONTAINER=$(CONTAINER_NAME) DB_USER=$(DB_USER) DB_PASSWORD=$(DB_PASSWORD) DB_NAME=$(DB_NAME) bash db/scripts/migrate-down.sh
	@$(MAKE) schema-dump

schema-dump:
	docker exec $(CONTAINER_NAME) mariadb-dump -h 127.0.0.1 -P 3306 -u $(DB_USER) -p$(DB_PASSWORD) --no-data --single-transaction --skip-comments $(DB_NAME) \
	| sed -e '/^\s*\/\*!/d' -e '/^\s*\/\*M!/d' \
	| awk 'BEGIN{p=0} /./{p=1} p{print}' \
	| awk '{buf=buf $$0 "\n"} END{gsub(/\n+$$/,"\n",buf);printf "%s",buf}' \
	> db/schema.sql
	@echo "Schema written to db/schema.sql"

fill-testdata:
	docker exec -i $(CONTAINER_NAME) mariadb -h 127.0.0.1 -P 3306 -u $(DB_USER) -p$(DB_PASSWORD) $(DB_NAME) < db/testdata/fill_test_data.sql
	@echo "Test data loaded."

new-migration:
	@TIMESTAMP=$$(date +%Y%m%d%H%M%S); \
	MIGRATION_NAME="$(NAME)"; \
	if [ -z "$$MIGRATION_NAME" ]; then MIGRATION_NAME="migration"; fi; \
	FILENAME="db/migrations/$${TIMESTAMP}_$${MIGRATION_NAME}.sql"; \
	printf '%s\n' \
		'-- +migrate Up' \
		'' \
		'-- TODO: Add your migration here' \
		'' \
		'-- +migrate Down' \
		'' \
		'-- TODO: Add rollback here' \
		> "$$FILENAME"; \
	echo "Created migration: $$FILENAME"

rebuild:
	@$(MAKE) rebuild-db

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

db-shell:
	docker exec -it $(CONTAINER_NAME) mariadb -u $(DB_USER) -p$(DB_PASSWORD) $(DB_NAME)
