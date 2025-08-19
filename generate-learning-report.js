/**
 * Generate Learning Report
 * Skapar en detaljerad rapport av AI:n lärande för GitHub Actions
 */

const fs = require('fs').promises;
const path = require('path');

async function generateLearningReport() {
    try {
        console.log('📊 Genererar AI Learning Report...');
        
        // Läs kunskapsbasen
        const knowledgeFile = path.join(__dirname, 'ai-knowledge-base.json');
        const knowledgeData = await fs.readFile(knowledgeFile, 'utf8');
        const knowledge = JSON.parse(knowledgeData);
        
        // Skapa detaljerad rapport
        const report = {
            timestamp: new Date(),
            summary: {
                totalCycles: knowledge.cycles || 0,
                pagesAnalyzed: knowledge.websiteKnowledge?.pages?.length || 0,
                productsAnalyzed: knowledge.websiteKnowledge?.products?.length || 0,
                webSearches: knowledge.websiteKnowledge?.webSearchResults?.length || 0,
                contentPatterns: knowledge.websiteKnowledge?.contentPatterns?.length || 0,
                seoInsights: knowledge.websiteKnowledge?.seoInsights?.length || 0
            },
            insights: {
                contentGaps: extractContentGaps(knowledge),
                seoOpportunities: extractSEOOpportunities(knowledge),
                marketTrends: extractMarketTrends(knowledge),
                keywordInsights: extractKeywordInsights(knowledge),
                recommendations: knowledge.recommendations || []
            },
            performance: {
                averageQuality: calculateAverageQuality(knowledge),
                topPerformers: findTopPerformers(knowledge),
                improvementAreas: findImprovementAreas(knowledge)
            },
            webSearchResults: extractWebSearchResults(knowledge),
            nextSteps: generateNextSteps(knowledge)
        };
        
        // Spara rapport
        const reportFile = path.join(__dirname, 'ai-learning-report.json');
        await fs.writeFile(reportFile, JSON.stringify(report, null, 2));
        
        // Skapa markdown rapport
        const markdownReport = generateMarkdownReport(report);
        const markdownFile = path.join(__dirname, 'AI-LEARNING-REPORT.md');
        await fs.writeFile(markdownFile, markdownReport);
        
        console.log('✅ AI Learning Report genererad!');
        console.log('📄 JSON: ai-learning-report.json');
        console.log('📝 Markdown: AI-LEARNING-REPORT.md');
        
        return report;
        
    } catch (error) {
        console.error('❌ Fel vid generering av rapport:', error.message);
        return null;
    }
}

function extractContentGaps(knowledge) {
    const gaps = [];
    
    if (knowledge.websiteKnowledge?.contentPatterns) {
        knowledge.websiteKnowledge.contentPatterns.forEach(pattern => {
            if (pattern.contentGaps) {
                gaps.push(...pattern.contentGaps);
            }
        });
    }
    
    return [...new Set(gaps)].slice(0, 10);
}

function extractSEOOpportunities(knowledge) {
    const opportunities = [];
    
    if (knowledge.websiteKnowledge?.seoInsights) {
        knowledge.websiteKnowledge.seoInsights.forEach(insight => {
            if (insight.averageMetaLength < 150) {
                opportunities.push('Förbättra meta-beskrivningar');
            }
            if (insight.internalLinking < 5) {
                opportunities.push('Lägg till fler interna länkar');
            }
            if (insight.imageOptimization < 2) {
                opportunities.push('Optimera bilder med alt-text');
            }
        });
    }
    
    return [...new Set(opportunities)];
}

function extractMarketTrends(knowledge) {
    const trends = [];
    
    if (knowledge.websiteKnowledge?.webSearchResults) {
        knowledge.websiteKnowledge.webSearchResults.forEach(result => {
            if (result.insights?.trendingTopics) {
                trends.push(...result.insights.trendingTopics);
            }
        });
    }
    
    return [...new Set(trends)].slice(0, 10);
}

function extractKeywordInsights(knowledge) {
    const insights = [];
    
    if (knowledge.websiteKnowledge?.webSearchResults) {
        knowledge.websiteKnowledge.webSearchResults.forEach(result => {
            if (result.insights?.highVolumeKeywords) {
                insights.push(...result.insights.highVolumeKeywords);
            }
            if (result.insights?.lowCompetitionOpportunities) {
                insights.push(...result.insights.lowCompetitionOpportunities);
            }
        });
    }
    
    return [...new Set(insights)].slice(0, 15);
}

function extractWebSearchResults(knowledge) {
    const results = [];
    
    if (knowledge.websiteKnowledge?.webSearchResults) {
        knowledge.websiteKnowledge.webSearchResults.forEach(result => {
            if (result.searches) {
                results.push(...result.searches.map(search => ({
                    keyword: search.keyword,
                    searchVolume: search.searchVolume,
                    competition: search.competition,
                    relatedKeywords: search.relatedKeywords?.slice(0, 5) || []
                })));
            }
        });
    }
    
    return results.slice(0, 20);
}

