export function formatPosition(position: number): string {
  if (position === 1) return '1er';
  return `${position}e`;
}

export function formatPoints(points: number): string {
  return points.toFixed(1).replace('.0', '');
}

export function formatGap(gap: string): string {
  if (!gap || gap === '0.000') return '';
  return `+${gap}`;
}

export function formatNumber(num: number): string {
  return num.toString().padStart(2, '0');
}

export function getCategoryColor(categoryName: string): string {
  const colors: Record<string, string> = {
    'MotoGP': '#dc2626',
    'Moto2': '#2563eb',
    'Moto3': '#16a34a',
    'MotoE': '#9333ea',
  };
  return colors[categoryName] || '#71717a';
}
