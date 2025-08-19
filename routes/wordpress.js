/**
 * WordPress API Routes
 * Hanterar kommunikation med WordPress REST API
 */

const express = require('express');
const axios = require('axios');
const { config } = require('../config/api-keys');

const router = express.Router();

// Middleware för WordPress autentisering
const getWordPressAuth = () => {
  const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
  return `Basic ${auth}`;
};

// Hämta alla inlägg
router.get('/posts', async (req, res) => {
  try {
    const response = await axios.get(`${config.wordpress.restApiUrl}/posts`, {
      headers: {
        'Authorization': getWordPressAuth(),
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av inlägg',
      message: error.message
    });
  }
});

// Hämta specifikt inlägg
router.get('/posts/:id', async (req, res) => {
  try {
    const response = await axios.get(`${config.wordpress.restApiUrl}/posts/${req.params.id}`, {
      headers: {
        'Authorization': getWordPressAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av inlägg',
      message: error.message
    });
  }
});

// Skapa nytt inlägg
router.post('/posts', async (req, res) => {
  try {
    const response = await axios.post(`${config.wordpress.restApiUrl}/posts`, req.body, {
      headers: {
        'Authorization': getWordPressAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid skapande av inlägg',
      message: error.message
    });
  }
});

// Uppdatera inlägg
router.put('/posts/:id', async (req, res) => {
  try {
    const response = await axios.put(`${config.wordpress.restApiUrl}/posts/${req.params.id}`, req.body, {
      headers: {
        'Authorization': getWordPressAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid uppdatering av inlägg',
      message: error.message
    });
  }
});

// Ta bort inlägg
router.delete('/posts/:id', async (req, res) => {
  try {
    await axios.delete(`${config.wordpress.restApiUrl}/posts/${req.params.id}`, {
      headers: {
        'Authorization': getWordPressAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid borttagning av inlägg',
      message: error.message
    });
  }
});

// Hämta sidor
router.get('/pages', async (req, res) => {
  try {
    const response = await axios.get(`${config.wordpress.siteUrl}/wp-json/wp/v2/pages`, {
      headers: {
        'Authorization': getWordPressAuth(),
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av sidor',
      message: error.message
    });
  }
});

// Hämta media
router.get('/media', async (req, res) => {
  try {
    const response = await axios.get(`${config.wordpress.siteUrl}/wp-json/wp/v2/media`, {
      headers: {
        'Authorization': getWordPressAuth(),
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av media',
      message: error.message
    });
  }
});

// Hämta användare
router.get('/users', async (req, res) => {
  try {
    const response = await axios.get(`${config.wordpress.siteUrl}/wp-json/wp/v2/users`, {
      headers: {
        'Authorization': getWordPressAuth(),
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av användare',
      message: error.message
    });
  }
});

module.exports = router;
