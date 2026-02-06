import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';

interface CashOutOption {
  id: string;
  name: string;
  color: string;
  textColor?: string;
  logo?: React.ReactNode;
}

const CASH_OUT_OPTIONS: CashOutOption[] = [
  { id: 'venmo', name: 'Venmo', color: '#008CFF', textColor: 'white' },
  { id: 'cashapp', name: 'Cash App', color: '#00D632', textColor: 'white' },
  { id: 'bank', name: 'Bank Transfer', color: '#e5e7eb', textColor: 'black' }, // Light gray for generic bank
  { id: 'paypal', name: 'PayPal', color: '#003087', textColor: 'white' },
  { id: 'mastercard', name: 'MasterCard', color: '#EB001B', textColor: 'white' },
  { id: 'amazon', name: 'Amazon', color: '#232F3E', textColor: 'white' },
  { id: 'starbucks', name: 'Starbucks', color: '#00704A', textColor: 'white' },
  { id: 'walmart', name: 'Walmart', color: '#0071DC', textColor: 'white' },
  { id: 'target', name: 'Target', color: '#CC0000', textColor: 'white' },
  { id: 'ebay', name: 'eBay', color: '#F5AF02', textColor: 'black' }, // eBay yellow/gold for variety
  { id: 'chipotle', name: 'Chipotle', color: '#451400', textColor: 'white' },
  { id: 'grubhub', name: 'Grubhub', color: '#F63440', textColor: 'white' },
  { id: 'itunes', name: 'iTunes', color: '#FA2D48', textColor: 'white' },
];

const WithdrawCash: React.FC = () => {
  const currentBalance = 21.99;
  const withdrawThreshold = 15.00;
  const progress = Math.min((currentBalance / withdrawThreshold) * 100, 100);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="space-y-6">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Withdraw Cash</h1>
        
        {/* Progress Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[#c9ff3a]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-gray-400">$0.00</span>
              <span className="text-black">${withdrawThreshold.toFixed(2)}</span>
            </div>

            <div className="pt-2 text-center">
              <p className="text-lg font-bold text-gray-900">
                Withdraw minimum on your 1st cash out.
              </p>
              <p className="text-gray-500 font-medium mt-1">
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
              className="group relative flex items-center justify-center h-32 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              style={{ backgroundColor: option.color }}
            >
              <span 
                className={`text-2xl font-black tracking-tight ${option.textColor === 'white' ? 'text-white' : 'text-gray-900'}`}
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
