-- +migrate Up
CREATE TABLE IF NOT EXISTS schema_migrations (
    name       VARCHAR(255) NOT NULL,
    applied_at INT UNSIGNED NOT NULL DEFAULT UNIX_TIMESTAMP(),
    PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- +migrate Down
DROP TABLE IF EXISTS schema_migrations;
