import React from 'react';
import { CheckCircle, Lock, X } from 'lucide-react';

interface WelcomeModalProps {
  onStartSurvey: () => void;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStartSurvey, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl shadow-black/30 animate-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium text-[#25272B]">Welcome to</p>
          <h2 className="text-3xl sm:text-[28px] font-bold text-[#25272B] mt-4 mb-3">SurveyClub</h2>
          <p className="text-[15px] text-[#6B7280] leading-relaxed px-4">
            You now have unfiltered access to surveys and games where we pay you 3x more than any other survey platform.
          </p>
        </div>

        {/* Green divider */}
        <div className="flex justify-center mb-5">
          <div className="h-[5px] w-8 bg-[#72FF03] rounded-full" />
        </div>

        {/* Section title */}
        <p className="text-base font-bold text-[#25272B] text-center mb-4">
          Let's Start Earning Right Away
        </p>

        {/* Checklist */}
        <div className="border border-[#E5E5E6] rounded-xl mb-6 overflow-hidden">
          {/* Welcome Survey row - pending */}
          <div className="flex items-center py-3 px-4 bg-white">
            <div className="mr-3 flex-shrink-0">
              <div className="w-5 h-5 rounded-full border-2 border-[#D1D5DB] flex items-center justify-center">
                {/* Empty circle for pending state */}
              </div>
            </div>
            <span className="text-base font-medium text-[#25272B] flex-1">Welcome Survey</span>
            <span className="text-base font-bold text-[#25272B]">$0.25</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#F3F4F6]" />

          {/* Check-In row - locked */}
          <div className="flex items-center py-3 px-4 bg-white opacity-50">
            <div className="mr-3 flex-shrink-0">
              <div className="w-5 h-5 rounded-full border-2 border-[#D1D5DB] flex items-center justify-center">
                <Lock size={10} className="text-gray-400" />
              </div>
            </div>
            <span className="text-base font-medium text-[#25272B] flex-1">Check-In</span>
            <span className="text-base font-bold text-[#25272B]">$0.11</span>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStartSurvey}
          className="w-full bg-[#25272B] text-white font-medium text-sm py-3.5 rounded-xl hover:bg-[#3a3d42] active:scale-[0.98] transition-all duration-200"
        >
          Start Welcome Survey ( $0.25 | 3 min )
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
