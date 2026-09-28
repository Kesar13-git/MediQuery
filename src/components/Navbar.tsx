import React, { useState } from 'react';
import {
  Activity,
  HeartPulse,
  BookOpen,
  History,
  Info,
  HelpCircle,
  User,
  Moon,
  Sun,
  Menu,
  X,
  Stethoscope,
  MessageSquareHeart,
} from 'lucide-react';
import { UserProfile } from '../types';

export type NavTab = 'home' | 'checker' | 'qa' | 'knowledge' | 'history' | 'about';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenHelp: () => void;
  onOpenProfile: () => void;
  user: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  darkMode,
  onToggleDarkMode,
  onOpenHelp,
  onOpenProfile,
  user,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: HeartPulse },
    { id: 'checker', label: 'Symptom Checker', icon: Stethoscope },
    { id: 'qa', label: 'Ask MediQuery', icon: MessageSquareHeart },
    { id: 'knowledge', label: 'Health Knowledge', icon: BookOpen },
    { id: 'history', label: 'History', icon: History },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Logo symbol: M + Heartbeat + Cross nodes */}
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-900/10 transition-transform group-hover:scale-105">
            {/* SVG custom emblem with medical cross, heartbeat line, and digital node */}
            <svg
              className="w-6 h-6 stroke-white fill-none stroke-[2.2]"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Subtle cross coordinate */}
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3" className="stroke-teal-300 opacity-60" />
              {/* Heartbeat pulse forming an 'M' */}
              <path d="M3 13h4l2.5-6 3.5 11 2.5-7 2 3h3.5" />
              {/* Digital intelligence node */}
              <circle cx="15.5" cy="11" r="1.2" className="fill-teal-300 stroke-none" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                Medi<span className="text-teal-600 dark:text-teal-400">Query</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline-block tracking-tight font-medium">
              Understand your symptoms &bull; AI-assisted health guidance
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 font-semibold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Dark Mode, Help, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Help Modal */}
          <button
            type="button"
            id="help-modal-trigger-btn"
            onClick={onOpenHelp}
            className="p-2 rounded-lg text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="User Guide & System Demonstration"
            aria-label="User Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* User Profile / Guest Badge */}
          <button
            type="button"
            id="user-profile-btn"
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors cursor-pointer text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'G'}
            </div>
            <span className="hidden sm:inline font-medium text-slate-700 dark:text-slate-200">
              {user.isGuest ? 'Guest Mode' : user.name}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
