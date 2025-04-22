
import React from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { GroupByType } from '@/types';

interface ViewToggleProps {
  groupBy: GroupByType;
  onChange: (value: GroupByType) => void;
  sortBy: 'name' | 'total';
  onSortChange: (value: 'name' | 'total') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ 
  groupBy, 
  onChange, 
  sortBy, 
  onSortChange 
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
      </div>
    </div>
  );
};

export default ViewToggle;
