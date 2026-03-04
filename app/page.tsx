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
import { Trophy, Calendar, Timer } from 'lucide-react';

export default async function Home() {
  const currentYear = new Date().getFullYear();
  
  // Fetch all data in parallel
  const [events, categories] = await Promise.all([
    getEvents(currentYear),
    getCategories(currentYear),
  ]);

  const nextEvent = getNextEvent(events);
  const recentEvents = getRecentEvents(events, 3);
  
  // Get standings for MotoGP (default)
  let standings: { classification: any[] } = { classification: [] };
  let lastResults: any[] = [];
  
  try {
    const season = await getCurrentSeason();
    const motoGPCategory = categories.find(c => c.name === 'MotoGP');
    
    if (motoGPCategory) {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section - Next Event */}
      {nextEvent && (
        <section className="mb-12">
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 overflow-hidden">
            <CardContent className="p-6 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-zinc-500" />
                    <span className="text-sm text-zinc-400 uppercase tracking-wider">Prochain Grand Prix</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2">
                    {nextEvent.name}
                  </h1>
                  <p className="text-lg text-zinc-400 mb-4">
                    {nextEvent.circuit.name}, {nextEvent.circuit.country}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span>{nextEvent.circuit.track?.length || '--'} m</span>
                    <span>•</span>
                    <span>{nextEvent.circuit.track?.left_corners || '--'} virages gauche</span>
                    <span>•</span>
                    <span>{nextEvent.circuit.track?.right_corners || '--'} droite</span>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <Countdown targetDate={nextEvent.date_start} />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Grid with Standings and Recent Results */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Championship Standings */}
        <section className="lg:col-span-2">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <CardTitle className="text-zinc-100">Championnat MotoGP</CardTitle>
              </div>
              <a 
                href="/standings" 
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Voir tout →
              </a>
            </CardHeader>
            <CardContent>
              {standings.classification.length > 0 ? (
                <StandingsTable standings={standings.classification.slice(0, 5)} />
              ) : (
                <p className="text-zinc-500 text-center py-8">Aucune donnée disponible</p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Recent Results */}
        <section>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-zinc-500" />
                <CardTitle className="text-zinc-100">Derniers Résultats</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {lastResults.length > 0 ? (
                <ResultsTable results={lastResults} />
              ) : (
                <div className="space-y-3">
                  {recentEvents.map((event) => (
                    <EventCard key={event.id} event={event} compact />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
