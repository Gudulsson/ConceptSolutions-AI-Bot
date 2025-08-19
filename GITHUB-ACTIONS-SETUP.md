# 🚀 GitHub Actions AI Learning Pipeline Setup

## Översikt

Denna guide hjälper dig att sätta upp en automatisk AI-lärandepipeline för ConceptSolutions som körs via GitHub Actions. AI:n kommer att arbeta kontinuerligt i timmar, söka på nätet efter relevanta sökord och teman, och förbättra hemsidan automatiskt.

## 📋 Förutsättningar

1. **GitHub Repository** med ConceptSolutions AI bot
2. **GitHub Secrets** konfigurerade
3. **WordPress & WooCommerce API** tillgängliga
4. **Node.js 18+** kompatibilitet

## 🔧 Steg 1: Konfigurera GitHub Secrets

Gå till ditt GitHub repository → Settings → Secrets and variables → Actions och lägg till följande secrets:

### WordPress Secrets
```
WORDPRESS_URL=https://www.conceptsolutions.se
WORDPRESS_USERNAME=din_username
WORDPRESS_PASSWORD=din_app_password
```

### WooCommerce Secrets
```
WOOCOMMERCE_CONSUMER_KEY=din_consumer_key
WOOCOMMERCE_CONSUMER_SECRET=din_consumer_secret
```

### API Keys (valfritt)
```
OPENAI_API_KEY=din_openai_key
SERPAPI_KEY=din_serpapi_key
```

## 🚀 Steg 2: Aktivera GitHub Actions

1. **Pusha koden** till main branch
2. **Gå till Actions tab** i GitHub
3. **Välj "AI Learning Pipeline"**
4. **Klicka "Run workflow"**

## ⚙️ Steg 3: Konfigurera Pipeline

### Manuell körning
Du kan köra pipelinen manuellt med anpassade parametrar:

- **Learning duration:** 8 timmar (standard)
- **Web search:** true (söker på nätet)
- **Publish articles:** false (sparar som utkast)

### Automatisk körning
Pipelinen körs automatiskt:
- **Varje dag kl 06:00 UTC**
- **När koden uppdateras**
- **När AI-engine ändras**

## 📊 Vad AI:n gör

### 1. **Intensivt Lärande (8 timmar)**
- Analyserar alla sidor och produkter
- Lär sig innehållsmönster och SEO
- Identifierar förbättringsmöjligheter

### 2. **Webbsökning**
- Söker efter relevanta sökord
- Analyserar marknadstrender
- Identifierar innehållsgap

### 3. **Innehållsgenerering**
- Skapar förbättrat innehåll
- Optimera SEO och struktur
- Genererar artiklar baserat på insikter

### 4. **Rapportering**
- Skapar detaljerade rapporter
- Sparar kunskapsbas
- Uppdaterar rekommendationer

## 📈 Förväntade Resultat

### Efter 8 timmars körning:
- **100+ lärandecykler**
- **Omfattande hemsideanalys**
- **10+ webbsökningar**
- **5+ nya innehållsförslag**
- **Detaljerad SEO-analys**

### Rapporter som genereras:
- `ai-knowledge-base.json` - AI:n kunskapsbas
- `ai-learning-report.json` - Detaljerad rapport
- `AI-LEARNING-REPORT.md` - Läsbar markdown rapport

## 🔍 Övervakning

### GitHub Actions Dashboard
- Se körningsstatus i real-time
- Kontrollera loggar och fel
- Ladda ner artifacts

### Automatiska Notifieringar
- Email när pipeline slutförs
- Slack/Discord integration (valfritt)
- GitHub Issues med sammanfattning

## 🛠️ Felsökning

### Vanliga Problem

#### 1. **API Connection Error**
```
❌ Fel vid hämtning av artiklar: connect ECONNREFUSED
```
**Lösning:** Kontrollera WORDPRESS_URL och nätverksåtkomst

#### 2. **Authentication Error**
```
❌ Fel vid autentisering: 401 Unauthorized
```
**Lösning:** Uppdatera GitHub Secrets med korrekta credentials

#### 3. **Timeout Error**
```
❌ Pipeline timeout efter 6 timmar
```
**Lösning:** Minska learning duration eller optimera kod

### Debug Tips
1. **Kontrollera logs** i GitHub Actions
2. **Testa lokalt** först med `node intensive-ai-learning-engine.js`
3. **Verifiera secrets** är korrekt konfigurerade
4. **Kontrollera API endpoints** är tillgängliga

## 📝 Anpassning

### Ändra Körtid
```yaml
# I .github/workflows/ai-learning-pipeline.yml
learning_duration: '12'  # 12 timmar istället för 8
```

### Aktivera Artikelpublicering
```yaml
publish_articles: 'true'  # Publicera artiklar automatiskt
```

### Lägg till Fler Sökord
```javascript
// I intensive-ai-learning-engine.js
this.searchKeywords = [
    'AI RFID solutions',
    'RFID technology trends 2025',
    'ditt_nya_sökord_här',
    // ... fler sökord
];
```

## 🎯 Optimerering

### För Bättre Prestanda:
1. **Öka Node.js version** till 20.x
2. **Lägg till caching** för API calls
3. **Optimera sökfrekvens** (var 5:e cykel)
4. **Parallell bearbetning** av innehåll

### För Mer Insikter:
1. **Lägg till fler API:er** (Google Trends, SEMrush)
2. **Implementera sentiment analysis**
3. **Lägg till competitor analysis**
4. **Skapa A/B testing framework**

## 📞 Support

### När du behöver hjälp:
1. **Kontrollera logs** först
2. **Testa lokalt** med samma konfiguration
3. **Skapa GitHub Issue** med detaljerad beskrivning
4. **Inkludera error logs** och konfiguration

### Resurser:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [WooCommerce API](https://woocommerce.github.io/woocommerce-rest-api-docs/)

---

**🎉 Grattis!** Din AI Learning Pipeline är nu redo att köra ConceptSolutions hemsida på steroider! 🚀

AI:n kommer att arbeta kontinuerligt och förbättra hemsidan automatiskt baserat på marknadstrender, sökord och användarbeteende.

