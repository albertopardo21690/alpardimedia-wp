const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { generateWpConfig } = require('./wpconfig.generator');

const PHP      = process.env.PHP_BINARY   || 'php';
const WP_CLI   = process.env.WP_CLI_PATH;
const SITES    = process.env.WP_SITES_PATH;
const BASE_URL = process.env.WP_BASE_URL  || 'http://localhost';
const MYSQL    = process.env.MYSQL_BINARY || 'mysql';

// Ejecutar comando como promesa
const run = (cmd) => new Promise((resolve, reject) => {
  exec(cmd, { timeout: 120000 }, (error, stdout, stderr) => {
    if (error) return reject(new Error(stderr || error.message));
    resolve(stdout.trim());
  });
});

// WP-CLI con PATH de MySQL inyectado
const wp = (sitePath, command) => {
  const mysqlDir = path.dirname(MYSQL).replace(/[/]/g, '\\');
  const env = `set PATH=${mysqlDir};%PATH% &&`;
  return run(`${env} "${PHP}" "${WP_CLI}" ${command} --path="${sitePath}" --allow-root`);
};

// Descargar WordPress si no está en caché
const downloadWordPress = () => new Promise((resolve, reject) => {
  const cacheDir  = path.join(path.dirname(SITES), 'cache');
  const cacheFile = path.join(cacheDir, 'wordpress-latest.zip');

  if (fs.existsSync(cacheFile)) {
    console.log('📦 WordPress encontrado en caché');
    return resolve(cacheFile);
  }

  fs.mkdirSync(cacheDir, { recursive: true });
  const file = fs.createWriteStream(cacheFile);

  console.log('⬇️  Descargando WordPress...');
  https.get('https://wordpress.org/latest.zip', (res) => {
    res.pipe(file);
    file.on('finish', () => { file.close(); resolve(cacheFile); });
  }).on('error', (err) => {
    try { fs.unlinkSync(cacheFile); } catch {}
    reject(err);
  });
});

// Descomprimir WordPress
const extractWordPress = async (zipFile, sitePath) => {
  const cacheDir = path.join(path.dirname(SITES), 'cache');
  const wpSource = path.join(cacheDir, 'wordpress');

  const extractCmd = `powershell -Command "Expand-Archive -Path '${zipFile}' -DestinationPath '${cacheDir}' -Force"`;
  await run(extractCmd);

  fs.mkdirSync(sitePath, { recursive: true });
  const copyCmd = `powershell -Command "Copy-Item -Path '${wpSource}\\*' -Destination '${sitePath}' -Recurse -Force"`;
  await run(copyCmd);

  console.log('📂 WordPress extraído en', sitePath);
};

// Instalación completa
exports.install = async (projectId, config) => {
  const sitePath = path.join(SITES, `project-${projectId}`);
  const siteUrl  = `${BASE_URL}/proyectos/alpardimedia-wp/sites/project-${projectId}`;

  // PASO 1 — Descargar y extraer
  console.log('🔽 PASO 1: Descargando WordPress...');
  const zipFile = await downloadWordPress();
  await extractWordPress(zipFile, sitePath);

  // PASO 2 — Generar wp-config.php
  console.log('⚙️  PASO 2: Generando wp-config.php...');
  const wpConfigContent = generateWpConfig({ ...config, projectId });
  fs.writeFileSync(path.join(sitePath, 'wp-config.php'), wpConfigContent, 'utf8');

  // PASO 3 — Crear base de datos (DROP IF EXISTS + CREATE)
  console.log('PASO 3: Creando base de datos...');
  const mysqlDir3 = path.dirname(MYSQL).replace(/[/]/g, '\\');
  const dbU = config.dbUser || 'root';
  const dbP = config.dbPassword || '';
  const pA  = dbP ? '-p' + dbP : '';
  const dropCmd3 = `set PATH=${mysqlDir3};%PATH% && "${MYSQL}" -u ${dbU} ${pA} -e "DROP DATABASE IF EXISTS \`${config.dbName}\`"`;
  const createCmd3 = `set PATH=${mysqlDir3};%PATH% && "${MYSQL}" -u ${dbU} ${pA} -e "CREATE DATABASE \`${config.dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`;
  await run(dropCmd3);
  await run(createCmd3);

  // PASO 4 — Instalar WordPress
  console.log('🏗️  PASO 4: Instalando WordPress...');
  const installCmd = [
    `"${PHP}" "${WP_CLI}" core install`,
    `--path="${sitePath}"`,
    `--url="${siteUrl}"`,
    `--title="${config.siteName}"`,
    `--admin_user="${config.adminUser}"`,
    `--admin_password="${config.adminPassword}"`,
    `--admin_email="${config.adminEmail}"`,
    `--locale="${config.language || 'es_ES'}"`,
    `--skip-email`,
    `--allow-root`
  ].join(' ');
  await wp(sitePath, `core install --url="${siteUrl}" --title="${config.siteName}" --admin_user="${config.adminUser}" --admin_password="${config.adminPassword}" --admin_email="${config.adminEmail}" --locale="${config.language || 'es_ES'}" --skip-email`);

  // PASO 4.5 — Instalar idioma si no es inglés
  if (config.language && config.language !== 'en_US') {
    try {
      console.log('🌐 Instalando idioma:', config.language);
      await wp(sitePath, `language core install ${config.language}`);
      await wp(sitePath, `site switch-language ${config.language}`);
      console.log('✅ Idioma instalado:', config.language);
    } catch (langErr) {
      console.warn('⚠️  No se pudo instalar el idioma:', langErr.message);
    }
  }

  // PASO 5 — Configuración inicial
  console.log('🔧 PASO 5: Configuración inicial...');
  await wp(sitePath, `option update blogdescription "${config.siteDescription || ''}"`);
  await wp(sitePath, `option update timezone_string "Europe/Madrid"`);

  console.log('✅ WordPress instalado correctamente');

  return {
    path: sitePath,
    url:      siteUrl,
    adminUrl: `${siteUrl}/wp-admin`,
    status:   'installed'
  };
};

// Desinstalación
exports.uninstall = async (sitePath) => {
  if (sitePath && fs.existsSync(sitePath)) {
    try {
      const mysqlDir = path.dirname(MYSQL).replace(/\//g, '\\');
      await run(`set PATH=${mysqlDir};%PATH% && "${PHP}" "${WP_CLI}" db drop --yes --path="${sitePath}" --allow-root`);
    } catch (e) {
      console.warn('⚠️  No se pudo eliminar la BD:', e.message);
    }
    fs.rmSync(sitePath, { recursive: true, force: true });
    console.log('🗑️  WordPress eliminado:', sitePath);
  }
};

// Estado
exports.getStatus = async (sitePath) => {
  if (!sitePath || !fs.existsSync(sitePath)) return 'not_found';
  try {
    const mysqlDir = path.dirname(MYSQL).replace(/\//g, '\\');
    await run(`set PATH=${mysqlDir};%PATH% && "${PHP}" "${WP_CLI}" core is-installed --path="${sitePath}" --allow-root`);
    return 'installed';
  } catch {
    return 'pending';
  }
};
