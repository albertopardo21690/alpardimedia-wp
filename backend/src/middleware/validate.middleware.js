const { validationResult } = require('express-validator');
const { ValidationError }  = require('../utils/errors');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const fields = errors.array().map(e => ({
      field:   e.path,
      message: e.msg,
      value:   e.value
    }));
    return next(new ValidationError('Datos de entrada inválidos', fields));
  }
  next();
};

module.exports = { validate };
