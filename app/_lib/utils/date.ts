import { format, parseISO, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'd MMMM yyyy', { locale: fr });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    return format(parseISO(dateString), 'd MMMM yyyy à HH:mm', { locale: fr });
  } catch {
    return dateString;
  }
}

export function formatTime(timeString: string): string {
  if (!timeString) return '--:--.---';
  return timeString;
}

export function formatShortDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'd MMM', { locale: fr });
  } catch {
    return dateString;
  }
}

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function getCountdown(targetDate: string): CountdownResult {
  const now = new Date();
  const target = new Date(targetDate);
  
  if (target <= now) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  
  return {
    days: differenceInDays(target, now),
    hours: differenceInHours(target, now) % 24,
    minutes: differenceInMinutes(target, now) % 60,
    seconds: differenceInSeconds(target, now) % 60,
    isExpired: false,
  };
}
