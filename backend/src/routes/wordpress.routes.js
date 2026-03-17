const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const wpController = require('../controllers/wordpress.controller');

router.post('/install', auth, wpController.install);
router.delete('/uninstall/:projectId', auth, wpController.uninstall);
router.get('/status/:projectId', auth, wpController.status);

module.exports = router;
