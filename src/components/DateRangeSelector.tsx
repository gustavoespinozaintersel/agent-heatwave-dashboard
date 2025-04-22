
import React from 'react';
import { addDays, format, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarRange } from "lucide-react";

interface DateRangeSelectorProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ 
  startDate, 
  endDate, 
  onChange 
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  
  const setCurrentWeek = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const end = endOfWeek(new Date(), { weekStartsOn: 1 });
    onChange(start, end);
  };
  
  const setPreviousWeek = () => {
    const start = startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
    const end = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
    onChange(start, end);
  };
  
  const setNextWeek = () => {
    const start = startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 });
    const end = endOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 });
    onChange(start, end);
  };
  
  const setLast30Days = () => {
    const end = new Date();
    const start = addDays(new Date(), -30);
    onChange(start, end);
  };
  
  const dateRangeText = `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
  
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex space-x-1">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={setPreviousWeek}
        >
          Previous
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={setCurrentWeek}
        >
          This Week
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={setNextWeek}
        >
          Next
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={setLast30Days}
        >
          Last 30 Days
        </Button>
      </div>
      
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 min-w-[200px]"
          >
            <CalendarRange className="h-4 w-4" />
            <span>{dateRangeText}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="range"
            defaultMonth={startDate}
            selected={{
              from: startDate,
              to: endDate,
            }}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                onChange(range.from, range.to);
                setIsCalendarOpen(false);
              }
            }}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeSelector;
