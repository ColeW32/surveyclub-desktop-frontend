
import React from 'react';
import { Info } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  showInfo?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, suffix, showInfo = false }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-48">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {label}
        </span>
        {showInfo && <Info size={14} className="text-gray-300" />}
      </div>
      <div className="flex items-baseline space-x-1">
        <span className="text-4xl font-normal text-gray-900 leading-none tabular-nums">
          {value}
        </span>
        {suffix && <span className="text-sm text-gray-400">{suffix}</span>}
      </div>
      <div className="w-12 h-[3px] bg-gray-100 rounded-full"></div>
    </div>
  );
};

export default StatsCard;
