import React from 'react';
import { X, Check, Star, Zap } from 'lucide-react';

interface PremiumModalProps {
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-[#111827] z-0">
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-[#c9ff3a]/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-[#00BE9D]/20 rounded-full blur-2xl"></div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        <div className="relative z-1 pt-10 px-6 pb-8 flex flex-col items-center">
          {/* Icon/Brand */}
          <div className="w-20 h-20 bg-gradient-to-br from-[#c9ff3a] to-[#a8e000] rounded-2xl flex items-center justify-center shadow-xl shadow-[#c9ff3a]/20 mb-6 transform -rotate-6 border-[6px] border-white">
            <Star size={40} className="text-[#111827] fill-[#111827]" strokeWidth={1.5} />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-[#111827] mb-2 tracking-tight">Upgrade to Premium</h2>
            <p className="text-gray-500 font-medium text-sm">Supercharge your earning potential</p>
          </div>

          {/* Pricing Card */}
          <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00BE9D] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Most Popular
            </div>
            
            <div className="flex flex-col items-center justify-center mb-4 mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#111827]">$0.99</span>
                <span className="text-gray-400 font-bold text-sm">/ month</span>
              </div>
              <p className="text-[#00BE9D] font-bold text-sm mt-1">30-Day Free Trial</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#c9ff3a]/20 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-[#5a7d00] stroke-[3]" />
                </div>
                <span className="text-sm font-semibold text-gray-700">3x Higher Survey Payouts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#c9ff3a]/20 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-[#5a7d00] stroke-[3]" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Instant Withdrawals</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#c9ff3a]/20 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-[#5a7d00] stroke-[3]" />
                </div>
                <span className="text-sm font-semibold text-gray-700">No Ads Experience</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-[#111827] hover:bg-black text-white font-bold text-lg py-4 rounded-xl shadow-xl shadow-[#111827]/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group border border-gray-800">
            <span>Start Free Trial</span>
            <Zap size={20} className="fill-current text-[#c9ff3a]" />
          </button>
          
          <p className="text-[11px] font-medium text-center text-gray-400 mt-4 leading-relaxed max-w-[200px]">
            Recurring billing, cancel anytime. No commitment required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
