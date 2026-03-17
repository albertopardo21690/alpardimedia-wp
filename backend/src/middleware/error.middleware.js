const { AppError } = require('../utils/errors');
const logger       = require('../utils/logger');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message    = err.message    || 'Error interno del servidor';
  let code       = err.code       || 'ERROR';

  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message    = 'Ya existe un registro con esos datos';
    code       = 'CONFLICT';
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message    = 'Token inválido';
    code       = 'AUTH_ERROR';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message    = 'Token expirado';
    code       = 'AUTH_ERROR';
  }

  if (statusCode >= 500) {
    logger.error(message, {
      code,
      stack:  err.stack,
      url:    req.originalUrl,
      method: req.method,
      ip:     req.ip,
      user:   req.user?.id
    });
  } else {
    logger.warn(message, {
      code,
      url:    req.originalUrl,
      method: req.method,
      user:   req.user?.id
    });
  }

  const response = { error: message, code, status: statusCode };
  if (err.fields) response.fields = err.fields;
  if (process.env.NODE_ENV !== 'production' && statusCode >= 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

const notFoundHandler = (req, res, next) => {
  const { NotFoundError } = require('../utils/errors');
  next(new NotFoundError('Ruta ' + req.method + ' ' + req.originalUrl));
};

module.exports = { asyncHandler, errorHandler, notFoundHandler };
