import React, { useState, useEffect } from 'react';
import { Compass as CompassIcon, MapPin, Navigation, Info, RotateCw } from 'lucide-react';
import { CityLocation } from '../types/quran';
import { calculateQibla } from '../services/prayerService';

interface QiblaCompassProps {
  currentCity: CityLocation;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({ currentCity }) => {
  const [heading, setHeading] = useState<number>(0);
  const [deviceSensorSupported, setDeviceSensorSupported] = useState<boolean>(false);
  
  const qiblaAngle = Math.round(calculateQibla(currentCity.lat, currentCity.lng));

  // Calculate distance in km to Makkah (21.4225, 39.8262) using Haversine formula
  const getDistanceToMakkah = (lat: number, lng: number): number => {
    const R = 6371; // Earth radius in km
    const dLat = ((21.4225 - lat) * Math.PI) / 180;
    const dLng = ((39.8262 - lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((21.4225 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const distanceKm = getDistanceToMakkah(currentCity.lat, currentCity.lng);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading for iOS, alpha for Android
      let compassHeading: number | null = null;
      if ('webkitCompassHeading' in e && typeof (e as any).webkitCompassHeading === 'number') {
        compassHeading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        compassHeading = 360 - e.alpha;
      }

      if (compassHeading !== null) {
        setDeviceSensorSupported(true);
        setHeading(Math.round(compassHeading));
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Relative rotation towards Qibla
  const relativeQibla = (qiblaAngle - heading + 360) % 360;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-amiri text-stone-900 dark:text-stone-50">
          تَحْدِيدُ اتِّجَاهِ القِبْلَةِ الشَّرِيفَةِ
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-lg mx-auto">
          بوصلة إلكترونية ذكية لتحديد اتجاه الكعبة المشرفة في مكة المكرمة بدقة استنادًا لإحداثيات موقعك الحالي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Interactive Compass */}
        <div className="md:col-span-7 flex flex-col items-center">
          
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl flex items-center justify-center p-4">
            
            {/* North Indicator */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              <span className="text-xs font-bold font-mono text-red-500">N (الشمال)</span>
              <div className="w-1.5 h-3 bg-red-500 rounded-b"></div>
            </div>

            {/* East, South, West markers */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">E</span>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-bold text-stone-400">S</span>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">W</span>

            {/* Rotating Needle towards Qibla */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out pointer-events-none"
              style={{ transform: `rotate(${relativeQibla}deg)` }}
            >
              {/* Needle pointing to Kaaba */}
              <div className="flex flex-col items-center h-full justify-between py-6">
                
                {/* Kaaba pointer tip */}
                <div className="flex flex-col items-center -translate-y-1">
                  <div className="w-7 h-7 rounded-lg bg-emerald-700 text-amber-300 flex items-center justify-center shadow-lg border border-amber-300/40">
                    <span className="text-[10px] font-bold">الكعبة</span>
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-emerald-700"></div>
                </div>

                {/* Center Hub */}
                <div className="w-5 h-5 rounded-full bg-emerald-600 border-2 border-white dark:border-stone-900 shadow-md"></div>

                {/* Opposite tail */}
                <div className="w-1.5 h-10 bg-stone-300 dark:bg-stone-700 rounded-full"></div>
              </div>
            </div>

            {/* Center Angle Display */}
            <div className="flex flex-col items-center text-center z-20 bg-stone-50/90 dark:bg-stone-850/90 p-3 rounded-2xl border border-stone-200 dark:border-stone-700 backdrop-blur-xs">
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">زاوية القبلة</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                {qiblaAngle}°
              </span>
              <span className="text-[10px] text-stone-400">من اتجاه الشمال</span>
            </div>

          </div>

          {/* Compass status badge */}
          <div className="mt-4 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <CompassIcon className="w-4 h-4 text-emerald-600" />
            <span>
              {deviceSensorSupported 
                ? "مستشعر البوصلة نشط ويعمل بالاتجاه الحي للجهاز" 
                : "تظهر الزاوية المحسوبة فلكيًا بالنسبة للشمال الحقيقي"}
            </span>
          </div>

        </div>

        {/* Right Side: Kaaba Spotlight & Coordinates info */}
        <div className="md:col-span-5 flex flex-col gap-4">
          
          {/* Kaaba Photo Card */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm aspect-square max-w-xs mx-auto md:max-w-none w-full">
            <img 
              src="/src/assets/images/qibla_kaaba_dawn_1793963450309.jpg" 
              alt="الكعبة المشرفة في مكة المكرمة" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 right-3 left-3 text-white text-xs">
              <span className="font-bold text-amber-300 block">المسجد الحرام - مكة المكرمة</span>
              <span className="text-stone-300">قبلة المسلمين في مشارق الأرض ومغاربها</span>
            </div>
          </div>

          {/* Distance and Location Details */}
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs border-b border-stone-100 dark:border-stone-800 pb-2">
              <span className="text-stone-500 dark:text-stone-400">موقعك الحالي:</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">
                {currentCity.name} ({currentCity.country})
              </span>
            </div>

            <div className="flex items-center justify-between text-xs border-b border-stone-100 dark:border-stone-800 pb-2">
              <span className="text-stone-500 dark:text-stone-400">المسافة إلى الكعبة:</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {distanceKm.toLocaleString('ar-SA')} كم تقريبًا
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500 dark:text-stone-400">درجة الانحراف:</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                {qiblaAngle}° شمال شرق/غرب
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-stone-900 rounded-xl border border-amber-200 dark:border-amber-950 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <p>
              لتحديد دقيق: امسك الهاتف بشكل أفقي مستوٍ بعيدًا عن الأجهزة الإلكترونية والمعادن، وحرك الهاتف على شكل رقم 8 لمعايرة البوصلة.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
