
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartData } from '../../types';

interface BarChartComponentProps {
  data: ChartData[];
  barColor: string;
  title: string;
  subtitle: string;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, barColor, title, subtitle }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
          <Legend wrapperStyle={{ fontSize: '14px' }} payload={[{ value: 'Pago', type: 'square', color: '#3b82f6' }, { value: 'Em aberto', type: 'square', color: barColor }]}/>
          <Bar dataKey="value" fill={barColor} name="Em aberto" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
