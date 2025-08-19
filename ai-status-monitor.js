/**
 * AI Status Monitor
 * Visar vad AI:n gör i realtid
 */

const fs = require('fs').promises;
const path = require('path');

class AIStatusMonitor {
    constructor() {
        this.monitoring = false;
        this.lastKnowledgeBase = null;
    }

    async startMonitoring() {
        this.monitoring = true;
        console.log('📊 AI STATUS MONITOR STARTAD');
        console.log('=' .repeat(50));
        console.log('Övervakar AI:n i realtid...\n');
        
        while (this.monitoring) {
            try {
                await this.checkAIStatus();
                await this.sleep(10000); // Kontrollera var 10:e sekund
            } catch (error) {
                console.error('❌ Fel i övervakning:', error.message);
                await this.sleep(5000);
            }
        }
    }

    async checkAIStatus() {
        try {
            // Kontrollera om kunskapsbasen finns och har uppdaterats
            const knowledgeFile = path.join(__dirname, 'ai-knowledge-base.json');
            const stats = await fs.stat(knowledgeFile);
            
            if (this.lastKnowledgeBase !== stats.mtime.getTime()) {
                this.lastKnowledgeBase = stats.mtime.getTime();
                
                // Läs kunskapsbasen
                const knowledgeData = await fs.readFile(knowledgeFile, 'utf8');
                const knowledge = JSON.parse(knowledgeData);
                
                this.showAIStatus(knowledge);
            } else {
                // Visa enkel status
                this.showSimpleStatus();
            }
            
        } catch (error) {
            console.log('⏳ Väntar på att AI:n ska starta...');
        }
    }

    showAIStatus(knowledge) {
        const timestamp = new Date(knowledge.timestamp);
        const runtime = new Date() - new Date(knowledge.websiteKnowledge?.startTime || timestamp);
        const hours = Math.floor(runtime / (1000 * 60 * 60));
        const minutes = Math.floor((runtime % (1000 * 60 * 60)) / (1000 * 60));
        
        console.log(`\n🤖 AI STATUS - ${timestamp.toLocaleTimeString()}`);
        console.log('=' .repeat(50));
        console.log(`⏱️  Körtid: ${hours}h ${minutes}m`);
        console.log(`🔄 Cykler: ${knowledge.cycles || 0}`);
        
        if (knowledge.websiteKnowledge) {
            const wk = knowledge.websiteKnowledge;
            console.log(`📖 Sidor analyserade: ${wk.pages?.length || 0}`);
            console.log(`🛍️ Produkter analyserade: ${wk.products?.length || 0}`);
            console.log(`📊 Innehållsmönster: ${wk.contentPatterns?.length || 0}`);
            console.log(`🔍 SEO-insikter: ${wk.seoInsights?.length || 0}`);
        }
        
        if (knowledge.insights) {
            console.log('\n💡 SENASTE INSIKTER:');
            Object.entries(knowledge.insights).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    console.log(`   ${key}: ${JSON.stringify(value).substring(0, 50)}...`);
                } else {
                    console.log(`   ${key}: ${value}`);
                }
            });
        }
        
        if (knowledge.recommendations) {
            console.log('\n🎯 REKOMMENDATIONER:');
            knowledge.recommendations.slice(0, 3).forEach((rec, index) => {
                console.log(`   ${index + 1}. ${rec}`);
            });
        }
        
        console.log('=' .repeat(50));
    }

    showSimpleStatus() {
        const now = new Date();
        console.log(`⏰ ${now.toLocaleTimeString()} - AI:n arbetar aktivt...`);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    stop() {
        this.monitoring = false;
        console.log('\n🛑 AI Status Monitor stoppad');
    }
}

// Starta övervakning
async function startMonitoring() {
    const monitor = new AIStatusMonitor();
    
    // Hantera avbrott
    process.on('SIGINT', () => {
        console.log('\n\n🛑 Stoppar AI Status Monitor...');
        monitor.stop();
        process.exit(0);
    });
    
    await monitor.startMonitoring();
}

// Starta om filen körs direkt
if (require.main === module) {
    startMonitoring().catch(console.error);
}

module.exports = { AIStatusMonitor, startMonitoring };
