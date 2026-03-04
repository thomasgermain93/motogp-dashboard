import type { StandingEntry } from '@/app/_lib/types';
import { formatPoints } from '@/app/_lib/utils/format';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StandingsTableProps {
  standings: StandingEntry[];
  limit?: number;
}

export function StandingsTable({ standings, limit }: StandingsTableProps) {
  const displayStandings = limit ? standings.slice(0, limit) : standings;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider w-16">Pos</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Pilote</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Équipe</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider w-24">Points</th>
          </tr>
        </thead>
        <tbody>
          {displayStandings.map((entry, index) => (
            <tr 
              key={entry.id} 
              className={`
                border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors
                ${index === 0 ? 'bg-zinc-900/20' : ''}
              `}
            >
              <td className="py-3 px-4">
                <span className={`
                  inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                  ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : ''}
                  ${index === 1 ? 'bg-zinc-400/20 text-zinc-400' : ''}
                  ${index === 2 ? 'bg-amber-600/20 text-amber-600' : ''}
                  ${index > 2 ? 'text-zinc-500' : ''}
                `}>
                  {entry.position}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={entry.rider.pictures?.profile?.main || ''} alt={`${entry.rider.name} ${entry.rider.surname}`} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">
                      {entry.rider.name[0]}{entry.rider.surname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-zinc-100">{entry.rider.name} <span className="font-bold">{entry.rider.surname}</span></p>
                    <p className="text-xs text-zinc-500 sm:hidden">{entry.team.name}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 hidden sm:table-cell">
                <span className="text-sm text-zinc-400">{entry.team.name}</span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="font-mono font-bold text-lg text-zinc-100">{formatPoints(entry.points)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
