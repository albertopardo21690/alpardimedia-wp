const { ForbiddenError } = require('../utils/errors');

module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ForbiddenError('Acceso restringido a administradores'));
  }
  next();
};
