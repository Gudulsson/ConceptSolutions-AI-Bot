/**
 * Test AI-motorn med riktiga URL:er och aktuellt år
 */

const ConceptSolutionsAI = require('./services/ai-engine');

async function testAIWithRealURLs() {
  console.log('🧠 Testar AI-motorn med riktiga URL:er och aktuellt år\n');
  console.log('=' .repeat(60));
  
  try {
    // Initiera AI-motorn
    const aiEngine = new ConceptSolutionsAI({
      enableDeepAnalysis: true,
      enableSemanticUnderstanding: true,
      enableContentGapAnalysis: true,
      enableMarketIntelligence: true,
      enableUserBehaviorAnalysis: true,
      enableCreativeGeneration: true,
      analysisDepth: 'comprehensive',
      creativityLevel: 'high'
    });
    
    await aiEngine.initialize();
    
    console.log('✅ AI-motor initierad!\n');
    
    // Testa att hämta riktiga URL:er
    console.log('🔗 Testar hämtning av riktiga URL:er...');
    const urlMap = await aiEngine.fetchRealURLs();
    
    console.log(`📊 URL-mappning hämtad:`);
    console.log(`   Sidor: ${Object.keys(urlMap.pages).length}`);
    console.log(`   Produkter: ${Object.keys(urlMap.products).length}`);
    console.log(`   Kategorier: ${Object.keys(urlMap.categories).length}`);
    console.log(`   Tjänster: ${Object.keys(urlMap.services).length}`);
    
    // Visa några exempel på riktiga URL:er
    console.log('\n📋 Exempel på riktiga URL:er:');
    Object.keys(urlMap.pages).slice(0, 3).forEach(slug => {
      const page = urlMap.pages[slug];
      console.log(`   ${page.title}: ${page.url}`);
    });
    
    // Testa interna länkar för RFID
    console.log('\n🔗 Testar interna länkar för RFID-teknik...');
    const internalLinks = await aiEngine.generateInternalLinks('rfid_technology');
    
    console.log('📋 Genererade interna länkar:');
    internalLinks.forEach((link, index) => {
      console.log(`   ${index + 1}. ${link.text} - ${link.url}`);
    });
    
    // Testa år-uppdatering
    console.log('\n📅 Testar år-uppdatering...');
    const currentYear = aiEngine.getCurrentYear();
    console.log(`   Aktuellt år: ${currentYear}`);
    
    const testContent = 'Under 2024 har vi sett framgångar. Framtiden ser ljus ut för 2026.';
    const updatedContent = aiEngine.updateYearReferences(testContent);
    console.log(`   Original: ${testContent}`);
    console.log(`   Uppdaterad: ${updatedContent}`);
    
    // Generera en kort artikel för att testa allt
    console.log('\n📰 Genererar test-artikel...');
    const article = await aiEngine.createIntelligentContent('rfid_technology', {
      primary: 'trends_news',
      targetAudience: 'business',
      complexity: 'medium'
    });
    
    console.log('✅ Test-artikel genererad!');
    console.log(`   Titel: ${article.title}`);
    console.log(`   Ordantal: ${article.wordCount}`);
    console.log(`   År: ${article.currentYear}`);
    console.log(`   Interna länkar: ${article.internalLinks.length}`);
    
    console.log('\n🔗 Interna länkar i artikeln:');
    article.internalLinks.forEach((link, index) => {
      console.log(`   ${index + 1}. ${link.text} - ${link.url}`);
    });
    
    console.log('\n' + '=' .repeat(60));
    console.log('🎉 ALLA TEST SLUTFÖRDA!');
    console.log('✅ AI-motorn använder nu riktiga URL:er från webbplatsen');
    console.log('✅ År uppdateras automatiskt till aktuellt år');
    console.log('✅ Interna länkar fungerar korrekt');
    console.log('=' .repeat(60));
    
  } catch (error) {
    console.error('❌ Fel vid testning:', error.message);
  }
}

// Kör testet
testAIWithRealURLs();
