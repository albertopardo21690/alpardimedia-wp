const router = require('express').Router();
const auth   = require('../middleware/auth.middleware');
const { asyncHandler }   = require('../middleware/error.middleware');
const { validate }       = require('../middleware/validate.middleware');
const { createProjectValidator, idValidator } = require('../validators/projects.validators');
const projectsController = require('../controllers/projects.controller');

router.get('/',      auth, asyncHandler(projectsController.getAll));
router.post('/',     auth, createProjectValidator, validate, asyncHandler(projectsController.create));
router.delete('/:id',auth, idValidator, validate, asyncHandler(projectsController.remove));

module.exports = router;
