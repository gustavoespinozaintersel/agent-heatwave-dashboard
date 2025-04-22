
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
  totals: {
    byAgent: Record<string, number>;    // Row totals
    byTimeLabel: Record<string, number> // Column totals
  }
}

export type GroupByType = 'weekday' | 'calendar';
export type ColorPalette = 'purple' | 'blue' | 'red' | 'green';

export interface ChartFilters {
  startDate: Date;
  endDate: Date;
  groupBy: GroupByType;
  agentList: string[];
  sortBy: 'name' | 'total';
  palette: ColorPalette;
  sortOrder: 'asc' | 'desc';
}
