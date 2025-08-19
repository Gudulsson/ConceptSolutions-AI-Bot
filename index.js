/**
 * ConceptSolutions Bot - WordPress & Elementor Webbshop Integration
 * Huvudfil för API-integration och automation
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { config, validateConfig, isProduction } = require('./config/api-keys');
const winston = require('winston');

// Konfigurera logger
const logger = winston.createLogger({
  level: config.development.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'conceptsolutions-bot' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (!isProduction()) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Skapa Express-app
const app = express();
const PORT = process.env.PORT || 3000;

// Säkerhetsmiddleware
app.use(helmet());
app.use(cors({
  origin: config.wordpress.siteUrl,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuter
  max: 100, // max 100 requests per windowMs
  message: 'För många requests från denna IP, försök igen senare.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Validera konfiguration vid startup
if (!validateConfig()) {
  logger.error('Kritiska API-nycklar saknas. Kontrollera din .env-fil.');
  process.exit(1);
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'ConceptSolutions Bot API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    services: {
      wordpress: !!config.wordpress.username,
      woocommerce: !!config.woocommerce.consumerKey,
      stripe: !!config.payments.stripe.secretKey,
      sendgrid: !!config.email.sendgrid.apiKey
    },
    timestamp: new Date().toISOString()
  });
});

// WordPress API routes
app.use('/api/wordpress', require('./routes/wordpress'));

// WooCommerce API routes
app.use('/api/woocommerce', require('./routes/woocommerce'));

// AI routes
app.use('/api/ai', require('./routes/ai'));

// Payment routes
app.use('/api/payments', require('./routes/payments'));

// Email routes
app.use('/api/email', require('./routes/email'));

// Analytics routes
app.use('/api/analytics', require('./routes/analytics'));

// Social media routes
app.use('/api/social', require('./routes/social'));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Ett internt fel uppstod',
    message: isProduction() ? 'Kontakta support' : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint hittades inte',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`ConceptSolutions Bot körs på port ${PORT}`);
  logger.info(`Miljö: ${config.development.nodeEnv}`);
  logger.info(`WordPress URL: ${config.wordpress.siteUrl}`);
  logger.info(`WooCommerce URL: ${config.woocommerce.storeUrl}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM mottaget, stänger server...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT mottaget, stänger server...');
  process.exit(0);
});

module.exports = app;
