const router = require('express').Router();
const auth   = require('../middleware/auth.middleware');
const { asyncHandler }   = require('../middleware/error.middleware');
const { validate }       = require('../middleware/validate.middleware');
const { installLimiter } = require('../middleware/ratelimit.middleware');
const { installValidator, validateDbValidator } = require('../validators/wordpress.validators');
const wpController       = require('../controllers/wordpress.controller');

router.post('/install',            auth, installLimiter, installValidator, validate, asyncHandler(wpController.install));
router.delete('/uninstall/:projectId', auth, asyncHandler(wpController.uninstall));
router.get('/status/:projectId',   auth, asyncHandler(wpController.status));
router.post('/validate-db',        auth, validateDbValidator, validate, asyncHandler(wpController.validateDb));
router.post('/preview-config',     auth, asyncHandler(wpController.previewConfig));

module.exports = router;
