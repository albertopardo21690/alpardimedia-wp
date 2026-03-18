const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
};

exports.create = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });

  

  const [result] = await db.query(
    'INSERT INTO projects (user_id, name, description, status) VALUES (?, ?, ?, ?)',
    [req.user.id, name, description || '', 'pending']
  );

  res.status(201).json({ id: result.insertId, name, description, status: 'pending' });
};

exports.remove = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id FROM projects WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: 'Proyecto no encontrado' });

    await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Proyecto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
};

exports.cleanup = async (req, res) => {
  try {
    const fs = require('fs');
    const [projects] = await db.query(
      'SELECT id, name, wp_path, status FROM projects WHERE user_id = ?',
      [req.user.id]
    );

    const removed = [];
    const kept    = [];

    for (const p of projects) {
      const exists = p.wp_path && fs.existsSync(p.wp_path);
      if (!exists && p.status === 'installed') {
        await db.query('DELETE FROM projects WHERE id = ?', [p.id]);
        removed.push(p.name);
      } else {
        kept.push(p.name);
      }
    }

    res.json({
      message: removed.length > 0
        ? removed.length + ' proyecto(s) eliminado(s) por no existir en disco'
        : 'Todos los proyectos están sincronizados',
      removed,
      kept
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