function calculateAverageQuality(knowledge) {
    let totalQuality = 0;
    let count = 0;
    
    if (knowledge.websiteKnowledge?.contentPatterns) {
        knowledge.websiteKnowledge.contentPatterns.forEach(pattern => {
            if (pattern.qualityMetrics) {
                pattern.qualityMetrics.forEach(metric => {
                    totalQuality += metric.overallScore || 0;
                    count++;
                });
            }
        });
    }
    
    return count > 0 ? Math.round((totalQuality / count) * 100) : 0;
}

function findTopPerformers(knowledge) {
    const performers = [];
    
    if (knowledge.websiteKnowledge?.contentPatterns) {
        knowledge.websiteKnowledge.contentPatterns.forEach(pattern => {
            if (pattern.topPerformers) {
                performers.push(...pattern.topPerformers);
            }
        });
    }
    
    return performers
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 5);
}

function findImprovementAreas(knowledge) {
    const areas = [];
    
    if (knowledge.websiteKnowledge?.contentPatterns) {
        knowledge.websiteKnowledge.contentPatterns.forEach(pattern => {
            if (pattern.improvementAreas) {
                areas.push(...pattern.improvementAreas);
            }
        });
    }
    
    return areas.slice(0, 5);
}

function generateNextSteps(knowledge) {
    const steps = [
        'Skapa innehåll om identifierade innehållsgap',
        'Optimera SEO för befintliga artiklar',
        'Implementera förbättringar baserat på webbsökning',
        'Fokusera på högvolym nyckelord med låg konkurrens',
        'Utveckla mer engagerande innehåll'
    ];
    
    // Lägg till specifika steg baserat på insikter
    if (knowledge.websiteKnowledge?.webSearchResults?.length > 0) {
        steps.push('Skapa innehåll baserat på webbsökning');
    }
    
    if (knowledge.websiteKnowledge?.seoInsights?.length > 0) {
        steps.push('Förbättra meta-beskrivningar och interna länkar');
    }
    
    return steps;
}

function generateMarkdownReport(report) {
    return `# 🤖 AI Learning Report - ConceptSolutions

**Genererad:** ${report.timestamp.toLocaleString('sv-SE')}

---

## 📊 Sammanfattning

AI:n har analyserat ConceptSolutions hemsida och genererat följande insikter:

- **Totala cykler:** ${report.summary.totalCycles}
- **Sidor analyserade:** ${report.summary.pagesAnalyzed}
- **Produkter analyserade:** ${report.summary.productsAnalyzed}
- **Webbsökningar:** ${report.summary.webSearches}
- **Innehållsmönster:** ${report.summary.contentPatterns}
- **SEO-insikter:** ${report.summary.seoInsights}

---

## 🎯 Huvudinsikter

### Innehållsgap
${report.insights.contentGaps.map(gap => `- ${gap}`).join('\n')}

### SEO-möjligheter
${report.insights.seoOpportunities.map(opp => `- ${opp}`).join('\n')}

### Marknadstrender
${report.insights.marketTrends.map(trend => `- ${trend}`).join('\n')}

### Nyckelordsinsikter
${report.insights.keywordInsights.map(keyword => `- ${keyword}`).join('\n')}

---

## 📈 Prestanda

- **Genomsnittlig kvalitet:** ${report.performance.averageQuality}/100
- **Toppartiklar:** ${report.performance.topPerformers.length} st
- **Förbättringsområden:** ${report.performance.improvementAreas.length} st

### Toppartiklar
${report.performance.topPerformers.map(performer => `- ${performer.title} (${Math.round((performer.score || 0) * 100)}%)`).join('\n')}

### Förbättringsområden
${report.performance.improvementAreas.map(area => `- ${area.title}`).join('\n')}

---

## 🌐 Webbsökning Resultat

### Högvolym Nyckelord
${report.webSearchResults
    .filter(result => result.searchVolume > 5000)
    .map(result => `- ${result.keyword} (${result.searchVolume} sökningar/månad)`)
    .join('\n')}

### Låg Konkurrens Möjligheter
${report.webSearchResults
    .filter(result => result.competition < 0.3)
    .map(result => `- ${result.keyword} (${Math.round(result.competition * 100)}% konkurrens)`)
    .join('\n')}

---

## 🚀 Nästa Steg

${report.nextSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

---

## 💡 Rekommendationer

${report.insights.recommendations.map(rec => `- ${rec}`).join('\n')}

---

**Rapport genererad av:** ConceptSolutions AI Learning Engine  
**Nästa uppdatering:** Automatisk via GitHub Actions
`;
}

// Kör om filen körs direkt
if (require.main === module) {
    generateLearningReport().catch(console.error);
}

module.exports = { generateLearningReport };
