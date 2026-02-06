import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface CashOutOption {
  id: string;
  name: string;
  color: string;
  textColor?: string;
  logo?: React.ReactNode;
}

const CASH_OUT_OPTIONS: CashOutOption[] = [
  { id: 'venmo', name: 'venmo', color: '#008CFF', textColor: 'white' }, // Lowercase to match screenshot logo style
  { id: 'cashapp', name: 'Cash App', color: '#00D632', textColor: 'white' },
  { id: 'bank', name: 'Bank Transfer', color: '#e5e7eb', textColor: 'black' },
  { id: 'paypal', name: 'PayPal', color: '#003087', textColor: 'white' },
  { id: 'mastercard', name: 'MasterCard', color: '#EB001B', textColor: 'white' },
  { id: 'amazon', name: 'Amazon', color: '#232F3E', textColor: 'white' },
  { id: 'starbucks', name: 'Starbucks', color: '#00704A', textColor: 'white' },
  { id: 'walmart', name: 'Walmart', color: '#0071DC', textColor: 'white' },
  { id: 'target', name: 'Target', color: '#CC0000', textColor: 'white' },
  { id: 'ebay', name: 'eBay', color: '#F5AF02', textColor: 'black' },
  { id: 'chipotle', name: 'Chipotle', color: '#451400', textColor: 'white' },
  { id: 'grubhub', name: 'Grubhub', color: '#F63440', textColor: 'white' },
  { id: 'itunes', name: 'iTunes', color: '#FA2D48', textColor: 'white' },
];

