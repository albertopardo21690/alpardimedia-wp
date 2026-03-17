const { body, param } = require('express-validator');

exports.createProjectValidator = [
  body('name').trim().notEmpty().withMessage('El nombre del proyecto es obligatorio')
    .isLength({ min: 2, max: 150 }).withMessage('El nombre debe tener entre 2 y 150 caracteres'),
  body('description').optional().trim()
    .isLength({ max: 500 }).withMessage('La descripcion no puede superar 500 caracteres'),
];

exports.idValidator = [
  param('id').isInt({ min: 1 }).withMessage('ID no valido'),
];
