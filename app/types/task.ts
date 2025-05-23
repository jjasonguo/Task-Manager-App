export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  label?: string;
  date: string;
  completed: boolean;
}

export const PRIORITY_COLORS = {
  low: '#4CAF50',    // Green
  medium: '#FFC107', // Yellow
  high: '#F44336',   // Red
}; 