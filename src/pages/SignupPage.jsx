import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { NeoButton } from '@/components/ui/NeoButton';
import { Zap, Mail, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signup(email, password, name);
      navigate('/confirm-signup', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] bg-primary-yellow dot-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-ui-white neo-border neo-shadow-lg p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-ui-black flex items-center justify-center neo-border mx-auto mb-6">
            <Zap className="text-primary-yellow w-10 h-10 fill-current" />
          </div>
          <h1 className="font-cabinet font-extrabold text-4xl uppercase tracking-tighter">Join the Forge</h1>
          <p className="font-satoshi font-medium text-ui-black/60 mt-2">Start your professional transformation.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-600 p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="text-red-600 w-5 h-5 flex-shrink-0" />
            <p className="font-satoshi font-bold text-red-600 text-sm italic">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-cabinet font-extrabold text-lg uppercase tracking-tighter block">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ui-black/40" />
              <input
                type="text"
                required
                className="w-full h-14 pl-12 pr-4 bg-ui-white neo-border font-satoshi font-bold focus:bg-primary-yellow/10 focus:outline-none transition-colors"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-cabinet font-extrabold text-lg uppercase tracking-tighter block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ui-black/40" />
              <input
                type="email"
                required
                className="w-full h-14 pl-12 pr-4 bg-ui-white neo-border font-satoshi font-bold focus:bg-primary-yellow/10 focus:outline-none transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-cabinet font-extrabold text-lg uppercase tracking-tighter block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ui-black/40" />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full h-14 pl-12 pr-12 bg-ui-white neo-border font-satoshi font-bold focus:bg-primary-yellow/10 focus:outline-none transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ui-black/40 hover:text-ui-black transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <NeoButton 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full text-xl"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Get Started Now'}
          </NeoButton>
        </form>

        <div className="mt-10 pt-8 border-t-2 border-ui-black/10 text-center">
          <p className="font-satoshi font-bold text-ui-black/60">
            Already have an account? <Link to="/login" className="text-ui-black underline decoration-2 underline-offset-4 uppercase tracking-tighter">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
