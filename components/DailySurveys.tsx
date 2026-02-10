import React, { useState } from 'react';
import { Flame, Zap, PlusCircle, Filter } from 'lucide-react';
import SurveyTile from './SurveyTile';
import { MOCK_SURVEYS } from '../appConstants';
import { Survey } from '../types';

// Generate 20 mock surveys based on the original 6 for the demo
const ALL_SURVEYS: Survey[] = Array(20).fill(null).map((_, i) => {
  const template = MOCK_SURVEYS[i % MOCK_SURVEYS.length];
  return {
    ...template,
    id: `generated-survey-${i}`,
    amount: template.amount + (Math.random() * 2 - 1), // Varied amount
    userCount: Math.floor(Math.random() * 2000) + 100 // Varied users
  };
});

type FilterType = 'all' | 'hot' | 'fast' | 'bonus';

const DailySurveys: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredSurveys = ALL_SURVEYS.filter(survey => {
    switch (activeFilter) {
      case 'hot': return survey.isHot;
      case 'fast': return survey.isQuick;
      case 'bonus': return !!survey.multiplier;
      default: return true;
    }
  });

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Daily Surveys</h1>
          <p className="text-gray-500 font-medium mt-2">Complete surveys to earn cash instantly.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              activeFilter === 'all' 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Filter size={14} />
            <span>All Surveys</span>
          </button>
          
          <button 
            onClick={() => setActiveFilter('hot')}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              activeFilter === 'hot' 
                ? 'bg-red-50 text-red-600 border border-red-100 shadow-sm' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50/50'
            }`}
          >
            <Flame size={14} className={activeFilter === 'hot' ? 'fill-red-600' : ''} />
            <span>Hot Surveys</span>
          </button>

          <button 
            onClick={() => setActiveFilter('fast')}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              activeFilter === 'fast' 
                ? 'bg-amber-50 text-amber-600 border border-amber-100 shadow-sm' 
                : 'text-gray-400 hover:text-amber-600 hover:bg-amber-50/50'
            }`}
          >
            <Zap size={14} className={activeFilter === 'fast' ? 'fill-amber-600' : ''} />
            <span>Fast Surveys</span>
          </button>

          <button 
            onClick={() => setActiveFilter('bonus')}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              activeFilter === 'bonus' 
                ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm' 
                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            <PlusCircle size={14} />
            <span>Bonus Cash</span>
          </button>
        </div>
      </div>

      {/* Grid Layout - 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSurveys.map((survey) => (
          <div key={survey.id} className="h-full">
            <SurveyTile survey={survey} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSurveys.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
             <Filter size={24} className="text-gray-400" />
           </div>
           <h3 className="text-xl font-bold text-gray-900">No surveys found</h3>
           <p className="text-gray-500 mt-1">Try adjusting your filters to see more results.</p>
           <button 
             onClick={() => setActiveFilter('all')}
             className="mt-6 text-[#65801d] font-bold text-sm hover:underline"
           >
             Clear all filters
           </button>
        </div>
      )}
    </div>
  );
};

export default DailySurveys;
