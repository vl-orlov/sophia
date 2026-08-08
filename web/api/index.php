<?php
declare(strict_types=1);

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/lib/DB.php';
require_once __DIR__ . '/lib/HttpResponse.php';
require_once __DIR__ . '/controllers/ConsultasController.php';

ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path   = preg_replace('#^/api#', '', $path);
$method = $_SERVER['REQUEST_METHOD'];

$body = [];
$raw  = file_get_contents('php://input');
if ($raw) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $body = $decoded;
    } else {
        json_error(400, 'Cuerpo de la solicitud inválido (se esperaba JSON).');
    }
}

try {
    $db = new DB(DB_DSN, DB_USER, DB_PASS);

    if ($method === 'POST' && $path === '/consultas') {
        (new ConsultasController($db))->crear($body); exit;
    }

    json_error(404, 'Not found');

} catch (Throwable $e) {
    error_log('[sophia api] ' . $e->getMessage() . "\n" . $e->getTraceAsString());
    json_error(500, 'Error interno del servidor');
}
