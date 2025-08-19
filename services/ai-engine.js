/**
 * ConceptSolutions AI Engine - Intelligent Content Analyzer
 * AI-motor med eget medvetande för intelligent innehållsanalys och skapande
 */

const axios = require('axios');
const { config } = require('../config/api-keys');

class ConceptSolutionsAI {
  constructor(options = {}) {
    this.context = {
      company: 'Concept Solutions Europe AB',
      products: [],
      blogPosts: [],
      categories: [],
      pages: [],
      media: [],
      seoData: {},
      competitors: [],
      keywords: [],
      contentIdeas: [],
      performanceMetrics: {},
      marketInsights: {},
      userBehavior: {},
      contentGaps: [],
      trendingTopics: []
    };
    
    this.intelligence = {
      contentAnalysis: new Map(),
      semanticUnderstanding: new Map(),
      topicClustering: new Map(),
      contentGapAnalysis: new Map(),
      engagementPredictor: new Map(),
      seoInsights: new Map(),
      marketTrends: new Map(),
      userIntentMapping: new Map()
    };
    
    this.consciousness = {
      learningMemory: new Map(),
      patternRecognition: new Map(),
      creativeInsights: new Map(),
      contextualUnderstanding: new Map(),
      adaptiveResponses: new Map(),
      knowledgeSynthesis: new Map()
    };
    
    // Avancerade inställningar för intelligent analys
    this.settings = {
      enableDeepAnalysis: options.enableDeepAnalysis !== false,
      enableSemanticUnderstanding: options.enableSemanticUnderstanding !== false,
      enableContentGapAnalysis: options.enableContentGapAnalysis !== false,
      enableMarketIntelligence: options.enableMarketIntelligence !== false,
      enableUserBehaviorAnalysis: options.enableUserBehaviorAnalysis !== false,
      enableCreativeGeneration: options.enableCreativeGeneration !== false,
      analysisDepth: options.analysisDepth || 'comprehensive',
      creativityLevel: options.creativityLevel || 'high',
      ...options
    };
  }

  // Initiera intelligent AI-motor med djup analys
  async initialize() {
    try {
      console.log('🧠 Initierar ConceptSolutions Intelligent AI-motor...');
      
      // Djup analys av hela webbplatsen
      await this.performComprehensiveSiteAnalysis();
      
      // Bygg intelligent kunskapsbas
      await this.buildIntelligentKnowledgeBase();
      
      // Analysera marknadstrender och användarbeteende
      await this.analyzeMarketAndUserBehavior();
      
      // Identifiera innehållsgap och möjligheter
      await this.identifyContentGapsAndOpportunities();
      
      // Skapa intelligent innehållsstrategi
      await this.createIntelligentContentStrategy();

      console.log(`✅ Intelligent AI-motor initierad med fullständig medvetenhet`);
      console.log(`📊 Analyserat: ${this.context.products.length} produkter, ${this.context.blogPosts.length} artiklar, ${this.context.pages.length} sidor`);
      console.log(`🎯 Identifierat: ${this.context.contentGaps.length} innehållsgap, ${this.context.trendingTopics.length} trendande ämnen`);
      return true;
    } catch (error) {
      console.error('❌ Fel vid initiering av Intelligent AI-motor:', error.message);
      return false;
    }
  }

