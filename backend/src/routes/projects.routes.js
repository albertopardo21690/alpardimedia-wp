const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const projectsController = require('../controllers/projects.controller');

router.get('/', auth, projectsController.getAll);
router.post('/', auth, projectsController.create);
router.delete('/:id', auth, projectsController.remove);

module.exports = router;
