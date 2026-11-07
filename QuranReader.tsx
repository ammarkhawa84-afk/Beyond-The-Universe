import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  BookOpen, 
  Play, 
  Pause, 
  Bookmark as BookmarkIcon, 
  BookmarkCheck, 
  Info, 
  Sparkles, 
  Mic, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  Type, 
  Check, 
  ListOrdered,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { SurahMeta, SurahDetail, Ayah, Bookmark } from '../types/quran';
import { SURAHS_LIST } from '../data/quranData';

interface QuranReaderProps {
  surahDetail: SurahDetail | null;
  isLoadingSurah: boolean;
  selectedSurahNumber: number;
  onSelectSurah: (num: number) => void;
  currentPlayingAyahNumber: number | null;
  isPlaying: boolean;
  onPlayAyah: (ayah: Ayah) => void;
  onPauseAyah: () => void;
  bookmarks: Bookmark[];
  onToggleBookmark: (ayah: Ayah) => void;
  onOpenVoiceRecorder: (ayah: Ayah) => void;
  onOpenTajweed: () => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  surahDetail,
  isLoadingSurah,
  selectedSurahNumber,
  onSelectSurah,
  currentPlayingAyahNumber,
  isPlaying,
  onPlayAyah,
  onPauseAyah,
  bookmarks,
  onToggleBookmark,
  onOpenVoiceRecorder,
  onOpenTajweed
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [learningMode, setLearningMode] = useState<'reading' | 'memorization'>('reading');
  const [fontSize, setFontSize] = useState<'base' | 'lg' | 'xl' | '2xl'>('xl');
  const [revealedAyahs, setRevealedAyahs] = useState<Record<number, boolean>>({});
  const [expandedTafsir, setExpandedTafsir] = useState<Record<number, boolean>>({});
  const [showSurahPicker, setShowSurahPicker] = useState(false);

