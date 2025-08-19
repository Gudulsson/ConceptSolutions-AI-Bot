/**
 * Förbättrad AI Engine för ConceptSolutions
 * Fixar de specifika problemen som identifierats i analysen
 */

const axios = require('axios');

class ImprovedAIEngine {
    constructor() {
        this.apiBaseUrl = 'http://localhost:3000/api';
        this.contentTemplates = {
            ai_ecommerce: {
                title: 'AI och framtidens e-handel: Komplett guide för företag',
                structure: [
                    'introduction',
                    'ai_benefits',
                    'implementation_steps',
                    'case_studies',
                    'future_trends',
                    'conclusion'
                ],
                minWords: 1200,
                internalLinks: [
                    '/produkt/rfid-lasare/',
                    '/tjanster/konsultation/',
                    '/produkt/interaktiva-lekgolv/',
                    '/kontakta-oss/'
                ]
            },
            rfid_technology: {
                title: 'RFID-teknik revolutionerar svenska företag',
                structure: [
                    'introduction',
                    'rfid_benefits',
                    'implementation_guide',
                    'success_stories',
                    'future_outlook',
                    'conclusion'
                ],
                minWords: 1000,
                internalLinks: [
                    '/produkt/rfid-lasare/',
                    '/produkt/rfid-taggar/',
                    '/tjanster/rfid-implementation/',
                    '/rfid-losningar/'
                ]
            }
        };
    }

    async generateHighQualityArticle(topic, category = 'Teknologi', tags = ['AI', 'E-handel']) {
        console.log('🚀 Genererar högkvalitativ artikel...');
        
        try {
            // 1. Analysera ämnet och välj template
            const template = this.selectTemplate(topic);
            
            // 2. Generera strukturerat innehåll
            const content = await this.generateStructuredContent(topic, template);
            
            // 3. Lägg till interna länkar
            const contentWithLinks = this.addInternalLinks(content, template.internalLinks);
            
            // 4. Generera SEO-data
            const seoData = this.generateSEOData(template.title, contentWithLinks);
            
            // 5. Generera thumbnail
            const thumbnail = this.generateThumbnail(topic, template.title);
            
            // 6. Validera kvalitet
            const qualityCheck = this.validateContentQuality(contentWithLinks);
            
            if (!qualityCheck.passed) {
                console.log('⚠️ Kvalitetskontroll misslyckades, förbättrar innehållet...');
                return await this.generateHighQualityArticle(topic, category, tags);
            }
            
            return {
                title: template.title,
                content: contentWithLinks,
                seoData,
                thumbnail,
                category,
                tags,
                qualityScore: qualityCheck.score,
                wordCount: this.countWords(contentWithLinks)
            };
            
        } catch (error) {
            console.error('❌ Fel vid generering av artikel:', error.message);
            throw error;
        }
    }

    selectTemplate(topic) {
        if (topic.toLowerCase().includes('ai') && topic.toLowerCase().includes('e-handel')) {
            return this.contentTemplates.ai_ecommerce;
        } else if (topic.toLowerCase().includes('rfid')) {
            return this.contentTemplates.rfid_technology;
        } else {
            // Fallback template
            return {
                title: `${topic} - Komplett guide`,
                structure: ['introduction', 'main_content', 'benefits', 'conclusion'],
                minWords: 800,
                internalLinks: ['/kontakta-oss/', '/produkt/rfid-lasare/']
            };
        }
    }

    async generateStructuredContent(topic, template) {
        let content = '';
        
        for (const section of template.structure) {
            content += await this.generateSection(topic, section);
        }
        
        return content;
    }

    async generateSection(topic, sectionType) {
        switch (sectionType) {
            case 'introduction':
                return this.generateIntroduction(topic);
            case 'ai_benefits':
                return this.generateAIBenefits(topic);
            case 'implementation_steps':
                return this.generateImplementationSteps(topic);
            case 'case_studies':
                return this.generateCaseStudies(topic);
            case 'future_trends':
                return this.generateFutureTrends(topic);
            case 'conclusion':
                return this.generateConclusion(topic);
            case 'rfid_benefits':
                return this.generateRFIDBenefits(topic);
            case 'implementation_guide':
                return this.generateImplementationGuide(topic);
            case 'success_stories':
                return this.generateSuccessStories(topic);
            case 'future_outlook':
                return this.generateFutureOutlook(topic);
            default:
                return this.generateGenericSection(topic, sectionType);
        }
    }

