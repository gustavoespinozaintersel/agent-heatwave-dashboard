
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DateRangeSelector from './DateRangeSelector';
import ViewToggle from './ViewToggle';
import { GroupByType, ColorPalette } from '@/types';

interface FilterPanelProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (start: Date, end: Date) => void;
  groupBy: GroupByType;
  onGroupByChange: (value: GroupByType) => void;
  sortBy: 'name' | 'total';
  onSortChange: (value: 'name' | 'total') => void;
  palette: ColorPalette;
  onPaletteChange: (value: ColorPalette) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  startDate,
  endDate,
  onDateChange,
  groupBy,
  onGroupByChange,
  sortBy,
  onSortChange,
  palette,
  onPaletteChange,
  sortOrder,
  onSortOrderChange
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
          <DateRangeSelector 
            startDate={startDate} 
            endDate={endDate} 
            onChange={onDateChange} 
          />
          <ViewToggle 
            groupBy={groupBy} 
            onChange={onGroupByChange} 
            sortBy={sortBy}
            onSortChange={onSortChange}
            palette={palette}
            onPaletteChange={onPaletteChange}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
