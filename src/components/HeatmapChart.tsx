
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
import LoadingState from './heatmap/LoadingState';
import ColorLegend from './heatmap/ColorLegend';
import HeatmapCell from './heatmap/HeatmapCell';

interface HeatmapChartProps {
  data: HeatmapData;
  loading: boolean;
  groupBy: GroupByType;
  palette: ColorPalette;
}

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

  const findDataPoint = (agent: string, label: string) => {
    return data.data.find(d => d.agent === agent && (
      groupBy === 'weekday' ? d.day === label : d.date === label
    ));
  };

  if (loading) {
    return <LoadingState />;
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
                        <HeatmapCell
                          count={count}
                          maxCount={maxCount}
                          palette={palette}
                          tooltipText={`${agent}: ${count} messages on ${groupBy === 'weekday' ? label : new Date(label).toLocaleDateString()}`}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <ColorLegend palette={palette} />
      </CardContent>
    </Card>
  );
};

export default HeatmapChart;
