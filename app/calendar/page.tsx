import { getEvents, getRecentEvents } from '../_lib/api/events';
import { getCategories } from '../_lib/api/events';
import { EventCard } from '../_components/ui/EventCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const revalidate = 3600; // 1 hour

export default async function CalendarPage() {
  const currentYear = new Date().getFullYear();
  
  const [events, categories] = await Promise.all([
    getEvents(currentYear),
    getCategories(currentYear),
  ]);

  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Calendrier {currentYear}</h1>
        <p className="text-zinc-500">Tous les Grands Prix de la saison</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-zinc-500" />
            <CardTitle className="text-zinc-100">Liste des courses</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
