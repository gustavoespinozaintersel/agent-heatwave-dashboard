
import { ColorPalette } from '@/types';
import { getColorScheme } from '@/lib/colorUtils';

interface ColorLegendProps {
  palette: ColorPalette;
}

const ColorLegend = ({ palette }: ColorLegendProps) => {
  return (
    <div className="mt-6 flex items-center justify-center">
      <div className="flex space-x-2">
        {getColorScheme(palette).map((color, index) => (
          <div key={color} className="flex items-center space-x-1">
            <div className={`w-4 h-4 rounded ${color}`}></div>
            <span className="text-xs">
              {index === 0 ? "0" : 
               index === getColorScheme(palette).length - 1 ? "High" : 
               ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorLegend;
