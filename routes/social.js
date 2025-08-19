/**
 * Social Media Routes
 * Hanterar social media integration (Instagram, Facebook)
 */

const express = require('express');
const router = express.Router();

// Placeholder för social media routes
router.get('/', (req, res) => {
  res.json({
    message: 'Social Media API - Under utveckling',
    available_platforms: ['instagram', 'facebook']
  });
});

module.exports = router;
