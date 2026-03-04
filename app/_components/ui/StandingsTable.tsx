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
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-4 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-16">Pos</th>
            <th className="text-left py-4 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Pilote</th>
            <th className="text-left py-4 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden md:table-cell">Équipe</th>
            <th className="text-right py-4 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-24">Pts</th>
          </tr>
        </thead>
        <tbody>
          {displayStandings.map((entry, index) => (
            <tr 
              key={entry.id} 
              className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors ${
                index < 3 ? 'bg-zinc-800/20' : ''
              }`}
            >
              <td className="py-4 px-2">
                <span className={`
                  inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-bold
                  ${index === 0 ? 'bg-yellow-500/20 text-yellow-500 ring-1 ring-yellow-500/30' : ''}
                  ${index === 1 ? 'bg-zinc-300/20 text-zinc-300 ring-1 ring-zinc-300/30' : ''}
                  ${index === 2 ? 'bg-amber-600/20 text-amber-500 ring-1 ring-amber-500/30' : ''}
                  ${index > 2 ? 'text-zinc-500 bg-zinc-800/50' : ''}
                `}>
                  {entry.position}
                </span>
              </td>
              <td className="py-4 px-2">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-zinc-800">
                    <AvatarImage 
                      src={entry.rider.pictures?.profile?.main || ''} 
                      alt={`${entry.rider.name} ${entry.rider.surname}`}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs font-bold">
                      {entry.rider.name?.[0]}{entry.rider.surname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-100 truncate">
                      <span className="text-zinc-400 font-normal">{entry.rider.name}</span>{' '}
                      <span className="uppercase">{entry.rider.surname}</span>
                    </p>
                    <p className="text-xs text-zinc-500 md:hidden truncate">{entry.team?.name}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-2 hidden md:table-cell">
                <span className="text-sm text-zinc-400 truncate block max-w-[200px]">{entry.team?.name}</span>
              </td>
              <td className="py-4 px-2 text-right">
                <span className="font-mono font-bold text-xl text-zinc-100">{formatPoints(entry.points)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
