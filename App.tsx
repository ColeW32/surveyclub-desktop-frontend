
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MyGames from './components/MyGames';
import { NavItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavItem>(NavItem.EarnCash);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeItem={activeTab} onItemSelect={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header />

        {/* Content Canvas (The "Inner Section") */}
        <main className="flex-1 px-6 pb-6 min-h-0">
          <div className="bg-[#f8f9fa] rounded-[1.5rem] w-full h-full overflow-y-auto no-scrollbar p-12 lg:p-16 scroll-smooth shadow-inner">
            {activeTab === NavItem.EarnCash && <Dashboard />}
            {activeTab === NavItem.MyGames && <MyGames />}
            {![NavItem.EarnCash, NavItem.MyGames].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                 <div className="w-16 h-16 bg-[#c9ff3a] rounded-full animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                 </div>
                 <p className="text-gray-400 font-medium italic">Preparing your {activeTab} experiences...</p>
              </div>
            )}
          </div>
        </main>

        {/* Brand Decoration */}
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-[#c9ff3a] rounded-full blur-[160px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-1/2 -left-48 w-96 h-96 bg-blue-500 rounded-full blur-[160px] opacity-5 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default App;
