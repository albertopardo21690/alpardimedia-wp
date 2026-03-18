const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const morgan   = require('morgan');
require('dotenv').config();

const logger         = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');
const { apiLimiter } = require('./middleware/ratelimit.middleware');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:4200' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
  stream: { write: (msg) => logger.info(msg.trim()) }
}));
app.use('/api', apiLimiter);

app.use('/api/auth',      require('./routes/auth.routes'));
app.use('/api/projects',  require('./routes/projects.routes'));
app.use('/api/wordpress', require('./routes/wordpress.routes'));
app.use('/api/ai',      require('./routes/ai.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/admin',   require('./routes/admin.routes'));
app.use('/api/manage',    require('./routes/wp-manager.routes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Alpardimedia WP API funcionando', timestamp: new Date().toISOString() });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info('Servidor corriendo en http://localhost:' + PORT);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', { error: err.message, stack: err.stack });
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', { error: err.message, stack: err.stack });
  process.exit(1);
});
