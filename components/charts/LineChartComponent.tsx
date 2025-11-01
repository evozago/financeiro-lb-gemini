
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { LineChartData } from '../../types';

interface LineChartComponentProps {
  data: LineChartData[];
  title: string;
  subtitle: string;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data, title, subtitle }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
          <Legend wrapperStyle={{ fontSize: '14px' }} payload={[{ value: 'Pagos', type: 'line', color: '#22c55e' }, { value: 'A pagar', type: 'line', color: '#f97316' }]}/>
          <Line type="monotone" dataKey="paid" stroke="#22c55e" strokeWidth={2} name="Pagos" dot={false} />
          <Line type="monotone" dataKey="pending" stroke="#f97316" strokeWidth={2} name="A pagar" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
