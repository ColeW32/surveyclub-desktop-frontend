import React from 'react';
import { X, Check, Zap } from 'lucide-react';

interface PremiumModalProps {
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-modal-title"
    >
      {/* Backdrop - click to close */}
      <div
        className="absolute inset-0 bg-black/70 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card - no animate-in, use opacity/transform so it works with Tailwind CDN */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="bg-[#111827] px-6 pt-6 pb-8 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#c9ff3a] flex items-center justify-center">
              <Zap size={24} className="text-[#111827]" />
            </div>
            <div>
              <h2 id="premium-modal-title" className="text-xl font-bold text-white">
                Upgrade to Premium
              </h2>
              <p className="text-sm text-gray-400">$0.99/month · 30-day free trial</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-3xl font-black text-[#111827]">
              $0.99<span className="text-lg font-semibold text-gray-400">/month</span>
            </p>
            <p className="text-sm font-semibold text-[#00BE9D] mt-1">Start with a 30-day free trial</p>
          </div>

          <ul className="space-y-3">
            {[
              '3x higher survey payouts',
              'Instant withdrawals',
              'No ads',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <span className="w-5 h-5 rounded-full bg-[#c9ff3a]/30 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-[#5a7d00]" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => {}}
            className="w-full py-4 bg-[#111827] hover:bg-black text-white font-bold text-base rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Start Free Trial
            <Zap size={18} className="text-[#c9ff3a]" />
          </button>

          <p className="text-xs text-center text-gray-400">
            Cancel anytime. No commitment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
