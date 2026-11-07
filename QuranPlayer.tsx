import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Volume2, 
  VolumeX, 
  User, 
  Sparkles, 
  Mic, 
  RotateCcw 
} from 'lucide-react';
import { Ayah, Reciter, SurahDetail } from '../types/quran';
import { RECITERS } from '../data/quranData';
import { getAyahAudioUrl } from '../services/quranApi';

interface QuranPlayerProps {
  currentSurah: SurahDetail | null;
  currentAyah: Ayah | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  selectedReciter: Reciter;
  onSelectReciter: (r: Reciter) => void;
  repeatMode: number; // 1, 3, 5, 10, 999 (infinity)
  onSetRepeatMode: (mode: number) => void;
  playbackSpeed: number; // 0.75, 1.0, 1.25
  onSetPlaybackSpeed: (speed: number) => void;
  onOpenVoiceRecorder: (ayah: Ayah) => void;
}

export const QuranPlayer: React.FC<QuranPlayerProps> = ({
  currentSurah,
  currentAyah,
  isPlaying,
  onPlayPause,
  onNextAyah,
  onPrevAyah,
  selectedReciter,
  onSelectReciter,
  repeatMode,
  onSetRepeatMode,
  playbackSpeed,
  onSetPlaybackSpeed,
  onOpenVoiceRecorder
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentRepeatLeft, setCurrentRepeatLeft] = useState<number>(repeatMode);
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");
  const [durationStr, setDurationStr] = useState("00:00");
  const [isMuted, setIsMuted] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [showRecitersModal, setShowRecitersModal] = useState(false);

  // Sync repeat count when mode changes or ayah changes
  useEffect(() => {
    setCurrentRepeatLeft(repeatMode);
  }, [currentAyah?.numberInSurah, currentSurah?.number, repeatMode]);

  // Handle audio src change
  useEffect(() => {
    if (!currentSurah || !currentAyah) return;
    const url = getAyahAudioUrl(selectedReciter.subfolder, currentSurah.number, currentAyah.numberInSurah);
    
    if (audioRef.current) {
      setIsLoadingAudio(true);
      audioRef.current.src = url;
      audioRef.current.playbackRate = playbackSpeed;
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn("Audio playback interrupted or failed:", e);
        });
      }
    }
  }, [currentSurah?.number, currentAyah?.numberInSurah, selectedReciter.id]);

  // Handle play / pause toggle
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.warn(e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle playback speed changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleAudioEnded = () => {
    if (repeatMode === 999) {
      // Infinite repeat
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    if (currentRepeatLeft > 1) {
      // Repeat the same ayah again
      setCurrentRepeatLeft(prev => prev - 1);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      // Finished all repeats for this Ayah, move to next!
      setCurrentRepeatLeft(repeatMode);
      onNextAyah();
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    if (dur > 0) {
      setAudioProgress((cur / dur) * 100);
    }
    const formatTime = (time: number) => {
      const m = Math.floor(time / 60);
      const s = Math.floor(time % 60);
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };
    setCurrentTimeStr(formatTime(cur));
    setDurationStr(formatTime(dur));
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!currentSurah || !currentAyah) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-xl transition-all">
        {/* Progress Bar Top Edge */}
        <div 
          className="w-full h-1 bg-stone-100 dark:bg-stone-800 cursor-pointer overflow-hidden"
          onClick={(e) => {
            if (!audioRef.current || !audioRef.current.duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            // RTL calculation
            const clickPos = rect.right - e.clientX;
            const percentage = clickPos / rect.width;
            audioRef.current.currentTime = percentage * audioRef.current.duration;
          }}
        >
          <div 
            className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-150"
            style={{ width: `${audioProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Section 1: Active Ayah Info */}
          <div className="flex items-center gap-3 min-w-[200px] flex-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex flex-col items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-sans leading-none">آية</span>
              <span className="text-xs font-bold font-mono">{currentAyah.numberInSurah}</span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-50 truncate">
                  سورة {currentSurah.name}
                </span>
                {repeatMode > 1 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    {repeatMode === 999 ? "تكرار مستمر" : `تكرار: متبقي ${currentRepeatLeft}`}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate max-w-xs font-quran">
                {currentAyah.text}
              </p>
            </div>
          </div>

          {/* Section 2: Core Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-3 order-3 sm:order-2">
            
            {/* Prev Ayah Button (In RTL, prev is right arrow) */}
            <button
              onClick={onPrevAyah}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="الآية السابقة"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Play/Pause Main Button */}
            <button
              onClick={onPlayPause}
              disabled={isLoadingAudio && !isPlaying}
              className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95"
              title={isPlaying ? "إيقاف مؤقت" : "تشغيل التلاوة"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white mr-0.5" />
              )}
            </button>

            {/* Next Ayah Button */}
            <button
              onClick={onNextAyah}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="الآية التالية"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Repeat count button */}
            <div className="flex items-center gap-1 border-r border-stone-200 dark:border-stone-800 pr-2">
              <button
                onClick={() => {
                  const nextRepeat = repeatMode === 1 ? 3 : repeatMode === 3 ? 5 : repeatMode === 5 ? 10 : repeatMode === 10 ? 999 : 1;
                  onSetRepeatMode(nextRepeat);
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  repeatMode > 1
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
                title="تكرار الآية للحفظ"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>{repeatMode === 999 ? "∞" : `${repeatMode}x`}</span>
              </button>
            </div>

            {/* Speed toggle */}
            <button
              onClick={() => {
                const nextSpeed = playbackSpeed === 1.0 ? 0.75 : playbackSpeed === 0.75 ? 1.25 : 1.0;
                onSetPlaybackSpeed(nextSpeed);
              }}
              className="px-2 py-1 text-xs font-mono font-semibold rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              title="سرعة التلاوة"
            >
              {playbackSpeed}x
            </button>
          </div>

          {/* Section 3: Reciter & Practice Tools */}
          <div className="flex items-center gap-2 order-2 sm:order-3">
            
            {/* Reciter Selector Button */}
            <button
              onClick={() => setShowRecitersModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors"
              title="تغيير القارئ"
            >
              <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="truncate max-w-[120px] sm:max-w-[150px]">{selectedReciter.name}</span>
              {selectedReciter.isTeacher && (
                <span className="text-[9px] bg-amber-500 text-white px-1 rounded">معلم</span>
              )}
            </button>

            {/* Compare Voice Tool */}
            <button
              onClick={() => onOpenVoiceRecorder(currentAyah)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-medium transition-colors"
              title="سجل صوتك وقارن مع القارئ"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>قارن تلاوتك</span>
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onEnded={handleAudioEnded}
          onTimeUpdate={handleTimeUpdate}
          onCanPlay={() => setIsLoadingAudio(false)}
          onError={(e) => {
            setIsLoadingAudio(false);
            console.warn("Audio loading error for Ayah", e);
          }}
        />
      </div>

      {/* Reciters Selection Modal */}
      {showRecitersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-md w-full p-5 border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                اختر القارئ المفضل للتعلم والترتيل
              </h3>
              <button
                onClick={() => setShowRecitersModal(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1">
              {RECITERS.map((r) => {
                const isSelected = r.id === selectedReciter.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      onSelectReciter(r);
                      setShowRecitersModal(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-right transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{r.name}</span>
                        {r.isTeacher && (
                          <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-medium">
                            المصحف المعلم
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
                        {r.style}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
