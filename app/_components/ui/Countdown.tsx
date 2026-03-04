'use client';

import { useState, useEffect } from 'react';
import { getCountdown, type CountdownResult } from '@/app/_lib/utils/date';
import { formatNumber } from '@/app/_lib/utils/format';

interface CountdownProps {
  targetDate: string;
  label?: string;
}

export function Countdown({ targetDate, label }: CountdownProps) {
  const [countdown, setCountdown] = useState<CountdownResult>(getCountdown(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (countdown.isExpired) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-zinc-100">En cours</p>
      </div>
    );
  }

  const timeUnits = [
    { value: countdown.days, label: 'Jours' },
    { value: countdown.hours, label: 'Heures' },
    { value: countdown.minutes, label: 'Min' },
    { value: countdown.seconds, label: 'Sec' },
  ];

  return (
    <div className="text-center">
      {label && <p className="text-sm text-zinc-400 mb-3 uppercase tracking-wider">{label}</p>}
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
            <div className="text-center">
              <div className="bg-zinc-900 dark:bg-zinc-800 rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[80px]">
                <span className="text-2xl sm:text-4xl font-bold text-zinc-100 font-mono">
                  {formatNumber(unit.value)}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 uppercase">{unit.label}</p>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-2xl sm:text-3xl font-bold text-zinc-600 -mt-6">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
