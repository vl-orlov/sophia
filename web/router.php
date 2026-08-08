<?php
// Router para el servidor embebido de PHP: sirve tanto en desarrollo local
// como para probar el build de producción (mismo patrón que zoocial/unik —
// ver web/router.php ahí). Uso: php -d short_open_tag=On -S localhost:8888 router.php
//
// En dev el frontend corre aparte con `npm run dev` (Vite) y proxea /api
// hacia acá (ver server.proxy en web/frontend/vite.config.ts); la parte de
// "servir public/" recién entra en juego después de `npm run build`.

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (str_starts_with($uri, '/api')) {
    require __DIR__ . '/api/index.php';
    exit;
}

// Servir archivos estáticos desde public/
if ($uri !== '/') {
    $publicFile = __DIR__ . '/public' . $uri;
    if (file_exists($publicFile) && is_file($publicFile)) {
        $ext   = strtolower(pathinfo($publicFile, PATHINFO_EXTENSION));
        $types = [
            'js'    => 'application/javascript',
            'mjs'   => 'application/javascript',
            'css'   => 'text/css',
            'png'   => 'image/png',
            'jpg'   => 'image/jpeg',
            'jpeg'  => 'image/jpeg',
            'svg'   => 'image/svg+xml',
            'woff'  => 'font/woff',
            'woff2' => 'font/woff2',
            'ico'   => 'image/x-icon',
            'json'  => 'application/json',
            'webp'  => 'image/webp',
            'map'   => 'application/json',
            'mp4'   => 'video/mp4',
            'webm'  => 'video/webm',
            'pdf'   => 'application/pdf',
            'glb'   => 'model/gltf-binary',
            'gltf'  => 'model/gltf+json',
            'wasm'  => 'application/wasm',
        ];
        header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));

        // Assets versionados (nombre + ?v=hash, ver vite.config.ts) — cache permanente
        if (str_starts_with($uri, '/assets/')) {
            header('Cache-Control: public, max-age=31536000, immutable');
        } else {
            // Iconos, fuentes, imágenes sueltas — cache de un día
            header('Cache-Control: public, max-age=86400');
        }

        readfile($publicFile);
        exit;
    }
}

// Todas las demás rutas → SPA de React (index.html nunca se cachea)
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
readfile(__DIR__ . '/public/index.html');
