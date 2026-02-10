import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';

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
  showPremiumModal: boolean;
  setShowPremiumModal: (v: boolean) => void;
  signOut: () => void;
  loginAsNewUser: () => void;
  loginAsExistingUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(21.99);
  const [isPremium, setIsPremium] = useState<boolean>(true);
  const [isFirstCashout, setIsFirstCashout] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [hasCompletedWelcomeSurvey, setHasCompletedWelcomeSurvey] = useState<boolean>(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    setHasCompletedWelcomeSurvey(false);
    setShowWelcomeModal(false);
    setBalance(21.99);
    setIsPremium(true);
    setIsFirstCashout(true);
  }, []);

  const loginAsNewUser = useCallback(() => {
    setIsAuthenticated(true);
    setHasCompletedOnboarding(false);
    setHasCompletedWelcomeSurvey(false);
    setShowWelcomeModal(false);
    setBalance(0);
  }, []);

  const loginAsExistingUser = useCallback(() => {
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
    setHasCompletedWelcomeSurvey(true);
    setShowWelcomeModal(false);
    setBalance(21.99);
  }, []);

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
      showPremiumModal,
      setShowPremiumModal,
      signOut,
      loginAsNewUser,
      loginAsExistingUser,
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
