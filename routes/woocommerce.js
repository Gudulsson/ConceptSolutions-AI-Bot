/**
 * WooCommerce API Routes
 * Hanterar kommunikation med WooCommerce REST API
 */

const express = require('express');
const axios = require('axios');
const { config } = require('../config/api-keys');

const router = express.Router();

// Middleware för WooCommerce autentisering
const getWooCommerceAuth = () => {
  const auth = Buffer.from(`${config.woocommerce.consumerKey}:${config.woocommerce.consumerSecret}`).toString('base64');
  return `Basic ${auth}`;
};

// Hämta alla produkter
router.get('/products', async (req, res) => {
  try {
    const response = await axios.get(`${config.woocommerce.storeUrl}/wp-json/wc/v3/products`, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av produkter',
      message: error.message
    });
  }
});

// Hämta specifik produkt
router.get('/products/:id', async (req, res) => {
  try {
    const response = await axios.get(`${config.woocommerce.storeUrl}/wp-json/wc/v3/products/${req.params.id}`, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av produkt',
      message: error.message
    });
  }
});

// Skapa ny produkt
router.post('/products', async (req, res) => {
  try {
    const response = await axios.post(`${config.woocommerce.storeUrl}/wp-json/wc/v3/products`, req.body, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid skapande av produkt',
      message: error.message
    });
  }
});

// Uppdatera produkt
router.put('/products/:id', async (req, res) => {
  try {
    const response = await axios.put(`${config.woocommerce.storeUrl}/wp-json/wc/v3/products/${req.params.id}`, req.body, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid uppdatering av produkt',
      message: error.message
    });
  }
});

// Ta bort produkt
router.delete('/products/:id', async (req, res) => {
  try {
    await axios.delete(`${config.woocommerce.storeUrl}/wp-json/wc/v3/products/${req.params.id}`, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid borttagning av produkt',
      message: error.message
    });
  }
});

// Hämta alla ordrar
router.get('/orders', async (req, res) => {
  try {
    const response = await axios.get(`${config.woocommerce.storeUrl}/wp-json/wc/v3/orders`, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av ordrar',
      message: error.message
    });
  }
});

// Hämta specifik order
router.get('/orders/:id', async (req, res) => {
  try {
    const response = await axios.get(`${config.woocommerce.storeUrl}/wp-json/wc/v3/orders/${req.params.id}`, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av order',
      message: error.message
    });
  }
});

// Skapa ny order
router.post('/orders', async (req, res) => {
  try {
    const response = await axios.post(`${config.woocommerce.storeUrl}/wp-json/wc/v3/orders`, req.body, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid skapande av order',
      message: error.message
    });
  }
});

// Uppdatera order
router.put('/orders/:id', async (req, res) => {
  try {
    const response = await axios.put(`${config.woocommerce.storeUrl}/wp-json/wc/v3/orders/${req.params.id}`, req.body, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid uppdatering av order',
      message: error.message
    });
  }
});

// Hämta kunder
router.get('/customers', async (req, res) => {
  try {
    const response = await axios.get(`${config.woocommerce.storeUrl}/wp-json/wc/v3/customers`, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av kunder',
      message: error.message
    });
  }
});

// Hämta kategorier
router.get('/products/categories', async (req, res) => {
  try {
    const response = await axios.get(`${config.woocommerce.storeUrl}/wp-json/wc/v3/products/categories`, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av kategorier',
      message: error.message
    });
  }
});

// Hämta lagerstatus
router.get('/reports/products/totals', async (req, res) => {
  try {
    const response = await axios.get(`${config.woocommerce.storeUrl}/wp-json/wc/v3/reports/products/totals`, {
      headers: {
        'Authorization': getWooCommerceAuth(),
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Fel vid hämtning av lagerrapport',
      message: error.message
    });
  }
});

module.exports = router;
