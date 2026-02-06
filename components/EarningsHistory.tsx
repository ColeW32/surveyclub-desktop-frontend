import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, DollarSign, Award, CheckCircle2, Trophy, Smartphone } from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'survey' | 'mission' | 'reward' | 'offer';
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'InMarket : SurveyClub In-Store',
    date: '2/5/2026',
    amount: 0.10,
    type: 'survey'
  },
  {
    id: '2',
    title: 'Mission: Total Dollars Earned (Beginner)',
    date: '1/28/2026',
    amount: 1.00,
    type: 'mission'
  },
  {
    id: '3',
    title: 'Mission: Earn from a Single Reward (Beginner)',
    date: '1/28/2026',
    amount: 1.00,
    type: 'mission'
  },
  {
    id: '4',
    title: 'Reward for phone verification',
    date: '1/28/2026',
    amount: 0.05,
    type: 'reward'
  },
  {
    id: '5',
    title: 'SoFi Credit Score: Get Your Free Credit Score',
    date: '1/28/2026',
    amount: 9.00,
    type: 'offer'
  },
  {
    id: '6',
    title: 'Reward for completing CheckList',
    date: '1/28/2026',
    amount: 0.15,
    type: 'reward'
  },
  {
    id: '7',
    title: 'Reward for unlocking My Games',
    date: '1/28/2026',
    amount: 5.00,
    type: 'reward'
  }
];

const EarningsHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const totalPages = Math.ceil(MOCK_TRANSACTIONS.length / itemsPerPage);

  const getIcon = (type: string) => {
    switch (type) {
      case 'mission':
        return <Trophy className="text-yellow-500" size={20} />;
      case 'survey':
        return <Calendar className="text-blue-500" size={20} />;
      case 'offer':
        return <DollarSign className="text-[#c9ff3a]" size={20} />;
      case 'reward':
        return <Award className="text-purple-500" size={20} />;
      default:
        return <CheckCircle2 className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Earnings History</h1>
          <p className="text-gray-500 font-medium mt-2">Review your transactions and earnings</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Earned</span>
            <span className="text-xl font-black text-[#c9ff3a]" style={{ WebkitTextStroke: '1px black' }}>$21.99</span>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header (Desktop) */}
        <div className="hidden md:flex items-center px-8 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="w-16">Type</div>
          <div className="flex-1">Description</div>
          <div className="w-32">Date</div>
          <div className="w-24 text-right">Amount</div>
        </div>

        <div className="divide-y divide-gray-100">
          {MOCK_TRANSACTIONS.map((transaction) => (
            <div 
              key={transaction.id}
              className="group flex flex-col md:flex-row md:items-center px-6 md:px-8 py-5 hover:bg-gray-50/80 transition-colors cursor-default"
            >
              {/* Type Icon (Mobile: Inline, Desktop: Column) */}
              <div className="flex items-center md:w-16 mb-2 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-200">
                  {getIcon(transaction.type)}
                </div>
              </div>

              {/* Title */}
              <div className="flex-1 mb-2 md:mb-0">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-black transition-colors">
                  {transaction.title}
                </h3>
              </div>

              {/* Date & Amount Row on Mobile, Columns on Desktop */}
              <div className="flex items-center justify-between md:justify-end md:space-x-4 w-full md:w-auto">
                <div className="md:w-32 text-sm font-medium text-gray-500 flex items-center">
                  <span className="md:hidden mr-2 text-xs uppercase tracking-wide opacity-50">Date:</span>
                  {transaction.date}
                </div>
                
                <div className="md:w-24 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#c9ff3a]/10 text-[#65801d] font-black text-sm border border-[#c9ff3a]/20 group-hover:bg-[#c9ff3a] group-hover:text-black group-hover:border-black/10 transition-all">
                    +${transaction.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State spacer if few items */}
        {MOCK_TRANSACTIONS.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No transactions found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={16} strokeWidth={3} />
          <span>Previous</span>
        </button>

        <span className="text-sm font-bold text-gray-400">
          Page <span className="text-gray-900">{currentPage}</span> of {totalPages || 1}
        </span>

        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <span>Next</span>
          <ChevronRight size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default EarningsHistory;
