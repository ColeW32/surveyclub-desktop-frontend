import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Award, Info, AlertCircle } from 'lucide-react';
import WELCOME_SURVEY_QUESTIONS, { SurveyOption } from '../constants/welcomeSurveyQuestions';
import { useUser } from '../context/UserContext';

const WelcomeSurveyQuiz: React.FC = () => {
  const { setHasCompletedWelcomeSurvey, setBalance, balance } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [textInputValue, setTextInputValue] = useState('');
  const [yearValue, setYearValue] = useState('');
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [showCompletion, setShowCompletion] = useState(false);
  const [responses, setResponses] = useState<Record<number, string>>({});

  const question = WELCOME_SURVEY_QUESTIONS[currentIndex];
  const progress = (currentIndex + 1) / WELCOME_SURVEY_QUESTIONS.length;
  const isLastQuestion = currentIndex === WELCOME_SURVEY_QUESTIONS.length - 1;

  const hasCorrectAnswer = question.correctAnswer !== undefined && question.correctAnswer !== null;
  const hasAnswered = selectedOption !== null;
  const hasExplanation = !!question.explanation;
  const shouldShowExplanation = hasExplanation && hasAnswered;

  const getOptionLabel = (opt: string | SurveyOption): string => {
    return typeof opt === 'string' ? opt : opt.value;
  };

  const handleOptionSelect = (optionValue: string) => {
    if (hasCorrectAnswer) {
      setSelectedOption(optionValue);
      setIsCorrect(optionValue === question.correctAnswer);
    } else {
      setSelectedOption(optionValue === selectedOption ? null : optionValue);
      setIsCorrect(true);
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
    // Block if wrong answer on first 3 questions (which have correct answers)
    if (hasCorrectAnswer && !isCorrect && currentIndex < 3) {
      return;
    }

    const answer = question.type === 'year' ? yearValue : question.type === 'text' ? textInputValue : selectedOption;
    if (!answer) return;
    if (question.type === 'text' && !textInputValue.trim()) return;
    if (question.type === 'year' && !yearValue) return;

    setResponses((prev) => ({ ...prev, [currentIndex]: answer }));

    if (isLastQuestion) {
      setShowCompletion(true);
      return;
    }

    animateTransition(() => {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setTextInputValue('');
      setYearValue('');
    });
  };

  const goBack = () => {
    if (currentIndex === 0) return;
    animateTransition(() => {
      setCurrentIndex((i) => i - 1);
      setSelectedOption(responses[currentIndex - 1] || null);
      setIsCorrect(null);
      setTextInputValue('');
      setYearValue('');
    });
  };

  const handleComplete = () => {
    setBalance(balance + 0.25);
    setHasCompletedWelcomeSurvey(true);
  };

  // Button enabled logic matching mobile:
  // For select questions with correct answers in first 3 Qs, must be correct to proceed
  const canProceed = (() => {
    if (question.type === 'text') return textInputValue.trim().length > 0;
    if (question.type === 'year') return yearValue.length > 0;
    if (question.type === 'select') {
      if (!selectedOption) return false;
      if (hasCorrectAnswer && !isCorrect && currentIndex < 3) return false;
      return true;
    }
    return false;
  })();

  // For qualification questions, append selected value after question text
  const getDisplayQuestion = () => {
    if (question.qualificationCode && question.type === 'select' && selectedOption) {
      return question.question + selectedOption;
    }
    return question.question;
  };

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
      <header className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2">
        <div className="flex items-center gap-4 mb-2">
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
        </div>
        {/* Welcome Survey title */}
        <p className="text-base font-bold text-[#25272B] mb-2.5">Welcome Survey</p>
        {/* Progress bar - 3px height, #CDCDCE background matching mobile */}
        <div className="h-[3px] bg-[#CDCDCE] rounded-[5px] overflow-hidden">
          <div
            className="h-full bg-[#00BE9D] transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center overflow-y-auto px-4 sm:px-6 py-6 sm:py-4">
        <div className={`w-full max-w-lg transition-opacity duration-200 ${fadeClass}`}>
          {/* Title text (shown on first few questions) */}
          {question.title && (
            <p className="text-sm text-[#111827] font-normal mb-8 leading-relaxed">
              {question.title}
            </p>
          )}

          {/* Question text - appends selected value for qualification questions */}
          <h2 className="text-base font-medium text-[#111827] mb-6 leading-snug">
            {getDisplayQuestion()}
          </h2>

          {/* Select options */}
          {question.type === 'select' && question.options && (
            <div className="space-y-2.5">
              {question.options.map((opt, idx) => {
                const label = getOptionLabel(opt);
                const isSelected = selectedOption === label;
                const isOptionCorrect = hasCorrectAnswer && label === question.correctAnswer && isSelected;
                const isOptionIncorrect = hasCorrectAnswer && isSelected && label !== question.correctAnswer;

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(label)}
                    className={`w-full text-left px-4 py-3.5 rounded-lg border font-normal text-sm transition-all duration-200 flex items-center gap-2.5 ${
                      isOptionCorrect
                        ? 'border-[#4CAF50]'
                        : isOptionIncorrect
                          ? 'border-[#F44336]'
                          : isSelected && !hasCorrectAnswer
                            ? 'bg-[#F2F2F2] border-[#00BE9D]'
                            : 'border-[#E5E5E6] bg-white hover:bg-gray-50'
                    }`}
                  >
                    {/* Radio button */}
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isOptionCorrect
                        ? 'border-[#00BE9D]'
                        : isOptionIncorrect
                          ? 'border-[#F44336]'
                          : 'border-[#00BE9D]'
                    }`}>
                      {isSelected && (
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          isOptionCorrect
                            ? 'bg-[#00BE9D]'
                            : isOptionIncorrect
                              ? 'bg-[#F44336]'
                              : 'bg-[#00BE9D]'
                        }`} />
                      )}
                    </div>
                    <span className="ml-1">{label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Year picker */}
          {question.type === 'year' && (
            <div className="flex justify-center">
              <div className="relative w-full max-w-xs">
                <select
                  value={yearValue}
                  onChange={(e) => setYearValue(e.target.value)}
                  className="w-full appearance-none px-5 py-4 rounded-lg border border-[#E5E5E6] bg-white text-[#111827] text-base font-normal text-center focus:outline-none focus:border-[#00BE9D] transition-colors cursor-pointer"
                >
                  <option value="">Select your birth year</option>
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

          {/* ZIP code text input */}
          {question.type === 'text' && (
            <div className="flex justify-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={textInputValue}
                onChange={(e) => setTextInputValue(e.target.value)}
                placeholder="Enter your ZIP code"
                className="w-full max-w-xs px-5 py-4 rounded-lg border border-[#E5E5E6] bg-white text-[#111827] text-base font-normal text-center focus:outline-none focus:border-[#00BE9D] transition-colors placeholder:text-gray-400"
              />
            </div>
          )}

          {/* Explanation / Wrong answer feedback */}
          {shouldShowExplanation && (
            <div className={`flex items-center gap-2.5 rounded-lg mt-4 px-3 py-4 ${
              isCorrect
                ? 'bg-[#CCF2EB]'
                : 'bg-[#FF0303]/20'
            }`}>
              {isCorrect ? (
                <Info size={24} className="text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle size={24} className="text-red-500 flex-shrink-0" />
              )}
              <p className={`text-sm font-medium ${
                isCorrect ? 'text-[#25272B]' : 'text-[#F44336]'
              }`}>
                {isCorrect
                  ? question.explanation
                  : "Oops! That's not the right answer \u2013 try again!"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom button - "Continue" or "Complete" matching mobile */}
      <div className="px-4 sm:px-6 lg:px-8 pt-3 pb-6 sm:pb-8">
        <button
          onClick={goNext}
          disabled={!canProceed}
          className={`w-full max-w-lg mx-auto block text-white font-semibold text-base py-4 rounded-lg active:scale-[0.98] transition-all duration-200 ${
            canProceed
              ? 'bg-black hover:bg-[#1f2937]'
              : 'bg-[#ccc] cursor-not-allowed'
          }`}
        >
          {isLastQuestion ? 'Complete' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default WelcomeSurveyQuiz;
