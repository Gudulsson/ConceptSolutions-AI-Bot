/**
 * Payment Routes
 * Hanterar betalningsgateways (Stripe, Klarna, PayPal)
 */

const express = require('express');
const router = express.Router();

// Placeholder för betalningsroutes
router.get('/', (req, res) => {
  res.json({
    message: 'Payment API - Under utveckling',
    available_gateways: ['stripe', 'klarna', 'paypal']
  });
});

module.exports = router;
