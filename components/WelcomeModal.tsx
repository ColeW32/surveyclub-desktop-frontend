import React from 'react';
import { CheckCircle, Lock, X } from 'lucide-react';

interface WelcomeModalProps {
  onStartSurvey: () => void;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStartSurvey, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Overlay with glass effect */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 sm:p-10 w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-4 duration-500 border border-white/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100/50"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-gray-500 uppercase tracking-widest mb-2">Welcome to</p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#111827] mb-4 tracking-tight">SurveyClub</h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-sm mx-auto font-medium">
            You now have unfiltered access to surveys and games where we pay you <span className="text-[#00BE9D] font-bold">3x more</span> than any other platform.
          </p>
        </div>

        {/* Green divider */}
        <div className="flex justify-center mb-8">
          <div className="h-1.5 w-16 bg-gradient-to-r from-[#72FF03] to-[#00BE9D] rounded-full shadow-[0_0_15px_rgba(114,255,3,0.5)]" />
        </div>

        {/* Section title */}
        <p className="text-lg font-bold text-[#111827] text-center mb-6">
          Let's Start Earning Right Away
        </p>

        {/* Checklist */}
        <div className="border border-gray-100 bg-gray-50/50 rounded-2xl mb-8 overflow-hidden shadow-inner">
          {/* Welcome Survey row - pending - Highlighting this one */}
          <div className="flex items-center py-4 px-6 bg-white border-b border-gray-100 relative group cursor-pointer hover:bg-green-50/30 transition-colors" onClick={onStartSurvey}>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00BE9D] rounded-r-full" />
            <div className="mr-4 flex-shrink-0">
              <div className="w-6 h-6 rounded-full border-[2.5px] border-[#D1D5DB] group-hover:border-[#00BE9D] flex items-center justify-center transition-colors">
                {/* Empty circle for pending state */}
              </div>
            </div>
            <div className="flex-1">
              <span className="text-lg font-bold text-[#111827] block">Welcome Survey</span>
              <span className="text-xs font-semibold text-[#00BE9D] uppercase tracking-wider">Up Next</span>
            </div>
            <span className="text-lg font-black text-[#111827] bg-[#c9ff3a] px-3 py-1 rounded-lg shadow-sm transform -rotate-2 border border-black/5">$0.25</span>
          </div>

          {/* Check-In row - locked */}
          <div className="flex items-center py-4 px-6 bg-gray-50/50 opacity-60">
            <div className="mr-4 flex-shrink-0">
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                <Lock size={12} className="text-gray-400" />
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-500 flex-1">Check-In</span>
            <span className="text-lg font-bold text-gray-400">$0.11</span>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStartSurvey}
          className="w-full bg-[#111827] hover:bg-black text-white font-bold text-lg py-4 rounded-2xl active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#111827]/20 flex items-center justify-center gap-3 border border-gray-800"
        >
          <span>Start Welcome Survey</span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-sm font-medium text-white/90">3 min</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
