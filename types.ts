
export interface SaleRecord {
  monthYear: string;
  vendor: string;
  branch: string;
  grossValue: number;
  discount: number;
  netValue: number;
  items: number;
  attendances: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface LineChartData {
  name: string;
  paid: number;
  pending: number;
}
