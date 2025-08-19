/**
 * ConceptSolutions API Keys Validation Script
 * Kör detta script för att validera att alla API-nycklar är korrekt konfigurerade
 */

const { config, validateConfig, getConfig } = require('../config/api-keys');
const axios = require('axios');

// Färger för konsolutskrift
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const logSection = (title) => {
  console.log(`\n${colors.bold}${colors.blue}=== ${title} ===${colors.reset}`);
};

// Validera WordPress API
const validateWordPressAPI = async () => {
  logSection('WordPress API Validation');
  
  const wpConfig = config.wordpress;
  
  if (!wpConfig.username || !wpConfig.applicationPassword) {
    log('❌ WordPress API-nycklar saknas', 'red');
    return false;
  }

  try {
    const auth = Buffer.from(`${wpConfig.username}:${wpConfig.applicationPassword}`).toString('base64');
    const response = await axios.get(`${wpConfig.siteUrl}/wp-json/wp/v2/posts?per_page=1`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });
    
    log('✅ WordPress API fungerar korrekt', 'green');
    return true;
  } catch (error) {
    log(`❌ WordPress API fel: ${error.message}`, 'red');
    return false;
  }
};

// Validera WooCommerce API
const validateWooCommerceAPI = async () => {
  logSection('WooCommerce API Validation');
  
  const wcConfig = config.woocommerce;
  
  if (!wcConfig.consumerKey || !wcConfig.consumerSecret) {
    log('❌ WooCommerce API-nycklar saknas', 'red');
    return false;
  }

  try {
    const auth = Buffer.from(`${wcConfig.consumerKey}:${wcConfig.consumerSecret}`).toString('base64');
    const response = await axios.get(`${wcConfig.storeUrl}/wp-json/wc/v3/products?per_page=1`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });
    
    log('✅ WooCommerce API fungerar korrekt', 'green');
    return true;
  } catch (error) {
    log(`❌ WooCommerce API fel: ${error.message}`, 'red');
    return false;
  }
};

// Validera Stripe API
const validateStripeAPI = async () => {
  logSection('Stripe API Validation');
  
  const stripeConfig = config.payments.stripe;
  
  if (!stripeConfig.secretKey) {
    log('⚠️  Stripe API-nyckel saknas (valfritt)', 'yellow');
    return true;
  }

  try {
    const stripe = require('stripe')(stripeConfig.secretKey);
    const account = await stripe.accounts.retrieve();
    
    log('✅ Stripe API fungerar korrekt', 'green');
    log(`   Konto: ${account.business_type || 'Standard'}`, 'green');
    return true;
  } catch (error) {
    log(`❌ Stripe API fel: ${error.message}`, 'red');
    return false;
  }
};

// Validera SendGrid API
const validateSendGridAPI = async () => {
  logSection('SendGrid API Validation');
  
  const sgConfig = config.email.sendgrid;
  
  if (!sgConfig.apiKey) {
    log('⚠️  SendGrid API-nyckel saknas (valfritt)', 'yellow');
    return true;
  }

  try {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(sgConfig.apiKey);
    
    // Testa API genom att hämta användarprofil
    const response = await axios.get('https://api.sendgrid.com/v3/user/profile', {
      headers: {
        'Authorization': `Bearer ${sgConfig.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    log('✅ SendGrid API fungerar korrekt', 'green');
    log(`   Från e-post: ${sgConfig.fromEmail}`, 'green');
    return true;
  } catch (error) {
    log(`❌ SendGrid API fel: ${error.message}`, 'red');
    return false;
  }
};

// Validera Google Analytics
const validateGoogleAnalytics = () => {
  logSection('Google Analytics Validation');
  
  const gaConfig = config.analytics.googleAnalytics;
  
  if (!gaConfig.trackingId) {
    log('⚠️  Google Analytics Tracking ID saknas (valfritt)', 'yellow');
    return true;
  }

  log('✅ Google Analytics konfigurerat', 'green');
  log(`   Tracking ID: ${gaConfig.trackingId}`, 'green');
  return true;
};

// Validera Facebook Pixel
const validateFacebookPixel = () => {
  logSection('Facebook Pixel Validation');
  
  const fbConfig = config.analytics.facebook;
  
  if (!fbConfig.pixelId) {
    log('⚠️  Facebook Pixel ID saknas (valfritt)', 'yellow');
    return true;
  }

  log('✅ Facebook Pixel konfigurerat', 'green');
  log(`   Pixel ID: ${fbConfig.pixelId}`, 'green');
  return true;
};

// Huvudfunktion för validering
const main = async () => {
  log(`${colors.bold}${colors.blue}ConceptSolutions API Keys Validation${colors.reset}`, 'blue');
  log('Kontrollerar alla API-nycklar och konfigurationer...\n');

  const results = {
    wordpress: await validateWordPressAPI(),
    woocommerce: await validateWooCommerceAPI(),
    stripe: await validateStripeAPI(),
    sendgrid: await validateSendGridAPI(),
    googleAnalytics: validateGoogleAnalytics(),
    facebookPixel: validateFacebookPixel(),
  };

  // Sammanfattning
  logSection('Valideringssammanfattning');
  
  const criticalServices = ['wordpress', 'woocommerce'];
  const optionalServices = ['stripe', 'sendgrid', 'googleAnalytics', 'facebookPixel'];
  
  let criticalPassed = 0;
  let optionalPassed = 0;
  
  criticalServices.forEach(service => {
    if (results[service]) {
      log(`✅ ${service}: OK`, 'green');
      criticalPassed++;
    } else {
      log(`❌ ${service}: FAILED`, 'red');
    }
  });
  
  optionalServices.forEach(service => {
    if (results[service]) {
      log(`✅ ${service}: OK`, 'green');
      optionalPassed++;
    } else {
      log(`⚠️  ${service}: SKIPPED`, 'yellow');
    }
  });

  log(`\n${colors.bold}Resultat:${colors.reset}`);
  log(`Kritiska tjänster: ${criticalPassed}/${criticalServices.length}`, 
      criticalPassed === criticalServices.length ? 'green' : 'red');
  log(`Valfria tjänster: ${optionalPassed}/${optionalServices.length}`, 'blue');

  if (criticalPassed === criticalServices.length) {
    log('\n🎉 Alla kritiska API-nycklar är korrekt konfigurerade!', 'green');
    process.exit(0);
  } else {
    log('\n⚠️  Vissa kritiska API-nycklar saknas eller är felaktiga.', 'red');
    log('Kontrollera din .env-fil och uppdatera de saknade nycklarna.', 'yellow');
    process.exit(1);
  }
};

// Kör validering om scriptet körs direkt
if (require.main === module) {
  main().catch(error => {
    log(`\n❌ Validering misslyckades: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = {
  validateWordPressAPI,
  validateWooCommerceAPI,
  validateStripeAPI,
  validateSendGridAPI,
  validateGoogleAnalytics,
  validateFacebookPixel,
  main
};
