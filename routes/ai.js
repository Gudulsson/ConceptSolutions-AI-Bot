/**
 * AI Routes - Intelligent Content Analyzer
 * API-endpoints för ConceptSolutions Intelligent AI-motor med eget medvetande
 */

const express = require('express');
const ConceptSolutionsAI = require('../services/ai-engine');
const router = express.Router();
const axios = require('axios'); // Lägg till axios för WordPress-integration

// Initiera intelligent AI-instans
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

// Middleware för att initiera intelligent AI-motorn
router.use(async (req, res, next) => {
  if (!aiEngine.context.products.length) {
    await aiEngine.initialize();
  }
  next();
});

// Intelligent innehållsgenerering endpoint
router.post('/intelligent/content', async (req, res) => {
  try {
    const { query, userIntent = {}, preferences = {} } = req.body;

    if (!query) {
      return res.status(400).json({
        error: 'Fråga krävs',
        message: 'Skicka med en fråga för intelligent innehållsgenerering'
      });
    }

    const result = await aiEngine.processIntelligentQuery(query, 'intelligent_content_generation');

    res.json({
      success: true,
      data: result.data,
      consciousness: {
        reasoning: result.data.reasoning,
        uniqueInsights: result.data.content.uniqueValue,
        engagementPrediction: result.data.engagementPrediction
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel i Intelligent AI:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte bearbeta din intelligenta fråga'
    });
  }
});

// Innehållsgap-analys endpoint
router.get('/intelligent/gaps', async (req, res) => {
  try {
    const result = await aiEngine.processIntelligentQuery('Analysera innehållsgap', 'content_gap_analysis');
    
    res.json({
      success: true,
      data: {
        contentGaps: aiEngine.context.contentGaps,
        opportunities: result.data.opportunities,
        recommendations: result.data.recommendations
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid innehållsgap-analys:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte analysera innehållsgap'
    });
  }
});

// Marknadsintelligens endpoint
router.get('/intelligent/market', async (req, res) => {
  try {
    const result = await aiEngine.processIntelligentQuery('Analysera marknadstrender', 'market_intelligence');
    
    res.json({
      success: true,
      data: {
        marketInsights: aiEngine.context.marketInsights,
        trendingTopics: aiEngine.context.trendingTopics,
        userBehavior: aiEngine.context.userBehavior
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid marknadsintelligens:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte analysera marknadstrender'
    });
  }
});

// Kreativ innehållsskapande endpoint
router.post('/intelligent/creative', async (req, res) => {
  try {
    const { topic, style, targetAudience, complexity } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        error: 'Ämne krävs',
        message: 'Skicka med ett ämne för kreativ innehållsgenerering'
      });
    }

    const result = await aiEngine.processIntelligentQuery(
      `Skapa kreativt innehåll om ${topic}`, 
      'creative_content_creation'
    );
    
    res.json({
      success: true,
      data: result.data,
      creativity: {
        uniquePerspective: result.data.content.uniqueValue,
        creativeElements: result.data.creativeElements,
        engagementPrediction: result.data.engagementPrediction
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid kreativ innehållsgenerering:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte generera kreativt innehåll'
    });
  }
});

// Intelligent innehållsanalys endpoint
router.get('/intelligent/analysis', async (req, res) => {
  try {
    const analysis = {
      contentAnalysis: Object.fromEntries(aiEngine.intelligence.contentAnalysis),
      semanticUnderstanding: Object.fromEntries(aiEngine.intelligence.semanticUnderstanding),
      topicClustering: Object.fromEntries(aiEngine.intelligence.topicClustering),
      consciousness: {
        learningMemory: Object.fromEntries(aiEngine.consciousness.learningMemory),
        patternRecognition: Object.fromEntries(aiEngine.consciousness.patternRecognition),
        creativeInsights: Object.fromEntries(aiEngine.consciousness.creativeInsights)
      }
    };
    
    res.json({
      success: true,
      data: analysis,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid intelligent analys:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte analysera intelligent data'
    });
  }
});

// Intelligent innehållsideer endpoint
router.get('/intelligent/ideas', async (req, res) => {
  try {
    const ideas = aiEngine.context.contentIdeas;
    
    res.json({
      success: true,
      data: {
        ideas: ideas,
        totalIdeas: ideas.length,
        priorityIdeas: ideas.filter(idea => idea.priority === 'high'),
        reasoning: 'Genererat baserat på innehållsgap, marknadstrender och användarbeteende'
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid hämtning av intelligenta innehållsideer:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte hämta intelligenta innehållsideer'
    });
  }
});

// Användarbeteendeanalys endpoint
router.get('/intelligent/behavior', async (req, res) => {
  try {
    const result = await aiEngine.processIntelligentQuery('Analysera användarbeteende', 'user_behavior_analysis');
    
    res.json({
      success: true,
      data: {
        userBehavior: aiEngine.context.userBehavior,
        insights: result.data.insights,
        recommendations: result.data.recommendations
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid användarbeteendeanalys:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte analysera användarbeteende'
    });
  }
});

// Intelligent SEO-analys endpoint
router.get('/intelligent/seo', async (req, res) => {
  try {
    const seoInsights = Object.fromEntries(aiEngine.intelligence.seoInsights);
    
    res.json({
      success: true,
      data: {
        seoInsights: seoInsights,
        keywordOpportunities: aiEngine.context.keywords,
        contentOptimization: aiEngine.context.seoData
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid intelligent SEO-analys:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte analysera SEO-intelligens'
    });
  }
});

// Intelligent status och hälsa
router.get('/intelligent/status', async (req, res) => {
  try {
    const status = {
      initialized: aiEngine.context.products.length > 0,
      consciousness: {
        learningMemory: aiEngine.consciousness.learningMemory.size,
        patternRecognition: aiEngine.consciousness.patternRecognition.size,
        creativeInsights: aiEngine.consciousness.creativeInsights.size
      },
      intelligence: {
        contentAnalysis: aiEngine.intelligence.contentAnalysis.size,
        semanticUnderstanding: aiEngine.intelligence.semanticUnderstanding.size,
        topicClustering: aiEngine.intelligence.topicClustering.size
      },
      context: {
        productsAnalyzed: aiEngine.context.products.length,
        blogPostsAnalyzed: aiEngine.context.blogPosts.length,
        pagesAnalyzed: aiEngine.context.pages.length,
        contentGapsIdentified: aiEngine.context.contentGaps.length,
        trendingTopicsFound: aiEngine.context.trendingTopics.length
      },
      uptime: process.uptime(),
      timestamp: new Date()
    };
    
    res.json({
      success: true,
      data: status
    });

  } catch (error) {
    console.error('❌ Fel vid intelligent status:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte hämta intelligent status'
    });
  }
});

// Återställ intelligent AI-motorn
router.post('/intelligent/reset', async (req, res) => {
  try {
    // Rensa all intelligent data
    aiEngine.intelligence.contentAnalysis.clear();
    aiEngine.intelligence.semanticUnderstanding.clear();
    aiEngine.intelligence.topicClustering.clear();
    aiEngine.consciousness.learningMemory.clear();
    aiEngine.consciousness.patternRecognition.clear();
    aiEngine.consciousness.creativeInsights.clear();
    
    // Initiera om med fullständig analys
    await aiEngine.initialize();
    
    res.json({
      success: true,
      message: 'Intelligent AI-motor återställd och initierad med fullständig medvetenhet',
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid intelligent AI-återställning:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte återställa intelligent AI-motor'
    });
  }
});

// Test endpoint för intelligent AI-funktionalitet
router.post('/intelligent/test', async (req, res) => {
  try {
    const testQueries = [
      'Skapa en intelligent artikel om RFID-lösningar',
      'Analysera innehållsgap på webbplatsen',
      'Identifiera marknadstrender inom tidterminaler',
      'Skapa kreativt innehåll om interaktiva lekgolv'
    ];

    const results = [];
    
    for (const query of testQueries) {
      const result = await aiEngine.processIntelligentQuery(query);
      results.push({
        query,
        success: result.success,
        type: result.type,
        consciousness: result.data?.reasoning ? true : false
      });
    }
    
    res.json({
      success: true,
      data: {
        testResults: results,
        totalTests: testQueries.length,
        consciousnessLevel: 'high',
        intelligenceLevel: 'comprehensive'
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid intelligent AI-test:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte köra intelligent AI-test'
    });
  }
});

// Behåll gamla endpoints för bakåtkompatibilitet
router.post('/developer', async (req, res) => {
  try {
    const { query, taskType = 'general' } = req.body;

    if (!query) {
      return res.status(400).json({
        error: 'Fråga krävs',
        message: 'Skicka med en fråga i request body'
      });
    }

    const result = await aiEngine.processIntelligentQuery(query, taskType);

    res.json({
      success: true,
      data: result,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel i Developer AI:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte bearbeta din fråga'
    });
  }
});

// SEO-optimering endpoint (uppdaterad för intelligent analys)
router.get('/seo/analysis', async (req, res) => {
  try {
    const result = await aiEngine.processIntelligentQuery('Analysera SEO-status', 'seo_optimization');
    
    res.json({
      success: true,
      data: result.data,
      intelligence: {
        seoInsights: Object.fromEntries(aiEngine.intelligence.seoInsights)
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid SEO-analys:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte analysera SEO-status'
    });
  }
});

// Innehållsgenerering endpoint (uppdaterad för intelligent skapande)
router.post('/content/generate', async (req, res) => {
  try {
    const { topic, type = 'blog_post', userIntent = {} } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        error: 'Ämne krävs',
        message: 'Skicka med ett ämne för innehållsgenerering'
      });
    }

    const result = await aiEngine.processIntelligentQuery(
      `Generera intelligent innehåll om ${topic}`, 
      'intelligent_content_generation'
    );
    
    res.json({
      success: true,
      data: result.data,
      consciousness: {
        reasoning: result.data.reasoning,
        uniqueValue: result.data.content.uniqueValue
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid innehållsgenerering:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte generera innehåll'
    });
  }
});

// Status endpoint (uppdaterad för intelligent status)
router.get('/status', async (req, res) => {
  try {
    const status = {
      initialized: aiEngine.context.products.length > 0,
      consciousness: {
        learningMemory: aiEngine.consciousness.learningMemory.size,
        patternRecognition: aiEngine.consciousness.patternRecognition.size,
        creativeInsights: aiEngine.consciousness.creativeInsights.size
      },
      intelligence: {
        contentAnalysis: aiEngine.intelligence.contentAnalysis.size,
        semanticUnderstanding: aiEngine.intelligence.semanticUnderstanding.size,
        topicClustering: aiEngine.intelligence.topicClustering.size
      },
      context: {
        productsLoaded: aiEngine.context.products.length,
        blogPostsLoaded: aiEngine.context.blogPosts.length,
        pagesLoaded: aiEngine.context.pages.length,
        contentGaps: aiEngine.context.contentGaps.length,
        trendingTopics: aiEngine.context.trendingTopics.length
      },
      uptime: process.uptime(),
      timestamp: new Date()
    };
    
    res.json({
      success: true,
      data: status
    });

  } catch (error) {
    console.error('❌ Fel vid AI-status:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte hämta AI-status'
    });
  }
});

// Publicera nyhet direkt till ConceptSolutions.com
router.post('/publish/news', async (req, res) => {
  try {
    const { topic, title, content, category = 'Nyheter', tags = [], publishStatus = 'draft' } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        error: 'Ämne krävs',
        message: 'Skicka med ett ämne för att generera och publicera nyhet'
      });
    }

    console.log('📰 Genererar och publicerar nyhet för ConceptSolutions.com...');

    // Generera intelligent innehåll med SEO
    const article = await aiEngine.createIntelligentContentWithSEO(topic, {
      primary: 'trends_news',
      targetAudience: 'business',
      complexity: 'medium',
      category: category,
      tags: tags
    });

    // Ladda upp thumbnail till WordPress
    let featuredImageId = null;
    if (article.thumbnail) {
      console.log('📸 Laddar upp thumbnail...');
      const uploadResult = await aiEngine.uploadImageToWordPress(article.thumbnail);
      
      if (uploadResult.success) {
        featuredImageId = uploadResult.mediaId;
        console.log(`✅ Thumbnail uppladdad med ID: ${featuredImageId}`);
      } else {
        console.log('⚠️ Kunde inte ladda upp thumbnail:', uploadResult.error);
      }
    }

    // Mappa kategori till ID
    const categoryId = await mapCategoryNameToId(category);
    console.log(`📂 Mappar kategori "${category}" till ID: ${categoryId}`);

    // Mappa taggar till IDs
    const tagIds = await mapTagNamesToIds(tags);
    console.log(`🏷️ Mappar taggar till IDs:`, tagIds);

    // Förbereder data för WordPress
    const wordpressData = {
      title: title || article.title,
      content: content || article.content,
      status: publishStatus, // 'draft', 'publish', 'private'
      categories: [categoryId], // Använd category ID istället för namn
      tags: tagIds, // Använd tag IDs istället för namn
      excerpt: article.metaData.metaDescription,
      featured_media: featuredImageId, // Lägg till featured image
      meta: {
        '_yoast_wpseo_title': article.metaData.title,
        '_yoast_wpseo_metadesc': article.metaData.metaDescription,
        '_yoast_wpseo_focuskw': article.metaData.keywords[0],
        '_yoast_wpseo_meta-robots-noindex': '0',
        '_yoast_wpseo_meta-robots-nofollow': '0',
        '_yoast_wpseo_meta-robots-adv': 'none',
        '_yoast_wpseo_meta-robots-max-snippet': '-1',
        '_yoast_wpseo_meta-robots-max-image-preview': 'large',
        '_yoast_wpseo_meta-robots-max-video-preview': '-1'
      }
    };

    // Publicera till WordPress
    const publishedPost = await publishToWordPress(wordpressData);

    res.json({
      success: true,
      message: 'Nyhet genererad och publicerad framgångsrikt!',
      data: {
        postId: publishedPost.id,
        postUrl: publishedPost.link,
        title: publishedPost.title.rendered,
        status: publishedPost.status,
        seoData: article.seoData,
        metaData: article.metaData,
        internalLinks: article.internalLinks,
        relatedContent: article.relatedContent,
        thumbnail: article.thumbnail,
        featuredImageId: featuredImageId
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid publicering av nyhet:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte publicera nyhet',
      details: error.message
    });
  }
});

