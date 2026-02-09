import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { AppUser } from './types';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  loginAsDebugUser: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginAsDebugUser: () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const DEBUG_USER: AppUser = {
  uid: 'debug-user-12345',
  email: 'debug@surveyclub.test',
  displayName: 'Debug User',
  isDebug: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          isDebug: false,
        });
      } else {
        // Only clear if not a debug user
        setUser((prev) => (prev?.isDebug ? prev : null));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAsDebugUser = () => {
    setUser(DEBUG_USER);
    setLoading(false);
  };

  const logout = async () => {
    if (user?.isDebug) {
      setUser(null);
    } else {
      await signOut(auth);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAsDebugUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
