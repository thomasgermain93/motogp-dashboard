import { getRider } from '@/app/_lib/api/riders';
import { getRiderStats, getRiderSeasonStats } from '@/app/_lib/api/riders';
import type { SeasonStats } from '@/app/_lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Trophy, Flag, Calendar, Star, TrendingUp } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export const revalidate = 3600; // 1 hour

export default async function RiderPage({ params }: Props) {
  try {
    const rider = await getRider(params.id);
    const stats = await getRiderStats(rider.legacy_id);
    const seasonStats = await getRiderSeasonStats(rider.legacy_id);
    
    const currentStep = rider.current_career_step;
    const team = currentStep?.team;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Rider Header */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-32 h-32 border-4 border-zinc-800">
                <AvatarImage src={rider.pictures?.profile?.main || ''} alt={`${rider.name} ${rider.surname}`} />
                <AvatarFallback className="bg-zinc-800 text-zinc-400 text-4xl font-bold">
                  {rider.name[0]}{rider.surname[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={rider.country.flag || `https://flagcdn.com/w40/${rider.country.iso.toLowerCase()}.png`}
                    alt={rider.country.name}
                    className="w-8 h-auto rounded"
                  />
                  <Badge 
                    className="text-lg px-4 py-1"
                    style={{ 
                      backgroundColor: team?.color || '#71717a',
                      color: team?.text_color || '#ffffff'
                    }}
                  >
                    #{currentStep?.number || '--'}
                  </Badge>
                </div>
                
                <h1 className="text-4xl font-bold text-zinc-100 mb-1">
                  {rider.name} <span className="uppercase">{rider.surname}</span>
                </h1>
                
                <p className="text-xl text-zinc-400 mb-4">
                  {team?.name || 'Sans équipe'} • {currentStep?.category?.name.replace('™', '')}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Flag className="w-4 h-4" />
                    {rider.country.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {rider.years_old} ans
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-3xl font-bold text-zinc-100">{stats.world_championship_wins.total}</p>
                  <p className="text-sm text-zinc-500">Titres mondiaux</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-3xl font-bold text-zinc-100">{stats.grand_prix_victories.total}</p>
                  <p className="text-sm text-zinc-500">Victoires</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-zinc-400" />
                <div>
                  <p className="text-3xl font-bold text-zinc-100">{stats.podiums.total}</p>
                  <p className="text-sm text-zinc-500">Podiums</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Flag className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-3xl font-bold text-zinc-100">{stats.poles.total}</p>
                  <p className="text-sm text-zinc-500">Poles positions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Season Stats */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">Historique par saison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Saison</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Catégorie</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Constructeur</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Départs</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Victoires</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Podiums</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Poles</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Points</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-zinc-500 uppercase">Pos</th>
                  </tr>
                </thead>
                <tbody>
                  {seasonStats.map((season: SeasonStats) => (
                    <tr key={season.season} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                      <td className="py-3 px-4 text-zinc-100 font-medium">{season.season}</td>
                      <td className="py-3 px-4 text-zinc-400">{season.category.replace('™', '')}</td>
                      <td className="py-3 px-4 text-zinc-400">{season.constructor}</td>
                      <td className="py-3 px-4 text-center text-zinc-400">{season.starts}</td>
                      <td className="py-3 px-4 text-center text-yellow-500 font-bold">{season.first_position}</td>
                      <td className="py-3 px-4 text-center text-zinc-300">{season.podiums}</td>
                      <td className="py-3 px-4 text-center text-purple-400">{season.poles}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-zinc-100">{season.points}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
                          season.position === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                          season.position === 2 ? 'bg-zinc-400/20 text-zinc-400' :
                          season.position === 3 ? 'bg-amber-600/20 text-amber-600' :
                          'text-zinc-500'
                        }`}>
                          {season.position}
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
  } catch {
    notFound();
  }
}
