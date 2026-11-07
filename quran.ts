export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number; // overall in Quran
  numberInSurah: number;
  text: string;
  translation?: string;
  tafsir?: string;
  audioUrl?: string;
  juz?: number;
  page?: number;
  words?: { arabic: string; meaning: string }[];
}

export interface SurahDetail extends SurahMeta {
  ayahs: Ayah[];
  bismillahPre?: boolean;
}

export interface Reciter {
  id: string;
  name: string;
  nameEn: string;
  style: string;
  subfolder: string; // EveryAyah subfolder
  bitrate: string;
  avatarUrl?: string;
  isTeacher?: boolean; // Muallim mode for repetition learning
}

export interface PrayerTimeData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface CityLocation {
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
}

export interface TajweedRule {
  id: string;
  category: string;
  title: string;
  description: string;
  letters: string[];
  color: string;
  examples: {
    surahName: string;
    verseNumber: number;
    text: string;
    targetWord: string;
    explanation: string;
  }[];
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumberInSurah: number;
  ayahText: string;
  createdAt: number;
  note?: string;
}

export interface DhikrItem {
  id: string;
  text: string;
  count: number;
  target: number;
  virtue: string;
  category: 'tasbih' | 'sabah' | 'masaa' | 'after_prayer';
  reference?: string;
}
