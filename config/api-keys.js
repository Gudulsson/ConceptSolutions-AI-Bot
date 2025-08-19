/**
 * ConceptSolutions API Keys Configuration
 * Denna fil hanterar alla API-nycklar och konfigurationer
 */

require('dotenv').config();

const config = {
  // WordPress Configuration
  wordpress: {
    siteUrl: process.env.WORDPRESS_SITE_URL || 'https://conceptsolutions.se',
    restApiUrl: process.env.WORDPRESS_REST_API_URL || 'https://conceptsolutions.se/wp-json/wp/v2',
    username: process.env.WORDPRESS_USERNAME,
    applicationPassword: process.env.WORDPRESS_APPLICATION_PASSWORD,
  },

  // WooCommerce Configuration
  woocommerce: {
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    storeUrl: process.env.WOOCOMMERCE_STORE_URL || 'https://conceptsolutions.se',
    version: 'wc/v3',
  },

  // Payment Gateways
  payments: {
    stripe: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
    klarna: {
      merchantId: process.env.KLARNA_MERCHANT_ID,
      sharedSecret: process.env.KLARNA_SHARED_SECRET,
      testMode: process.env.KLARNA_TEST_MODE === 'true',
    },
    paypal: {
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
      mode: process.env.PAYPAL_MODE || 'sandbox',
    },
  },

  // Email Services
  email: {
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@conceptsolutions.se',
      fromName: process.env.SENDGRID_FROM_NAME || 'ConceptSolutions',
    },
    mailchimp: {
      apiKey: process.env.MAILCHIMP_API_KEY,
      listId: process.env.MAILCHIMP_LIST_ID,
      serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX || 'us1',
    },
  },

  // Analytics & Tracking
  analytics: {
    googleAnalytics: {
      trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      apiKey: process.env.GOOGLE_ANALYTICS_API_KEY,
    },
    facebook: {
      pixelId: process.env.FACEBOOK_PIXEL_ID,
      accessToken: process.env.FACEBOOK_ACCESS_TOKEN,
    },
  },

  // Social Media
  social: {
    instagram: {
      accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
      businessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID,
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET,
    },
  },

  // SEO & Marketing
  seo: {
    googleSearchConsole: {
      apiKey: process.env.GOOGLE_SEARCH_CONSOLE_API_KEY,
    },
    googleMyBusiness: {
      apiKey: process.env.GOOGLE_MY_BUSINESS_API_KEY,
    },
  },

  // Development & Testing
  development: {
    nodeEnv: process.env.NODE_ENV || 'development',
    debug: process.env.DEBUG === 'true',
    logLevel: process.env.LOG_LEVEL || 'info',
  },

  // Database (om relevant)
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || 'conceptsolutions_db',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  // Cache & Performance
  cache: {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: parseInt(process.env.CACHE_TTL) || 3600,
  },

  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET,
    encryptionKey: process.env.ENCRYPTION_KEY,
    sessionSecret: process.env.SESSION_SECRET,
  },
};

// Validering av kritiska API-nycklar
const validateConfig = () => {
  const requiredKeys = [
    'wordpress.username',
    'wordpress.applicationPassword',
    'woocommerce.consumerKey',
    'woocommerce.consumerSecret',
  ];

  const missingKeys = requiredKeys.filter(key => {
    const value = key.split('.').reduce((obj, k) => obj?.[k], config);
    return !value;
  });

  if (missingKeys.length > 0) {
    console.warn('Varning: Följande API-nycklar saknas:', missingKeys);
  }

  return missingKeys.length === 0;
};

// Hjälpfunktioner för att hämta konfiguration
const getConfig = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], config);
};

const isProduction = () => config.development.nodeEnv === 'production';

module.exports = {
  config,
  validateConfig,
  getConfig,
  isProduction,
};
