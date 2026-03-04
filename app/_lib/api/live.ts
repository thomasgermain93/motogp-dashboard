import { fetchApi } from './client';
import type { LiveTimingData } from '../types';

export async function getLiveTiming(): Promise<LiveTimingData> {
  // No cache for live timing
  return fetchApi<LiveTimingData>('/timing-gateway/livetiming-lite', {}, 0);
}
