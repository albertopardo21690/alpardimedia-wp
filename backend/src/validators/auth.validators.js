const { body } = require('express-validator');

exports.registerValidator = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('email').trim().notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email no valido').normalizeEmail(),
  body('password').notEmpty().withMessage('La contrasena es obligatoria')
    .isLength({ min: 8 }).withMessage('Minimo 8 caracteres'),
];

exports.loginValidator = [
  body('email').trim().notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email no valido'),
  body('password').notEmpty().withMessage('La contrasena es obligatoria'),
];
