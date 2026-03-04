# MotoGP Dashboard - Plan de Développement

## Vue d'ensemble
Dashboard MotoGP minimaliste, noir/blanc/gris, sans publicité, affichant les données essentielles de la saison en cours.

## Stack Technique
- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui + composants personnalisés
- **Utils**: date-fns (dates), lucide-react (icônes), swr (fetching)

## Structure du Projet
```
app/
├── _lib/
│   ├── types/
│   │   └── index.ts          # Types TypeScript API MotoGP
│   ├── api/
│   │   ├── client.ts         # Client API avec cache/retry
│   │   ├── seasons.ts        # Endpoints saisons
│   │   ├── events.ts         # Endpoints événements
│   │   ├── riders.ts         # Endpoints pilotes
│   │   ├── standings.ts      # Endpoints classements
│   │   ├── sessions.ts       # Endpoints sessions
│   │   └── live.ts           # Endpoints live timing
│   └── utils/
│       ├── date.ts           # Formatage dates FR
│       └── format.ts         # Formatage données
├── _components/
│   ├── layout/
│   │   ├── Header.tsx        # En-tête avec nav
│   │   ├── Footer.tsx        # Pied de page
│   │   └── ThemeToggle.tsx   # Toggle dark/light
│   ├── ui/
│   │   ├── CategoryTabs.tsx  # Onglets MotoGP/Moto2/Moto3/MotoE
│   │   ├── Countdown.tsx     # Compte à rebours GP
│   │   ├── CircuitMap.tsx    # SVG circuit (placeholder)
│   │   ├── LiveTiming.tsx    # Tableau live
│   │   ├── StandingsTable.tsx # Tableau classement
│   │   ├── ResultsTable.tsx  # Tableau résultats
│   │   ├── RiderCard.tsx     # Carte pilote
│   │   ├── EventCard.tsx     # Carte course
│   │   └── SessionTabs.tsx   # Onglets sessions
│   └── sections/
│       ├── HeroSection.tsx   # Prochain GP + countdown
│       ├── LatestResults.tsx # Derniers résultats
│       └── ChampionshipWidget.tsx # Mini classement
├── _hooks/
│   └── useLiveTiming.ts      # Hook polling live
├── page.tsx                  # Dashboard (landing)
├── layout.tsx                # Root layout
├── globals.css               # Styles globaux
├── calendar/
│   └── page.tsx              # Calendrier saison
├── standings/
│   └── page.tsx              # Classements
├── riders/
│   ├── page.tsx              # Grille pilotes
│   └── [id]/
│       └── page.tsx          # Profil pilote
├── results/
│   └── [eventId]/
│       └── page.tsx          # Résultats GP
├── live/
│   └── page.tsx              # Live timing
└── archive/
    └── [year]/
        └── page.tsx          # Archives

components/ui/                # Composants shadcn
public/                       # Assets statiques
```

## API Endpoints Utilisés
```
Base: https://api.motogp.pulselive.com/motogp/v1

Broadcast API:
- GET /categories?seasonYear={year}
- GET /events?seasonYear={year}
- GET /riders?seasonYear={year}
- GET /riders/{id}
- GET /teams?categoryUuid={}&seasonYear={year}

Results API:
- GET /results/seasons
- GET /results/events?seasonUuid={}
- GET /results/sessions?eventUuid={}&categoryUuid={}
- GET /results/session/{id}/classification
- GET /results/standings?seasonUuid={}&categoryUuid={}

Live API:
- GET /timing-gateway/livetiming-lite
```

## Stratégie de Cache
| Données | Revalidation | Raison |
|---------|--------------|--------|
| Saisons | 1 jour | Statique |
| Calendrier | 1 heure | Peu de changements |
| Pilotes/Équipes | 1 heure | Transferts rares |
| Classements | 5 minutes | Points après courses |
| Résultats | 5 minutes | Fin de sessions |
| Live | Client-side polling | Temps réel |

## Design System
```css
/* Couleurs */
--background: #09090b (dark) / #fafafa (light)
--foreground: #fafafa (dark) / #18181b (light)
--muted: #27272a (dark) / #f4f4f5 (light)
--border: #3f3f46 (dark) / #e4e4e7 (light)
--accent: #71717a

/* Typographie */
Font: Inter (system-ui fallback)
Titres: font-bold (700-900)
Corps: font-normal (400)
Données: font-mono (temps/chiffres)

/* Espacement */
Max-width: 1400px
Padding: px-4 sm:px-6 lg:px-8
```

## Navigation
```
Logo (MotoGP) → Accueil
├── Calendrier
├── Classements
├── Pilotes
└── Live (badge "EN COURS" si actif)
```

## Pages

### / (Dashboard)
1. **HeroSection**: Prochain GP avec countdown
2. **LatestResults**: Derniers résultats (3 derniers GP)
3. **ChampionshipWidget**: Top 5 classement pilotes

### /calendar
- Grille des GP de la saison
- Statut: À venir / En cours / Terminé
- Date formatée en français

### /standings
- Onglets: Pilotes / Constructeurs
- Onglets catégories: MotoGP / Moto2 / Moto3 / MotoE
- Tableau avec position, pilote, équipe, points

### /riders
- Grille de cartes pilotes
- Filtre par catégorie
- Photo, nom, numéro, équipe, nationalité

### /riders/[id]
- Photo profil
- Informations (âge, nationalité, équipe)
- Statistiques carrière
- Résultats par saison

### /results/[eventId]
- Info course (circuit, date)
- Onglets sessions: FP1/FP2/FP3/Q/Sprint/Race
- Tableau résultats par session

### /live
- Statut session (en cours/terminée)
- Tableau positions temps réel
- Toggle simple/complet
- Carte circuit (placeholder SVG)

### /archive/[year]
- Sélecteur d'année (2024-2025)
- Mêmes vues que saison en cours

## Composants Clés

### CategoryTabs
```typescript
interface Props {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Array<{ id: string; name: string }>;
}
```

### Countdown
```typescript
interface Props {
  targetDate: string;
  label?: string;
}
// Affiche: Jours | Heures | Minutes | Secondes
```

### StandingsTable
```typescript
interface Props {
  standings: StandingEntry[];
  category: string;
}
// Colonnes: Pos, Pilote, Équipe, Points
```

### LiveTiming
```typescript
interface Props {
  data: LiveTimingData;
  viewMode: 'simple' | 'complete';
}
// Simple: Pos, #, Nom, Temps, Écart
// Complet: + Tours, Vitesse max, Dernier tour, Pit
```

## Helpers

### Formatage Dates (FR)
```typescript
formatDate(date: string): string      // "15 mars 2025"
formatDateTime(date: string): string  // "15 mars 2025, 14:30"
formatTime(time: string): string      // "1'47.582"
```

### Formatage Données
```typescript
formatPosition(pos: number): string   // "1er", "2e", "3e"
formatPoints(points: number): string  // "125"
formatGap(gap: string): string        // "+0.452"
```

## Anti-Ban Strategy
1. **Rate Limiting**: Max 30 req/min côté serveur
2. **User-Agent**: Personnalisé avec contact
3. **Retry**: Backoff exponentiel (1s, 2s, 4s, 8s)
4. **Cache**: Aggressif côté serveur (ISR)
5. **Error Handling**: Fallback sur données stale

## Performance
- Images: next/image avec optimisation
- Fonts: next/font (Inter)
- CSS: Tailwind purge unused
- JS: Code splitting par route
- API: SWR pour client-side cache

## Accessibilité
- Contraste AAA (noir/blanc)
- ARIA labels sur éléments interactifs
- Navigation clavier
- Reduced motion support
