/**
 * Generate Learning Report för AI Learning Engine
 * Skapar en detaljerad rapport över AI:ns lärande
 */

const fs = require('fs').promises;
const path = require('path');

async function generateLearningReport() {
    try {
        console.log('📊 Genererar detaljerad läranderapport...');
        
        // Läs in kunskapsbasen
        let knowledgeBase = {};
        try {
            const knowledgeContent = await fs.readFile('ai-knowledge-base.json', 'utf8');
            knowledgeBase = JSON.parse(knowledgeContent);
        } catch (error) {
            console.log('⚠️ Ingen kunskapsbas hittad, skapar tom rapport');
        }
        
        // Läs in förbättringslogg
        let improvementLog = [];
        try {
            const logContent = await fs.readFile('ai-improvement-log.json', 'utf8');
            improvementLog = JSON.parse(logContent);
        } catch (error) {
            console.log('⚠️ Ingen förbättringslogg hittad');
        }
        
        // Skapa detaljerad rapport
        const report = {
            generatedAt: new Date().toISOString(),
            summary: {
                totalCycles: knowledgeBase.learningCycles || 0,
                duration: knowledgeBase.lastUpdated ? 
                    `${Math.round((new Date(knowledgeBase.lastUpdated) - new Date(knowledgeBase.startTime || knowledgeBase.lastUpdated)) / (1000 * 60 * 60))} timmar` : 
                    'Okänd',
                pagesAnalyzed: knowledgeBase.websiteKnowledge?.pages?.length || 0,
                productsAnalyzed: knowledgeBase.websiteKnowledge?.products?.length || 0,
                webSearches: knowledgeBase.websiteKnowledge?.webSearchResults?.length || 0,
                contentSuggestions: knowledgeBase.websiteKnowledge?.improvements?.contentSuggestions?.length || 0,
                seoRecommendations: knowledgeBase.websiteKnowledge?.seoInsights?.length || 0
            },
            keyInsights: knowledgeBase.websiteKnowledge?.insights || {},
            recommendations: knowledgeBase.websiteKnowledge?.improvements || {},
            webSearchResults: knowledgeBase.websiteKnowledge?.webSearchResults || [],
            contentPatterns: knowledgeBase.websiteKnowledge?.contentPatterns || [],
            improvementLog: improvementLog.slice(-10) // Senaste 10 loggar
        };
        
        // Spara JSON rapport
        await fs.writeFile('ai-learning-report.json', JSON.stringify(report, null, 2));
        
        // Skapa markdown rapport
        let markdownReport = `# 🤖 AI Learning Report - ConceptSolutions\n\n`;
        markdownReport += `**Genererad:** ${new Date().toLocaleString('sv-SE')}\n`;
        markdownReport += `**Lärandecykler:** ${report.summary.totalCycles}\n`;
        markdownReport += `**Körtid:** ${report.summary.duration}\n\n`;
        
        markdownReport += `## 📊 Sammanfattning\n\n`;
        markdownReport += `- **Sidor analyserade:** ${report.summary.pagesAnalyzed}\n`;
        markdownReport += `- **Produkter analyserade:** ${report.summary.productsAnalyzed}\n`;
        markdownReport += `- **Webbsökningar:** ${report.summary.webSearches}\n`;
        markdownReport += `- **Innehållsförslag:** ${report.summary.contentSuggestions}\n`;
        markdownReport += `- **SEO-rekommendationer:** ${report.summary.seoRecommendations}\n\n`;
        
        // Lägg till rekommendationer
        if (report.recommendations.contentSuggestions && report.recommendations.contentSuggestions.length > 0) {
            markdownReport += `## 💡 Innehållsrekommendationer\n\n`;
            report.recommendations.contentSuggestions.forEach((suggestion, index) => {
                markdownReport += `${index + 1}. **${suggestion.topic}** (${suggestion.priority})\n`;
                markdownReport += `   - ${suggestion.description}\n\n`;
            });
        }
        
        // Lägg till SEO-rekommendationer
        if (report.recommendations.seoSuggestions && report.recommendations.seoSuggestions.length > 0) {
            markdownReport += `## 🔍 SEO-rekommendationer\n\n`;
            report.recommendations.seoSuggestions.forEach((suggestion, index) => {
                markdownReport += `${index + 1}. **${suggestion.type}** (${suggestion.impact})\n`;
                markdownReport += `   - ${suggestion.description}\n\n`;
            });
        }
        
        // Lägg till webbsökresultat
        if (report.webSearchResults.length > 0) {
            markdownReport += `## 🌐 Webbsökresultat\n\n`;
            report.webSearchResults.slice(-5).forEach(search => {
                markdownReport += `### ${search.keyword}\n`;
                markdownReport += `**Sökt:** ${new Date(search.timestamp).toLocaleString('sv-SE')}\n`;
                markdownReport += `**Resultat:** ${search.results.length} hittade\n\n`;
                
                if (search.results.length > 0) {
                    markdownReport += `**Toppresultat:**\n`;
                    search.results.slice(0, 3).forEach((result, index) => {
                        markdownReport += `${index + 1}. [${result.title}](${result.link})\n`;
                    });
                    markdownReport += `\n`;
                }
            });
        }
        
        // Lägg till insikter
        if (report.keyInsights.keyFindings && report.keyInsights.keyFindings.length > 0) {
            markdownReport += `## 🧠 Viktiga insikter\n\n`;
            report.keyInsights.keyFindings.forEach((finding, index) => {
                markdownReport += `${index + 1}. ${finding}\n`;
            });
            markdownReport += `\n`;
        }
        
        // Lägg till trender
        if (report.keyInsights.trends && report.keyInsights.trends.length > 0) {
            markdownReport += `## 📈 Identifierade trender\n\n`;
            report.keyInsights.trends.forEach(trend => {
                markdownReport += `- **${trend.keyword}:** ${trend.resultCount} resultat\n`;
            });
            markdownReport += `\n`;
        }
        
        markdownReport += `## 🎯 Nästa steg\n\n`;
        markdownReport += `1. **Granska innehållsförslag** och implementera de mest lovande\n`;
        markdownReport += `2. **Följ SEO-rekommendationer** för att förbättra sökmotorrankning\n`;
        markdownReport += `3. **Analysera webbsökresultat** för att identifiera nya möjligheter\n`;
        markdownReport += `4. **Kör AI Learning Pipeline igen** för kontinuerlig förbättring\n\n`;
        
        markdownReport += `---\n`;
        markdownReport += `*Rapport genererad av ConceptSolutions AI Learning Engine*\n`;
        
        // Spara markdown rapport
        await fs.writeFile('AI-LEARNING-REPORT.md', markdownReport);
        
        console.log('✅ Detaljerad rapport genererad:');
        console.log('   - ai-learning-report.json');
        console.log('   - AI-LEARNING-REPORT.md');
        
    } catch (error) {
        console.error('❌ Fel vid generering av rapport:', error.message);
        
        // Skapa enkel backup rapport
        const backupReport = {
            generatedAt: new Date().toISOString(),
            error: error.message,
            status: 'Rapportgenerering misslyckades'
        };
        
        await fs.writeFile('ai-learning-report.json', JSON.stringify(backupReport, null, 2));
        console.log('⚠️ Backup rapport skapad');
    }
}

// Kör rapportgenerator om filen körs direkt
if (require.main === module) {
    generateLearningReport();
}

module.exports = generateLearningReport;

