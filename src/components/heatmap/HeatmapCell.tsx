
import { cn } from '@/lib/utils';
import { getColorIntensity } from '@/lib/colorUtils';
import { ColorPalette } from '@/types';

interface HeatmapCellProps {
  count: number;
  maxCount: number;
  palette: ColorPalette;
  tooltipText: string;
}

const HeatmapCell = ({ count, maxCount, palette, tooltipText }: HeatmapCellProps) => {
  return (
    <div 
      className={cn(
        "m-1 h-10 rounded flex items-center justify-center heatmap-cell",
        getColorIntensity(count, maxCount, palette)
      )}
      title={tooltipText}
    >
      <span className={cn(
        "font-medium",
        count > maxCount * 0.6 ? "text-white" : "text-gray-800"
      )}>
        {count}
      </span>
    </div>
  );
};

export default HeatmapCell;
