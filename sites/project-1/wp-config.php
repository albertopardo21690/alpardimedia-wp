<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 1
 * Generado: 2026-03-17T12:54:16.604Z
 */

// ** Configuración de base de datos ** //
define( 'DB_NAME', 'wp_mi_primer_sitio' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         'b193c2cd13934294968fd91a9d3345a7da0f878dbbac4de382b9e4ac2760051c' );
define( 'SECURE_AUTH_KEY',  '78be38b5f8064f379faeb50852895e1bf1cccf0c00f34957a88045159162c1ee' );
define( 'LOGGED_IN_KEY',    'fb3e8a7bb1454381b2bfc6af5c5ef3740ffd62e274174cadb3ac361fc1f81aba' );
define( 'NONCE_KEY',        '41db04aa02f343d898333aad36a4d35c431b1195830948e28368aeec8255cfe6' );
define( 'AUTH_SALT',        '8b8f60b6a8b34277aeccd6eb601df47d71e2e1639ae94aeb81d45779addeb068' );
define( 'SECURE_AUTH_SALT', 'a86cfdc67aa64fc5923643b36b1ff80d3126276baf9f48e8b481a459bea583d9' );
define( 'LOGGED_IN_SALT',   '1ab43a6071294e42ad62c8ea0ae1778a98ca4d3aa28a452b9d6f1add3fd28dd6' );
define( 'NONCE_SALT',       'cf44ad69612f423e915b056239f58449eb10a4c52aed42b2bcb3b03e059a37eb' );

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
