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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex gap-3">
        {['J', 'H', 'M', 'S'].map((unit) => (
          <div key={unit} className="text-center">
            <div className="bg-zinc-800 rounded-xl px-4 py-3 min-w-[70px]">
              <span className="text-3xl font-bold text-zinc-700 font-mono">--</span>
            </div>
            <p className="text-xs text-zinc-600 mt-2 uppercase font-medium">{unit}</p>
          </div>
        ))}
      </div>
    );
  }

  if (countdown.isExpired) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-green-400 flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse" />
          En cours
        </p>
      </div>
    );
  }

  const timeUnits = [
    { value: countdown.days, label: 'Jours', short: 'J' },
    { value: countdown.hours, label: 'Heures', short: 'H' },
    { value: countdown.minutes, label: 'Min', short: 'M' },
    { value: countdown.seconds, label: 'Sec', short: 'S' },
  ];

  return (
    <div className="text-center">
      {label && <p className="text-sm text-zinc-500 mb-4 uppercase tracking-wider font-medium">{label}</p>}
      <div className="flex items-center justify-center gap-3">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-3">
            <div className="text-center">
              <div className="bg-zinc-800 rounded-xl px-4 sm:px-6 py-4 min-w-[70px] sm:min-w-[90px] border border-zinc-700/50">
                <span className="text-3xl sm:text-4xl font-bold text-zinc-100 font-mono tabular-nums">
                  {formatNumber(unit.value)}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-2 uppercase font-medium hidden sm:block">{unit.label}</p>
              <p className="text-xs text-zinc-500 mt-2 uppercase font-medium sm:hidden">{unit.short}</p>
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
