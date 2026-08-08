# sophia

Landing corporativo de SOPHIA TECH CORP — unidad de Inteligencia Artificial e innovación de Cadipel. Tecnología con propósito.

**Estado actual:** réplica 1:1 del sitio publicado en `sophia-tech-corp.vercel.app` (HTML/CSS/JS estático) montada sobre el stack de `zoocial` — React + TypeScript + Vite del lado del frontend, PHP + MariaDB del lado del backend. El sitio original se obtuvo por completo (HTML, `style.css`, `script.js`, los módulos three.js del hero/trayectoria y todos los assets — videos, íconos, modelos `.glb`, PDFs) y se vendoreó tal cual en `web/frontend/public/vendor/` y `src/styles/vendor-sophia.css`; React solo renderiza el mismo markup una vez y esos scripts corren igual que en el sitio original (ver "Cómo está armado" abajo). El formulario de contacto es la única pieza reimplementada: en el original es un mock (`setTimeout`), acá pega de verdad a `POST /api/consultas` y la fila queda en MariaDB.

### Run locally

Necesita los tres procesos corriendo a la vez:

```
# 1) Base de datos
cd infra
make rebuild

# 2) API (PHP)
cd web
php -d short_open_tag=On -S localhost:8888 router.php

# 3) Frontend (Vite)
cd web/frontend
npm install               # first time only
npm run dev
```

Abrir en el navegador (Vite toma el siguiente puerto libre si 5173 está ocupado). El dev server de Vite proxea `/api` hacia `localhost:8888` (ver `vite.config.ts`).

Quick test guide:
- Recorré las secciones: Capacidades (cards con video), Productos (filtro + lista), I+D+i (timeline con SVG), Trayectoria (3 mini-escenas 3D: PCB, brazo robótico, planeta/HUD), Contacto
- **Contacto** — completá el formulario y enviá; la consulta queda guardada en la tabla `consultas`
- **Reset de los datos** — `cd infra && make rebuild-db` vuelve la base a los datos de fábrica (vacía, no hay seed)

### Cómo está armado (importante antes de tocar el frontend)

`web/frontend/src/app/SophiaPage.tsx` es el mismo markup que el `<body>` del sitio original (mismos ids/clases), traducido a JSX. No es un componente "idiomático" a propósito: los scripts vendoreados hacen `document.getElementById`/`querySelector` contra esos ids/clases exactos, así que cualquier cambio de estructura ahí tiene que reflejarse también en `public/vendor/*.js`.

