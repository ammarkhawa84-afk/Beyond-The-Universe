import React from 'react';
import { BookOpen, Clock, Compass, Heart, Moon, Sun, Volume2 } from 'lucide-react';
import { NextPrayerInfo } from '../services/prayerService';

interface NavbarProps {
  activeTab: 'quran' | 'prayers' | 'qibla' | 'adhkar' | 'tajweed';
  setActiveTab: (tab: 'quran' | 'prayers' | 'qibla' | 'adhkar' | 'tajweed') => void;
  isDark: boolean;
  toggleTheme: () => void;
  nextPrayer: NextPrayerInfo | null;
  cityName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme,
  nextPrayer,
  cityName
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single element) */}
        <div 
          onClick={() => setActiveTab('quran')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-700 dark:bg-emerald-600 text-amber-300 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50 font-amiri tracking-wide">
              نُورُ القُرْآنِ وَالصَّلَاةِ
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Clean single line typography) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setActiveTab('quran')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'quran'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
            }`}
          >
            المصحف والتعليم
          </button>

          <button
            onClick={() => setActiveTab('tajweed')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'tajweed'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
            }`}
          >
            أحكام التجويد
          </button>

          <button
            onClick={() => setActiveTab('prayers')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'prayers'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
            }`}
          >
            مواقيت الصلاة
          </button>

          <button
            onClick={() => setActiveTab('qibla')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'qibla'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
            }`}
          >
            اتجاه القبلة
          </button>

          <button
            onClick={() => setActiveTab('adhkar')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'adhkar'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
            }`}
          >
            الأذكار والمسبحة
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Next Prayer Mini-Banner */}
          {nextPrayer && (
            <button
              onClick={() => setActiveTab('prayers')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-700 dark:text-stone-200 transition-colors text-xs font-medium border border-stone-200 dark:border-stone-700"
              title={`الصلاة القادمة: ${nextPrayer.nextPrayerArabicName}`}
            >
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{nextPrayer.nextPrayerArabicName}:</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                {nextPrayer.nextPrayerTimeStr}
              </span>
              <span className="text-stone-400 dark:text-stone-500">({cityName})</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="تبديل المظهر النهاري والليلي"
            title="تبديل المظهر"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 dark:border-stone-800 py-1.5 bg-stone-50/90 dark:bg-stone-900/90 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('quran')}
          className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'quran'
              ? 'bg-emerald-600 text-white font-semibold'
              : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          المصحف
        </button>
        <button
          onClick={() => setActiveTab('tajweed')}
          className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'tajweed'
              ? 'bg-emerald-600 text-white font-semibold'
              : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          التجويد
        </button>
        <button
          onClick={() => setActiveTab('prayers')}
          className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'prayers'
              ? 'bg-emerald-600 text-white font-semibold'
              : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          المواقيت
        </button>
        <button
          onClick={() => setActiveTab('qibla')}
          className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'qibla'
              ? 'bg-emerald-600 text-white font-semibold'
              : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          القبلة
        </button>
        <button
          onClick={() => setActiveTab('adhkar')}
          className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'adhkar'
              ? 'bg-emerald-600 text-white font-semibold'
              : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          المسبحة
        </button>
      </div>
    </header>
  );
};
