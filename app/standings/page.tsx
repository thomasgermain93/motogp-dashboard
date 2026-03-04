import { getCurrentSeason } from '../_lib/api/seasons';
import { getCategories } from '../_lib/api/events';
import { getStandings } from '../_lib/api/standings';
import { StandingsTable } from '../_components/ui/StandingsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export const revalidate = 300; // 5 minutes

export default async function StandingsPage() {
  const currentYear = new Date().getFullYear();
  
  try {
    const [season, categories] = await Promise.all([
      getCurrentSeason(),
      getCategories(currentYear),
    ]);

    const motoGPCategory = categories.find(c => c.name === 'MotoGP') || categories[0];
    
    if (!motoGPCategory) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Classements</h1>
          <p className="text-zinc-500">Aucune catégorie disponible</p>
        </div>
      );
    }

    const standings = await getStandings(season.id, motoGPCategory.id);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Classements</h1>
          <p className="text-zinc-500">Championnat {currentYear}</p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Classement {motoGPCategory.name.replace('™', '')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {standings.classification && standings.classification.length > 0 ? (
              <StandingsTable standings={standings.classification} />
            ) : (
              <p className="text-zinc-500 text-center py-8">Aucune donnée disponible pour le moment</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Classements</h1>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-8">
            <p className="text-zinc-500 text-center">Impossible de charger les classements. Veuillez réessayer plus tard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
}
