export interface HealthData {
  id: string;
  timestamp: string;
  temperature: number;
  heartRate: number;
  spo2: number;
}

export interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  trend: number;
  prediction: string;
}
