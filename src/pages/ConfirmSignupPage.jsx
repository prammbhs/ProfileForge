import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { NeoButton } from '@/components/ui/NeoButton';
import { Zap, Key, AlertCircle, ArrowLeft } from 'lucide-react';

const ConfirmSignupPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { confirmSignup } = useAuth();
  
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Missing email context. Please sign up again.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await confirmSignup(email, code);
      navigate('/login', { state: { message: 'Verification successful! You can now log in.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please check the code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] bg-primary-yellow dot-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-ui-white neo-border neo-shadow-lg p-10">
        <Link to="/signup" className="flex items-center gap-2 font-satoshi font-bold text-sm text-ui-black/60 hover:text-ui-black mb-8 transition-colors uppercase tracking-tighter">
          <ArrowLeft className="w-4 h-4" /> Back to Signup
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-ui-black flex items-center justify-center neo-border mx-auto mb-6">
            <Key className="text-primary-yellow w-10 h-10" />
          </div>
          <h1 className="font-cabinet font-extrabold text-4xl uppercase tracking-tighter">Verify Email</h1>
          <p className="font-satoshi font-medium text-ui-black/60 mt-2">
            We sent a code to <span className="text-ui-black font-bold underline decoration-2">{email || 'your email'}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-600 p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="text-red-600 w-5 h-5 flex-shrink-0" />
            <p className="font-satoshi font-bold text-red-600 text-sm italic">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-cabinet font-extrabold text-lg uppercase tracking-tighter block">Verification Code</label>
            <input
              type="text"
              required
              className="w-full h-14 px-4 bg-ui-white neo-border font-cabinet font-extrabold text-3xl tracking-[0.5rem] text-center focus:bg-primary-yellow/10 focus:outline-none transition-colors"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <NeoButton 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full text-xl"
            disabled={isLoading || !email}
          >
            {isLoading ? 'Verifying...' : 'Forge Account'}
          </NeoButton>
        </form>

        <div className="mt-10 pt-8 border-t-2 border-ui-black/10 text-center">
          <p className="font-satoshi font-bold text-ui-black/60 text-sm italic">
            Didn't receive the code? Check your spam or <button className="underline decoration-2 underline-offset-4 text-ui-black">Resend Code</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSignupPage;
