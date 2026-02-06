
import React from 'react';
import { Bell, User, Search, ArrowUpRight } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#0a0a0a] text-white w-full border-b border-gray-800/20">
      <div className="px-6">
        <div className="px-12 lg:px-16">
          <div className="max-w-6xl mx-auto py-6 flex items-center justify-between">
            {/* Left Portion: Balance & Withdraw */}
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Wallet Balance</span>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-black text-white tracking-tighter">$21.99</span>
                  <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#c9ff3a] text-black text-[10px] font-black uppercase rounded-lg hover:bg-[#b8eb32] transition-colors shadow-lg shadow-[#c9ff3a]/10">
                    <span>Withdraw</span>
                    <ArrowUpRight size={12} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Portion: The Utility Pill */}
            <div className="flex items-center bg-gray-900/40 rounded-2xl p-1.5 border border-gray-800/50 shadow-lg shadow-black/20">
              <div className="flex items-center px-2 space-x-1">
                <button className="p-2.5 text-gray-500 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                  <Search size={18} />
                </button>
                <button className="p-2.5 text-gray-500 hover:text-white transition-colors relative rounded-xl hover:bg-white/5">
                  <Bell size={18} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#c9ff3a] rounded-full border-2 border-[#0a0a0a]"></span>
                </button>
              </div>
              
              <div className="w-[1px] h-6 bg-gray-800/80 mx-1"></div>

              <div className="flex items-center space-x-3 group cursor-pointer pl-3 pr-2 py-1 rounded-xl hover:bg-white/5 transition-all">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-white group-hover:text-[#c9ff3a] transition-colors leading-none mb-0.5">Jonathan S.</p>
                  <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-none">Platinum</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 overflow-hidden group-hover:border-[#c9ff3a]/50 transition-colors">
                  <User size={16} className="text-gray-400 group-hover:text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
