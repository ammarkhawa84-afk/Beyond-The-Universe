import { SurahMeta, Reciter, TajweedRule, DhikrItem, SurahDetail } from '../types/quran';

export const SURAHS_LIST: SurahMeta[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 3, name: "آل عمران", englishName: "Aal-i-Imraan", englishNameTranslation: "The Family of Imraan", numberOfAyahs: 200, revelationType: "Medinan" },
  { number: 4, name: "النساء", englishName: "An-Nisaa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan" },
  { number: 5, name: "المائدة", englishName: "Al-Maaida", englishNameTranslation: "The Table", numberOfAyahs: 120, revelationType: "Medinan" },
  { number: 6, name: "الأنعام", englishName: "Al-An'aam", englishNameTranslation: "The Cattle", numberOfAyahs: 165, revelationType: "Meccan" },
  { number: 7, name: "الأعراف", englishName: "Al-A'raaf", englishNameTranslation: "The Heights", numberOfAyahs: 206, revelationType: "Meccan" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfaal", englishNameTranslation: "The Spoils of War", numberOfAyahs: 75, revelationType: "Medinan" },
  { number: 9, name: "التوبة", englishName: "At-Tawba", englishNameTranslation: "The Repentance", numberOfAyahs: 129, revelationType: "Medinan" },
  { number: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "Jonah", numberOfAyahs: 109, revelationType: "Meccan" },
  { number: 11, name: "هود", englishName: "Hud", englishNameTranslation: "Hud", numberOfAyahs: 123, revelationType: "Meccan" },
  { number: 12, name: "يوسف", englishName: "Yusuf", englishNameTranslation: "Joseph", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", englishNameTranslation: "The Thunder", numberOfAyahs: 43, revelationType: "Medinan" },
  { number: 14, name: "إبراهيم", englishName: "Ibrahim", englishNameTranslation: "Abraham", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", englishNameTranslation: "The Rocky Tract", numberOfAyahs: 99, revelationType: "Meccan" },
  { number: 16, name: "النحل", englishName: "An-Nahl", englishNameTranslation: "The Bee", numberOfAyahs: 128, revelationType: "Meccan" },
  { number: 17, name: "الإسراء", englishName: "Al-Israa", englishNameTranslation: "The Night Journey", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", numberOfAyahs: 110, revelationType: "Meccan" },
  { number: 19, name: "مريم", englishName: "Maryam", englishNameTranslation: "Mary", numberOfAyahs: 98, revelationType: "Meccan" },
  { number: 20, name: "طه", englishName: "Taha", englishNameTranslation: "Ta-Ha", numberOfAyahs: 135, revelationType: "Meccan" },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbiyaa", englishNameTranslation: "The Prophets", numberOfAyahs: 112, revelationType: "Meccan" },
  { number: 22, name: "الحج", englishName: "Al-Hajj", englishNameTranslation: "The Pilgrimage", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minoon", englishNameTranslation: "The Believers", numberOfAyahs: 118, revelationType: "Meccan" },
  { number: 24, name: "النور", englishName: "An-Noor", englishNameTranslation: "The Light", numberOfAyahs: 64, revelationType: "Medinan" },
  { number: 25, name: "الفرقان", englishName: "Al-Furqaan", englishNameTranslation: "The Criterion", numberOfAyahs: 77, revelationType: "Meccan" },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'araa", englishNameTranslation: "The Poets", numberOfAyahs: 227, revelationType: "Meccan" },
  { number: 27, name: "النمل", englishName: "An-Naml", englishNameTranslation: "The Ant", numberOfAyahs: 93, revelationType: "Meccan" },
  { number: 28, name: "القصص", englishName: "Al-Qasas", englishNameTranslation: "The Stories", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 29, name: "العنكبوت", englishName: "Al-Ankaboot", englishNameTranslation: "The Spider", numberOfAyahs: 69, revelationType: "Meccan" },
  { number: 30, name: "الروم", englishName: "Ar-Room", englishNameTranslation: "The Romans", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 31, name: "لقمان", englishName: "Luqman", englishNameTranslation: "Luqman", numberOfAyahs: 34, revelationType: "Meccan" },
  { number: 32, name: "السجدة", englishName: "As-Sajda", englishNameTranslation: "The Prostration", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzaab", englishNameTranslation: "The Clans", numberOfAyahs: 73, revelationType: "Medinan" },
  { number: 34, name: "سبأ", englishName: "Saba", englishNameTranslation: "Sheba", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 35, name: "فاطر", englishName: "Faatir", englishNameTranslation: "The Originator", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 36, name: "يس", englishName: "Yaseen", englishNameTranslation: "Yasin", numberOfAyahs: 83, revelationType: "Meccan" },
  { number: 37, name: "الصافات", englishName: "As-Saaffaat", englishNameTranslation: "Those who set the Ranks", numberOfAyahs: 182, revelationType: "Meccan" },
  { number: 38, name: "ص", englishName: "Saad", englishNameTranslation: "Sad", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", englishNameTranslation: "The Troops", numberOfAyahs: 75, revelationType: "Meccan" },
  { number: 40, name: "غافر", englishName: "Ghafir", englishNameTranslation: "The Forgiver", numberOfAyahs: 85, revelationType: "Meccan" },
  { number: 41, name: "فصلت", englishName: "Fussilat", englishNameTranslation: "Explained in Detail", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 42, name: "الشورى", englishName: "Ash-Shura", englishNameTranslation: "The Consultation", numberOfAyahs: 53, revelationType: "Meccan" },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", englishNameTranslation: "The Ornaments of Gold", numberOfAyahs: 89, revelationType: "Meccan" },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhaan", englishNameTranslation: "The Smoke", numberOfAyahs: 59, revelationType: "Meccan" },
  { number: 45, name: "الجاثية", englishName: "Al-Jaathiya", englishNameTranslation: "The Crouching", numberOfAyahs: 37, revelationType: "Meccan" },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaaf", englishNameTranslation: "The Wind-Curved Sandhills", numberOfAyahs: 35, revelationType: "Meccan" },
  { number: 47, name: "محمد", englishName: "Muhammad", englishNameTranslation: "Muhammad", numberOfAyahs: 38, revelationType: "Medinan" },
  { number: 48, name: "الفتح", englishName: "Al-Fath", englishNameTranslation: "The Victory", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 49, name: "الحجرات", englishName: "Al-Hujuraat", englishNameTranslation: "The Rooms", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 50, name: "ق", englishName: "Qaaf", englishNameTranslation: "Qaf", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhaariyat", englishNameTranslation: "The Winnowing Winds", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 52, name: "الطور", englishName: "At-Toor", englishNameTranslation: "The Mount", numberOfAyahs: 49, revelationType: "Meccan" },
  { number: 53, name: "النجم", englishName: "An-Najm", englishNameTranslation: "The Star", numberOfAyahs: 62, revelationType: "Meccan" },
  { number: 54, name: "القمر", englishName: "Al-Qamar", englishNameTranslation: "The Moon", numberOfAyahs: 55, revelationType: "Meccan" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahmaan", englishNameTranslation: "The Beneficent", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 56, name: "الواقعة", englishName: "Al-Waaqia", englishNameTranslation: "The Inevitable", numberOfAyahs: 96, revelationType: "Meccan" },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", englishNameTranslation: "The Iron", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 58, name: "المجادلة", englishName: "Al-Mujaadila", englishNameTranslation: "The Pleading Woman", numberOfAyahs: 22, revelationType: "Medinan" },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", englishNameTranslation: "The Exile", numberOfAyahs: 24, revelationType: "Medinan" },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahana", englishNameTranslation: "She that is to be examined", numberOfAyahs: 13, revelationType: "Medinan" },
  { number: 61, name: "الصف", englishName: "As-Saff", englishNameTranslation: "The Ranks", numberOfAyahs: 14, revelationType: "Medinan" },
  { number: 62, name: "الجمعة", englishName: "Al-Jumu'a", englishNameTranslation: "The Congregation", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 63, name: "المنافقون", englishName: "Al-Munaafiqoon", englishNameTranslation: "The Hypocrites", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 64, name: "التغابن", englishName: "At-Taghaabun", englishNameTranslation: "The Mutual Disillusion", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 65, name: "الطلاق", englishName: "At-Talaaq", englishNameTranslation: "The Divorce", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", englishNameTranslation: "The Prohibition", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 68, name: "القلم", englishName: "Al-Qalam", englishNameTranslation: "The Pen", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 69, name: "الحاقة", englishName: "Al-Haaqqa", englishNameTranslation: "The Reality", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 70, name: "المعارج", englishName: "Al-Ma'aarij", englishNameTranslation: "The Ascending Stairways", numberOfAyahs: 44, revelationType: "Meccan" },
  { number: 71, name: "نوح", englishName: "Nooh", englishNameTranslation: "Noah", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 72, name: "الجن", englishName: "Al-Jinn", englishNameTranslation: "The Jinn", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", englishNameTranslation: "The Enshrouded One", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 74, name: "المدثر", englishName: "Al-Muddaththir", englishNameTranslation: "The Cloaked One", numberOfAyahs: 56, revelationType: "Meccan" },
  { number: 75, name: "القيامة", englishName: "Al-Qiyaama", englishNameTranslation: "The Resurrection", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 76, name: "الإنسان", englishName: "Al-Insaan", englishNameTranslation: "Man", numberOfAyahs: 31, revelationType: "Medinan" },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalaat", englishNameTranslation: "The Emissaries", numberOfAyahs: 50, revelationType: "Meccan" },
  { number: 78, name: "النبأ", englishName: "An-Naba", englishNameTranslation: "The Tidings", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 79, name: "النازعات", englishName: "An-Naazi'aat", englishNameTranslation: "Those who drag forth", numberOfAyahs: 46, revelationType: "Meccan" },
  { number: 80, name: "عبس", englishName: "Abasa", englishNameTranslation: "He frowned", numberOfAyahs: 42, revelationType: "Meccan" },
  { number: 81, name: "التكوير", englishName: "At-Takwir", englishNameTranslation: "The Overthrowing", numberOfAyahs: 29, revelationType: "Meccan" },
  { number: 82, name: "الانفطار", englishName: "Al-Infitaar", englishNameTranslation: "The Cleaving", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", englishNameTranslation: "Defrauding", numberOfAyahs: 36, revelationType: "Meccan" },
  { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaaq", englishNameTranslation: "The Splitting Open", numberOfAyahs: 25, revelationType: "Meccan" },
  { number: 85, name: "البروج", englishName: "Al-Burooj", englishNameTranslation: "The Mansions of the Stars", numberOfAyahs: 22, revelationType: "Meccan" },
  { number: 86, name: "الطارق", englishName: "At-Taariq", englishNameTranslation: "The Morning Star", numberOfAyahs: 17, revelationType: "Meccan" },
  { number: 87, name: "الأعلى", englishName: "Al-A'laa", englishNameTranslation: "The Most High", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 88, name: "الغاشية", englishName: "Al-Ghaashiya", englishNameTranslation: "The Overwhelming", numberOfAyahs: 26, revelationType: "Meccan" },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", englishNameTranslation: "The Dawn", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 90, name: "البلد", englishName: "Al-Balad", englishNameTranslation: "The City", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", englishNameTranslation: "The Sun", numberOfAyahs: 15, revelationType: "Meccan" },
  { number: 92, name: "الليل", englishName: "Al-Lail", englishNameTranslation: "The Night", numberOfAyahs: 21, revelationType: "Meccan" },
  { number: 93, name: "الضحى", englishName: "Ad-Dhuhaa", englishNameTranslation: "The Morning Hours", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", englishNameTranslation: "The Relief", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 95, name: "التين", englishName: "At-Tin", englishNameTranslation: "The Fig", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 96, name: "العلق", englishName: "Al-Alaq", englishNameTranslation: "The Clot", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 97, name: "القدر", englishName: "Al-Qadr", englishNameTranslation: "The Power", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 98, name: "البينة", englishName: "Al-Bayyina", englishNameTranslation: "The Clear Proof", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzala", englishNameTranslation: "The Earthquake", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 100, name: "العاديات", englishName: "Al-Aadiyaat", englishNameTranslation: "The Courser", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 101, name: "القارعة", englishName: "Al-Qaari'a", englishNameTranslation: "The Calamity", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 102, name: "التكاثر", englishName: "At-Takaathur", englishNameTranslation: "The Rivalry in World Increase", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 103, name: "العصر", englishName: "Al-Asr", englishNameTranslation: "The Declining Day", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 104, name: "الهمزة", englishName: "Al-Humaza", englishNameTranslation: "The Traducer", numberOfAyahs: 9, revelationType: "Meccan" },
  { number: 105, name: "الفيل", englishName: "Al-Fil", englishNameTranslation: "The Elephant", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 106, name: "قريش", englishName: "Quraish", englishNameTranslation: "Quraysh", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 107, name: "الماعون", englishName: "Al-Maa'oon", englishNameTranslation: "The Small Kindnesses", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", englishNameTranslation: "The Abundance", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 109, name: "الكافرون", englishName: "Al-Kaafiroon", englishNameTranslation: "The Disbelievers", numberOfAyahs: 6, revelationType: "Meccan" },
  { number: 110, name: "النصر", englishName: "An-Nasr", englishNameTranslation: "The Divine Support", numberOfAyahs: 3, revelationType: "Medinan" },
  { number: 111, name: "المسد", englishName: "Al-Masad", englishNameTranslation: "The Palm Fibre", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlaas", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 114, name: "الناس", englishName: "An-Naas", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "Meccan" }
];

export const RECITERS: Reciter[] = [
  {
    id: "alafasy",
    name: "الشيخ مشاري راشد العفاسي",
    nameEn: "Mishary Rashid Alafasy",
    style: "مرتل خاشع عذب",
    subfolder: "Alafasy_128kbps",
    bitrate: "128kbps",
    isTeacher: false
  },
  {
    id: "husary_muallim",
    name: "الشيخ محمود خليل الحصري (المصحف المعلم)",
    nameEn: "Mahmoud Khalil Al-Husary (Teacher)",
    style: "معلم مع ترديد الطلاب للتعلم الدقيق",
    subfolder: "Husary_Muallim_128kbps",
    bitrate: "128kbps",
    isTeacher: true
  },
  {
    id: "minshawi_murattal",
    name: "الشيخ محمد صديق المنشاوي",
    nameEn: "Mohamed Siddiq Al-Minshawi",
    style: "مرتل شجي باكي",
    subfolder: "Minshawy_Murattal_128kbps",
    bitrate: "128kbps",
    isTeacher: false
  },
  {
    id: "abdul_basit",
    name: "الشيخ عبد الباسط عبد الصمد",
    nameEn: "Abdul Basit Abdul Samad",
    style: "مرتل مهيب ندي",
    subfolder: "Abdul_Basit_Murattal_192kbps",
    bitrate: "192kbps",
    isTeacher: false
  },
  {
    id: "maher",
    name: "الشيخ ماهر المعيقلي",
    nameEn: "Maher Al-Muaiqly",
    style: "إمام الحرم المكي الشريف",
    subfolder: "Maher_AlMuaiqly_64kbps",
    bitrate: "64kbps",
    isTeacher: false
  },
  {
    id: "ghamadi",
    name: "الشيخ سعد الغامدي",
    nameEn: "Saad Al-Ghamdi",
    style: "تلاوة هادئة متقنة",
    subfolder: "Ghamadi_40kbps",
    bitrate: "40kbps",
    isTeacher: false
  }
];

// High-fidelity preloaded learning Surahs with verified Tashkeel & Tafsir Al-Muyassar
export const PRELOADED_SURAHS: Record<number, SurahDetail> = {
  1: {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatihah",
    englishNameTranslation: "The Opening",
    numberOfAyahs: 7,
    revelationType: "Meccan",
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        tafsir: "أبدأ قراءتي مستعينًا باسم الله مستحضرًا رحمته التي وسعت كل شيء، وهو الاسم الأعظم للمعبود بحق.",
        words: [
          { arabic: "بِسْمِ", meaning: "أبتدئ باسم" },
          { arabic: "اللَّهِ", meaning: "الإله الحق المعبود وحده" },
          { arabic: "الرَّحْمَٰنِ", meaning: "ذو الرحمة الشاملة لجميع الخلائق" },
          { arabic: "الرَّحِيمِ", meaning: "المنعم بالرحمة الخاصة على المؤمنين" }
        ]
      },
      {
        number: 2,
        numberInSurah: 2,
        text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "[All] praise is [due] to Allah, Lord of the worlds.",
        tafsir: "الثناء التام المطلق بصفات الكمال لله وحده، خالق الخلائق ومالكهم ومدبر أمورهم.",
        words: [
          { arabic: "الْحَمْدُ", meaning: "الثناء بالجميل الاختياري" },
          { arabic: "لِلَّهِ", meaning: "مستحق لله وحده" },
          { arabic: "رَبِّ", meaning: "الخالق المالك المدبر" },
          { arabic: "الْعَالَمِينَ", meaning: "كل ما سوى الله من الإنس والجن والعوالم" }
        ]
      },
      {
        number: 3,
        numberInSurah: 3,
        text: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "The Entirely Merciful, the Especially Merciful.",
        tafsir: "تأكيد لصفة الرحمة الواسعة التي غلبت غضبه سبحانه وتعالى.",
        words: [
          { arabic: "الرَّحْمَٰنِ", meaning: "المتصف بالرحمة الواسعة" },
          { arabic: "الرَّحِيمِ", meaning: "الموصل رحمته إلى خلقه" }
        ]
      },
      {
        number: 4,
        numberInSurah: 4,
        text: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Sovereign of the Day of Recompense.",
        tafsir: "هو المتصرف الأوحد في يوم القيامة والجزاء والحساب، حيث لا ملك لأحد سواه.",
        words: [
          { arabic: "مَالِكِ", meaning: "صاحب الملك والسلطان" },
          { arabic: "يَوْمِ", meaning: "وقت" },
          { arabic: "الدِّينِ", meaning: "الجزاء والحساب" }
        ]
      },
      {
        number: 5,
        numberInSurah: 5,
        text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "It is You we worship and You we ask for help.",
        tafsir: "نخصك وحدك بالعبادة والطاعة والخضوع، ونخصك وحدك بطلب العون والتوفيق في جميع شؤوننا.",
        words: [
          { arabic: "إِيَّاكَ", meaning: "نخصك وحدك" },
          { arabic: "نَعْبُدُ", meaning: "نذل ونطيع" },
          { arabic: "وَإِيَّاكَ", meaning: "ولا نلجأ إلا إليك" },
          { arabic: "نَسْتَعِينُ", meaning: "نطلب المدد والمعونة" }
        ]
      },
      {
        number: 6,
        numberInSurah: 6,
        text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Guide us to the straight path.",
        tafsir: "وفقنا وأرشدنا وثبتنا على الطريق الواضح القويم وهو الإسلام الذي لا اعوجاج فيه.",
        words: [
          { arabic: "اهْدِنَا", meaning: "أرشدنا وثبتنا" },
          { arabic: "الصِّرَاطَ", meaning: "الطريق والمنهج" },
          { arabic: "الْمُسْتَقِيمَ", meaning: "الواضح الذي لا عوج فيه" }
        ]
      },
      {
        number: 7,
        numberInSurah: 7,
        text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
        tafsir: "طريق النبيين والصديقين والشهداء والصالحين، غير طريق من عرف الحق وتركه (المغضوب عليهم)، وغير طريق من جهل الحق وضل عنه (الضالين).",
        words: [
          { arabic: "أَنْعَمْتَ", meaning: "تفضلت بالهداية والإيمان" },
          { arabic: "الْمَغْضُوبِ عَلَيْهِمْ", meaning: "من علموا الحق وعاندوه" },
          { arabic: "الضَّالِّينَ", meaning: "من فقدوا العلم فتاهوا عن الصواب" }
        ]
      }
    ]
  },
  112: {
    number: 112,
    name: "الإخلاص",
    englishName: "Al-Ikhlaas",
    englishNameTranslation: "The Sincerity",
    numberOfAyahs: 4,
    revelationType: "Meccan",
    ayahs: [
      {
        number: 6222,
        numberInSurah: 1,
        text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        translation: "Say, 'He is Allah, [who is] One.'",
        tafsir: "قل أيها النبي لمن سألوك عن ربك: هو الله المتفرد بالوحدانية والألوهية، لا شريك له.",
        words: [
          { arabic: "قُلْ", meaning: "أخبر واجزم" },
          { arabic: "هُوَ اللَّهُ", meaning: "الإله الحق" },
          { arabic: "أَحَدٌ", meaning: "واحد لا يتجزأ ولا شبيه له" }
        ]
      },
      {
        number: 6223,
        numberInSurah: 2,
        text: "اللَّهُ الصَّمَدُ",
        translation: "Allah, the Eternal Refuge.",
        tafsir: "السيد الذي تصمد إليه الخلائق وتقصده في جميع حوائجها ورغائبها لفقرها إليه وغناه عنها.",
        words: [
          { arabic: "الصَّمَدُ", meaning: "المقصود في قضاء الحوائج الكامل في سؤدده" }
        ]
      },
      {
        number: 6224,
        numberInSurah: 3,
        text: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        translation: "He neither begets nor is born.",
        tafsir: "منزه سبحانه عن الولد والوالد والصاحبة، فليس له ولد ولا ولد عن شيء.",
        words: [
          { arabic: "لَمْ يَلِدْ", meaning: "ليس له ولد" },
          { arabic: "وَلَمْ يُولَدْ", meaning: "ليس له والد بل هو الأول بلا بداية" }
        ]
      },
      {
        number: 6225,
        numberInSurah: 4,
        text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        translation: "Nor is there to Him any equivalent.",
        tafsir: "وليس له مكافئ ولا مماثل ولا نظير في أسمائه وصفاته وأفعاله.",
        words: [
          { arabic: "كُفُوًا", meaning: "مكافئًا ومماثلاً وشبيهًا" },
          { arabic: "أَحَدٌ", meaning: "أي مخلوق كان" }
        ]
      }
    ]
  },
  113: {
    number: 113,
    name: "الفلق",
    englishName: "Al-Falaq",
    englishNameTranslation: "The Daybreak",
    numberOfAyahs: 5,
    revelationType: "Meccan",
    ayahs: [
      {
        number: 6226,
        numberInSurah: 1,
        text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        translation: "Say, 'I seek refuge in the Lord of daybreak.'",
        tafsir: "قل ألتجئ وأعتصم برب الصبح الذي ينفلق عنه الظلام.",
        words: [{ arabic: "أَعُوذُ", meaning: "ألتجئ وأتحصن" }, { arabic: "الْفَلَقِ", meaning: "الصبح المنفلق" }]
      },
      {
        number: 6227,
        numberInSurah: 2,
        text: "مِن شَرِّ مَا خَلَقَ",
        translation: "From the evil of that which He created.",
        tafsir: "من شر جميع المخلوقات المؤذية من إنس وجن وحيوان وهوام.",
        words: [{ arabic: "مِن شَرِّ", meaning: "أذى وفساد" }, { arabic: "مَا خَلَقَ", meaning: "جميع مخلوقاته" }]
      },
      {
        number: 6228,
        numberInSurah: 3,
        text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        translation: "And from the evil of darkness when it settles.",
        tafsir: "ومن شر الليل إذا اشتد ظلامه وسرى فيه أهل الشر والأذى.",
        words: [{ arabic: "غَاسِقٍ", meaning: "الليل المظلم" }, { arabic: "وَقَبَ", meaning: "دخل واشتدت ظلمته" }]
      },
      {
        number: 6229,
        numberInSurah: 4,
        text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        translation: "And from the evil of the blowers in knots.",
        tafsir: "ومن شر الساحرات والساحرين الذين ينفثون في العقد لإيقاع السحر والضرر.",
        words: [{ arabic: "النَّفَّاثَاتِ", meaning: "الساحرات النافثات بريق خبيث" }, { arabic: "الْعُقَدِ", meaning: "عقد الخيوط في السحر" }]
      },
      {
        number: 6230,
        numberInSurah: 5,
        text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        translation: "And from the evil of an envier when he envies.",
        tafsir: "ومن شر من يتمنى زوال نعمة الله عن غيره ويسعى في إضراره.",
        words: [{ arabic: "حَاسِدٍ", meaning: "كاره النعمة لغيره" }, { arabic: "إِذَا حَسَدَ", meaning: "إذا أظهر حسده وسعى بأثره" }]
      }
    ]
  },
  114: {
    number: 114,
    name: "الناس",
    englishName: "An-Naas",
    englishNameTranslation: "Mankind",
    numberOfAyahs: 6,
    revelationType: "Meccan",
    ayahs: [
      {
        number: 6231,
        numberInSurah: 1,
        text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        translation: "Say, 'I seek refuge in the Lord of mankind.'",
        tafsir: "قل أعتصم وألتجئ بخالق الناس ومربيهم بالنعم ومدبر أمورهم.",
        words: [{ arabic: "أَعُوذُ", meaning: "أتحصن" }, { arabic: "بِرَبِّ النَّاسِ", meaning: "خالقهم ومدبر شؤونهم" }]
      },
      {
        number: 6232,
        numberInSurah: 2,
        text: "مَلِكِ النَّاسِ",
        translation: "The Sovereign of mankind.",
        tafsir: "المتصرف فيهم بالأمر والنهي، المالك لجميع شؤونهم في الدنيا والآخرة.",
        words: [{ arabic: "مَلِكِ", meaning: "السلطان الحق ذو الأمر والنهي" }]
      },
      {
        number: 6233,
        numberInSurah: 3,
        text: "إِلَٰهِ النَّاسِ",
        translation: "The God of mankind.",
        tafsir: "معبودهم الحق الذي لا معبود سواه ولا يستحق العبادة غيره.",
        words: [{ arabic: "إِلَٰهِ", meaning: "المعبود بحق" }]
      },
      {
        number: 6234,
        numberInSurah: 4,
        text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        translation: "From the evil of the retreating whisperer.",
        tafsir: "من شر الشيطان الذي يلقي الشبهات والشهوات ويخنس ويتوارى إذا ذُكر الله.",
        words: [{ arabic: "الْوَسْوَاسِ", meaning: "الملقي للشر في القلب" }, { arabic: "الْخَنَّاسِ", meaning: "المنقبض والمتراجع عند ذكر الله" }]
      },
      {
        number: 6235,
        numberInSurah: 5,
        text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        translation: "Who whispers into the breasts of mankind.",
        tafsir: "الذي يبث الأفكار السيئة والشكوك في قلوب بني آدم ليصدهم عن طاعة ربهم.",
        words: [{ arabic: "يُوَسْوِسُ", meaning: "يلقي الكلام الخفي المستحسن للشر" }, { arabic: "صُدُورِ", meaning: "قلوب ونفوس" }]
      },
      {
        number: 6236,
        numberInSurah: 6,
        text: "مِنَ الْجِنَّةِ وَالنَّاسِ",
        translation: "From among the jinn and mankind.",
        tafsir: "سواء كان هذا الموسوس من شياطين الجن أو من شياطين الإنس الذين يزينون الباطل.",
        words: [{ arabic: "الْجِنَّةِ", meaning: "عالم الجن الخفي" }, { arabic: "وَالنَّاسِ", meaning: "بني آدم" }]
      }
    ]
  },
  108: {
    number: 108,
    name: "الكوثر",
    englishName: "Al-Kawthar",
    englishNameTranslation: "The Abundance",
    numberOfAyahs: 3,
    revelationType: "Meccan",
    ayahs: [
      {
        number: 6205,
        numberInSurah: 1,
        text: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
        translation: "Indeed, We have granted you, [O Muhammad], al-Kawthar.",
        tafsir: "إنا منحناك أيها النبي الخير العظيم الكثير في الدنيا والآخرة، ومنه نهر الكوثر في الجنة.",
        words: [{ arabic: "أَعْطَيْنَاكَ", meaning: "وهبناك وأكرمناك" }, { arabic: "الْكَوْثَرَ", meaning: "الخير الكثير العظيم ونهر الجنة" }]
      },
      {
        number: 6206,
        numberInSurah: 2,
        text: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
        translation: "So pray to your Lord and sacrifice [to Him alone].",
        tafsir: "فأخلص لربك صلاتك كلها، واذبح ذبيحتك له وحده شكرًا على نعمائه، خلافًا للمشركين.",
        words: [{ arabic: "فَصَلِّ", meaning: "أقم الصلاة خالصة" }, { arabic: "وَانْحَرْ", meaning: "واذبح هديك وأضحيتك لله" }]
      },
      {
        number: 6207,
        numberInSurah: 3,
        text: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
        translation: "Indeed, your enemy is the one cut off.",
        tafsir: "إن مبغضك وكاره ما جئت به هو المنقطع أثره، المقطوع من كل خير في الدنيا والآخرة.",
        words: [{ arabic: "شَانِئَكَ", meaning: "مبغضك وعدوك" }, { arabic: "الْأَبْتَرُ", meaning: "المنقطع ذكره وخيره" }]
      }
    ]
  },
  103: {
    number: 103,
    name: "العصر",
    englishName: "Al-Asr",
    englishNameTranslation: "The Declining Day",
    numberOfAyahs: 3,
    revelationType: "Meccan",
    ayahs: [
      {
        number: 6177,
        numberInSurah: 1,
        text: "وَالْعَصْرِ",
        translation: "By time,",
        tafsir: "أقسم الله تعالى بالدهر والزمان لما فيه من العبر والدلالات على قدرة الخالق وحكمته.",
        words: [{ arabic: "وَالْعَصْرِ", meaning: "الزمان والدهر" }]
      },
      {
        number: 6178,
        numberInSurah: 2,
        text: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
        translation: "Indeed, mankind is in loss,",
        tafsir: "إن كل إنسان في نقصان وهلاك وخسران مبين في تجارته الدنيوية والأخروية.",
        words: [{ arabic: "الْإِنسَانَ", meaning: "جنس بني آدم" }, { arabic: "خُسْرٍ", meaning: "هلاك وضياع" }]
      },
      {
        number: 6179,
        numberInSurah: 3,
        text: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
        translation: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
        tafsir: "إلا من جمع بين الإيمان بالله والعمل الصالح، والتواصي باتباع الحق والثبات عليه بالصبر الجميل.",
        words: [
          { arabic: "آمَنُوا", meaning: "صدقوا بالله ورسوله" },
          { arabic: "الصَّالِحَاتِ", meaning: "الأعمال الواجبة والمستحبة" },
          { arabic: "بِالْحَقِّ", meaning: "بالخير والعدل والقرآن" },
          { arabic: "بِالصَّبْرِ", meaning: "على الطاعة وعن المعصية وعلى الأقدار" }
        ]
      }
    ]
  }
};

export const TAJWEED_RULES: TajweedRule[] = [
  {
    id: "noon_ithhar",
    category: "أحكام النون الساكنة والتنوين",
    title: "الإظهار الحلقي",
    description: "إخراج النون الساكنة أو التنوين من مخرجها بغير غنة ظاهرة إذا جاء بعدها أحد حروف الحلق الستة.",
    letters: ["ء", "هـ", "ع", "ح", "غ", "خ"],
    color: "#059669",
    examples: [
      {
        surahName: "الفاتحة",
        verseNumber: 7,
        text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
        targetWord: "أَنْعَمْتَ",
        explanation: "نون ساكنة بعدها حرف العين (من حروف الحلق)، فحكمها الإظهار الحلقي دون تطويل الغنة."
      },
      {
        surahName: "الفلق",
        verseNumber: 3,
        text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        targetWord: "غَاسِقٍ إِذَا",
        explanation: "تنوين بالكسر بعده همزة قطع، فحكمه الإظهار."
      }
    ]
  },
  {
    id: "noon_idgham",
    category: "أحكام النون الساكنة والتنوين",
    title: "الإدغام (بغنة وبغير غنة)",
    description: "إدخال النون الساكنة أو التنوين في الحرف الذي بعدها بحيث يصيران حرفًا واحدًا مشددًا. حروفه مجموعة في كلمة (يَرْمَلُون). بغنة في (يَنْمُو) وبغير غنة في (اللام والراء).",
    letters: ["ي", "ر", "م", "ل", "و", "ن"],
    color: "#2563eb",
    examples: [
      {
        surahName: "المسد",
        verseNumber: 1,
        text: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
        targetWord: "لَهَبٍ وَتَبَّ",
        explanation: "تنوين بالكسر بعده واو، إدغام بغنة كاملة بمقدار حركتين."
      },
      {
        surahName: "الإخلاص",
        verseNumber: 4,
        text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        targetWord: "يَكُن لَّهُ",
        explanation: "نون ساكنة بعدها لام، إدغام بغير غنة (إدغام كامل)."
      }
    ]
  },
  {
    id: "noon_iqlab",
    category: "أحكام النون الساكنة والتنوين",
    title: "الإقلاب",
    description: "قلب النون الساكنة أو التنوين ميمًا مخفاة بغنة بمقدار حركتين إذا جاء بعدها حرف الباء، ويرسم في المصحف ميم صغيرة قائمة (مـ).",
    letters: ["ب"],
    color: "#d97706",
    examples: [
      {
        surahName: "البقرة",
        verseNumber: 33,
        text: "قَالَ يَا آدَمُ أَنبِئْهُم بِأَسْمَائِهِمْ",
        targetWord: "أَنبِئْهُم",
        explanation: "نون ساكنة بعدها باء، قلبت النون ميمًا مخفاة مع بقاء الغنة."
      },
      {
        surahName: "البلد",
        verseNumber: 2,
        text: "وَأَنتَ حِلٌّ بِهَٰذَا الْبَلَدِ",
        targetWord: "حِلٌّ بِهَٰذَا",
        explanation: "تنوين بعده باء، ينطق ميمًا مع غنة خفيفة."
      }
    ]
  },
  {
    id: "noon_ikhfa",
    category: "أحكام النون الساكنة والتنوين",
    title: "الإخفاء الحقيقي",
    description: "النطق بالنون الساكنة أو التنوين بصفة بين الإظهار والإدغام عارٍ عن التشديد مع بقاء الغنة بمقدار حركتين، عند 15 حرفًا مجموعة في أوائل كلمات: (صِفْ ذَا ثَنَا كَمْ جَادَ شَخْصٌ قَدْ سَمَا دُمْ طَيِّبًا زِدْ فِي تُقًى ضَعْ ظَالِمًا).",
    letters: ["ص", "ذ", "ث", "ك", "ج", "ش", "ق", "س", "د", "ط", "ز", "ف", "ت", "ض", "ظ"],
    color: "#7c3aed",
    examples: [
      {
        surahName: "الفلق",
        verseNumber: 2,
        text: "مِن شَرِّ مَا خَلَقَ",
        targetWord: "مِن شَرِّ",
        explanation: "نون ساكنة بعدها شين، تخفى النون وتغن بمقدار حركتين مع ترقيق الغنة."
      },
      {
        surahName: "القدر",
        verseNumber: 1,
        text: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ",
        targetWord: "أَنزَلْنَاهُ",
        explanation: "نون ساكنة بعدها زاي، إخفاء حقيقي."
      }
    ]
  },
  {
    id: "qalqalah",
    category: "صفات الحروف ومخارجها",
    title: "القلقلة ومراتبها",
    description: "اضطراب المخرج عند النطق بالحرف الساكن حتى يسمع له نبرة قوية. حروفها خمسة مجموعة في: (قُطْبُ جَدٍّ). مراتبها: صغرى (في وسط الكلمة)، كبرى (عند الوقف على الحرف الساكن مخففًا)، وأكبر (عند الوقف على مشدد).",
    letters: ["ق", "ط", "ب", "ج", "د"],
    color: "#dc2626",
    examples: [
      {
        surahName: "الفلق",
        verseNumber: 1,
        text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        targetWord: "الْفَلَقِ",
        explanation: "القاف عند الوقف تصبح ساكنة، فتقلقل قلقلة كبرى واضحة."
      },
      {
        surahName: "المسد",
        verseNumber: 1,
        text: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
        targetWord: "وَتَبَّ",
        explanation: "الباء مشددة وموقوف عليها، وهي أعلى مراتب القلقلة (قلقلة مشددة)."
      }
    ]
  },
  {
    id: "madd",
    category: "أحكام المدود",
    title: "المدود (المتصل، المنفصل، اللازم)",
    description: "إطالة الصوت بحرف من حروف المد الثلاثة (الألف الساكنة المفتوح ما قبلها، الواو الساكنة المضموم ما قبلها، الياء الساكنة المكسور ما قبلها). يمد المتصل 4-5 حركات وجوبًا، والمنفصل 4-5 حركات جوازًا، واللازم 6 حركات لزومًا.",
    letters: ["ا", "و", "ي"],
    color: "#0891b2",
    examples: [
      {
        surahName: "النصر",
        verseNumber: 1,
        text: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
        targetWord: "جَاءَ",
        explanation: "مد متصل، حرف المد والهمزة في كلمة واحدة، يمد 4 أو 5 حركات وجوبًا."
      },
      {
        surahName: "الكوثر",
        verseNumber: 1,
        text: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
        targetWord: "إِنَّا أَعْطَيْنَاكَ",
        explanation: "مد منفصل، حرف المد في آخر الكلمة والهمزة في أول الكلمة التالية، يمد 4 حركات جوازًا."
      }
    ]
  }
];

export const DAILY_ADHKAR: DhikrItem[] = [
  {
    id: "sabah_1",
    category: "sabah",
    text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
    count: 0,
    target: 1,
    virtue: "من قالها حين يصبح وحين يمسي حماه الله وأعطاه من خيري الدنيا والآخرة.",
    reference: "صحيح مسلم"
  },
  {
    id: "sabah_2",
    category: "sabah",
    text: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.",
    count: 0,
    target: 1,
    virtue: "سيد الاستغفار: من قالها موقنًا بها حين يمسي فمات من ليلته دخل الجنة، وكذلك إذا أصبح.",
    reference: "صحيح البخاري"
  },
  {
    id: "sabah_3",
    category: "sabah",
    text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.",
    count: 0,
    target: 3,
    virtue: "من قالها ثلاثًا إذا أصبح وثلاثًا إذا أمسى لم يضره شيء.",
    reference: "سنن أبي داود والترمذي"
  },
  {
    id: "sabah_4",
    category: "sabah",
    text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيًّا.",
    count: 0,
    target: 3,
    virtue: "كان حقًا على الله أن يرضيه يوم القيامة.",
    reference: "مسند أحمد والترمذي"
  },
  {
    id: "masaa_1",
    category: "masaa",
    text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
    count: 0,
    target: 1,
    virtue: "تحصين للنفس في المساء واستشعار لعظمة الله وتوحيده.",
    reference: "صحيح مسلم"
  },
  {
    id: "masaa_2",
    category: "masaa",
    text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.",
    count: 0,
    target: 3,
    virtue: "من قالها ثلاث مرات حين يمسي لم تضره حُمَة تلك الليلة ولا دابة.",
    reference: "صحيح مسلم"
  },
  {
    id: "tasbih_1",
    category: "tasbih",
    text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    count: 0,
    target: 100,
    virtue: "حُطَّتْ خطاياه وإن كانت مثل زبد البحر، ولم يأتِ أحد يوم القيامة بأفضل مما جاء به إلا أحد قال مثل ما قال أو زاد.",
    reference: "متفق عليه"
  },
  {
    id: "tasbih_2",
    category: "tasbih",
    text: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلاَ إِلَهَ إِلاَّ اللَّهُ، وَاللَّهُ أَكْبَرُ",
    count: 0,
    target: 33,
    virtue: "أحب الكلام إلى الله تعالى، والباقيات الصالحات.",
    reference: "صحيح مسلم"
  },
  {
    id: "tasbih_3",
    category: "tasbih",
    text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    count: 0,
    target: 100,
    virtue: "كان النبي ﷺ يستغفر الله في اليوم أكثر من سبعين مرة وفي رواية مائة مرة.",
    reference: "صحيح البخاري ومسلم"
  },
  {
    id: "tasbih_4",
    category: "tasbih",
    text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    count: 0,
    target: 10,
    virtue: "من صلى عليّ صلاة صلى الله عليه بها عشرًا، وحُطت عنه عشر خطيئات، ورفعت له عشر درجات.",
    reference: "صحيح مسلم"
  }
];