// Hjälpfunktion för att publicera till WordPress
async function publishToWordPress(postData) {
  const { config } = require('../config/api-keys');
  
  try {
    const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
    
    const response = await axios.post(`${config.wordpress.restApiUrl}/posts`, postData, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`✅ Artikel publicerad med ID: ${response.data.id}`);
    return response.data;
    
  } catch (error) {
    console.error('❌ Fel vid WordPress-publicering:', error.response?.data || error.message);
    throw new Error(`WordPress-publicering misslyckades: ${error.response?.data?.message || error.message}`);
  }
}

// Hjälpfunktion för att hämta WordPress-kategorier
async function getWordPressCategories() {
  const { config } = require('../config/api-keys');
  
  try {
    const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
    
    const response = await axios.get(`${config.wordpress.restApiUrl}/categories`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      params: {
        per_page: 100
      }
    });
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Fel vid hämtning av kategorier:', error.response?.data || error.message);
    return [];
  }
}

// Hjälpfunktion för att mappa kategorinamn till ID
async function mapCategoryNameToId(categoryName) {
  try {
    const categories = await getWordPressCategories();
    
    // Försök hitta exakt match
    const exactMatch = categories.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    
    if (exactMatch) {
      return exactMatch.id;
    }
    
    // Försök hitta partiell match
    const partialMatch = categories.find(cat => 
      cat.name.toLowerCase().includes(categoryName.toLowerCase()) ||
      categoryName.toLowerCase().includes(cat.name.toLowerCase())
    );
    
    if (partialMatch) {
      return partialMatch.id;
    }
    
    // Om ingen match hittas, använd standardkategorin (vanligtvis ID 1)
    console.log(`⚠️ Kategori "${categoryName}" hittades inte, använder standardkategori`);
    return 1;
    
  } catch (error) {
    console.error('❌ Fel vid mappning av kategori:', error.message);
    return 1; // Fallback till standardkategori
  }
}

