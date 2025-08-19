/**
 * Test-fil för att publicera nyhet till ConceptSolutions.com
 * Denna fil demonstrerar hur den intelligenta AI-motorn kan skapa och publicera nyheter
 */

const axios = require('axios');

// Konfiguration
const API_BASE_URL = 'http://localhost:3000/api/ai';

// Test-funktion för att generera och publicera nyhet
async function testPublishNews() {
  try {
    console.log('🚀 Testar publicering av nyhet till ConceptSolutions.com...\n');

    // Steg 1: Generera förhandsvisning av nyhet
    console.log('📝 Steg 1: Genererar förhandsvisning av RFID-nyhet...');
    
    const previewResponse = await axios.post(`${API_BASE_URL}/preview/news`, {
      topic: 'rfid_technology',
      userIntent: {
        primary: 'trends_news',
        targetAudience: 'business',
        complexity: 'medium'
      }
    });

    if (previewResponse.data.success) {
      const article = previewResponse.data.data;
      console.log('✅ Förhandsvisning genererad framgångsrikt!');
      console.log(`📰 Titel: ${article.title}`);
      console.log(`📊 Ordantal: ${article.wordCount}`);
      console.log(`⏱️ Läsningstid: ${article.readingTime} minuter`);
      console.log(`🎯 SEO-poäng: ${article.seoData.seoScore}/100`);
      console.log(`🔗 Interna länkar: ${article.internalLinks.length} st`);
      console.log(`📱 Meta-beskrivning: ${article.metaData.metaDescription.substring(0, 100)}...`);
      
      console.log('\n📋 Relaterat innehåll:');
      article.relatedContent.forEach((content, index) => {
        console.log(`  ${index + 1}. ${content.title}`);
      });

      console.log('\n🏷️ Alt-texter för bilder:');
      article.altTexts.forEach((alt, index) => {
        console.log(`  ${index + 1}. ${alt.alt}`);
      });

      // Steg 2: Publicera som utkast (för säkerhet)
      console.log('\n📰 Steg 2: Publicerar som utkast...');
      
      const publishResponse = await axios.post(`${API_BASE_URL}/publish/news`, {
        topic: 'rfid_technology',
        publishStatus: 'draft', // Som utkast för säkerhet
        category: 'Nyheter',
        tags: ['RFID', 'Teknologi', 'Företag']
      });

      if (publishResponse.data.success) {
        const published = publishResponse.data.data;
        console.log('✅ Nyhet publicerad framgångsrikt!');
        console.log(`🆔 Artikel-ID: ${published.postId}`);
        console.log(`🔗 URL: ${published.postUrl}`);
        console.log(`📊 Status: ${published.status}`);
        
        console.log('\n🎉 Publicering slutförd!');
        console.log('📝 Artikeln är nu tillgänglig som utkast i WordPress-admin.');
        console.log('🔍 Du kan granska och publicera den manuellt när du är redo.');
        
      } else {
        console.log('❌ Publicering misslyckades:', publishResponse.data.message);
      }

    } else {
      console.log('❌ Förhandsvisning misslyckades:', previewResponse.data.message);
    }

  } catch (error) {
    console.error('❌ Fel vid testning:', error.response?.data || error.message);
  }
}

// Test-funktion för att visa befintliga artiklar
async function showExistingArticles() {
  try {
    console.log('📚 Hämtar befintliga artiklar från ConceptSolutions.com...\n');
    
    const response = await axios.get(`${API_BASE_URL}/published/articles`);
    
    if (response.data.success) {
      const articles = response.data.data.articles;
      console.log(`📊 Totalt ${articles.length} publicerade artiklar:\n`);
      
      articles.forEach((article, index) => {
        console.log(`${index + 1}. ${article.title}`);
        console.log(`   🔗 ${article.link}`);
        console.log(`   📅 ${new Date(article.date).toLocaleDateString('sv-SE')}`);
        console.log(`   📝 ${article.excerpt.replace(/<[^>]*>/g, '').substring(0, 100)}...`);
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ Fel vid hämtning av artiklar:', error.response?.data || error.message);
  }
}

// Kör tester
async function runTests() {
  console.log('🧠 ConceptSolutions Intelligent AI - Publiceringstest\n');
  console.log('=' .repeat(60));
  
  await showExistingArticles();
  console.log('=' .repeat(60));
  await testPublishNews();
  
  console.log('\n🎯 Test slutfört!');
}

// Kör om filen körs direkt
if (require.main === module) {
  runTests();
}

module.exports = {
  testPublishNews,
  showExistingArticles
};
