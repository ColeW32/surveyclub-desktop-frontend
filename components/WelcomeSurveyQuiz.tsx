import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronDown, Award } from 'lucide-react';
import WELCOME_SURVEY_QUESTIONS, { WelcomeSurveyQuestion, SurveyOption } from '../constants/welcomeSurveyQuestions';
import { useUser } from '../context/UserContext';

const WelcomeSurveyQuiz: React.FC = () => {
  const { setHasCompletedWelcomeSurvey, setBalance, balance } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [yearValue, setYearValue] = useState('');
  const [postalValue, setPostalValue] = useState('');
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [showCompletion, setShowCompletion] = useState(false);
  const [responses, setResponses] = useState<Record<number, string>>({});

  const question = WELCOME_SURVEY_QUESTIONS[currentIndex];
  const progress = (currentIndex + 1) / WELCOME_SURVEY_QUESTIONS.length;
  const isLastQuestion = currentIndex === WELCOME_SURVEY_QUESTIONS.length - 1;

  const getOptionLabel = (opt: string | SurveyOption): string => {
    return typeof opt === 'string' ? opt : opt.value;
  };

  const handleSelectAnswer = (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);

    // For questions with a correct answer, show explanation
    if (question.correctAnswer !== undefined && question.correctAnswer !== null) {
      setShowExplanation(true);
    }
  };

  const animateTransition = (callback: () => void) => {
    setFadeClass('opacity-0');
    setTimeout(() => {
      callback();
      setFadeClass('opacity-100');
    }, 200);
  };

  const goNext = () => {
    const answer = question.type === 'year' ? yearValue : question.type === 'postal' ? postalValue : selectedAnswer;
    if (!answer) return;

    setResponses((prev) => ({ ...prev, [currentIndex]: answer }));

    if (isLastQuestion) {
      setShowCompletion(true);
      return;
    }

    animateTransition(() => {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setYearValue('');
      setPostalValue('');
    });
  };

  const goBack = () => {
    if (currentIndex === 0) return;
    animateTransition(() => {
      setCurrentIndex((i) => i - 1);
      setSelectedAnswer(responses[currentIndex - 1] || null);
      setShowExplanation(false);
      setYearValue('');
      setPostalValue('');
    });
  };

  const handleComplete = () => {
    setBalance(balance + 0.25);
    setHasCompletedWelcomeSurvey(true);
  };

  const canProceed =
    question.type === 'year'
      ? yearValue.length === 4
      : question.type === 'postal'
        ? postalValue.length >= 3
        : selectedAnswer !== null;

  // Completion screen
  if (showCompletion) {
    return (
      <div className="flex flex-col h-screen bg-[#F6F7F8] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#00BE9D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00BE9D]/30">
            <Award size={36} className="text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-3">Survey Complete!</h2>
          <p className="text-base sm:text-lg text-[#6B7280] mb-2">You earned</p>
          <p className="text-4xl sm:text-5xl font-black text-[#00BE9D] mb-6">$0.25</p>
          <p className="text-sm text-[#6B7280] mb-8">Your balance has been updated. Let's start earning more!</p>
          <button
            onClick={handleComplete}
            className="w-full bg-[#111827] text-white font-semibold text-base py-4 rounded-2xl hover:bg-[#1f2937] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#111827]/20"
          >
            Start Earning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#F6F7F8] selection:bg-[#00BE9D] selection:text-white">
      {/* Header */}
      <header className="flex items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2 gap-4">
        {currentIndex > 0 ? (
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[#111827] font-semibold text-sm hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>
        ) : (
          <div className="w-16" />
        )}
        <div className="flex-1 max-w-[60%]">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00BE9D] rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-bold text-gray-400 min-w-[3rem] text-right">
          {currentIndex + 1}/{WELCOME_SURVEY_QUESTIONS.length}
        </span>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-start sm:items-center justify-center overflow-y-auto px-4 sm:px-6 py-6 sm:py-4">
        <div className={`w-full max-w-lg transition-opacity duration-200 ${fadeClass}`}>
          {/* Title banner */}
          {question.title && (
            <div className="bg-[#111827] rounded-2xl px-5 py-4 mb-6">
              <p className="text-[13px] sm:text-sm text-gray-300 text-center leading-relaxed font-medium">
                {question.title}
              </p>
            </div>
          )}

          {/* Category label */}
          {question.category && (
            <p className="text-[10px] sm:text-xs uppercase tracking-[1.5px] text-gray-400 font-bold mb-2 text-center">
              {question.category}
            </p>
          )}

          {/* Question */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#111827] text-center mb-6 sm:mb-8 leading-snug">
            {question.question}
          </h2>

          {/* Answer area */}
          {question.type === 'select' && question.options && (
            <div className="space-y-2.5 sm:space-y-3">
              {question.options.map((opt, idx) => {
                const label = getOptionLabel(opt);
                const isSelected = selectedAnswer === label;
                const isCorrect = question.correctAnswer === label;
                const isWrong = showExplanation && isSelected && !isCorrect && question.correctAnswer !== null;
                const showAsCorrect = showExplanation && isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(label)}
                    disabled={showExplanation}
                    className={`w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border-2 font-semibold text-sm sm:text-base transition-all duration-200 ${
                      showAsCorrect
                        ? 'border-[#00BE9D] bg-[#E5F9F5] text-[#111827]'
                        : isWrong
                          ? 'border-red-300 bg-red-50 text-red-700'
                          : isSelected
                            ? 'border-[#111827] bg-[#111827] text-white'
                            : 'border-gray-200 bg-white text-[#111827] hover:border-gray-300 hover:bg-gray-50'
                    } ${showExplanation && !isSelected && !showAsCorrect ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{label}</span>
                      {showAsCorrect && <Check size={18} className="text-[#00BE9D] flex-shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {question.type === 'year' && (
            <div className="flex justify-center">
              <div className="relative w-full max-w-xs">
                <select
                  value={yearValue}
                  onChange={(e) => setYearValue(e.target.value)}
                  className="w-full appearance-none px-5 py-4 rounded-xl border-2 border-gray-200 bg-white text-[#111827] text-lg font-semibold text-center focus:outline-none focus:border-[#00BE9D] transition-colors cursor-pointer"
                >
                  <option value="">Select year</option>
                  {Array.from(
                    { length: (question.maxYear || 2010) - (question.minYear || 1940) + 1 },
                    (_, i) => (question.maxYear || 2010) - i
                  ).map((year) => (
                    <option key={year} value={String(year)}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}

          {question.type === 'postal' && (
            <div className="flex justify-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                value={postalValue}
                onChange={(e) => setPostalValue(e.target.value.replace(/[^0-9-]/g, ''))}
                placeholder="Enter your postal code"
                className="w-full max-w-xs px-5 py-4 rounded-xl border-2 border-gray-200 bg-white text-[#111827] text-lg font-semibold text-center focus:outline-none focus:border-[#00BE9D] transition-colors placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
          )}

          {/* Explanation */}
          {showExplanation && question.explanation && (
            <div className="mt-5 bg-[#E5F9F5] border border-[#00BE9D]/20 rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-[#111827] text-center">{question.explanation}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom button */}
      <div className="px-4 sm:px-6 lg:px-8 pt-3 pb-6 sm:pb-8">
        <button
          onClick={goNext}
          disabled={!canProceed}
          className="w-full max-w-lg mx-auto block bg-[#111827] text-white font-semibold text-base py-4 rounded-2xl hover:bg-[#1f2937] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#111827]/20 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {showExplanation ? 'Continue' : isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default WelcomeSurveyQuiz;
