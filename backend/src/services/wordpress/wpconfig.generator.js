const { v4: uuidv4 } = require('uuid');

exports.generateWpConfig = (config) => {
  const {
    dbName,
    dbUser,
    dbPassword,
    dbHost = 'localhost',
    dbPrefix = 'wp_',
    language = 'es_ES',
    debugMode = false,
  } = config;

  // Generar salts únicos
  const salt = () => uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, '');

  return `<?php
/**
 * Configuración de WordPress generada por Alpardimedia
 * Proyecto ID: ${config.projectId || 'N/A'}
 * Generado: ${new Date().toISOString()}
 */

// ** Configuración de base de datos ** //
define( 'DB_NAME', '${dbName}' );
define( 'DB_USER', '${dbUser}' );
define( 'DB_PASSWORD', '${dbPassword}' );
define( 'DB_HOST', '${dbHost}' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Claves únicas de autenticación y salts ** //
define( 'AUTH_KEY',         '${salt()}' );
define( 'SECURE_AUTH_KEY',  '${salt()}' );
define( 'LOGGED_IN_KEY',    '${salt()}' );
define( 'NONCE_KEY',        '${salt()}' );
define( 'AUTH_SALT',        '${salt()}' );
define( 'SECURE_AUTH_SALT', '${salt()}' );
define( 'LOGGED_IN_SALT',   '${salt()}' );
define( 'NONCE_SALT',       '${salt()}' );

// ** Prefijo de tablas ** //
$table_prefix = '${dbPrefix}';

// ** Idioma ** //
define( 'WPLANG', '${language}' );

// ** Modo debug ** //
define( 'WP_DEBUG', ${debugMode ? 'true' : 'false'} );

if ( ! defined( 'ABSPATH' ) ) {
  define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
`;
};
