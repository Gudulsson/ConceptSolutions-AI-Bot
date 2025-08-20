/**
 * AI Self-Improvement Engine för ConceptSolutions
 * Optimerad för GitHub Actions - standalone utan localhost beroenden
 */

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class AISelfImprovementEngine {
    constructor(options = {}) {
        this.learningLog = [];
        this.websiteKnowledge = {
            pages: [],
            products: [],
            categories: [],
            tags: [],
            contentPatterns: [],
            seoInsights: [],
            userBehavior: [],
            marketTrends: [],
            webSearchResults: [],
            keywordInsights: []
        };
        this.learningCycles = 0;
        this.startTime = new Date();
        this.isRunning = false;
        
        // Konfiguration från kommandoradsargument
        this.duration = options.duration || 4; // timmar (GitHub Actions max 6h)
        this.webSearch = options.webSearch !== false;
        this.publishArticles = options.publishArticles || false;
        
        // WordPress API konfiguration från miljövariabler
        this.wordpressUrl = process.env.WORDPRESS_URL;
        this.wordpressUsername = process.env.WORDPRESS_USERNAME;
        this.wordpressPassword = process.env.WORDPRESS_PASSWORD;
        this.woocommerceKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
        this.woocommerceSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
        this.openaiKey = process.env.OPENAI_API_KEY;
        this.serpapiKey = process.env.SERPAPI_KEY;
        
        this.searchKeywords = [
            'AI RFID solutions',
            'RFID technology trends 2025',
            'e-commerce automation',
            'digital transformation RFID',
            'IoT RFID applications',
            'machine learning RFID',
            'RFID inventory management',
            'AI business solutions',
            'RFID security systems',
            'automation technology trends'
        ];
    }

    async startSelfImprovementMode() {
        this.isRunning = true;
        console.log('🚀 STARTAR AI SJÄLVFÖRBÄTTRING MOTOR');
        console.log('=' .repeat(60));
        console.log(`⏱️  Körtid: ${this.duration} timmar`);
        console.log(`🌐 Webbsökning: ${this.webSearch ? 'AKTIV' : 'INAKTIV'}`);
        console.log(`📝 Publicera artiklar: ${this.publishArticles ? 'AKTIV' : 'INAKTIV'}`);
        console.log('AI:n kommer nu att arbeta kontinuerligt och lära sig allt om ConceptSolutions');
        console.log('Tryck Ctrl+C för att stoppa\n');
        
        const endTime = new Date(this.startTime.getTime() + (this.duration * 60 * 60 * 1000));
        
        while (this.isRunning && new Date() < endTime) {
            try {
                await this.runIntensiveLearningCycle();
                this.learningCycles++;
                
                // Visa progress var 5:e cykel
                if (this.learningCycles % 5 === 0) {
                    this.showProgress();
                }
                
                // Kortare paus för intensivt lärande
                await this.sleep(30000); // 30 sekunder mellan cykler
                
            } catch (error) {
                console.error('❌ Fel i lärandecykel:', error.message);
                await this.sleep(10000); // Kortare paus vid fel
            }
        }
        
        console.log(`\n⏰ Körtid på ${this.duration} timmar slutförd!`);
        await this.generateFinalReport();
    }

    async runIntensiveLearningCycle() {
        console.log(`🔄 Lärandecykel ${this.learningCycles + 1} - ${new Date().toLocaleTimeString()}`);
        
        // 1. Lär dig från hemsidans struktur
        await this.learnWebsiteStructure();
        
        // 2. Analysera befintligt innehåll
        await this.analyzeExistingContent();
        
        // 3. Lär dig från produkter och tjänster
        await this.learnFromProducts();
        
        // 4. Analysera SEO och prestanda
        await this.analyzeSEOAndPerformance();
        
        // 5. Webbsökning för sökord och teman (var 3:e cykel)
        if (this.webSearch && this.learningCycles % 3 === 0) {
            await this.searchWebForKeywords();
        }
        
        // 6. Identifiera förbättringsmöjligheter
        await this.identifyImprovementOpportunities();
        
        // 7. Skapa och testa förbättringar
        await this.createAndTestImprovements();
        
        // 8. Generera förbättrat innehåll (var 5:e cykel)
        if (this.learningCycles % 5 === 0) {
            await this.generateImprovedContent();
        }
        
        // 9. Uppdatera kunskapsbasen
        await this.updateKnowledgeBase();
        
        // 10. Generera insikter
        await this.generateInsights();
    }

    async learnWebsiteStructure() {
        try {
            console.log('📚 Lär dig från hemsidans struktur...');
            
            // Hämta sidor från WordPress
            const pagesResponse = await axios.get(`${this.wordpressUrl}/wp-json/wp/v2/pages`, {
                auth: {
                    username: this.wordpressUsername,
                    password: this.wordpressPassword
                },
                params: {
                    per_page: 100,
                    status: 'publish'
                }
            });
            
            this.websiteKnowledge.pages = pagesResponse.data.map(page => ({
                id: page.id,
                title: page.title.rendered,
                slug: page.slug,
                content: page.content.rendered,
                excerpt: page.excerpt.rendered,
                date: page.date,
                modified: page.modified,
                link: page.link
            }));
            
            console.log(`✅ Lärde sig från ${this.websiteKnowledge.pages.length} sidor`);
            
        } catch (error) {
            console.error('❌ Fel vid lärande av hemsidans struktur:', error.message);
        }
    }

    async analyzeExistingContent() {
        try {
            console.log('📊 Analyserar befintligt innehåll...');
            
            // Hämta blogginlägg från WordPress
            const postsResponse = await axios.get(`${this.wordpressUrl}/wp-json/wp/v2/posts`, {
                auth: {
                    username: this.wordpressUsername,
                    password: this.wordpressPassword
                },
                params: {
                    per_page: 100,
                    status: 'publish'
                }
            });
            
            const posts = postsResponse.data;
            
            // Analysera innehållsmönster
            const contentPatterns = {
                averageLength: 0,
                commonTopics: [],
                seoKeywords: [],
                internalLinks: [],
                externalLinks: []
            };
            
            let totalLength = 0;
            const topics = {};
            
            posts.forEach(post => {
                const content = post.content.rendered;
                totalLength += content.length;
                
                // Extrahera nyckelord från titel och innehåll
                const words = (post.title.rendered + ' ' + content)
                    .toLowerCase()
                    .replace(/<[^>]*>/g, '')
                    .split(/\s+/)
                    .filter(word => word.length > 3);
                
                words.forEach(word => {
                    topics[word] = (topics[word] || 0) + 1;
                });
            });
            
            contentPatterns.averageLength = totalLength / posts.length;
            contentPatterns.commonTopics = Object.entries(topics)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 20)
                .map(([topic, count]) => ({ topic, count }));
            
            this.websiteKnowledge.contentPatterns.push(contentPatterns);
            console.log(`✅ Analyserade ${posts.length} blogginlägg`);
            
        } catch (error) {
            console.error('❌ Fel vid analys av befintligt innehåll:', error.message);
        }
    }

    async learnFromProducts() {
        try {
            console.log('🛍️ Lär dig från produkter och tjänster...');
            
            // Hämta produkter från WooCommerce
            const productsResponse = await axios.get(`${this.wordpressUrl}/wp-json/wc/v3/products`, {
                auth: {
                    username: this.woocommerceKey,
                    password: this.woocommerceSecret
                },
                params: {
                    per_page: 100,
                    status: 'publish'
                }
            });
            
            this.websiteKnowledge.products = productsResponse.data.map(product => ({
                id: product.id,
                name: product.name,
                slug: product.slug,
                description: product.description,
                short_description: product.short_description,
                price: product.price,
                regular_price: product.regular_price,
                sale_price: product.sale_price,
                categories: product.categories,
                tags: product.tags,
                images: product.images,
                status: product.status
            }));
            
            console.log(`✅ Lärde sig från ${this.websiteKnowledge.products.length} produkter`);
            
        } catch (error) {
            console.error('❌ Fel vid lärande från produkter:', error.message);
        }
    }

    async analyzeSEOAndPerformance() {
        try {
            console.log('🔍 Analyserar SEO och prestanda...');
            
            const seoInsights = {
                timestamp: new Date().toISOString(),
                pagesAnalyzed: this.websiteKnowledge.pages.length,
                productsAnalyzed: this.websiteKnowledge.products.length,
                recommendations: []
            };
            
            // Analysera sidor för SEO
            this.websiteKnowledge.pages.forEach(page => {
                const content = page.content;
                const title = page.title;
                
                // Kontrollera meta beskrivningar
                if (!content.includes('meta name="description"')) {
                    seoInsights.recommendations.push({
                        type: 'meta_description',
                        page: page.title,
                        suggestion: 'Lägg till meta beskrivning för bättre SEO'
                    });
                }
                
                // Kontrollera rubriker
                if (!content.includes('<h1>') && !content.includes('<h2>')) {
                    seoInsights.recommendations.push({
                        type: 'headings',
                        page: page.title,
                        suggestion: 'Lägg till H1 och H2 rubriker för bättre struktur'
                    });
                }
            });
            
            this.websiteKnowledge.seoInsights.push(seoInsights);
            console.log(`✅ Genererade ${seoInsights.recommendations.length} SEO-rekommendationer`);
            
        } catch (error) {
            console.error('❌ Fel vid SEO-analys:', error.message);
        }
    }

    async searchWebForKeywords() {
        try {
            console.log('🌐 Söker på nätet efter sökord och teman...');
            
            if (!this.serpapiKey) {
                console.log('⚠️ SerpAPI nyckel saknas, hoppar över webbsökning');
                return;
            }
            
            const SerpApi = require('serpapi');
            const search = new SerpApi.SerpApiSearch({
                api_key: this.serpapiKey
            });
            
            for (const keyword of this.searchKeywords.slice(0, 3)) { // Begränsa till 3 sökningar
                try {
                    const results = await search.json({
                        q: keyword,
                        engine: 'google',
                        num: 10
                    });
                    
                    const searchResult = {
                        keyword: keyword,
                        timestamp: new Date().toISOString(),
                        results: results.organic_results?.slice(0, 5) || [],
                        related_keywords: results.related_questions || []
                    };
                    
                    this.websiteKnowledge.webSearchResults.push(searchResult);
                    console.log(`✅ Sökte efter "${keyword}" - hittade ${searchResult.results.length} resultat`);
                    
                    // Paus mellan sökningar för att undvika rate limiting
                    await this.sleep(2000);
                    
                } catch (searchError) {
                    console.error(`❌ Fel vid sökning efter "${keyword}":`, searchError.message);
                }
            }
            
        } catch (error) {
            console.error('❌ Fel vid webbsökning:', error.message);
        }
    }

    async identifyImprovementOpportunities() {
        try {
            console.log('🎯 Identifierar förbättringsmöjligheter...');
            
            const opportunities = {
                timestamp: new Date().toISOString(),
                contentGaps: [],
                seoOpportunities: [],
                productOpportunities: [],
                marketOpportunities: []
            };
            
            // Identifiera innehållsgap
            const existingTopics = new Set();
            this.websiteKnowledge.pages.forEach(page => {
                const words = page.title.toLowerCase().split(/\s+/);
                words.forEach(word => existingTopics.add(word));
            });
            
            // Jämför med sökresultat
            this.websiteKnowledge.webSearchResults.forEach(search => {
                search.results.forEach(result => {
                    const resultWords = result.title.toLowerCase().split(/\s+/);
                    resultWords.forEach(word => {
                        if (word.length > 3 && !existingTopics.has(word)) {
                            opportunities.contentGaps.push({
                                keyword: word,
                                source: search.keyword,
                                potential: 'high'
                            });
                        }
                    });
                });
            });
            
            // Ta bort duplicerade förslag
            opportunities.contentGaps = opportunities.contentGaps
                .filter((gap, index, self) => 
                    index === self.findIndex(g => g.keyword === gap.keyword)
                )
                .slice(0, 10);
            
            this.websiteKnowledge.improvementOpportunities = opportunities;
            console.log(`✅ Identifierade ${opportunities.contentGaps.length} innehållsgap`);
            
        } catch (error) {
            console.error('❌ Fel vid identifiering av förbättringsmöjligheter:', error.message);
        }
    }

    async createAndTestImprovements() {
        try {
            console.log('🔧 Skapar och testar förbättringar...');
            
            // Generera förbättringsförslag baserat på analys
            const improvements = {
                timestamp: new Date().toISOString(),
                contentSuggestions: [],
                seoSuggestions: [],
                technicalSuggestions: []
            };
            
            // Innehållsförslag baserat på gap
            if (this.websiteKnowledge.improvementOpportunities?.contentGaps) {
                this.websiteKnowledge.improvementOpportunities.contentGaps.forEach(gap => {
                    improvements.contentSuggestions.push({
                        type: 'new_article',
                        topic: gap.keyword,
                        title: `Vad du behöver veta om ${gap.keyword}`,
                        description: `En djupgående guide om ${gap.keyword} och dess betydelse för din verksamhet`,
                        priority: gap.potential === 'high' ? 'high' : 'medium'
                    });
                });
            }
            
            // SEO-förslag
            improvements.seoSuggestions.push({
                type: 'meta_optimization',
                description: 'Optimera meta beskrivningar för alla sidor',
                impact: 'high'
            });
            
            improvements.seoSuggestions.push({
                type: 'internal_linking',
                description: 'Förbättra intern länkning mellan relaterade sidor',
                impact: 'medium'
            });
            
            // Tekniska förslag
            improvements.technicalSuggestions.push({
                type: 'page_speed',
                description: 'Optimera bildstorlekar och caching',
                impact: 'high'
            });
            
            this.websiteKnowledge.improvements = improvements;
            console.log(`✅ Skapade ${improvements.contentSuggestions.length} innehållsförslag`);
            
        } catch (error) {
            console.error('❌ Fel vid skapande av förbättringar:', error.message);
        }
    }

    async generateImprovedContent() {
        try {
            console.log('✍️ Genererar förbättrat innehåll...');
            
            if (!this.openaiKey) {
                console.log('⚠️ OpenAI API nyckel saknas, hoppar över innehållsgenerering');
                return;
            }
            
            // Välj ett förslag att arbeta med
            const suggestions = this.websiteKnowledge.improvements?.contentSuggestions || [];
            if (suggestions.length === 0) {
                console.log('⚠️ Inga innehållsförslag tillgängliga');
                return;
            }
            
            const selectedSuggestion = suggestions[0]; // Ta första förslaget
            
            // Generera innehåll med OpenAI
            const prompt = `Skriv en SEO-optimerad bloggartikel om "${selectedSuggestion.topic}" för ConceptSolutions. 
            Artikeln ska vara informativ, engagerande och innehålla praktiska tips. 
            Längd: 800-1200 ord. Inkludera H2 och H3 rubriker.`;
            
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Du är en expert på att skriva SEO-optimerade bloggartiklar för företag inom teknologi och automation.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${this.openaiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            
            const generatedContent = response.data.choices[0].message.content;
            
            // Spara genererat innehåll
            const contentFile = {
                timestamp: new Date().toISOString(),
                topic: selectedSuggestion.topic,
                title: selectedSuggestion.title,
                content: generatedContent,
                status: 'draft'
            };
            
            // Skapa generated-content mapp om den inte finns
            try {
                await fs.mkdir('generated-content', { recursive: true });
            } catch (error) {
                // Mappen finns redan
            }
            
            await fs.writeFile(
                `generated-content/${selectedSuggestion.topic.replace(/\s+/g, '-')}.json`,
                JSON.stringify(contentFile, null, 2)
            );
            
            console.log(`✅ Genererade innehåll för "${selectedSuggestion.topic}"`);
            
        } catch (error) {
            console.error('❌ Fel vid generering av innehåll:', error.message);
        }
    }

    async updateKnowledgeBase() {
        try {
            console.log('💾 Uppdaterar kunskapsbasen...');
            
            // Spara all kunskap till fil
            const knowledgeBase = {
                lastUpdated: new Date().toISOString(),
                learningCycles: this.learningCycles,
                websiteKnowledge: this.websiteKnowledge,
                learningLog: this.learningLog.slice(-100) // Spara bara senaste 100 loggar
            };
            
            await fs.writeFile('ai-knowledge-base.json', JSON.stringify(knowledgeBase, null, 2));
            
            // Uppdatera förbättringslogg
            const improvementLog = {
                timestamp: new Date().toISOString(),
                cycle: this.learningCycles,
                insights: this.websiteKnowledge.improvements || {},
                webSearchResults: this.websiteKnowledge.webSearchResults.slice(-5) // Senaste 5
            };
            
            let existingLog = [];
            try {
                const logContent = await fs.readFile('ai-improvement-log.json', 'utf8');
                existingLog = JSON.parse(logContent);
            } catch (error) {
                // Filen finns inte än
            }
            
            existingLog.push(improvementLog);
            await fs.writeFile('ai-improvement-log.json', JSON.stringify(existingLog, null, 2));
            
            console.log('✅ Kunskapsbasen uppdaterad');
            
        } catch (error) {
            console.error('❌ Fel vid uppdatering av kunskapsbasen:', error.message);
        }
    }

    async generateInsights() {
        try {
            console.log('🧠 Genererar insikter...');
            
            const insights = {
                timestamp: new Date().toISOString(),
                cycle: this.learningCycles,
                keyFindings: [],
                recommendations: [],
                trends: []
            };
            
            // Analysera trender från webbsökningar
            if (this.websiteKnowledge.webSearchResults.length > 0) {
                const recentSearches = this.websiteKnowledge.webSearchResults.slice(-3);
                insights.trends = recentSearches.map(search => ({
                    keyword: search.keyword,
                    resultCount: search.results.length,
                    topResult: search.results[0]?.title || 'Inga resultat'
                }));
            }
            
            // Generera rekommendationer
            if (this.websiteKnowledge.improvements?.contentSuggestions) {
                insights.recommendations = this.websiteKnowledge.improvements.contentSuggestions
                    .slice(0, 3)
                    .map(suggestion => ({
                        type: 'content',
                        priority: suggestion.priority,
                        description: suggestion.description
                    }));
            }
            
            // Lägg till insikten i kunskapsbasen
            this.websiteKnowledge.insights = insights;
            
            console.log(`✅ Genererade ${insights.recommendations.length} rekommendationer`);
            
        } catch (error) {
            console.error('❌ Fel vid generering av insikter:', error.message);
        }
    }

    showProgress() {
        const elapsed = (new Date() - this.startTime) / 1000 / 60; // minuter
        const progress = (elapsed / (this.duration * 60)) * 100;
        
        console.log('\n📊 PROGRESS RAPPORT');
        console.log('=' .repeat(40));
        console.log(`⏱️  Körtid: ${elapsed.toFixed(1)} minuter av ${this.duration * 60} minuter`);
        console.log(`📈 Progress: ${progress.toFixed(1)}%`);
        console.log(`🔄 Cykler: ${this.learningCycles}`);
        console.log(`📚 Sidor analyserade: ${this.websiteKnowledge.pages.length}`);
        console.log(`🛍️ Produkter analyserade: ${this.websiteKnowledge.products.length}`);
        console.log(`🌐 Webbsökningar: ${this.websiteKnowledge.webSearchResults.length}`);
        console.log(`💡 Förbättringsförslag: ${this.websiteKnowledge.improvements?.contentSuggestions?.length || 0}`);
        console.log('=' .repeat(40) + '\n');
    }

    async generateFinalReport() {
        try {
            console.log('📋 Genererar slutrapport...');
            
            const report = {
                generatedAt: new Date().toISOString(),
                summary: {
                    totalCycles: this.learningCycles,
                    duration: `${this.duration} timmar`,
                    pagesAnalyzed: this.websiteKnowledge.pages.length,
                    productsAnalyzed: this.websiteKnowledge.products.length,
                    webSearches: this.websiteKnowledge.webSearchResults.length,
                    contentSuggestions: this.websiteKnowledge.improvements?.contentSuggestions?.length || 0
                },
                keyInsights: this.websiteKnowledge.insights || {},
                recommendations: this.websiteKnowledge.improvements || {},
                webSearchResults: this.websiteKnowledge.webSearchResults,
                contentPatterns: this.websiteKnowledge.contentPatterns
            };
            
            await fs.writeFile('ai-learning-report.json', JSON.stringify(report, null, 2));
            
            // Generera markdown rapport
            let markdownReport = `# 🤖 AI Learning Report - ConceptSolutions\n\n`;
            markdownReport += `**Genererad:** ${new Date().toLocaleString('sv-SE')}\n`;
            markdownReport += `**Körtid:** ${this.duration} timmar\n`;
            markdownReport += `**Lärandecykler:** ${this.learningCycles}\n\n`;
            
            markdownReport += `## 📊 Sammanfattning\n\n`;
            markdownReport += `- **Sidor analyserade:** ${report.summary.pagesAnalyzed}\n`;
            markdownReport += `- **Produkter analyserade:** ${report.summary.productsAnalyzed}\n`;
            markdownReport += `- **Webbsökningar:** ${report.summary.webSearches}\n`;
            markdownReport += `- **Innehållsförslag:** ${report.summary.contentSuggestions}\n\n`;
            
            if (report.recommendations.contentSuggestions) {
                markdownReport += `## 💡 Rekommendationer\n\n`;
                report.recommendations.contentSuggestions.forEach((suggestion, index) => {
                    markdownReport += `${index + 1}. **${suggestion.topic}** (${suggestion.priority})\n`;
                    markdownReport += `   - ${suggestion.description}\n\n`;
                });
            }
            
            await fs.writeFile('AI-LEARNING-REPORT.md', markdownReport);
            
            console.log('✅ Slutrapport genererad: ai-learning-report.json och AI-LEARNING-REPORT.md');
            
        } catch (error) {
            console.error('❌ Fel vid generering av slutrapport:', error.message);
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Huvudfunktion för att köra motorn
async function main() {
    // Parse command line arguments
    const args = process.argv.slice(2);
    const options = {};
    
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        const value = args[i + 1];
        
        if (key === 'duration') {
            options.duration = parseInt(value);
        } else if (key === 'web-search') {
            options.webSearch = value === 'true';
        } else if (key === 'publish') {
            options.publishArticles = value === 'true';
        }
    }
    
    const engine = new AISelfImprovementEngine(options);
    
    // Hantera process avslut
    process.on('SIGINT', () => {
        console.log('\n🛑 Stoppar AI Learning Engine...');
        engine.isRunning = false;
        process.exit(0);
    });
    
    try {
        await engine.startSelfImprovementMode();
    } catch (error) {
        console.error('❌ Kritiskt fel i AI Learning Engine:', error);
        process.exit(1);
    }
}

// Kör motorn om filen körs direkt
if (require.main === module) {
    main();
}

module.exports = AISelfImprovementEngine;
