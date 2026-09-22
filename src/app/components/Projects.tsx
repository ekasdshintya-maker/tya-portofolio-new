"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Search,
} from "lucide-react";
import { supabase } from "../lib/supabase";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("proyek")
        .select("id, title, category, description")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setProjects(data ?? []);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const keyword = search.toLowerCase();

    return (
      project.title.toLowerCase().includes(keyword) ||
      project.category.toLowerCase().includes(keyword)
    );
  });

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-32"
    >
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}
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
            perjalanan belajar dan mengembangkan kemampuan
            dalam web development.
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="mt-12">
          <div className="relative">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              type="text"
              placeholder="Search project title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-fuchsia-400/60"
            />
          </div>
        </div>

        {/* JUMLAH PROJECT */}
        <div className="mt-6 flex justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            {filteredProjects.length} Project
            {filteredProjects.length !== 1 ? "s" : ""}
          </p>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-fuchsia-400"
            >
              Reset Search
            </button>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center">
            <p className="text-white/40">
              Memuat project dari Supabase...
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-400/5 px-6 py-16 text-center">
            <p className="text-red-400">
              Gagal mengambil project:
            </p>

            <p className="mt-2 text-sm text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* PROJECT LIST */}
        {!loading && !error && (
          <div className="mt-8 space-y-5">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
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
                  className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/2 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-fuchsia-400/40 sm:p-10"
                >
                  <div className="flex flex-col gap-8 md:flex-row md:items-center">

                    {/* NOMOR */}
                    <div className="shrink-0 md:w-28">
                      <span className="text-sm text-fuchsia-400">
                        / {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* DATA DARI SUPABASE */}
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                        {project.category}
                      </p>

                      <h3 className="mt-3 text-3xl font-black tracking-tight group-hover:text-fuchsia-300 sm:text-5xl">
                        {project.title}
                      </h3>

                      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
                        {project.description}
                      </p>
                    </div>

                    {/* BUTTON */}
                    <button
                      type="button"
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 transition hover:border-fuchsia-400 hover:bg-fuchsia-400 hover:text-black"
                      aria-label={`Open ${project.title}`}
                    >
                      <ExternalLink size={19} />
                    </button>
                  </div>

                  {/* HOVER LINE */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-fuchsia-400 transition-all duration-500 group-hover:w-full" />
                </motion.article>
              ))
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center">
                <Search
                  size={40}
                  className="mx-auto text-white/20"
                />

                <h3 className="mt-5 text-xl font-bold">
                  Project tidak ditemukan
                </h3>

                <p className="mt-2 text-sm text-white/40">
                  Coba gunakan kata kunci lain.
                </p>
              </div>
            )}
          </div>
        )}

        {/* BOTTOM */}
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
            className="group flex items-center gap-2 text-sm text-white hover:text-fuchsia-400"
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