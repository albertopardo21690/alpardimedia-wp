<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 3
 * Generado: 2026-03-18T16:20:32.334Z
 */

// ** Configuración de base de datos ** //
define('WP_CACHE', true);
define( 'WPCACHEHOME', 'C:\Users\alber\Desktop\xampp\htdocs\proyectos\alpardimedia-wp\sites\project-3\wp-content\plugins\wp-super-cache/' );
define( 'DB_NAME', 'prueba' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         '51b8fde9658d45fba986cfaf5c617cb68d568fd3eee94b71bd942ae9cf1cf908' );
define( 'SECURE_AUTH_KEY',  '70b71ac085814b25be0ecd3695b678ac7eb55e1ad8fd4c67b51897c25b13e484' );
define( 'LOGGED_IN_KEY',    'ae2c0fb79d5c423e9ffd5f21fda3bb8ddb1818a92ae04e93934e7ee518d25488' );
define( 'NONCE_KEY',        'f5d1c557f21f4cc5a5c968dc78dee42b19e7f7f74edb4f1683fae376f76662e4' );
define( 'AUTH_SALT',        'd617f4d2c1a743769b811bbd8f40d1f55c5928c357ec47c4a5fd5f1da070126f' );
define( 'SECURE_AUTH_SALT', '66ec95f424b8453db590f208a4553a0c1bb8580b9a184eca93570ca33019e76f' );
define( 'LOGGED_IN_SALT',   'f0d4b7e51d994129a3d05e425ccfe9584298ed04791841008f401b2da2a798ea' );
define( 'NONCE_SALT',       'e586a9e2ee394711b9767884a346647ae63c4a7d3e9c41dea1d8b50350cc0a69' );

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
