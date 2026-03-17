const router  = require('express').Router();
const auth    = require('../middleware/auth.middleware');
const ctrl    = require('../controllers/wp-manager.controller');

// Estado y métricas
router.get('/:id/status',  auth, ctrl.getStatus);
router.get('/:id/metrics', auth, ctrl.getMetrics);

// Plugins
router.get('/:id/plugins',              auth, ctrl.getPlugins);
router.post('/:id/plugins/toggle',      auth, ctrl.togglePlugin);
router.post('/:id/plugins/install',     auth, ctrl.installPlugin);
router.delete('/:id/plugins/:plugin',   auth, ctrl.deletePlugin);

// Temas
router.get('/:id/themes',              auth, ctrl.getThemes);
router.post('/:id/themes/activate',    auth, ctrl.activateTheme);
router.post('/:id/themes/install',     auth, ctrl.installTheme);

// Usuarios
router.get('/:id/users',               auth, ctrl.getUsers);
router.post('/:id/users',              auth, ctrl.createUser);
router.delete('/:id/users/:userId',    auth, ctrl.deleteUser);

// Páginas y posts
router.get('/:id/pages',               auth, ctrl.getPages);
router.post('/:id/pages',              auth, ctrl.createPage);
router.get('/:id/posts',               auth, ctrl.getPosts);

module.exports = router;
