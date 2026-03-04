'use client';

import type { Session } from '@/app/_lib/types';

interface SessionTabsProps {
  sessions: Session[];
  activeSession: string | null;
  onSessionChange: (sessionId: string) => void;
}

const SESSION_ORDER = ['FP1', 'FP2', 'PR', 'FP3', 'FP4', 'Q1', 'Q2', 'QP', 'WUP', 'SPR', 'RAC'];

const SESSION_NAMES: Record<string, string> = {
  'FP1': 'FP1',
  'FP2': 'FP2',
  'PR': 'PR',
  'FP3': 'FP3',
  'FP4': 'FP4',
  'Q1': 'Q1',
  'Q2': 'Q2',
  'QP': 'QP',
  'WUP': 'WUP',
  'SPR': 'Sprint',
  'RAC': 'Course',
};

export function SessionTabs({ sessions, activeSession, onSessionChange }: SessionTabsProps) {
  const sortedSessions = [...sessions].sort((a, b) => {
    const indexA = SESSION_ORDER.indexOf(a.shortname);
    const indexB = SESSION_ORDER.indexOf(b.shortname);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="flex flex-wrap gap-2">
      {sortedSessions.map((session) => (
        <button
          key={session.id}
          onClick={() => onSessionChange(session.id)}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
            ${activeSession === session.id
              ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100 dark:bg-zinc-800'
            }
          `}
        >
          {SESSION_NAMES[session.shortname] || session.shortname}
        </button>
      ))}
    </div>
  );
}
