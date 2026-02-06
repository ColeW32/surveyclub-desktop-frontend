
import React, { useRef } from 'react';
import { Award, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface MissionItemProps {
  title: string;
  reward: string;
  target: number;
  current: number;
  color?: string;
}

const MissionItem: React.FC<MissionItemProps> = ({ title, reward, target, current, color = "#10b981" }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div className="flex-shrink-0 w-72 bg-gray-50/50 hover:bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:shadow-md group cursor-pointer">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#3d4756] group-hover:text-black transition-colors">{title}</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Target: {target}</p>
          </div>
          <span className="text-sm font-black text-gray-900 px-2 py-1 bg-white rounded-lg border border-gray-100 shadow-sm">+{reward}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-gray-400 uppercase tracking-widest">{percentage}% Complete</span>
            <span className="text-gray-900">{current} / {target}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-700 ease-out rounded-full" 
              style={{ width: `${percentage}%`, backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MissionsWidget: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
      {/* Unified Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">Active Missions</h2>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-black text-[#c9ff3a] bg-black px-1.5 py-0.5 rounded uppercase">2/8 Complete</span>
              <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Premium Rewards Pool</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-emerald-500 border-l border-gray-100 pl-6 h-8">
            <CheckCircle2 size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Trending Up</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Desktop Navigation Picker */}
          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
            <button 
              onClick={() => scroll('left')}
              className="p-1.5 hover:bg-white hover:text-black text-gray-400 rounded-lg transition-all hover:shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
            <button 
              onClick={() => scroll('right')}
              className="p-1.5 hover:bg-white hover:text-black text-gray-400 rounded-lg transition-all hover:shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#0a0a0a] flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-black/10">
              +12
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Mission Container */}
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto no-scrollbar pb-2 pt-1 scroll-smooth"
      >
        <MissionItem 
          title="Download & Play Games" 
          reward="$5.00" 
          target={8} 
          current={1} 
        />
        <MissionItem 
          title="Complete High-Value Offers" 
          reward="$2.50" 
          target={5} 
          current={2} 
          color="#3b82f6"
        />
        <MissionItem 
          title="Daily Survey Goal" 
          reward="$0.75" 
          target={10} 
          current={4} 
          color="#f59e0b"
        />
        <MissionItem 
          title="Milestone Achievement" 
          reward="$10.00" 
          target={1} 
          current={0} 
          color="#8b5cf6"
        />
        <MissionItem 
          title="Community Contributor" 
          reward="$1.50" 
          target={20} 
          current={15} 
          color="#ec4899"
        />
        <MissionItem 
          title="First Withdrawal Bonus" 
          reward="$2.00" 
          target={1} 
          current={0} 
          color="#06b6d4"
        />
      </div>
    </div>
  );
};

export default MissionsWidget;
