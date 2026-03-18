const router = require('express').Router();
const auth   = require('../middleware/auth.middleware');
const admin  = require('../middleware/admin.middleware');
const { asyncHandler } = require('../middleware/error.middleware');
const ctrl   = require('../controllers/admin.controller');

// Todas las rutas requieren auth + admin
router.use(auth, admin);

// Estadísticas
router.get('/stats', asyncHandler(ctrl.getStats));

// Usuarios
router.get('/users',                asyncHandler(ctrl.getUsers));
router.patch('/users/:id/block',    asyncHandler(ctrl.blockUser));
router.delete('/users/:id',         asyncHandler(ctrl.deleteUser));
router.patch('/users/:id/plan',     asyncHandler(ctrl.updatePlan));
router.patch('/users/:id/role',     asyncHandler(ctrl.makeAdmin));
router.post('/users/:id/impersonate', asyncHandler(ctrl.impersonate));

// Proyectos
router.get('/projects',           asyncHandler(ctrl.getAllProjects));
router.delete('/projects/:id',    asyncHandler(ctrl.deleteProject));

// Logs
router.get('/logs', asyncHandler(ctrl.getLogs));

router.post('/users/reset-password', asyncHandler(ctrl.resetPassword));
module.exports = router;
