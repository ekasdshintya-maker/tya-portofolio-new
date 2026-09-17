"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[55%] top-[20%] h-100 w-100 rounded-full bg-fuchsia-500/20 blur-[120px]" />

        <div className="absolute bottom-0 left-[10%] h-75 w-75 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_.8fr]">
        
        {/* LEFT */}
        <div>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-fuchsia-400">
            Creative Web Developer
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tighter text-white sm:text-7xl lg:text-[100px]">
            Hello,
            <br />
            I'm{" "}
            <span className="text-fuchsia-400">
              Tya.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-white/50 sm:text-lg">
            Saya seorang web developer yang suka membuat website
            modern, interaktif, responsive, dan memiliki pengalaman
            pengguna yang menarik.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group flex items-center gap-3 rounded-full bg-fuchsia-400 px-7 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-fuchsia-300"
            >
              View Projects

              <ArrowUpRight
                size={18}
                className="transition duration-300 group-hover:rotate-45"
              />
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition duration-300 hover:border-fuchsia-400 hover:text-fuchsia-400"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative mx-auto flex h-87.5 w-87.5 items-center justify-center sm:h-107.5 sm:w-107.5">
          
          {/* Outer circle */}
          <div className="absolute h-full w-full animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-fuchsia-400/30" />

          {/* Inner circle */}
          <div className="absolute h-[80%] w-[80%] rounded-full border border-fuchsia-400/10 bg-fuchsia-500/10 blur-sm" />

          {/* Center */}
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/10 bg-white/4 backdrop-blur-xl sm:h-72 sm:w-72">
            <span className="text-[150px] font-black leading-none text-fuchsia-400/20">
              S
            </span>

            <div className="absolute bottom-8 right-8 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs text-white/60 backdrop-blur">
              WEB DEVELOPER
            </div>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/50 transition hover:text-fuchsia-400"
      >
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}