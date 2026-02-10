import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, BarChart3, Zap } from 'lucide-react';
import ONBOARDING_SLIDES, { OnboardingSlide } from '../constants/onboardingData';
import { useUser } from '../context/UserContext';

const SplitSlideIllustration: React.FC<{ slideIndex: number }> = ({ slideIndex }) => {
  const isCompetitor = slideIndex === 0;
  return (
    <div className="w-full rounded-2xl lg:rounded-3xl bg-white shadow-lg shadow-slate-900/5 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Circular backdrop */}
      <div className={`absolute w-[140%] h-[140%] rounded-full top-[-20%] left-[-20%] ${isCompetitor ? 'bg-red-50' : 'bg-emerald-50'}`} />
      <div className="relative flex flex-col items-center">
        {/* Pie chart visualization */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 relative mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="16" />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke={isCompetitor ? '#EF4444' : '#00BE9D'}
              strokeWidth="16"
              strokeDasharray={`${isCompetitor ? 200 : 30} ${264 - (isCompetitor ? 200 : 30)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827]">$2.00</span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-semibold">Survey</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isCompetitor ? 'bg-red-400' : 'bg-[#00BE9D]'}`} />
            <span className="text-xs sm:text-sm font-semibold text-gray-600">
              {isCompetitor ? 'App Keeps' : 'SC Keeps'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200" />
            <span className="text-xs sm:text-sm font-semibold text-gray-600">You Get</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSlideIllustration: React.FC = () => (
  <div className="w-full rounded-2xl lg:rounded-3xl bg-white shadow-lg shadow-slate-900/5 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
    <div className="absolute w-[130%] h-[130%] rounded-full top-[-15%] left-[-10%] bg-emerald-50/80" />
    <div className="relative flex items-center justify-center gap-3 sm:gap-6">
      {/* Other apps bar */}
      <div className="flex flex-col items-center">
        <div className="w-16 sm:w-20 lg:w-24 bg-gray-200 rounded-xl flex items-center justify-center" style={{ height: '80px' }}>
          <span className="text-lg sm:text-xl font-black text-gray-500">$15</span>
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-gray-400 mt-2 uppercase tracking-wider">Other</span>
      </div>
      {/* Arrow */}
      <div className="flex flex-col items-center gap-1">
        <TrendingUp size={20} className="text-[#00BE9D]" />
        <span className="text-[10px] font-black text-[#00BE9D]">3.1x</span>
      </div>
      {/* Survey Club bar */}
      <div className="flex flex-col items-center">
        <div className="w-16 sm:w-20 lg:w-24 bg-gradient-to-t from-[#00BE9D] to-[#00D4AF] rounded-xl flex items-center justify-center" style={{ height: '200px' }}>
          <span className="text-lg sm:text-xl font-black text-white">$50</span>
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-[#00BE9D] mt-2 uppercase tracking-wider">Survey Club</span>
      </div>
    </div>
  </div>
);

const PriceSlideIllustration: React.FC = () => (
  <div className="w-full rounded-2xl lg:rounded-3xl bg-white shadow-lg shadow-slate-900/5 p-4 sm:p-5 lg:p-6 relative overflow-hidden">
    <div className="absolute w-[130%] h-[130%] rounded-full top-[-15%] left-[-10%] bg-green-50/80" />
    <div className="relative flex items-center justify-center">
      <div className="flex items-baseline gap-1">
        <DollarSign size={28} className="text-[#00BE9D]" />
        <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#111827] tracking-tighter">32</span>
        <span className="text-xl sm:text-2xl font-black text-gray-400">.35</span>
        <span className="text-sm font-bold text-gray-400 ml-1">/mo avg</span>
      </div>
    </div>
  </div>
);

const OnboardingScreen: React.FC = () => {
  const { setHasCompletedOnboarding, setShowWelcomeModal } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');

  const slide = ONBOARDING_SLIDES[currentSlide];
  const isLastSlide = currentSlide === ONBOARDING_SLIDES.length - 1;

  const animateTransition = (callback: () => void) => {
    setFadeClass('opacity-0');
    setTimeout(() => {
      callback();
      setFadeClass('opacity-100');
    }, 200);
  };

  const nextSlide = () => {
    if (isLastSlide) {
      setHasCompletedOnboarding(true);
      setShowWelcomeModal(true);
    } else {
      animateTransition(() => setCurrentSlide((s) => s + 1));
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      animateTransition(() => setCurrentSlide((s) => s - 1));
    }
  };

  const renderIllustration = () => {
    if (slide.layout === 'split') return <SplitSlideIllustration slideIndex={currentSlide} />;
    if (slide.layout === 'stats') return <StatsSlideIllustration />;
    return <PriceSlideIllustration />;
  };

  return (
    <div className="flex flex-col h-screen bg-[#F6F7F8] selection:bg-[#00BE9D] selection:text-white">
      {/* Header with back + progress */}
      <header className="flex items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2 h-14 sm:h-16">
        {slide.showBack ? (
          <button
            onClick={prevSlide}
            className="flex items-center gap-2 text-[#111827] font-semibold text-sm hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>
        ) : (
          <div className="w-16" />
        )}

        {slide.showProgress && (
          <div className="flex-1 ml-4 sm:ml-6 max-w-[55%]">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00BE9D] rounded-full transition-all duration-300 ease-linear"
                style={{ width: `${slide.progress * 100}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto px-4 sm:px-6 py-4">
        <div className={`w-full max-w-lg transition-opacity duration-200 ${fadeClass}`}>
          <div className="flex flex-col items-center">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[26px] font-extrabold text-center text-[#111827] mb-3 sm:mb-4">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-sm sm:text-base font-semibold text-gray-500 mb-3">{slide.subtitle}</p>
            )}

            {/* Illustration */}
            <div className="w-full mb-4 sm:mb-5">
              {renderIllustration()}
            </div>

            {/* Stats / Price card (for stats/price layouts) */}
            {slide.layout === 'stats' && slide.slideText && (
              <div className="w-full bg-[#111827] rounded-2xl py-4 px-5 flex flex-col items-center mb-4">
                <span className="text-[10px] sm:text-xs uppercase tracking-[1.2px] text-gray-400 font-bold">
                  {slide.slideText.firstLine}
                </span>
                <span className="text-4xl sm:text-5xl font-black text-[#CCFF02] my-1">
                  {slide.slideText.secondLine}
                </span>
                {slide.slideText.boldText && (
                  <span className="text-sm sm:text-base font-bold text-white">
                    {slide.slideText.boldText}
                  </span>
                )}
              </div>
            )}

            {slide.layout === 'price' && slide.slideText && (
              <div className="w-full bg-[#111827] rounded-2xl py-5 px-5 flex flex-col items-center mb-4">
                <span className="text-sm sm:text-[15px] text-gray-300 text-center mb-1">
                  {slide.slideText.firstLine}
                </span>
                <span className="text-5xl sm:text-[44px] font-black text-[#CCFF02]">
                  {slide.slideText.secondLine}
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-sm sm:text-base font-semibold text-[#111827] text-center leading-relaxed max-w-xs sm:max-w-sm">
              {slide.description}
            </p>

            {slide.subDescription && (
              <p className="text-sm sm:text-[15px] font-semibold text-[#00A389] text-center mt-2">
                {slide.subDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom button */}
      <div className="px-4 sm:px-6 lg:px-8 pt-3 pb-6 sm:pb-8">
        <button
          onClick={nextSlide}
          className="w-full max-w-lg mx-auto block bg-[#111827] text-white font-semibold text-base py-4 rounded-2xl hover:bg-[#1f2937] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#111827]/20"
        >
          {isLastSlide ? 'Continue for Free' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
