<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 10
 * Generado: 2026-03-18T12:43:44.171Z
 */

// ** Configuración de base de datos ** //
define('WP_CACHE', true);
define( 'WPCACHEHOME', 'C:\Users\alber\Desktop\xampp\htdocs\proyectos\alpardimedia-wp\sites\project-10\wp-content\plugins\wp-super-cache/' );
define( 'DB_NAME', 'wp_prueba' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         '6a92f8cae95142159f0453e68f4ab7bf590dcec8d0b4415a977312f43932f34d' );
define( 'SECURE_AUTH_KEY',  'd95112aa8d4d415f9ba532f1c469944a9d64519c952e4dbc80965848f1b1a3b4' );
define( 'LOGGED_IN_KEY',    '743ea769214f4db6ae1d19904ec11aa6a916ae6e628d49ae9cf281bc6c7cf01f' );
define( 'NONCE_KEY',        'cf9fcd81e30e4201b049bd0d71bd7944f86075da1bff4fc9b964c2dd597faa7a' );
define( 'AUTH_SALT',        '18d47bc9a6f24867a8af612cd3aaf8b3e091f610a7af4eefa261905aedbaf3cb' );
define( 'SECURE_AUTH_SALT', '8610b5f1ac96491982d72ff7a77a33cacfa5a658f6c54255a856227bd7740155' );
define( 'LOGGED_IN_SALT',   '9530a98eaa224734947a04cb2196d663755535587b9649b39af23a183f2ed6b5' );
define( 'NONCE_SALT',       '1acd063741b443b38cf1f7fc4cbf67f0f1e85736b57647e5a243e3bac388876a' );

// ** Prefijo de tablas ** //
$table_prefix = 'wp_';

// ** Idioma ** //
define( 'WPLANG', 'es_ES' );

// ** Modo debug ** //
define( 'WP_DEBUG', false );

if ( ! defined( 'ABSPATH' ) ) {
  define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
