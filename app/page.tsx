import { getEvents, getNextEvent, getRecentEvents } from './_lib/api/events';
import { getCurrentSeason } from './_lib/api/seasons';
import { getCategories } from './_lib/api/events';
import { getStandings } from './_lib/api/standings';
import { getClassification, getSessions } from './_lib/api/sessions';
import { Countdown } from './_components/ui/Countdown';
import { StandingsTable } from './_components/ui/StandingsTable';
import { ResultsTable } from './_components/ui/ResultsTable';
import { EventCard } from './_components/ui/EventCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Calendar, Timer, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const currentYear = 2025; // Use 2025 for data
  const displayYear = new Date().getFullYear();
  
  // Fetch all data in parallel
  const [events, categories, season] = await Promise.all([
    getEvents(currentYear),
    getCategories(currentYear),
    getCurrentSeason(),
  ]);

  const nextEvent = getNextEvent(events);
  const recentEvents = getRecentEvents(events, 3);
  
  // Get standings for MotoGP (default)
  let standings: { classification: any[] } = { classification: [] };
  let lastResults: any[] = [];
  
  try {
    const motoGPCategory = categories.find(c => c.name === 'MotoGP');
    
    if (motoGPCategory && season) {
      const standingsData = await getStandings(season.id, motoGPCategory.id);
      standings = standingsData;
      
      // Get results from most recent finished event
      if (recentEvents.length > 0) {
        const lastEvent = recentEvents[0];
        const sessions = await getSessions(lastEvent.id, motoGPCategory.id);
        const raceSession = sessions.find(s => s.type === 'RAC');
        if (raceSession) {
          const classification = await getClassification(raceSession.id, currentYear);
          lastResults = classification.classification.slice(0, 5);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching standings:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Hero Section - Next Event */}
      {nextEvent && (
        <section className="mb-16">
          <Card className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border-zinc-800 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
            
            <CardContent className="p-6 sm:p-12 relative">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm text-red-400 font-medium uppercase tracking-wider">Prochain Grand Prix</span>
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 leading-tight">
                    {nextEvent.name}
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-zinc-400 mb-6">
                    {nextEvent.circuit.name}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500 mb-8">
                    <span className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-full">
                      <span className="font-mono text-zinc-300">{nextEvent.circuit.track?.length || '--'}m</span>
                      <span className="text-zinc-600">|</span>
                      <span>{nextEvent.circuit.track?.left_corners || '--'}G</span>
                      <span>{nextEvent.circuit.track?.right_corners || '--'}D</span>
                    </span>
                  </div>

                  <Link 
                    href={`/results/${nextEvent.id}`}
                    className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
                  >
                    Voir les résultats
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="flex justify-center lg:justify-end">
                  <div className="bg-zinc-950/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/50">
                    <Countdown targetDate={nextEvent.date_start} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Grid with Standings and Recent Results */}
      <div className="grid xl:grid-cols-3 gap-8">
        {/* Championship Standings */}
        <section className="xl:col-span-2">
          <Card className="bg-zinc-900 border-zinc-800 h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <CardTitle className="text-zinc-100 text-lg">Championnat MotoGP</CardTitle>
                  <p className="text-sm text-zinc-500">Saison {currentYear}</p>
                </div>
              </div>
              <Link 
                href="/standings" 
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1"
              >
                Voir tout
                <ChevronRight className="w-4 h-4" />
              </Link>
            </CardHeader>
            <CardContent className="pt-6">
              {standings.classification.length > 0 ? (
                <StandingsTable standings={standings.classification.slice(0, 5)} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-zinc-500 mb-2">Aucune donnée disponible</p>
                  <p className="text-sm text-zinc-600">Les classements seront disponibles après le premier GP</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Recent Results */}
        <section>
          <Card className="bg-zinc-900 border-zinc-800 h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg">
                  <Timer className="w-5 h-5 text-zinc-400" />
                </div>
                <CardTitle className="text-zinc-100 text-lg">Derniers Résultats</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {lastResults.length > 0 ? (
                <ResultsTable results={lastResults} />
              ) : (
                <div className="space-y-4">
                  {recentEvents.slice(0, 3).map((event) => (
                    <EventCard key={event.id} event={event} compact />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Quick Links */}
      <section className="mt-12">
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/calendar">
            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-100">Calendrier</h3>
                  <p className="text-sm text-zinc-500">Tous les GP de la saison</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/riders">
            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                  <Trophy className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-100">Pilotes</h3>
                  <p className="text-sm text-zinc-500">Grille {currentYear}</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/standings">
            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <Trophy className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-100">Classements</h3>
                  <p className="text-sm text-zinc-500">Championnats</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
