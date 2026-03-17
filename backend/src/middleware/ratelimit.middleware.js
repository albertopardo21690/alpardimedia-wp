const rateLimit = require('express-rate-limit');
const logger    = require('../utils/logger');

const createLimiter = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  message:         { error: message, code: 'RATE_LIMIT_EXCEEDED' },
  standardHeaders: true,
  legacyHeaders:   false,
  handler: (req, res, next, options) => {
    logger.warn('Rate limit excedido', { ip: req.ip, url: req.originalUrl });
    res.status(429).json(options.message);
  }
});

exports.authLimiter    = createLimiter(15 * 60 * 1000, 10, 'Demasiados intentos. Espera 15 minutos.');
exports.apiLimiter     = createLimiter(60 * 1000, 100, 'Demasiadas peticiones. Espera un momento.');
exports.installLimiter = createLimiter(60 * 60 * 1000, 5, 'Limite de instalaciones alcanzado. Espera una hora.');
