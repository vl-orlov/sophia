<?php

function json_ok(mixed $data = null, int $code = 200): never
{
    http_response_code($code);
    if ($data !== null) {
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    exit;
}

function json_error(int $code, string $message): never
{
    http_response_code($code);
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}
