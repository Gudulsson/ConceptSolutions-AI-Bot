/**
 * Debug Script för Intern Länkning
 * Testar AI-motorns förmåga att generera och använda interna länkar
 */

const ConceptSolutionsAI = require('./services/ai-engine');
const axios = require('axios');
const { config } = require('./config/api-keys');

async function debugInternalLinks() {
  console.log('🔍 DEBUG: Testar intern länkning...\n');
  
  try {
    // Initiera AI-motorn
    const aiEngine = new ConceptSolutionsAI({
      enableDeepAnalysis: true,
      enableSemanticUnderstanding: true,
      enableContentGapAnalysis: true,
      enableMarketIntelligence: true,
      enableUserBehaviorAnalysis: true,
      enableCreativeGeneration: true
    });
    
    console.log('📡 Hämtar riktiga URL:er från ConceptSolutions.com...');
    
    // Testa fetchRealURLs direkt
    const urlMap = await aiEngine.fetchRealURLs();
    
    console.log('\n📊 URL-Mappning:');
    console.log(`- Sidor: ${Object.keys(urlMap.pages).length}`);
    console.log(`- Produkter: ${Object.keys(urlMap.products).length}`);
    console.log(`- Kategorier: ${Object.keys(urlMap.categories).length}`);
    console.log(`- Tjänster: ${Object.keys(urlMap.services).length}`);
    
    console.log('\n📄 Exempel på sidor:');
    Object.values(urlMap.pages).slice(0, 5).forEach(page => {
      console.log(`  - ${page.title}: ${page.url}`);
    });
    
    console.log('\n🛍️ Exempel på produkter:');
    Object.values(urlMap.products).slice(0, 5).forEach(product => {
      console.log(`  - ${product.title}: ${product.url}`);
    });
    
    console.log('\n📂 Exempel på kategorier:');
    Object.values(urlMap.categories).slice(0, 5).forEach(category => {
      console.log(`  - ${category.title}: ${category.url}`);
    });
    
    console.log('\n🔧 Exempel på tjänster:');
    Object.values(urlMap.services).slice(0, 5).forEach(service => {
      console.log(`  - ${service.title}: ${service.url}`);
    });
    
    // Testa generateInternalLinks direkt
    console.log('\n🔗 Testar generateInternalLinks för RFID-teknik...');
    const internalLinks = await aiEngine.generateInternalLinks('rfid_technology');
    
    console.log('\n📝 Genererade interna länkar:');
    internalLinks.forEach(link => {
      console.log(`  - ${link.text}: ${link.url}`);
    });
    
    // Testa att generera en komplett artikel med interna länkar
    console.log('\n📰 Genererar testartikel med interna länkar...');
    const userIntent = {
      primary: 'informative',
      secondary: 'educational',
      audience: 'business_owners',
      tone: 'professional',
      perspective: 'expert_insights'
    };
    
    const article = await aiEngine.createIntelligentContent('rfid_technology', userIntent);
    
    console.log('\n📊 Artikel-statistik:');
    console.log(`- Titel: ${article.title}`);
    console.log(`- Ord: ${article.wordCount}`);
    console.log(`- Läsningstid: ${article.estimatedReadingTime} min`);
    
    console.log('\n📝 Artikel-innehåll (första 500 tecken):');
    console.log(article.content.substring(0, 500) + '...');
    
    // Extrahera alla länkar från innehållet (både markdown och HTML)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const htmlLinkRegex = /<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    const foundLinks = [];
    let match;
    
    // Hitta markdown-länkar
    while ((match = markdownLinkRegex.exec(article.content)) !== null) {
      foundLinks.push({
        text: match[1],
        url: match[2],
        type: 'markdown'
      });
    }
    
    // Hitta HTML-länkar
    while ((match = htmlLinkRegex.exec(article.content)) !== null) {
      foundLinks.push({
        text: match[2],
        url: match[1],
        type: 'html'
      });
    }
    
    console.log(`\n🔗 Hittade ${foundLinks.length} länkar i artikeln:`);
    foundLinks.forEach(link => {
      console.log(`  - ${link.text}: ${link.url} (${link.type})`);
    });
    
    // Testa att verifiera att länkarna faktiskt finns i URL-mappningen
    console.log('\n✅ Verifierar att länkarna finns i URL-mappningen:');
    foundLinks.forEach(link => {
      const foundInPages = Object.values(urlMap.pages).find(p => p.url === link.url);
      const foundInProducts = Object.values(urlMap.products).find(p => p.url === link.url);
      const foundInCategories = Object.values(urlMap.categories).find(c => c.url === link.url);
      const foundInServices = Object.values(urlMap.services).find(s => s.url === link.url);
      
      if (foundInPages) {
        console.log(`  ✅ ${link.text}: ${link.url} (Sida)`);
      } else if (foundInProducts) {
        console.log(`  ✅ ${link.text}: ${link.url} (Produkt)`);
      } else if (foundInCategories) {
        console.log(`  ✅ ${link.text}: ${link.url} (Kategori)`);
      } else if (foundInServices) {
        console.log(`  ✅ ${link.text}: ${link.url} (Tjänst)`);
      } else {
        console.log(`  ❌ ${link.text}: ${link.url} (INTE HITTAD)`);
      }
    });
    
  } catch (error) {
    console.error('❌ Fel vid debug:', error.message);
    console.error(error.stack);
  }
}

// Kör debug
debugInternalLinks();
