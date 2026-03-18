const router = require('express').Router();
const auth   = require('../middleware/auth.middleware');
const { asyncHandler } = require('../middleware/error.middleware');
const ctrl   = require('../controllers/ai.controller');

router.post('/site-texts',       auth, asyncHandler(ctrl.generateSiteTexts));
router.post('/generate-pages',   auth, asyncHandler(ctrl.generateAndCreatePages));
router.post('/generate-post',    auth, asyncHandler(ctrl.generatePost));
router.post('/seo-suggestions',  auth, asyncHandler(ctrl.getSeoSuggestions));
router.post('/chat',             auth, asyncHandler(ctrl.chat));
router.post('/generate-theme',   auth, asyncHandler(ctrl.generateTheme));
router.post('/installer-texts',  auth, asyncHandler(ctrl.generateInstallerTexts));

module.exports = router;
