
import React, { useMemo } from 'react';
import { HeatmapData, GroupByType, ColorPalette } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';

interface HeatmapChartProps {
  data: HeatmapData;
  loading: boolean;
  groupBy: GroupByType;
  palette: ColorPalette;
}

const getColorScheme = (palette: ColorPalette) => {
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

const HeatmapChart: React.FC<HeatmapChartProps> = ({ 
  data, 
  loading, 
  groupBy,
  palette
}) => {
  const maxCount = useMemo(() => {
    if (!data.data.length) return 10;
    return Math.max(...data.data.map(d => d.count));
  }, [data.data]);

  const getColorIntensity = (count: number) => {
    if (count === 0) return 'bg-gray-50 dark:bg-gray-900';
    const colors = getColorScheme(palette);
    const intensity = Math.min(Math.floor((count / maxCount) * (colors.length - 1)), colors.length - 1);
    return colors[intensity];
  };

  const findDataPoint = (agent: string, label: string) => {
    return data.data.find(d => d.agent === agent && (
      groupBy === 'weekday' ? d.day === label : d.date === label
    ));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading heatmap data...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Agent Message Activity {groupBy === 'weekday' ? '(by Weekday)' : '(by Date)'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Agent / {groupBy === 'weekday' ? 'Day' : 'Date'}</TableHead>
                {data.timeLabels.map((label) => (
                  <TableHead key={label} className="text-center">
                    {groupBy === 'calendar' 
                      ? new Date(label).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
                      : label}
                    <div className="text-xs text-muted-foreground mt-1">
                      Total: {data.totals.byTimeLabel[label] || 0}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.agents.map((agent) => (
                <TableRow key={agent}>
                  <TableCell className="font-medium">
                    {agent}
                    <div className="text-xs text-muted-foreground mt-1">
                      Total: {data.totals.byAgent[agent] || 0}
                    </div>
                  </TableCell>
                  {data.timeLabels.map((label) => {
                    const dataPoint = findDataPoint(agent, label);
                    const count = dataPoint?.count || 0;
                    
                    return (
                      <TableCell key={`${agent}-${label}`} className="p-0">
                        <div 
                          className={cn(
                            "m-1 h-10 rounded flex items-center justify-center heatmap-cell",
                            getColorIntensity(count)
                          )}
                          title={`${agent}: ${count} messages on ${groupBy === 'weekday' ? label : new Date(label).toLocaleDateString()}`}
                        >
                          <span className={cn(
                            "font-medium",
                            count > maxCount * 0.6 ? "text-white" : "text-gray-800"
                          )}>
                            {count}
                          </span>
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
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
      </CardContent>
    </Card>
  );
};

export default HeatmapChart;
