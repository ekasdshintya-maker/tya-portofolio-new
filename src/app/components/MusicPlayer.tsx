"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const updateTime = () => setCurrentTime(audio.currentTime);

    const updateDuration = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        setIsReady(true);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("canplay", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Jika metadata sudah tersedia sebelum listener terpasang.
    updateDuration();

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("canplay", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("Audio gagal diputar:", error);
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: string) => {
    const audio = audioRef.current;
    const nextTime = Number(value);

    if (!audio || !Number.isFinite(nextTime)) return;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const restartSong = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);

    try {
      await audio.play();
    } catch (error) {
      console.error("Lagu tidak dapat diputar:", error);
    }
  };

  const progress =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <section className="w-full rounded-[2rem] border border-white/10 bg-[#101014]/95 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
      <audio
        ref={audioRef}
        src="/music1.mp3"
        preload="metadata"
        onError={() => {
          setIsReady(false);
          setIsPlaying(false);
          console.error(
            "Audio gagal dimuat. Periksa file public/music1.mp3."
          );
        }}
      />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
        {/* INFORMASI LAGU */}
        <div className="flex min-w-0 items-center gap-4 lg:w-[285px] lg:shrink-0">
          <div
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-lg shadow-fuchsia-500/10 sm:h-[68px] sm:w-[68px] ${
              isPlaying ? "music-cover-playing" : ""
            }`}
          >
            <img
              src="/pp 1.jpeg"
              alt="Cover lagu VOID"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-400">
              Now Playing
            </p>
            <h3 className="truncate text-lg font-extrabold text-white">
              VOID
            </h3>
            <p className="truncate text-xs font-medium text-white/45">
              HBRP &amp; ADNAN VERON
            </p>
          </div>
        </div>

        {/* TOMBOL PLAY */}
        <div className="flex items-center justify-center lg:shrink-0">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause lagu" : "Putar lagu"}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/25 transition duration-300 hover:scale-110 hover:bg-fuchsia-400 active:scale-95 sm:h-[50px] sm:w-[50px]"
          >
            {isPlaying ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play size={22} fill="currentColor" className="ml-0.5" />
            )}
          </button>
        </div>

        {/* PROGRESS DAN DURASI */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-medium tabular-nums text-white/45">
            <span>{formatTime(currentTime)}</span>
            <span>{isReady ? formatTime(duration) : "--:--"}</span>
          </div>

          <input
            type="range"
            min={0}
            max={duration > 0 ? duration : 1}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => handleSeek(event.target.value)}
            disabled={!isReady}
            aria-label="Posisi lagu"
            className="music-progress w-full"
            style={{
              background: `linear-gradient(to right, #d946ef ${progress}%, #3f3f46 ${progress}%)`,
            }}
          />

          {!isReady && (
            <p className="mt-2 text-[10px] text-white/30">
              Memuat durasi lagu...
            </p>
          )}
        </div>

        {/* RESTART DAN VOLUME */}
        <div className="flex items-center justify-center gap-4 lg:shrink-0">
          <button
            type="button"
            onClick={restartSong}
            aria-label="Putar ulang lagu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition duration-300 hover:rotate-[-45deg] hover:border-fuchsia-400/40 hover:text-fuchsia-400"
          >
            <RotateCcw size={17} />
          </button>

          <div className="flex items-center gap-2">
            <Volume2 size={16} className="shrink-0 text-white/45" />

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Volume lagu"
              className="music-volume w-[72px]"
              style={{
                background: `linear-gradient(to right, #d946ef ${
                  volume * 100
                }%, #3f3f46 ${volume * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>

    </section>
  );
}
