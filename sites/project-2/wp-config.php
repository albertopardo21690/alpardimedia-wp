<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 2
 * Generado: 2026-03-17T12:56:23.496Z
 */

// ** Configuración de base de datos ** //
define( 'DB_NAME', 'wp_mi_primer_sitio' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         '0c679554ed384c46a983c2c1ffb63b943435852b5adf401383d3831cad1d1b2b' );
define( 'SECURE_AUTH_KEY',  '0ae29c3049674d06a0bdf7739ab224f12adc7e72b24f43d4b0ae58aacc4d8191' );
define( 'LOGGED_IN_KEY',    'e2c451d0002c4405be4d93f032b17f8c7502ab61b5b44491ae31daf6b8402660' );
define( 'NONCE_KEY',        '95db3494c0e147dc9aab016ff932bfd78980386aeaca4a4797c84b59f1d61c0b' );
define( 'AUTH_SALT',        '0e84b4aaf7bb4c1998cac1453d0ab7b06e428948d7474c56a2b4c78b4187a598' );
define( 'SECURE_AUTH_SALT', '95828c442a94488eaf947e486bdd9d0f6a7e7d4f5d4d45a7af7d56c3df1c78c0' );
define( 'LOGGED_IN_SALT',   '21693255d2be46f09d475a0436c296675f2699e243724789854ff2f10fbeafba' );
define( 'NONCE_SALT',       '6fb7489a8c2d48b3a87e34c000f988004e5c5c342b574637bc7850d37d2db9ea' );

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
