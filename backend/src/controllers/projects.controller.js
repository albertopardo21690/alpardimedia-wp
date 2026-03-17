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
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const [result] = await db.query(
      'INSERT INTO projects (user_id, name, description, status) VALUES (?, ?, ?, ?)',
      [req.user.id, name, description || '', 'pending']
    );

    res.status(201).json({ id: result.insertId, name, description, status: 'pending' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear proyecto' });
  }
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
