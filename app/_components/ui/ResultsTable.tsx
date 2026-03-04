import type { ClassificationEntry } from '@/app/_lib/types';
import { formatGap } from '@/app/_lib/utils/format';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ResultsTableProps {
  results: ClassificationEntry[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider w-12 sm:w-16">Pos</th>
            <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Pilote</th>
            <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:table-cell">Équipe</th>
            <th className="text-right py-3 px-2 sm:px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider w-24 sm:w-32">Temps</th>
            <th className="text-right py-3 px-2 sm:px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider w-16 sm:w-24 hidden sm:table-cell">Écart</th>
          </tr>
        </thead>
        <tbody>
          {results.map((entry, index) => (
            <tr 
              key={entry.id} 
              className={`
                border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors
                ${index === 0 ? 'bg-zinc-900/20' : ''}
              `}
            >
              <td className="py-3 px-2 sm:px-4">
                <span className={`
                  inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold
                  ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : ''}
                  ${index === 1 ? 'bg-zinc-400/20 text-zinc-400' : ''}
                  ${index === 2 ? 'bg-amber-600/20 text-amber-600' : ''}
                  ${index > 2 ? 'text-zinc-500' : ''}
                `}>
                  {entry.position}
                </span>
              </td>
              <td className="py-3 px-2 sm:px-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Avatar className="w-7 h-7 sm:w-8 sm:h-8 hidden sm:flex">
                    <AvatarImage src={entry.rider.pictures?.profile?.main || ''} alt={`${entry.rider.name} ${entry.rider.surname}`} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">
                      {entry.rider.name[0]}{entry.rider.surname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-zinc-100 text-sm sm:text-base">{entry.rider.name} <span className="font-bold">{entry.rider.surname}</span></p>
                    <p className="text-xs text-zinc-500 md:hidden">{entry.team.name}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-2 sm:px-4 hidden md:table-cell">
                <span className="text-sm text-zinc-400">{entry.team.name}</span>
              </td>
              <td className="py-3 px-2 sm:px-4 text-right">
                <span className="font-mono text-sm sm:text-base text-zinc-100">
                  {entry.best_lap?.time || entry.gap?.first || '--'}
                </span>
              </td>
              <td className="py-3 px-2 sm:px-4 text-right hidden sm:table-cell">
                <span className="font-mono text-sm text-zinc-500">
                  {formatGap(entry.gap?.first || '')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