// Hjälpfunktion för att hämta WordPress-taggar
async function getWordPressTags() {
  const { config } = require('../config/api-keys');
  
  try {
    const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
    
    const response = await axios.get(`${config.wordpress.restApiUrl}/tags`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      params: {
        per_page: 100
      }
    });
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Fel vid hämtning av taggar:', error.response?.data || error.message);
    return [];
  }
}

// Hjälpfunktion för att mappa tag-namn till IDs
async function mapTagNamesToIds(tagNames) {
  try {
    if (!tagNames || tagNames.length === 0) {
      return [];
    }
    
    const tags = await getWordPressTags();
    const tagIds = [];
    
    for (const tagName of tagNames) {
      // Försök hitta exakt match
      const exactMatch = tags.find(tag => 
        tag.name.toLowerCase() === tagName.toLowerCase()
      );
      
      if (exactMatch) {
        tagIds.push(exactMatch.id);
      } else {
        // Om taggen inte finns, skapa den
        const newTagId = await createWordPressTag(tagName);
        if (newTagId) {
          tagIds.push(newTagId);
        }
      }
    }
    
    return tagIds;
    
  } catch (error) {
    console.error('❌ Fel vid mappning av taggar:', error.message);
    return [];
  }
}

// Hjälpfunktion för att skapa ny tag
async function createWordPressTag(tagName) {
  const { config } = require('../config/api-keys');
  
  try {
    const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
    
    const response = await axios.post(`${config.wordpress.restApiUrl}/tags`, {
      name: tagName,
      slug: tagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    }, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`✅ Ny tag skapad: "${tagName}" med ID: ${response.data.id}`);
    return response.data.id;
    
  } catch (error) {
    console.error(`❌ Fel vid skapande av tag "${tagName}":`, error.response?.data || error.message);
    return null;
  }
}

