import type { Event } from '@/app/_lib/types';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, formatShortDate } from '@/app/_lib/utils/date';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

export function EventCard({ event, compact = false }: EventCardProps) {
  // Handle missing circuit data
  const circuit = event.circuit || { name: 'Circuit inconnu', country: '', track: null };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'bg-blue-500/20 text-blue-400';
      case 'ONGOING': return 'bg-green-500/20 text-green-400';
      case 'FINISHED': return 'bg-zinc-700/50 text-zinc-500';
      default: return 'bg-zinc-700/50 text-zinc-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'À venir';
      case 'ONGOING': return 'En cours';
      case 'FINISHED': return 'Terminé';
      default: return status;
    }
  };

  if (compact) {
    return (
      <Link href={`/results/${event.id}`}>
        <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 group">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(event.status)}`}>
                    {getStatusLabel(event.status)}
                  </span>
                  <span className="text-xs text-zinc-500">{event.shortname}</span>
                </div>
                <h3 className="font-bold text-zinc-100">{event.name}</h3>
                <p className="text-sm text-zinc-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {circuit.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-zinc-300">{formatShortDate(event.date_start)}</p>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors ml-auto mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/results/${event.id}`}>
      <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 h-full group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(event.status)}`}>
              {getStatusLabel(event.status)}
            </span>
            <span className="text-sm text-zinc-500 font-mono">{event.shortname}</span>
          </div>
          
          <h3 className="text-xl font-bold text-zinc-100 mb-2">{event.name}</h3>
          
          <div className="space-y-2 text-sm text-zinc-400">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-500" />
              {circuit.name}, {circuit.country}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500" />
              {formatDate(event.date_start)}
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              {circuit.track?.length || '--'} m
            </span>
            <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
