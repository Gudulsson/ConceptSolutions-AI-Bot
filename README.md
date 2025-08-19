# ConceptSolutions - WordPress & Elementor Webbshop

## Projektöversikt
ConceptSolutions är en hemsida och webbshop byggd i WordPress med Elementor som page builder.

## API-nycklar och Konfiguration

### Krävda API-nycklar:
1. **WordPress REST API** - För kommunikation med WordPress
2. **WooCommerce API** - För webbshop-funktionalitet
3. **Payment Gateway APIs** - För betalningshantering
4. **Email Service API** - För e-postutskick
5. **Analytics API** - För webbanalys

### Säkerhet
- Alla API-nycklar lagras i `.env` filer
- `.env` filer är exkluderade från version control
- Produktionsnycklar hanteras separat från utvecklingsnycklar

## Installation
1. Klona projektet
2. Kopiera `.env.example` till `.env`
3. Fyll i dina API-nycklar i `.env` filen
4. Installera beroenden: `npm install`

## Utveckling
- `npm run dev` - Starta utvecklingsserver
- `npm run build` - Bygg för produktion
- `npm run test` - Kör tester
# ConceptSolutions-AI-Bot
