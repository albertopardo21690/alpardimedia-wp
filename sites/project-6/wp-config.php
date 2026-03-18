<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: 6
 * Generado: 2026-03-18T11:39:33.750Z
 */

// ** Configuración de base de datos ** //
define( 'DB_NAME', 'wp_pruebas' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         '9481411cc2984ceab4fea9fa359c7b77ab77707337014c488b519a8a05efb9e3' );
define( 'SECURE_AUTH_KEY',  '8cd4d9d86d4c4e0d9cab5723779977f7e0cc3ff8b8c14bdabbf4e38514843ada' );
define( 'LOGGED_IN_KEY',    '800423bb76b440719817c8e6583215cc88720e6e9ba6420bbae5978c38a97e2b' );
define( 'NONCE_KEY',        'f821850074c3425f8c1230be3480fe345b177edea66c4acfbe296fcaffa4421c' );
define( 'AUTH_SALT',        '400533c1cfe249fcb0e2144de1ca6233b85e8e9389244c71b19d8856cf8152f0' );
define( 'SECURE_AUTH_SALT', '388f4adc1be34b7b86b548238254bd2a08cf7193c5aa4510ba1ce7728537b79d' );
define( 'LOGGED_IN_SALT',   '9c246c224b31408fb723a258b01e884637e0662b677b42f6ab22a1f183a8a7a8' );
define( 'NONCE_SALT',       '07dd9d5cc0fc45629ce819be8e27539749efcdba752f423c8613f7b61fa6d485' );

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
