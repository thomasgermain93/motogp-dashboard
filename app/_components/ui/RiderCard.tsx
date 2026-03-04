import type { Rider } from '@/app/_lib/types';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RiderCardProps {
  rider: Rider;
}

export function RiderCard({ rider }: RiderCardProps) {
  const team = rider.current_career_step?.team;
  const category = rider.current_career_step?.category;
  const number = rider.current_career_step?.number;

  return (
    <Link href={`/riders/${rider.id}`}>
      <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 hover:scale-[1.02] group">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 border-2 border-zinc-800 group-hover:border-zinc-700 transition-colors">
              <AvatarImage src={rider.pictures?.profile?.main || ''} alt={`${rider.name} ${rider.surname}`} />
              <AvatarFallback className="bg-zinc-800 text-zinc-400 text-lg">
                {rider.name[0]}{rider.surname[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-zinc-100 truncate">
                    {rider.name} {rider.surname}
                  </h3>
                  <p className="text-sm text-zinc-500 truncate">{team?.name}</p>
                </div>
                {number && (
                  <span className="text-2xl font-black text-zinc-700 font-mono">
                    {number}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <span className="w-4 h-3 rounded-sm overflow-hidden inline-block">
                    <img 
                      src={rider.country.flag || `https://flagcdn.com/w40/${rider.country.iso.toLowerCase()}.png`} 
                      alt={rider.country.name}
                      className="w-full h-full object-cover"
                    />
                  </span>
                  {rider.country.iso}
                </span>
                {category && (
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ 
                      backgroundColor: `${team?.color}20`,
                      color: team?.color 
                    }}
                  >
                    {category.name.replace('™', '')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
