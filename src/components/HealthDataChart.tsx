import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HealthData } from '../types';
interface HealthDataChartProps {
  data: HealthData[];
}
const HealthDataChart: React.FC<HealthDataChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[400px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="timestamp"
            className="text-xs"
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Temperature (°C)"
          />
          <Line
            type="monotone"
            dataKey="heartRate"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Heart Rate (bpm)"
          />
          <Line
            type="monotone"
            dataKey="spo2"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="SpO2 (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default HealthDataChart;