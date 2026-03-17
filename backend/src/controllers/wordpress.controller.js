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
