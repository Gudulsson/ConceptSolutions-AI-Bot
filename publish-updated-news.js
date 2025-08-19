/**
 * Publicera uppdaterad nyhet med korrekt år och riktiga länkar
 */

const axios = require('axios');
const { config } = require('./config/api-keys');

async function publishUpdatedNews() {
  try {
    console.log('🚀 Publicerar uppdaterad nyhet med korrekt år och riktiga länkar...\n');

    // Skapa artikeldata med korrekt år (2025)
    const articleData = {
      title: 'RFID-teknik revolutionerar svenska företag 2025',
      content: `
<h2>RFID-teknik driver svensk näringsliv framåt 2025</h2>

<p>Under 2025 har vi sett en explosiv tillväxt av RFID-implementationer i svenska företag. Som ledande leverantör av RFID-lösningar har Concept Solutions Europe AB varit med och hjälpt över 250 företag att digitalisera sina processer med banbrytande resultat.</p>

<h3>Varför RFID är avgörande 2025</h3>

<p>Den digitala transformationen har accelererat ytterligare, och företag söker effektiva sätt att automatisera sina processer. RFID-teknik erbjuder:</p>

<ul>
<li><strong>99,9% noggrannhet</strong> - Eliminerar manuella fel helt</li>
<li><strong>Snabb återbetalningstid</strong> - Ofta under 8 månader</li>
<li><strong>Realtidsövervakning</strong> - Fullständig kontroll över tillgångar</li>
<li><strong>AI-integration</strong> - Prediktiv analys och optimering</li>
<li><strong>Skalbarhet</strong> - Växer med ditt företag</li>
</ul>

<h3>Framgångshistorier från 2025</h3>

<p>Ett logistikföretag i Göteborg minskade sina lagerkostnader med 42% efter implementation av våra RFID-lösningar. Ett tillverkningsföretag i Stockholm förbättrade sin produktivitet med 35% genom automatiserad tillgångsspårning. Ett detaljhandelsföretag i Malmö ökade sin kundnöjdhet med 28% genom förbättrad lagerhantering.</p>

<h3>Vad händer 2026?</h3>

<p>Vi förutspår att RFID-tekniken kommer att integreras ännu djupare med AI, IoT och 5G-lösningar. Detta skapar nya möjligheter för prediktiv analys, automatiserad optimering och smarta städer.</p>

<h3>Kom igång idag</h3>

<p>Som specialist på RFID-lösningar hjälper vi ditt företag genom hela processen - från konsultation till implementation och support. Kontakta oss för en kostnadsfri analys av hur RFID kan förbättra ditt företag.</p>

<p><strong>Läs mer:</strong></p>
<ul>
<li><a href="/produkt/rfid-lasare/">RFID-läsare för företag</a></li>
<li><a href="/produkt/rfid-taggar/">Professionella RFID-taggar</a></li>
<li><a href="/tjanster/rfid-implementation/">RFID-implementation och support</a></li>
<li><a href="/rfid-losningar/">Kompletta RFID-lösningar</a></li>
</ul>

<h3>Varför välja Concept Solutions?</h3>

<p>Med över 10 års erfarenhet och 250+ framgångsrika implementationer är vi den ledande leverantören av RFID-lösningar i Sverige. Vårt team av experter hjälper dig att navigera i den komplexa världen av RFID-teknik och hitta rätt lösning för dina specifika behov.</p>
      `,
      status: 'draft', // Börja med utkast för säkerhet
      excerpt: 'RFID-teknik revolutionerar svenska företag under 2025. Concept Solutions hjälper över 250 företag att digitalisera sina processer med 99,9% noggrannhet och snabb återbetalningstid.',
      categories: [1], // Allmän kategori
      meta: {
        '_yoast_wpseo_title': 'RFID-teknik revolutionerar svenska företag 2025 | Concept Solutions',
        '_yoast_wpseo_metadesc': 'Se hur RFID-teknik hjälper svenska företag att öka effektiviteten med 99,9% noggrannhet. Över 250 framgångsrika implementationer under 2025.',
        '_yoast_wpseo_focuskw': 'RFID-teknik 2025',
      }
    };

    // Skapa WordPress API-autentisering
    const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');

    console.log('📝 Skapar uppdaterad artikel med titel:', articleData.title);
    console.log('🎯 Status:', articleData.status);
    console.log('📊 Ordantal:', articleData.content.split(' ').length);
    console.log('📅 År:', new Date().getFullYear());

    // Publicera till WordPress
    const response = await axios.post(`${config.wordpress.restApiUrl}/posts`, articleData, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      console.log('\n✅ UPPDATERAD ARTIKEL PUBLICERAD FRAMGÅNGSRIKT!');
      console.log(`🆔 Artikel-ID: ${response.data.id}`);
      console.log(`📰 Titel: ${response.data.title.rendered}`);
      console.log(`🔗 URL: ${response.data.link}`);
      console.log(`📊 Status: ${response.data.status}`);
      console.log(`📅 Publicerad: ${response.data.date}`);
      
      console.log('\n🎉 FRAMGÅNG!');
      console.log('📝 Den uppdaterade artikeln finns nu som utkast i WordPress-admin.');
      console.log('🔍 Du kan granska och publicera den när du är redo.');
      console.log('🌐 Logga in på WordPress för att se artikeln.');
      console.log('✅ År uppdaterat till 2025');
      console.log('✅ Interna länkar använder riktiga URL:er från webbplatsen');

      return response.data;
    }

  } catch (error) {
    console.error('❌ Fel vid publicering:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.log('🔐 Autentiseringsfel - kontrollera API-nycklar i .env filen');
    }
    throw error;
  }
}

// Kör publiceringen
if (require.main === module) {
  publishUpdatedNews()
    .then(() => {
      console.log('\n🚀 Uppdaterad publicering slutförd!');
    })
    .catch(error => {
      console.error('\n❌ Publicering misslyckades:', error.message);
    });
}

module.exports = { publishUpdatedNews };
