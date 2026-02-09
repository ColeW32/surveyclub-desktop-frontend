import React, { useState, useRef, useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MyGames from './components/MyGames';
import WithdrawCash from './components/WithdrawCash';
import EarningsHistory from './components/EarningsHistory';
import DebugSettings from './components/DebugSettings';
import LoginScreen from './components/LoginScreen';
import DailySurveys from './components/DailySurveys';
import { NavItem } from './types';

const MainContent: React.FC = () => {
  const { isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState<NavItem>(NavItem.EarnCash);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeItem={activeTab} onItemSelect={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header />

        {/* Content Canvas (The "Inner Section") */}
        <main className="flex-1 px-6 pb-6 min-h-0">
          <div
            ref={scrollContainerRef}
            className="bg-[#f8f9fa] rounded-[1.5rem] w-full h-full overflow-y-auto no-scrollbar p-12 lg:p-16 scroll-smooth shadow-inner"
          >
            {activeTab === NavItem.EarnCash && <Dashboard />}
            {activeTab === NavItem.Surveys && <DailySurveys />}
            {activeTab === NavItem.MyGames && <MyGames />}
            {activeTab === NavItem.Withdraw && <WithdrawCash />}
            {activeTab === NavItem.History && <EarningsHistory />}
            {activeTab === NavItem.Debug && <DebugSettings />}
            {![NavItem.EarnCash, NavItem.Surveys, NavItem.MyGames, NavItem.Withdraw, NavItem.History, NavItem.Debug].includes(activeTab) && (
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

const App: React.FC = () => {
  return (
    <UserProvider>
      <MainContent />
    </UserProvider>
  );
};

export default App;
