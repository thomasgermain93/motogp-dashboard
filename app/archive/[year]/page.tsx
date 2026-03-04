import { getEvents } from '@/app/_lib/api/events';
import { getCategories } from '@/app/_lib/api/events';
import { getSeasonByYear } from '@/app/_lib/api/seasons';
import { EventCard } from '@/app/_components/ui/EventCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: { year: string };
}

export const revalidate = 3600; // 1 hour

export default async function ArchivePage({ params }: Props) {
  const year = parseInt(params.year);
  
  if (isNaN(year) || year < 2023 || year > 2025) {
    notFound();
  }

  try {
    // Get season first to validate it exists
    const season = await getSeasonByYear(year);
    if (!season) {
      notFound();
    }

    const [events, categories] = await Promise.all([
      getEvents(year),
      getCategories(year),
    ]);

    const sortedEvents = [...events].sort((a, b) => 
      new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    );

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2">Archives {year}</h1>
          <p className="text-zinc-500">Saison {year} du championnat du monde MotoGP</p>
        </div>

        {/* Year Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[2023, 2024, 2025].map((y) => (
            <Link
              key={y}
              href={`/archive/${y}`}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                y === year
                  ? 'bg-zinc-100 text-zinc-900 shadow-lg shadow-zinc-100/10'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {y}
            </Link>
          ))}
        </div>

        {/* Events List */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg">
                <Calendar className="w-5 h-5 text-zinc-400" />
              </div>
              <CardTitle className="text-zinc-100">Calendrier {year}</CardTitle>
              <span className="text-sm text-zinc-500 ml-auto">{sortedEvents.length} courses</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-zinc-500 text-center py-8">Aucun événement trouvé pour cette saison</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Archive error:', error);
    notFound();
  }
}
