import { fetchApi, fetchWithCache } from './client';
import type { StandingEntry } from '../types';

export async function getStandings(
  seasonId: string,
  categoryId: string
): Promise<{ classification: StandingEntry[]; file?: string }> {
  return fetchWithCache(
    `/results/standings?seasonUuid=${seasonId}&categoryUuid=${categoryId}`,
    300 // 5 minutes
  );
}
