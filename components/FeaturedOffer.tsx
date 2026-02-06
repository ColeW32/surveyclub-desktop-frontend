
import React from 'react';
import { Lock, Zap, ArrowRight, Gamepad2, TrendingUp } from 'lucide-react';

const FeaturedOffer: React.FC = () => {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative group">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c9ff3a]/5 to-transparent pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row items-stretch min-h-[320px]">
        {/* Image Section */}
        <div className="w-full md:w-1/3 relative overflow-hidden bg-gray-100">
          <img 
            src="https://picsum.photos/seed/monopoly/800/600" 
            alt="Featured Game" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
              <Gamepad2 size={14} className="text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Most Popular</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between relative">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black text-[#c9ff3a] bg-black px-2 py-0.5 rounded uppercase tracking-widest">Featured Offer</span>
                  <div className="flex items-center space-x-1 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                    <TrendingUp size={12} />
                    <span>High Conversion</span>
                  </div>
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Monopoly GO!</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Potential</p>
                <p className="text-3xl font-black text-gray-900 leading-none">$1,040.00</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#c9ff3a] flex items-center justify-center">
                    <Zap size={16} className="text-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Immediate Reward</p>
                    <p className="text-sm font-bold text-gray-900">Earn $5.00 instantly after install</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <Lock size={16} className="text-[#c9ff3a]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Unlock Feature</p>
                    <p className="text-sm font-bold text-gray-900">Unlock "My Games" section</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto px-10 py-4 bg-[#c9ff3a] text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-[#c9ff3a]/20 hover:shadow-[#c9ff3a]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-3 group/btn">
              <span>Start Offer</span>
              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest max-w-[200px]">
              Available for iOS and Android. Completion required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedOffer;
