DROP TABLE IF EXISTS `consultas`;
CREATE TABLE `consultas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `empresa` varchar(150) NOT NULL DEFAULT '',
  `tipo_consulta` enum('producto','alianzas','prensa','otro') NOT NULL,
  `mensaje` text NOT NULL,
  `created_at` int(10) unsigned NOT NULL DEFAULT unix_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
DROP TABLE IF EXISTS `schema_migrations`;
CREATE TABLE `schema_migrations` (
  `name` varchar(255) NOT NULL,
  `applied_at` int(10) unsigned NOT NULL DEFAULT unix_timestamp(),
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