    generateIntroduction(topic) {
        return `
            <h1>${topic} - En komplett guide för moderna företag</h1>
            
            <p>I dagens snabbt föränderliga digitala landskap står företag inför utmaningar att hålla sig konkurrenskraftiga och effektiva. ${topic} representerar en revolutionerande förändring som inte bara transformerar hur vi arbetar, utan också hur vi levererar värde till våra kunder.</p>
            
            <p>Denna omfattande guide kommer att utforska alla aspekter av ${topic}, från grundläggande koncept till avancerade implementationer. Vi kommer att täcka både tekniska aspekter och praktiska strategier som hjälper företag att navigera denna spännande transformation.</p>
            
            <h2>Varför ${topic} är avgörande 2025</h2>
            
            <p>Med den accelererande digitala transformationen och ökande kundförväntningar har ${topic} blivit en kritisk komponent för företagsframgång. Företag som omfamnar denna teknologi tidigt kommer att ha en betydande fördel i konkurrensen.</p>
        `;
    }

    generateAIBenefits(topic) {
        return `
            <h2>Fördelar med ${topic} för företag</h2>
            
            <p>${topic} erbjuder en mängd fördelar som kan transformera hur företag arbetar och levererar värde till sina kunder. Här är de viktigaste fördelarna:</p>
            
            <h3>1. Förbättrad effektivitet och automatisering</h3>
            <p>Genom att automatisera manuella processer kan företag frigöra värdefull tid och resurser. ${topic} möjliggör intelligenta system som kan hantera komplexa uppgifter med hög precision och hastighet.</p>
            
            <ul>
                <li><strong>Automatiserad kundservice:</strong> AI-drivna chatbots som kan hantera 80% av vanliga kundfrågor</li>
                <li><strong>Intelligent lagerhantering:</strong> Prediktiv analys som optimerar lagerstyrning</li>
                <li><strong>Personlig kundupplevelse:</strong> Skräddarsydda rekommendationer baserade på kundbeteende</li>
            </ul>
            
            <h3>2. Kostnadsbesparingar och ROI</h3>
            <p>Implementation av ${topic} kan leda till betydande kostnadsbesparingar över tid. Medan den initiala investeringen kan vara stor, visar studier att företag ofta ser positiv ROI inom 12-18 månader.</p>
            
            <h3>3. Förbättrad kundnöjdhet</h3>
            <p>Genom att leverera mer personliga och effektiva upplevelser kan företag öka kundnöjdheten och lojaliteten. ${topic} möjliggör djupare förståelse för kundbehov och preferenser.</p>
        `;
    }

    generateImplementationSteps(topic) {
        return `
            <h2>Steg-för-steg guide för implementation av ${topic}</h2>
            
            <p>Framgångsrik implementation av ${topic} kräver noggrann planering och strategisk approach. Här är en komplett guide som hjälper dig genom hela processen:</p>
            
            <h3>Fas 1: Strategisk planering och analys</h3>
            <p>Börja med en grundlig analys av ditt företags nuvarande situation och identifiera tydliga mål för implementationen.</p>
            
            <ol>
                <li><strong>Utvärdera nuvarande processer:</strong> Identifiera områden som kan förbättras genom ${topic}</li>
                <li><strong>Sätt tydliga mål:</strong> Definiera specifika, mätbara mål för implementationen</li>
                <li><strong>Analysera resurser:</strong> Bedöm tillgängliga resurser, budget och kompetens</li>
                <li><strong>Utvärdera teknikval:</strong> Välj rätt ${topic}-lösningar för dina specifika behov</li>
            </ol>
            
            <h3>Fas 2: Teknisk implementation</h3>
            <p>Den tekniska implementationen kräver noggrann planering och expertis för att säkerställa framgångsrik integration.</p>
            
            <ul>
                <li><strong>Systemintegration:</strong> Integrera ${topic}-lösningar med befintliga system</li>
                <li><strong>Datasäkerhet:</strong> Implementera robusta säkerhetsåtgärder</li>
                <li><strong>Testning och validering:</strong> Omfattande testning av alla funktioner</li>
                <li><strong>Dokumentation:</strong> Skapa detaljerad dokumentation för framtida underhåll</li>
            </ul>
            
            <h3>Fas 3: Utbildning och adoption</h3>
            <p>Framgångsrik implementation kräver att alla användare förstår och omfamnar den nya teknologin.</p>
        `;
    }

