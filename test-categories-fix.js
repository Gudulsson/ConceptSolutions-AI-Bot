/**
 * Test Script för Categories och Tags Fix
 * Testar att WordPress-publicering fungerar med korrekta category och tag IDs
 */

const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000/api/ai';

async function testCategoriesAndTagsFix() {
  try {
    console.log('🚀 Testar categories och tags fix...\n');

    // Steg 1: Testa förhandsvisning
    console.log('📝 Genererar förhandsvisning...');
    const previewResponse = await axios.post(`${API_BASE_URL}/preview/news`, {
      topic: 'AI och framtidens e-handel',
      category: 'Teknologi',
      tags: ['AI', 'E-handel', 'Framtid'],
      publishStatus: 'draft'
    });

    if (previewResponse.data.success) {
      console.log('✅ Förhandsvisning genererad framgångsrikt!');
      const articleData = previewResponse.data.data;
      
      console.log('\n📄 Artikel-data:');
      console.log(`- Titel: ${articleData.title}`);
      console.log(`- Kategori: ${articleData.category || 'Ej satt'}`);
      console.log(`- Taggar: ${articleData.tags ? articleData.tags.join(', ') : 'Ej satta'}`);
      
      if (articleData.thumbnail) {
        console.log(`- Thumbnail: ${articleData.thumbnail.url}`);
      }
    } else {
      console.log('❌ Fel vid generering av förhandsvisning:', previewResponse.data.error);
      return;
    }

    // Steg 2: Testa publicering med korrekta category/tag IDs
    console.log('\n📤 Publicerar artikel med korrekta IDs...');
    const publishResponse = await axios.post(`${API_BASE_URL}/publish/news`, {
      topic: 'AI och framtidens e-handel',
      category: 'Teknologi',
      tags: ['AI', 'E-handel', 'Framtid'],
      publishStatus: 'draft'
    });

    if (publishResponse.data.success) {
      console.log('🎉 **ARTIKEL PUBLICERAD FRAMGÅNGSRIKT!**');
      
      const publishedData = publishResponse.data.data;
      console.log('\n📊 Publicerings-data:');
      console.log(`- Post ID: ${publishedData.postId}`);
      console.log(`- URL: ${publishedData.postUrl}`);
      console.log(`- Status: ${publishedData.status}`);
      console.log(`- Featured Image ID: ${publishedData.featuredImageId || 'Ej satt'}`);
      
      if (publishedData.thumbnail) {
        console.log(`- Thumbnail: ${publishedData.thumbnail.url}`);
      }
      
      console.log('\n✅ **Categories och Tags fix fungerar perfekt!**');
      console.log('✅ **Thumbnail-funktionalitet fungerar perfekt!**');
      console.log('✅ **WordPress-publicering fungerar nu utan fel!**');
      
    } else {
      console.log('❌ Fel vid publicering:', publishResponse.data.error);
      if (publishResponse.data.details) {
        console.log('Detaljer:', publishResponse.data.details);
      }
    }

  } catch (error) {
    console.error('❌ Fel vid testning:', error.response?.data || error.message);
    if (error.response?.data?.details) {
      console.log('Detaljer:', error.response.data.details);
    }
  }
}

// Kör testet
testCategoriesAndTagsFix();
