const db = require('../config/db');
const wpService = require('../services/wordpress/wp.service');

exports.install = async (req, res) => {
  try {
    const { projectId, config } = req.body;
    // config: { siteName, siteUrl, dbName, dbUser, dbPassword, dbPrefix, adminUser, adminPassword, adminEmail, language }

    if (!projectId || !config)
      return res.status(400).json({ error: 'Datos de instalación incompletos' });

    const [rows] = await db.query(
      'SELECT id FROM projects WHERE id = ? AND user_id = ?',
      [projectId, req.user.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: 'Proyecto no encontrado' });

    // Generar wp-config.php y registrar instalación
    const result = await wpService.install(projectId, config);

    await db.query(
      'UPDATE projects SET status = ?, wp_path = ?, wp_url = ? WHERE id = ?',
      ['installed', result.path, result.url, projectId]
    );

    res.json({ message: 'WordPress instalado correctamente', ...result });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error en la instalación' });
  }
};

exports.uninstall = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM projects WHERE id = ? AND user_id = ?',
      [req.params.projectId, req.user.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: 'Proyecto no encontrado' });

    await wpService.uninstall(rows[0].wp_path);
    await db.query(
      'UPDATE projects SET status = ?, wp_path = NULL, wp_url = NULL WHERE id = ?',
      ['pending', req.params.projectId]
    );

    res.json({ message: 'WordPress eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error al desinstalar' });
  }
};

exports.status = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT status, wp_url FROM projects WHERE id = ? AND user_id = ?',
      [req.params.projectId, req.user.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: 'Proyecto no encontrado' });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener estado' });
  }
};

// Validar conexión a BD
exports.validateDb = async (req, res) => {
  const { dbHost, dbUser, dbPassword, dbName } = req.body;
  try {
    const mysql = require('mysql2/promise');
    const conn  = await mysql.createConnection({
      host:     dbHost     || 'localhost',
      user:     dbUser     || 'root',
      password: dbPassword || '',
    });
    // Verificar si la BD ya existe
    const [rows] = await conn.query(
      `SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [dbName]
    );
    await conn.end();
    res.json({
      success:  true,
      dbExists: rows.length > 0,
      message:  rows.length > 0
        ? `BD "${dbName}" ya existe — se usará tal cual`
        : `Conexión correcta — se creará "${dbName}"`
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Preview wp-config.php
exports.previewConfig = async (req, res) => {
  try {
    const { generateWpConfig } = require('../services/wordpress/wpconfig.generator');
    const content = generateWpConfig(req.body);
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
