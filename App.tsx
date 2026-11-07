import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { QuranReader } from './components/QuranReader';
import { QuranPlayer } from './components/QuranPlayer';
import { TajweedGuide } from './components/TajweedGuide';
import { PrayerTimesSection } from './components/PrayerTimesSection';
import { QiblaCompass } from './components/QiblaCompass';
import { TasbihAdhkar } from './components/TasbihAdhkar';
import { VoiceRecorderModal } from './components/VoiceRecorderModal';

import { SurahDetail, Ayah, Reciter, CityLocation, Bookmark, PrayerTimeData } from './types/quran';
import { RECITERS } from './data/quranData';
import { fetchSurahDetail, getAyahAudioUrl } from './services/quranApi';
import { 
  MAJOR_CITIES, 
  calculatePrayerTimes, 
  getNextPrayer, 
  NextPrayerInfo 
} from './services/prayerService';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'quran' | 'prayers' | 'qibla' | 'adhkar' | 'tajweed'>('quran');

  // Dark Mode Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('quran_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('quran_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('quran_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Quran State
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(() => {
    const saved = localStorage.getItem('quran_last_surah');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [surahDetail, setSurahDetail] = useState<SurahDetail | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(true);

  // Audio Playback State
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(() => {
    const saved = localStorage.getItem('quran_reciter_id');
    const found = RECITERS.find(r => r.id === saved);
    return found || RECITERS[0];
  });
  const [currentPlayingAyahNumber, setCurrentPlayingAyahNumber] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<number>(1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Voice Comparison Modal State
  const [voiceRecorderAyah, setVoiceRecorderAyah] = useState<Ayah | null>(null);

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('quran_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (ayah: Ayah) => {
    if (!surahDetail) return;
    const exists = bookmarks.some(
      b => b.surahNumber === surahDetail.number && b.ayahNumberInSurah === ayah.numberInSurah
    );
    let updated: Bookmark[];
    if (exists) {
      updated = bookmarks.filter(
        b => !(b.surahNumber === surahDetail.number && b.ayahNumberInSurah === ayah.numberInSurah)
      );
    } else {
      const newBm: Bookmark = {
        id: `${surahDetail.number}_${ayah.numberInSurah}`,
        surahNumber: surahDetail.number,
        surahName: surahDetail.name,
        ayahNumberInSurah: ayah.numberInSurah,
        ayahText: ayah.text,
        createdAt: Date.now()
      };
      updated = [newBm, ...bookmarks];
    }
    setBookmarks(updated);
    localStorage.setItem('quran_bookmarks', JSON.stringify(updated));
  };

  // Prayer Times State
  const [currentCity, setCurrentCity] = useState<CityLocation>(() => {
    const saved = localStorage.getItem('prayer_city');
    return saved ? JSON.parse(saved) : MAJOR_CITIES[0]; // Default Makkah
  });
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData>(() => 
    calculatePrayerTimes(new Date(), MAJOR_CITIES[0].lat, MAJOR_CITIES[0].lng)
  );
  const [nextPrayer, setNextPrayer] = useState<NextPrayerInfo | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Update prayer times when city changes
  useEffect(() => {
    const times = calculatePrayerTimes(new Date(), currentCity.lat, currentCity.lng);
    setPrayerTimes(times);
    setNextPrayer(getNextPrayer(times, new Date()));
    localStorage.setItem('prayer_city', JSON.stringify(currentCity));
  }, [currentCity]);

  // Live countdown timer ticker (every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setNextPrayer(getNextPrayer(prayerTimes, new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, [prayerTimes]);

  // Handle GPS Auto Locate
  const handleAutoLocate = () => {
    if (!navigator.geolocation) {
      alert("متصفحك لا يدعم تحديد الموقع الجغرافي.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const userLoc: CityLocation = {
          name: "موقعي الحالي",
          country: "GPS",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        setCurrentCity(userLoc);
      },
      (err) => {
        setIsLocating(false);
        console.warn("Geolocation failed:", err);
        alert("تعذر تحديد الموقع الجغرافي. يرجى اختيار مدينتك من القائمة.");
      },
      { timeout: 10000 }
    );
  };

  // Load Surah Details
  useEffect(() => {
    let isMounted = true;
    setIsLoadingSurah(true);
    fetchSurahDetail(selectedSurahNumber)
      .then((detail) => {
        if (isMounted) {
          setSurahDetail(detail);
          setIsLoadingSurah(false);
          localStorage.setItem('quran_last_surah', selectedSurahNumber.toString());
        }
      })
      .catch((err) => {
        if (isMounted) {
          setIsLoadingSurah(false);
          console.error(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSurahNumber]);

  // Playback Handlers
  const handlePlayAyah = (ayah: Ayah) => {
    setCurrentPlayingAyahNumber(ayah.numberInSurah);
    setIsPlaying(true);
  };

  const handlePauseAyah = () => {
    setIsPlaying(false);
  };

  const handleTogglePlayPause = () => {
    if (!surahDetail) return;
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (!currentPlayingAyahNumber) {
        setCurrentPlayingAyahNumber(1);
      }
      setIsPlaying(true);
    }
  };

  const handleNextAyah = () => {
    if (!surahDetail) return;
    const current = currentPlayingAyahNumber || 1;
    if (current < surahDetail.numberOfAyahs) {
      setCurrentPlayingAyahNumber(current + 1);
      setIsPlaying(true);
    } else {
      // Move to next Surah if available
      if (selectedSurahNumber < 114) {
        setSelectedSurahNumber(selectedSurahNumber + 1);
        setCurrentPlayingAyahNumber(1);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const handlePrevAyah = () => {
    if (!surahDetail) return;
    const current = currentPlayingAyahNumber || 1;
    if (current > 1) {
      setCurrentPlayingAyahNumber(current - 1);
      setIsPlaying(true);
    } else if (selectedSurahNumber > 1) {
      setSelectedSurahNumber(selectedSurahNumber - 1);
      setCurrentPlayingAyahNumber(1);
      setIsPlaying(true);
    }
  };

  const currentPlayingAyah = surahDetail?.ayahs.find(a => a.numberInSurah === currentPlayingAyahNumber) || null;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 bg-islamic-pattern transition-colors">
      
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        nextPrayer={nextPrayer}
        cityName={currentCity.name}
      />

      {/* Main Tab Views */}
      <main className="flex-1">
        {activeTab === 'quran' && (
          <QuranReader
            surahDetail={surahDetail}
            isLoadingSurah={isLoadingSurah}
            selectedSurahNumber={selectedSurahNumber}
            onSelectSurah={(num) => {
              setSelectedSurahNumber(num);
              setCurrentPlayingAyahNumber(null);
              setIsPlaying(false);
            }}
            currentPlayingAyahNumber={currentPlayingAyahNumber}
            isPlaying={isPlaying}
            onPlayAyah={handlePlayAyah}
            onPauseAyah={handlePauseAyah}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onOpenVoiceRecorder={(ayah) => setVoiceRecorderAyah(ayah)}
            onOpenTajweed={() => setActiveTab('tajweed')}
          />
        )}

        {activeTab === 'tajweed' && (
          <TajweedGuide />
        )}

        {activeTab === 'prayers' && (
          <PrayerTimesSection
            currentCity={currentCity}
            onSelectCity={setCurrentCity}
            onAutoLocate={handleAutoLocate}
            isLocating={isLocating}
            prayerTimes={prayerTimes}
            nextPrayer={nextPrayer}
          />
        )}

        {activeTab === 'qibla' && (
          <QiblaCompass currentCity={currentCity} />
        )}

        {activeTab === 'adhkar' && (
          <TasbihAdhkar />
        )}
      </main>

      {/* Persistent Audio Player Bar */}
      <QuranPlayer
        currentSurah={surahDetail}
        currentAyah={currentPlayingAyah}
        isPlaying={isPlaying}
        onPlayPause={handleTogglePlayPause}
        onNextAyah={handleNextAyah}
        onPrevAyah={handlePrevAyah}
        selectedReciter={selectedReciter}
        onSelectReciter={(r) => {
          setSelectedReciter(r);
          localStorage.setItem('quran_reciter_id', r.id);
        }}
        repeatMode={repeatMode}
        onSetRepeatMode={setRepeatMode}
        playbackSpeed={playbackSpeed}
        onSetPlaybackSpeed={setPlaybackSpeed}
        onOpenVoiceRecorder={(ayah) => setVoiceRecorderAyah(ayah)}
      />

      {/* Voice Recorder & Pronunciation Comparison Modal */}
      {voiceRecorderAyah && surahDetail && (
        <VoiceRecorderModal
          isOpen={!!voiceRecorderAyah}
          onClose={() => setVoiceRecorderAyah(null)}
          ayah={voiceRecorderAyah}
          surahName={surahDetail.name}
          reciter={selectedReciter}
          sheikhAudioUrl={getAyahAudioUrl(selectedReciter.subfolder, surahDetail.number, voiceRecorderAyah.numberInSurah)}
        />
      )}

      {/* Editorial Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 py-8 bg-white/70 dark:bg-stone-900/70 text-xs text-stone-500 dark:text-stone-400 mt-12 pb-24 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <span className="font-bold font-amiri text-sm text-stone-800 dark:text-stone-200">
              نُورُ القُرْآنِ الكَرِيمِ وَمَوَاقِيتُ الصَّلَاةِ
            </span>
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="block sm:inline mt-1 sm:mt-0">
              صدقة جارية لوجه الله تعالى — تلاوة وتعليم وأحكام التجويد الميسرة
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-400 dark:text-stone-500">
            <span>رواية حفص عن عاصم</span>
            <span>·</span>
            <span>مواقيت فلكية دقيقة</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
