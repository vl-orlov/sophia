-- Run this once after manually applying all migration Up blocks via phpMyAdmin.
-- INSERT IGNORE is safe to run multiple times — won't duplicate existing records.

INSERT IGNORE INTO schema_migrations (name) VALUES ('20260807000001_create_migrations_table.sql');
INSERT IGNORE INTO schema_migrations (name) VALUES ('20260807000002_initial_schema.sql');
