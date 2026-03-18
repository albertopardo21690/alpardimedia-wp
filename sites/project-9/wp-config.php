<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 9
 * Generado: 2026-03-18T12:22:45.015Z
 */

// ** Configuración de base de datos ** //
define( 'DB_NAME', 'wp_prueba' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         'ad20a0e935df4071bc336280ea2f8c03ee3e93fa3724446cbd72594c74ee02b5' );
define( 'SECURE_AUTH_KEY',  'fec1a5ba7dc241d29b19a60f421b72f8ebaab6a364994a1f9697165e021814a6' );
define( 'LOGGED_IN_KEY',    '35669ba48846443d8d3577d028e4659e3ee7e35be6134c0aa0de8780404b57cf' );
define( 'NONCE_KEY',        'e48b5118be7f45efa26a6a6ad4e96a66b7471238e2a7427592b763b4606645ac' );
define( 'AUTH_SALT',        'd312d915feeb426b8be6aa13a63eb5a20fba993843244bfd8d1d75a184da5759' );
define( 'SECURE_AUTH_SALT', '2a149da9b1044d71ae5aa960e277e012ff974618945b4898bc1b442368a0979f' );
define( 'LOGGED_IN_SALT',   '167888b2f3174638b18c93fbdd205cfa55ffe58ad6b243e58ce9cb0e59cadd97' );
define( 'NONCE_SALT',       '29d82b7b29ec4f09beaf790c8b0e05af6a91ca7394394a60a081b0aa97b8fb02' );

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
