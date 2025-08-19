/**
 * Email Routes
 * Hanterar e-postutskick (SendGrid, Mailchimp)
 */

const express = require('express');
const router = express.Router();

// Placeholder för e-postroutes
router.get('/', (req, res) => {
  res.json({
    message: 'Email API - Under utveckling',
    available_services: ['sendgrid', 'mailchimp']
  });
});

module.exports = router;
