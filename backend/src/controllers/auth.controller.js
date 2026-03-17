const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const db     = require('../config/db');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    return res.status(409).json({ error: 'El email ya está registrado', code: 'CONFLICT' });
  }

  const hash     = await bcrypt.hash(password, 12);
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hash]
  );

  const token = jwt.sign(
    { id: result.insertId, email, role: 'user' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  res.status(201).json({ token, user: { id: result.insertId, name, email, role: 'user' } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas', code: 'AUTH_ERROR' });

  const user  = rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas', code: 'AUTH_ERROR' });

  if (user.blocked) return res.status(403).json({ error: 'Usuario bloqueado', code: 'FORBIDDEN' });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};