const WithdrawCash: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<CashOutOption | null>(null);
  
  // DEBUG STATE: Toggle between a balance below threshold and one above
  const [isDebugHighBalance, setIsDebugHighBalance] = useState(true);

  const currentBalance = isDebugHighBalance ? 21.99 : 5.50;
  const withdrawThreshold = 15.00;
  
  // Calculate progress and amounts
  const progress = Math.min((currentBalance / withdrawThreshold) * 100, 100);
  const canCashOut = currentBalance >= withdrawThreshold;
  const cashOutAmount = Math.floor(currentBalance); 
  const remainingBalance = (currentBalance - cashOutAmount).toFixed(2);
  const amountNeeded = (withdrawThreshold - currentBalance).toFixed(2);

  if (selectedOption) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Navigation Header */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSelectedOption(null)}
            className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <div className="flex items-center space-x-2 text-xl font-black text-gray-900 tracking-tight">
            <span className="text-gray-400 font-bold">Cash Out</span>
            <span className="text-gray-300">|</span>
            <span className="capitalize">{selectedOption.name}</span>
          </div>
        </div>

        {/* Selected Option Card */}
        <div 
          className="w-full h-48 rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden"
          style={{ backgroundColor: selectedOption.color === '#c9ff3a' ? '#c9ff3a' : '#ccff00' }} // Using the lime green from screenshot for Venmo context or generic
        >
          {/* Note: In a real app we'd switch background based on option.color. 
              The screenshot shows a vibrant lime green background for Venmo. 
              For now I'll use the option's color logic.
          */}
          <div 
             className="absolute inset-0 flex items-center justify-center"
             style={{ backgroundColor: selectedOption.color }}
          >
             {/* Background Pattern could go here */}
             <span className={`text-6xl font-black italic tracking-tighter ${selectedOption.textColor === 'white' ? 'text-white' : 'text-black'}`}>
               {selectedOption.name}
             </span>
          </div>
        </div>

        {/* Amount Ready Section */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            ${cashOutAmount.toFixed(2)} Ready to Cash Out
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed max-w-lg mx-auto">
            ${remainingBalance} Will Remain in your balance due to Gift Card provider restrictions 
            on withdraw values needing to be rounded to the nearest dollar.
          </p>
        </div>

        {/* Progress Bar (Full Green) */}
        <div className="h-6 bg-[#c9ff3a] rounded-full w-full"></div>

        {/* Cashout Button */}
        <button className="w-full py-4 bg-[#1a1a1a] text-white text-lg font-bold rounded-2xl hover:bg-black transition-colors shadow-xl shadow-black/10">
          Cashout ${cashOutAmount.toFixed(2)}
        </button>

        {/* Withdrawal Information Card */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-gray-900 text-center">Withdrawal Information</h3>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
            {/* Tier 1 */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#c9ff3a] rounded-full flex items-center justify-center shrink-0">
                <span className="text-black font-black text-sm">1</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">1st Cashout — $15.00</p>
                <p className="font-bold text-gray-900">Minimum</p>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full"></div>

            {/* Tier 2 */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-black text-xs">2+</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">Cashout 2+ — $5.00</p>
                <p className="font-bold text-gray-900">Minimum Forever</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cashout Bonus Card (Premium) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-black text-gray-900">Cashout Bonus</h3>
             <span className="px-3 py-1 bg-[#c9ff3a]/20 text-black text-xs font-bold uppercase tracking-wider rounded-lg border border-[#c9ff3a]">
               Premium member
             </span>
          </div>
          
          <p className="text-gray-500 font-medium">
            Premium members earn bonus cash with every withdrawal.
          </p>

          <div className="space-y-3">
            <h4 className="text-[#3a5c00] font-bold text-sm uppercase tracking-wide">Premium bonus tiers</h4>
            
            <div className="space-y-2">
              {[
                { amount: '5.00+', bonus: '0.50' },
                { amount: '10.00+', bonus: '1.00' },
                { amount: '25.00+', bonus: '3.00' },
              ].map((tier, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="font-bold text-gray-900">${tier.amount} withdrawal</span>
                  <span className="font-bold text-[#15803d]">+ ${tier.bonus} bonus</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main List View
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="space-y-6 relative">
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Withdraw Cash</h1>
            {/* Debug Toggle - Hidden from main UI flow but accessible */}
            <button 
                onClick={() => setIsDebugHighBalance(!isDebugHighBalance)}
                className="text-[10px] px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-500 font-mono transition-colors"
                title="Toggle Debug Balance"
            >
                DEBUG: {isDebugHighBalance ? 'High ($21.99)' : 'Low ($5.50)'}
            </button>
        </div>
        
        {/* Progress Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="space-y-6">
             <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">
                        {canCashOut ? 'Ready to Withdraw!' : 'Keep Earning!'}
                    </h2>
                    <p className="text-gray-500 font-medium mt-1">
                        {canCashOut 
                            ? `You have $${cashOutAmount.toFixed(2)} available to cash out now.`
                            : `You need $${amountNeeded} more to reach your first withdrawal.`
                        }
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-black text-gray-900">
                        ${currentBalance.toFixed(2)}
                    </p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Balance</p>
                </div>
             </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${canCashOut ? 'bg-[#c9ff3a]' : 'bg-yellow-400'}`}
                    style={{ width: `${progress}%` }}
                ></div>
                </div>
                
                <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-400">$0.00</span>
                    <span className="text-gray-900">${withdrawThreshold.toFixed(2)} Goal</span>
                </div>
            </div>

            <div className="pt-2 text-center border-t border-gray-50 mt-4">
              <p className="text-sm font-bold text-gray-900 mt-4">
                $15.00 Withdraw minimum on your 1st cash out.
              </p>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Unlock $5.00 Withdraws after your 1st withdraw.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cash-Out Options Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Cash-Out Options</h2>
        <p className="text-gray-500 font-medium">Select a cash out option to move withdraw.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CASH_OUT_OPTIONS.map((option) => (
            <button 
              key={option.id}
              onClick={() => setSelectedOption(option)}
              className="group relative flex items-center justify-center h-32 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              style={{ backgroundColor: option.color }}
            >
              <span 
                className={`text-2xl font-black tracking-tight ${option.textColor === 'white' ? 'text-white' : 'text-gray-900'} ${option.id === 'venmo' ? 'italic' : ''}`}
              >
                {option.name}
              </span>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithdrawCash;
