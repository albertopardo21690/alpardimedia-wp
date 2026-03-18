<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 8
 * Generado: 2026-03-18T11:48:23.830Z
 */

// ** Configuración de base de datos ** //
define( 'DB_NAME', 'wp_pruebas' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         'b6acc655caaa4771a0cc1c14d862e181f0095dde20d94b56ae99bac76aa35608' );
define( 'SECURE_AUTH_KEY',  '6240e2027c034a219fee9bb5c493496ff2f91de1b41349dc8afbbbd85f5020f6' );
define( 'LOGGED_IN_KEY',    '32e96f187b554633a34b3c4b1b5f471ee2f9929bbcdc4e268e7c86e9624b5b5e' );
define( 'NONCE_KEY',        'ddab8db0007041e295bba4f7df28081bd690e41c157d441c9480c5fa3b2b2409' );
define( 'AUTH_SALT',        '6909569ea26b48738dbf7d43a14a3897d39d66a4655449eeb5bab3edd0c66250' );
define( 'SECURE_AUTH_SALT', '7131a1b63f3e48f99aa8e09bee5bcf6c968b2613cea54ec586b59448104bc829' );
define( 'LOGGED_IN_SALT',   '61633a86af2942a6933cb4a60dc40eb950e3549e54454ef590df4f9f9eae06c5' );
define( 'NONCE_SALT',       '46752837ad7645488f609546c7ffd0f849593a1e4c9c40959361c8b06d4426a6' );

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
