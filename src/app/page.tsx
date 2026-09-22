"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers,
  Menu,
  Palette,
  Search,
  Smartphone,
  X,
} from "lucide-react";

import { supabase } from "./lib/supabase";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
};

type Skill = {
  id: number;
  name: string;
  category: string;
  icon: string | null;
};

type ProjectFilter = "All" | string;

export default function Home() {
  // =========================
  // NAVBAR
  // =========================

  const [menuOpen, setMenuOpen] = useState(false);

  // =========================
  // PROJECT STATE
  // =========================

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] =
    useState(true);
  const [projectsError, setProjectsError] =
    useState("");

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState<ProjectFilter>("All");

  // =========================
  // SKILL STATE
  // =========================

  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLoading, setSkillsLoading] =
    useState(true);
  const [skillsError, setSkillsError] =
    useState("");

  // =========================
  // CONTACT STATE
  // =========================

  const [messageSent, setMessageSent] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [messageError, setMessageError] =
    useState("");

  // =========================
  // GET PROJECTS FROM SUPABASE
  // =========================

  useEffect(() => {
    async function fetchProjects() {
      setProjectsLoading(true);
      setProjectsError("");

      const { data, error } = await supabase
        .from("proyek")
        .select(
          "id, title, category, description"
        )
        .order("id", {
          ascending: true,
        });

      if (error) {
        console.error(
          "Gagal mengambil project:",
          error
        );

        setProjectsError(
          error.message ||
            "Project gagal dimuat."
        );

        setProjectsLoading(false);
        return;
      }

      setProjects(data ?? []);
      setProjectsLoading(false);
    }

    fetchProjects();
  }, []);

  // =========================
  // GET SKILLS FROM SUPABASE
  // =========================

  useEffect(() => {
    async function fetchSkills() {
      setSkillsLoading(true);
      setSkillsError("");

      const { data, error } = await supabase
        .from("skill")
        .select(
          "id, name, category, icon"
        )
        .order("id", {
          ascending: true,
        });

      if (error) {
        console.error(
          "Gagal mengambil skill:",
          error
        );

        setSkillsError(
          error.message ||
            "Skill gagal dimuat."
        );

        setSkillsLoading(false);
        return;
      }

      setSkills(data ?? []);
      setSkillsLoading(false);
    }

    fetchSkills();
  }, []);

  // =========================
  // PROJECT FILTER LIST
  // =========================

  const projectFilters = useMemo(() => {
    const categories = projects
      .map((project) => project.category)
      .filter(Boolean);

    return [
      "All",
      ...Array.from(
        new Set(categories)
      ),
    ];
  }, [projects]);

  // =========================
  // FILTER PROJECT
  // =========================

  const filteredProjects =
    projects.filter((project) => {
      const query =
        searchQuery
          .toLowerCase()
          .trim();

      const matchesSearch =
        project.title
          .toLowerCase()
          .includes(query) ||
        project.category
          .toLowerCase()
          .includes(query) ||
        project.description
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        activeFilter === "All"
          ? true
          : project.category ===
            activeFilter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  // =========================
  // RESET FILTER
  // =========================

  const resetFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
  };

  // =========================
  // SKILL ICON
  // =========================

  const getSkillIcon = (
    skill: Skill
  ) => {
    const value = `${skill.name} ${skill.icon ?? ""}`
      .toLowerCase();

    if (
      value.includes("design") ||
      value.includes("figma") ||
      value.includes("ui") ||
      value.includes("ux")
    ) {
      return Palette;
    }

    if (
      value.includes("database") ||
      value.includes("supabase") ||
      value.includes("sql")
    ) {
      return Database;
    }

    if (
      value.includes("git") ||
      value.includes("github")
    ) {
      return GitBranch;
    }

    if (
      value.includes("mobile") ||
      value.includes("responsive")
    ) {
      return Smartphone;
    }

    if (
      value.includes("html") ||
      value.includes("css") ||
      value.includes("javascript") ||
      value.includes("typescript") ||
      value.includes("react") ||
      value.includes("next") ||
      value.includes("web")
    ) {
      return Code2;
    }

    if (
      value.includes("frontend") ||
      value.includes("backend")
    ) {
      return Layers;
    }

    return Globe;
  };

  // =========================
  // CONTACT FORM
  // =========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nama = String(
      formData.get("nama") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const pesan = String(
      formData.get("pesan") || ""
    ).trim();

    setSending(true);
    setMessageSent(false);
    setMessageError("");

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            nama,
            email,
            pesan,
          }),
        }
      );

      const result =
        await response.json();

      console.log(
        "CONTACT RESULT:",
        result
      );

      if (
        !response.ok ||
        !result.success
      ) {
        setMessageError(
          result.message ||
            "Pesan gagal dikirim. Silakan coba lagi."
        );
        return;
      }

      setMessageSent(true);
      form.reset();

      setTimeout(() => {
        setMessageSent(false);
      }, 5000);
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setMessageError(
        "Terjadi kesalahan saat mengirim pesan."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#080808] text-white">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="fixed inset-x-0 top-0 z-[9999] w-full border-b border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 sm:px-6">

          <a
            href="#home"
            onClick={() =>
              setMenuOpen(false)
            }
            className="relative z-[10000] shrink-0 text-xl font-black sm:text-2xl"
          >
            Shintya
            <span className="text-fuchsia-400">
              .
            </span>
          </a>

          {/* DESKTOP MENU */}

          <div className="hidden items-center gap-8 md:flex lg:gap-10">

            <a
              href="#home"
              className="text-sm text-white/60 transition hover:text-fuchsia-400"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-sm text-white/60 transition hover:text-fuchsia-400"
            >
              About
            </a>

            <a
              href="#skills"
              className="text-sm text-white/60 transition hover:text-fuchsia-400"
            >
              Skills
            </a>

            <a
              href="#projects"
              className="text-sm text-white/60 transition hover:text-fuchsia-400"
            >
              Projects
            </a>

            <a
              href="#contact"
              className="text-sm text-white/60 transition hover:text-fuchsia-400"
            >
              Contact
            </a>

          </div>

          <a
            href="#contact"
            className="hidden rounded-full border border-fuchsia-400/50 px-5 py-2.5 text-sm font-medium transition hover:bg-fuchsia-400 hover:text-black md:block"
          >
            Let&apos;s Talk
          </a>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (prev) => !prev
              )
            }
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="relative z-[10000] flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 text-white md:hidden"
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}

        {menuOpen && (
          <div className="relative z-[9999] border-t border-white/10 bg-black px-5 py-5 md:hidden">
            <div className="flex flex-col gap-1">

              <a
                href="#home"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-xl px-4 py-3.5 text-white/70 transition hover:bg-fuchsia-400/10 hover:text-fuchsia-400"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-xl px-4 py-3.5 text-white/70 transition hover:bg-fuchsia-400/10 hover:text-fuchsia-400"
              >
                About
              </a>

              <a
                href="#skills"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-xl px-4 py-3.5 text-white/70 transition hover:bg-fuchsia-400/10 hover:text-fuchsia-400"
              >
                Skills
              </a>

              <a
                href="#projects"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-xl px-4 py-3.5 text-white/70 transition hover:bg-fuchsia-400/10 hover:text-fuchsia-400"
              >
                Projects
              </a>

              <a
                href="#contact"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-xl px-4 py-3.5 text-white/70 transition hover:bg-fuchsia-400/10 hover:text-fuchsia-400"
              >
                Contact
              </a>

              <a
                href="#contact"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="mt-3 rounded-full bg-fuchsia-400 px-5 py-3.5 text-center font-bold text-black"
              >
                Let&apos;s Talk
              </a>

            </div>
          </div>
        )}
      </nav>

      {/* =========================
          HERO
      ========================= */}

      <section
        id="home"
        className="relative flex min-h-screen w-full items-center px-5 pb-16 pt-28 sm:px-6 sm:pt-32"
      >

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-[40%] top-[10%] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-[100px] sm:h-96 sm:w-96" />

          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">

          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
              backgroundSize:
                "50px 50px",
            }}
          />

        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <div className="min-w-0 text-center lg:text-left">

            <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-400 sm:text-sm sm:tracking-[0.35em]">
              Creative Web Developer
            </p>

            <h1 className="mt-5 break-words text-[clamp(3.2rem,15vw,6.5rem)] font-black leading-[0.88] tracking-[-0.06em]">
              HELLO,
              <br />
              I&apos;M{" "}
              <span className="text-fuchsia-400">
                SHINTYA.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
              Saya seorang web developer
              yang memiliki ketertarikan
              pada pembuatan website
              modern, interaktif,
              responsive, dan memiliki
              pengalaman pengguna yang
              menarik.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">

              <a
                href="#projects"
                className="group flex items-center justify-center gap-3 rounded-full bg-fuchsia-400 px-6 py-3.5 text-sm font-bold text-black transition hover:scale-105 hover:bg-fuchsia-300 sm:px-7 sm:py-4"
              >
                View Projects

                <ArrowUpRight
                  size={18}
                  className="transition group-hover:rotate-45"
                />
              </a>

              <a
                href="#contact"
                className="flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold transition hover:border-fuchsia-400 hover:text-fuchsia-400 sm:px-7 sm:py-4"
              >
                Contact Me
              </a>

            </div>
          </div>

          {/* HERO IMAGE */}

          <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center sm:max-w-[380px] md:max-w-[430px]">

            <div className="pointer-events-none absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-fuchsia-400/30" />

            <div className="pointer-events-none absolute inset-[10%] rounded-full bg-fuchsia-500/20 blur-3xl" />

            <div className="relative aspect-square w-[82%] overflow-hidden rounded-full border-4 border-fuchsia-400/30 bg-white/[0.04] shadow-[0_0_70px_rgba(217,70,239,0.2)]">

              <Image
                src="/tya.jpeg"
                alt="Foto Shintya"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 230px, (max-width: 1024px) 310px, 350px"
              />

              <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/80 px-3 py-1.5 text-[9px] font-bold backdrop-blur-md sm:bottom-5 sm:right-5 sm:px-4 sm:py-2 sm:text-xs">
                WEB DEVELOPER
              </div>

            </div>
          </div>
        </div>

        <a
          href="#about"
          aria-label="Scroll to about"
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-white/30 transition hover:text-fuchsia-400"
        >
          <ArrowDown
            size={22}
            className="animate-bounce"
          />
        </a>

      </section>

      {/* =========================
          STATS
      ========================= */}

      <section className="w-full border-y border-white/10">

        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 lg:grid-cols-4">

          {[
            [
              "01",
              "Web Developer",
              "Modern website",
            ],
            [
              "02",
              "UI / UX",
              "Clean interface",
            ],
            [
              "03",
              "Responsive",
              "Mobile friendly",
            ],
            [
              "04",
              `${skills.length}`,
              "Skills in database",
            ],
          ].map(
            ([number, title, text]) => (
              <div
                key={number}
                className="min-w-0 border-r border-b border-white/10 p-5 last:border-r-0 sm:p-8 lg:border-b-0"
              >

                <p className="text-xs text-fuchsia-400 sm:text-sm">
                  {number}
                </p>

                <h3 className="mt-3 break-words text-base font-bold sm:mt-5 sm:text-xl">
                  {title}
                </h3>

                <p className="mt-1 break-words text-xs text-white/30 sm:mt-2 sm:text-sm">
                  {text}
                </p>

              </div>
            )
          )}

        </div>
      </section>

      {/* =========================
          TECH STACK - FROM SUPABASE
      ========================= */}

      <section className="w-full overflow-hidden py-20 sm:py-24">

        <p className="mb-8 px-5 text-center text-[10px] uppercase tracking-[0.3em] text-white/30 sm:mb-10 sm:text-xs sm:tracking-[0.4em]">
          Technologies I Work With
        </p>

        {skillsLoading ? (
          <div className="text-center text-sm text-white/30">
            Memuat technology...
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center text-sm text-white/30">
            Belum ada skill di database.
          </div>
        ) : (
          <div className="flex w-max animate-[marquee_25s_linear_infinite]">

            {[
              ...skills,
              ...skills,
            ].map(
              (skill, index) => (
                <div
                  key={`${skill.id}-${index}`}
                  className="mx-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-bold text-white/40 sm:mx-3 sm:px-8 sm:py-4 sm:text-sm"
                >
                  {skill.name.toUpperCase()}
                </div>
              )
            )}

          </div>
        )}

      </section>

      {/* =========================
          ABOUT
      ========================= */}

      <section
        id="about"
        className="relative w-full px-5 py-24 sm:px-6 sm:py-32"
      >

        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[100px]" />

        <div className="relative mx-auto w-full max-w-7xl">

          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 sm:text-sm sm:tracking-[0.35em]">
            About Me
          </p>

          <h2 className="mt-5 text-[clamp(3rem,13vw,7rem)] font-black leading-[0.9] tracking-[-0.05em]">
            WHO IS
            <br />
            <span className="text-fuchsia-400">
              SHINTYA?
            </span>
          </h2>

          <div className="mt-14 grid w-full grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">

            {/* ABOUT CARD */}

            <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 sm:rounded-[2rem] sm:p-10">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-fuchsia-400 text-xl font-black text-black">
                  S
                </div>

                <div className="min-w-0">

                  <h3 className="truncate text-lg font-bold sm:text-xl">
                    Shintya
                  </h3>

                  <p className="text-xs text-white/40 sm:text-sm">
                    Creative Web Developer
                  </p>

                </div>

              </div>

              <p className="mt-7 text-sm leading-7 text-white/60 sm:mt-8 sm:text-lg sm:leading-8">
                Halo! Saya{" "}
                <span className="font-semibold text-white">
                  Shintya
                </span>
                . Saya memiliki
                ketertarikan terhadap dunia
                teknologi, website development,
                dan desain digital.
              </p>

              <p className="mt-5 text-sm leading-7 text-white/60 sm:text-lg sm:leading-8">
                Saya suka mempelajari teknologi
                baru dan mengubah sebuah ide
                menjadi website yang menarik,
                responsive, dan mudah digunakan.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">

                <div className="min-w-0 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">

                  <p className="text-2xl font-black text-fuchsia-400 sm:text-3xl">
                    {projects.length}
                  </p>

                  <p className="mt-1 text-xs text-white/40 sm:mt-2 sm:text-sm">
                    Projects
                  </p>

                </div>

                <div className="min-w-0 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">

                  <p className="text-2xl font-black text-fuchsia-400 sm:text-3xl">
                    {skills.length}
                  </p>

                  <p className="mt-1 text-xs text-white/40 sm:mt-2 sm:text-sm">
                    Skills
                  </p>

                </div>

              </div>
            </div>

            {/* SKILLS FROM SUPABASE */}

            <div
              id="skills"
              className="grid min-w-0 gap-4"
            >

              {skillsLoading ? (
                <>
                  {[1, 2, 3].map(
                    (item) => (
                      <div
                        key={item}
                        className="h-32 animate-pulse rounded-3xl border border-white/10 bg-white/[0.02]"
                      />
                    )
                  )}
                </>
              ) : skillsError ? (
                <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-6">

                  <p className="text-sm font-semibold text-red-300">
                    Skill gagal dimuat.
                  </p>

                  <p className="mt-2 break-words text-xs leading-6 text-white/30">
                    {skillsError}
                  </p>

                </div>
              ) : skills.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">

                  <Code2
                    size={30}
                    className="mx-auto text-white/20"
                  />

                  <p className="mt-4 text-sm text-white/40">
                    Belum ada skill di
                    Supabase.
                  </p>

                </div>
              ) : (
                skills.map((skill) => {

                  const Icon =
                    getSkillIcon(
                      skill
                    );

                  return (
                    <div
                      key={skill.id}
                      className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-fuchsia-400/[0.03] hover:shadow-lg hover:shadow-fuchsia-500/10 sm:p-7"
                    >

                      <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10">

                          <Icon
                            size={20}
                            className="text-fuchsia-400"
                          />

                        </div>

                        <div className="min-w-0">

                          <h3 className="break-words text-lg font-bold sm:text-xl">
                            {skill.name}
                          </h3>

                          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-fuchsia-400/70">
                            {skill.category}
                          </p>

                          <p className="mt-3 text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
                            Skill yang digunakan
                            dalam pengembangan
                            project dan website.
                          </p>

                        </div>

                      </div>

                    </div>
                  );
                })
              )}

            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PROJECTS
      ========================= */}

      <section
        id="projects"
        className="relative w-full px-5 py-24 sm:px-6 sm:py-32"
      >

        <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px]" />

        <div className="relative mx-auto w-full max-w-7xl">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div className="min-w-0">

              <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 sm:text-sm sm:tracking-[0.35em]">
                Selected Work
              </p>

              <h2 className="mt-5 text-[clamp(3rem,13vw,7rem)] font-black leading-[0.9] tracking-[-0.05em]">
                MY
                <br />
                <span className="text-fuchsia-400">
                  PROJECTS.
                </span>
              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-white/40 sm:text-base">
              Beberapa project yang dibuat
              sebagai bagian dari perjalanan
              belajar dan mengembangkan
              kemampuan web development.
            </p>

          </div>

          {/* SEARCH */}

          <div className="relative z-20 mt-10 w-full">

            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              placeholder="Cari judul proyek..."
              aria-label="Cari judul proyek"
              className="w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-fuchsia-400/60 focus:ring-1 focus:ring-fuchsia-400/30 sm:text-base"
            />

          </div>

          {/* FILTER */}

          <div className="relative z-20 mt-4 flex w-full flex-wrap gap-2">

            {projectFilters.map(
              (filter) => {

                const active =
                  activeFilter ===
                  filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() =>
                      setActiveFilter(
                        filter
                      )
                    }
                    className={`cursor-pointer rounded-full border px-3.5 py-2 text-xs font-semibold transition-all sm:px-5 sm:py-2.5 sm:text-sm ${
                      active
                        ? "border-fuchsia-400 bg-fuchsia-400 text-black"
                        : "border-white/10 bg-white/[0.03] text-white/50 hover:border-fuchsia-400/50 hover:text-fuchsia-400"
                    }`}
                  >
                    {filter}
                  </button>
                );
              }
            )}

          </div>

          {/* COUNT */}

          <div className="relative z-20 mt-5 flex flex-wrap items-center justify-between gap-3">

            <p className="text-xs text-white/30 sm:text-sm">

              Menampilkan{" "}

              <span className="text-fuchsia-400">
                {filteredProjects.length}
              </span>{" "}

              dari{" "}
              {projects.length}{" "}
              project

            </p>

            {(searchQuery ||
              activeFilter !==
                "All") && (
              <button
                type="button"
                onClick={
                  resetFilters
                }
                className="cursor-pointer text-xs text-white/40 hover:text-fuchsia-400 sm:text-sm"
              >
                Reset Filter
              </button>
            )}

          </div>

          {/* PROJECT LIST */}

          <div className="relative z-20 mt-8 grid w-full gap-5">

            {projectsLoading ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] px-5 py-16 text-center sm:rounded-[2rem]">

                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-fuchsia-400" />

                <p className="mt-5 text-sm text-white/40">
                  Memuat project...
                </p>

              </div>
            ) : projectsError ? (
              <div className="rounded-[1.5rem] border border-red-400/20 bg-red-400/5 px-5 py-10 text-center sm:rounded-[2rem]">

                <p className="text-sm text-red-300">
                  Project gagal dimuat.
                </p>

                <p className="mt-2 break-words text-xs text-white/30">
                  {projectsError}
                </p>

              </div>
            ) : filteredProjects.length >
              0 ? (
              filteredProjects.map(
                (project) => (
                  <article
                    key={project.id}
                    className="group relative min-w-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-fuchsia-400/[0.03] hover:shadow-lg hover:shadow-fuchsia-500/10 sm:rounded-[2rem] sm:p-8 lg:p-10"
                  >

                    <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">

                      <div className="shrink-0 lg:w-24">

                        <span className="text-xs text-fuchsia-400 sm:text-sm">
                          /{" "}
                          {String(
                            project.id
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="break-words text-[10px] uppercase tracking-[0.2em] text-white/30 sm:text-xs sm:tracking-[0.25em]">
                          {project.category}
                        </p>

                        <h3 className="mt-2 break-words text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                          {project.title}
                        </h3>

                        <p className="mt-4 max-w-2xl break-words text-sm leading-7 text-white/40 sm:text-base">
                          {project.description}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedProject(
                              project
                            )
                          }
                          className="relative z-30 mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-fuchsia-400 px-5 py-3 text-xs font-bold text-black transition hover:scale-105 hover:bg-fuchsia-300 active:scale-95 sm:text-sm"
                        >
                          View Details

                          <ArrowUpRight
                            size={16}
                          />
                        </button>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProject(
                            project
                          )
                        }
                        aria-label={`Open ${project.title}`}
                        className="relative z-30 hidden h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 transition duration-300 hover:rotate-45 hover:border-fuchsia-400 hover:bg-fuchsia-400 hover:text-black lg:flex"
                      >
                        <ArrowUpRight
                          size={20}
                        />
                      </button>

                    </div>

                    <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-fuchsia-400 transition-all duration-500 group-hover:w-full" />

                  </article>
                )
              )
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] px-5 py-16 text-center sm:rounded-[2rem] sm:px-6">

                <Search
                  size={28}
                  className="mx-auto text-white/20"
                />

                <h3 className="mt-5 text-xl font-bold sm:text-2xl">
                  Project tidak ditemukan
                </h3>

                <p className="mt-2 text-sm text-white/40">
                  Coba gunakan kata kunci
                  atau filter lain.
                </p>

                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                  className="relative z-30 mt-6 cursor-pointer rounded-full bg-fuchsia-400 px-5 py-3 text-xs font-bold text-black sm:text-sm"
                >
                  Tampilkan Semua
                </button>

              </div>
            )}

          </div>
        </div>
      </section>

      {/* =========================
          CONTACT
      ========================= */}

      <section
        id="contact"
        className="relative w-full px-5 py-24 sm:px-6 sm:py-32"
      >

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[150px]" />

        <div className="relative mx-auto w-full max-w-7xl">

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-fuchsia-400/[0.03] sm:rounded-[2rem]">

            <div className="grid w-full grid-cols-1 lg:grid-cols-2">

              {/* LEFT */}

              <div className="min-w-0 p-6 sm:p-12 lg:p-20">

                <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 sm:text-sm sm:tracking-[0.35em]">
                  Get In Touch
                </p>

                <h2 className="mt-5 break-words text-[clamp(3rem,14vw,7rem)] font-black leading-[0.9] tracking-[-0.05em]">
                  LET&apos;S
                  <br />
                  <span className="text-fuchsia-400">
                    TALK.
                  </span>
                </h2>

                <p className="mt-7 max-w-xl text-sm leading-7 text-white/40 sm:text-lg sm:leading-8">
                  Punya ide, project, atau
                  ingin bekerja sama? Isi form
                  di samping untuk mengirim
                  pesan.
                </p>

              </div>

              {/* FORM */}

              <div className="min-w-0 border-t border-white/10 p-6 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="w-full space-y-5 sm:space-y-6"
                >

                  <div>

                    <label
                      htmlFor="nama"
                      className="mb-2 block text-xs text-white/50 sm:text-sm"
                    >
                      Nama
                    </label>

                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      placeholder="Masukkan nama kamu"
                      required
                      disabled={
                        sending
                      }
                      className="box-border w-full min-w-0 rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-4 sm:text-base"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs text-white/50 sm:text-sm"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                      disabled={
                        sending
                      }
                      className="box-border w-full min-w-0 rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-4 sm:text-base"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="pesan"
                      className="mb-2 block text-xs text-white/50 sm:text-sm"
                    >
                      Pesan
                    </label>

                    <textarea
                      id="pesan"
                      name="pesan"
                      rows={5}
                      placeholder="Tulis pesan kamu di sini..."
                      required
                      disabled={
                        sending
                      }
                      className="box-border w-full min-w-0 resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-4 sm:text-base"
                    />

                  </div>

                  {/* SUCCESS */}

                  {messageSent && (
                    <div className="rounded-2xl border border-green-400/30 bg-green-400/10 p-4 text-sm leading-6 text-green-300">
                      ✓ Pesan berhasil
                      dikirim!
                      <br />
                      Pesan sudah
                      tersimpan di
                      database dan
                      email berhasil
                      dikirim.
                    </div>
                  )}

                  {/* ERROR */}

                  {messageError && (
                    <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm leading-6 text-red-300">
                      {messageError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="relative z-20 flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-fuchsia-400 px-6 py-3.5 text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-fuchsia-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:py-4"
                  >

                    {sending
                      ? "Mengirim..."
                      : "Kirim Pesan"}

                    {!sending && (
                      <ArrowUpRight
                        size={17}
                      />
                    )}

                  </button>

                </form>

              </div>
            </div>
          </div>

          <div className="mt-12 px-2 text-center sm:mt-16">

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 sm:text-sm sm:tracking-[0.3em]">
              Have an idea?
            </p>

            <p className="mt-3 text-lg font-bold text-white/70 sm:mt-4 sm:text-3xl">
              Let&apos;s turn it into
              something amazing.
            </p>

          </div>

        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="w-full border-t border-white/10 px-5 py-8 sm:px-6 sm:py-10">

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 text-center text-xs text-white/40 sm:text-sm md:flex-row md:items-center md:justify-between md:text-left">

          <p>
            © 2026 Shintya. All rights
            reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5 md:justify-end">

            <a
              href="#home"
              className="transition hover:text-white"
            >
              Home
            </a>

            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>

            <a
              href="#skills"
              className="transition hover:text-white"
            >
              Skills
            </a>

            <a
              href="#projects"
              className="transition hover:text-white"
            >
              Projects
            </a>

            <a
              href="#contact"
              className="transition hover:text-white"
            >
              Contact
            </a>

          </div>
        </div>
      </footer>

      {/* =========================
          PROJECT MODAL
      ========================= */}

      {selectedProject && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md sm:p-6"
          onClick={() =>
            setSelectedProject(
              null
            )
          }
        >

          <div
            className="relative my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.5rem] border border-fuchsia-400/30 bg-[#111111] p-6 shadow-[0_0_80px_rgba(217,70,239,0.25)] sm:rounded-[2rem] sm:p-10"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              onClick={() =>
                setSelectedProject(
                  null
                )
              }
              aria-label="Close project"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-fuchsia-400 hover:bg-fuchsia-400 hover:text-black sm:right-5 sm:top-5"
            >
              <X size={19} />
            </button>

            <p className="pr-12 text-[10px] uppercase tracking-[0.25em] text-fuchsia-400 sm:text-xs sm:tracking-[0.3em]">
              Project /{" "}
              {String(
                selectedProject.id
              ).padStart(2, "0")}
            </p>

            <h2 className="mt-4 break-words pr-10 text-3xl font-black tracking-tight sm:text-5xl">
              {selectedProject.title}
            </h2>

            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/30 sm:text-sm">
              {selectedProject.category}
            </p>

            <div className="my-6 h-px bg-white/10 sm:my-8" />

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-fuchsia-400 sm:text-xs sm:tracking-[0.3em]">
              About Project
            </p>

            <p className="mt-3 text-sm leading-7 text-white/60 sm:mt-4 sm:text-base sm:leading-8">
              {
                selectedProject.description
              }
            </p>

            <button
              type="button"
              onClick={() =>
                setSelectedProject(
                  null
                )
              }
              className="relative z-20 mt-7 cursor-pointer rounded-full bg-fuchsia-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-fuchsia-300 active:scale-95"
            >
              Close Project
            </button>

          </div>
        </div>
      )}

    </main>
  );
}