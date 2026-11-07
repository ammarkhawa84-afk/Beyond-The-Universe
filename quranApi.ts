import { SurahDetail, Ayah } from '../types/quran';
import { PRELOADED_SURAHS, SURAHS_LIST } from '../data/quranData';

export function getAyahAudioUrl(reciterSubfolder: string, surahNumber: number, ayahNumberInSurah: number): string {
  const surahPadded = surahNumber.toString().padStart(3, '0');
  const ayahPadded = ayahNumberInSurah.toString().padStart(3, '0');
  return `https://everyayah.com/data/${reciterSubfolder}/${surahPadded}${ayahPadded}.mp3`;
}

// In-memory cache for fetched Surahs
const surahCache = new Map<number, SurahDetail>();

export async function fetchSurahDetail(surahNumber: number): Promise<SurahDetail> {
  // Check memory cache
  if (surahCache.has(surahNumber)) {
    return surahCache.get(surahNumber)!;
  }

  // Check preloaded first for instant zero-latency load
  if (PRELOADED_SURAHS[surahNumber]) {
    surahCache.set(surahNumber, PRELOADED_SURAHS[surahNumber]);
    return PRELOADED_SURAHS[surahNumber];
  }

  const meta = SURAHS_LIST.find(s => s.number === surahNumber);
  if (!meta) {
    throw new Error(`Surah #${surahNumber} not found.`);
  }

  try {
    // Fetch Arabic Uthmani text, Tafsir Muyassar, and English translation simultaneously
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ar.muyassar,en.sahih`);
    if (!res.ok) {
      throw new Error(`Failed to fetch from Quran API: ${res.statusText}`);
    }

    const data = await res.json();
    if (data.code === 200 && Array.isArray(data.data) && data.data.length >= 3) {
      const uthmaniData = data.data[0];
      const tafsirData = data.data[1];
      const englishData = data.data[2];

      const ayahs: Ayah[] = uthmaniData.ayahs.map((item: any, idx: number) => {
        let text = item.text;
        // Strip out Bismillah if it's prepended in Surah 2+ Ayah 1 (except At-Tawbah)
        if (surahNumber !== 1 && surahNumber !== 9 && idx === 0) {
          text = text.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '')
                     .replace(/^بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\s*/, '');
        }

        return {
          number: item.number,
          numberInSurah: item.numberInSurah,
          text: text,
          tafsir: tafsirData.ayahs[idx]?.text || '',
          translation: englishData.ayahs[idx]?.text || '',
          juz: item.juz,
          page: item.page
        };
      });

      const detail: SurahDetail = {
        ...meta,
        ayahs,
        bismillahPre: surahNumber !== 1 && surahNumber !== 9
      };

      surahCache.set(surahNumber, detail);
      return detail;
    }
  } catch (err) {
    console.warn(`Could not fetch full Surah ${surahNumber} from online API, generating fallback view`, err);
  }

  // Graceful fallback for any network limitation: generate placeholder structure
  const fallbackAyahs: Ayah[] = Array.from({ length: meta.numberOfAyahs }).map((_, idx) => ({
    number: (surahNumber - 1) * 50 + (idx + 1),
    numberInSurah: idx + 1,
    text: `آية ${idx + 1} من سورة ${meta.name}`,
    translation: `Verse ${idx + 1} of Surah ${meta.englishName}.`
  }));

  const fallbackDetail: SurahDetail = {
    ...meta,
    ayahs: fallbackAyahs,
    bismillahPre: surahNumber !== 1 && surahNumber !== 9
  };

  surahCache.set(surahNumber, fallbackDetail);
  return fallbackDetail;
}
