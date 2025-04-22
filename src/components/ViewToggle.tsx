
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutGrid, LayoutList, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { GroupByType, ColorPalette } from '@/types';

interface ViewToggleProps {
  groupBy: GroupByType;
  onChange: (value: GroupByType) => void;
  sortBy: 'name' | 'total';
  onSortChange: (value: 'name' | 'total') => void;
  palette: ColorPalette;
  onPaletteChange: (value: ColorPalette) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ 
  groupBy, 
  onChange, 
  sortBy, 
  onSortChange,
  palette,
  onPaletteChange,
  sortOrder,
  onSortOrderChange
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">View:</span>
        <ToggleGroup type="single" value={groupBy} onValueChange={(value) => value && onChange(value as GroupByType)}>
          <ToggleGroupItem value="calendar" aria-label="Calendar View">
            <LayoutGrid className="h-4 w-4 mr-1" />
            Calendar
          </ToggleGroupItem>
          <ToggleGroupItem value="weekday" aria-label="Weekday View">
            <LayoutList className="h-4 w-4 mr-1" />
            Weekday
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Sort by:</span>
        <ToggleGroup type="single" value={sortBy} onValueChange={(value) => value && onSortChange(value as 'name' | 'total')}>
          <ToggleGroupItem value="name" aria-label="Sort by Name">
            Name
          </ToggleGroupItem>
          <ToggleGroupItem value="total" aria-label="Sort by Total">
            Total
          </ToggleGroupItem>
        </ToggleGroup>
        <button 
          onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2 hover:bg-muted rounded-md"
        >
          {sortOrder === 'asc' ? (
            <ArrowDownAZ className="h-4 w-4" />
          ) : (
            <ArrowUpAZ className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Color:</span>
        <Select value={palette} onValueChange={(value) => onPaletteChange(value as ColorPalette)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="green">Green</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ViewToggle;
