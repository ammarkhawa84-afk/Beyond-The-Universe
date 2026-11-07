import React, { useState } from 'react';
import { BookOpen, Sparkles, Volume2, CheckCircle2, Info } from 'lucide-react';
import { TAJWEED_RULES } from '../data/quranData';
import { TajweedRule } from '../types/quran';

export const TajweedGuide: React.FC = () => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(TAJWEED_RULES[0].id);

  const activeRule = TAJWEED_RULES.find(r => r.id === selectedRuleId) || TAJWEED_RULES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-amiri text-stone-900 dark:text-stone-50">
          دَلِيلُ أَحْكَامِ التَّجْوِيدِ المُيَسَّر
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-3xl">
          تعلم قواعد الترتيل الصحيحة ومخارج الحروف مع أمثلة قرآنية وتطبيقية لضبط التلاوة وتحقيق قول الله تعالى: ﴿وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا﴾.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation list of rules */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-2">
            الأحكام والقواعد الأساسية
          </span>
          <div className="flex flex-col gap-1.5">
            {TAJWEED_RULES.map((rule) => {
              const isSelected = rule.id === selectedRuleId;
              return (
                <button
                  key={rule.id}
                  onClick={() => setSelectedRuleId(rule.id)}
                  className={`flex items-center justify-between text-right p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 shadow-sm'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-3 h-3 rounded-full shrink-0" 
                      style={{ backgroundColor: rule.color }}
                    />
                    <div>
                      <span className="text-xs text-stone-400 dark:text-stone-500 block">
                        {rule.category}
                      </span>
                      <span className="text-sm font-bold font-sans">
                        {rule.title}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                    {rule.letters.length} حروف
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick learning tip card */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-stone-900 border border-amber-200 dark:border-amber-900/60 mt-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>مفتاح إتقان التجويد:</span>
            </div>
            التجويد يُؤخذ بالمشافهة والتلقي عن القراء المتقنين؛ كرر الاستماع للشيخ الحصري (المصحف المعلم) وسجل صوتك للمقارنة حتى تستقر الحروف في مخارجها الطبيعية.
          </div>
        </div>

        {/* Rule Detail View */}
        <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
          
          {/* Header of Active Rule */}
          <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {activeRule.category}
              </span>
              <span className="text-stone-300 dark:text-stone-600">·</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                قواعد الترتيل
              </span>
            </div>
            <h2 className="text-2xl font-bold font-amiri text-stone-900 dark:text-stone-50 flex items-center gap-3">
              <span 
                className="w-4 h-4 rounded-full inline-block" 
                style={{ backgroundColor: activeRule.color }} 
              />
              {activeRule.title}
            </h2>
            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed mt-3">
              {activeRule.description}
            </p>
          </div>

          {/* Letters Box */}
          <div>
            <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
              حروف هذا الحكم ({activeRule.letters.length} حروف)
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeRule.letters.map((letter, i) => (
                <div
                  key={i}
                  className="w-11 h-11 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center font-amiri text-xl font-bold text-stone-900 dark:text-stone-100 shadow-xs"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>

          {/* Quranic Examples */}
          <div>
            <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
              أمثلة تطبيقية من القرآن الكريم
            </h3>
            <div className="flex flex-col gap-3">
              {activeRule.examples.map((ex, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200/90 dark:border-stone-800 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      سورة {ex.surahName} · الآية {ex.verseNumber}
                    </span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      موضع الحكم: {ex.targetWord}
                    </span>
                  </div>

                  <p className="font-quran text-xl sm:text-2xl text-emerald-950 dark:text-emerald-200 py-2 leading-relaxed text-right">
                    {ex.text}
                  </p>

                  <div className="flex items-start gap-2 pt-2 border-t border-stone-200/60 dark:border-stone-800/80 text-xs text-stone-600 dark:text-stone-300">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ex.explanation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
