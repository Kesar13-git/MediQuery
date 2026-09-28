import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SymptomCheckerPage } from './pages/SymptomCheckerPage';
import { AskMediQueryPage } from './pages/AskMediQueryPage';
import { HealthKnowledgePage } from './pages/HealthKnowledgePage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { HelpModal } from './components/HelpModal';
import { ProfileModal } from './components/ProfileModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { PrivacyModal } from './components/PrivacyModal';
import { HistoryRecord, SymptomAnalysisResult, UserProfile } from './types';

const STORAGE_KEY_HISTORY = 'mediquery_symptom_history_v1';
const STORAGE_KEY_USER = 'mediquery_user_profile_v1';
const STORAGE_KEY_THEME = 'mediquery_theme_v1';

const DEFAULT_USER: UserProfile = {
  name: 'Student Evaluator',
  email: 'evaluator@engineering.edu',
  isGuest: true,
  preferredLanguage: 'English',
  historySettings: {
    saveToLocal: true,
    autoClearDays: 30,
  },
  privacySettings: {
    telemetryOptIn: false,
    anonymizeInput: true,
  },
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved !== null) {
      return saved === 'dark';
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
  });

  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [activeAnalysisResult, setActiveAnalysisResult] = useState<SymptomAnalysisResult | null>(null);
  const [initialPrompt, setInitialPrompt] = useState<string>('');

  // Modals
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  // Sync dark mode to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'light');
    }
  }, [darkMode]);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    } catch (err) {
      console.warn('Could not save history to localStorage', err);
    }
  }, [history]);

  // Sync user profile
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (err) {
      console.warn('Could not save user to localStorage', err);
    }
  }, [user]);

  const handleSaveToHistory = (record: HistoryRecord) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== record.id);
      return [record, ...filtered];
    });
  };

  const handleDeleteHistoryRecord = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {}
  };

  const handleViewHistoricalRecord = (record: HistoryRecord) => {
    setActiveAnalysisResult(record.analysisData);
    setCurrentTab('checker');
  };

  const handleQuickStartPrompt = (prompt: string) => {
    setInitialPrompt(prompt);
    setActiveAnalysisResult(null);
    setCurrentTab('checker');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-teal-500 selection:text-white font-sans">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenHelp={() => setShowHelpModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        user={user}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'home' && (
          <HomePage
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickStartPrompt={handleQuickStartPrompt}
          />
        )}

        {currentTab === 'checker' && (
          <SymptomCheckerPage
            initialPrompt={initialPrompt}
            onSaveToHistory={handleSaveToHistory}
            activeAnalysisResult={activeAnalysisResult}
            onClearActiveAnalysis={() => setActiveAnalysisResult(null)}
            user={user}
          />
        )}

        {currentTab === 'qa' && <AskMediQueryPage />}

        {currentTab === 'knowledge' && <HealthKnowledgePage />}

        {currentTab === 'history' && (
          <HistoryPage
            history={history}
            onViewRecord={handleViewHistoricalRecord}
            onDeleteRecord={handleDeleteHistoryRecord}
            onClearHistory={handleClearHistory}
            onStartNewCheck={() => {
              setActiveAnalysisResult(null);
              setInitialPrompt('');
              setCurrentTab('checker');
            }}
          />
        )}

        {currentTab === 'about' && <AboutPage />}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPrivacy={() => setShowPrivacyModal(true)}
        onOpenDisclaimer={() => setShowDisclaimerModal(true)}
      />

      {/* Modals */}
      {showHelpModal && (
        <HelpModal
          onClose={() => setShowHelpModal(false)}
          onSelectTestPrompt={(p) => {
            setShowHelpModal(false);
            handleQuickStartPrompt(p);
          }}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          user={user}
          onSaveProfile={(updated) => setUser(updated)}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {showDisclaimerModal && (
        <DisclaimerModal onClose={() => setShowDisclaimerModal(false)} />
      )}

      {showPrivacyModal && (
        <PrivacyModal
          onClose={() => setShowPrivacyModal(false)}
          onClearLocalData={() => {
            handleClearHistory();
            setUser(DEFAULT_USER);
          }}
        />
      )}
    </div>
  );
}
