import { getRiders } from '../_lib/api/riders';
import { getCategories } from '../_lib/api/events';
import { RiderCard } from '../_components/ui/RiderCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export const revalidate = 3600; // 1 hour

export default async function RidersPage() {
  const currentYear = new Date().getFullYear();
  
  const [riders, categories] = await Promise.all([
    getRiders(currentYear),
    getCategories(currentYear),
  ]);

  // Group riders by category
  const ridersByCategory = categories.map(category => ({
    category,
    riders: riders.filter(rider => 
      rider.current_career_step?.category?.id === category.id
    ),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Grille {currentYear}</h1>
        <p className="text-zinc-500">Tous les pilotes de la saison</p>
      </div>

      {ridersByCategory.map(({ category, riders }) => (
        <section key={category.id} className="mb-12">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-zinc-500" />
                <CardTitle className="text-zinc-100">{category.name.replace('™', '')}</CardTitle>
                <span className="text-sm text-zinc-500 ml-2">({riders.length} pilotes)</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {riders.map((rider) => (
                  <RiderCard key={rider.id} rider={rider} />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      ))}
    </div>
  );
}
