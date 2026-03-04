# MotoGP Dashboard

Dashboard minimaliste pour suivre le championnat MotoGP. Design noir/blanc/gris, sans publicité.

## Fonctionnalités

- **Dashboard** : Prochain GP avec compte à rebours, derniers résultats, classement
- **Calendrier** : Tous les Grands Prix de la saison
- **Classements** : Championnats pilotes (MotoGP, Moto2, Moto3, MotoE)
- **Pilotes** : Grille complète avec profils détaillés
- **Résultats** : Résultats par GP et par session
- **Live** : Timing en temps réel pendant les sessions
- **Archives** : Accès à la saison 2024

## Tech Stack

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **UI** : shadcn/ui
- **API** : MotoGP PulseLive API (non officielle)

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

```
app/
├── _components/     # Composants React
├── _lib/           # API, types, utils
├── _hooks/         # Hooks React
├── page.tsx        # Dashboard
├── calendar/       # Calendrier
├── standings/      # Classements
├── riders/         # Pilotes
├── results/        # Résultats GP
├── live/          # Live timing
└── archive/       # Archives
```

## Déploiement

Le site est prêt pour être déployé sur Vercel :

```bash
vercel --prod
```

## Notes

- L'API MotoGP est non officielle et peut changer sans préavis
- Les données sont mises en cache (ISR) pour optimiser les performances
- Pas de tracking, pas de cookies, juste les données
