<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 11
 * Generado: 2026-03-18T14:31:41.422Z
 */

// ** Configuración de base de datos ** //
define('WP_CACHE', true);
define( 'WPCACHEHOME', 'C:\Users\alber\Desktop\xampp\htdocs\proyectos\alpardimedia-wp\sites\project-11\wp-content\plugins\wp-super-cache/' );
define( 'DB_NAME', 'tienda' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         'd0254f59113e4a589b38aa301a7ac15696b4b8a9938a4b60beb29e727769cc9d' );
define( 'SECURE_AUTH_KEY',  '492e116b491148c0a6e92a90d70e48bda5d16cba9e574362b9601a700cf39e5c' );
define( 'LOGGED_IN_KEY',    '6203406c28dc413c95cf62dad44af7e800d6388e1a284f90b08806007a11bdb9' );
define( 'NONCE_KEY',        '4bab1525557e4816bed150e1bc32c364d3475dbedad4473cb2437987d662d38e' );
define( 'AUTH_SALT',        'ee424883f88848b0b9823146aba7c184494fcd986ede422d9f6a356969a5ec52' );
define( 'SECURE_AUTH_SALT', '81f58cea57cf45e9b0423b2bb0ddc3590a295b5de0f0499b9f49403975d94929' );
define( 'LOGGED_IN_SALT',   '4feda9670f4e4bf2a9295ba44d0ed6487a4ad21ed2464c67aec4fc368c946d91' );
define( 'NONCE_SALT',       '1f451f0ba98246b9a131325cf43fe9ac9233cc038d4444b6892f2a0ab35470e6' );

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
