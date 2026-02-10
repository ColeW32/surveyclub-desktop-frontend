
import React from 'react';
import { MOCK_MY_GAMES } from '../appConstants';
import { ArrowRight } from 'lucide-react';

const MyGames: React.FC = () => {
  return (
    <div className="space-y-10 pb-24 max-w-6xl mx-auto">
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-gray-400">
          <span>SURVEYCLUB PLATFORM</span>
          <span>/</span>
          <span className="text-gray-900">IN-PROGRESS</span>
        </div>
        <h1 className="text-4xl font-normal text-gray-900 leading-none">My Games</h1>
        <p className="text-gray-400 text-sm mt-4">Continue playing your started games to reach the next milestone and earn cash.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_MY_GAMES.map(game => (
          <div key={game.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6 space-y-4 group transition-all hover:shadow-md">
            <div className="relative h-32 rounded-2xl overflow-hidden">
               <img src={game.image} className="w-full h-full object-cover" alt={game.title} />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            </div>
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900">{game.title}</h3>
                <span className="text-sm font-bold text-[#10b981]">+${game.amount.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">{game.provider}</p>
            </div>
            
            <div className="space-y-1.5">
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>Overall Progress</span>
                  <span className="text-gray-900">{game.progress}%</span>
               </div>
               <div className="h-2 w-full bg-gray-50 rounded-full border border-gray-100 overflow-hidden">
                  <div 
                    className="h-full bg-[#c9ff3a] transition-all duration-500 ease-out"
                    style={{ width: `${game.progress}%` }}
                  ></div>
               </div>
            </div>

            <button className="w-full py-3 bg-[#0a0a0a] text-white text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center hover:bg-[#1f2937] transition-all group">
              Continue Playing
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGames;
