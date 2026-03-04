import { fetchApi, fetchWithCache } from './client';
import type { Session, ClassificationEntry } from '../types';

export async function getSessions(
  eventId: string,
  categoryId: string
): Promise<Session[]> {
  return fetchWithCache<Session[]>(
    `/results/sessions?eventUuid=${eventId}&categoryUuid=${categoryId}`,
    300
  );
}

export async function getSession(sessionId: string): Promise<Session> {
  return fetchWithCache<Session>(`/results/sessions/${sessionId}`, 300);
}

export async function getClassification(
  sessionId: string,
  seasonYear?: number,
  isTest: boolean = false
): Promise<{ classification: ClassificationEntry[]; file?: string }> {
  const params = new URLSearchParams();
  if (seasonYear) params.append('seasonYear', seasonYear.toString());
  params.append('test', isTest.toString());
  
  return fetchWithCache(
    `/results/session/${sessionId}/classification?${params}`,
    300
  );
}
