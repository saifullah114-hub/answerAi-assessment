import type { DataPoint ,Variable, KPIData} from "./types";

export const mockDataPoints: DataPoint[] = [
  { month: 'Apr', value: 25000, fullMonth: 'April' },
  { month: 'May', value: 52000, fullMonth: 'May' },
  { month: 'Jun', value: 45000, fullMonth: 'June' },
  { month: 'Jul', value: 85000, fullMonth: 'July' },
  { month: 'Aug', value: 62000, fullMonth: 'August' },
  { month: 'Sep', value: 35000, fullMonth: 'September' },
  { month: 'Oct', value: 58000, fullMonth: 'October' },
];

export const mockVariables: Variable[] = [
  { id: 'carbon1', name: 'Carbon 1', category: 'Variable category 1', active: true },
  { id: 'co2dist', name: 'Co2 Distribution', category: 'Variable category 1', active: true, description: 'But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages.' },
  { id: 'fleet', name: 'Fleet sizing', category: 'Variable category 1', active: true },
  { id: 'parking', name: 'Parking Rate', category: 'Variable Category 2', active: false },
  { id: 'border', name: 'Border Rate', category: 'Variable Category 2', active: true },
  { id: 'request', name: 'Request rate', category: 'Variable Category 2', active: true },
  { id: 'var1', name: 'Variable 1', category: 'Variable Category 2', active: false },
  { id: 'var2', name: 'Variable 1', category: 'Variable Category 2', active: false },
  { id: 'var3', name: 'Variable 1', category: 'Variable Category 2', active: true },
  { id: 'var4', name: 'Variable 1', category: 'Variable Category 3', active: false },
  { id: 'var5', name: 'Variable 1', category: 'Variable Category 3', active: true },
  { id: 'var6', name: 'Variable 1', category: 'Variable Category 3', active: true },
];

export const mockKPIs: KPIData[] = [
  { title: 'Infrastructure Units', value: '€421.07', description: 'This describes variable two and what the shown data means.' },
  { title: 'Charging Growth', value: '33.07', description: 'This describes variable two and what the shown data means.' },
  { title: 'Localization change', value: '21.9%', description: 'This describes variable two and what the shown data means.' },
  { title: 'Fleet growth', value: '7.03%', description: 'This describes variable two and what the shown data means.' },
];
