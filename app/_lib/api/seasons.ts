import { fetchApi, fetchWithCache } from './client';
import type { Season } from '../types';

export async function getSeasons(): Promise<Season[]> {
  return fetchWithCache<Season[]>('/results/seasons', 86400); // 1 day
}

export async function getCurrentSeason(): Promise<Season> {
  const seasons = await getSeasons();
  const current = seasons.find(s => s.current);
  return current || seasons[seasons.length - 1];
}
