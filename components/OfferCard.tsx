
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface OfferCardProps {
  title: string;
  provider: string;
  amount: number;
  image: string;
  category: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ title, provider, amount, image, category }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative h-44">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
           <div className="w-8 h-8 bg-[#c9ff3a] rounded-full flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
              <Zap size={14} className="text-black" />
           </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0a0a0a]">{title}</h3>
          <span className="text-lg font-bold text-gray-900">${amount.toFixed(2)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-400 mb-6">
          <span>Provided by</span>
          <span className="ml-1.5 font-medium text-gray-600 underline decoration-gray-200">{provider}</span>
        </div>
        <button className="w-full py-3 bg-gray-50 text-gray-400 font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center group-hover:bg-[#c9ff3a] group-hover:text-black transition-all">
          Earn ${amount.toFixed(2)}
          <ArrowRight size={14} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
