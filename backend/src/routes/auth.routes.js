const router = require('express').Router();
const { asyncHandler }     = require('../middleware/error.middleware');
const { validate }         = require('../middleware/validate.middleware');
const { authLimiter }      = require('../middleware/ratelimit.middleware');
const { registerValidator, loginValidator } = require('../validators/auth.validators');
const authController       = require('../controllers/auth.controller');

router.post('/register', authLimiter, registerValidator, validate, asyncHandler(authController.register));
router.post('/login',    authLimiter, loginValidator,    validate, asyncHandler(authController.login));

module.exports = router;
