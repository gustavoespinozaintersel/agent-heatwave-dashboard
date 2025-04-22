
export interface MessageData {
  agent: string;
  date: string;
  count: number;
  day?: string; // For weekday view (Mon, Tue, etc.)
}

export interface HeatmapData {
  agents: string[];
  timeLabels: string[];
  data: MessageData[];
  totals: Record<string, number>; // For sorting columns
}

export type GroupByType = 'weekday' | 'calendar';

export interface ChartFilters {
  startDate: Date;
  endDate: Date;
  groupBy: GroupByType;
  agentList: string[];
  sortBy: 'name' | 'total';
}