// Hämta publicerade artiklar från ConceptSolutions.com
router.get('/published/articles', async (req, res) => {
  try {
    const { config } = require('../config/api-keys');
    const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');
    
    const response = await axios.get(`${config.wordpress.restApiUrl}/posts`, {
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
    
    res.json({
      success: true,
      data: {
        articles: response.data.map(post => ({
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered,
          link: post.link,
          date: post.date,
          modified: post.modified,
          status: post.status
        })),
        total: response.data.length
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid hämtning av artiklar:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte hämta publicerade artiklar'
    });
  }
});

// Generera och förhandsgranska nyhet (utan publicering)
router.post('/preview/news', async (req, res) => {
  try {
    const { topic, userIntent = {} } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        error: 'Ämne krävs',
        message: 'Skicka med ett ämne för att generera förhandsvisning'
      });
    }

    console.log('👁️ Genererar förhandsvisning av nyhet...');

    // Generera intelligent innehåll med SEO
    const article = await aiEngine.createIntelligentContentWithSEO(topic, {
      primary: 'trends_news',
      targetAudience: 'business',
      complexity: 'medium',
      ...userIntent
    });

    res.json({
      success: true,
      message: 'Förhandsvisning genererad framgångsrikt!',
      data: {
        title: article.title,
        content: article.content,
        seoData: article.seoData,
        metaData: article.metaData,
        internalLinks: article.internalLinks,
        relatedContent: article.relatedContent,
        altTexts: article.altTexts,
        schemaMarkup: article.schemaMarkup,
        wordCount: article.wordCount,
        readingTime: article.estimatedReadingTime,
        thumbnail: article.thumbnail
      },
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Fel vid generering av förhandsvisning:', error);
    res.status(500).json({
      error: 'Internt serverfel',
      message: 'Kunde inte generera förhandsvisning'
    });
  }
});

module.exports = router;
