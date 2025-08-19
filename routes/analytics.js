/**
 * Analytics Routes
 * Hanterar analytics och tracking (Google Analytics, Facebook Pixel)
 */

const express = require('express');
const router = express.Router();

// Placeholder för analytics routes
router.get('/', (req, res) => {
  res.json({
    message: 'Analytics API - Under utveckling',
    available_services: ['google_analytics', 'facebook_pixel']
  });
});

module.exports = router;
