const db     = require('../config/db');
const jwt    = require('jsonwebtoken');
const fs     = require('fs');
const path   = require('path');

// ESTADÍSTICAS GLOBALES
exports.getStats = async (req, res) => {
  const [[users]]    = await db.query('SELECT COUNT(*) as total FROM users');
  const [[projects]] = await db.query('SELECT COUNT(*) as total FROM projects');
  const [[installed]]= await db.query("SELECT COUNT(*) as total FROM projects WHERE status = 'installed'");
  const [[admins]]   = await db.query("SELECT COUNT(*) as total FROM users WHERE role = 'admin'");
  const [[blocked]]  = await db.query("SELECT COUNT(*) as total FROM users WHERE blocked = 1");

  res.json({
    users:     users.total,
    projects:  projects.total,
    installed: installed.total,
    admins:    admins.total,
    blocked:   blocked.total
  });
};

// GESTIÓN DE USUARIOS
exports.getUsers = async (req, res) => {
  const [rows] = await db.query(`
    SELECT u.id, u.name, u.email, u.role, u.blocked, u.plan, u.created_at,
           COUNT(p.id) as project_count
    FROM users u
    LEFT JOIN projects p ON p.user_id = u.id
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `);
  res.json(rows);
};

exports.blockUser = async (req, res) => {
  const { id }      = req.params;
  const { blocked } = req.body;
  if (parseInt(id) === req.user.id) return res.status(400).json({ error: 'No puedes bloquearte a ti mismo' });
  await db.query('UPDATE users SET blocked = ? WHERE id = ?', [blocked ? 1 : 0, id]);
  res.json({ message: blocked ? 'Usuario bloqueado' : 'Usuario desbloqueado' });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (parseInt(id) === req.user.id) return res.status(400).json({ error: 'No puedes eliminarte a ti mismo' });
  await db.query('DELETE FROM users WHERE id = ?', [id]);
  res.json({ message: 'Usuario eliminado' });
};

exports.updatePlan = async (req, res) => {
  const { id }   = req.params;
  const { plan } = req.body;
  await db.query('UPDATE users SET plan = ? WHERE id = ?', [plan, id]);
  res.json({ message: 'Plan actualizado' });
};

exports.makeAdmin = async (req, res) => {
  const { id }   = req.params;
  const { role } = req.body;
  await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
  res.json({ message: 'Rol actualizado' });
};

// GESTIÓN DE PROYECTOS
exports.getAllProjects = async (req, res) => {
  const [rows] = await db.query(`
    SELECT p.*, u.name as user_name, u.email as user_email
    FROM projects p
    JOIN users u ON u.id = p.user_id
    ORDER BY p.created_at DESC
  `);
  res.json(rows);
};

exports.deleteProject = async (req, res) => {
  await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
  res.json({ message: 'Proyecto eliminado' });
};

// IMPERSONAR USUARIO
exports.impersonate = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  if (!rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });

  const user  = rows[0];
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, impersonated: true, adminId: req.user.id },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

// LOGS DEL SISTEMA
exports.getLogs = async (req, res) => {
  const logsDir  = path.join(process.cwd(), 'logs');
  const logFile  = req.query.type === 'error' ? 'error.log' : 'combined.log';
  const logPath  = path.join(logsDir, logFile);
  const lines    = parseInt(req.query.lines) || 100;

  if (!fs.existsSync(logPath)) return res.json({ logs: [] });

  const content  = fs.readFileSync(logPath, 'utf8');
  const allLines = content.trim().split('\n').filter(Boolean);
  const last     = allLines.slice(-lines);

  const logs = last.map(line => {
    try { return JSON.parse(line); }
    catch { return { message: line }; }
  }).reverse();

  res.json({ logs, total: allLines.length });
};
