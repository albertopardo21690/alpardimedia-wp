const { generateWpConfig } = require('../../services/wordpress/wpconfig.generator');

describe('generateWpConfig', () => {
  const config = {
    dbName:     'wp_test',
    dbUser:     'root',
    dbPassword: 'secret',
    dbHost:     'localhost',
    dbPrefix:   'wp_',
    language:   'es_ES',
    projectId:  1
  };

  test('genera wp-config.php válido', () => {
    const result = generateWpConfig(config);
    expect(result).toContain("define( 'DB_NAME', 'wp_test' )");
    expect(result).toContain("define( 'DB_USER', 'root' )");
    expect(result).toContain("define( 'DB_PASSWORD', 'secret' )");
    expect(result).toContain("define( 'DB_HOST', 'localhost' )");
    expect(result).toContain("\$table_prefix = 'wp_'");
    expect(result).toContain("define( 'WPLANG', 'es_ES' )");
  });

  test('contiene todos los salts', () => {
    const result = generateWpConfig(config);
    expect(result).toContain("AUTH_KEY");
    expect(result).toContain("SECURE_AUTH_KEY");
    expect(result).toContain("LOGGED_IN_KEY");
    expect(result).toContain("NONCE_KEY");
    expect(result).toContain("AUTH_SALT");
  });

  test('salts son únicos en cada generación', () => {
    const r1 = generateWpConfig(config);
    const r2 = generateWpConfig(config);
    const getSalt = (r) => r.match(/define\( 'AUTH_KEY',\s+'(.+)' \)/)?.[1];
    expect(getSalt(r1)).not.toBe(getSalt(r2));
  });

  test('debug mode false por defecto', () => {
    const result = generateWpConfig(config);
    expect(result).toContain("define( 'WP_DEBUG', false )");
  });

  test('debug mode true cuando se indica', () => {
    const result = generateWpConfig({ ...config, debugMode: true });
    expect(result).toContain("define( 'WP_DEBUG', true )");
  });
});
