const db         = require('../config/db');
const wpManager  = require('../services/wordpress/wp-manager.service');
const wpApi      = require('../services/wordpress/wp-api.service');

// Obtener proyecto y validar pertenencia al usuario
const getProject = async (projectId, userId) => {
  const [rows] = await db.query(
    'SELECT p.*, w.admin_user, w.admin_email FROM projects p LEFT JOIN wp_installations w ON w.project_id = p.id WHERE p.id = ? AND p.user_id = ?',
    [projectId, userId]
  );
  if (!rows.length) throw new Error('Proyecto no encontrado');
  return rows[0];
};

exports.getStatus = async (req, res) => {
  try {
    const project = await getProject(req.params.id, req.user.id);
    const status  = await wpManager.getStatus(req.params.id);
    res.json({ project, status });
  } catch (err) { res.status(404).json({ error: err.message }); }
};

exports.getMetrics = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    const metrics = await wpManager.getMetrics(req.params.id);
    res.json(metrics);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getPlugins = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    const plugins = await wpManager.getPlugins(req.params.id);
    res.json(plugins);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.togglePlugin = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    const { plugin, activate } = req.body;
    await wpManager.togglePlugin(req.params.id, plugin, activate);
    res.json({ message: `Plugin ${activate ? 'activado' : 'desactivado'}` });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.installPlugin = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    await wpManager.installPlugin(req.params.id, req.body.plugin);
    res.json({ message: 'Plugin instalado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deletePlugin = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    await wpManager.deletePlugin(req.params.id, req.params.plugin);
    res.json({ message: 'Plugin eliminado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getThemes = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    const themes = await wpManager.getThemes(req.params.id);
    res.json(themes);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.activateTheme = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    await wpManager.activateTheme(req.params.id, req.body.theme);
    res.json({ message: 'Tema activado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.installTheme = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    await wpManager.installTheme(req.params.id, req.body.theme);
    res.json({ message: 'Tema instalado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getUsers = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    const users = await wpManager.getUsers(req.params.id);
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createUser = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    await wpManager.createUser(req.params.id, req.body);
    res.json({ message: 'Usuario creado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteUser = async (req, res) => {
  try {
    await getProject(req.params.id, req.user.id);
    await wpManager.deleteUser(req.params.id, req.params.userId);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getPages = async (req, res) => {
  try {
    const project = await getProject(req.params.id, req.user.id);
    if (!project.wp_url) return res.status(400).json({ error: 'WordPress no instalado' });
    const pages = await wpApi.getPages(project.wp_url, project.admin_user, req.query.pass);
    res.json(pages);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createPage = async (req, res) => {
  try {
    const project = await getProject(req.params.id, req.user.id);
    if (!project.wp_url) return res.status(400).json({ error: 'WordPress no instalado' });
    const page = await wpApi.createPage(project.wp_url, project.admin_user, req.body.pass, req.body);
    res.json(page);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getPosts = async (req, res) => {
  try {
    const project = await getProject(req.params.id, req.user.id);
    if (!project.wp_url) return res.status(400).json({ error: 'WordPress no instalado' });
    const posts = await wpApi.getPosts(project.wp_url, project.admin_user, req.query.pass);
    res.json(posts);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
