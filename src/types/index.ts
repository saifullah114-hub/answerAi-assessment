export interface Variable {
  id: string;
  name: string;
  category: string;
  active: boolean;
  description?: string;
}

export interface DataPoint {
  month: string;
  value: number;
  fullMonth: string;
}

export interface KPIData {
  title: string;
  value: string;
  description: string;
}

export interface DashboardProps {
  section: string;
}