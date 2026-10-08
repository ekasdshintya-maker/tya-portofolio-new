"use client";

import {
  Disc3,
  Music,
  Pause,
  Play,
  RotateCcw,
  Square,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const songs = [
  {
    id: 1,
    title: "Void",
    artist: "Music One",
    file: "/music1.mp3",
  },
  {
    id: 2,
    title: "Pure Love",
    artist: "Music Two",
    file: "/music2.mp3",
  },
  {
    id: 3,
    title: "Million Stars",
    artist: "Music Three",
    file: "/music3.mp3",
  },
];

function formatTime(time: number) {
  if (!Number.isFinite(time) || time < 0) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);

  const selectedSong = songs[currentSong];

  /*
   * Update audio ketika lagu berubah
   */
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setCurrentTime(0);
    setDuration(0);

    audio.load();

    if (isPlaying) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [currentSong]);

  /*
   * Atur volume
   */
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  /*
   * PLAY
   */
  const playMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Gagal memutar audio:", error);
      setIsPlaying(false);
    }
  };

  /*
   * PAUSE
   */
  const pauseMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  };

  /*
   * STOP
   */
  const stopMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setCurrentTime(0);
    setIsPlaying(false);
  };

  /*
   * RESET / REPLAY
   */
  const resetMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  };

  /*
   * PILIH LAGU
   */
  const selectSong = (index: number) => {
    if (index === currentSong) {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }

      return;
    }

    setCurrentSong(index);
    setIsPlaying(true);
  };

  /*
   * SEEK / GESER GARIS LAGU
   */
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  /*
   * EVENT AUDIO
   */
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setDuration(audio.duration);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);

    const audio = audioRef.current;

    if (audio) {
      audio.currentTime = 0;
    }
  };

  /*
   * Persentase progress
   */
  const progress =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#101010]/95 text-white shadow-2xl shadow-fuchsia-500/10 backdrop-blur-xl">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-fuchsia-400">
            Portfolio Music
          </p>

          <h3 className="mt-1 text-base font-bold text-white">
            {selectedSong.title}
          </h3>

          <p className="text-xs text-white/40">
            {selectedSong.artist}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10">
          <Music className="h-5 w-5 text-fuchsia-400" />
        </div>

      </div>

      {/* =====================================================
          MAIN MUSIC AREA
      ===================================================== */}
      <div className="grid lg:grid-cols-[1fr_220px]">

        {/* =================================================
            SONG LIST
        ================================================= */}
        <div className="divide-y divide-white/10">

          {songs.map((song, index) => {
            const isSelected = currentSong === index;

            return (
              <div
                key={song.id}
                className={`grid grid-cols-[230px_55px_1fr_30px] items-center gap-3 px-7 py-5 transition-all duration-300 ${
                  isSelected
                    ? "bg-fuchsia-500/[0.08]"
                    : "bg-transparent hover:bg-white/[0.03]"
                }`}
              >

                {/* SONG INFO */}
                <button
                  type="button"
                  onClick={() => selectSong(index)}
                  className="flex min-w-0 items-center gap-4 text-left"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isSelected
                        ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    <Music
                      className={`h-5 w-5 ${
                        isSelected && isPlaying
                          ? "animate-pulse"
                          : ""
                      }`}
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-bold ${
                        isSelected
                          ? "text-fuchsia-300"
                          : "text-white/70"
                      }`}
                    >
                      {song.title}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-white/30">
                      {song.artist}
                    </p>
                  </div>
                </button>

                {/* PLAY BUTTON PER LAGU */}
                <button
                  type="button"
                  onClick={() => selectSong(index)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                    isSelected
                      ? "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20"
                      : "border-white/10 bg-white/[0.03] text-white/40 hover:bg-white/10 hover:text-white"
                  }`}
                  aria-label={
                    isSelected && isPlaying
                      ? `Pause ${song.title}`
                      : `Play ${song.title}`
                  }
                >
                  {isSelected && isPlaying ? (
                    <Pause className="h-4 w-4 fill-current" />
                  ) : (
                    <Play className="h-4 w-4 fill-current" />
                  )}
                </button>

                {/* PROGRESS BAR */}
                <div className="flex min-w-0 items-center gap-3">

                  <span className="w-8 text-[9px] text-white/30">
                    {isSelected
                      ? formatTime(currentTime)
                      : "0:00"}
                  </span>

                  <div className="relative flex-1">

                    {/* BACKGROUND LINE */}
                    <div className="h-1.5 w-full rounded-full bg-white/20" />

                    {/* ACTIVE LINE */}
                    <div
                      className="absolute left-0 top-0 h-1.5 rounded-full bg-fuchsia-500 transition-[width] duration-100"
                      style={{
                        width: isSelected
                          ? `${progress}%`
                          : "0%",
                      }}
                    />

                    {/* SLIDER */}
                    {isSelected && (
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.01"
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute inset-0 h-1.5 w-full cursor-pointer opacity-0"
                        aria-label="Music progress"
                      />
                    )}

                    {/* DOT */}
                    <div
                      className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-500/40 transition-[left] duration-100"
                      style={{
                        left: isSelected
                          ? `calc(${progress}% - 7px)`
                          : "-7px",
                      }}
                    />

                  </div>

                  <span className="w-8 text-right text-[9px] text-white/30">
                    {isSelected
                      ? formatTime(duration)
                      : "0:00"}
                  </span>

                </div>

                {/* AUDIO LEVEL */}
                <div className="flex items-end justify-end gap-[2px]">
                  <span
                    className={`h-2 w-[2px] rounded-full ${
                      isSelected
                        ? "bg-fuchsia-400"
                        : "bg-white/10"
                    } ${
                      isSelected && isPlaying
                        ? "animate-pulse"
                        : ""
                    }`}
                  />

                  <span
                    className={`h-3 w-[2px] rounded-full ${
                      isSelected
                        ? "bg-fuchsia-400"
                        : "bg-white/10"
                    } ${
                      isSelected && isPlaying
                        ? "animate-pulse"
                        : ""
                    }`}
                  />

                  <span
                    className={`h-4 w-[2px] rounded-full ${
                      isSelected
                        ? "bg-fuchsia-400"
                        : "bg-white/10"
                    } ${
                      isSelected && isPlaying
                        ? "animate-pulse"
                        : ""
                    }`}
                  />
                </div>

              </div>
            );
          })}

        </div>

        {/* =================================================
            CD PLAYER
        ================================================= */}
        <div className="hidden items-center justify-center border-l border-white/10 lg:flex">

          <div className="flex flex-col items-center">

            <div
              className={`relative flex h-36 w-36 items-center justify-center rounded-full border-[5px] border-white/10 bg-gradient-to-br from-slate-700 via-slate-900 to-black shadow-2xl shadow-fuchsia-500/20 ${
                isPlaying
                  ? "animate-[spin_4s_linear_infinite]"
                  : ""
              }`}
            >

              {/* CD RINGS */}
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <div className="absolute inset-5 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full border border-white/10" />

              {/* CD SHINE */}
              <div className="absolute left-5 top-5 h-10 w-20 rotate-[-25deg] rounded-full bg-white/10 blur-md" />

              {/* CENTER */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-fuchsia-400/30 bg-black">
                <Disc3 className="h-7 w-7 text-fuchsia-400" />
              </div>

              {/* CENTER HOLE */}
              <div className="absolute z-20 h-2.5 w-2.5 rounded-full bg-white/70" />

            </div>

            <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.3em] text-white/30">
              {isPlaying ? "Now Playing" : "Music Player"}
            </p>

            <p className="mt-1 max-w-[160px] truncate text-xs font-semibold text-white/50">
              {selectedSong.title}
            </p>

          </div>

        </div>
      </div>

      {/* =====================================================
          BOTTOM CONTROLS
      ===================================================== */}
      <div className="grid grid-cols-[55px_1fr_55px_140px] items-center gap-3 border-t border-white/10 px-7 py-5">

        {/* STOP */}
        <button
          type="button"
          onClick={stopMusic}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
          aria-label="Stop music"
        >
          <Square className="h-4 w-4 fill-current" />
        </button>

        {/* MAIN PLAY */}
        {!isPlaying ? (
          <button
            type="button"
            onClick={playMusic}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-fuchsia-500 px-5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/30"
          >
            <Play className="h-4 w-4 fill-current" />
            Play
          </button>
        ) : (
          <button
            type="button"
            onClick={pauseMusic}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-fuchsia-500 px-5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/30"
          >
            <Pause className="h-4 w-4 fill-current" />
            Pause
          </button>
        )}

        {/* RESET */}
        <button
          type="button"
          onClick={resetMusic}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:bg-white/10 hover:text-white"
          aria-label="Restart music"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* VOLUME */}
        <div className="flex items-center gap-3">

          <Volume2 className="h-4 w-4 shrink-0 text-white/40" />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) =>
              setVolume(Number(event.target.value))
            }
            className="w-full accent-fuchsia-500"
            aria-label="Volume"
          />

        </div>
      </div>

      {/* =====================================================
          AUDIO
      ===================================================== */}
      <audio
        ref={audioRef}
        src={selectedSong.file}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

    </div>
  );
}