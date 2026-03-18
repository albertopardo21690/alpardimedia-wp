const { exec } = require('child_process');
const path = require('path');

const PHP    = process.env.PHP_BINARY  || 'php';
const WP_CLI = process.env.WP_CLI_PATH;
const SITES  = process.env.WP_SITES_PATH;

const run = (cmd) => new Promise((resolve, reject) => {
  exec(cmd, { timeout: 60000 }, (error, stdout, stderr) => {
    if (error) return reject(new Error(stderr || error.message));
    resolve(stdout.trim());
  });
});

const wp = (projectId, command) => {
  const sitePath = path.join(SITES, `project-${projectId}`);
  return run(`"${PHP}" "${WP_CLI}" ${command} --path="${sitePath}" --allow-root`);
};

// ESTADO DEL SITIO
exports.runWpCli = async (sitePath, command) => {
  return await wp(sitePath, command);
};

exports.getStatus = async (projectId) => {
  try {
    await wp(projectId, 'core is-installed');
    const version = await wp(projectId, 'core version');
    const url     = await wp(projectId, 'option get siteurl');
    return { installed: true, version: version.trim(), url: url.trim() };
  } catch {
    return { installed: false };
  }
};

// PLUGINS
exports.getPlugins = async (projectId) => {
  const raw = await wp(projectId, 'plugin list --format=json');
  return JSON.parse(raw);
};

exports.togglePlugin = async (projectId, plugin, activate) => {
  const action = activate ? 'activate' : 'deactivate';
  return await wp(projectId, `plugin ${action} ${plugin}`);
};

exports.installPlugin = async (projectId, plugin) => {
  return await wp(projectId, `plugin install ${plugin} --activate`);
};

exports.deletePlugin = async (projectId, plugin) => {
  return await wp(projectId, `plugin delete ${plugin}`);
};

// TEMAS
exports.getThemes = async (projectId) => {
  const raw = await wp(projectId, 'theme list --format=json');
  return JSON.parse(raw);
};

exports.activateTheme = async (projectId, theme) => {
  return await wp(projectId, `theme activate ${theme}`);
};

exports.installTheme = async (projectId, theme) => {
  return await wp(projectId, `theme install ${theme} --activate`);
};

// USUARIOS
exports.getUsers = async (projectId) => {
  const raw = await wp(projectId, 'user list --format=json');
  return JSON.parse(raw);
};

exports.createUser = async (projectId, { username, email, password, role }) => {
  return await wp(projectId, `user create ${username} ${email} --user_pass="${password}" --role=${role}`);
};

exports.deleteUser = async (projectId, userId) => {
  return await wp(projectId, `user delete ${userId} --yes`);
};

// MÉTRICAS
exports.getMetrics = async (projectId) => {
  const [postCount, pageCount, commentCount, activeTheme] = await Promise.all([
    wp(projectId, 'post list --post_type=post --format=count'),
    wp(projectId, 'post list --post_type=page --format=count'),
    wp(projectId, 'comment list --format=count'),
    wp(projectId, 'theme list --status=active --format=json')
  ]);

  let theme = {};
  try { theme = JSON.parse(activeTheme)[0]; } catch {}

  return {
    posts:    parseInt(postCount)   || 0,
    pages:    parseInt(pageCount)   || 0,
    comments: parseInt(commentCount)|| 0,
    theme:    theme.name || 'N/A'
  };
};
