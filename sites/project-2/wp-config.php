<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 2
 * Generado: 2026-03-18T14:50:11.420Z
 */

// ** Configuración de base de datos ** //
define('WP_CACHE', true);
define( 'WPCACHEHOME', 'C:\Users\alber\Desktop\xampp\htdocs\proyectos\alpardimedia-wp\sites\project-2\wp-content\plugins\wp-super-cache/' );
define( 'DB_NAME', 'tienda' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         '9c34ebb55f67485cb63cfbe8ced34e725898448aab784c049e280f1218392714' );
define( 'SECURE_AUTH_KEY',  '39c341784c554817ae72e4316be52ff8c88c825593854ac2b239194fddbe4ac3' );
define( 'LOGGED_IN_KEY',    '3da2bd9c79124015ba2ed45b7fe257f798aefc3472b248ed95c58e3d84c41891' );
define( 'NONCE_KEY',        '122893bef51142ea9232a62d377add7f2e417d3e98ff4880aec10f88dd0b9e89' );
define( 'AUTH_SALT',        'f05d3bbc93a844dc985412f0fb6a0063b7d5b7ef3ef340539e45f85bb1204cd4' );
define( 'SECURE_AUTH_SALT', '8fb783ca2bd141a2ade49bf75d75cc13f2becff9688d4057b63d4bd1baaeaf0d' );
define( 'LOGGED_IN_SALT',   'c53f8d2e6e1e45c9b8d3f43548f7155be9f7c14b09574b8a82368e4f1e0a3a15' );
define( 'NONCE_SALT',       '62577cf130514d0193164d71147ebc2659099b66375a4d4da740ee816acb717b' );

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