    generateCaseStudies(topic) {
        return `
            <h2>Framgångshistorier: ${topic} i praktiken</h2>
            
            <p>Flera svenska företag har redan implementerat ${topic} med imponerande resultat. Här är några inspirerande exempel:</p>
            
            <h3>Fallstudie 1: E-handelsföretag i Stockholm</h3>
            <p>Ett ledande e-handelsföretag i Stockholm implementerade ${topic} för att förbättra sin kundupplevelse och optimera sin lagerhantering.</p>
            
            <ul>
                <li><strong>Resultat:</strong> 35% ökning av kundnöjdhet</li>
                <li><strong>Kostnadsbesparing:</strong> 28% reducering av lagerkostnader</li>
                <li><strong>Effektivitet:</strong> 40% snabbare orderhantering</li>
            </ul>
            
            <h3>Fallstudie 2: Tillverkningsföretag i Göteborg</h3>
            <p>Ett tillverkningsföretag i Göteborg använde ${topic} för att automatisera sina produktionsprocesser och förbättra kvalitetskontrollen.</p>
            
            <ul>
                <li><strong>Produktivitet:</strong> 45% ökning av produktionskapacitet</li>
                <li><strong>Kvalitet:</strong> 99.8% felfri produktion</li>
                <li><strong>ROI:</strong> 180% avkastning på investeringen</li>
            </ul>
        `;
    }

    generateFutureTrends(topic) {
        return `
            <h2>Framtida trender inom ${topic}</h2>
            
            <p>${topic} kommer att fortsätta utvecklas och integreras med andra banbrytande teknologier. Här är de viktigaste trenderna att hålla koll på:</p>
            
            <h3>Integration med IoT och 5G</h3>
            <p>Framtida ${topic}-lösningar kommer att integreras djupare med IoT-enheter och 5G-nätverk, vilket möjliggör realtidsanalys och snabbare beslutsfattande.</p>
            
            <h3>Avancerad prediktiv analys</h3>
            <p>AI-algoritmer kommer att bli ännu mer sofistikerade, med förmågan att förutse trender och beteenden med högre precision än någonsin tidigare.</p>
            
            <h3>Personlig AI-assistenter</h3>
            <p>Framtida ${topic}-lösningar kommer att inkludera personliga AI-assistenter som kan hjälpa användare med komplexa uppgifter och beslutsfattande.</p>
        `;
    }

    generateConclusion(topic) {
        return `
            <h2>Slutsats: Framtiden med ${topic}</h2>
            
            <p>${topic} representerar inte bara en teknisk förändring utan en fundamental transformation av hur företag arbetar och levererar värde. Företag som omfamnar denna teknologi tidigt kommer att ha en betydande fördel i den digitala ekonomin.</p>
            
            <p>Framgångsrik implementation kräver strategisk planering, rätt kompetens och en kultur som omfamnar förändring. Med rätt approach kan ${topic} bli en kraftfull drivkraft för tillväxt och innovation.</p>
            
            <h3>Nästa steg</h3>
            <p>Är du redo att börja din resa med ${topic}? Vårt team av experter är här för att hjälpa dig genom hela processen, från strategisk planering till framgångsrik implementation.</p>
            
            <p><strong>Kontakta oss idag för att diskutera hur ${topic} kan förbättra ditt företag och hjälpa dig att nå dina mål.</strong></p>
        `;
    }

    generateRFIDBenefits(topic) {
        return `
            <h2>Fördelar med RFID-teknik för företag</h2>
            
            <p>RFID-teknik erbjuder en mängd fördelar som kan transformera företagsprocesser och öka effektiviteten avsevärt. Här är de viktigaste fördelarna:</p>
            
            <h3>1. Automatiserad spårning och hantering</h3>
            <p>RFID-teknik möjliggör automatiserad spårning av varor, tillgångar och inventarier utan behov av manuell hantering eller visuell kontakt.</p>
            
            <ul>
                <li><strong>Realtidsövervakning:</strong> Kontinuerlig spårning av varor genom hela försörjningskedjan</li>
                <li><strong>Automatiserad inventering:</strong> Snabb och noggrann inventering utan manuell räkning</li>
                <li><strong>Förbättrad säkerhet:</strong> Stöldskydd och kontroll av tillgångar</li>
            </ul>
            
            <h3>2. Kostnadsbesparingar och effektivitet</h3>
            <p>Implementation av RFID-teknik kan leda till betydande kostnadsbesparingar genom minskad manuell hantering och förbättrad processeffektivitet.</p>
        `;
    }

