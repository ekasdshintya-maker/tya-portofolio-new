"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Search,
  Star,
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Coffe Night",
    category: "Coffee Shop Website",
    description:
      "Website coffee shop modern yang dibuat untuk menampilkan menu, informasi produk, dan memberikan pengalaman pemesanan yang lebih mudah kepada pelanggan.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    featured: true,
  },
  {
    number: "02",
    title: "Student Management",
    category: "Management System",
    description:
      "Sistem pengelolaan data siswa yang dirancang untuk membantu mengatur informasi siswa dengan tampilan dashboard yang sederhana dan mudah digunakan.",
    tech: ["Next.js", "React", "TypeScript"],
    featured: true,
  },
  {
    number: "03",
    title: "MyApp",
    category: "Web Application",
    description:
      "Konsep aplikasi web dengan tampilan modern dan responsive yang dibuat untuk mengeksplorasi pengembangan interface dan interaksi pengguna.",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    featured: false,
  },
];

export default function Projects() {
  const [search, setSearch] = useState("");
  const [showFeatured, setShowFeatured] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFeatured = showFeatured
      ? project.featured
      : true;

    return matchesSearch && matchesFeatured;
  });

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">
              Selected Work
            </p>

            <h2 className="mt-5 text-5xl font-black leading-none tracking-tight sm:text-7xl lg:text-8xl">
              MY
              <br />
              <span className="text-fuchsia-400">
                PROJECTS.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-white/40">
            Beberapa project yang dibuat sebagai bagian dari
            perjalanan belajar dan mengembangkan kemampuan dalam
            web development.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              type="text"
              placeholder="Search project title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-5 text-sm text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-fuchsia-400/60 focus:bg-white/10"
            />
          </div>

          {/* Featured Filter */}
          <button
            type="button"
            onClick={() => setShowFeatured(!showFeatured)}
            className={`flex items-center justify-center gap-2 rounded-2xl border px-6 py-4 text-sm font-medium transition duration-300 ${
              showFeatured
                ? "border-fuchsia-400 bg-fuchsia-400 text-black"
                : "border-white/10 bg-white/5 text-white/60 hover:border-fuchsia-400/50 hover:text-fuchsia-400"
            }`}
          >
            <Star
              size={18}
              className={showFeatured ? "fill-current" : ""}
            />

            {showFeatured
              ? "Featured Projects"
              : "Show Featured"}
          </button>
        </motion.div>

        {/* Search Result Info */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            {filteredProjects.length} Project
            {filteredProjects.length !== 1 ? "s" : ""}
          </p>

          {(search || showFeatured) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setShowFeatured(false);
              }}
              className="text-xs text-fuchsia-400 transition hover:text-fuchsia-300"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Projects */}
        <div className="mt-8 space-y-5">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.article
                key={project.number}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/2 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-fuchsia-400/3 hover:shadow-lg hover:shadow-fuchsia-500/10 sm:p-10"
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1.5 text-xs text-fuchsia-400">
                    <Star size={12} className="fill-current" />
                    Featured
                  </div>
                )}

                <div className="flex flex-col gap-8 md:flex-row md:items-center">
                  {/* Number */}
                  <div className="flex shrink-0 items-center gap-4 md:w-28">
                    <span className="text-sm text-fuchsia-400">
                      / {project.number}
                    </span>
                  </div>

                  {/* Main */}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                      {project.category}
                    </p>

                    <h3 className="mt-3 text-3xl font-black tracking-tight transition duration-300 group-hover:text-fuchsia-300 sm:text-5xl">
                      {project.title}
                    </h3>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
                      {project.description}
                    </p>

                    {/* Tech */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/40 transition duration-300 group-hover:border-fuchsia-400/20"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 transition duration-300 hover:border-fuchsia-400 hover:bg-fuchsia-400 hover:text-black"
                      aria-label={`Open ${project.title}`}
                    >
                      <ExternalLink size={19} />
                    </button>

                    <button
                      type="button"
                      className="hidden h-14 w-14 items-center justify-center rounded-full border border-white/10 transition duration-300 hover:border-fuchsia-400 hover:bg-fuchsia-400 hover:text-black sm:flex"
                      aria-label={`GitHub ${project.title}`}
                    >
                      <Code2 size={19} />
                    </button>
                  </div>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-fuchsia-400 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center"
            >
              <Search
                size={40}
                className="mx-auto text-white/20"
              />

              <h3 className="mt-5 text-xl font-bold text-white">
                Project tidak ditemukan
              </h3>

              <p className="mt-2 text-sm text-white/40">
                Coba gunakan kata kunci lain atau reset filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setShowFeatured(false);
                }}
                className="mt-6 rounded-full bg-fuchsia-400 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-fuchsia-300"
              >
                Reset Filter
              </button>
            </motion.div>
          )}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-white/30">
            More projects coming soon.
          </p>

          <a
            href="#contact"
            className="group flex items-center gap-2 text-sm text-white transition hover:text-fuchsia-400"
          >
            Start a project

            <ArrowUpRight
              size={17}
              className="transition group-hover:rotate-45"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