`web/frontend/src/app/useVendorScripts.ts` inyecta esos scripts después de que React montó el DOM (`script.js` clásico primero, después los 5 módulos de three.js en paralelo). El detalle no obvio: `script.js` fue escrito para HTML estático y usa `document.addEventListener('DOMContentLoaded', ...)` en varios lados — como para cuando se inyecta acá ese evento ya pasó hace rato, el hook intercepta *puntualmente* esa suscripción (y `window`'s `'load'`) mientras carga el script y ejecuta el callback al toque; todo lo demás (`click`, `transitionend`, etc.) sigue andando normal. Los módulos de three.js no necesitan el parche: ya traen su propio chequeo de `document.readyState`.

`public/vendor/script.js` tiene un solo cambio respecto al original: el handler de `#contactForm` (era un mock con `setTimeout`) ahora hace `fetch('/api/consultas', ...)` de verdad.

El import map de `index.html` (three.js/lil-gui vía jsdelivr, igual que el sitio original) tiene que ir antes que cualquier `<script type="module">` — cuidado si se edita ese archivo, un bug de Vite con comentarios que contienen literalmente `<script` adentro puede romper el HTML del build (`npm run build`) sin avisar en dev.

### Backend — API

Endpoints disponibles:
```
POST /api/consultas    (público — nombre, apellido, email, empresa, tipoConsulta, mensaje)
```

Otros comandos útiles en `infra/`: `make db-shell` (consola MySQL), `make migrate-down` (revertir última migración), `make new-migration NAME=x`.

### Build for production

```
cd web/frontend
npm run build
```

Output en `web/public/` (outDir configurado en `vite.config.ts` como `../public`, igual que en `zoocial`/`unik`).

### Deploy

Pensado para el mismo VPS que el resto de los proyectos (nginx + PHP-FPM + MariaDB), estructura análoga a `zoocial`: `web/api/` como backend PHP, build de `web/frontend` servido como estático. `web/frontend/vercel.json` queda por si se prefiere separar el frontend a Vercel.

El deploy real (por ahora) va a un subdominio temporario, mismo patrón que `zoocial`/`unik`: `vps/hosting-cfg/instructions/cfg_sophia.txt` — sirve el sitio en `sophia.digilang.pro`, con su propia DB (`sophiadb`/`sophiauser`, ver `cfg_mariadb.txt` punto 13) y bucket MinIO (`sophia`, ver `cfg_minio.txt` punto 17). MinIO queda listo por si se necesita subida de archivos más adelante — el código todavía no tiene `lib/Minio.php` ni `/api/upload`, así que hoy esas constantes no se usan. `cfg_sophiatechcorp.txt` sigue siendo la instrucción vieja del sitio estático en el dominio real `sophiatechcorp.com` — cuando se decida migrar ahí, es un deploy aparte (DNS + nginx vhost + su propia DB/bucket, no los de `sophia.digilang.pro`).

**Migraciones en prod**: no hay acceso a Docker/`mariadb` CLI en el VPS, así que se aplican a mano vía phpMyAdmin — copiar el bloque `-- +migrate Up` de cada archivo en `infra/db/migrations/` (en orden) y ejecutarlo, y al final correr una vez `infra/db/for_prod/record_schema_migrations.sql` para que la tabla `schema_migrations` quede consistente (mismo patrón que `zoocial`).

**Peso del repo**: `web/frontend/public/` pesa ~100 MB (6 videos, 3 modelos `.glb`, 7 PDFs de producto) — son los assets reales del sitio original. Antes de pushear a git conviene decidir si van al repo tal cual, a Git LFS, o a un bucket aparte (MinIO/S3) servido por CDN.

### Estructura

```
web/
├── api/                       # PHP: config/lib/controllers + index.php (router)
├── router.php                  # dev server (php -S)
└── frontend/
    ├── public/
    │   ├── vendor/              # script.js, earth-hero.js, tr-{pcb,arm,planet,hud}.js (vendoreados)
    │   ├── video/, icons/, recursos/, pdfs/   # assets reales del sitio original (todos íconos
    │   │                                       # bajo icons/, no adentro de assets/ — esa carpeta
    │   │                                       # es de Vite: solo assets/css y assets/js del build)
    └── src/
        ├── app/
        │   ├── App.tsx           # monta SophiaPage + useVendorScripts
        │   ├── SophiaPage.tsx    # markup 1:1 con el sitio original
        │   └── useVendorScripts.ts
        └── styles/vendor-sophia.css   # style.css original, importado tal cual

infra/
├── docker/docker-compose.yml   # MariaDB (name: sophia — proyecto Compose aislado)
├── db/migrations/, testdata/, schema.sql, scripts/
└── Makefile
```

### Not wired up yet

- **Notificación por email de nuevas consultas** — no hay precedente de PHPMailer/SMTP en los demás proyectos del stack; las consultas solo se guardan en la DB.
- **PDFs de producto** ("Explorar solución" en Productos) — están en `public/pdfs/`, pero el modal que los muestra (`pdf-modal`, vía pdf.js) está en la parte de `script.js` que sí se vendoreó completa; no se probó a fondo cada PDF individualmente.
- **Deploy real** — corrido y probado solo en local; `cfg_sophia.txt` ya está listo, falta ejecutarlo contra el VPS (crear la base con `cfg_mariadb.txt` punto 13, correr el script paso a paso, subir el build por FTP).
- **Subida de archivos vía MinIO** — bucket y credenciales ya provisionados (`cfg_minio.txt` punto 17) pero no hay ningún caso de uso implementado todavía: no existe `lib/Minio.php` ni endpoint `/api/upload`. A diferencia de `zoocial`/`unik`, acá tampoco hay sistema de auth (JWT/roles) — si se agrega upload hay que decidir primero cómo protegerlo (¿admin del sitio? ¿público con rate-limit?) antes de copiar el patrón tal cual.
