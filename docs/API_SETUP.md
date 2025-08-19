# ConceptSolutions API Setup Guide

## Översikt
Denna guide hjälper dig att sätta upp alla nödvändiga API-nycklar för ConceptSolutions WordPress & Elementor webbshop.

## Steg-för-steg Installation

### 1. Förberedelse
```bash
# Klona projektet
git clone [repository-url]
cd conceptsolutions-bot

# Installera beroenden
npm install
```

### 2. Konfigurera Miljövariabler
```bash
# Kopiera exempel-filen
cp env.example .env

# Redigera .env-filen med dina riktiga API-nycklar
nano .env
```

## API-nycklar som behövs

### WordPress REST API
**Kritiskt för grundfunktionalitet**

1. Gå till din WordPress admin-panel
2. Navigera till **Användare > Din profil**
3. Scrolla ner till **Application Passwords**
4. Skapa en ny applikationslösenord
5. Lägg till i `.env`:
   ```
   WORDPRESS_USERNAME=din_användarnamn
   WORDPRESS_APPLICATION_PASSWORD=din_applikationslösenord
   ```

### WooCommerce API
**Kritiskt för webbshop-funktionalitet**

1. Gå till **WooCommerce > Inställningar > Avancerat > REST API**
2. Klicka **Lägg till nyckel**
3. Ge nyckeln ett namn (t.ex. "ConceptSolutions Bot")
4. Välj **Läs/Skriv** behörigheter
5. Klicka **Generera API-nyckel**
6. Lägg till i `.env`:
   ```
   WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Betalningsgateways

#### Stripe
1. Skapa konto på [stripe.com](https://stripe.com)
2. Gå till **Developers > API keys**
3. Kopiera **Publishable key** och **Secret key**
4. Lägg till i `.env`:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxx
   ```

#### Klarna
1. Skapa konto på [klarna.com](https://klarna.com)
2. Gå till **Merchant Portal > API Credentials**
3. Kopiera **Merchant ID** och **Shared Secret**
4. Lägg till i `.env`:
   ```
   KLARNA_MERCHANT_ID=your_merchant_id
   KLARNA_SHARED_SECRET=your_shared_secret
   KLARNA_TEST_MODE=true
   ```

#### PayPal
1. Skapa konto på [developer.paypal.com](https://developer.paypal.com)
2. Gå till **My Apps & Credentials**
3. Skapa en ny app
4. Kopiera **Client ID** och **Secret**
5. Lägg till i `.env`:
   ```
   PAYPAL_CLIENT_ID=your_client_id
   PAYPAL_CLIENT_SECRET=your_client_secret
   PAYPAL_MODE=sandbox
   ```

### E-posttjänster

#### SendGrid
1. Skapa konto på [sendgrid.com](https://sendgrid.com)
2. Gå till **Settings > API Keys**
3. Skapa en ny API-nyckel med **Full Access**
4. Lägg till i `.env`:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   SENDGRID_FROM_EMAIL=noreply@conceptsolutions.se
   SENDGRID_FROM_NAME=ConceptSolutions
   ```

#### Mailchimp
1. Skapa konto på [mailchimp.com](https://mailchimp.com)
2. Gå till **Account > Extras > API keys**
3. Skapa en ny API-nyckel
4. Hitta din **Audience ID** under **Audience > Settings > Audience name and defaults**
5. Lägg till i `.env`:
   ```
   MAILCHIMP_API_KEY=your_api_key
   MAILCHIMP_LIST_ID=your_audience_id
   MAILCHIMP_SERVER_PREFIX=us1
   ```

### Analytics & Tracking

#### Google Analytics
1. Skapa konto på [analytics.google.com](https://analytics.google.com)
2. Skapa en ny egenskap för din webbplats
3. Kopiera **Measurement ID** (GA_XXXXXXXXX)
4. Lägg till i `.env`:
   ```
   GOOGLE_ANALYTICS_TRACKING_ID=GA_XXXXXXXXX
   ```

#### Facebook Pixel
1. Skapa konto på [business.facebook.com](https://business.facebook.com)
2. Gå till **Events Manager > Data Sources**
3. Skapa en ny Pixel
4. Kopiera **Pixel ID**
5. Lägg till i `.env`:
   ```
   FACEBOOK_PIXEL_ID=your_pixel_id
   ```

### Social Media

#### Instagram Business API
1. Koppla ditt Instagram-konto till Facebook Business Manager
2. Gå till **Instagram Basic Display**
3. Skapa en ny app
4. Generera **Access Token**
5. Lägg till i `.env`:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_access_token
   INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_account_id
   ```

#### Facebook App
1. Skapa en ny app på [developers.facebook.com](https://developers.facebook.com)
2. Gå till **Settings > Basic**
3. Kopiera **App ID** och **App Secret**
4. Lägg till i `.env`:
   ```
   FACEBOOK_APP_ID=your_app_id
   FACEBOOK_APP_SECRET=your_app_secret
   ```

## Validering av API-nycklar

### Kör valideringsscript
```bash
npm run validate-keys
```

Detta script kommer att:
- Testa alla kritiska API-nycklar
- Verifiera anslutningar
- Visa status för alla tjänster
- Ge rekommendationer för saknade nycklar

### Manuell validering
```bash
# Testa WordPress API
curl -u "username:password" https://conceptsolutions.se/wp-json/wp/v2/posts

# Testa WooCommerce API
curl -u "consumer_key:consumer_secret" https://conceptsolutions.se/wp-json/wc/v3/products
```

## Säkerhet

### Best Practices
1. **Aldrig** committa `.env` filer till Git
2. Använd olika API-nycklar för utveckling och produktion
3. Rotera API-nycklar regelbundet
4. Använd minsta möjliga behörigheter för varje API-nyckel
5. Övervaka API-användning för ovanlig aktivitet

### Produktionsmiljö
```bash
# Skapa produktionsmiljö
cp env.example .env.production

# Fyll i produktionsnycklar
nano .env.production

# Sätt miljövariabel
export NODE_ENV=production
```

## Felsökning

### Vanliga problem

#### WordPress API fel
- Kontrollera att Application Passwords är aktiverat
- Verifiera användarnamn och lösenord
- Kontrollera att REST API är aktiverat

#### WooCommerce API fel
- Verifiera att WooCommerce är installerat och aktiverat
- Kontrollera API-nycklarnas behörigheter
- Se till att REST API är aktiverat

#### Betalningsgateway fel
- Kontrollera att du använder rätt miljö (test/produktion)
- Verifiera API-nycklarnas format
- Kontrollera webhook-konfiguration

### Loggar
```bash
# Aktivera debug-loggning
export DEBUG=true
export LOG_LEVEL=debug

# Kör applikationen
npm run dev
```

## Support

Om du stöter på problem:
1. Kontrollera [felsökningsguiden](#felsökning)
2. Kör valideringsscriptet: `npm run validate-keys`
3. Kontrollera loggarna för felmeddelanden
4. Kontakta support-teamet med felmeddelanden och loggar
