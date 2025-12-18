
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const { users, setCurrentUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.email === email);
    if (user) {
      if (user.isBlocked) {
        setError('Your account has been blocked.');
        return;
      }
      setCurrentUser(user);
      window.location.hash = '/';
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-emerald-50/50">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-200 overflow-hidden border border-emerald-100">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to join community events</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 text-center animate-in shake">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 px-2 tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="name@email.com" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-widest">Password</label>
                <button type="button" className="text-xs font-bold text-emerald-600 hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              Log In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account? <a href="#/signup" className="text-emerald-600 font-bold hover:underline">Create Account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
