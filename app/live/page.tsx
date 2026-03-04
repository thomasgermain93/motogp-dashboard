'use client';

import useSWR from 'swr';
import { getLiveTiming } from '../_lib/api/live';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radio, Activity } from 'lucide-react';

const POLLING_INTERVAL = 5000; // 5 seconds

export default function LivePage() {
  const { data, error, isLoading } = useSWR(
    'live-timing',
    getLiveTiming,
    { refreshInterval: POLLING_INTERVAL }
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-500">Connexion au live timing...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Aucune session en cours</div>
        </div>
      </div>
    );
  }

  const { head, rider } = data;
  const ridersList = Object.values(rider).sort((a, b) => a.pos - b.pos);

  const getSessionStatus = () => {
    switch (head.session_status_id) {
      case 'O': return { label: 'En cours', color: 'bg-green-500/20 text-green-400' };
      case 'F': return { label: 'Terminée', color: 'bg-zinc-500/20 text-zinc-400' };
      case 'A': return { label: 'Annulée', color: 'bg-red-500/20 text-red-400' };
      default: return { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400' };
    }
  };

  const status = getSessionStatus();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-red-500 animate-pulse" />
            <h1 className="text-3xl font-bold text-zinc-100">Live Timing</h1>
          </div>
          <Badge className={status.color}>{status.label}</Badge>
        </div>
        <p className="text-zinc-500">
          {head.event_shortname} - {head.circuit_name} • {head.session_name}
        </p>
      </div>

      {/* Live Timing Table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Classement en direct
            </span>
            <span className="text-sm text-zinc-500">
              Tour {head.num_laps > 0 ? head.num_laps : '--'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Pos</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase">#</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Pilote</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase hidden sm:table-cell">Équipe</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Temps</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-zinc-500 uppercase hidden sm:table-cell">Écart</th>
                </tr>
              </thead>
              <tbody>
                {ridersList.map((rider) => (
                  <tr 
                    key={rider.rider_id}
                    className={`border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors ${
                      rider.pos === 1 ? 'bg-yellow-500/5' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
                        rider.pos === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                        rider.pos === 2 ? 'bg-zinc-400/20 text-zinc-400' :
                        rider.pos === 3 ? 'bg-amber-600/20 text-amber-600' :
                        'text-zinc-500'
                      }`}>
                        {rider.pos}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-zinc-400">{rider.rider_number}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="text-zinc-500 text-sm">{rider.rider_name}</span>
                        <span className="text-zinc-100 font-bold ml-1">{rider.rider_surname}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className="text-sm text-zinc-500">{rider.team_name}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono text-zinc-100">{rider.lap_time}</span>
                    </td>
                    <td className="py-3 px-4 text-right hidden sm:table-cell">
                      <span className="font-mono text-zinc-500">
                        {rider.gap_first === '0.000' ? '' : `+${rider.gap_first}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
