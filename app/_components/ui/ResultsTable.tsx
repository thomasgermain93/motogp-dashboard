import type { ClassificationEntry } from '@/app/_lib/types';
import { formatGap } from '@/app/_lib/utils/format';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ResultsTableProps {
  results: ClassificationEntry[];
  showTeam?: boolean;
}

export function ResultsTable({ results, showTeam = false }: ResultsTableProps) {
  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full min-w-[400px]">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-3 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-12">Pos</th>
            <th className="text-left py-3 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Pilote</th>
            {showTeam && (
              <th className="text-left py-3 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Équipe</th>
            )}
            <th className="text-right py-3 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Temps</th>
          </tr>
        </thead>
        <tbody>
          {results.map((entry, index) => (
            <tr 
              key={entry.id} 
              className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors ${
                index < 3 ? 'bg-zinc-800/20' : ''
              }`}
            >
              <td className="py-3 px-2">
                <span className={`
                  inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold
                  ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : ''}
                  ${index === 1 ? 'bg-zinc-300/20 text-zinc-300' : ''}
                  ${index === 2 ? 'bg-amber-600/20 text-amber-500' : ''}
                  ${index > 2 ? 'text-zinc-500' : ''}
                `}>
                  {entry.position}
                </span>
              </td>
              <td className="py-3 px-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 border border-zinc-700 hidden sm:flex">
                    <AvatarImage 
                      src={entry.rider?.pictures?.profile?.main || ''} 
                      alt={`${entry.rider?.name} ${entry.rider?.surname}`}
                    />
                    <AvatarFallback className="bg-zinc-800 text-zinc-500 text-xs">
                      {entry.rider?.name?.[0]}{entry.rider?.surname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium text-zinc-100 text-sm truncate">
                      <span className="text-zinc-400">{entry.rider?.name}</span>{' '}
                      <span className="uppercase">{entry.rider?.surname}</span>
                    </p>
                    {showTeam && (
                      <p className="text-xs text-zinc-500 sm:hidden truncate">{entry.team?.name}</p>
                    )}
                  </div>
                </div>
              </td>
              {showTeam && (
                <td className="py-3 px-2 hidden sm:table-cell">
                  <span className="text-sm text-zinc-400 truncate block max-w-[150px]">{entry.team?.name}</span>
                </td>
              )}
              <td className="py-3 px-2 text-right">
                <span className="font-mono text-sm text-zinc-100">
                  {entry.best_lap?.time || entry.gap?.first || '--'}
                </span>
                {entry.gap?.first && entry.gap.first !== '0.000' && (
                  <span className="block text-xs text-zinc-500 font-mono">
                    +{entry.gap.first}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
