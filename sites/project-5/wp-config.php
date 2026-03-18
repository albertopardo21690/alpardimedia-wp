<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 5
 * Generado: 2026-03-18T11:30:00.239Z
 */

// ** Configuración de base de datos ** //
define( 'DB_NAME', 'wp_pruebas' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         'd867d8bb27b04973af770b64d9a6ac975cf81d3ca0a04c0f845321eea57b6d7d' );
define( 'SECURE_AUTH_KEY',  'ffc733a585034cb087321ab3113c0b9d6047cb05cccb4dcba0975148569ccbcd' );
define( 'LOGGED_IN_KEY',    '63095d52c0b44e32bc380b590a3b83adfefc019ec183438db2e0a5e442dd1c9d' );
define( 'NONCE_KEY',        '118697444c5747399395653b66e161be0d5ad9c984334214834e20004db51e94' );
define( 'AUTH_SALT',        '01c1e54e216a4f169e3a4f27683cd8b0d99c832169534f529ffe9b16d86c319e' );
define( 'SECURE_AUTH_SALT', '7ffc752fab2741338b7d984c4cfce50344028f8c524a437999e7971cbdb727f5' );
define( 'LOGGED_IN_SALT',   'd04ba8a8382e4843af8aa4a5f9909a990eb8a48d0cd94cca8b8f7796dc4f1b0f' );
define( 'NONCE_SALT',       'e660dc69c7d14eb78e835b3cd384d18924c1e0b9631c4b94a22cb8e751ab07da' );

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
