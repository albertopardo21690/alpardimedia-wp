const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { generateWpConfig } = require('./wpconfig.generator');

const PHP     = process.env.PHP_BINARY   || 'php';
const WP_CLI  = process.env.WP_CLI_PATH;
const SITES   = process.env.WP_SITES_PATH;
const BASE_URL = process.env.WP_BASE_URL || 'http://localhost';

// Ejecutar comando como promesa
const run = (cmd) => new Promise((resolve, reject) => {
  exec(cmd, { timeout: 120000 }, (error, stdout, stderr) => {
    if (error) return reject(new Error(stderr || error.message));
    resolve(stdout.trim());
  });
});

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
    fs.unlinkSync(cacheFile);
    reject(err);
  });
});

// Descomprimir WordPress en la carpeta del proyecto
const extractWordPress = async (zipFile, sitePath) => {
  const cacheDir    = path.join(path.dirname(SITES), 'cache');
  const extractPath = path.join(cacheDir, 'wordpress-extracted');

  // Descomprimir con WP-CLI helper o PowerShell
  const cmd = `powershell -Command "Expand-Archive -Path '${zipFile}' -DestinationPath '${cacheDir}' -Force"`;
  await run(cmd);

  // Copiar archivos al sitePath
  fs.mkdirSync(sitePath, { recursive: true });
  const wpSource = path.join(cacheDir, 'wordpress');
  const copyCmd  = `powershell -Command "Copy-Item -Path '${wpSource}\\*' -Destination '${sitePath}' -Recurse -Force"`;
  await run(copyCmd);

  console.log('📂 WordPress extraído en', sitePath);
};

// Instalación completa
exports.install = async (projectId, config) => {
  const sitePath = path.join(SITES, `project-${projectId}`);
  const siteUrl  = `${BASE_URL}/proyectos/alpardimedia-wp/sites/project-${projectId}`;

  // PASO 1 — Descargar y extraer WordPress
  console.log('🔽 PASO 1: Descargando WordPress...');
  const zipFile = await downloadWordPress();
  await extractWordPress(zipFile, sitePath);

  // PASO 2 — Generar wp-config.php
  console.log('⚙️  PASO 2: Generando wp-config.php...');
  const wpConfigContent = generateWpConfig({ ...config, projectId });
  fs.writeFileSync(path.join(sitePath, 'wp-config.php'), wpConfigContent, 'utf8');

  // PASO 3 — Crear base de datos
  console.log('🗄️  PASO 3: Creando base de datos...');
  const createDbCmd = `"${PHP}" "${WP_CLI}" db create --path="${sitePath}" --allow-root`;
  await run(createDbCmd);

  // PASO 4 — Instalar WordPress (crea tablas + admin + datos iniciales)
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
  await run(installCmd);

  // PASO 5 — Configuración inicial
  console.log('🔧 PASO 5: Configuración inicial...');
  await run(`"${PHP}" "${WP_CLI}" option update blogdescription "${config.siteDescription || ''}" --path="${sitePath}" --allow-root`);
  await run(`"${PHP}" "${WP_CLI}" option update timezone_string "Europe/Madrid" --path="${sitePath}" --allow-root`);

  console.log('✅ WordPress instalado correctamente');

  return {
    path: sitePath,
    url: siteUrl,
    adminUrl: `${siteUrl}/wp-admin`,
    status: 'installed'
  };
};

// Desinstalación completa
exports.uninstall = async (sitePath, dbName) => {
  if (sitePath && fs.existsSync(sitePath)) {
    // Eliminar base de datos
    try {
      await run(`"${PHP}" "${WP_CLI}" db drop --yes --path="${sitePath}" --allow-root`);
    } catch (e) {
      console.warn('⚠️  No se pudo eliminar la BD:', e.message);
    }
    // Eliminar archivos
    fs.rmSync(sitePath, { recursive: true, force: true });
    console.log('🗑️  WordPress eliminado:', sitePath);
  }
};

// Estado del sitio
exports.getStatus = async (sitePath) => {
  if (!sitePath || !fs.existsSync(sitePath)) return 'not_found';
  try {
    const result = await run(`"${PHP}" "${WP_CLI}" core is-installed --path="${sitePath}" --allow-root`);
    return 'installed';
  } catch {
    return 'pending';
  }
};
