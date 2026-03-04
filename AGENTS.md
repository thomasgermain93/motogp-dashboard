# AGENTS.md - MotoGP Dashboard

## Règles de Développement

### Style de Code
- TypeScript strict mode
- Functional components avec hooks
- Server Components par défaut
- 'use client' uniquement pour interactivité
- Imports triés: React → Libs → Local

### Nommage
- Components: PascalCase (ex: `StandingsTable.tsx`)
- Hooks: camelCase prefix 'use' (ex: `useLiveTiming.ts`)
- Utils: camelCase (ex: `formatDate.ts`)
- Types: PascalCase (ex: `Rider`, `LiveTimingData`)

### Structure Fichier
```typescript
// 1. Imports
import { useState } from 'react';
import { formatDate } from '@/app/_lib/utils/date';

// 2. Types (si non dans fichier dédié)
interface Props { ... }

// 3. Component
export function ComponentName({ prop1, prop2 }: Props) {
  // hooks
  // handlers
  // render
}

// 4. Exports
export default ComponentName;
```

### API Client
- Toujours utiliser le client dans `app/_lib/api/client.ts`
- Ne jamais appeler l'API MotoGP directement depuis les composants
- Gérer les erreurs avec try/catch + fallback UI

### CSS/Tailwind
- Utiliser les classes Tailwind, pas de CSS custom
- Ordre: layout → spacing → sizing → colors → effects
- Responsive: mobile-first (`sm:`, `md:`, `lg:`)
- Dark mode: `dark:` prefix

### Gestion d'État
- Server state: React Server Components + revalidate
- Client state: useState/useReducer
- Global state: Context si nécessaire (éviter)
- Cache: SWR pour data fetching client

### Performance
- Images: `<Image>` avec width/height
- Listes: `key` prop stable (id, pas index)
- Memo: `useMemo`/`useCallback` sur calculs lourds
- Lazy: `dynamic()` pour composants lourds

### Sécurité
- Pas de clés API en dur
- Sanitize inputs
- CSP headers
- No eval() ou dangerouslySetInnerHTML

## Commandes
```bash
# Dev
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Déploiement
- Platform: Vercel
- Branche: main
- Auto-deploy sur push
- Variables d'environnement dans Vercel Dashboard
