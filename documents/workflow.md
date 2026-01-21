# Workflow

## Första gången du klonar/pullar
1. `npm install`
2. `npm run dev`
3. Öppna localhost i browser

## När du jobbar
- `npm run dev` för att starta
- Ctrl+C för att stoppa
- Sparar filer = auto-reload i browser

## Efter pull från git
- `npm install` (ifall nya paket lagts till)
- Annars direkt `npm run dev`

## Innan push
- `npm run lint` (kolla inga errors)
- Testa att allt funkar

## Mappar att veta om
- `src/` - All kod
- `public/` - Statiska filer (bilder etc)
- `dist/` - Production build (ignorera)
- `node_modules/` - Paket (ignorera)
