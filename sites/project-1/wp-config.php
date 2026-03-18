<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 1
 * Generado: 2026-03-18T14:40:57.090Z
 */

// ** Configuración de base de datos ** //
define( 'DB_NAME', 'tienda' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         '070f687f5e60490890fb7b1d1ecc3e78a4ad155339664b9e824e8b0736f7941a' );
define( 'SECURE_AUTH_KEY',  '7b39750e2fe3420f833f32c21bd9b178eda9de8f27d84de29dbf05dc3c58bf77' );
define( 'LOGGED_IN_KEY',    '11c1f93cb7a64b1d90ee7c5b92ef58d3b9e41d9ba8604ef7b7336c8333072eb1' );
define( 'NONCE_KEY',        '3bd53b999b7a4834b05cabf6a3b86364f718489ae26749679ca8c75178e301ef' );
define( 'AUTH_SALT',        '1c5c57d3733b4c6b8ebbe0ea81c3555e24e74f2ec61442b19d5a177a9bfe3789' );
define( 'SECURE_AUTH_SALT', 'f0f88d0053354ee096bc175dc7f66cd2dc47dcd172454e978c650b81eeef6817' );
define( 'LOGGED_IN_SALT',   'c97f9555b45145478ee68550d142e8b3521292fd700844739e607a4a3a8a86f2' );
define( 'NONCE_SALT',       'bb9f754ea3a049e9851bca5f935db91f8364c129d72447d3bf6e72c994e6939a' );

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
