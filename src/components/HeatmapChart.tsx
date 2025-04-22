
import React, { useMemo } from 'react';
import { HeatmapData, GroupByType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HeatmapChartProps {
  data: HeatmapData;
  loading: boolean;
  groupBy: GroupByType;
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ data, loading, groupBy }) => {
  // Calculate the max count for color intensity scaling
  const maxCount = useMemo(() => {
    if (!data.data.length) return 10;
    return Math.max(...data.data.map(d => d.count));
  }, [data.data]);

  // Get color intensity based on count value
  const getColorIntensity = (count: number) => {
    if (count === 0) return 'bg-gray-50 dark:bg-gray-900';
    const intensity = Math.min(Math.floor((count / maxCount) * 9) + 1, 9);
    return `bg-purple-${intensity}00`;
  };

  // Find data point for a specific agent and date
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
        <CardTitle className="flex items-center justify-between">
          <span>Agent Message Activity {groupBy === 'weekday' ? '(by Weekday)' : '(by Date)'}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {data.data.length > 0 ? `Total Messages: ${Object.values(data.totals).reduce((sum, val) => sum + val, 0)}` : 'No data available'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid" style={{ 
              gridTemplateColumns: `150px repeat(${data.timeLabels.length}, minmax(40px, 1fr))`,
            }}>
              {/* Header row with time labels */}
              <div className="font-medium py-2 px-2 text-left text-muted-foreground">
                Agent / {groupBy === 'weekday' ? 'Day' : 'Date'}
              </div>
              
              {data.timeLabels.map((label) => (
                <div key={label} className="font-medium p-2 text-center text-muted-foreground">
                  {groupBy === 'calendar' 
                    ? new Date(label).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
                    : label}
                </div>
              ))}

              {/* Agent rows */}
              {data.agents.map((agent) => (
                <React.Fragment key={agent}>
                  <div className="font-medium py-3 px-2 border-t text-left">
                    {agent}
                    <div className="text-xs text-muted-foreground mt-1">
                      Total: {data.totals[agent] || 0}
                    </div>
                  </div>
                  
                  {data.timeLabels.map((label) => {
                    const dataPoint = findDataPoint(agent, label);
                    const count = dataPoint?.count || 0;
                    
                    return (
                      <div key={`${agent}-${label}`} className="p-0 border-t">
                        <div className={cn(
                          "m-1 h-10 rounded flex items-center justify-center heatmap-cell",
                          count === 0 ? "bg-gray-50 dark:bg-gray-900" : "",
                          count > 0 && count <= maxCount * 0.2 ? "bg-purple-100" : "",
                          count > maxCount * 0.2 && count <= maxCount * 0.4 ? "bg-purple-200" : "",
                          count > maxCount * 0.4 && count <= maxCount * 0.6 ? "bg-purple-300" : "",
                          count > maxCount * 0.6 && count <= maxCount * 0.8 ? "bg-purple-400" : "",
                          count > maxCount * 0.8 ? "bg-purple-500" : ""
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
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded bg-gray-50 dark:bg-gray-900 border"></div>
              <span className="text-xs">0</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded bg-purple-100"></div>
              <span className="text-xs">Low</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded bg-purple-300"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded bg-purple-500"></div>
              <span className="text-xs">High</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapChart;
