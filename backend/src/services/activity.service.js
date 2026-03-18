const db = require('../config/db');

exports.log = async (userId, action, description, metadata = null, ip = null) => {
  try {
    await db.query(
      'INSERT INTO activity_log (user_id, action, description, metadata, ip) VALUES (?, ?, ?, ?, ?)',
      [userId, action, description, metadata ? JSON.stringify(metadata) : null, ip]
    );
  } catch (err) {
    console.error('Error logging activity:', err.message);
  }
};

exports.getByUser = async (userId, limit = 50) => {
  const [rows] = await db.query(
    'SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
    [userId, limit]
  );
  return rows;
};

exports.getAll = async (limit = 100) => {
  const [rows] = await db.query(`
    SELECT a.*, u.name as user_name, u.email as user_email
    FROM activity_log a
    JOIN users u ON u.id = a.user_id
    ORDER BY a.created_at DESC
    LIMIT ?
  `, [limit]);
  return rows;
};
