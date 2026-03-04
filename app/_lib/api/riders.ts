import { fetchApi, fetchWithCache } from './client';
import type { Rider, RiderStats, SeasonStats } from '../types';

export async function getRiders(seasonYear: number, categoryId?: string): Promise<Rider[]> {
  const endpoint = categoryId 
    ? `/riders?seasonYear=${seasonYear}&categoryId=${categoryId}`
    : `/riders?seasonYear=${seasonYear}`;
  return fetchWithCache<Rider[]>(endpoint, 3600);
}

export async function getRider(riderId: string): Promise<Rider> {
  return fetchWithCache<Rider>(`/riders/${riderId}`, 3600);
}

export async function getRiderStats(legacyId: number): Promise<RiderStats> {
  return fetchWithCache<RiderStats>(`/riders/${legacyId}/stats`, 3600);
}

export async function getRiderSeasonStats(legacyId: number): Promise<SeasonStats[]> {
  return fetchWithCache<SeasonStats[]>(`/riders/${legacyId}/statistics`, 3600);
}
