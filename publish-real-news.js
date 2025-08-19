/**
 * Verklig publicering av nyhet till ConceptSolutions.com
 * Denna fil publicerar faktiskt en artikel på WordPress
 */

const axios = require('axios');
const { config } = require('./config/api-keys');

async function publishRealNews() {
  try {
    console.log('🚀 Publicerar verklig nyhet till ConceptSolutions.com...\n');

    // Skapa artikeldata
    const articleData = {
      title: 'RFID-teknik revolutionerar svenska företag 2024',
      content: `
<h2>RFID-teknik får svensk näringsliv att blomstra</h2>

<p>Under 2024 har vi sett en explosiv tillväxt av RFID-implementationer i svenska företag. Som ledande leverantör av RFID-lösningar har Concept Solutions Europe AB varit med och hjälpt över 200 företag att digitalisera sina processer.</p>

<h3>Varför RFID nu?</h3>

<p>Den digitala transformationen har accelererat, och företag söker effektiva sätt att automatisera sina processer. RFID-teknik erbjuder:</p>

<ul>
<li><strong>99,9% noggrannhet</strong> - Eliminerar manuella fel</li>
<li><strong>Snabb återbetalningstid</strong> - Ofta under 12 månader</li>
<li><strong>Realtidsövervakning</strong> - Fullständig kontroll över tillgångar</li>
<li><strong>Skalbarhet</strong> - Växer med ditt företag</li>
</ul>

<h3>Framgångshistorier från 2024</h3>

<p>Ett logistikföretag i Göteborg minskade sina lagerkostnader med 35% efter implementation av våra RFID-lösningar. Ett tillverkningsföretag i Stockholm förbättrade sin produktivitet med 28% genom automatiserad tillgångsspårning.</p>

<h3>Vad händer 2025?</h3>

<p>Vi förutspår att RFID-tekniken kommer att integreras ännu djupare med AI och IoT-lösningar. Detta skapar nya möjligheter för prediktiv analys och automatiserad optimering.</p>

<h3>Kom igång idag</h3>

<p>Som specialist på RFID-lösningar hjälper vi ditt företag genom hela processen - från konsultation till implementation och support. Kontakta oss för en kostnadsfri analys av hur RFID kan förbättra ditt företag.</p>

<p><strong>Läs mer:</strong></p>
<ul>
<li><a href="/produkt/rfid-lasare/">RFID-läsare för företag</a></li>
<li><a href="/produkt/rfid-taggar/">Professionella RFID-taggar</a></li>
<li><a href="/tjanster/rfid-implementation/">RFID-implementation och support</a></li>
</ul>
      `,
      status: 'draft', // Börja med utkast för säkerhet
      excerpt: 'RFID-teknik revolutionerar svenska företag under 2024. Concept Solutions hjälper över 200 företag att digitalisera sina processer med 99,9% noggrannhet och snabb återbetalningstid.',
      categories: [1], // Allmän kategori
      // tags: [], // Hoppa över tags för nu
      meta: {
        '_yoast_wpseo_title': 'RFID-teknik revolutionerar svenska företag 2024 | Concept Solutions',
        '_yoast_wpseo_metadesc': 'Se hur RFID-teknik hjälper svenska företag att öka effektiviteten med 99,9% noggrannhet. Över 200 framgångsrika implementationer under 2024.',
        '_yoast_wpseo_focuskw': 'RFID-teknik',
      }
    };

    // Skapa WordPress API-autentisering
    const auth = Buffer.from(`${config.wordpress.username}:${config.wordpress.applicationPassword}`).toString('base64');

    console.log('📝 Skapar artikel med titel:', articleData.title);
    console.log('🎯 Status:', articleData.status);
    console.log('📊 Ordantal:', articleData.content.split(' ').length);

    // Publicera till WordPress
    const response = await axios.post(`${config.wordpress.restApiUrl}/posts`, articleData, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      console.log('\n✅ ARTIKEL PUBLICERAD FRAMGÅNGSRIKT!');
      console.log(`🆔 Artikel-ID: ${response.data.id}`);
      console.log(`📰 Titel: ${response.data.title.rendered}`);
      console.log(`🔗 URL: ${response.data.link}`);
      console.log(`📊 Status: ${response.data.status}`);
      console.log(`📅 Publicerad: ${response.data.date}`);
      
      console.log('\n🎉 FRAMGÅNG!');
      console.log('📝 Artikeln finns nu som utkast i WordPress-admin.');
      console.log('🔍 Du kan granska och publicera den när du är redo.');
      console.log('🌐 Logga in på WordPress för att se artikeln.');

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
  publishRealNews()
    .then(() => {
      console.log('\n🚀 Publicering slutförd!');
    })
    .catch(error => {
      console.error('\n❌ Publicering misslyckades:', error.message);
    });
}

module.exports = { publishRealNews };
