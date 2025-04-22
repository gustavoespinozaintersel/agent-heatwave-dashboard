
import { ChartFilters, HeatmapData, MessageData, GroupByType } from '@/types';
import { format, eachDayOfInterval, addDays } from 'date-fns';

// This is a mock API service. In a real application, this would make actual API calls.
// Instead, we're generating random data based on the filters.

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const AGENTS = ['Agent 1', 'Agent 2', 'Agent 3', 'Agent 4', 'Agent 5', 'Agent 6', 'Agent 7'];

// Simulates an API call with a delay
export const fetchMessageData = async (filters: ChartFilters): Promise<HeatmapData> => {
  // Add a small delay to simulate network request
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const { startDate, endDate, groupBy, agentList } = filters;
  
  // Generate data based on filters
  const data = generateMockData(startDate, endDate, groupBy, agentList || AGENTS);
  
  // Calculate totals for each agent
  const totals: Record<string, number> = {};
  
  data.forEach(item => {
    if (!totals[item.agent]) {
      totals[item.agent] = 0;
    }
    totals[item.agent] += item.count;
  });
  
  // Generate time labels based on the groupBy parameter
  const timeLabels = getTimeLabels(startDate, endDate, groupBy);
  
  // Filter agents based on agentList or use all agents
  const agents = agentList.length > 0 ? agentList : AGENTS;
  
  return {
    agents,
    timeLabels,
    data,
    totals
  };
};

// Generate mock message data
const generateMockData = (
  startDate: Date,
  endDate: Date,
  groupBy: GroupByType,
  agentList: string[]
): MessageData[] => {
  const data: MessageData[] = [];
  
  if (groupBy === 'weekday') {
    // For weekday view, generate data for each agent and weekday
    agentList.forEach(agent => {
      WEEKDAYS.forEach(day => {
        // Random count between 0-20, with weekends typically lower
        const isWeekend = day === 'Sat' || day === 'Sun';
        const count = Math.floor(Math.random() * (isWeekend ? 8 : 20));
        
        data.push({
          agent,
          date: day,
          day,
          count
        });
      });
    });
  } else {
    // For calendar view, generate data for each day in the date range
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    agentList.forEach(agent => {
      days.forEach(day => {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const weekday = format(day, 'EEE');
        const isWeekend = weekday === 'Sat' || weekday === 'Sun';
        
        // Random count between 0-20, with weekends typically lower
        const count = Math.floor(Math.random() * (isWeekend ? 8 : 20));
        
        data.push({
          agent,
          date: formattedDate,
          day: weekday,
          count
        });
      });
    });
  }
  
  return data;
};

// Get time labels based on groupBy
const getTimeLabels = (startDate: Date, endDate: Date, groupBy: GroupByType): string[] => {
  if (groupBy === 'weekday') {
    return WEEKDAYS;
  } else {
    // For calendar view, generate labels for each day in the date range
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    return days.map(day => format(day, 'yyyy-MM-dd'));
  }
};

// Helper to get all available agents (in a real app, this would be an API call)
export const fetchAvailableAgents = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return AGENTS;
};
