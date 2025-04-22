
import { ColorPalette } from '@/types';

export const getColorScheme = (palette: ColorPalette) => {
  switch (palette) {
    case 'purple':
      return ['bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500'];
    case 'blue':
      return ['bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500'];
    case 'red':
      return ['bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500'];
    case 'green':
      return ['bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500'];
    default:
      return ['bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500'];
  }
};

export const getColorIntensity = (count: number, maxCount: number, palette: ColorPalette) => {
  if (count === 0) return 'bg-gray-50 dark:bg-gray-900';
  const colors = getColorScheme(palette);
  const intensity = Math.min(Math.floor((count / maxCount) * (colors.length - 1)), colors.length - 1);
  return colors[intensity];
};
