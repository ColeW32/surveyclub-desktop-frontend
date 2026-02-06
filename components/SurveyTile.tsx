import React from 'react';
import { Timer, Star, Flame, Users, Zap, ChevronRight } from 'lucide-react';
import { Survey } from '../types';

interface SurveyTileProps {
  survey: Survey;
}

const SurveyTile: React.FC<SurveyTileProps> = ({ survey }) => {
  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden h-full">
      {/* Top Accent/Badge Area */}
      <div className="px-5 pt-4 flex justify-center items-center min-h-[28px]">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {survey.isHot && (
            <div className="flex items-center space-x-1 bg-red-50 text-red-600 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider border border-red-100">
              <Flame size={9} className="fill-red-600" />
              <span>Hot</span>
            </div>
          )}
          {survey.multiplier && (
            <div className="bg-blue-50 text-blue-600 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider border border-blue-100">
              {survey.multiplier} Boost
            </div>
          )}
          {survey.isQuick && (
            <div className="flex items-center space-x-1 bg-amber-50 text-amber-600 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider border border-amber-100">
              <Zap size={9} className="fill-amber-600" />
              <span>Quick</span>
            </div>
          )}
        </div>
      </div>

      {/* Reward Section - Compact & Clean */}
      <div className="flex-1 flex flex-col items-center justify-center py-4 space-y-0.5">
        {survey.originalAmount && (
          <span className="text-xs text-gray-300 line-through font-bold">
            ${survey.originalAmount.toFixed(2)}
          </span>
        )}
        <div className="flex items-baseline">
          <span className="text-xl font-black text-gray-900 mr-0.5">$</span>
          <span className="text-4xl font-black text-gray-900 tracking-tighter">
            {survey.amount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Compact Stats Footer */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 bg-gray-50/80 rounded-xl p-3 border border-gray-100 divide-x divide-gray-200/50">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-1.5 text-gray-900 font-black text-xs">
              <Timer size={14} className="text-gray-400" strokeWidth={2.5} />
              <span>{survey.time}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
             <div className="flex items-center space-x-1.5 text-gray-900 font-black text-xs">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span>{survey.rating}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
             <div className="flex items-center space-x-1.5 text-gray-900 font-black text-xs">
              <Users size={14} className="text-gray-400" />
              <span>{survey.userCount}</span>
            </div>
          </div>
        </div>

        <button className="w-full mt-3 py-3 bg-[#c9ff3a] group-hover:bg-black group-hover:text-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-md shadow-[#c9ff3a]/20 group-hover:shadow-black/10">
          <span>Start</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default SurveyTile;
