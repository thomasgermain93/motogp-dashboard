import { getCurrentSeason, getSeasonByYear } from '../_lib/api/seasons';
import { getCategories } from '../_lib/api/events';
import { getStandings } from '../_lib/api/standings';
import { StandingsTable } from '../_components/ui/StandingsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, AlertCircle } from 'lucide-react';

export const revalidate = 300; // 5 minutes

export default async function StandingsPage() {
  const currentYear = 2025;
  
  try {
    const [season, categories] = await Promise.all([
      getSeasonByYear(currentYear),
      getCategories(currentYear),
    ]);

    if (!season) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2">Classements</h1>
          <Card className="bg-zinc-900 border-zinc-800 mt-8">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500">Aucune saison disponible</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    const motoGPCategory = categories.find(c => c.name === 'MotoGP');
    
    if (!motoGPCategory) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2">Classements</h1>
          <Card className="bg-zinc-900 border-zinc-800 mt-8">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500">Catégorie MotoGP non trouvée</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    let standings;
    try {
      standings = await getStandings(season.id, motoGPCategory.id);
    } catch (error) {
      console.log('No standings available yet for season', currentYear);
      standings = { classification: [] };
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2">Classements</h1>
          <p className="text-zinc-500">Championnat {currentYear}</p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <CardTitle className="text-zinc-100">Classement {motoGPCategory.name.replace('™', '')}</CardTitle>
                <p className="text-sm text-zinc-500">Saison {currentYear}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {standings.classification && standings.classification.length > 0 ? (
              <StandingsTable standings={standings.classification} />
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg mb-2">Aucune donnée disponible pour le moment</p>
                <p className="text-zinc-600">Les classements seront disponibles après le premier Grand Prix</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2">Classements</h1>
        <Card className="bg-zinc-900 border-zinc-800 mt-8">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-zinc-400">Impossible de charger les classements</p>
            <p className="text-zinc-600 text-sm mt-2">Veuillez réessayer plus tard</p>
          </CardContent>
        </Card>
      </div>
    );
  }
}
