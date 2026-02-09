import React, { useState } from 'react';
import { Bug } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LoginScreen: React.FC = () => {
  const { setIsAuthenticated } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    // Mock login delay
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsSigningIn(false);
    }, 1000);
  };

  const loginAsDebugUser = () => {
      setIsAuthenticated(true);
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden relative selection:bg-[#c9ff3a] selection:text-black">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#c9ff3a] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-10 animate-pulse delay-1000" style={{ animationDuration: '12s' }}></div>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md px-8 py-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl shadow-black/50">
          {/* Logo / Brand */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#c9ff3a] to-[#a0d61a] rounded-3xl mb-6 shadow-lg shadow-[#c9ff3a]/25 transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <span className="text-black text-4xl font-black">S</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-3 text-white">SurveyClub</h1>
            <p className="text-base text-gray-400 font-medium">Your opinion pays. Sign in to start earning.</p>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            className="group w-full flex items-center justify-center space-x-4 px-6 py-4 bg-white text-black rounded-2xl font-bold text-base hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-white/5"
          >
            {isSigningIn ? (
              <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            <span>{isSigningIn ? 'Signing in...' : 'Continue with Google'}</span>
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
              <p className="text-sm text-red-400 text-center font-medium">{error}</p>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            <span className="px-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Development Mode</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>

          {/* Debug Bypass */}
          <button
            onClick={loginAsDebugUser}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-2xl text-sm font-semibold hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-all duration-200 group"
          >
            <Bug size={18} className="group-hover:text-[#c9ff3a] transition-colors" />
            <span>Quick Debug Access</span>
          </button>
          <p className="text-[11px] text-gray-600 text-center mt-3">Bypasses authentication for testing purposes</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
