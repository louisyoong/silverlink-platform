
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { UserRole } from '../types';
import { Mail, Lock, User as UserIcon, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

const SignUp: React.FC = () => {
  const { setCurrentUser, setUsers } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: UserRole.USER
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      isBlocked: false,
      joinedEvents: []
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    window.location.hash = '/';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-emerald-50/50">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-200 overflow-hidden border border-emerald-100 flex flex-col md:flex-row">
        {/* Sidebar Info */}
        <div className="md:w-5/12 bg-emerald-600 p-10 text-white hidden md:flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Join the SilverLink Family</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-white/20 p-2 rounded-lg"><Heart size={20} /></div>
                <p className="text-sm opacity-90 leading-relaxed">Join community workshops and social gatherings.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/20 p-2 rounded-lg"><ShieldCheck size={20} /></div>
                <p className="text-sm opacity-90 leading-relaxed">A safe space built specifically for the aging society.</p>
              </div>
            </div>
          </div>
          <div className="text-xs opacity-60">© 2024 SilverLink Platform</div>
        </div>

        {/* Form Area */}
        <div className="flex-1 p-8 md:p-12">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">Choose how you want to use the platform.</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: UserRole.USER})}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  formData.role === UserRole.USER 
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                  : 'border-gray-100 bg-gray-50 text-gray-400 grayscale hover:grayscale-0'
                }`}
              >
                <UserIcon size={24} />
                <span className="text-xs font-bold uppercase">Member</span>
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: UserRole.ORGANIZER})}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  formData.role === UserRole.ORGANIZER 
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                  : 'border-gray-100 bg-gray-50 text-gray-400 grayscale hover:grayscale-0'
                }`}
              >
                <ShieldCheck size={24} />
                <span className="text-xs font-bold uppercase">Organizer</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 px-2 tracking-widest">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 px-2 tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="name@email.com" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 px-2 tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
            >
              Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
