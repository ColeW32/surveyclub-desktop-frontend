import React, { useState, useEffect } from 'react';
import { Settings, LogOut, RefreshCw, DollarSign, Crown, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

const DebugSettings: React.FC = () => {
  const { 
    balance, setBalance, 
    isPremium, setIsPremium, 
    isFirstCashout, setIsFirstCashout 
  } = useUser();
  
  const [localBalance, setLocalBalance] = useState<string>(balance.toString());

  useEffect(() => {
    setLocalBalance(balance.toString());
  }, [balance]);

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setLocalBalance(value);
    }
  };

  const handleSaveSettings = () => {
    setBalance(parseFloat(localBalance) || 0);
    alert('Debug settings applied!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Debug Settings</h1>
        <p className="text-gray-500 font-medium">Configure application state for testing purposes.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
        
        {/* Balance Setting */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
            <DollarSign size={16} className="text-gray-400" />
            <span>Account Balance</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
            <input 
              type="text" 
              value={localBalance}
              onChange={handleBalanceChange}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-lg font-bold rounded-xl py-3 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-[#c9ff3a] focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
          <p className="text-xs text-gray-400 font-medium">
            Adjust the user's current wallet balance.
          </p>
        </div>

        <div className="h-px bg-gray-100 w-full"></div>

        {/* User Status Toggles */}
        <div className="space-y-6">
          <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
            <Settings size={16} className="text-gray-400" />
            <span>User Status</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Premium Status Toggle */}
            <button 
              onClick={() => setIsPremium(!isPremium)}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center space-x-3 text-left ${
                isPremium 
                  ? 'border-[#c9ff3a] bg-[#c9ff3a]/5' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPremium ? 'bg-[#c9ff3a] text-black' : 'bg-gray-100 text-gray-400'}`}>
                <Crown size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Premium Member</p>
                <p className="text-xs text-gray-500 font-medium">
                  {isPremium ? 'Active' : 'Inactive'}
                </p>
              </div>
            </button>

            {/* First Cashout Toggle */}
            <button 
              onClick={() => setIsFirstCashout(!isFirstCashout)}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center space-x-3 text-left ${
                isFirstCashout 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isFirstCashout ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                <Award size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900">First Cashout</p>
                <p className="text-xs text-gray-500 font-medium">
                  {isFirstCashout ? 'Yes (Higher Min)' : 'No (Standard Min)'}
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full"></div>

        {/* Actions */}
        <div className="flex flex-col space-y-3 pt-2">
           <button 
             onClick={handleSaveSettings}
             className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-black/10"
           >
             <RefreshCw size={18} />
             <span>Apply Changes</span>
           </button>

           <button className="w-full py-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl transition-colors flex items-center justify-center space-x-2 border border-red-100">
             <LogOut size={18} />
             <span>Sign Out</span>
           </button>
        </div>

      </div>
    </div>
  );
};

export default DebugSettings;