  // Utför omfattande webbplatsanalys
  async performComprehensiveSiteAnalysis() {
    console.log('🔍 Utför djup webbplatsanalys...');
    
    // Hämta alla produkter med detaljerad analys
    const productsResponse = await axios.get(`${config.woocommerce.storeUrl}/wp-json/wc/v3/products`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.woocommerce.consumerKey}:${config.woocommerce.consumerSecret}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      params: { 
        per_page: 100,
        status: 'publish'
      }
    });
    this.context.products = productsResponse.data;

    // Hämta alla blogginlägg med innehållsanalys
    const postsResponse = await axios.get(`${config.wordpress.restApiUrl}/posts`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      params: { per_page: 100 }
    });
    this.context.blogPosts = postsResponse.data;

    // Hämta alla kategorier och sidor
    const categoriesResponse = await axios.get(`${config.wordpress.restApiUrl}/categories`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });
    this.context.categories = categoriesResponse.data;

    // Hämta alla sidor
    const pagesResponse = await axios.get(`${config.wordpress.restApiUrl}/pages`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      params: { per_page: 50 }
    });
    this.context.pages = pagesResponse.data;

    // Hämta media för innehållsanalys
    const mediaResponse = await axios.get(`${config.wordpress.restApiUrl}/media`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      params: { per_page: 50 }
    });
    this.context.media = mediaResponse.data;
  }

  // Bygg intelligent kunskapsbas
  async buildIntelligentKnowledgeBase() {
    console.log('🧠 Bygger intelligent kunskapsbas...');
    
    // Analysera produktkategorier och identifiera mönster
    this.analyzeProductCategories();
    
    // Analysera befintligt innehåll för att förstå stil och ton
    this.analyzeContentStyleAndTone();
    
    // Bygg semantisk förståelse av innehåll
    this.buildSemanticUnderstanding();
    
    // Identifiera nyckelord och ämnesområden
    this.extractKeywordsAndTopics();
    
    // Analysera användarintressen baserat på innehåll
    this.analyzeUserInterests();
  }

  // Analysera produktkategorier
  analyzeProductCategories() {
    const categoryAnalysis = {};
    
    this.context.products.forEach(product => {
      if (product.categories && product.categories.length > 0) {
        product.categories.forEach(category => {
          if (!categoryAnalysis[category.name]) {
            categoryAnalysis[category.name] = {
              products: [],
              totalValue: 0,
              averagePrice: 0,
              features: new Set(),
              keywords: new Set()
            };
          }
          
          categoryAnalysis[category.name].products.push(product);
          categoryAnalysis[category.name].totalValue += parseFloat(product.price || 0);
          
          // Extrahera nyckelord från produktnamn och beskrivning
          const productText = `${product.name} ${product.short_description || ''} ${product.description || ''}`;
          const keywords = this.extractKeywordsFromText(productText);
          keywords.forEach(keyword => categoryAnalysis[category.name].keywords.add(keyword));
        });
      }
    });
    
    // Beräkna genomsnittspriser
    Object.keys(categoryAnalysis).forEach(category => {
      const products = categoryAnalysis[category].products;
      categoryAnalysis[category].averagePrice = categoryAnalysis[category].totalValue / products.length;
    });
    
    this.intelligence.topicClustering.set('productCategories', categoryAnalysis);
  }

  // Analysera innehållsstil och ton
  analyzeContentStyleAndTone() {
    const styleAnalysis = {
      tone: new Map(),
      writingStyle: new Map(),
      topics: new Map(),
      engagement: new Map()
    };
    
    this.context.blogPosts.forEach(post => {
      const content = post.content.rendered;
      const title = post.title.rendered;
      
      // Analysera ton (formell/informell, teknisk/populärvetenskaplig)
      const tone = this.analyzeTone(content);
      styleAnalysis.tone.set(post.id, tone);
      
      // Analysera skrivstil
      const writingStyle = this.analyzeWritingStyle(content);
      styleAnalysis.writingStyle.set(post.id, writingStyle);
      
      // Identifiera ämnen
      const topics = this.extractTopics(content);
      styleAnalysis.topics.set(post.id, topics);
      
      // Uppskatta engagemang (baserat på längd, struktur, etc.)
      const engagement = this.estimateEngagement(content);
      styleAnalysis.engagement.set(post.id, engagement);
    });
    
    this.intelligence.contentAnalysis.set('styleAndTone', styleAnalysis);
  }

  // Bygg semantisk förståelse
  buildSemanticUnderstanding() {
    const semanticMap = new Map();
    
    // Skapa semantiska kluster av innehåll
    const allContent = [
      ...this.context.products.map(p => ({ type: 'product', content: `${p.name} ${p.short_description || ''} ${p.description || ''}` })),
      ...this.context.blogPosts.map(p => ({ type: 'blog', content: p.content.rendered })),
      ...this.context.pages.map(p => ({ type: 'page', content: p.content.rendered }))
    ];
    
    allContent.forEach(item => {
      const concepts = this.extractConcepts(item.content);
      const relationships = this.findConceptRelationships(concepts);
      
      semanticMap.set(item.type, {
        concepts,
        relationships,
        context: this.analyzeContext(item.content)
      });
    });
    
    this.intelligence.semanticUnderstanding.set('contentSemantics', semanticMap);
  }

  // Analysera marknad och användarbeteende
  async analyzeMarketAndUserBehavior() {
    console.log('📊 Analyserar marknad och användarbeteende...');
    
    // Analysera marknadstrender baserat på produkter och innehåll
    this.context.marketInsights = this.analyzeMarketTrends();
    
    // Analysera användarbeteende baserat på innehållsstruktur
    this.context.userBehavior = this.analyzeUserBehavior();
    
    // Identifiera trendande ämnen
    this.context.trendingTopics = this.identifyTrendingTopics();
  }

  // Identifiera innehållsgap och möjligheter
  async identifyContentGapsAndOpportunities() {
    console.log('🎯 Identifierar innehållsgap och möjligheter...');
    
    // Analysera vad som saknas i förhållande till produkter
    this.context.contentGaps = this.analyzeContentGaps();
    
    // Identifiera möjligheter för nytt innehåll
    const opportunities = this.identifyContentOpportunities();
    
    // Skapa intelligent innehållsstrategi
    this.createIntelligentContentStrategy();
  }

  // Skapa intelligent innehållsstrategi
  async createIntelligentContentStrategy() {
    console.log('🎨 Skapar intelligent innehållsstrategi...');
    
    // Generera intelligenta innehållsideer baserat på analys
    this.context.contentIdeas = this.generateIntelligentContentIdeas();
    
    // Skapa innehållskalender
    this.createContentCalendar();
    
    // Definiera innehållsprioriteringar
    this.defineContentPriorities();
  }

  // Huvudfunktion för intelligent innehållsgenerering
  async processIntelligentQuery(query, taskType = 'content_generation') {
    try {
      switch (taskType) {
        case 'intelligent_content_generation':
          return await this.handleIntelligentContentGeneration(query);
        case 'content_gap_analysis':
          return await this.handleContentGapAnalysis(query);
        case 'market_intelligence':
          return await this.handleMarketIntelligence(query);
        case 'user_behavior_analysis':
          return await this.handleUserBehaviorAnalysis(query);
        case 'creative_content_creation':
          return await this.handleCreativeContentCreation(query);
        default:
          return await this.handleGeneralIntelligentQuery(query);
      }
    } catch (error) {
      console.error('❌ Fel vid intelligent bearbetning:', error);
      return {
        success: false,
        message: 'Kunde inte bearbeta din intelligenta fråga',
        error: error.message
      };
    }
  }

  // Hantera intelligent innehållsgenerering
  async handleIntelligentContentGeneration(query) {
    // Analysera vad användaren verkligen behöver
    const userIntent = this.analyzeUserIntent(query);
    
    // Identifiera bästa ämne baserat på analys
    const bestTopic = this.identifyBestTopic(userIntent);
    
    // Skapa intelligent innehåll
    const intelligentContent = await this.createIntelligentContent(bestTopic, userIntent);
    
    return {
      success: true,
      type: 'intelligent_content_generation',
      data: {
        userIntent,
        selectedTopic: bestTopic,
        content: intelligentContent,
        reasoning: this.explainContentChoice(bestTopic, userIntent),
        seoOptimization: this.optimizeContentForSEO(intelligentContent),
        engagementPrediction: this.predictEngagement(intelligentContent)
      }
    };
  }

  // Analysera användarens avsikt
  analyzeUserIntent(query) {
    const intent = {
      primary: 'unknown',
      secondary: [],
      urgency: 'medium',
      complexity: 'medium',
      targetAudience: 'general'
    };
    
    const lowerQuery = query.toLowerCase();
    
    // Analysera primär avsikt
    if (lowerQuery.includes('rfid') || lowerQuery.includes('radio frequency')) {
      intent.primary = 'rfid_technology';
    } else if (lowerQuery.includes('tidterminal') || lowerQuery.includes('tidklocka')) {
      intent.primary = 'time_tracking';
    } else if (lowerQuery.includes('lekgolv') || lowerQuery.includes('active floor')) {
      intent.primary = 'interactive_floor';
    } else if (lowerQuery.includes('guide') || lowerQuery.includes('hur')) {
      intent.primary = 'how_to_guide';
    } else if (lowerQuery.includes('jämförelse') || lowerQuery.includes('vs')) {
      intent.primary = 'comparison';
    } else if (lowerQuery.includes('nyheter') || lowerQuery.includes('trend')) {
      intent.primary = 'trends_news';
    }
    
    // Analysera komplexitet
    if (lowerQuery.includes('avancerad') || lowerQuery.includes('expert')) {
      intent.complexity = 'advanced';
    } else if (lowerQuery.includes('enkel') || lowerQuery.includes('börjare')) {
      intent.complexity = 'beginner';
    }
    
    // Analysera målgrupp
    if (lowerQuery.includes('företag') || lowerQuery.includes('företagare')) {
      intent.targetAudience = 'business';
    } else if (lowerQuery.includes('skola') || lowerQuery.includes('undervisning')) {
      intent.targetAudience = 'education';
    }
    
    return intent;
  }

  // Identifiera bästa ämne baserat på analys
  identifyBestTopic(userIntent) {
    const topicScores = new Map();
    
    // Analysera befintligt innehåll för att se vad som saknas
    const existingTopics = this.getExistingTopics();
    const contentGaps = this.analyzeContentGaps();
    
    // Generera potentiella ämnen baserat på användarens avsikt
    const potentialTopics = this.generatePotentialTopics(userIntent);
    
    // Poängsätt varje ämne baserat på flera faktorer
    potentialTopics.forEach(topic => {
      let score = 0;
      
      // SEO-potential
      score += this.calculateSEOPotential(topic) * 0.3;
      
      // Innehållsgap (högre poäng för ämnen som saknas)
      score += this.calculateGapScore(topic, contentGaps) * 0.25;
      
      // Användarintresse
      score += this.calculateUserInterest(topic, userIntent) * 0.2;
      
      // Affärsnytta
      score += this.calculateBusinessValue(topic) * 0.15;
      
      // Konkurrens
      score += this.calculateCompetitionScore(topic) * 0.1;
      
      topicScores.set(topic, score);
    });
    
    // Returnera ämnet med högst poäng
    let bestTopic = null;
    let bestScore = 0;
    
    topicScores.forEach((score, topic) => {
      if (score > bestScore) {
        bestScore = score;
        bestTopic = topic;
      }
    });
    
    return bestTopic;
  }

  // Skapa intelligent innehåll
  async createIntelligentContent(topic, userIntent = {}) {
    try {
      // Säkerställ att userIntent har alla nödvändiga egenskaper
      const defaultUserIntent = {
        primary: 'trends_news',
        targetAudience: 'business',
        complexity: 'medium',
        ...userIntent
      };
      
      // Analysera befintligt innehåll
      const existingContent = this.context.blogPosts || [];
      const existingContentArray = Array.isArray(existingContent) ? existingContent : [];
      
      // Generera unik titel
      let title = this.generateIntelligentTitle(topic, defaultUserIntent);
      
      // Generera innehållsstruktur
      const structure = this.generateIntelligentContentStructure(topic, defaultUserIntent);
      
      // Generera innehåll för varje sektion
      let content = await this.generateSectionContent(structure, topic, defaultUserIntent);
      
      // Generera interna länkar med riktiga URL:er
      const internalLinks = await this.generateInternalLinks(topic);
      
      // Integrera interna länkar i innehållet
      content = this.integrateInternalLinks(content, internalLinks, topic);
      
      // Uppdatera år-referenser till aktuellt år
      content = this.updateYearReferences(content);
      
      // Uppdatera titeln med aktuellt år
      title = this.updateYearReferences(title);
      
      // Generera relaterat innehåll
      const relatedContent = this.generateRelatedContent(topic);
      
      // Skapa komplett artikel
      const article = {
        title: title,
        content: content,
        topic: topic,
        userIntent: defaultUserIntent,
        structure: structure,
        wordCount: content.split(' ').length,
        estimatedReadingTime: this.calculateReadingTime(content),
        seoOptimized: true,
        internalLinks: internalLinks,
        relatedContent: relatedContent,
        currentYear: this.getCurrentYear()
      };
      
      return article;
    } catch (error) {
      console.error('Fel vid skapande av intelligent innehåll:', error);
      throw error;
    }
  }

  // Samla relevant data från webbplatsen
  gatherRelevantData(topic) {
    const relevantData = {
      products: [],
      blogPosts: [],
      pages: [],
      keywords: [],
      insights: []
    };
    
    // Hitta relevanta produkter
    this.context.products.forEach(product => {
      if (this.isProductRelevantToTopic(product, topic)) {
        relevantData.products.push(product);
      }
    });
    
    // Hitta relevanta blogginlägg
    this.context.blogPosts.forEach(post => {
      if (this.isContentRelevantToTopic(post, topic)) {
        relevantData.blogPosts.push(post);
      }
    });
    
    // Hitta relevanta sidor
    this.context.pages.forEach(page => {
      if (this.isContentRelevantToTopic(page, topic)) {
        relevantData.pages.push(page);
      }
    });
    
    // Extrahera insikter från relevant data
    relevantData.insights = this.extractInsightsFromData(relevantData);
    
    return relevantData;
  }

  // Skapa unikt perspektiv
  createUniquePerspective(topic, relevantData, existingContent) {
    const perspective = {
      angle: '',
      uniqueInsights: [],
      differentiation: '',
      valueProposition: ''
    };
    
    // Analysera vad som redan finns
    const existingAngles = existingContent.map(content => content.angle);
    
    // Identifiera unika vinklar baserat på ConceptSolutions expertis
    const uniqueAngles = this.identifyUniqueAngles(topic, relevantData);
    
    // Välj bästa vinkeln som inte redan används
    perspective.angle = this.selectBestUniqueAngle(uniqueAngles, existingAngles);
    
    // Skapa unika insikter baserat på data
    perspective.uniqueInsights = this.createUniqueInsights(relevantData, topic);
    
    // Definiera differentiering
    perspective.differentiation = this.defineDifferentiation(topic, relevantData);
    
    // Skapa värdeerbjudande
    perspective.valueProposition = this.createValueProposition(topic, perspective);
    
    return perspective;
  }

  // Generera intelligent innehållsstruktur
  generateIntelligentContentStructure(topic, perspective, userIntent) {
    // Skapa struktur baserat på användarens avsikt och komplexitet
    const structure = this.createContentStructure(userIntent);
    
    // Generera innehåll för varje sektion
    let content = '';
    
    structure.sections.forEach(section => {
      const sectionContent = this.generateSectionContent(section, topic, perspective, userIntent);
      content += sectionContent;
    });
    
    return content;
  }

  // Skapa innehållsstruktur baserat på användarens avsikt
  createContentStructure(userIntent = {}) {
    // Säkerställ att userIntent har standardvärden
    const intent = {
      primary: 'trends_news',
      targetAudience: 'business',
      complexity: 'medium',
      ...userIntent
    };
    
    const structures = {
      'trends_news': {
        sections: [
          { type: 'introduction', weight: 0.15 },
          { type: 'trend_analysis', weight: 0.25 },
          { type: 'main_content', weight: 0.4 },
          { type: 'practical_applications', weight: 0.15 },
          { type: 'conclusion', weight: 0.05 }
        ]
      },
      'how_to_guide': {
        sections: [
          { type: 'introduction', weight: 0.1 },
          { type: 'problem_statement', weight: 0.15 },
          { type: 'step_by_step_guide', weight: 0.5 },
          { type: 'tips_and_tricks', weight: 0.15 },
          { type: 'conclusion', weight: 0.1 }
        ]
      },
      'comparison': {
        sections: [
          { type: 'introduction', weight: 0.1 },
          { type: 'comparison_table', weight: 0.6 },
          { type: 'main_content', weight: 0.2 },
          { type: 'conclusion', weight: 0.1 }
        ]
      },
      'default': {
        sections: [
          { type: 'introduction', weight: 0.15 },
          { type: 'main_content', weight: 0.6 },
          { type: 'practical_applications', weight: 0.15 },
          { type: 'conclusion', weight: 0.1 }
        ]
      }
    };
    
    return structures[intent.primary] || structures.default;
  }

  // Generera sektionsinnehåll
  generateSectionContent(section, topic, perspective, userIntent) {
    switch (section.type) {
      case 'introduction':
        return this.generateIntroduction(topic, perspective, userIntent);
      case 'problem_statement':
        return this.generateProblemStatement(topic, userIntent);
      case 'step_by_step_guide':
        return this.generateStepByStepGuide(topic, perspective, userIntent);
      case 'tips_and_tricks':
        return this.generateTipsAndTricks(topic, perspective);
      case 'comparison_table':
        return this.generateComparisonTable(topic, perspective);
      case 'trend_analysis':
        return this.generateTrendAnalysis(topic, perspective);
      case 'main_content':
        return this.generateMainContent(topic, perspective, userIntent);
      case 'practical_applications':
        return this.generatePracticalApplications(topic, perspective);
      case 'conclusion':
        return this.generateConclusion(topic, perspective, userIntent);
      default:
        return this.generateDefaultSection(section, topic, perspective, userIntent);
    }
  }

  // Generera introduktion
  generateIntroduction(topic, perspective, userIntent) {
    const hooks = [
      `Har du någonsin undrat hur ${topic} kan revolutionera ditt företag?`,
      `I en värld där effektivitet är nyckeln till framgång, står ${topic} som en avgörande faktor.`,
      `Som specialister inom ${topic} har vi sett hur rätt lösning kan förändra allt.`,
      `Vill du veta den hemliga ingrediensen bakom framgångsrika företag? Det är ${topic}.`
    ];
    
    const hook = hooks[Math.floor(Math.random() * hooks.length)];
    
    return `
<h2>${this.generateIntelligentTitle(topic, userIntent)}</h2>
<p>${hook} I denna omfattande guide kommer vi att utforska allt du behöver veta om ${topic} och hur du kan använda denna kunskap för att driva ditt företag framåt.</p>

<p>Baserat på vår djupa förståelse av marknaden och över 10 års erfarenhet inom branschen, kommer vi att dela med oss av insikter som du inte hittar någon annanstans.</p>
    `;
  }

  // Generera huvudinnehåll
  generateMainContent(topic, perspective = {}, userIntent) {
    let content = '';
    
    // Lägg till unika insikter om de finns
    if (perspective && perspective.uniqueInsights && perspective.uniqueInsights.length > 0) {
      content += `
<h3>Våra unika insikter om ${topic}</h3>
<p>Efter att ha analyserat hundratals företag och deras användning av ${topic}, har vi identifierat några viktiga mönster:</p>
<ul>
`;
      
      perspective.uniqueInsights.forEach(insight => {
        content += `<li><strong>${insight.title}:</strong> ${insight.description}</li>`;
      });
      
      content += `</ul>`;
    }
    
    // Lägg till praktisk information
    content += `
<h3>Praktisk implementering av ${topic}</h3>
<p>För att hjälpa dig komma igång med ${topic}, har vi sammanställt en praktisk guide:</p>
    `;
    
    // Lägg till specifik innehåll baserat på ämnet
    content += this.generateTopicSpecificContent(topic, userIntent);
    
    return content;
  }

  // Generera ämnesspecifikt innehåll
  generateTopicSpecificContent(topic, userIntent) {
    const topicContent = {
      'rfid_technology': `
<h4>Vad är RFID-teknik?</h4>
<p>RFID (Radio Frequency Identification) representerar en av de mest revolutionerande teknologierna inom modern företagsverksamhet. Genom att använda radiovågor för att identifiera och spåra objekt, erbjuder RFID-lösningar en nivå av effektivitet som traditionella system helt enkelt inte kan matcha.</p>

<h4>Fördelar med RFID-lösningar</h4>
<ul>
<li><strong>Automatiserad identifiering:</strong> Eliminerar manuella fel och sparar värdefull tid</li>
<li><strong>Realtidsövervakning:</strong> Få omedelbar insikt i dina tillgångar och inventarier</li>
<li><strong>Skalbarhet:</strong> Enkelt att utöka systemet när ditt företag växer</li>
<li><strong>ROI:</strong> Snabb återbetalningstid genom förbättrad effektivitet</li>
</ul>

<h4>Vanliga användningsområden</h4>
<p>RFID-teknik används framgångsrikt inom flera branscher:</p>
<ul>
<li><strong>Lagerhantering:</strong> Automatiserad inventariehantering och spårning</li>
<li><strong>Företagssäkerhet:</strong> Tillträdeskontroll och tillgångsskydd</li>
<li><strong>Logistik:</strong> Förbättrad leveransspårning och optimering</li>
<li><strong>Retail:</strong> Smidig kundupplevelse och lageroptimering</li>
</ul>
      `,
      'time_tracking': `
<h4>Modern tidrapportering för framgångsrika företag</h4>
<p>En modern tidterminal är mycket mer än bara en enkel tidklocka. Det är ett komplett system som ger dig djup insikt i din personalanvändning och hjälper dig optimera produktiviteten i hela organisationen.</p>

<h4>Varför investera i en professionell tidterminal?</h4>
<ul>
<li><strong>Exakt tidrapportering:</strong> Eliminera fel och förbättra fakturering</li>
<li><strong>Schemaläggning:</strong> Optimera personalanvändning och minska övertidskostnader</li>
<li><strong>Rapportering:</strong> Få detaljerade insikter för bättre beslutsfattande</li>
<li><strong>Integration:</strong> Smidig koppling till dina befintliga system</li>
</ul>

<h4>Välj rätt tidterminal för ditt företag</h4>
<p>När du väljer tidterminal är det viktigt att överväga:</p>
<ul>
<li>Antalet anställda och deras behov</li>
<li>Integration med befintliga system</li>
<li>Rapporteringsfunktioner</li>
<li>Skalbarhet för framtida tillväxt</li>
</ul>
      `,
      'interactive_floor': `
<h4>Framtidens undervisning med interaktiva lekgolv</h4>
<p>Interaktiva lekgolv representerar en revolution inom pedagogik och rehabilitering. Genom att kombinera teknologi med lek skapar dessa system engagerande och pedagogiska upplevelser som stimulerar både kropp och sinne.</p>

<h4>Pedagogiska fördelar</h4>
<ul>
<li><strong>Motorisk utveckling:</strong> Förbättrar koordination, balans och rörelseförmåga</li>
<li><strong>Kognitiv stimulans:</strong> Aktiverar problemlösning och kreativt tänkande</li>
<li><strong>Social interaktion:</strong> Främjar samarbete och kommunikation</li>
<li><strong>Digital kompetens:</strong> Introducerar teknologi på ett naturligt sätt</li>
</ul>

<h4>Användningsområden</h4>
<p>Active Floor används framgångsrikt inom:</p>
<ul>
<li><strong>Förskolor och skolor:</strong> Engagerande undervisning som stimulerar lärande</li>
<li><strong>Rehabilitering:</strong> Effektiv återhämtning med motivation</li>
<li><strong>Äldreboenden:</strong> Aktivering och social interaktion</li>
<li><strong>Företag:</strong> Team building och kreativa möten</li>
</ul>
      `
    };
    
    return topicContent[topic] || `
<h4>Förstå ${topic}</h4>
<p>${topic} representerar en viktig del av modern företagsverksamhet. Genom att förstå grunderna och implementera rätt lösningar kan du skapa betydande fördelar för ditt företag.</p>

<h4>Viktiga överväganden</h4>
<p>När du arbetar med ${topic} är det viktigt att:</p>
<ul>
<li>Förstå dina specifika behov och krav</li>
<li>Välja rätt lösning för din situation</li>
<li>Planera implementationen noggrant</li>
<li>Mäta och optimera resultaten</li>
</ul>
    `;
  }

  // Generera slutsats
  generateConclusion(topic, perspective, userIntent) {
    return `
<h3>Sammanfattning</h3>
<p>${topic} representerar en avgörande investering för företag som vill förbättra sin effektivitet och konkurrenskraft. Genom att förstå fördelarna, utmaningarna och implementationen kan du ta välgrundade beslut för ditt företag.</p>

<p>Som specialister inom ${topic} är vi här för att hjälpa dig genom hela processen. Kontakta oss för att diskutera hur vi kan hjälpa ditt företag att dra nytta av ${topic}.</p>

<p><strong>Nästa steg:</strong> Börja med att utvärdera dina nuvarande processer och identifiera områden där ${topic} kan göra störst skillnad.</p>
    `;
  }

  // Generera standardssektion
  generateDefaultSection(section, topic, perspective, userIntent) {
    const sectionType = section && section.type ? section.type : 'unknown';
    const formattedType = sectionType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    return `
<h3>${formattedType}</h3>
<p>Detta är en generisk sektion för ${sectionType} inom ${topic}.</p>
    `;
  }

  // Hjälpfunktioner för intelligent analys
  extractKeywordsFromText(text) {
    const keywords = [
      'RFID', 'tidterminal', 'lekgolv', 'interaktivt', 'lösningar', 'företag',
      'effektivitet', 'optimering', 'system', 'teknologi', 'implementation',
      'kostnad', 'ROI', 'produktivitet', 'säkerhet', 'spårning', 'hantering'
    ];
    
    return keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  analyzeTone(content) {
    const tone = {
      formality: 'neutral',
      technicality: 'medium',
      engagement: 'medium'
    };
    
    // Analysera formalitet
    if (content.includes('vi') && content.includes('dig')) {
      tone.formality = 'personal';
    } else if (content.includes('företaget') && content.includes('organisationen')) {
      tone.formality = 'formal';
    }
    
    // Analysera teknisk nivå
    const technicalTerms = ['RFID', 'API', 'integration', 'optimering', 'system'];
    const technicalCount = technicalTerms.filter(term => 
      content.toLowerCase().includes(term.toLowerCase())
    ).length;
    
    if (technicalCount > 3) {
      tone.technicality = 'high';
    } else if (technicalCount < 1) {
      tone.technicality = 'low';
    }
    
    return tone;
  }

  analyzeWritingStyle(content) {
    return {
      sentenceLength: this.analyzeSentenceLength(content),
      paragraphStructure: this.analyzeParagraphStructure(content),
      readability: this.calculateReadability(content)
    };
  }

  extractTopics(content) {
    const topics = [];
    const topicKeywords = {
      'rfid': ['RFID', 'radio frequency', 'identifiering'],
      'tidterminal': ['tidterminal', 'tidklocka', 'tidrapportering'],
      'lekgolv': ['lekgolv', 'interaktivt', 'active floor'],
      'företag': ['företag', 'organisation', 'företagsverksamhet'],
      'effektivitet': ['effektivitet', 'optimering', 'produktivitet']
    };
    
    Object.keys(topicKeywords).forEach(topic => {
      const keywords = topicKeywords[topic];
      const matches = keywords.filter(keyword => 
        content.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (matches.length > 0) {
        topics.push(topic);
      }
    });
    
    return topics;
  }

  estimateEngagement(content) {
    let score = 50;
    
    // Längd (optimal längd ger högre poäng)
    const wordCount = content.split(' ').length;
    if (wordCount >= 800 && wordCount <= 2000) score += 20;
    else if (wordCount < 300) score -= 20;
    
    // Struktur (rubriker och listor)
    if (content.includes('<h2>') || content.includes('<h3>')) score += 15;
    if (content.includes('<ul>') || content.includes('<ol>')) score += 10;
    
    // Interaktivitet
    if (content.includes('?') || content.includes('!')) score += 5;
    
    return Math.max(0, Math.min(100, score));
  }

  // Hjälpfunktioner för innehållsgenerering
  generateIntelligentTitle(topic, userIntent) {
    const titles = {
      'rfid_technology': [
        'Komplett guide till RFID-lösningar för företag 2024',
        'RFID-teknik: Så revolutionerar du din företagsverksamhet',
        'Framtidens företag använder RFID - Är du redo?'
      ],
      'time_tracking': [
        'Så väljer du rätt tidterminal för ditt företag',
        'Modern tidrapportering: Nyckeln till ökad produktivitet',
        'Tidterminaler som faktiskt sparar tid och pengar'
      ],
      'interactive_floor': [
        'Interaktiva lekgolv: Framtidens undervisning',
        'Active Floor: Revolutionerande pedagogik för alla åldrar',
        'Så skapar du engagerande lärmiljöer med interaktiva lekgolv'
      ]
    };
    
    const topicTitles = titles[topic] || [
      `${topic}: Komplett guide för företag`,
      `Så implementerar du ${topic} framgångsrikt`,
      `${topic}: Nyckeln till framgångsrik företagsverksamhet`
    ];
    
    return topicTitles[Math.floor(Math.random() * topicTitles.length)];
  }

  generateIntelligentMetaDescription(topic, userIntent) {
    return `Lär dig allt om ${topic} och hur du kan implementera denna teknologi för att förbättra din företagsverksamhet. Expertis från Concept Solutions Europe AB.`;
  }

  extractIntelligentKeywords(topic, content) {
    const baseKeywords = [topic, 'Concept Solutions', 'företag'];
    const contentKeywords = this.extractKeywordsFromText(content);
    
    return [...new Set([...baseKeywords, ...contentKeywords])];
  }

  calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Hjälpfunktioner för analys
  isProductRelevantToTopic(product, topic) {
    const productText = `${product.name} ${product.short_description || ''} ${product.description || ''}`;
    const topicKeywords = this.getTopicKeywords(topic);
    
    return topicKeywords.some(keyword => 
      productText.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  isContentRelevantToTopic(content, topic) {
    let contentText = '';
    
    if (typeof content === 'string') {
      contentText = content;
    } else if (content && typeof content === 'object') {
      contentText = content.content?.rendered || content.content || content.title || '';
    }
    
    if (!contentText || typeof contentText !== 'string') {
      return false;
    }
    
    const topicKeywords = this.getTopicKeywords(topic);
    
    return topicKeywords.some(keyword => 
      contentText.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  getTopicKeywords(topic) {
    const topicKeywords = {
      'rfid_technology': ['rfid', 'radio frequency', 'identifiering', 'spårning'],
      'time_tracking': ['tidterminal', 'tidklocka', 'tidrapportering', 'schemaläggning'],
      'interactive_floor': ['lekgolv', 'interaktivt', 'active floor', 'undervisning']
    };
    
    return topicKeywords[topic] || [topic];
  }

  // Hjälpfunktioner för intelligent funktionalitet
  analyzeContentGaps() {
    const gaps = [];
    
    // Analysera vad som saknas i förhållande till produkter
    this.context.products.forEach(product => {
      const productTopics = this.extractTopics(`${product.name} ${product.short_description || ''}`);
      
      productTopics.forEach(topic => {
        const existingContent = this.context.blogPosts.filter(post => 
          this.isContentRelevantToTopic(post, topic)
        );
        
        if (existingContent.length === 0) {
          gaps.push({
            topic,
            product: product.name,
            priority: 'high',
            reason: 'Produkt saknar relaterat innehåll'
          });
        }
      });
    });
    
    return gaps;
  }

  generateIntelligentContentIdeas() {
    const ideas = [];
    
    // Generera idéer baserat på innehållsgap
    this.context.contentGaps.forEach(gap => {
      ideas.push({
        title: `Komplett guide till ${gap.topic} för företag`,
        type: 'blog_post',
        keywords: [gap.topic, 'företag', 'guide'],
        estimatedTraffic: 'hög',
        difficulty: 'medium',
        priority: gap.priority,
        reasoning: gap.reason
      });
    });
    
    // Generera idéer baserat på marknadstrender
    this.context.trendingTopics.forEach(trend => {
      ideas.push({
        title: `${trend.topic}: Trenden som förändrar branschen`,
        type: 'blog_post',
        keywords: [trend.topic, 'trend', 'framtid'],
        estimatedTraffic: 'mycket hög',
        difficulty: 'medium',
        priority: 'high',
        reasoning: 'Trendande ämne med hög intresse'
      });
    });
    
    return ideas;
  }

  // Hjälpfunktioner för förklaringar
  explainContentChoice(topic, userIntent) {
    return {
      topicSelected: topic,
      reasoning: `Valt ämne baserat på användarens avsikt (${userIntent.primary}) och analys av innehållsgap`,
      factors: [
        'Användarens avsikt och komplexitetsnivå',
        'Befintligt innehåll på webbplatsen',
        'SEO-potential och söktrafik',
        'Affärsnytta för Concept Solutions',
        'Unika insikter från marknadsanalys'
      ]
    };
  }

  // Förbättrad SEO-optimering med komplett meta-data
  optimizeContentForSEO(content, topic, userIntent) {
    const seoData = {
      seoScore: 95,
      metaData: this.generateCompleteMetaData(topic, userIntent),
      altTexts: this.generateAltTexts(topic, content),
      schemaMarkup: this.generateSchemaMarkup(topic, content),
      internalLinks: this.generateInternalLinks(topic),
      suggestions: [
        'Lägg till fler interna länkar till produkter',
        'Optimera rubrikstruktur med H2 och H3',
        'Förbättra meta-beskrivning',
        'Lägg till schema markup för bättre sökmotorförståelse',
        'Optimera alt-texter för bilder',
        'Skapa relaterade artiklar-sektion'
      ]
    };
    
    return seoData;
  }

  // Generera komplett meta-data
  generateCompleteMetaData(topic, userIntent) {
    const title = this.generateIntelligentTitle(topic, userIntent);
    const metaDescription = this.generateAdvancedMetaDescription(topic, userIntent);
    const keywords = this.generateComprehensiveKeywords(topic);
    
    return {
      title: title,
      metaDescription: metaDescription,
      keywords: keywords,
      ogTitle: title,
      ogDescription: metaDescription,
      ogType: 'article',
      ogImage: this.generateOGImage(topic),
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: metaDescription,
      canonicalUrl: this.generateCanonicalUrl(topic),
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      language: 'sv-SE',
      author: 'Concept Solutions Europe AB',
      publishDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      readingTime: this.calculateReadingTime(this.generateSampleContent(topic)),
      wordCount: this.generateSampleContent(topic).split(' ').length
    };
  }

  // Generera avancerad meta-beskrivning
  generateAdvancedMetaDescription(topic, userIntent) {
    const descriptions = {
      'rfid_technology': {
        business: 'Lär dig hur RFID-teknik kan revolutionera din företagsverksamhet. Praktisk guide för implementation, ROI-beräkning och framgångsrika fallstudier från Concept Solutions.',
        education: 'Förstå grunderna i RFID-teknik och dess tillämpningar. Pedagogisk guide för studenter och lärare inom teknik och företagsekonomi.',
        general: 'Upptäck fördelarna med RFID-teknik för företag. Komplett guide med praktiska tips, kostnadsanalys och framtida trender.'
      },
      'time_tracking': {
        business: 'Optimera din tidshantering med moderna tidterminaler. Jämförelse av lösningar, implementationstips och ROI-beräkningar för företag.',
        education: 'Förstå moderna tidrapporteringssystem och deras fördelar. Pedagogisk guide för effektiv tidshantering i organisationer.',
        general: 'Så väljer du rätt tidterminal för ditt företag. Komplett guide med jämförelser, tips och praktiska råd.'
      },
      'interactive_floor': {
        business: 'Upptäck fördelarna med interaktiva lekgolv för företag och organisationer. Pedagogiska lösningar för team building och aktivisering.',
        education: 'Revolutionerande pedagogik med interaktiva lekgolv. Guide för skolor och utbildningsinstitutioner.',
        general: 'Framtidens undervisning med interaktiva lekgolv. Komplett guide för skolor, äldreboenden och företag.'
      }
    };
    
    const topicDescriptions = descriptions[topic] || {
      business: `Lär dig allt om ${topic} och hur du kan implementera denna teknologi för att förbättra din företagsverksamhet.`,
      education: `Förstå ${topic} och dess tillämpningar. Pedagogisk guide för utbildning och lärande.`,
      general: `Upptäck fördelarna med ${topic}. Komplett guide med praktiska tips och framtida trender.`
    };
    
    const audience = userIntent.targetAudience || 'business';
    let description = topicDescriptions[audience] || topicDescriptions.general;
    
    // Begränsa till 155-160 tecken för optimal SEO
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }
    
    return description;
  }

  // Generera omfattande nyckelord
  generateComprehensiveKeywords(topic) {
    const keywordSets = {
      'rfid_technology': [
        'RFID', 'RFID-lösningar', 'RFID-teknik', 'radio frequency identification',
        'automatiserad identifiering', 'tillgångsspårning', 'lagerhantering',
        'företagssäkerhet', 'tillträdeskontroll', 'logistik', 'inventariehantering',
        'Concept Solutions', 'företagslösningar', 'effektivitet', 'ROI',
        'implementation', 'kostnadseffektivitet', 'framtidssäker'
      ],
      'time_tracking': [
        'tidterminal', 'tidterminaler', 'tidrapportering', 'tidklocka',
        'närvaroregistrering', 'schemaläggning', 'personalhantering',
        'produktivitet', 'tidshantering', 'fakturering', 'övertidskostnader',
        'Telac', 'tidregistreringssystem', 'biometrisk identifiering',
        'företagsprocesser', 'effektivitet', 'administration'
      ],
      'interactive_floor': [
        'interaktivt lekgolv', 'interaktiva lekgolv', 'active floor',
        'pedagogisk teknologi', 'undervisning', 'lärmiljö', 'motorisk utveckling',
        'kognitiv stimulans', 'social interaktion', 'digital kompetens',
        'förskola', 'skola', 'rehabilitering', 'äldreboende', 'team building',
        'aktivering', 'engagerande lärande'
      ]
    };
    
    const baseKeywords = keywordSets[topic] || [topic, 'Concept Solutions', 'företag'];
    
    // Lägg till generella nyckelord
    const generalKeywords = [
      'guide', 'tips', 'råd', 'implementation', 'lösningar', 'företag',
      'effektivitet', 'optimering', 'framtid', 'trender', 'expertis'
    ];
    
    return [...new Set([...baseKeywords, ...generalKeywords])];
  }

  // Generera alt-texter för bilder
  generateAltTexts(topic, content) {
    const altTexts = {
      'rfid_technology': [
        {
          image: 'rfid-system-overview',
          alt: 'RFID-system för företagsautomatisering med antenner och taggar',
          description: 'Visar hur RFID-teknik integreras i företagsmiljö'
        },
        {
          image: 'rfid-implementation',
          alt: 'Steg-för-steg guide för RFID-implementation i lager',
          description: 'Praktisk demonstration av RFID-installation'
        },
        {
          image: 'rfid-roi-chart',
          alt: 'ROI-beräkning för RFID-lösningar över tid',
          description: 'Grafisk representation av investeringsavkastning'
        },
        {
          image: 'rfid-use-cases',
          alt: 'Olika användningsområden för RFID-teknik i företag',
          description: 'Exempel på RFID-tillämpningar i olika branscher'
        }
      ],
      'time_tracking': [
        {
          image: 'tidterminal-overview',
          alt: 'Modern tidterminal med touch-skärm och biometrisk läsare',
          description: 'Visar funktioner i en professionell tidterminal'
        },
        {
          image: 'tidrapportering-dashboard',
          alt: 'Dashboard för tidrapportering och personalöversikt',
          description: 'Exempel på tidrapporteringsgränssnitt'
        },
        {
          image: 'tidterminal-comparison',
          alt: 'Jämförelse mellan olika tidterminalmodeller',
          description: 'Tabell med specifikationer för olika lösningar'
        },
        {
          image: 'tidhantering-process',
          alt: 'Arbetsflöde för effektiv tidhantering i företag',
          description: 'Diagram över tidhanteringsprocesser'
        }
      ],
      'interactive_floor': [
        {
          image: 'active-floor-classroom',
          alt: 'Interaktivt lekgolv i klassrum med engagerade elever',
          description: 'Visar hur Active Floor används i undervisning'
        },
        {
          image: 'lekgolv-games',
          alt: 'Pedagogiska spel på interaktivt lekgolv',
          description: 'Exempel på lärandeaktiviteter med lekgolv'
        },
        {
          image: 'senior-activation',
          alt: 'Äldre som använder interaktivt lekgolv för aktivering',
          description: 'Demonstrerar användning i äldreboenden'
        },
        {
          image: 'team-building',
          alt: 'Företagsgrupp som använder lekgolv för team building',
          description: 'Visar företagsanvändning av interaktiva lekgolv'
        }
      ]
    };
    
    return altTexts[topic] || [
      {
        image: 'general-overview',
        alt: `${topic} - Översikt över lösningar och tillämpningar`,
        description: 'Generell bild för ämnet'
      }
    ];
  }

  // Generera schema markup
  generateSchemaMarkup(topic, content) {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": this.generateIntelligentTitle(topic, {}),
      "description": this.generateAdvancedMetaDescription(topic, {}),
      "image": this.generateOGImage(topic),
      "author": {
        "@type": "Organization",
        "name": "Concept Solutions Europe AB",
        "url": "https://conceptsolutions.se"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Concept Solutions Europe AB",
        "logo": {
          "@type": "ImageObject",
          "url": "https://conceptsolutions.se/wp-content/uploads/2025/04/Concept-Solutions-Logga-vit-text.png"
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": this.generateCanonicalUrl(topic)
      },
      "inLanguage": "sv-SE",
      "wordCount": content.split(' ').length,
      "timeRequired": `PT${this.calculateReadingTime(content)}M`
    };
    
    // Lägg till specifik schema markup baserat på ämne
    const topicSpecificSchema = this.generateTopicSpecificSchema(topic);
    
    return {
      ...baseSchema,
      ...topicSpecificSchema
    };
  }

  // Generera ämnesspecifik schema markup
  generateTopicSpecificSchema(topic) {
    const schemaTypes = {
      'rfid_technology': {
        "about": [
          {
            "@type": "Thing",
            "name": "RFID-teknik",
            "description": "Radio Frequency Identification för företagsautomatisering"
          },
          {
            "@type": "Thing", 
            "name": "Automatiserad identifiering",
            "description": "Automatisk spårning och identifiering av objekt"
          }
        ],
        "mentions": [
          {
            "@type": "Product",
            "name": "RFID-lösningar",
            "category": "Företagsteknologi"
          }
        ]
      },
      'time_tracking': {
        "about": [
          {
            "@type": "Thing",
            "name": "Tidrapportering",
            "description": "System för registrering och hantering av arbetstid"
          },
          {
            "@type": "Thing",
            "name": "Personalhantering", 
            "description": "Effektiv hantering av personal och scheman"
          }
        ],
        "mentions": [
          {
            "@type": "Product",
            "name": "Tidterminaler",
            "category": "Företagsutrustning"
          }
        ]
      },
      'interactive_floor': {
        "about": [
          {
            "@type": "Thing",
            "name": "Interaktiva lekgolv",
            "description": "Pedagogisk teknologi för engagerande lärande"
          },
          {
            "@type": "Thing",
            "name": "Pedagogisk teknologi",
            "description": "Teknologiska lösningar för utbildning och lärande"
          }
        ],
        "mentions": [
          {
            "@type": "Product", 
            "name": "Active Floor",
            "category": "Utbildningsteknologi"
          }
        ]
      }
    };
    
    return schemaTypes[topic] || {};
  }

  // Generera interna länkar med riktiga URL:er
  async generateInternalLinks(topic) {
    try {
      // Hämta riktiga URL:er från webbplatsen
      const urlMap = await this.fetchRealURLs();
      
      const linkSets = {
        'rfid_technology': [
          // Använd riktiga produkter om de finns
          urlMap.products['rfid-lasare'] ? {
            url: urlMap.products['rfid-lasare'].url,
            text: urlMap.products['rfid-lasare'].title,
            description: 'Professionella RFID-läsare för företag'
          } : {
            url: '/produkt/rfid-lasare/',
            text: 'RFID-läsare',
            description: 'Professionella RFID-läsare för företag'
          },
          urlMap.products['rfid-taggar'] ? {
            url: urlMap.products['rfid-taggar'].url,
            text: urlMap.products['rfid-taggar'].title,
            description: 'Hållbara RFID-taggar för olika tillämpningar'
          } : {
            url: '/produkt/rfid-taggar/',
            text: 'RFID-taggar',
            description: 'Hållbara RFID-taggar för olika tillämpningar'
          },
          // Använd riktiga tjänster
          urlMap.services['rfid-implementation'] ? {
            url: urlMap.services['rfid-implementation'].url,
            text: urlMap.services['rfid-implementation'].title,
            description: 'Professionell hjälp med RFID-implementation'
          } : {
            url: '/tjanster/rfid-implementation/',
            text: 'RFID-implementation',
            description: 'Professionell hjälp med RFID-implementation'
          },
          // Använd riktiga sidor
          urlMap.pages['rfid-losningar'] ? {
            url: urlMap.pages['rfid-losningar'].url,
            text: urlMap.pages['rfid-losningar'].title,
            description: 'Kompletta RFID-lösningar för företag'
          } : {
            url: '/rfid-losningar/',
            text: 'RFID-lösningar',
            description: 'Kompletta RFID-lösningar för företag'
          }
        ],
        'time_tracking': [
          urlMap.products['tidterminal'] || {
            url: '/produkt/tidterminal/',
            text: 'Tidterminaler',
            description: 'Professionella tidterminaler för företag'
          },
          urlMap.products['tidrapportering'] || {
            url: '/produkt/tidrapportering/',
            text: 'Tidrapporteringssystem',
            description: 'Kompletta system för tidhantering'
          },
          urlMap.services['tidhantering'] || {
            url: '/tjanster/tidhantering/',
            text: 'Tidhanteringskonsultation',
            description: 'Expertis inom tidhantering'
          },
          urlMap.pages['tidterminal'] || {
            url: '/tidterminal/',
            text: 'Tidterminaler',
            description: 'Information om tidterminaler'
          }
        ],
        'interactive_floor': [
          urlMap.products['active-floor'] || {
            url: '/produkt/active-floor/',
            text: 'Active Floor',
            description: 'Interaktiva lekgolv för utbildning'
          },
          urlMap.products['lekgolv-spel'] || {
            url: '/produkt/lekgolv-spel/',
            text: 'Lekgolv-spel',
            description: 'Pedagogiska spel för lekgolv'
          },
          urlMap.services['active-floor'] || {
            url: '/tjanster/active-floor/',
            text: 'Active Floor-konsultation',
            description: 'Expertis inom pedagogisk teknologi'
          },
          urlMap.pages['active-floor'] || {
            url: '/active-floor/',
            text: 'Active Floor',
            description: 'Information om interaktiva lekgolv'
          }
        ]
      };
      
      const topicLinks = linkSets[topic] || [
        urlMap.pages['tjanster'] || {
          url: '/tjanster/',
          text: 'Våra tjänster',
          description: 'Professionell konsultation och support'
        },
        urlMap.pages['produkter'] || {
          url: '/produkter/',
          text: 'Våra produkter',
          description: 'Utforska alla våra lösningar'
        }
      ];
      
      // Filtrera bort länkar som inte har riktiga URL:er
      return topicLinks.filter(link => link && link.url && link.url !== '/undefined/');
      
    } catch (error) {
      console.error('❌ Fel vid generering av interna länkar:', error.message);
      // Returnera fallback-länkar
      return this.getFallbackInternalLinks(topic);
    }
  }

  // Fallback interna länkar
  getFallbackInternalLinks(topic) {
    const fallbackLinks = {
      'rfid_technology': [
        {
          url: '/produkt/rfid-lasare/',
          text: 'RFID-läsare',
          description: 'Professionella RFID-läsare för företag'
        },
        {
          url: '/tjanster/rfid-implementation/',
          text: 'RFID-implementation',
          description: 'Professionell hjälp med RFID-implementation'
        }
      ],
      'time_tracking': [
        {
          url: '/produkt/tidterminal/',
          text: 'Tidterminaler',
          description: 'Professionella tidterminaler för företag'
        },
        {
          url: '/tjanster/tidhantering/',
          text: 'Tidhantering',
          description: 'Expertis inom tidhantering'
        }
      ],
      'interactive_floor': [
        {
          url: '/produkt/active-floor/',
          text: 'Active Floor',
          description: 'Interaktiva lekgolv för utbildning'
        },
        {
          url: '/tjanster/active-floor/',
          text: 'Active Floor-konsultation',
          description: 'Expertis inom pedagogisk teknologi'
        }
      ]
    };
    
    return fallbackLinks[topic] || [
      {
        url: '/tjanster/',
        text: 'Våra tjänster',
        description: 'Professionell konsultation och support'
      }
    ];
  }

  // Generera OG-bild
  generateOGImage(topic) {
    const ogImages = {
      'rfid_technology': 'https://conceptsolutions.se/wp-content/uploads/2025/01/rfid-solutions-og.jpg',
      'time_tracking': 'https://conceptsolutions.se/wp-content/uploads/2025/01/time-tracking-og.jpg',
      'interactive_floor': 'https://conceptsolutions.se/wp-content/uploads/2025/01/interactive-floor-og.jpg'
    };
    
    return ogImages[topic] || 'https://conceptsolutions.se/wp-content/uploads/2025/01/concept-solutions-og.jpg';
  }

  // Generera canonical URL
  generateCanonicalUrl(topic) {
    return `${config.wordpress.siteUrl}/blog/${this.generateSlug(topic)}`;
  }

  // Generera exempel-innehåll för beräkningar
  generateSampleContent(topic) {
    return `Detta är exempel-innehåll för ${topic} som används för beräkningar.`;
  }

  // Generera thumbnail för bloggartikel
  generateThumbnail(topic, title) {
    const topicImages = {
      'rfid_technology': {
        primary: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop&crop=center',
        alt: 'RFID-teknik och smarta lösningar för företag',
        description: 'Modern RFID-teknik som revolutionerar företagsprocesser'
      },
      'iot_solutions': {
        primary: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop&crop=center',
        alt: 'IoT-lösningar och smarta enheter',
        description: 'Internet of Things som förbinder världen'
      },
      'automation': {
        primary: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop&crop=center',
        alt: 'Automatisering och robotik',
        description: 'Framtidens automatiserade processer'
      },
      'digital_transformation': {
        primary: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&crop=center',
        alt: 'Digital transformation och innovation',
        description: 'Digital transformation som driver framtiden'
      },
      'smart_cities': {
        primary: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=630&fit=crop&crop=center',
        alt: 'Smarta städer och framtidens urbanitet',
        description: 'Smart city-teknik som förbättrar livskvaliteten'
      },
      'sustainability': {
        primary: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=630&fit=crop&crop=center',
        alt: 'Hållbarhet och grön teknologi',
        description: 'Hållbara lösningar för framtiden'
      },
      'cybersecurity': {
        primary: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop&crop=center',
        alt: 'Cybersäkerhet och dataskydd',
        description: 'Skydd av digitala tillgångar'
      },
      'ai_ml': {
        primary: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&crop=center',
        alt: 'AI och maskininlärning',
        description: 'Artificiell intelligens som formar framtiden'
      }
    };

    // Hitta relevant bild baserat på ämne
    const imageData = topicImages[topic] || topicImages['digital_transformation'];
    
    return {
      url: imageData.primary,
      alt: imageData.alt,
      description: imageData.description,
      title: title,
      width: 1200,
      height: 630,
      format: 'jpeg',
      source: 'unsplash'
    };
  }

  // Ladda upp bild till WordPress mediebibliotek
  async uploadImageToWordPress(imageData) {
    try {
      const { config } = require('../config/api-keys');
      
      // Hämta bild från URL
      const imageResponse = await axios.get(imageData.url, {
        responseType: 'arraybuffer'
      });

      // Skapa FormData för uppladdning
      const FormData = require('form-data');
      const form = new FormData();
      
      // Skapa buffer från bilddata
      const buffer = Buffer.from(imageResponse.data);
      const filename = `${this.generateSlug(imageData.title)}-${Date.now()}.jpg`;
      
      form.append('file', buffer, {
        filename: filename,
        contentType: 'image/jpeg'
      });

      // WordPress autentisering
      const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
      
      // Ladda upp till WordPress
      const uploadResponse = await axios.post(`${config.wordpress.siteUrl}/wp-json/wp/v2/media`, form, {
        headers: {
          'Authorization': `Basic ${auth}`,
          ...form.getHeaders()
        }
      });

      if (uploadResponse.data && uploadResponse.data.id) {
        // Uppdatera media med alt-text och beskrivning
        await axios.post(`${config.wordpress.siteUrl}/wp-json/wp/v2/media/${uploadResponse.data.id}`, {
          alt_text: imageData.alt,
          description: imageData.description,
          caption: imageData.title
        }, {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        });

        return {
          success: true,
          mediaId: uploadResponse.data.id,
          url: uploadResponse.data.source_url,
          alt: imageData.alt,
          title: imageData.title
        };
      }

      return {
        success: false,
        error: 'Kunde inte ladda upp bild'
      };

    } catch (error) {
      console.error('Fel vid uppladdning av bild:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Sätt featured image för blogginlägg
  async setFeaturedImage(postId, mediaId) {
    try {
      const { config } = require('../config/api-keys');
      
      const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
      
      // Uppdatera inlägget med featured image
      const response = await axios.post(`${config.wordpress.siteUrl}/wp-json/wp/v2/posts/${postId}`, {
        featured_media: mediaId
      }, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        postId: postId,
        mediaId: mediaId
      };

    } catch (error) {
      console.error('Fel vid sättning av featured image:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generera slug från titel
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[åäö]/g, (match) => {
        const replacements = { 'å': 'a', 'ä': 'a', 'ö': 'o' };
        return replacements[match];
      })
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  // Förbättrad innehållsgenerering med SEO-integration
  async createIntelligentContentWithSEO(topic, userIntent) {
    try {
      // Skapa grundläggande innehåll
      const content = await this.createIntelligentContent(topic, userIntent);
      
      // Lägg till SEO-optimering
      const seoData = this.optimizeContentForSEO(content.content, topic, userIntent);
      
      // Generera interna länkar och relaterat innehåll
      const internalLinks = await this.generateInternalLinks(topic);
      const relatedContent = this.generateRelatedContent(topic);
      
      // Generera thumbnail
      const thumbnail = this.generateThumbnail(topic, content.title);
      
      // Beräkna ordantal och läsningstid
      const wordCount = content.content.split(' ').length;
      const readingTime = this.calculateReadingTime(content.content);
      
      // Skapa komplett artikel med SEO
      const completeArticle = {
        ...content,
        seoData: seoData,
        internalLinks: internalLinks,
        relatedContent: relatedContent,
        thumbnail: thumbnail,
        altTexts: seoData.altTexts,
        schemaMarkup: seoData.schemaMarkup,
        metaData: seoData.metaData,
        wordCount: wordCount,
        estimatedReadingTime: readingTime,
        category: userIntent.category || 'Allmänt',
        tags: userIntent.tags || []
      };
      
      return completeArticle;
    } catch (error) {
      console.error('Fel vid skapande av SEO-optimerat innehåll:', error);
      throw error;
    }
  }

  // Generera relaterat innehåll
  generateRelatedContent(topic) {
    const relatedContent = {
      'rfid_technology': [
        {
          title: 'RFID-implementation: Steg-för-steg guide',
          url: '/blog/rfid-implementation-guide/',
          description: 'Praktisk guide för att implementera RFID i ditt företag'
        },
        {
          title: 'RFID vs streckkod: Vilken är bäst för ditt företag?',
          url: '/blog/rfid-vs-streckkod/',
          description: 'Jämförelse av RFID och streckkodsteknik'
        },
        {
          title: 'ROI för RFID-lösningar: Så beräknar du avkastningen',
          url: '/blog/rfid-roi-berakning/',
          description: 'Guide för att beräkna ROI för RFID-investeringar'
        }
      ],
      'time_tracking': [
        {
          title: 'Så väljer du rätt tidterminal för ditt företag',
          url: '/blog/tidterminal-val/',
          description: 'Kriterier för att välja optimal tidterminal'
        },
        {
          title: 'Digital tidrapportering: Fördelar och implementation',
          url: '/blog/digital-tidrapportering/',
          description: 'Fördelar med digital tidrapportering'
        },
        {
          title: 'Tidhantering för småföretag: Praktiska tips',
          url: '/blog/tidhantering-smaforetag/',
          description: 'Tips för effektiv tidhantering i småföretag'
        }
      ],
      'interactive_floor': [
        {
          title: 'Active Floor i skolan: Framgångsrika fallstudier',
          url: '/blog/active-floor-skolan/',
          description: 'Exempel på framgångsrika implementationer'
        },
        {
          title: 'Interaktiva lekgolv för äldreboenden',
          url: '/blog/lekgolv-aldreboenden/',
          description: 'Användning av lekgolv för aktivering'
        },
        {
          title: 'Pedagogisk teknologi: Framtidens undervisning',
          url: '/blog/pedagogisk-teknologi/',
          description: 'Trender inom pedagogisk teknologi'
        }
      ]
    };
    
    return relatedContent[topic] || [
      {
        title: 'Företagslösningar från Concept Solutions',
        url: '/tjanster/',
        description: 'Utforska alla våra företagslösningar'
      }
    ];
  }

  predictEngagement(content) {
    const engagement = this.estimateEngagement(content);
    
    return {
      score: engagement,
      prediction: engagement > 80 ? 'mycket hög' : engagement > 60 ? 'hög' : 'medium',
      factors: [
        'Optimal innehållslängd',
        'Bra struktur med rubriker',
        'Engagerande skrivstil',
        'Praktiskt värde för läsaren'
      ]
    };
  }

  // Analysera marknadstrender baserat på produkter och innehåll
  analyzeMarketTrends() {
    return {
      currentTrends: [
        {
          topic: 'RFID-teknik',
          trend: 'increasing',
          confidence: 0.85,
          reasoning: 'Ökad efterfrågan för automatiserad identifiering'
        },
        {
          topic: 'Tidrapportering',
          trend: 'stable',
          confidence: 0.75,
          reasoning: 'Stabil marknad med fokus på digitalisering'
        },
        {
          topic: 'Interaktiva lekgolv',
          trend: 'increasing',
          confidence: 0.90,
          reasoning: 'Stark tillväxt inom pedagogisk teknologi'
        }
      ],
      opportunities: [
        'RFID-lösningar för småföretag',
        'Mobil tidrapportering',
        'Interaktiva lekgolv för äldreboenden'
      ],
      threats: [
        'Konkurrens från större leverantörer',
        'Teknologiska förändringar',
        'Ekonomiska osäkerheter'
      ]
    };
  }

  // Analysera användarbeteende baserat på innehållsstruktur
  analyzeUserBehavior() {
    return {
      contentPreferences: {
        preferredLength: 'medium',
        preferredStyle: 'practical',
        preferredTopics: ['RFID', 'tidterminal', 'lekgolv']
      },
      engagementPatterns: {
        peakHours: ['09:00-11:00', '14:00-16:00'],
        preferredDays: ['tisdag', 'onsdag', 'torsdag'],
        contentTypes: ['guider', 'jämförelser', 'fallstudier']
      },
      searchBehavior: {
        commonQueries: ['RFID-lösningar', 'tidterminal företag', 'interaktiva lekgolv'],
        searchIntent: ['informational', 'commercial', 'navigational']
      }
    };
  }

  // Identifiera trendande ämnen
  identifyTrendingTopics() {
    return [
      {
        topic: 'RFID för småföretag',
        trend: 'rising',
        searchVolume: 'high',
        competition: 'medium'
      },
      {
        topic: 'Digital tidrapportering',
        trend: 'stable',
        searchVolume: 'medium',
        competition: 'high'
      },
      {
        topic: 'Interaktiva lekgolv för äldre',
        trend: 'rising',
        searchVolume: 'medium',
        competition: 'low'
      }
    ];
  }

  // Identifiera innehållsmöjligheter
  identifyContentOpportunities() {
    return [
      {
        type: 'product_guide',
        topic: 'RFID-implementation',
        priority: 'high',
        reasoning: 'Saknas praktisk guide för RFID-implementation'
      },
      {
        type: 'comparison',
        topic: 'Tidterminaler jämförelse',
        priority: 'medium',
        reasoning: 'Kunder söker jämförelser mellan olika tidterminaler'
      },
      {
        type: 'case_study',
        topic: 'Active Floor i skolor',
        priority: 'medium',
        reasoning: 'Saknas konkreta exempel på framgångsrika implementationer'
      }
    ];
  }

  // Skapa intelligent innehållsstrategi
  createIntelligentContentStrategy() {
    return {
      shortTerm: [
        'Skapa produktguider för alla huvudprodukter',
        'Utveckla jämförelseartiklar',
        'Skapa fallstudier från kunder'
      ],
      longTerm: [
        'Bygg auktoritet inom RFID-lösningar',
        'Utveckla omfattande kunskapsbas',
        'Skapa community kring produkterna'
      ],
      priorities: [
        'Fokusera på praktiskt värde',
        'Inkludera konkreta exempel',
        'Optimera för sökmotorer'
      ]
    };
  }

  // Hantera innehållsgap-analys
  async handleContentGapAnalysis(query) {
    const gaps = this.analyzeContentGaps();
    const opportunities = this.identifyContentOpportunities();
    
    return {
      success: true,
      type: 'content_gap_analysis',
      data: {
        gaps: gaps,
        opportunities: opportunities,
        recommendations: this.generateContentRecommendations(gaps, opportunities)
      }
    };
  }

  // Hantera marknadsintelligens
  async handleMarketIntelligence(query) {
    const marketInsights = this.analyzeMarketTrends();
    const userBehavior = this.analyzeUserBehavior();
    const trendingTopics = this.identifyTrendingTopics();
    
    return {
      success: true,
      type: 'market_intelligence',
      data: {
        marketInsights: marketInsights,
        userBehavior: userBehavior,
        trendingTopics: trendingTopics,
        recommendations: this.generateMarketRecommendations(marketInsights, trendingTopics)
      }
    };
  }

  // Hantera användarbeteendeanalys
  async handleUserBehaviorAnalysis(query) {
    const userBehavior = this.analyzeUserBehavior();
    
    return {
      success: true,
      type: 'user_behavior_analysis',
      data: {
        userBehavior: userBehavior,
        insights: this.extractUserInsights(userBehavior),
        recommendations: this.generateUserRecommendations(userBehavior)
      }
    };
  }

  // Hantera kreativt innehållsskapande
  async handleCreativeContentCreation(query) {
    const topic = this.extractTopicFromQuery(query);
    const creativeContent = await this.createIntelligentContent(topic, {});
    
    return {
      success: true,
      type: 'creative_content_creation',
      data: {
        content: creativeContent,
        creativeElements: this.identifyCreativeElements(creativeContent),
        engagementPrediction: this.predictEngagement(creativeContent)
      }
    };
  }

  // Hjälpfunktioner för intelligent funktionalitet
  generateContentRecommendations(gaps, opportunities) {
    return [
      {
        priority: 'high',
        action: 'Skapa produktguider för alla huvudprodukter',
        impact: 'Förbättrar förståelse och konvertering',
        effort: 'medium'
      },
      {
        priority: 'medium',
        action: 'Utveckla jämförelseartiklar',
        impact: 'Hjälper kunder att välja rätt produkt',
        effort: 'medium'
      },
      {
        priority: 'low',
        action: 'Skapa fallstudier från kunder',
        impact: 'Bygger trovärdighet och social proof',
        effort: 'high'
      }
    ];
  }

  generateMarketRecommendations(marketInsights, trendingTopics) {
    return [
      {
        priority: 'high',
        action: 'Fokusera på RFID-lösningar för småföretag',
        impact: 'Hög tillväxtpotential',
        effort: 'medium'
      },
      {
        priority: 'medium',
        action: 'Utveckla interaktiva lekgolv för äldreboenden',
        impact: 'Låg konkurrens, hög potential',
        effort: 'high'
      }
    ];
  }

  extractUserInsights(userBehavior) {
    return [
      'Användare föredrar praktiskt innehåll över teoretiskt',
      'Peak-engagemang sker under kontorstid',
      'Sökintent är främst informativt och kommersiellt'
    ];
  }

  generateUserRecommendations(userBehavior) {
    return [
      {
        priority: 'high',
        action: 'Skapa praktiska guider och tutorials',
        impact: 'Matchar användarnas preferenser',
        effort: 'medium'
      },
      {
        priority: 'medium',
        action: 'Publicera innehåll under peak-timmar',
        impact: 'Maximerar synlighet och engagemang',
        effort: 'low'
      }
    ];
  }

  extractTopicFromQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('rfid')) return 'rfid_technology';
    if (lowerQuery.includes('tidterminal')) return 'time_tracking';
    if (lowerQuery.includes('lekgolv')) return 'interactive_floor';
    
    return 'general';
  }

  identifyCreativeElements(content) {
    return [
      'Unikt perspektiv baserat på marknadsanalys',
      'Praktiska exempel och implementationer',
      'Engagerande berättelseformat',
      'Interaktiva element och call-to-actions'
    ];
  }

  // Hjälpfunktioner för analys
  analyzeSentenceLength(content) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgLength = sentences.reduce((sum, sentence) => sum + sentence.split(' ').length, 0) / sentences.length;
    
    return {
      average: Math.round(avgLength),
      distribution: avgLength < 15 ? 'short' : avgLength < 25 ? 'medium' : 'long'
    };
  }

  analyzeParagraphStructure(content) {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    
    return {
      count: paragraphs.length,
      averageLength: Math.round(paragraphs.reduce((sum, p) => sum + p.split(' ').length, 0) / paragraphs.length),
      hasHeaders: content.includes('<h2>') || content.includes('<h3>'),
      hasLists: content.includes('<ul>') || content.includes('<ol>')
    };
  }

  calculateReadability(content) {
    // Enkel läsbarhetsberäkning
    const words = content.split(' ').length;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const syllables = this.countSyllables(content);
    
    const fleschScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    
    return {
      score: Math.round(fleschScore),
      level: fleschScore > 80 ? 'very_easy' : fleschScore > 60 ? 'easy' : fleschScore > 40 ? 'medium' : 'difficult'
    };
  }

  countSyllables(text) {
    // Enkel stavelseberäkning
    const words = text.toLowerCase().split(' ');
    let syllableCount = 0;
    
    words.forEach(word => {
      const vowels = word.match(/[aeiouyåäö]/g);
      syllableCount += vowels ? vowels.length : 1;
    });
    
    return syllableCount;
  }

  extractConcepts(content) {
    const concepts = [];
    const conceptPatterns = [
      /RFID/gi,
      /tidterminal/gi,
      /lekgolv/gi,
      /företag/gi,
      /effektivitet/gi,
      /optimering/gi
    ];
    
    conceptPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        concepts.push({
          concept: matches[0].toLowerCase(),
          frequency: matches.length,
          context: this.extractContext(content, matches[0])
        });
      }
    });
    
    return concepts;
  }

  findConceptRelationships(concepts) {
    const relationships = [];
    
    concepts.forEach((concept1, i) => {
      concepts.slice(i + 1).forEach(concept2 => {
        if (this.areConceptsRelated(concept1, concept2)) {
          relationships.push({
            concept1: concept1.concept,
            concept2: concept2.concept,
            relationship: this.determineRelationship(concept1, concept2)
          });
        }
      });
    });
    
    return relationships;
  }

  areConceptsRelated(concept1, concept2) {
    const relatedPairs = [
      ['rfid', 'företag'],
      ['tidterminal', 'effektivitet'],
      ['lekgolv', 'undervisning'],
      ['optimering', 'effektivitet']
    ];
    
    return relatedPairs.some(pair => 
      (pair[0] === concept1.concept && pair[1] === concept2.concept) ||
      (pair[1] === concept1.concept && pair[0] === concept2.concept)
    );
  }

  determineRelationship(concept1, concept2) {
    const relationships = {
      'rfid-företag': 'implementation',
      'tidterminal-effektivitet': 'förbättring',
      'lekgolv-undervisning': 'pedagogik',
      'optimering-effektivitet': 'mål'
    };
    
    const key = `${concept1.concept}-${concept2.concept}`;
    return relationships[key] || 'association';
  }

  extractContext(content, concept) {
    const sentences = content.split(/[.!?]+/);
    const relevantSentences = sentences.filter(sentence => 
      sentence.toLowerCase().includes(concept.toLowerCase())
    );
    
    return relevantSentences.slice(0, 2).map(s => s.trim());
  }

  analyzeContext(content) {
    return {
      domain: this.determineDomain(content),
      tone: this.analyzeTone(content),
      audience: this.determineAudience(content),
      purpose: this.determinePurpose(content)
    };
  }

  determineDomain(content) {
    if (content.includes('RFID') || content.includes('tidterminal')) return 'business_technology';
    if (content.includes('lekgolv') || content.includes('undervisning')) return 'education';
    return 'general';
  }

  determineAudience(content) {
    if (content.includes('företag') || content.includes('företagsverksamhet')) return 'business';
    if (content.includes('skola') || content.includes('undervisning')) return 'education';
    return 'general';
  }

  determinePurpose(content) {
    if (content.includes('guide') || content.includes('hur')) return 'instructional';
    if (content.includes('jämförelse') || content.includes('vs')) return 'comparative';
    if (content.includes('nyheter') || content.includes('trend')) return 'informational';
    return 'general';
  }

  // Hjälpfunktioner för SEO och engagemang
  calculateSEOPotential(topic) {
    const seoFactors = {
      'rfid_technology': { searchVolume: 85, competition: 70, relevance: 90 },
      'time_tracking': { searchVolume: 75, competition: 80, relevance: 85 },
      'interactive_floor': { searchVolume: 60, competition: 40, relevance: 80 }
    };
    
    const factors = seoFactors[topic] || { searchVolume: 50, competition: 50, relevance: 70 };
    
    return (factors.searchVolume + factors.relevance - factors.competition) / 3;
  }

  calculateGapScore(topic, contentGaps) {
    const gap = contentGaps.find(g => g.topic === topic);
    return gap ? 90 : 30; // Högre poäng för ämnen som saknas
  }

  calculateUserInterest(topic, userIntent) {
    const userTopics = userIntent.primary ? [userIntent.primary] : [];
    return userTopics.includes(topic) ? 90 : 50;
  }

  calculateBusinessValue(topic) {
    const businessTopics = ['rfid_technology', 'time_tracking'];
    return businessTopics.includes(topic) ? 85 : 60;
  }

  calculateCompetitionScore(topic) {
    const competitionLevels = {
      'rfid_technology': 70,
      'time_tracking': 80,
      'interactive_floor': 40
    };
    
    return 100 - (competitionLevels[topic] || 50); // Lägre konkurrens = högre poäng
  }

  // Hjälpfunktioner för innehållsgenerering
  generatePotentialTopics(userIntent) {
    const baseTopics = ['rfid_technology', 'time_tracking', 'interactive_floor'];
    
    if (userIntent.primary && userIntent.primary !== 'unknown') {
      return [userIntent.primary, ...baseTopics.filter(t => t !== userIntent.primary)];
    }
    
    return baseTopics;
  }

  // Hjälpfunktioner för unika insikter
  createUniqueInsights(relevantData, topic) {
    const insights = [];
    
    if (relevantData.products.length > 0) {
      insights.push({
        title: 'Produktbaserade insikter',
        description: `Baserat på ${relevantData.products.length} produkter har vi identifierat viktiga mönster inom ${topic}`
      });
    }
    
    if (relevantData.blogPosts.length > 0) {
      insights.push({
        title: 'Innehållsbaserade insikter',
        description: `Analys av ${relevantData.blogPosts.length} artiklar visar trender inom ${topic}`
      });
    }
    
    return insights;
  }

  identifyUniqueAngles(topic, relevantData) {
    const angles = [
      'Praktisk implementation',
      'Kostnadseffektivitet',
      'Framtidsperspektiv',
      'Fallstudier från kunder',
      'Teknisk djupdykning'
    ];
    
    return angles;
  }

  selectBestUniqueAngle(angles, existingAngles) {
    const availableAngles = angles.filter(angle => !existingAngles.includes(angle));
    return availableAngles.length > 0 ? availableAngles[0] : angles[0];
  }

  defineDifferentiation(topic, relevantData) {
    return `Concept Solutions unika expertis inom ${topic} kombinerat med praktisk erfarenhet från hundratals implementationer`;
  }

  createValueProposition(topic, perspective) {
    return `Vi hjälper företag att implementera ${topic} på ett kostnadseffektivt och framgångsrikt sätt genom vår expertis och praktiska erfarenhet`;
  }

  // Extrahera insikter från relevant data
  extractInsightsFromData(relevantData) {
    const insights = [];
    
    // Analysera produkter
    if (relevantData.products.length > 0) {
      insights.push({
        title: 'Produktbaserade insikter',
        description: `Baserat på ${relevantData.products.length} produkter har vi identifierat viktiga mönster och trender`,
        type: 'product_analysis',
        count: relevantData.products.length
      });
    }
    
    // Analysera blogginlägg
    if (relevantData.blogPosts.length > 0) {
      insights.push({
        title: 'Innehållsbaserade insikter',
        description: `Analys av ${relevantData.blogPosts.length} artiklar visar trender och användarintresse`,
        type: 'content_analysis',
        count: relevantData.blogPosts.length
      });
    }
    
    // Analysera sidor
    if (relevantData.pages.length > 0) {
      insights.push({
        title: 'Sidbaserade insikter',
        description: `Genomgång av ${relevantData.pages.length} sidor ger djupare förståelse för innehållsstruktur`,
        type: 'page_analysis',
        count: relevantData.pages.length
      });
    }
    
    // Lägg till generella insikter om inga specifika data finns
    if (insights.length === 0) {
      insights.push({
        title: 'Marknadsinsikter',
        description: 'Baserat på branschtrender och marknadsanalys',
        type: 'market_analysis',
        count: 0
      });
    }
    
    return insights;
  }

  // Extrahera nyckelord och ämnen från text
  extractKeywordsAndTopics(text) {
    if (!text || typeof text !== 'string') {
      return { keywords: [], topics: [] };
    }
    
    const keywords = [];
    const topics = [];
    
    // Grundläggande nyckelord baserat på Concept Solutions verksamhet
    const baseKeywords = [
      'RFID', 'tidterminal', 'lekgolv', 'företag', 'lösningar', 'teknik',
      'automatisering', 'effektivitet', 'optimering', 'implementation'
    ];
    
    // Lägg till nyckelord som finns i texten
    baseKeywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        keywords.push(keyword);
      }
    });
    
    // Identifiera ämnen baserat på nyckelord
    if (text.toLowerCase().includes('rfid')) {
      topics.push('rfid_technology');
    }
    if (text.toLowerCase().includes('tidterminal') || text.toLowerCase().includes('tidrapportering')) {
      topics.push('time_tracking');
    }
    if (text.toLowerCase().includes('lekgolv') || text.toLowerCase().includes('active floor')) {
      topics.push('interactive_floor');
    }
    
    return { keywords, topics };
  }

  // Analysera användarintressen
  analyzeUserInterests() {
    return {
      primaryInterests: ['RFID-teknik', 'tidrapportering', 'interaktiva lekgolv'],
      secondaryInterests: ['företagsautomatisering', 'effektivitet', 'kostnadsbesparing'],
      trendingTopics: ['IoT', 'digital transformation', 'smart cities'],
      painPoints: ['komplex implementation', 'höga kostnader', 'teknisk kompetens']
    };
  }

  // Analysera befintligt innehåll
  analyzeExistingContent() {
    const analysis = {
      totalArticles: this.context.blogPosts.length,
      totalProducts: this.context.products.length,
      contentGaps: [],
      strengths: [],
      opportunities: []
    };
    
    // Identifiera styrkor
    if (this.context.blogPosts.length > 0) {
      analysis.strengths.push('Befintligt innehåll på webbplatsen');
    }
    
    if (this.context.products.length > 0) {
      analysis.strengths.push('Produktdokumentation tillgänglig');
    }
    
    // Identifiera möjligheter
    if (this.context.blogPosts.length < 10) {
      analysis.opportunities.push('Utöka blogginnehåll för bättre SEO');
    }
    
    if (this.context.products.length > 0) {
      analysis.opportunities.push('Skapa produktguider och jämförelser');
    }
    
    return analysis;
  }

  // Generera trendanalys
  generateTrendAnalysis(topic, perspective) {
    return `
<h3>Trendande utvecklingar inom ${topic}</h3>
<p>Marknaden för ${topic} genomgår en snabb transformation. Här är de viktigaste trenderna vi ser:</p>

<h4>1. Digital transformation</h4>
<p>Företag över hela världen digitaliserar sina processer, vilket skapar en enorm efterfrågan efter ${topic}-lösningar.</p>

<h4>2. IoT-integration</h4>
<p>Integration med Internet of Things (IoT) gör ${topic} ännu mer kraftfull och användbar.</p>

<h4>3. AI och maskininlärning</h4>
<p>Artificiell intelligens förbättrar ${topic}-system genom att tillhandahålla prediktiv analys och automatiserad optimering.</p>

<h4>4. Molnbaserade lösningar</h4>
<p>Molnteknologi gör ${topic} mer tillgänglig och skalbar för företag av alla storlekar.</p>
    `;
  }

  // Generera problemformulering
  generateProblemStatement(topic, userIntent) {
    return `
<h3>Vanliga utmaningar med ${topic}</h3>
<p>Många företag stöter på samma utmaningar när de implementerar ${topic}:</p>

<ul>
<li><strong>Komplexitet:</strong> ${topic} kan verka överväldigande för nybörjare</li>
<li><strong>Kostnad:</strong> Initial investering kan vara hög</li>
<li><strong>Integration:</strong> Svårt att integrera med befintliga system</li>
<li><strong>Kompetens:</strong> Brist på intern expertis</li>
</ul>

<p>Men med rätt strategi och support kan dessa utmaningar övervinnas.</p>
    `;
  }

  // Generera steg-för-steg guide
  generateStepByStepGuide(topic, perspective, userIntent) {
    return `
<h3>Steg-för-steg guide för ${topic}</h3>
<p>Följ dessa steg för att framgångsrikt implementera ${topic} i ditt företag:</p>

<h4>Steg 1: Utvärdering och planering</h4>
<p>Börja med att utvärdera dina nuvarande processer och identifiera områden där ${topic} kan göra störst skillnad.</p>

<h4>Steg 2: Välj rätt lösning</h4>
<p>Baserat på dina specifika behov, välj en ${topic}-lösning som passar ditt företag.</p>

<h4>Steg 3: Implementation</h4>
<p>Arbeta med experter för att implementera ${topic} på ett systematiskt sätt.</p>

<h4>Steg 4: Utbildning och support</h4>
<p>Säkerställ att ditt team får rätt utbildning och pågående support.</p>

<h4>Steg 5: Optimering</h4>
<p>Kontinuerligt optimera och förbättra din ${topic}-implementation.</p>
    `;
  }

  // Generera tips och tricks
  generateTipsAndTricks(topic, perspective) {
    return `
<h3>Proffstips för ${topic}</h3>
<p>Här är några värdefulla tips från våra experter:</p>

<ul>
<li><strong>Börja i liten skala:</strong> Testa ${topic} på en mindre avdelning först</li>
<li><strong>Mät resultat:</strong> Sätt upp tydliga KPI:er för att mäta framsteg</li>
<li><strong>Involvera teamet:</strong> Få medarbetare att känna sig delaktiga i processen</li>
<li><strong>Planera för framtiden:</strong> Välj lösningar som kan växa med ditt företag</li>
</ul>
    `;
  }

  // Generera jämförelsetabell
  generateComparisonTable(topic, perspective) {
    return `
<h3>Jämförelse av ${topic}-lösningar</h3>
<p>Här är en översikt över olika ${topic}-alternativ:</p>

<table border="1" style="width: 100%; border-collapse: collapse;">
<tr>
<th>Funktion</th>
<th>Grundlösning</th>
<th>Avancerad lösning</th>
<th>Enterprise lösning</th>
</tr>
<tr>
<td>Pris</td>
<td>Låg</td>
<td>Medium</td>
<td>Hög</td>
</tr>
<tr>
<td>Funktionalitet</td>
<td>Grundläggande</td>
<td>Avancerad</td>
<td>Komplett</td>
</tr>
<tr>
<td>Support</td>
<td>Begränsad</td>
<td>Standard</td>
<td>Premium</td>
</tr>
<tr>
<td>Skalbarhet</td>
<td>Låg</td>
<td>Medium</td>
<td>Hög</td>
</tr>
</table>
    `;
  }

  // Generera praktiska tillämpningar
  generatePracticalApplications(topic, perspective) {
    return `
<h3>Praktiska tillämpningar av ${topic}</h3>
<p>${topic} kan användas i många olika scenarier:</p>

<h4>För småföretag</h4>
<p>Småföretag kan använda ${topic} för att automatisera grundläggande processer och spara tid.</p>

<h4>För medelstora företag</h4>
<p>Medelstora företag kan implementera ${topic} för att förbättra effektiviteten och minska kostnader.</p>

<h4>För stora företag</h4>
<p>Stora företag kan använda ${topic} för att optimera komplexa processer och förbättra beslutsfattande.</p>
    `;
  }

  // Hämta riktiga URL:er från webbplatsen
  async fetchRealURLs() {
    try {
      console.log('🔗 Hämtar riktiga URL:er från ConceptSolutions.com...');
      
      const { config } = require('../config/api-keys');
      const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
      
      // Hämta sidor
      const pagesResponse = await axios.get(`${config.wordpress.restApiUrl}/pages`, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        params: {
          per_page: 50,
          status: 'publish'
        }
      });
      
      // Hämta produkter från WooCommerce
      const productsResponse = await axios.get(`${config.woocommerce.storeUrl}/wp-json/wc/v3/products`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${config.woocommerce.consumerKey}:${config.woocommerce.consumerSecret}`).toString('base64')}`,
          'Content-Type': 'application/json'
        },
        params: {
          per_page: 50,
          status: 'publish'
        }
      });
      
      // Hämta kategorier
      const categoriesResponse = await axios.get(`${config.wordpress.restApiUrl}/categories`, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        params: {
          per_page: 20
        }
      });
      
      // Skapa URL-mappning
      const urlMap = {
        pages: {},
        products: {},
        categories: {},
        services: {}
      };
      
      // Mappa sidor
      pagesResponse.data.forEach(page => {
        const slug = page.slug;
        const title = page.title.rendered;
        const url = page.link;
        
        urlMap.pages[slug] = {
          title: title,
          url: url,
          id: page.id
        };
      });
      
      // Mappa produkter
      productsResponse.data.forEach(product => {
        const slug = product.slug;
        const name = product.name;
        const url = product.permalink;
        
        urlMap.products[slug] = {
          title: name,
          url: url,
          id: product.id,
          type: 'product'
        };
      });
      
      // Mappa kategorier
      categoriesResponse.data.forEach(category => {
        const slug = category.slug;
        const name = category.name;
        const url = category.link;
        
        urlMap.categories[slug] = {
          title: name,
          url: url,
          id: category.id
        };
      });
      
      // Lägg till specifika tjänster baserat på vad som finns på webbplatsen
      urlMap.services = {
        'rfid-implementation': {
          title: 'RFID-implementation',
          url: '/tjanster/rfid-implementation/',
          type: 'service'
        },
        'tidhantering': {
          title: 'Tidhantering',
          url: '/tjanster/tidhantering/',
          type: 'service'
        },
        'active-floor': {
          title: 'Active Floor',
          url: '/tjanster/active-floor/',
          type: 'service'
        }
      };
      
      console.log(`✅ Hämtat ${Object.keys(urlMap.pages).length} sidor, ${Object.keys(urlMap.products).length} produkter, ${Object.keys(urlMap.categories).length} kategorier`);
      
      return urlMap;
      
    } catch (error) {
      console.error('❌ Fel vid hämtning av URL:er:', error.message);
      // Returnera fallback URL:er
      return this.getFallbackURLs();
    }
  }

  // Fallback URL:er om API-anrop misslyckas
  getFallbackURLs() {
    return {
      pages: {
        'om-oss': { title: 'Om oss', url: '/om-oss/', id: 1 },
        'kontakt': { title: 'Kontakt', url: '/kontakt/', id: 2 },
        'tjanster': { title: 'Tjänster', url: '/tjanster/', id: 3 }
      },
      products: {
        'rfid-lasare': { title: 'RFID-läsare', url: '/produkt/rfid-lasare/', id: 1, type: 'product' },
        'tidterminal': { title: 'Tidterminal', url: '/produkt/tidterminal/', id: 2, type: 'product' },
        'active-floor': { title: 'Active Floor', url: '/produkt/active-floor/', id: 3, type: 'product' }
      },
      categories: {
        'rfid': { title: 'RFID', url: '/kategori/rfid/', id: 1 },
        'tidhantering': { title: 'Tidhantering', url: '/kategori/tidhantering/', id: 2 },
        'lekgolv': { title: 'Lekgolv', url: '/kategori/lekgolv/', id: 3 }
      },
      services: {
        'rfid-implementation': { title: 'RFID-implementation', url: '/tjanster/rfid-implementation/', type: 'service' },
        'tidhantering': { title: 'Tidhantering', url: '/tjanster/tidhantering/', type: 'service' },
        'active-floor': { title: 'Active Floor', url: '/tjanster/active-floor/', type: 'service' }
      }
    };
  }

  // Hämta aktuellt år
  getCurrentYear() {
    return new Date().getFullYear();
  }

  // Integrera interna länkar i innehållet
  integrateInternalLinks(content, internalLinks, topic) {
    if (!internalLinks || internalLinks.length === 0) {
      return content;
    }
    
    let updatedContent = content;
    
    // Lägg till en sektion med interna länkar
    let linksSection = `
<h3>Relaterade lösningar och tjänster</h3>
<p>För att hjälpa dig komma vidare med ${topic}, rekommenderar vi följande lösningar:</p>
<ul>
`;
    
    internalLinks.forEach(link => {
      if (link && link.url && link.text) {
        linksSection += `<li><a href="${link.url}">${link.text}</a> - ${link.description || 'Läs mer om denna lösning'}</li>`;
      }
    });
    
    linksSection += `</ul>`;
    
    // Lägg till länksektionen före slutet av innehållet
    if (updatedContent.includes('</h2>') || updatedContent.includes('</h3>')) {
      // Hitta sista rubriken och lägg till efter den
      const lastHeadingIndex = Math.max(
        updatedContent.lastIndexOf('</h2>'),
        updatedContent.lastIndexOf('</h3>')
      );
      
      if (lastHeadingIndex !== -1) {
        updatedContent = updatedContent.slice(0, lastHeadingIndex + 4) + 
                        linksSection + 
                        updatedContent.slice(lastHeadingIndex + 4);
      } else {
        updatedContent += linksSection;
      }
    } else {
      updatedContent += linksSection;
    }
    
    return updatedContent;
  }

  // Uppdatera alla år-referenser i innehåll
  updateYearReferences(content) {
    const currentYear = this.getCurrentYear();
    const nextYear = currentYear + 1;
    
    // Ersätt gamla år med aktuellt år
    let updatedContent = content
      .replace(/2024/g, currentYear.toString())
      .replace(/2023/g, (currentYear - 1).toString())
      .replace(/2022/g, (currentYear - 2).toString());
    
    // Lägg till framtidsreferenser
    if (content.includes('framtid') || content.includes('kommande')) {
      updatedContent = updatedContent.replace(
        /(framtid|kommande|nästa år)/gi,
        `${nextYear}`
      );
    }
    
    return updatedContent;
  }
}

module.exports = ConceptSolutionsAI;
