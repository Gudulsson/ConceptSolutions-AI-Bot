/**
 * AI Self-Improvement Engine för ConceptSolutions
 * Kontinuerlig analys och förbättring av AI-modellens innehållsgenerering
 */

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class AISelfImprovementEngine {
    constructor() {
        this.apiBaseUrl = 'http://localhost:3000/api';
        this.improvementLog = [];
        this.analysisResults = [];
        this.contentQualityMetrics = {
            wordCount: { min: 800, optimal: 1200, max: 2000 },
            readability: { min: 60, optimal: 75, max: 90 },
            seoScore: { min: 70, optimal: 85, max: 95 },
            internalLinks: { min: 3, optimal: 5, max: 8 },
            structure: { min: 0.7, optimal: 0.85, max: 0.95 }
        };
    }

    async startSelfImprovementMode() {
        console.log('🚀 Startar AI Självförbättringsläge...');
        console.log('📊 Kontinuerlig analys och optimering av innehållsgenerering');
        
        while (true) {
            try {
                await this.runImprovementCycle();
                await this.sleep(30000); // 30 sekunder mellan cykler
            } catch (error) {
                console.error('❌ Fel i förbättringscykel:', error.message);
                await this.sleep(10000); // Kortare paus vid fel
            }
        }
    }

    async runImprovementCycle() {
        console.log('\n🔄 Kör förbättringscykel...');
        
        // 1. Analysera befintligt innehåll
        const contentAnalysis = await this.analyzeExistingContent();
        
        // 2. Identifiera förbättringsområden
        const improvementAreas = await this.identifyImprovementAreas(contentAnalysis);
        
        // 3. Generera förbättringsförslag
        const improvements = await this.generateImprovementSuggestions(improvementAreas);
        
        // 4. Testa förbättringar
        await this.testImprovements(improvements);
        
        // 5. Uppdatera AI-modellen
        await this.updateAIModel(improvements);
        
        // 6. Logga resultat
        await this.logImprovementResults(improvements);
    }

    async analyzeExistingContent() {
        console.log('📖 Analyserar befintligt innehåll...');
        
        try {
            // Hämta alla artiklar
            const publishedPosts = await this.fetchPosts('publish');
            const draftPosts = await this.fetchPosts('draft');
            
            const analysis = {
                totalArticles: publishedPosts.length + draftPosts.length,
                publishedArticles: publishedPosts.length,
                draftArticles: draftPosts.length,
                qualityMetrics: [],
                issues: [],
                strengths: []
            };

            // Analysera varje artikel
            for (const post of [...publishedPosts, ...draftPosts]) {
                const metrics = await this.analyzeArticleQuality(post);
                analysis.qualityMetrics.push(metrics);
                
                if (metrics.overallScore < 0.6) {
                    analysis.issues.push({
                        postId: post.id,
                        title: post.title.rendered,
                        issues: metrics.issues
                    });
                } else if (metrics.overallScore > 0.8) {
                    analysis.strengths.push({
                        postId: post.id,
                        title: post.title.rendered,
                        strengths: metrics.strengths
                    });
                }
            }

            return analysis;
        } catch (error) {
            console.error('❌ Fel vid innehållsanalys:', error.message);
            return null;
        }
    }

    async analyzeArticleQuality(post) {
        const content = post.content.rendered;
        const title = post.title.rendered;
        
        // Räkna ord
        const wordCount = this.countWords(content);
        
        // Analysera läsbarhet
        const readability = this.calculateReadability(content);
        
        // Analysera SEO
        const seoScore = this.analyzeSEO(content, title);
        
        // Analysera struktur
        const structure = this.analyzeStructure(content);
        
        // Analysera interna länkar
        const internalLinks = this.countInternalLinks(content);
        
        // Beräkna total poäng
        const overallScore = this.calculateOverallScore({
            wordCount,
            readability,
            seoScore,
            structure,
            internalLinks
        });

        // Identifiera problem
        const issues = this.identifyIssues({
            wordCount,
            readability,
            seoScore,
            structure,
            internalLinks
        });

        // Identifiera styrkor
        const strengths = this.identifyStrengths({
            wordCount,
            readability,
            seoScore,
            structure,
            internalLinks
        });

        return {
            postId: post.id,
            title,
            wordCount,
            readability,
            seoScore,
            structure,
            internalLinks,
            overallScore,
            issues,
            strengths
        };
    }

    countWords(text) {
        // Ta bort HTML-taggar och räkna ord
        const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        return cleanText.split(' ').length;
    }

    calculateReadability(text) {
        // Flesch Reading Ease för svenska (förenklad version)
        const sentences = text.split(/[.!?]+/).length;
        const words = this.countWords(text);
        const syllables = this.countSyllables(text);
        
        if (sentences === 0 || words === 0) return 0;
        
        const score = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
        return Math.max(0, Math.min(100, score));
    }

    countSyllables(text) {
        // Förenklad räkning av stavelser för svenska
        const vowels = text.match(/[aeiouyåäö]/gi);
        return vowels ? vowels.length : 0;
    }

    analyzeSEO(content, title) {
        let score = 0;
        const checks = [];

        // Kontrollera titellängd
        if (title.length >= 30 && title.length <= 60) {
            score += 20;
            checks.push('Titellängd optimal');
        } else {
            checks.push('Titellängd behöver justeras');
        }

        // Kontrollera H1-H6 struktur
        const headings = content.match(/<h[1-6][^>]*>/gi);
        if (headings && headings.length >= 2) {
            score += 20;
            checks.push('Rubrikstruktur bra');
        } else {
            checks.push('Rubrikstruktur behöver förbättras');
        }

        // Kontrollera interna länkar
        const links = content.match(/<a[^>]*href[^>]*>/gi);
        if (links && links.length >= 3) {
            score += 20;
            checks.push('Interna länkar tillräckliga');
        } else {
            checks.push('Fler interna länkar behövs');
        }

        // Kontrollera bilder med alt-text
        const images = content.match(/<img[^>]*>/gi);
        const imagesWithAlt = content.match(/<img[^>]*alt[^>]*>/gi);
        if (images && imagesWithAlt && imagesWithAlt.length >= images.length * 0.8) {
            score += 20;
            checks.push('Bilder har alt-text');
        } else {
            checks.push('Bilder saknar alt-text');
        }

        // Kontrollera innehållslängd
        if (this.countWords(content) >= 800) {
            score += 20;
            checks.push('Innehållslängd tillräcklig');
        } else {
            checks.push('Innehållslängd för kort');
        }

        return { score, checks };
    }

    analyzeStructure(content) {
        let score = 0;
        const issues = [];

        // Kontrollera HTML-struktur
        if (content.includes('<h1>') || content.includes('<h2>')) {
            score += 0.3;
        } else {
            issues.push('Saknar huvudrubriker');
        }

        if (content.includes('<p>')) {
            score += 0.2;
        } else {
            issues.push('Saknar stycken');
        }

        if (content.includes('<ul>') || content.includes('<ol>')) {
            score += 0.2;
        } else {
            issues.push('Saknar listor');
        }

        if (content.includes('<strong>') || content.includes('<em>')) {
            score += 0.2;
        } else {
            issues.push('Saknar betoning');
        }

        if (!content.includes('&lt;') && !content.includes('&gt;')) {
            score += 0.1;
        } else {
            issues.push('Innehåller HTML-kod som ska visas');
        }

        return { score, issues };
    }

    countInternalLinks(content) {
        const links = content.match(/<a[^>]*href[^>]*>/gi);
        if (!links) return 0;
        
        let internalCount = 0;
        links.forEach(link => {
            if (link.includes('conceptsolutions.se') || link.includes('/produkt/') || link.includes('/tjanster/')) {
                internalCount++;
            }
        });
        
        return internalCount;
    }

    calculateOverallScore(metrics) {
        const weights = {
            wordCount: 0.2,
            readability: 0.2,
            seoScore: 0.3,
            structure: 0.2,
            internalLinks: 0.1
        };

        let score = 0;
        
        // Word count score
        const wordCountScore = Math.min(1, metrics.wordCount / this.contentQualityMetrics.wordCount.optimal);
        score += wordCountScore * weights.wordCount;
        
        // Readability score
        const readabilityScore = metrics.readability / 100;
        score += readabilityScore * weights.readability;
        
        // SEO score
        const seoScore = metrics.seoScore.score / 100;
        score += seoScore * weights.seoScore;
        
        // Structure score
        score += metrics.structure.score * weights.structure;
        
        // Internal links score
        const linkScore = Math.min(1, metrics.internalLinks / this.contentQualityMetrics.internalLinks.optimal);
        score += linkScore * weights.internalLinks;

        return score;
    }

    identifyIssues(metrics) {
        const issues = [];
        
        if (metrics.wordCount < this.contentQualityMetrics.wordCount.min) {
            issues.push(`För få ord (${metrics.wordCount}/${this.contentQualityMetrics.wordCount.min})`);
        }
        
        if (metrics.readability < this.contentQualityMetrics.readability.min) {
            issues.push(`Låg läsbarhet (${Math.round(metrics.readability)}/${this.contentQualityMetrics.readability.min})`);
        }
        
        if (metrics.seoScore.score < this.contentQualityMetrics.seoScore.min) {
            issues.push(`Lågt SEO-värde (${metrics.seoScore.score}/${this.contentQualityMetrics.seoScore.min})`);
        }
        
        if (metrics.structure.score < this.contentQualityMetrics.structure.min) {
            issues.push(`Dålig struktur (${Math.round(metrics.structure.score * 100)}/${this.contentQualityMetrics.structure.min * 100})`);
        }
        
        if (metrics.internalLinks < this.contentQualityMetrics.internalLinks.min) {
            issues.push(`För få interna länkar (${metrics.internalLinks}/${this.contentQualityMetrics.internalLinks.min})`);
        }

        return issues;
    }

    identifyStrengths(metrics) {
        const strengths = [];
        
        if (metrics.wordCount >= this.contentQualityMetrics.wordCount.optimal) {
            strengths.push(`Bra innehållslängd (${metrics.wordCount} ord)`);
        }
        
        if (metrics.readability >= this.contentQualityMetrics.readability.optimal) {
            strengths.push(`Hög läsbarhet (${Math.round(metrics.readability)})`);
        }
        
        if (metrics.seoScore.score >= this.contentQualityMetrics.seoScore.optimal) {
            strengths.push(`Utmärkt SEO (${metrics.seoScore.score})`);
        }
        
        if (metrics.structure.score >= this.contentQualityMetrics.structure.optimal) {
            strengths.push(`Bra struktur (${Math.round(metrics.structure.score * 100)}%)`);
        }
        
        if (metrics.internalLinks >= this.contentQualityMetrics.internalLinks.optimal) {
            strengths.push(`Bra interna länkning (${metrics.internalLinks} länkar)`);
        }

        return strengths;
    }

    async identifyImprovementAreas(analysis) {
        console.log('🎯 Identifierar förbättringsområden...');
        
        if (!analysis) return [];

        const improvementAreas = [];

        // Analysera vanliga problem
        const commonIssues = this.findCommonIssues(analysis.qualityMetrics);
        
        // Identifiera mönster i lågkvalitetsartiklar
        const lowQualityPatterns = this.analyzeLowQualityPatterns(analysis.issues);
        
        // Identifiera framgångsfaktorer
        const successFactors = this.analyzeSuccessFactors(analysis.strengths);

        improvementAreas.push({
            type: 'common_issues',
            issues: commonIssues,
            priority: 'high'
        });

        improvementAreas.push({
            type: 'low_quality_patterns',
            patterns: lowQualityPatterns,
            priority: 'high'
        });

        improvementAreas.push({
            type: 'success_factors',
            factors: successFactors,
            priority: 'medium'
        });

        return improvementAreas;
    }

    findCommonIssues(qualityMetrics) {
        const issueCounts = {};
        
        qualityMetrics.forEach(metric => {
            metric.issues.forEach(issue => {
                issueCounts[issue] = (issueCounts[issue] || 0) + 1;
            });
        });

        return Object.entries(issueCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([issue, count]) => ({ issue, count }));
    }

    analyzeLowQualityPatterns(issues) {
        const patterns = {
            shortContent: 0,
            poorStructure: 0,
            missingLinks: 0,
            htmlErrors: 0,
            genericContent: 0
        };

        issues.forEach(issue => {
            if (issue.issues.some(i => i.includes('För få ord'))) patterns.shortContent++;
            if (issue.issues.some(i => i.includes('Dålig struktur'))) patterns.poorStructure++;
            if (issue.issues.some(i => i.includes('interna länkar'))) patterns.missingLinks++;
            if (issue.issues.some(i => i.includes('HTML-kod'))) patterns.htmlErrors++;
            if (issue.issues.some(i => i.includes('generisk'))) patterns.genericContent++;
        });

        return patterns;
    }

    analyzeSuccessFactors(strengths) {
        const factorCounts = {};
        
        strengths.forEach(strength => {
            strength.strengths.forEach(s => {
                factorCounts[s] = (factorCounts[s] || 0) + 1;
            });
        });

        return Object.entries(factorCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([factor, count]) => ({ factor, count }));
    }

    async generateImprovementSuggestions(improvementAreas) {
        console.log('💡 Genererar förbättringsförslag...');
        
        const suggestions = [];

        for (const area of improvementAreas) {
            switch (area.type) {
                case 'common_issues':
                    suggestions.push(...this.generateIssueFixes(area.issues));
                    break;
                case 'low_quality_patterns':
                    suggestions.push(...this.generatePatternFixes(area.patterns));
                    break;
                case 'success_factors':
                    suggestions.push(...this.generateSuccessReplications(area.factors));
                    break;
            }
        }

        return suggestions;
    }

    generateIssueFixes(issues) {
        const fixes = [];
        
        issues.forEach(({ issue, count }) => {
            if (issue.includes('För få ord')) {
                fixes.push({
                    type: 'content_length',
                    description: 'Öka innehållslängden till minst 800 ord',
                    implementation: 'Uppdatera generateSampleContent för att skapa längre innehåll',
                    priority: 'high'
                });
            }
            
            if (issue.includes('Dålig struktur')) {
                fixes.push({
                    type: 'content_structure',
                    description: 'Förbättra HTML-struktur med korrekta rubriker och stycken',
                    implementation: 'Uppdatera content generation för att använda korrekt HTML',
                    priority: 'high'
                });
            }
            
            if (issue.includes('interna länkar')) {
                fixes.push({
                    type: 'internal_linking',
                    description: 'Lägg till fler relevanta interna länkar',
                    implementation: 'Förbättra generateInternalLinks funktionen',
                    priority: 'medium'
                });
            }
        });

        return fixes;
    }

    generatePatternFixes(patterns) {
        const fixes = [];
        
        if (patterns.htmlErrors > 0) {
            fixes.push({
                type: 'html_validation',
                description: 'Fixera HTML-kodning i innehåll',
                implementation: 'Lägg till HTML-sanitering i content generation',
                priority: 'high'
            });
        }
        
        if (patterns.genericContent > 0) {
            fixes.push({
                type: 'content_specificity',
                description: 'Gör innehållet mer specifikt och relevant',
                implementation: 'Förbättra topic analysis och content personalization',
                priority: 'high'
            });
        }

        return fixes;
    }

    generateSuccessReplications(factors) {
        const replications = [];
        
        factors.forEach(({ factor, count }) => {
            if (factor.includes('Bra innehållslängd')) {
                replications.push({
                    type: 'replicate_length',
                    description: 'Replikera framgångsrik innehållslängd',
                    implementation: 'Använd samma längdstrategi för nya artiklar',
                    priority: 'medium'
                });
            }
            
            if (factor.includes('Bra struktur')) {
                replications.push({
                    type: 'replicate_structure',
                    description: 'Replikera framgångsrik struktur',
                    implementation: 'Använd samma strukturmönster för nya artiklar',
                    priority: 'medium'
                });
            }
        });

        return replications;
    }

    async testImprovements(suggestions) {
        console.log('🧪 Testar förbättringar...');
        
        for (const suggestion of suggestions) {
            if (suggestion.priority === 'high') {
                await this.testSuggestion(suggestion);
            }
        }
    }

    async testSuggestion(suggestion) {
        console.log(`🔬 Testar: ${suggestion.description}`);
        
        try {
            // Skapa en testartikel med förbättringen
            const testArticle = await this.generateTestArticle(suggestion);
            
            // Analysera kvaliteten
            const quality = await this.analyzeArticleQuality(testArticle);
            
            // Logga resultatet
            this.improvementLog.push({
                timestamp: new Date(),
                suggestion,
                testResult: quality,
                success: quality.overallScore > 0.7
            });
            
            console.log(`✅ Test resultat: ${Math.round(quality.overallScore * 100)}% kvalitet`);
            
        } catch (error) {
            console.error(`❌ Test misslyckades: ${error.message}`);
        }
    }

    async generateTestArticle(suggestion) {
        // Simulera en testartikel baserad på förbättringsförslaget
        const testTopics = [
            'AI och framtidens e-handel',
            'RFID-teknik för företag',
            'Interaktiva lekgolv',
            'Digital transformation'
        ];
        
        const randomTopic = testTopics[Math.floor(Math.random() * testTopics.length)];
        
        return {
            id: 'test-' + Date.now(),
            title: { rendered: `Test: ${randomTopic}` },
            content: { rendered: this.generateImprovedContent(randomTopic, suggestion) }
        };
    }

    generateImprovedContent(topic, suggestion) {
        let content = '';
        
        switch (suggestion.type) {
            case 'content_length':
                content = this.generateLongerContent(topic);
                break;
            case 'content_structure':
                content = this.generateStructuredContent(topic);
                break;
            case 'internal_linking':
                content = this.generateContentWithLinks(topic);
                break;
            default:
                content = this.generateStandardContent(topic);
        }
        
        return content;
    }

    generateLongerContent(topic) {
        return `
            <h2>${topic} - En komplett guide</h2>
            <p>I denna omfattande artikel kommer vi att utforska alla aspekter av ${topic} och hur det påverkar moderna företag. Vi kommer att täcka både tekniska aspekter och praktiska implementationer.</p>
            
            <h3>Vad är ${topic}?</h3>
            <p>${topic} representerar en revolutionerande förändring inom teknologi och affärsmodeller. Det är inte bara en trend utan en fundamental förändring av hur vi arbetar och levererar värde till våra kunder.</p>
            
            <h3>Fördelar med ${topic}</h3>
            <ul>
                <li><strong>Effektivitet:</strong> Automatisering av manuella processer</li>
                <li><strong>Skalbarhet:</strong> Möjlighet att hantera större volymer</li>
                <li><strong>Kostnadsbesparing:</strong> Reducering av operativa kostnader</li>
                <li><strong>Kundnöjdhet:</strong> Förbättrad kundupplevelse</li>
            </ul>
            
            <h3>Implementation av ${topic}</h3>
            <p>För att framgångsrikt implementera ${topic} krävs en strategisk approach. Det börjar med en grundlig analys av nuvarande processer och identifiering av förbättringsområden.</p>
            
            <h3>Framtida utveckling</h3>
            <p>${topic} kommer att fortsätta utvecklas och integreras med andra teknologier som AI, IoT och 5G. Detta skapar nya möjligheter för innovation och tillväxt.</p>
            
            <h3>Slutsats</h3>
            <p>${topic} är inte bara en teknisk lösning utan en strategisk investering i framtiden. Företag som omfamnar denna förändring kommer att vara bättre positionerade för framgång i den digitala ekonomin.</p>
        `;
    }

    generateStructuredContent(topic) {
        return `
            <h1>${topic} - Komplett översikt</h1>
            
            <p>Välkommen till vår djupgående guide om ${topic}. I denna artikel kommer vi att utforska alla viktiga aspekter av detta ämne.</p>
            
            <h2>Grunderna i ${topic}</h2>
            <p>För att förstå ${topic} behöver vi förstå grundprinciperna. Det handlar om att skapa värde genom innovation och effektivitet.</p>
            
            <h3>Tekniska aspekter</h3>
            <p>Den tekniska implementationen av ${topic} kräver noggrann planering och expertis. Vi behöver överväga flera faktorer:</p>
            
            <ul>
                <li>Systemarkitektur</li>
                <li>Integration med befintliga system</li>
                <li>Säkerhet och compliance</li>
                <li>Skalbarhet och prestanda</li>
            </ul>
            
            <h3>Affärsmodeller</h3>
            <p>${topic} påverkar inte bara tekniken utan också hur vi driver våra affärer. Det skapar nya möjligheter för:</p>
            
            <ol>
                <li>Kostnadsreducering</li>
                <li>Intäktsökning</li>
                <li>Kundnöjdhet</li>
                <li>Marknadsandel</li>
            </ol>
            
            <h2>Framtidsutsikter</h2>
            <p>${topic} kommer att fortsätta utvecklas och kommer att spela en avgörande roll i framtidens digitala ekonomi.</p>
        `;
    }

    generateContentWithLinks(topic) {
        return `
            <h2>${topic} - En guide med relevanta länkar</h2>
            
            <p>I denna artikel utforskar vi ${topic} och dess påverkan på moderna företag. Läs mer om våra <a href="/produkt/rfid-lasare/">RFID-lösningar</a> för att se hur vi kan hjälpa dig.</p>
            
            <h3>Varför ${topic} är viktigt</h3>
            <p>${topic} representerar en viktig förändring inom teknologi. Våra <a href="/tjanster/konsultation/">konsulttjänster</a> hjälper företag att navigera denna förändring.</p>
            
            <h3>Implementation</h3>
            <p>För att implementera ${topic} behöver du rätt verktyg. Kolla in våra <a href="/produkt/interaktiva-lekgolv/">interaktiva lösningar</a> som kan hjälpa dig komma igång.</p>
            
            <h3>Support och hjälp</h3>
            <p>Behöver du hjälp med ${topic}? Vårt <a href="/kontakta-oss/">supportteam</a> är här för att hjälpa dig genom hela processen.</p>
        `;
    }

    generateStandardContent(topic) {
        return `
            <h2>${topic}</h2>
            <p>${topic} är ett viktigt ämne inom modern teknologi och affärsutveckling. Det representerar en förändring i hur vi arbetar och levererar värde.</p>
            <p>För att framgångsrikt implementera ${topic} krävs strategisk planering och expertis. Vi hjälper företag att navigera denna förändring.</p>
        `;
    }

    async updateAIModel(improvements) {
        console.log('🔄 Uppdaterar AI-modell...');
        
        // Här skulle vi normalt uppdatera AI-modellens parametrar
        // För nu loggar vi bara förbättringarna
        this.analysisResults.push({
            timestamp: new Date(),
            improvements,
            summary: this.generateImprovementSummary(improvements)
        });
    }

    generateImprovementSummary(improvements) {
        const highPriority = improvements.filter(i => i.priority === 'high').length;
        const mediumPriority = improvements.filter(i => i.priority === 'medium').length;
        
        return {
            totalImprovements: improvements.length,
            highPriority,
            mediumPriority,
            estimatedImpact: highPriority > 0 ? 'Hög' : 'Medium'
        };
    }

    async logImprovementResults(improvements) {
        console.log('📝 Loggar förbättringsresultat...');
        
        const logEntry = {
            timestamp: new Date(),
            improvements,
            summary: this.generateImprovementSummary(improvements)
        };

        // Spara till fil
        const logFile = path.join(__dirname, 'ai-improvement-log.json');
        let logs = [];
        
        try {
            const existingLogs = await fs.readFile(logFile, 'utf8');
            logs = JSON.parse(existingLogs);
        } catch (error) {
            // Filen finns inte eller är tom
        }
        
        logs.push(logEntry);
        
        await fs.writeFile(logFile, JSON.stringify(logs, null, 2));
        
        console.log(`✅ Förbättringsresultat loggade. Totalt: ${improvements.length} förbättringar`);
    }

    async fetchPosts(status = 'publish') {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/wordpress/posts?status=${status}`);
            return response.data;
        } catch (error) {
            console.error(`❌ Fel vid hämtning av ${status} artiklar:`, error.message);
            return [];
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Statistik och rapporter
    async generateImprovementReport() {
        console.log('📊 Genererar förbättringsrapport...');
        
        const report = {
            timestamp: new Date(),
            totalCycles: this.improvementLog.length,
            successfulImprovements: this.improvementLog.filter(log => log.success).length,
            averageQualityImprovement: this.calculateAverageImprovement(),
            topIssues: this.getTopIssues(),
            recommendations: this.generateRecommendations()
        };

        return report;
    }

    calculateAverageImprovement() {
        if (this.improvementLog.length === 0) return 0;
        
        const improvements = this.improvementLog.map(log => log.testResult.overallScore);
        return improvements.reduce((a, b) => a + b, 0) / improvements.length;
    }

    getTopIssues() {
        const issueCounts = {};
        
        this.improvementLog.forEach(log => {
            log.testResult.issues.forEach(issue => {
                issueCounts[issue] = (issueCounts[issue] || 0) + 1;
            });
        });

        return Object.entries(issueCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([issue, count]) => ({ issue, count }));
    }

    generateRecommendations() {
        return [
            'Fortsätt övervaka innehållskvalitet kontinuerligt',
            'Implementera automatiska kvalitetskontroller',
            'Skapa mallar för framgångsrika artiklar',
            'Förbättra HTML-struktur i genererat innehåll',
            'Öka antalet interna länkar i artiklar'
        ];
    }
}

// Starta självförbättringsläget
async function startSelfImprovement() {
    const engine = new AISelfImprovementEngine();
    
    console.log('🤖 ConceptSolutions AI Self-Improvement Engine');
    console.log('==============================================');
    console.log('Denna AI kommer nu att kontinuerligt analysera och förbättra sig själv.');
    console.log('Tryck Ctrl+C för att stoppa.\n');
    
    await engine.startSelfImprovementMode();
}

// Exportera för användning i andra filer
module.exports = { AISelfImprovementEngine, startSelfImprovement };

// Starta om filen körs direkt
if (require.main === module) {
    startSelfImprovement().catch(console.error);
}
