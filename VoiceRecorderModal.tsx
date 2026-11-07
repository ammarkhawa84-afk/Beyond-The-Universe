import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RotateCcw, X, Volume2, UserCheck, CheckCircle2 } from 'lucide-react';
import { Ayah, Reciter } from '../types/quran';

interface VoiceRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayah: Ayah;
  surahName: string;
  reciter: Reciter;
  sheikhAudioUrl: string;
}

export const VoiceRecorderModal: React.FC<VoiceRecorderModalProps> = ({
  isOpen,
  onClose,
  ayah,
  surahName,
  reciter,
  sheikhAudioUrl
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const [isPlayingSheikh, setIsPlayingSheikh] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const recordedAudioElemRef = useRef<HTMLAudioElement | null>(null);
  const sheikhAudioElemRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
    };
  }, [recordedAudioUrl]);

  if (!isOpen) return null;

  const startRecording = async () => {
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMessage("تعذر الوصول إلى الميكروفون. يرجى التأكد من منح الإذن في المتصفح.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const togglePlayRecorded = () => {
    if (!recordedAudioElemRef.current || !recordedAudioUrl) return;
    if (isPlayingRecorded) {
      recordedAudioElemRef.current.pause();
      setIsPlayingRecorded(false);
    } else {
      if (sheikhAudioElemRef.current) {
        sheikhAudioElemRef.current.pause();
        setIsPlayingSheikh(false);
      }
      recordedAudioElemRef.current.play();
      setIsPlayingRecorded(true);
    }
  };

  const togglePlaySheikh = () => {
    if (!sheikhAudioElemRef.current) return;
    if (isPlayingSheikh) {
      sheikhAudioElemRef.current.pause();
      setIsPlayingSheikh(false);
    } else {
      if (recordedAudioElemRef.current) {
        recordedAudioElemRef.current.pause();
        setIsPlayingRecorded(false);
      }
      sheikhAudioElemRef.current.play();
      setIsPlayingSheikh(true);
    }
  };

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                مقارنة التلاوة وتصحيح التجويد
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                سورة {surahName} · الآية {ayah.numberInSurah}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ayah Display */}
        <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 text-center">
          <p className="font-quran text-xl sm:text-2xl text-emerald-950 dark:text-emerald-200 leading-loose">
            {ayah.text} ﴿{ayah.numberInSurah}﴾
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        {/* Comparison Audio Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Sheikh Audio Player */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-stone-800/60 border border-amber-200/60 dark:border-stone-700 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-400 block">
                تلاوة الشيخ القارئ
              </span>
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200 mt-0.5 truncate">
                {reciter.name}
              </p>
            </div>
            <button
              onClick={togglePlaySheikh}
              className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors shadow-sm"
            >
              {isPlayingSheikh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlayingSheikh ? "إيقاف التلاوة" : "الاستماع للشيخ"}</span>
            </button>
            <audio
              ref={sheikhAudioElemRef}
              src={sheikhAudioUrl}
              onEnded={() => setIsPlayingSheikh(false)}
            />
          </div>

          {/* Learner Recording Card */}
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-stone-800/60 border border-emerald-200/60 dark:border-stone-700 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 block">
                تسجيل تلاوتك بصوتك
              </span>
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200 mt-0.5">
                {isRecording ? `جارِ التسجيل... ${formatSec(recordingSeconds)}` : (recordedAudioUrl ? "تم حفظ التسجيل" : "جاهز للتسجيل")}
              </p>
            </div>

            {recordedAudioUrl ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlayRecorded}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-sm"
                >
                  {isPlayingRecorded ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isPlayingRecorded ? "إيقاف" : "استمع لتسجيلك"}</span>
                </button>
                <button
                  onClick={startRecording}
                  className="p-2 rounded-lg border border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                  title="إعادة التسجيل"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg font-medium text-xs transition-colors shadow-sm ${
                  isRecording
                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isRecording ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-4 h-4" />}
                <span>{isRecording ? "إيقاف التسجيل الآن" : "ابدأ التسجيل بصوتك"}</span>
              </button>
            )}

            {recordedAudioUrl && (
              <audio
                ref={recordedAudioElemRef}
                src={recordedAudioUrl}
                onEnded={() => setIsPlayingRecorded(false)}
              />
            )}
          </div>
        </div>

        {/* Tip */}
        <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-xl text-xs text-stone-600 dark:text-stone-400 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            نصيحة تعليمية: استمع إلى تلاوة الشيخ أولاً وركز على مخارج الحروف والمدود والغنات، ثم سجل صوتك واستمع إليهما تباعًا لمطابقة الأحكام والتأكد من صحة الترتيل.
          </p>
        </div>

      </div>
    </div>
  );
};
