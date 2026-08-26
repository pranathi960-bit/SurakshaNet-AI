import React from 'react';
import { Shield, AlertTriangle, Sparkles, FolderLock, BookOpen, Search } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isGeminiLive: boolean;
  onOpenPanic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  isGeminiLive,
  onOpenPanic,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080C16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 group-hover:border-emerald-400 transition-all shadow-shield-emerald">
            <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                SURAKSHANET
              </span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {lang === 'te' ? 'డిజిటల్ రక్షణ వేదిక' : 'Digital Anti-Extortion & Safety Shield'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'home'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {t.nav.home}
          </button>

          <button
            onClick={() => setCurrentTab('analyze')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'analyze'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t.nav.analyze}</span>
          </button>

          <button
            onClick={() => setCurrentTab('vault')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'vault'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FolderLock className="w-4 h-4" />
            <span>{t.nav.vault}</span>
          </button>

          <button
            onClick={() => setCurrentTab('safetyCenter')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'safetyCenter'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.nav.safetyCenter}</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          
          {/* AI Engine Status Badge */}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-700/80">
            <Sparkles className={`w-3.5 h-3.5 ${isGeminiLive ? 'text-cyan-400 animate-pulse' : 'text-amber-400'}`} />
            <span className={isGeminiLive ? 'text-cyan-300' : 'text-amber-300'}>
              {isGeminiLive ? t.app.modeLive : t.app.modeDemo}
            </span>
          </div>

          {/* Bilingual Language Switcher */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-700 p-0.5">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('te')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                lang === 'te'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              తెలుగు
            </button>
          </div>

          {/* Emergency Panic Button */}
          <button
            onClick={onOpenPanic}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-shield-danger hover:shadow-red-500/40 transition-all active:scale-95 animate-pulse-slow cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">{t.nav.panicButton}</span>
            <span className="sm:hidden">🚨 SOS</span>
          </button>

        </div>
      </div>
    </header>
  );
};
