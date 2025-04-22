
import React, { useState, useEffect, useMemo } from 'react';
import { startOfMonth, endOfMonth, subDays } from 'date-fns';
import FilterPanel from '@/components/FilterPanel';
import HeatmapChart from '@/components/HeatmapChart';
import { fetchMessageData, fetchAvailableAgents } from '@/api/messageData';
import { ChartFilters, HeatmapData, GroupByType } from '@/types';

const Index = () => {
  // Default date range is last 30 days
  const today = new Date();
  const [startDate, setStartDate] = useState<Date>(subDays(today, 30));
  const [endDate, setEndDate] = useState<Date>(today);
  
  // Default view is calendar (by date)
  const [groupBy, setGroupBy] = useState<GroupByType>('calendar');
  
  // Default sort is by name
  const [sortBy, setSortBy] = useState<'name' | 'total'>('name');
  
  // State for agents
  const [agents, setAgents] = useState<string[]>([]);
  const [agentList, setAgentList] = useState<string[]>([]);
  
  // Data and loading states
  const [data, setData] = useState<HeatmapData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Filters object
  const filters: ChartFilters = useMemo(() => ({
    startDate,
    endDate,
    groupBy,
    agentList,
    sortBy,
  }), [startDate, endDate, groupBy, agentList, sortBy]);
  
  // Fetch agents on component mount
  useEffect(() => {
    const loadAgents = async () => {
      const availableAgents = await fetchAvailableAgents();
      setAgents(availableAgents);
      setAgentList(availableAgents); // Select all agents by default
    };
    
    loadAgents();
  }, []);
  
  // Fetch data when filters change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchMessageData(filters);
        
        // Sort agents if needed
        if (sortBy === 'total' && result) {
          const sortedAgents = [...result.agents].sort((a, b) => {
            return (result.totals[b] || 0) - (result.totals[a] || 0);
          });
          
          result.agents = sortedAgents;
        }
        
        setData(result);
      } catch (error) {
        console.error('Error fetching message data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (agentList.length > 0) {
      loadData();
    }
  }, [filters]);
  
  // Handle date range change
  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  // Handle group by change
  const handleGroupByChange = (value: GroupByType) => {
    setGroupBy(value);
  };
  
  // Handle sort change
  const handleSortChange = (value: 'name' | 'total') => {
    setSortBy(value);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-purple-800 dark:text-purple-400">Agent Heatmap Dashboard</h1>
          <p className="text-muted-foreground">
            Visualize agent message activity over time. Toggle between weekday and calendar views, select date ranges, and sort by total messages.
          </p>
        </div>
        
        <div className="space-y-6">
          <FilterPanel 
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            groupBy={groupBy}
            onGroupByChange={handleGroupByChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
          
          {/* If we have data or are loading, show the heatmap */}
          {(data || loading) && (
            <HeatmapChart 
              data={data || { agents: [], timeLabels: [], data: [], totals: {} }}
              loading={loading}
              groupBy={groupBy}
            />
          )}
          
          {!loading && data && (
            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>Data refreshed at {new Date().toLocaleTimeString()}</p>
              <p className="mt-2">
                <span className="font-medium">API Parameters:</span> startDate={startDate.toISOString().split('T')[0]}, 
                endDate={endDate.toISOString().split('T')[0]}, 
                groupBy={groupBy}, 
                sortBy={sortBy}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
