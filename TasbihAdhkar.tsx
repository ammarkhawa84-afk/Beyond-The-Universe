import React, { useState, useRef } from 'react';
import { Sparkles, RotateCcw, Volume2, VolumeX, CheckCircle2, Moon, Sun, Heart, Flame } from 'lucide-react';
import { DAILY_ADHKAR } from '../data/quranData';
import { DhikrItem } from '../types/quran';

export const TasbihAdhkar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tasbih' | 'sabah' | 'masaa'>('tasbih');
  
  // Tasbih Counter State
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(33);
  const [selectedTasbihText, setSelectedTasbihText] = useState<string>("سُبْحَانَ اللَّهِ");
  const [totalSessionDhikr, setTotalSessionDhikr] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Adhkar Check State
  const [adhkarCounts, setAdhkarCounts] = useState<Record<string, number>>({});

  const audioContextRef = useRef<AudioContext | null>(null);

  // Click synthesizer using Web Audio API
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // AudioContext may be restricted by autoplay policy
    }
  };

  const handleTasbihClick = () => {
    playClickSound();
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
    setTasbihCount(prev => prev + 1);
    setTotalSessionDhikr(prev => prev + 1);
  };

  const resetTasbih = () => {
    setTasbihCount(0);
  };

  const handleAdhkarItemClick = (id: string, target: number) => {
    playClickSound();
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    setAdhkarCounts(prev => {
      const current = prev[id] || 0;
      if (current >= target) return prev; // already done
      return { ...prev, [id]: current + 1 };
    });
  };

  const tasbihPresets = [
    "سُبْحَانَ اللَّهِ",
    "الْحَمْدُ لِلَّهِ",
    "لا إِلَهَ إِلا اللَّهُ",
    "اللَّهُ أَكْبَرُ",
    "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    "لا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ",
    "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ"
  ];

  const currentCategoryAdhkar = DAILY_ADHKAR.filter(item => 
    activeTab === 'sabah' ? item.category === 'sabah' : item.category === 'masaa'
  );

  const percentage = Math.min(100, (tasbihCount / (targetCount || 1)) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-300">
      
      {/* Tab Switcher */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl max-w-md mx-auto mb-8 border border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setActiveTab('tasbih')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
            activeTab === 'tasbih'
              ? 'bg-white dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          المسبحة الإلكترونية
        </button>
        <button
          onClick={() => setActiveTab('sabah')}
          className={`flex items-center justify-center gap-1.5 flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
            activeTab === 'sabah'
              ? 'bg-white dark:bg-stone-800 text-amber-800 dark:text-amber-300 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <Sun className="w-4 h-4 text-amber-500" />
          <span>أذكار الصباح</span>
        </button>
        <button
          onClick={() => setActiveTab('masaa')}
          className={`flex items-center justify-center gap-1.5 flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
            activeTab === 'masaa'
              ? 'bg-white dark:bg-stone-800 text-blue-800 dark:text-blue-300 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <Moon className="w-4 h-4 text-blue-400" />
          <span>أذكار المساء</span>
        </button>
      </div>

      {/* View 1: Digital Tasbih */}
      {activeTab === 'tasbih' && (
        <div className="flex flex-col items-center gap-6">
          
          {/* Preset Dhikr Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
            {tasbihPresets.map((t, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedTasbihText(t);
                  resetTasbih();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedTasbihText === t
                    ? 'bg-emerald-700 text-white shadow-sm scale-105'
                    : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Main Visual Bead Counter */}
          <div className="relative flex flex-col items-center justify-center my-4">
            
            {/* SVG Ring Progress */}
            <svg className="w-64 h-64 sm:w-72 sm:h-72 transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="44%"
                className="stroke-stone-200 dark:stroke-stone-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="44%"
                className="stroke-emerald-600 dark:stroke-emerald-500 transition-all duration-150"
                strokeWidth="10"
                strokeDasharray="550"
                strokeDashoffset={550 - (550 * percentage) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Tap Surface Inside Circle */}
            <button
              onClick={handleTasbihClick}
              className="absolute inset-5 rounded-full bg-radial from-stone-50 to-stone-100 dark:from-stone-850 dark:to-stone-900 border-4 border-stone-200/60 dark:border-stone-800 flex flex-col items-center justify-center p-6 text-center shadow-lg active:scale-95 transition-transform select-none group"
            >
              <span className="text-xs sm:text-sm font-semibold text-stone-500 dark:text-stone-400 font-sans mb-1 line-clamp-2 px-2">
                {selectedTasbihText}
              </span>
              
              <span className="text-5xl sm:text-6xl font-extrabold font-mono text-emerald-800 dark:text-emerald-300 tracking-tight tabular-nums group-hover:scale-105 transition-transform">
                {tasbihCount}
              </span>

              <span className="text-xs text-stone-400 mt-2">
                الهدف: {targetCount} {tasbihCount >= targetCount ? '✓ تم' : ''}
              </span>
            </button>
          </div>

          {/* Target and Controls Bar */}
          <div className="flex items-center gap-3">
            {/* Target Selectors */}
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-900 p-1 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-mono font-bold">
              {[33, 99, 100].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setTargetCount(cnt)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    targetCount === cnt
                      ? 'bg-emerald-600 text-white'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>

            {/* Reset Button */}
            <button
              onClick={resetTasbih}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
              title="تصفير العداد"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تصفير</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"
              title={soundEnabled ? "كتم الصوت" : "تشغيل صوت النقر"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Session Statistics */}
          <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
            <span>مجموع تسبيحات هذه الجلسة:</span>
            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {totalSessionDhikr}
            </span>
          </div>

        </div>
      )}

      {/* View 2: Morning & Evening Adhkar */}
      {(activeTab === 'sabah' || activeTab === 'masaa') && (
        <div className="flex flex-col gap-4">
          <div className="mb-2">
            <h2 className="text-xl font-bold font-amiri text-stone-900 dark:text-stone-50">
              {activeTab === 'sabah' ? "أَذْكَارُ الصَّبَاحِ المَأْثُورَةِ" : "أَذْكَارُ المَسَاءِ المَأْثُورَةِ"}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              حصن المسلم اليومي من القرآن الكريم والسنة النبوية الصحيحة. اضغط على الذكر لاحتساب التكرار.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {currentCategoryAdhkar.map((item) => {
              const count = adhkarCounts[item.id] || 0;
              const isDone = count >= item.target;

              return (
                <div
                  key={item.id}
                  onClick={() => handleAdhkarItemClick(item.id, item.target)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 opacity-90'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-quran text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-relaxed text-right flex-1">
                      {item.text}
                    </p>

                    <div className="shrink-0 flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-sm transition-all shadow-xs ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700'
                      }`}>
                        {isDone ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <>
                            <span>{count}</span>
                            <span className="text-[10px] text-stone-400">/{item.target}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Virtue & Reference */}
                  <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span className="text-emerald-700 dark:text-emerald-400">
                      {item.virtue}
                    </span>
                    {item.reference && (
                      <span className="text-stone-400 dark:text-stone-500 font-sans">
                        [{item.reference}]
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