  const activeAyahRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to active playing ayah
  useEffect(() => {
    if (activeAyahRef.current) {
      activeAyahRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentPlayingAyahNumber]);

  const filteredSurahs = SURAHS_LIST.filter(s => 
    s.name.includes(searchQuery) ||
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString() === searchQuery.trim()
  );

  const toggleRevealAyah = (num: number) => {
    setRevealedAyahs(prev => ({ ...prev, [num]: !prev[num] }));
  };

  const toggleTafsir = (num: number) => {
    setExpandedTafsir(prev => ({ ...prev, [num]: !prev[num] }));
  };

  const fontSizeClass = {
    base: 'text-xl sm:text-2xl leading-[2.2]',
    lg: 'text-2xl sm:text-3xl leading-[2.4]',
    xl: 'text-3xl sm:text-4xl leading-[2.6]',
    '2xl': 'text-4xl sm:text-5xl leading-[2.8]'
  }[fontSize];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-32">
      
      {/* Top Learning Banner with Hero Image */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-8 border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="absolute inset-0">
          <img 
            src="/src/assets/images/quran_learning_hero_1793963454938.jpg" 
            alt="المصحف الشريف على حامل خشبي" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-40 dark:brightness-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/60 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold backdrop-blur-sm mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مصحف الترتيل والتحفيظ الذكي</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-amiri text-white tracking-wide">
              {surahDetail ? `سُورَةُ ${surahDetail.name}` : "القُرْآنُ الكَرِيمُ"}
            </h1>
            <p className="text-sm text-stone-200/90 mt-2 font-sans max-w-xl leading-relaxed">
              استمع لترتيل الآيات بأصوات كبار أئمة التلاوة، كرر الآيات لحفظها بسهولة، وتدرّب على مخارج الحروف وقارن قراءتك صوتيًا مع القارئ.
            </p>
          </div>

          {/* Quick learning actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowSurahPicker(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-stone-900 font-semibold text-xs shadow-md transition-all hover:scale-102"
            >
              <ListOrdered className="w-4 h-4 text-emerald-700" />
              <span>فهرس السور (114 سورة)</span>
            </button>
            <button
              onClick={onOpenTajweed}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md transition-all hover:scale-102"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>دليل التجويد الميسر</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Surah selector, Search, Mode toggle, Font size */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Surah quick switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectSurah(Math.max(1, selectedSurahNumber - 1))}
            disabled={selectedSurahNumber <= 1}
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none"
            title="السورة السابقة"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowSurahPicker(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 font-bold text-sm transition-colors border border-stone-200 dark:border-stone-700"
          >
            <span>{selectedSurahNumber}. {surahDetail?.name || 'اختر السورة'}</span>
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => onSelectSurah(Math.min(114, selectedSurahNumber + 1))}
            disabled={selectedSurahNumber >= 114}
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none"
            title="السورة التالية"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {surahDetail && (
            <span className="text-xs text-stone-500 dark:text-stone-400 hidden sm:inline mr-2">
              {surahDetail.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} · {surahDetail.numberOfAyahs} آيات
            </span>
          )}
        </div>

        {/* Right side controls: Mode switch + Font size */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          
          {/* Mode Segmented Control */}
          <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => setLearningMode('reading')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                learningMode === 'reading'
                  ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              قراءة وتدبر
            </button>
            <button
              onClick={() => setLearningMode('memorization')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                learningMode === 'memorization'
                  ? 'bg-white dark:bg-stone-900 text-amber-800 dark:text-amber-300 shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <EyeOff className="w-3 h-3" />
              <span>وضع التحفيظ</span>
            </button>
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center gap-1 border-r border-stone-200 dark:border-stone-800 pr-3">
            <Type className="w-3.5 h-3.5 text-stone-400" />
            {(['base', 'lg', 'xl', '2xl'] as const).map(size => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-medium transition-colors ${
                  fontSize === size
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {size === 'base' ? 'ع' : size === 'lg' ? 'ك' : size === 'xl' ? 'ج' : 'أ'}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Main Reading & Learning Board */}
      {isLoadingSurah ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-stone-500 dark:text-stone-400">جارِ تحميل سورة القرآن الكريم...</p>
        </div>
      ) : surahDetail ? (
        <div className="flex flex-col gap-5">
          
          {/* Bismillah Header (Except Surah At-Tawbah) */}
          {selectedSurahNumber !== 9 && (
            <div className="text-center py-6 px-4 bg-white/60 dark:bg-stone-900/60 rounded-2xl border border-stone-200/60 dark:border-stone-800/60">
              <p className="font-quran text-2xl sm:text-3xl text-emerald-900 dark:text-emerald-200">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}

          {/* Verses Container */}
          <div className="flex flex-col gap-4">
            {surahDetail.ayahs.map((ayah) => {
              const isPlayingThis = currentPlayingAyahNumber === ayah.numberInSurah;
              const isBookmarked = bookmarks.some(
                b => b.surahNumber === surahDetail.number && b.ayahNumberInSurah === ayah.numberInSurah
              );
              const isHidden = learningMode === 'memorization' && !revealedAyahs[ayah.numberInSurah];
              const isTafsirOpen = !!expandedTafsir[ayah.numberInSurah];

              return (
                <div
                  key={ayah.numberInSurah}
                  ref={isPlayingThis ? activeAyahRef : null}
                  className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                    isPlayingThis
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-stone-900 border-stone-200/90 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800'
                  }`}
                >
                  {/* Top Bar of Ayah Card */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-stone-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-xs font-bold flex items-center justify-center">
                        {ayah.numberInSurah}
                      </span>
                      {ayah.juz && (
                        <span className="text-xs text-stone-400 dark:text-stone-500">
                          الجزء {ayah.juz}
                        </span>
                      )}
                    </div>

                    {/* Ayah Actions */}
                    <div className="flex items-center gap-1.5">
                      {/* Play Button */}
                      <button
                        onClick={() => isPlayingThis && isPlaying ? onPauseAyah() : onPlayAyah(ayah)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          isPlayingThis && isPlaying
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
                        }`}
                        title="استمع للآية"
                      >
                        {isPlayingThis && isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                        <span className="hidden sm:inline">{isPlayingThis && isPlaying ? "إيقاف" : "استمع"}</span>
                      </button>

                      {/* Voice Recorder & Comparison */}
                      <button
                        onClick={() => onOpenVoiceRecorder(ayah)}
                        className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                        title="سجل صوتك وقارن مع القارئ"
                      >
                        <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </button>

                      {/* Tafsir Toggle Button */}
                      {ayah.tafsir && (
                        <button
                          onClick={() => toggleTafsir(ayah.numberInSurah)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isTafsirOpen
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300'
                          }`}
                          title="التفسير الميسر"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      )}

                      {/* Bookmark Button */}
                      <button
                        onClick={() => onToggleBookmark(ayah)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                            : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 dark:text-stone-500'
                        }`}
                        title={isBookmarked ? "إزالة من المحفوظات" : "حفظ الآية كعلامة مرجعية"}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkIcon className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Main Verse Text */}
                  <div className="py-2 text-right">
                    {isHidden ? (
                      <div 
                        onClick={() => toggleRevealAyah(ayah.numberInSurah)}
                        className="p-6 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-center cursor-pointer hover:bg-amber-100/60 dark:hover:bg-amber-950/30 transition-colors"
                      >
                        <Eye className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                        <span className="text-sm font-semibold text-amber-900 dark:text-amber-200 block">
                          الآية مخفية لاختبار حفظك
                        </span>
                        <span className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-1 block">
                          اضغط هنا لإظهار الآية والتأكد من صحة تسميعك
                        </span>
                      </div>
                    ) : (
                      <div className="relative">
                        <p className={`font-quran ${fontSizeClass} text-stone-900 dark:text-stone-100 text-right select-text`}>
                          {ayah.text}{' '}
                          <span className="inline-flex items-center justify-center font-amiri text-emerald-700 dark:text-emerald-400 mx-1 text-lg font-bold">
                            ﴿{ayah.numberInSurah}﴾
                          </span>
                        </p>

                        {/* Translation if available */}
                        {ayah.translation && (
                          <p className="mt-3 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-sans leading-relaxed text-left" dir="ltr">
                            {ayah.translation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Word-by-word meaning cards if available */}
                  {ayah.words && !isHidden && (
                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-2">
                      <span className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 w-full mb-1">
                        معاني الكلمات:
                      </span>
                      {ayah.words.map((w, wIdx) => (
                        <div
                          key={wIdx}
                          className="px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 text-xs flex items-center gap-1.5"
                        >
                          <span className="font-quran font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                            {w.arabic}
                          </span>
                          <span className="text-stone-400">:</span>
                          <span className="text-stone-600 dark:text-stone-300">
                            {w.meaning}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Expandable Tafsir Al-Muyassar */}
                  {isTafsirOpen && ayah.tafsir && (
                    <div className="mt-4 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed animate-in fade-in">
                      <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>التفسير الميسر:</span>
                      </div>
                      <p>{ayah.tafsir}</p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      ) : null}

      {/* Full Surahs Selection Modal */}
      {showSurahPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full p-6 border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col gap-4 max-h-[85vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="text-lg font-bold font-amiri text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                فهرس سور القرآن الكريم (114 سورة)
              </h2>
              <button
                onClick={() => setShowSurahPicker(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="ابحث باسم السورة، رقمها، أو اسمها بالإنجليزية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Grid of Surahs */}
            <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 pr-1">
              {filteredSurahs.map((s) => {
                const isCurrent = s.number === selectedSurahNumber;
                return (
                  <button
                    key={s.number}
                    onClick={() => {
                      onSelectSurah(s.number);
                      setShowSurahPicker(false);
                      setRevealedAyahs({});
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-right transition-colors ${
                      isCurrent
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                        : 'bg-stone-50/70 dark:bg-stone-950/70 border-stone-200/80 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-700 flex items-center justify-center font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {s.number}
                      </span>
                      <div>
                        <span className="font-amiri text-base font-bold block">
                          سورة {s.name}
                        </span>
                        <span className="text-[11px] text-stone-400 dark:text-stone-500 block">
                          {s.englishName} · {s.englishNameTranslation}
                        </span>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-mono block">
                        {s.numberOfAyahs} آيات
                      </span>
                      <span className="text-[10px] text-stone-400 dark:text-stone-500">
                        {s.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