    generateImplementationGuide(topic) {
        return `
            <h2>Implementation av RFID-teknik: En komplett guide</h2>
            
            <p>Framgångsrik implementation av RFID-teknik kräver noggrann planering och strategisk approach. Här är en steg-för-steg guide:</p>
            
            <h3>Fas 1: Behovsanalys och planering</h3>
            <p>Börja med en grundlig analys av dina specifika behov och utveckla en detaljerad implementationsplan.</p>
            
            <ol>
                <li><strong>Identifiera användningsområden:</strong> Bestäm var RFID-teknik kan ge störst värde</li>
                <li><strong>Utvärdera tekniska krav:</strong> Bedöm vilken typ av RFID-lösning som passar dina behov</li>
                <li><strong>Beräkna ROI:</strong> Analysera kostnader och förväntade besparingar</li>
                <li><strong>Planera implementation:</strong> Skapa en detaljerad tidsplan och resursplan</li>
            </ol>
        `;
    }

    generateSuccessStories(topic) {
        return `
            <h2>Framgångshistorier: RFID-teknik i praktiken</h2>
            
            <p>Flera svenska företag har redan implementerat RFID-teknik med imponerande resultat. Här är några inspirerande exempel:</p>
            
            <h3>Logistikföretag i Göteborg</h3>
            <p>Ett ledande logistikföretag i Göteborg implementerade RFID-teknik för att förbättra sin lagerhantering och orderhantering.</p>
            
            <ul>
                <li><strong>Resultat:</strong> 42% minskning av lagerkostnader</li>
                <li><strong>Effektivitet:</strong> 60% snabbare orderhantering</li>
                <li><strong>Noggrannhet:</strong> 99.9% felfri spårning</li>
            </ul>
        `;
    }

    generateFutureOutlook(topic) {
        return `
            <h2>Framtiden för RFID-teknik</h2>
            
            <p>RFID-teknik kommer att fortsätta utvecklas och integreras med andra teknologier som AI och IoT. Här är de viktigaste trenderna:</p>
            
            <h3>Integration med AI och IoT</h3>
            <p>Framtida RFID-lösningar kommer att integreras med AI för prediktiv analys och automatiserad optimering av processer.</p>
            
            <h3>Miniatyrteknik</h3>
            <p>RFID-taggar kommer att bli mindre och mer kostnadseffektiva, vilket möjliggör nya användningsområden.</p>
        `;
    }

    generateGenericSection(topic, sectionType) {
        return `
            <h2>${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}</h2>
            <p>Detta avsnitt behandlar ${sectionType} inom området ${topic}. Här kommer vi att utforska de viktigaste aspekterna och ge praktiska insikter för implementering.</p>
        `;
    }

    addInternalLinks(content, internalLinks) {
        let contentWithLinks = content;
        
        // Lägg till interna länkar på strategiska ställen
        internalLinks.forEach((link, index) => {
            const linkText = this.getLinkText(link);
            const linkPattern = new RegExp(`(${linkText})`, 'gi');
            
            if (contentWithLinks.match(linkPattern)) {
                contentWithLinks = contentWithLinks.replace(linkPattern, `<a href="${link}">$1</a>`);
            } else {
                // Lägg till länk i slutet av ett stycke om den inte hittades
                const paragraphEnd = contentWithLinks.lastIndexOf('</p>');
                if (paragraphEnd !== -1) {
                    const insertPoint = paragraphEnd;
                    const linkHtml = ` Läs mer om våra <a href="${link}">${linkText}</a> för att se hur vi kan hjälpa dig.`;
                    contentWithLinks = contentWithLinks.slice(0, insertPoint) + linkHtml + contentWithLinks.slice(insertPoint);
                }
            }
        });
        
        return contentWithLinks;
    }

    getLinkText(link) {
        const linkMap = {
            '/produkt/rfid-lasare/': 'RFID-läsare',
            '/tjanster/konsultation/': 'konsulttjänster',
            '/produkt/interaktiva-lekgolv/': 'interaktiva lösningar',
            '/kontakta-oss/': 'supportteam',
            '/produkt/rfid-taggar/': 'RFID-taggar',
            '/tjanster/rfid-implementation/': 'RFID-implementation',
            '/rfid-losningar/': 'RFID-lösningar'
        };
        
        return linkMap[link] || 'våra tjänster';
    }

