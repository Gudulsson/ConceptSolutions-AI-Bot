/**
 * Kontrollera alla artiklar på ConceptSolutions.com
 * Inkluderar både publicerade och utkast
 */

const axios = require('axios');
const { config } = require('./config/api-keys');

async function checkAllArticles() {
  try {
    const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
    
    console.log('📚 Hämtar alla artiklar från ConceptSolutions.com...\n');
    
    // Hämta publicerade artiklar
    const publishedResponse = await axios.get(`${config.wordpress.restApiUrl}/posts`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      params: {
        per_page: 10,
        status: 'publish',
        orderby: 'date',
        order: 'desc'
      }
    });
    
    // Hämta utkast
    const draftResponse = await axios.get(`${config.wordpress.restApiUrl}/posts`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      params: {
        per_page: 10,
        status: 'draft',
        orderby: 'date',
        order: 'desc'
      }
    });
    
    console.log('📊 SAMMANFATTNING:');
    console.log(`   Publicerade artiklar: ${publishedResponse.data.length}`);
    console.log(`   Utkast: ${draftResponse.data.length}`);
    console.log('');
    
    if (draftResponse.data.length > 0) {
      console.log('📝 UTKAST (senaste först):');
      draftResponse.data.forEach((article, index) => {
        console.log(`${index + 1}. ${article.title.rendered}`);
        console.log(`   🆔 ID: ${article.id}`);
        console.log(`   🔗 ${article.link}`);
        console.log(`   📅 Skapad: ${new Date(article.date).toLocaleDateString('sv-SE')} ${new Date(article.date).toLocaleTimeString('sv-SE')}`);
        console.log(`   📝 Excerpt: ${article.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100)}...`);
        console.log('');
      });
    }
    
    if (publishedResponse.data.length > 0) {
      console.log('🌐 PUBLICERADE ARTIKLAR (senaste först):');
      publishedResponse.data.forEach((article, index) => {
        console.log(`${index + 1}. ${article.title.rendered}`);
        console.log(`   🆔 ID: ${article.id}`);
        console.log(`   🔗 ${article.link}`);
        console.log(`   📅 Publicerad: ${new Date(article.date).toLocaleDateString('sv-SE')}`);
        console.log(`   📝 ${article.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100)}...`);
        console.log('');
      });
    }
    
    console.log('✅ Kontroll slutförd!');
    
    return {
      published: publishedResponse.data,
      drafts: draftResponse.data
    };
    
  } catch (error) {
    console.error('❌ Fel vid hämtning av artiklar:', error.response?.data || error.message);
    throw error;
  }
}

// Kör kontrollen
if (require.main === module) {
  checkAllArticles()
    .then(() => {
      console.log('\n🎯 Om du vill publicera utkastet, logga in på WordPress-admin.');
    })
    .catch(error => {
      console.error('\n❌ Kontroll misslyckades:', error.message);
    });
}

module.exports = { checkAllArticles };
