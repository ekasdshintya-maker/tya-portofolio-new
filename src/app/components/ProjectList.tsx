"use client";

import { useState } from "react";
import { projects } from "@/app/data/project";

export default function ProjectList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || project.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari judul proyek..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      {/* Filter */}
      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setCategory("All")}
          className={`rounded-full px-5 py-2 transition ${
            category === "All"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setCategory("Featured")}
          className={`rounded-full px-5 py-2 transition ${
            category === "Featured"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Featured
        </button>

        <button
          onClick={() => setCategory("School")}
          className={`rounded-full px-5 py-2 transition ${
            category === "School"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          School
        </button>
      </div>

      {/* Project Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm">
              {project.category}
            </span>

            <h3 className="mb-2 text-xl font-semibold">
              {project.title}
            </h3>

            <p className="text-gray-600">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* Tidak ada hasil */}
      {filteredProjects.length === 0 && (
        <p className="py-10 text-center text-gray-500">
          Proyek tidak ditemukan.
        </p>
      )}
    </section>
  );
}