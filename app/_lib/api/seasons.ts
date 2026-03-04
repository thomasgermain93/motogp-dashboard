import { fetchApi, fetchWithCache } from './client';
import type { Season } from '../types';

export async function getSeasons(): Promise<Season[]> {
  return fetchWithCache<Season[]>('/results/seasons', 86400); // 1 day
}

export async function getCurrentSeason(): Promise<Season> {
  const seasons = await getSeasons();
  // Use 2025 season for data (2026 may not have standings yet)
  const season2025 = seasons.find(s => s.year === 2025);
  const current = seasons.find(s => s.current);
  return season2025 || current || seasons[seasons.length - 1];
}

export async function getSeasonByYear(year: number): Promise<Season | null> {
  const seasons = await getSeasons();
  return seasons.find(s => s.year === year) || null;
}
