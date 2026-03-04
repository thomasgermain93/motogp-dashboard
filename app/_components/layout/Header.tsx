'use client';

import { Bike, Calendar, Trophy, Users, Radio, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Accueil', icon: Bike },
  { href: '/calendar', label: 'Calendrier', icon: Calendar },
  { href: '/standings', label: 'Classements', icon: Trophy },
  { href: '/riders', label: 'Pilotes', icon: Users },
  { href: '/live', label: 'Live', icon: Radio },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Bike className="h-6 w-6 text-zinc-100" />
            <span className="font-bold text-xl text-zinc-100">MotoGP</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-zinc-100 text-zinc-900' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                    }
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors">
              <Moon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden border-t border-zinc-800 overflow-x-auto">
        <div className="flex px-4 py-2 gap-1 min-w-max">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${isActive 
                    ? 'bg-zinc-100 text-zinc-900' 
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                  }
                `}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
