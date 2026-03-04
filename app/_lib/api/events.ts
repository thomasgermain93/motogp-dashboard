import { fetchApi, fetchWithCache } from './client';
import type { Category, Event } from '../types';

export async function getCategories(seasonYear: number): Promise<Category[]> {
  return fetchWithCache<Category[]>(`/categories?seasonYear=${seasonYear}`, 3600);
}

export async function getEvents(seasonYear: number): Promise<Event[]> {
  return fetchWithCache<Event[]>(`/events?seasonYear=${seasonYear}`, 3600);
}

export async function getEvent(eventId: string): Promise<Event> {
  return fetchWithCache<Event>(`/events/${eventId}`, 1800);
}

export function getNextEvent(events: Event[]): Event | null {
  const now = new Date();
  return events
    .filter(e => new Date(e.date_start) > now)
    .sort((a, b) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime())[0] || null;
}

export function getRecentEvents(events: Event[], count: number = 3): Event[] {
  const now = new Date();
  return events
    .filter(e => new Date(e.date_end) < now)
    .sort((a, b) => new Date(b.date_end).getTime() - new Date(a.date_end).getTime())
    .slice(0, count);
}
