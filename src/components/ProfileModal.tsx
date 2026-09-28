import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Lock, Mail, Shield, Check, X, LogIn, UserPlus } from 'lucide-react';

interface ProfileModalProps {
  user: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onSaveProfile, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'auth'>('profile');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    age: user.age ? user.age.toString() : '',
    preferredLanguage: user.preferredLanguage || 'English',
    saveToLocal: user.historySettings.saveToLocal,
    anonymizeInput: user.privacySettings.anonymizeInput,
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: formData.name || 'Anonymous User',
      email: formData.email,
      age: formData.age ? parseInt(formData.age, 10) : undefined,
      preferredLanguage: formData.preferredLanguage,
      isGuest: false,
      historySettings: {
        ...user.historySettings,
        saveToLocal: formData.saveToLocal,
      },
      privacySettings: {
        ...user.privacySettings,
        anonymizeInput: formData.anonymizeInput,
      },
    };
    onSaveProfile(updated);
    setAuthSuccess('Profile preferences updated successfully!');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleGuestContinue = () => {
    const guestUser: UserProfile = {
      ...user,
      isGuest: true,
      name: 'Guest User',
    };
    onSaveProfile(guestUser);
    onClose();
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSuccess(
      authMode === 'login'
        ? 'Successfully logged in! Guest session synchronized.'
        : authMode === 'signup'
        ? 'Account created! Academic test mode enabled.'
        : 'Password reset link dispatched to provided address.'
    );
    const updated: UserProfile = {
      ...user,
      name: loginEmail.split('@')[0] || 'Authenticated User',
      email: loginEmail || user.email,
      isGuest: false,
    };
    onSaveProfile(updated);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-1 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            User Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('auth')}
            className={`pb-1 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'auth'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Sign In / Guest
          </button>
        </div>

        {authSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{authSuccess}</span>
          </div>
        )}

        {/* TAB 1: Profile Settings */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                placeholder="e.g. Alex Johnson"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                placeholder="alex@university.edu"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Age (Optional)
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  placeholder="e.g. 23"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Language
                </label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish (ES)</option>
                  <option value="Hindi">Hindi (HI)</option>
                  <option value="French">French (FR)</option>
                </select>
              </div>
            </div>

            {/* Privacy & History toggles */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.saveToLocal}
                  onChange={(e) => setFormData({ ...formData, saveToLocal: e.target.checked })}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Save symptom analyses to browser local storage
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.anonymizeInput}
                  onChange={(e) => setFormData({ ...formData, anonymizeInput: e.target.checked })}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Strip potential personal identifiers before symptom analysis
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </form>
        )}

        {/* TAB 2: Authentication */}
        {activeTab === 'auth' && (
          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-1.5 rounded text-center font-medium cursor-pointer ${
                  authMode === 'login' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-1.5 rounded text-center font-medium cursor-pointer ${
                  authMode === 'signup' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('forgot')}
                className={`flex-1 py-1.5 rounded text-center font-medium cursor-pointer ${
                  authMode === 'forgot' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500'
                }`}
              >
                Reset
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-900 to-teal-700 hover:from-blue-950 hover:to-teal-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
              >
                {authMode === 'login' ? 'Sign In to MediQuery' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
              </button>
            </form>

            {/* Guest button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
              <button
                type="button"
                id="continue-as-guest-btn"
                onClick={handleGuestContinue}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
              >
                Continue as Guest (No Login Required)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
