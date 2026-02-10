import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
  balance: number;
  setBalance: (balance: number) => void;
  isPremium: boolean;
  setIsPremium: (isPremium: boolean) => void;
  isFirstCashout: boolean;
  setIsFirstCashout: (isFirstCashout: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (v: boolean) => void;
  hasCompletedWelcomeSurvey: boolean;
  setHasCompletedWelcomeSurvey: (v: boolean) => void;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (v: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(21.99);
  const [isPremium, setIsPremium] = useState<boolean>(true);
  const [isFirstCashout, setIsFirstCashout] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [hasCompletedWelcomeSurvey, setHasCompletedWelcomeSurvey] = useState<boolean>(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{
      balance,
      setBalance,
      isPremium,
      setIsPremium,
      isFirstCashout,
      setIsFirstCashout,
      isAuthenticated,
      setIsAuthenticated,
      hasCompletedOnboarding,
      setHasCompletedOnboarding,
      hasCompletedWelcomeSurvey,
      setHasCompletedWelcomeSurvey,
      showWelcomeModal,
      setShowWelcomeModal,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
