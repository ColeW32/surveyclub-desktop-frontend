
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Apple, Smartphone } from 'lucide-react';
import { NavItem } from '../types';
import { NAVIGATION_ITEMS } from '../appConstants';

interface SidebarProps {
  activeItem: NavItem;
  onItemSelect: (item: NavItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={`flex flex-col transition-all duration-300 h-screen py-8 bg-[#0a0a0a] ${isCollapsed ? 'w-20 px-4' : 'w-64 px-4'}`}
    >
      <div className={`flex items-center mb-12 ${isCollapsed ? 'px-2' : 'px-2'}`}>
        <div className="w-8 h-8 rounded bg-[#c9ff3a] flex items-center justify-center mr-3 shrink-0 shadow-lg shadow-[#c9ff3a]/10">
          <span className="text-black font-black text-xs">SC</span>
        </div>
        {!isCollapsed && (
          <span className="text-white text-xl font-black tracking-tighter">SurveyClub</span>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemSelect(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-white text-black shadow-xl shadow-white/5' 
                  : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
              }`}
            >
              <span className={`${isActive ? 'text-black' : 'group-hover:text-white'} transition-colors shrink-0`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="ml-4 font-bold text-sm whitespace-nowrap tracking-tight">{item.label}</span>
              )}
              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 bg-black rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3">
        {/* Get the App Button */}
        <button
          className={`group/app w-full flex items-center transition-all duration-300 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl hover:border-[#c9ff3a]/30 hover:shadow-lg hover:shadow-[#c9ff3a]/5 ${
            isCollapsed ? 'flex-col py-4 px-0 space-y-2' : 'px-4 py-3.5'
          }`}
        >
          {isCollapsed ? (
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Apple 
                size={18} 
                className="text-gray-400 group-hover/app:text-[#c9ff3a] transition-all duration-300 absolute -translate-x-1.5 -translate-y-1.5 group-hover/app:-translate-y-2 group-hover/app:-rotate-12" 
              />
              <Smartphone 
                size={18} 
                className="text-gray-500 group-hover/app:text-[#c9ff3a] transition-all duration-300 absolute translate-x-1.5 translate-y-1.5 group-hover/app:translate-y-2 group-hover/app:rotate-12" 
              />
            </div>
          ) : (
            <>
              <div className="flex -space-x-1 mr-3.5 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-black/40 border border-gray-700/50 flex items-center justify-center group-hover/app:bg-black group-hover/app:border-[#c9ff3a]/40 transition-colors">
                  <Apple size={14} className="text-gray-300 group-hover/app:text-[#c9ff3a]" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-black/40 border border-gray-700/50 flex items-center justify-center group-hover/app:bg-black group-hover/app:border-[#c9ff3a]/40 transition-colors">
                  <Smartphone size={14} className="text-gray-400 group-hover/app:text-[#c9ff3a]" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-[11px] font-black text-white uppercase tracking-widest leading-none mb-1">Get the App</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">iOS & Android</p>
              </div>
            </>
          )}
        </button>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-800 hover:text-white transition-all border border-gray-800/30 group"
        >
          <div className="shrink-0 group-hover:scale-110 transition-transform">
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </div>
          {!isCollapsed && <span className="ml-4 text-[10px] font-black uppercase tracking-[0.2em]">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
