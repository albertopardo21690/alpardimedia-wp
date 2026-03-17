const { body } = require('express-validator');

exports.installValidator = [
  body('projectId').isInt({ min: 1 }).withMessage('ID de proyecto no valido'),
  body('config.siteName').trim().notEmpty().withMessage('El nombre del sitio es obligatorio'),
  body('config.dbName').trim().notEmpty().withMessage('El nombre de la BD es obligatorio')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Nombre de BD invalido'),
  body('config.dbUser').trim().notEmpty().withMessage('El usuario de BD es obligatorio'),
  body('config.dbHost').trim().notEmpty().withMessage('El host de BD es obligatorio'),
  body('config.adminUser').trim().notEmpty().withMessage('El usuario admin es obligatorio'),
  body('config.adminPassword').notEmpty().withMessage('La contrasena admin es obligatoria')
    .isLength({ min: 8 }).withMessage('Minimo 8 caracteres'),
  body('config.adminEmail').isEmail().withMessage('Email de admin no valido'),
];

exports.validateDbValidator = [
  body('dbHost').notEmpty().withMessage('Host requerido'),
  body('dbUser').notEmpty().withMessage('Usuario requerido'),
  body('dbName').notEmpty().withMessage('Nombre de BD requerido'),
];
