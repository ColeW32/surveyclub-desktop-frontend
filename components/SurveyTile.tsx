
import React from 'react';
import { Timer, Star, Flame, Users, Zap, ChevronRight } from 'lucide-react';
import { Survey } from '../types';

interface SurveyTileProps {
  survey: Survey;
}

const SurveyTile: React.FC<SurveyTileProps> = ({ survey }) => {
  return (
    <div className="flex-shrink-0 w-[290px] bg-white rounded-[2rem] border border-gray-100 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden">
      {/* Top Accent/Badge Area */}
      <div className="px-6 pt-5 flex justify-between items-start h-16">
        <div className="flex flex-wrap gap-2">
          {survey.isHot && (
            <div className="flex items-center space-x-1 bg-red-50 text-red-600 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider border border-red-100">
              <Flame size={10} className="fill-red-600" />
              <span>Hot</span>
            </div>
          )}
          {survey.multiplier && (
            <div className="bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider border border-blue-100">
              {survey.multiplier} Boost
            </div>
          )}
          {survey.isQuick && (
            <div className="flex items-center space-x-1 bg-amber-50 text-amber-600 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider border border-amber-100">
              <Zap size={10} className="fill-amber-600" />
              <span>Quick</span>
            </div>
          )}
        </div>
        
        {/* Pinned Metadata Top Right */}
        <div className="text-right flex flex-col items-end">
          <div className="flex items-center space-x-1.5 text-gray-400 group-hover:text-[#c9ff3a] transition-colors mb-0.5">
            <Users size={14} />
            <span className="text-[10px] font-bold">{survey.userCount}</span>
          </div>
          <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{survey.provider}</span>
        </div>
      </div>

      {/* Title & Reward Section */}
      <div className="px-8 pb-4 pt-1 flex flex-col items-center text-center space-y-3">
        <h3 className="text-sm font-black text-gray-800 tracking-tight leading-tight px-4 h-8 flex items-center justify-center">
          {survey.title}
        </h3>
        
        <div className="flex items-center justify-center space-x-3">
          {survey.originalAmount && (
            <span className="text-base text-gray-300 line-through font-bold mt-1">
              ${survey.originalAmount.toFixed(2)}
            </span>
          )}
          <div className="flex items-baseline">
            <span className="text-xl font-black text-gray-900 mr-1">$</span>
            <span className="text-4xl font-black text-gray-900 tracking-tighter">
              {survey.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Divider */}
      <div className="px-6 py-4 bg-gray-50/50 border-y border-gray-100 flex justify-center space-x-10">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 text-gray-900 font-black text-sm">
            <Timer size={16} className="text-gray-400" strokeWidth={2.5} />
            <span>{survey.time}</span>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Duration</span>
        </div>
        <div className="w-[1px] h-6 bg-gray-200 mt-2"></div>
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 text-gray-900 font-black text-sm">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span>{survey.rating}</span>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Rating</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4">
        <button className="w-full py-4 bg-[#c9ff3a] group-hover:bg-black group-hover:text-white text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-[#c9ff3a]/20 group-hover:shadow-black/10">
          <span>Start Survey</span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default SurveyTile;
