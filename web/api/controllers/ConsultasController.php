<?php

class ConsultasController
{
    private const TIPOS = ['producto', 'alianzas', 'prensa', 'otro'];

    public function __construct(private DB $db) {}

    public function crear(array $body): void
    {
        $nombre   = trim((string) ($body['nombre'] ?? ''));
        $apellido = trim((string) ($body['apellido'] ?? ''));
        $email    = trim((string) ($body['email'] ?? ''));
        $empresa  = trim((string) ($body['empresa'] ?? ''));
        $tipo     = (string) ($body['tipoConsulta'] ?? '');
        $mensaje  = trim((string) ($body['mensaje'] ?? ''));

        if (!$nombre) json_error(400, 'Ingresá tu nombre.');
        if (mb_strlen($nombre) > 100) json_error(400, 'El nombre es demasiado largo (máx. 100 caracteres).');
        if (!$apellido) json_error(400, 'Ingresá tu apellido.');
        if (mb_strlen($apellido) > 100) json_error(400, 'El apellido es demasiado largo (máx. 100 caracteres).');
        if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) json_error(400, 'Ingresá un email válido.');
        if (mb_strlen($email) > 150) json_error(400, 'El email es demasiado largo (máx. 150 caracteres).');
        if (mb_strlen($empresa) > 150) json_error(400, 'El nombre de la empresa es demasiado largo (máx. 150 caracteres).');
        if (!in_array($tipo, self::TIPOS, true)) json_error(400, 'Elegí en qué podemos ayudarte.');
        if (!$mensaje) json_error(400, 'Contanos tu mensaje.');
        if (mb_strlen($mensaje) > 5000) json_error(400, 'El mensaje es demasiado largo (máx. 5000 caracteres).');

        $id = $this->db->execute(
            'INSERT INTO consultas (nombre, apellido, email, empresa, tipo_consulta, mensaje) VALUES (?, ?, ?, ?, ?, ?)',
            [$nombre, $apellido, $email, $empresa, $tipo, $mensaje]
        );

        json_ok(['id' => (string) $id], 201);
    }
}
