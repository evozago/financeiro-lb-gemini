
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trendIcon?: React.ReactNode;
  trendColor?: string;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, subtitle, icon, trendIcon, trendColor, children, className }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="p-2 bg-gray-100 rounded-md text-gray-600">
          {icon}
        </div>
      </div>
      {trendIcon && (
         <div className="flex items-center text-xs mt-4">
            <span className={`text-${trendColor}-500 mr-1`}>{trendIcon}</span>
            <span className={`font-semibold text-${trendColor}-500 mr-1`}>0.0%</span>
            <span className="text-gray-500">Participação: 0.0%</span>
         </div>
      )}
      {children}
    </div>
  );
};

export default Card;
