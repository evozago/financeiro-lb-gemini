
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartData } from '../../types';

interface PieChartComponentProps {
  data: ChartData[];
  title: string;
  subtitle: string;
}

const COLORS = ['#fb923c', '#22c55e']; // Em aberto, Pagas

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, title, subtitle }) => {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${((value / total) * 100).toFixed(0)}%`} />
          <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" 
            formatter={(value, entry, index) => <span className="text-gray-600">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
