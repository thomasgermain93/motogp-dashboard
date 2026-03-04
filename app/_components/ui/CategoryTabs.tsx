'use client';

import type { Category } from '@/app/_lib/types';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categories: Category[];
}

export function CategoryTabs({ activeCategory, onCategoryChange, categories }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${activeCategory === category.id
              ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
            }
          `}
        >
          {category.name.replace('™', '')}
        </button>
      ))}
    </div>
  );
}
