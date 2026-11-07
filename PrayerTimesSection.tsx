import React, { useState, useRef, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Compass, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  Bell, 
  Check, 
  Navigation
} from 'lucide-react';
import { CityLocation, PrayerTimeData } from '../types/quran';
import { 
  MAJOR_CITIES, 
  ATHAN_AUDIOS, 
  AthanAudio, 
  calculatePrayerTimes, 
  getNextPrayer, 
  getHijriDate, 
  NextPrayerInfo 
} from '../services/prayerService';

interface PrayerTimesSectionProps {
  currentCity: CityLocation;
  onSelectCity: (city: CityLocation) => void;
  onAutoLocate: () => void;
  isLocating: boolean;
  prayerTimes: PrayerTimeData;
  nextPrayer: NextPrayerInfo | null;
}

export const PrayerTimesSection: React.FC<PrayerTimesSectionProps> = ({
  currentCity,
  onSelectCity,
  onAutoLocate,
  isLocating,
  prayerTimes,
  nextPrayer
}) => {
  const [selectedAthan, setSelectedAthan] = useState<AthanAudio>(ATHAN_AUDIOS[0]);
  const [isPlayingAthan, setIsPlayingAthan] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const athanAudioRef = useRef<HTMLAudioElement | null>(null);

  const hijri = getHijriDate(new Date());

  const prayersList: { key: keyof PrayerTimeData; name: string; enName: string; icon: React.ReactNode; isPrayer: boolean }[] = [
    { key: "Imsak", name: "الإمساك", enName: "Imsak", icon: <Moon className="w-5 h-5 text-indigo-400" />, isPrayer: false },
    { key: "Fajr", name: "الفجر", enName: "Fajr", icon: <Sunrise className="w-5 h-5 text-amber-500" />, isPrayer: true },
    { key: "Sunrise", name: "الشروق", enName: "Sunrise", icon: <Sun className="w-5 h-5 text-amber-400" />, isPrayer: false },
    { key: "Dhuhr", name: "الظهر", enName: "Dhuhr", icon: <Sun className="w-5 h-5 text-yellow-500" />, isPrayer: true },
    { key: "Asr", name: "العصر", enName: "Asr", icon: <Sun className="w-5 h-5 text-amber-600" />, isPrayer: true },
    { key: "Maghrib", name: "المغرب", enName: "Maghrib", icon: <Sunset className="w-5 h-5 text-orange-500" />, isPrayer: true },
    { key: "Isha", name: "العشاء", enName: "Isha", icon: <Moon className="w-5 h-5 text-blue-500" />, isPrayer: true },
    { key: "Midnight", name: "منتصف الليل (قيام)", enName: "Midnight", icon: <Moon className="w-5 h-5 text-purple-400" />, isPrayer: false }
  ];

  const toggleAthanPlayback = () => {
    if (!athanAudioRef.current) return;
    if (isPlayingAthan) {
      athanAudioRef.current.pause();
      setIsPlayingAthan(false);
    } else {
      athanAudioRef.current.src = selectedAthan.url;
      athanAudioRef.current.play().then(() => {
        setIsPlayingAthan(true);
      }).catch(err => {
        console.warn("Athan playback prevented:", err);
      });
    }
  };

  const handleRequestNotifications = async () => {
    if (!("Notification" in window)) {
      alert("المتصفح لا يدعم التنبيهات المباشرة");
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      setNotificationEnabled(true);
      new Notification("نور القرآن ومواقيت الصلاة", {
        body: `تم تفعيل تنبيهات مواقيت الصلاة لمدينة ${currentCity.name}`,
        icon: "/favicon.ico"
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Hero Header with Twilight Mosque Photography */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-8 border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="absolute inset-0">
          <img 
            src="/src/assets/images/prayer_masjid_illumination_1793963455204.jpg" 
            alt="المسجد الكبير وقت الصلاة عند الغروب" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-45 dark:brightness-35" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/60 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="max-w-xl">
            
            {/* Hijri Date and City Tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 mb-3 font-semibold">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                {hijri.day} {hijri.monthName} {hijri.year} هـ
              </span>
              <span className="text-white/80">·</span>
              <span className="text-stone-200">
                {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-amiri text-white tracking-wide">
              مَوَاقِيتُ الصَّلَاةِ فِي {currentCity.name.toUpperCase()}
            </h1>
            <p className="text-sm text-stone-200/90 mt-2 font-sans leading-relaxed">
              مواقيت دقيقة محسوبة فلكيًا بحسب معايير أم القرى ورابطة العالم الإسلامي مع الأذان الصوتي والعد التنازلي الحي.
            </p>
          </div>

          {/* Countdown Card To Next Prayer */}
          {nextPrayer && (
            <div className="w-full lg:w-auto p-5 rounded-2xl bg-white/10 dark:bg-stone-900/40 backdrop-blur-md border border-white/20 text-white min-w-[280px]">
              <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
                <span>الصلاة القادمة:</span>
                <span className="font-bold text-amber-300 text-sm font-amiri">{nextPrayer.nextPrayerArabicName}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white mb-2 tabular-nums">
                {nextPrayer.nextPrayerTimeStr}
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>متبقي: {nextPrayer.remainingFormatted}</span>
              </div>
              {/* Progress track */}
              <div className="w-full h-1.5 bg-white/20 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${nextPrayer.passedPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* City Switcher & Azan Preview Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 mb-8 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* City Select */}
        <div className="flex items-center gap-2.5 flex-1 min-w-[240px]">
          <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 whitespace-nowrap">المدينة:</span>
          <select
            value={currentCity.name}
            onChange={(e) => {
              const selected = MAJOR_CITIES.find(c => c.name === e.target.value);
              if (selected) onSelectCity(selected);
            }}
            className="w-full max-w-xs px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {MAJOR_CITIES.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name} ({city.country})
              </option>
            ))}
          </select>

          {/* Auto Locate Button */}
          <button
            onClick={onAutoLocate}
            disabled={isLocating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors whitespace-nowrap"
            title="تحديد الموقع تلقائيًا عبر GPS"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? "جارِ التحديد..." : "موقعي الحالي"}</span>
          </button>
        </div>

        {/* Azan Audio Selector & Player */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <select
              value={selectedAthan.id}
              onChange={(e) => {
                const a = ATHAN_AUDIOS.find(item => item.id === e.target.value);
                if (a) {
                  setSelectedAthan(a);
                  if (isPlayingAthan && athanAudioRef.current) {
                    athanAudioRef.current.src = a.url;
                    athanAudioRef.current.play();
                  }
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200"
            >
              {ATHAN_AUDIOS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.muadhin})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={toggleAthanPlayback}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isPlayingAthan
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200'
            }`}
          >
            {isPlayingAthan ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlayingAthan ? "إيقاف الأذان" : "استمع للأذان"}</span>
          </button>

          <button
            onClick={handleRequestNotifications}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              notificationEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
            title="تفعيل تنبيهات الصلاة"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{notificationEnabled ? "التنبيهات مفعلة" : "تفعيل التنبيه"}</span>
          </button>
        </div>

      </div>

      {/* Grid of Prayer Times Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        {prayersList.map((p) => {
          const isNext = nextPrayer?.nextPrayerKey === p.key;
          const time = prayerTimes[p.key] || "--:--";

          return (
            <div
              key={p.key}
              className={`relative p-5 rounded-2xl border transition-all ${
                isNext
                  ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200/90 dark:border-stone-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-stone-800 dark:text-stone-200 font-sans">
                  {p.name}
                </span>
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60">
                  {p.icon}
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 dark:text-stone-50 tabular-nums">
                {time}
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500">
                <span>{p.enName}</span>
                {isNext && (
                  <span className="font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">
                    الصلاة القادمة
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Spiritual Hadith on Prayer */}
      <div className="mt-8 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
            فضل الصلاة لوقتها:
          </span>
          قال رسول الله ﷺ: «أحبُّ الأعمالِ إلى اللهِ تعالى الصلاةُ على وقتِها، ثم بِرُّ الوالدينِ، ثم الجهادُ في سبيلِ اللهِ». (متفق عليه).
        </div>
      </div>

      {/* Hidden Azan Audio Element */}
      <audio
        ref={athanAudioRef}
        onEnded={() => setIsPlayingAthan(false)}
      />

    </div>
  );
};
