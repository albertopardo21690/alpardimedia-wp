<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 7
 * Generado: 2026-03-18T11:44:13.177Z
 */

// ** Configuración de base de datos ** //
define( 'DB_NAME', 'wp_pruebas' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         'cc105a73098b4ba8ad94ee49056da2f474e05c2e1ea94f4b80f5b4ea2ab67424' );
define( 'SECURE_AUTH_KEY',  '327a3276f976497ca850195716df5200abbb605217e6448eac4db10b80c4efe9' );
define( 'LOGGED_IN_KEY',    '0c09a382917f4ceb86cdf8419eee6ca2bdccdf2b2bd344cd8da6e7d2e0689362' );
define( 'NONCE_KEY',        '44189c0e2a1e4c3287740df9f4157ba27b335fb1e84a4fffa778aa013efcb118' );
define( 'AUTH_SALT',        'a6e7c18f8e8f4aeaa839756b6dafca50c02e894d4757485cbeb23392e704c537' );
define( 'SECURE_AUTH_SALT', '179c7e3dde014f4bbde4f633751356dd26733f10d9f8426f87fb40284dc90e43' );
define( 'LOGGED_IN_SALT',   '7eb80afa500b476a92fe888c2fca94ac173a24d9c8f344e1a1002804cf9f56f4' );
define( 'NONCE_SALT',       '04dea0823102420bb2e78437f94375a966442e0388144774a30b8719066f09cf' );

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