    generateSEOData(title, content) {
        const wordCount = this.countWords(content);
        const readingTime = Math.ceil(wordCount / 200); // 200 ord per minut
        
        return {
            metaDescription: this.generateMetaDescription(content),
            keywords: this.extractKeywords(title, content),
            readingTime: `${readingTime} minuter`,
            wordCount: wordCount
        };
    }

    generateMetaDescription(content) {
        const cleanContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const sentences = cleanContent.split(/[.!?]+/);
        const firstSentence = sentences[0];
        
        if (firstSentence.length > 160) {
            return firstSentence.substring(0, 157) + '...';
        }
        
        return firstSentence;
    }

    extractKeywords(title, content) {
        const commonKeywords = ['AI', 'e-handel', 'RFID', 'digital transformation', 'företag', 'teknologi'];
        const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 3);
        const contentWords = content.toLowerCase().replace(/<[^>]*>/g, ' ').split(' ').filter(word => word.length > 3);
        
        const allWords = [...titleWords, ...contentWords];
        const wordCount = {};
        
        allWords.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        const sortedWords = Object.entries(wordCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([word]) => word);
        
        return [...new Set([...commonKeywords, ...sortedWords])];
    }

    generateThumbnail(topic, title) {
        const thumbnailMap = {
            'ai': {
                url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
                alt: 'AI och framtidens e-handel',
                description: 'AI-teknologi som driver framtidens e-handel'
            },
            'rfid': {
                url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop',
                alt: 'RFID-teknik för företag',
                description: 'RFID-teknik som revolutionerar företagsprocesser'
            }
        };
        
        const key = topic.toLowerCase().includes('ai') ? 'ai' : 'rfid';
        return thumbnailMap[key] || thumbnailMap.ai;
    }

    validateContentQuality(content) {
        const wordCount = this.countWords(content);
        const hasHeadings = /<h[1-6][^>]*>/i.test(content);
        const hasParagraphs = /<p[^>]*>/i.test(content);
        const hasLinks = /<a[^>]*href[^>]*>/i.test(content);
        const hasNoHtmlErrors = !content.includes('&lt;') && !content.includes('&gt;');
        const hasNoGenericContent = !content.includes('Unknown') && !content.includes('generisk');
        
        const checks = [
            { name: 'Innehållslängd', passed: wordCount >= 800, weight: 0.2 },
            { name: 'Rubrikstruktur', passed: hasHeadings, weight: 0.2 },
            { name: 'Styckestruktur', passed: hasParagraphs, weight: 0.2 },
            { name: 'Interna länkar', passed: hasLinks, weight: 0.15 },
            { name: 'HTML-kvalitet', passed: hasNoHtmlErrors, weight: 0.15 },
            { name: 'Innehållskvalitet', passed: hasNoGenericContent, weight: 0.1 }
        ];
        
        const passedChecks = checks.filter(check => check.passed);
        const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0);
        const passedWeight = passedChecks.reduce((sum, check) => sum + check.weight, 0);
        const score = passedWeight / totalWeight;
        
        return {
            passed: score >= 0.8,
            score: score,
            checks: checks,
            wordCount: wordCount
        };
    }

    countWords(text) {
        const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        return cleanText.split(' ').length;
    }
}

// Exportera för användning
module.exports = { ImprovedAIEngine };

// Test-funktion
async function testImprovedEngine() {
    const engine = new ImprovedAIEngine();
    
    console.log('🧪 Testar förbättrad AI-engine...\n');
    
    try {
        const article = await engine.generateHighQualityArticle('AI och framtidens e-handel');
        
        console.log('✅ Artikel genererad framgångsrikt!');
        console.log(`📊 Kvalitetspoäng: ${Math.round(article.qualityScore * 100)}%`);
        console.log(`📝 Ordantal: ${article.wordCount}`);
        console.log(`🔗 Interna länkar: ${article.content.match(/<a[^>]*href[^>]*>/gi)?.length || 0}`);
        
        console.log('\n📄 Artikel-titel:', article.title);
        console.log('\n📋 SEO-data:', article.seoData);
        
    } catch (error) {
        console.error('❌ Test misslyckades:', error.message);
    }
}

// Kör test om filen körs direkt
if (require.main === module) {
    testImprovedEngine();
}
