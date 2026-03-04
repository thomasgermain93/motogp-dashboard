import { getEvents } from '../_lib/api/events';
import { getCategories } from '../_lib/api/events';
import { EventCard } from '../_components/ui/EventCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const revalidate = 3600; // 1 hour

export default async function CalendarPage() {
  const currentYear = 2025;
  
  const [events, categories] = await Promise.all([
    getEvents(currentYear),
    getCategories(currentYear),
  ]);

  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
  );

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = sortedEvents.filter(e => new Date(e.date_start) > now);
  const pastEvents = sortedEvents.filter(e => new Date(e.date_start) <= now);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2">Calendrier {currentYear}</h1>
        <p className="text-zinc-500">Tous les Grands Prix de la saison</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-zinc-100">{sortedEvents.length}</p>
            <p className="text-sm text-zinc-500">Courses</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-500">{upcomingEvents.length}</p>
            <p className="text-sm text-zinc-500">À venir</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-zinc-500">{pastEvents.length}</p>
            <p className="text-sm text-zinc-500">Terminées</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-lg">
              <Calendar className="w-5 h-5 text-zinc-400" />
            </div>
            <CardTitle className="text-zinc-100">Liste des courses</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
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
