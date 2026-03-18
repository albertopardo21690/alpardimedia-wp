const bcrypt  = require('bcryptjs');
const db      = require('../config/db');
const activity = require('../services/activity.service');

// Obtener perfil
exports.getProfile = async (req, res) => {
  const [rows] = await db.query(
    'SELECT id, name, email, role, plan, blocked, avatar, email_verified, created_at FROM users WHERE id = ?',
    [req.user.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(rows[0]);
};

// Actualizar perfil
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Nombre y email son obligatorios' });

  const [existing] = await db.query(
    'SELECT id FROM users WHERE email = ? AND id != ?', [email, req.user.id]
  );
  if (existing.length) return res.status(409).json({ error: 'El email ya está en uso' });

  await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.user.id]);
  await activity.log(req.user.id, 'profile_update', 'Perfil actualizado', { name, email }, req.ip);
  res.json({ message: 'Perfil actualizado', user: { id: req.user.id, name, email } });
};

// Cambiar contraseña
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Datos incompletos' });
  if (newPassword.length < 8) return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });

  const [rows] = await db.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
  if (!rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(currentPassword, rows[0].password);
  if (!valid) return res.status(401).json({ error: 'Contraseña actual incorrecta' });

  const hash = await bcrypt.hash(newPassword, 12);
  await db.query('UPDATE users SET password = ? WHERE id = ?', [hash, req.user.id]);
  await activity.log(req.user.id, 'password_change', 'Contraseña cambiada', null, req.ip);
  res.json({ message: 'Contraseña actualizada correctamente' });
};

// Historial de actividad
exports.getActivity = async (req, res) => {
  const logs = await activity.getByUser(req.user.id, 50);
  res.json(logs);
};

// Stats del perfil
exports.getStats = async (req, res) => {
  const [[projects]]  = await db.query('SELECT COUNT(*) as total FROM projects WHERE user_id = ?', [req.user.id]);
  const [[installed]] = await db.query("SELECT COUNT(*) as total FROM projects WHERE user_id = ? AND status = 'installed'", [req.user.id]);
  const [[activity]]  = await db.query('SELECT COUNT(*) as total FROM activity_log WHERE user_id = ?', [req.user.id]);

  const planLimits = { free: 1, basic: 3, pro: 10, enterprise: -1 };
  const [user]          = await db.query('SELECT plan FROM users WHERE id = ?', [req.user.id]);
  const plan = user[0]?.plan || 'free';
  const limit = planLimits[plan] ?? 1;

  res.json({
    projects:  projects.total,
    installed: installed.total,
    activity:  activity.total,
    plan,
    limit,
    canCreate: limit === -1 || projects.total < limit
  });
};
