import { getEvent } from '@/app/_lib/api/events';
import { getCategories } from '@/app/_lib/api/events';
import { getSessions, getClassification } from '@/app/_lib/api/sessions';
import { ResultsTable } from '@/app/_components/ui/ResultsTable';
import { SessionTabs } from '@/app/_components/ui/SessionTabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';
import { formatDate } from '@/app/_lib/utils/date';
import { notFound } from 'next/navigation';

interface Props {
  params: { eventId: string };
  searchParams: { session?: string };
}

export const revalidate = 300; // 5 minutes

export default async function ResultsPage({ params, searchParams }: Props) {
  try {
    const currentYear = new Date().getFullYear();
    
    const [event, categories] = await Promise.all([
      getEvent(params.eventId),
      getCategories(currentYear),
    ]);

    const motoGPCategory = categories.find(c => c.name === 'MotoGP') || categories[0];
    
    if (!motoGPCategory) {
      notFound();
    }

    const sessions = await getSessions(params.eventId, motoGPCategory.id);
    
    // Get active session from query or use first available
    const activeSessionId = searchParams.session || sessions[0]?.id;
    const activeSession = sessions.find(s => s.id === activeSessionId);
    
    let classification: { classification: any[] } = { classification: [] };
    if (activeSession) {
      classification = await getClassification(activeSession.id, currentYear);
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">{event.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-zinc-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {event.circuit.name}, {event.circuit.country}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(event.date_start)}
            </span>
          </div>
        </div>

        {/* Session Tabs & Results */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">Résultats</CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length > 0 ? (
              <>
                {/* Session Selector */}
                <div className="mb-6">
                  <SessionTabs
                    sessions={sessions}
                    activeSession={activeSessionId || null}
                    onSessionChange={(id) => {
                      // This will be handled client-side with URL update
                      window.location.search = `?session=${id}`;
                    }}
                  />
                </div>

                {/* Results Table */}
                {classification.classification.length > 0 ? (
                  <ResultsTable results={classification.classification} />
                ) : (
                  <p className="text-zinc-500 text-center py-8">
                    Aucun résultat disponible pour cette session
                  </p>
                )}
              </>
            ) : (
              <p className="text-zinc-500 text-center py-8">
                Aucune session disponible pour ce Grand Prix
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } catch {
    notFound();
  }
}
