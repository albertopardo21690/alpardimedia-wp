const router = require('express').Router();
const auth   = require('../middleware/auth.middleware');
const { asyncHandler } = require('../middleware/error.middleware');
const ctrl   = require('../controllers/profile.controller');

router.get('/',               auth, asyncHandler(ctrl.getProfile));
router.put('/',               auth, asyncHandler(ctrl.updateProfile));
router.put('/password',       auth, asyncHandler(ctrl.changePassword));
router.get('/activity',       auth, asyncHandler(ctrl.getActivity));
router.get('/stats',          auth, asyncHandler(ctrl.getStats));

module.exports = router;
