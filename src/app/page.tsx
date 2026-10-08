"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Menu,
  Palette,
  Smartphone,
  X,
} from "lucide-react";

import MusicPlayer from "./components/MusicPlayer";

const projects = [
  {
    number: "01",
    title: "MyApp",
    category: "Web Application",
    description:
      "A modern web application built with Next.js and TypeScript.",
    detail:
      "Modern and responsive web application designed with a clean interface and smooth user experience.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
  },
  {
    number: "02",
    title: "Student Management",
    category: "Management System",
    description:
      "A student management system for managing student information efficiently.",
    detail:
      "A management system designed to simplify student data management with a responsive dashboard.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
];

const categories = [
  "All",
  "Featured",
  "Web Application",
  "Management System",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [messageSent, setMessageSent] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playVideo = () => {
      video
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch((err) => {
          console.warn("Video background autoplay prevented:", err);
          setIsVideoPlaying(false);
        });
    };

    playVideo();
  }, []);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsVideoPlaying(true));
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Featured" && project.number === "01") ||
      project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessageSent(true);

    event.currentTarget.reset();

    setTimeout(() => {
      setMessageSent(false);
    }, 4000);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080808] text-white">

      {/* =====================================================
          FIXED VIDEO BACKGROUND (/breakbeat.mp4)
      ===================================================== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#080808]">

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="/dj2\\
          
          .mp4"
        >
          <source src="/dj2.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Overlay (balanced so video is clearly visible while text stays crisp) */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Fuchsia Brand Glow Overlay */}
        <div className="absolute inset-0 bg-fuchsia-950/20 mix-blend-overlay" />

        {/* Smooth Vignette Gradient (Top to Bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      </div>

      {/* =====================================================
          CONTENT LAYER
      ===================================================== */}
      <div className="relative z-10">

        {/* =====================================================
            NAVBAR
        ===================================================== */}
        <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-xl">

          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

            <a
              href="#home"
              className="text-xl font-black tracking-tight transition-colors duration-300 hover:text-fuchsia-400"
            >
              Shintya<span className="text-fuchsia-400">.</span>
            </a>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-8 md:flex">

              <a
                href="#home"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Home
              </a>

              <a
                href="#about"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                About
              </a>

              <a
                href="#skills"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Skills
              </a>

              <a
                href="#projects"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Projects
              </a>

              <a
                href="#contact"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Contact
              </a>

            </nav>

            {/* LET'S TALK */}
            <a
              href="#contact"
              className="hidden rounded-full bg-fuchsia-500 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/20 md:block"
            >
              Let&apos;s Talk
            </a>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

          </div>

          {/* MOBILE NAVIGATION */}
          {menuOpen && (
            <div className="border-t border-white/10 bg-black/90 px-6 py-5 backdrop-blur-xl md:hidden">

              <nav className="flex flex-col gap-4">

                {["home", "about", "skills", "projects", "contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm capitalize text-white/70 transition-colors hover:text-fuchsia-400"
                    >
                      {item}
                    </a>
                  )
                )}

              </nav>

            </div>
          )}

        </header>

        {/* =====================================================
            HERO
        ===================================================== */}
        <section
          id="home"
          className="relative px-6 pb-20 pt-32 lg:px-10"
        >

          <div className="mx-auto max-w-7xl">

            <div className="grid min-h-[650px] items-center gap-16 lg:grid-cols-[1.2fr_.8fr]">

              {/* LEFT CONTENT */}
              <div className="animate-[fadeInUp_.8s_ease-out]">

                <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-fuchsia-400">
                  Creative Web Developer
                </p>

                <h1 className="max-w-4xl text-6xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">

                  I&apos;M

                  <br />

                  <span className="text-fuchsia-400">
                    SHINTYA.
                  </span>

                </h1>

                <p className="mt-8 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
                  I create modern, interactive, and responsive websites using
                  modern web technologies.
                </p>

                {/* BUTTONS */}
                <div className="mt-8 flex flex-wrap gap-4">

                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/20"
                  >
                    View Projects

                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-fuchsia-400/10"
                  >
                    Contact Me
                  </a>

                </div>

              </div>

              {/* PROFILE IMAGE */}
              <div className="mx-auto w-full max-w-md lg:ml-auto">

                <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-fuchsia-500/10">

                  <Image
                    src="/cute.jpeg"
                    alt="Foto profil Shintya, Creative Web Developer"
                    width={500}
                    height={500}
                    priority
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                </div>

              </div>

            </div>

            {/* MUSIC PLAYER */}
            <div className="mt-8 w-full">
              <MusicPlayer />
            </div>

          </div>

          {/* SCROLL DOWN */}
          <a
            href="#about"
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-white/50 transition-colors hover:text-white md:block"
            aria-label="Scroll to about"
          >
            <ArrowDown className="h-5 w-5" />
          </a>

        </section>

        {/* =====================================================
            ABOUT
        ===================================================== */}
        <section
          id="about"
          className="border-t border-white/10 px-6 py-32 lg:px-10"
        >

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-12 lg:grid-cols-2">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
                  About Me
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                  Building digital experiences with creativity.
                </h2>

              </div>

              <div className="space-y-5 text-white/60">

                <p className="leading-8">
                  I&apos;m a creative web developer who enjoys building modern
                  and interactive websites.
                </p>

                <p className="leading-8">
                  I focus on creating clean interfaces, responsive layouts,
                  and enjoyable user experiences using modern technologies.
                </p>

                <p className="leading-8">
                  My goal is to continue learning and creating better digital
                  experiences through every project.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            SKILLS
        ===================================================== */}
        <section
          id="skills"
          className="border-y border-white/10 px-6 py-32 lg:px-10"
        >

          <div className="mx-auto max-w-7xl">

            <div className="mb-14">

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
                Skills
              </p>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Technologies I use.
              </h2>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {[
                {
                  icon: Code2,
                  title: "Development",
                  text: "Next.js, React, TypeScript",
                },
                {
                  icon: Palette,
                  title: "Design",
                  text: "Tailwind CSS & UI Design",
                },
                {
                  icon: Smartphone,
                  title: "Responsive",
                  text: "Mobile & Desktop Experience",
                },
                {
                  icon: Code2,
                  title: "Database",
                  text: "Supabase & PostgreSQL",
                },
              ].map((skill) => {

                const Icon = skill.icon;

                return (
                  <div
                    key={skill.title}
                    className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-fuchsia-400/[0.03]"
                  >

                    <Icon className="h-7 w-7 text-fuchsia-400 transition-transform duration-300 group-hover:scale-110" />

                    <h3 className="mt-6 font-bold">
                      {skill.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                      {skill.text}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

        </section>

        {/* =====================================================
            PROJECTS
        ===================================================== */}
        <section
          id="projects"
          className="px-6 py-32 lg:px-10"
        >

          <div className="mx-auto max-w-7xl">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
                  Selected Work
                </p>

                <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                  My Projects
                </h2>

              </div>

              {/* SEARCH */}
              <div className="relative w-full max-w-sm">

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search project..."
                  className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-fuchsia-400/50 focus:bg-white/10"
                />

              </div>

            </div>

            {/* CATEGORY */}
            <div className="mt-10 flex flex-wrap gap-2">

              {categories.map((category) => (

                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-fuchsia-500 text-white"
                      : "border border-white/10 bg-white/5 text-white/60 hover:border-fuchsia-400/40 hover:text-white"
                  }`}
                >
                  {category}
                </button>

              ))}

            </div>

            {/* PROJECT GRID */}
            <div className="mt-10 grid gap-5 lg:grid-cols-2">

              {filteredProjects.length > 0 ? (

                filteredProjects.map((project) => (

                  <button
                    key={project.number}
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="group text-left"
                  >

                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-7 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-fuchsia-400/[0.03] hover:shadow-2xl hover:shadow-fuchsia-500/5">

                      <div className="flex items-start justify-between">

                        <span className="text-sm text-white/30">
                          {project.number}
                        </span>

                        <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fuchsia-400" />

                      </div>

                      <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
                        {project.category}
                      </p>

                      <h3 className="mt-3 text-2xl font-bold transition-colors duration-300 group-hover:text-fuchsia-400">
                        {project.title}
                      </h3>

                      <p className="mt-4 leading-7 text-white/50">
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">

                        {project.tech.map((tech) => (

                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50"
                          >
                            {tech}
                          </span>

                        ))}

                      </div>

                    </div>

                  </button>

                ))

              ) : (

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center lg:col-span-2">

                  <p className="text-white/50">
                    Project tidak ditemukan.
                  </p>

                </div>

              )}

            </div>

          </div>

        </section>

        {/* =====================================================
            CONTACT
        ===================================================== */}
        <section
          id="contact"
          className="px-6 py-32 lg:px-10"
        >

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-12 lg:grid-cols-2">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
                  Contact
                </p>

                <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                  Let&apos;s work together.
                </h2>

                <p className="mt-6 max-w-lg leading-8 text-white/50">
                  Have a project, idea, or opportunity? Send me a message and
                  let&apos;s connect.
                </p>

              </div>

              <form
                onSubmit={handleContactSubmit}
                className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8"
              >

                <input
                  type="text"
                  name="nama"
                  placeholder="Nama"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-fuchsia-400/50"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-fuchsia-400/50"
                />

                <textarea
                  name="pesan"
                  placeholder="Pesan"
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-fuchsia-400/50"
                />

                <button
                  type="submit"
                  className="w-full rounded-xl bg-fuchsia-500 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/20"
                >
                  Send Message
                </button>

                {messageSent && (
                  <p className="rounded-xl bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-400">
                    Message sent successfully!
                  </p>
                )}

              </form>

            </div>

          </div>

        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}
        <footer className="border-t border-white/10 px-6 py-8 lg:px-10">

          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} Shintya. All rights reserved.
            </p>

            <p>
              Creative Web Developer
            </p>

          </div>

        </footer>

      </div>

      {/* =====================================================
          PROJECT MODAL
      ===================================================== */}
      {selectedProject && (

        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-6 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >

          <div
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111111] p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="flex items-start justify-between gap-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
                  {selectedProject.category}
                </p>

                <h3 className="mt-2 text-3xl font-black">
                  {selectedProject.title}
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:text-white"
                aria-label="Close project"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <p className="mt-6 leading-8 text-white/60">
              {selectedProject.detail}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">

              {selectedProject.tech.map((tech) => (

                <span
                  key={tech}
                  className="rounded-full bg-fuchsia-500/10 px-3 py-1.5 text-xs font-medium text-fuchsia-300"
                >
                  {tech}
                </span>

              ))}

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          VIDEO BACKGROUND PLAY/PAUSE CONTROL PILL
      ===================================================== */}
      <button
        type="button"
        onClick={toggleVideoPlayback}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-medium text-white/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-400/50 hover:bg-black/80 hover:text-white"
        title={isVideoPlaying ? "Jeda video background" : "Putar video background"}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            isVideoPlaying ? "animate-pulse bg-emerald-400" : "bg-white/40"
          }`}
        />
        <span>{isVideoPlaying ? "Video Background" : "Video Paused"}</span>
      </button>

    </main>
  );
}