import { CityLocation, PrayerTimeData } from '../types/quran';

export const MAJOR_CITIES: CityLocation[] = [
  { name: "مكة المكرمة", country: "السعودية", lat: 21.4225, lng: 39.8262, timezone: "Asia/Riyadh" },
  { name: "المدينة المنورة", country: "السعودية", lat: 24.5247, lng: 39.5692, timezone: "Asia/Riyadh" },
  { name: "القدس الشريف", country: "فلسطين", lat: 31.7683, lng: 35.2137, timezone: "Asia/Jerusalem" },
  { name: "القاهرة", country: "مصر", lat: 30.0444, lng: 31.2357, timezone: "Africa/Cairo" },
  { name: "الرياض", country: "السعودية", lat: 24.7136, lng: 46.6753, timezone: "Asia/Riyadh" },
  { name: "جدة", country: "السعودية", lat: 21.4858, lng: 39.1925, timezone: "Asia/Riyadh" },
  { name: "دبي", country: "الإمارات", lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai" },
  { name: "أبوظبي", country: "الإمارات", lat: 24.4539, lng: 54.3773, timezone: "Asia/Dubai" },
  { name: "إسطنبول", country: "تركيا", lat: 41.0082, lng: 28.9784, timezone: "Europe/Istanbul" },
  { name: "عَمّان", country: "الأردن", lat: 31.9454, lng: 35.9284, timezone: "Asia/Amman" },
  { name: "بغداد", country: "العراق", lat: 33.3152, lng: 44.3661, timezone: "Asia/Baghdad" },
  { name: "دمشق", country: "سوريا", lat: 33.5138, lng: 36.2765, timezone: "Asia/Damascus" },
  { name: "بيروت", country: "لبنان", lat: 33.8938, lng: 35.5018, timezone: "Asia/Beirut" },
  { name: "الدوحة", country: "قطر", lat: 25.2854, lng: 51.5310, timezone: "Asia/Qatar" },
  { name: "الكويت", country: "الكويت", lat: 29.3759, lng: 47.9774, timezone: "Asia/Kuwait" },
  { name: "المنامة", country: "البحرين", lat: 26.2285, lng: 50.5860, timezone: "Asia/Bahrain" },
  { name: "مسقط", country: "عُمان", lat: 23.5859, lng: 58.4059, timezone: "Asia/Muscat" },
  { name: "تونس", country: "تونس", lat: 36.8065, lng: 10.1815, timezone: "Africa/Tunis" },
  { name: "الجزائر", country: "الجزائر", lat: 36.7538, lng: 3.0588, timezone: "Africa/Algiers" },
  { name: "الرباط", country: "المغرب", lat: 34.0209, lng: -6.8416, timezone: "Africa/Casablanca" },
  { name: "الدار البيضاء", country: "المغرب", lat: 33.5731, lng: -7.5898, timezone: "Africa/Casablanca" },
  { name: "الخرطوم", country: "السودان", lat: 15.5007, lng: 32.5599, timezone: "Africa/Khartoum" },
  { name: "كوالالمبور", country: "ماليزيا", lat: 3.1390, lng: 101.6869, timezone: "Asia/Kuala_Lumpur" },
  { name: "جاكرتا", country: "إندونيسيا", lat: -6.2088, lng: 106.8456, timezone: "Asia/Jakarta" },
  { name: "لندن", country: "المملكة المتحدة", lat: 51.5074, lng: -0.1278, timezone: "Europe/London" },
  { name: "باريس", country: "فرنسا", lat: 48.8566, lng: 2.3522, timezone: "Europe/Paris" },
  { name: "برلين", country: "ألمانيا", lat: 52.5200, lng: 13.4050, timezone: "Europe/Berlin" },
  { name: "نيويورك", country: "الولايات المتحدة", lat: 40.7128, lng: -74.0060, timezone: "America/New_York" }
];

export interface AthanAudio {
  id: string;
  name: string;
  muadhin: string;
  url: string;
}

export const ATHAN_AUDIOS: AthanAudio[] = [
  {
    id: "makkah",
    name: "أذان المسجد الحرام",
    muadhin: "مكة المكرمة",
    url: "https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/adhan/makkah-adhan.mp3"
  },
  {
    id: "madinah",
    name: "أذان المسجد النبوي",
    muadhin: "المدينة المنورة",
    url: "https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/adhan/madinah-adhan.mp3"
  },
  {
    id: "abdulbasit",
    name: "أذان الشيخ عبد الباسط",
    muadhin: "الشيخ عبد الباسط عبد الصمد",
    url: "https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/adhan/abdul-basit-adhan.mp3"
  },
  {
    id: "alaqsa",
    name: "أذان المسجد الأقصى",
    muadhin: "القدس الشريف",
    url: "https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/adhan/al-aqsa-adhan.mp3"
  }
];

// Robust prayer calculation engine implementing astronomical algorithms
export function calculatePrayerTimes(
  date: Date,
  latitude: number,
  longitude: number
): PrayerTimeData {
  const d = new Date(date);
  const timezoneOffsetHours = -d.getTimezoneOffset() / 60;

  // Day of year
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Sun declination & equation of time
  const b = (2 * Math.PI * (dayOfYear - 81)) / 365;
  const eqtime = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b); // minutes
  const declination = 23.45 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365); // degrees

  const latRad = (latitude * Math.PI) / 180;
  const decRad = (declination * Math.PI) / 180;

  // Solar noon in hours
  const solarNoon = 12 + (timezoneOffsetHours * 15 - longitude) / 15 - eqtime / 60;

  // Helper for angle calculation
  const getHourAngle = (angle: number): number => {
    const angleRad = (angle * Math.PI) / 180;
    const cosHA = (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
    if (cosHA > 1) return 0;
    if (cosHA < -1) return Math.PI;
    return Math.acos(cosHA);
  };

  // Sun angle for twilight & sunrise
  // Fajr: -18.5 deg (Umm Al Qura standard)
  const fajrHA = (getHourAngle(-18.5) * 180) / Math.PI / 15;
  // Sunrise: -0.833 deg
  const sunriseHA = (getHourAngle(-0.833) * 180) / Math.PI / 15;
  // Maghrib: sunset -0.833 deg
  const sunsetHA = sunriseHA;
  // Isha: -17.5 deg
  const ishaHA = (getHourAngle(-17.5) * 180) / Math.PI / 15;

  // Asr (Shafi'i/Standard: shadow length = object + noon shadow)
  const noonAltitude = 90 - latitude + declination;
  const noonAltitudeRad = (noonAltitude * Math.PI) / 180;
  const noonShadow = 1 / Math.tan(noonAltitudeRad);
  const asrAltitudeRad = Math.atan(1 / (1 + noonShadow));
  const asrAngle = (asrAltitudeRad * 180) / Math.PI;
  const asrHA = (getHourAngle(asrAngle) * 180) / Math.PI / 15;

  const toTimeString = (decimalHours: number): string => {
    let normalized = decimalHours;
    while (normalized < 0) normalized += 24;
    while (normalized >= 24) normalized -= 24;
    const hours = Math.floor(normalized);
    const minutes = Math.floor((normalized - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const fajrTime = solarNoon - fajrHA;
  const sunriseTime = solarNoon - sunriseHA;
  const dhuhrTime = solarNoon + 2 / 60; // 2 minutes after zenith
  const asrTime = solarNoon + asrHA;
  const maghribTime = solarNoon + sunsetHA;
  const ishaTime = solarNoon + ishaHA;
  const imsakTime = fajrTime - 15 / 60; // 15 mins before Fajr
  const midnightTime = (maghribTime + (fajrTime + 24)) / 2;

  return {
    Fajr: toTimeString(fajrTime),
    Sunrise: toTimeString(sunriseTime),
    Dhuhr: toTimeString(dhuhrTime),
    Asr: toTimeString(asrTime),
    Maghrib: toTimeString(maghribTime),
    Isha: toTimeString(ishaTime),
    Imsak: toTimeString(imsakTime),
    Midnight: toTimeString(midnightTime)
  };
}

// Calculate Qibla angle from user coordinates
export function calculateQibla(latitude: number, longitude: number): number {
  const makkahLat = 21.4225 * (Math.PI / 180);
  const makkahLng = 39.8262 * (Math.PI / 180);
  const userLat = latitude * (Math.PI / 180);
  const userLng = longitude * (Math.PI / 180);

  const deltaLng = makkahLng - userLng;
  const y = Math.sin(deltaLng);
  const x = Math.cos(userLat) * Math.tan(makkahLat) - Math.sin(userLat) * Math.cos(deltaLng);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = (qiblaRad * 180) / Math.PI;
  return (qiblaDeg + 360) % 360;
}

// Get next prayer and remaining seconds
export interface NextPrayerInfo {
  nextPrayerKey: keyof PrayerTimeData;
  nextPrayerArabicName: string;
  nextPrayerTimeStr: string;
  remainingSeconds: number;
  remainingFormatted: string;
  passedPercent: number;
}

const PRAYER_ORDER: { key: keyof PrayerTimeData; nameAr: string }[] = [
  { key: "Fajr", nameAr: "الفجر" },
  { key: "Sunrise", nameAr: "الشروق" },
  { key: "Dhuhr", nameAr: "الظهر" },
  { key: "Asr", nameAr: "العصر" },
  { key: "Maghrib", nameAr: "المغرب" },
  { key: "Isha", nameAr: "العشاء" }
];

export function getNextPrayer(times: PrayerTimeData, now: Date = new Date()): NextPrayerInfo {
  const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  for (let i = 0; i < PRAYER_ORDER.length; i++) {
    const p = PRAYER_ORDER[i];
    const pMinutes = toMinutes(times[p.key]);

    if (pMinutes > currentMinutes) {
      const prevPMinutes = i > 0 ? toMinutes(times[PRAYER_ORDER[i - 1].key]) : toMinutes(times.Isha) - 24 * 60;
      const totalInterval = pMinutes - prevPMinutes;
      const elapsed = currentMinutes - prevPMinutes;
      const passedPercent = Math.min(100, Math.max(0, (elapsed / (totalInterval || 1)) * 100));

      const diffMinutes = pMinutes - currentMinutes;
      const totalSec = Math.round(diffMinutes * 60);
      const hours = Math.floor(totalSec / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;

      const remainingFormatted = `${hours > 0 ? `${hours} س ` : ''}${mins} د ${secs} ث`;

      return {
        nextPrayerKey: p.key,
        nextPrayerArabicName: p.nameAr,
        nextPrayerTimeStr: times[p.key],
        remainingSeconds: totalSec,
        remainingFormatted,
        passedPercent
      };
    }
  }

  // After Isha, next is Fajr tomorrow
  const fajrMinutes = toMinutes(times.Fajr) + 24 * 60;
  const ishaMinutes = toMinutes(times.Isha);
  const totalInterval = fajrMinutes - ishaMinutes;
  const elapsed = currentMinutes - ishaMinutes;
  const passedPercent = Math.min(100, Math.max(0, (elapsed / (totalInterval || 1)) * 100));

  const diffMinutes = fajrMinutes - currentMinutes;
  const totalSec = Math.round(diffMinutes * 60);
  const hours = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  return {
    nextPrayerKey: "Fajr",
    nextPrayerArabicName: "الفجر (غدًا)",
    nextPrayerTimeStr: times.Fajr,
    remainingSeconds: totalSec,
    remainingFormatted: `${hours > 0 ? `${hours} س ` : ''}${mins} د ${secs} ث`,
    passedPercent
  };
}

// Convert date to Hijri format approximation
export function getHijriDate(date: Date = new Date()): { day: number; monthName: string; year: number } {
  // Use Intl.DateTimeFormat with islamic-umalqura calendar
  try {
    const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    const day = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);
    const monthName = parts.find(p => p.type === 'month')?.value || 'شعبان';
    const year = parseInt(parts.find(p => p.type === 'year')?.value || '1448', 10);
    return { day, monthName, year };
  } catch {
    return { day: 18, monthName: "شعبان", year: 1448 };
  }
}
