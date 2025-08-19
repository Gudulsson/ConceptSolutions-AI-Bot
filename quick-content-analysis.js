/**
 * Snabb analys av den nuvarande AI-genererade artikeln
 * Visar vad som är "knasigt" med innehållet
 */

const axios = require('axios');

async function analyzeCurrentArticle() {
    console.log('🔍 Analyserar den nuvarande AI-artikeln...\n');
    
    try {
        // Hämta den senaste draft-artikeln (ID 2964)
        const response = await axios.get('http://localhost:3000/api/wordpress/posts?status=draft');
        const drafts = response.data;
        
        if (drafts.length === 0) {
            console.log('❌ Inga draft-artiklar hittades');
            return;
        }
        
        // Hitta den senaste artikeln (högsta ID)
        const latestDraft = drafts.reduce((latest, current) => 
            current.id > latest.id ? current : latest
        );
        
        console.log(`📄 Analyserar artikel: "${latestDraft.title.rendered}" (ID: ${latestDraft.id})`);
        console.log('=' .repeat(60));
        
        const content = latestDraft.content.rendered;
        const title = latestDraft.title.rendered;
        
        // 1. Analysera innehållslängd
        const wordCount = countWords(content);
        console.log(`\n📊 INNEHÅLLSLÄNGD:`);
        console.log(`   Ord: ${wordCount} (minimum: 800, optimalt: 1200)`);
        console.log(`   Status: ${wordCount < 800 ? '❌ FÖR KORT' : wordCount < 1200 ? '⚠️ KAN FÖRBÄTTRAS' : '✅ BRA'}`);
        
        // 2. Analysera HTML-struktur
        console.log(`\n🏗️ HTML-STRUKTUR:`);
        const structureIssues = analyzeHTMLStructure(content);
        structureIssues.forEach(issue => console.log(`   ❌ ${issue}`));
        
        // 3. Analysera innehållskvalitet
        console.log(`\n📝 INNEHÅLLSKVALITET:`);
        const contentIssues = analyzeContentQuality(content);
        contentIssues.forEach(issue => console.log(`   ❌ ${issue}`));
        
        // 4. Analysera interna länkar
        console.log(`\n🔗 INTERNA LÄNKAR:`);
        const linkCount = countInternalLinks(content);
        console.log(`   Antal länkar: ${linkCount} (minimum: 3, optimalt: 5)`);
        console.log(`   Status: ${linkCount < 3 ? '❌ FÖR FÅ' : '✅ BRA'}`);
        
        // 5. Visa problematiska delar
        console.log(`\n🚨 PROBLEMATISKA DELAR:`);
        showProblematicParts(content);
        
        // 6. Sammanfattning
        console.log(`\n📋 SAMMANFATTNING:`);
        const totalIssues = structureIssues.length + contentIssues.length + (wordCount < 800 ? 1 : 0) + (linkCount < 3 ? 1 : 0);
        console.log(`   Totalt antal problem: ${totalIssues}`);
        console.log(`   Kvalitetsbedömning: ${totalIssues > 5 ? '❌ MYCKET DÅLIG' : totalIssues > 3 ? '⚠️ DÅLIG' : totalIssues > 1 ? '⚠️ KAN FÖRBÄTTRAS' : '✅ BRA'}`);
        
        console.log(`\n💡 REKOMMENDATIONER:`);
        if (wordCount < 800) console.log('   • Öka innehållslängden till minst 800 ord');
        if (structureIssues.length > 0) console.log('   • Fixera HTML-struktur och kodning');
        if (contentIssues.some(i => i.includes('generisk'))) console.log('   • Gör innehållet mer specifikt och relevant');
        if (linkCount < 3) console.log('   • Lägg till fler interna länkar');
        if (contentIssues.some(i => i.includes('HTML-kod'))) console.log('   • Ta bort HTML-kod som ska visas som text');
        
    } catch (error) {
        console.error('❌ Fel vid analys:', error.message);
    }
}

function countWords(text) {
    const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return cleanText.split(' ').length;
}

function analyzeHTMLStructure(content) {
    const issues = [];
    
    // Kontrollera för felaktig HTML-kodning
    if (content.includes('&lt;') || content.includes('&gt;')) {
        issues.push('Innehåller HTML-kod som ska visas som text (&lt; och &gt;)');
    }
    
    // Kontrollera för felaktiga rubriker
    if (content.includes('<h3>Unknown&lt;/h3</h3>')) {
        issues.push('Felaktig rubrikstruktur: <h3>Unknown&lt;/h3</h3>');
    }
    
    // Kontrollera för tomma eller felaktiga element
    if (content.includes('<h3></h3>') || content.includes('<h3>Unknown</h3>')) {
        issues.push('Tomma eller generiska rubriker');
    }
    
    // Kontrollera för felaktiga länkar
    if (content.includes('/produkter/')) {
        issues.push('Felaktig länk: /produkter/ (finns inte på sidan)');
    }
    
    return issues;
}

function analyzeContentQuality(content) {
    const issues = [];
    
    // Kontrollera för generiskt innehåll
    if (content.includes('Detta är en generisk sektion')) {
        issues.push('Generiskt innehåll: "Detta är en generisk sektion"');
    }
    
    if (content.includes('unknown')) {
        issues.push('Generiskt innehåll: "unknown"');
    }
    
    // Kontrollera för korta eller tomma stycken
    const paragraphs = content.match(/<p[^>]*>(.*?)<\/p>/g);
    if (paragraphs) {
        const shortParagraphs = paragraphs.filter(p => {
            const text = p.replace(/<[^>]*>/g, '').trim();
            return text.length < 50;
        });
        if (shortParagraphs.length > 0) {
            issues.push(`${shortParagraphs.length} för korta stycken (< 50 tecken)`);
        }
    }
    
    // Kontrollera för felaktiga HTML-tecken
    if (content.includes('&#8211;') || content.includes('&hellip;')) {
        issues.push('Felaktiga HTML-entiteter som ska vara vanlig text');
    }
    
    return issues;
}

function countInternalLinks(content) {
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

function showProblematicParts(content) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
        if (line.includes('Unknown') || 
            line.includes('generisk') || 
            line.includes('&lt;') || 
            line.includes('&gt;') ||
            line.includes('/produkter/')) {
            console.log(`   Rad ${index + 1}: ${line.trim()}`);
        }
    });
}

// Kör analysen
analyzeCurrentArticle().catch(console.error);
