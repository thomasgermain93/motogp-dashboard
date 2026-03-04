import Link from 'next/link';
import { Github, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>© {currentYear} MotoGP Dashboard</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Pas officiel, données via MotoGP API</span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/archive/2024" 
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Archives 2024
            </Link>
            <Separator orientation="vertical" className="h-4 bg-zinc-800" />
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6 flex items-center justify-center gap-1">
          Fait avec <Heart className="h-3 w-3 text-red-500" /> pour les fans de MotoGP
        </p>
      </div>
    </footer>
  );
}
