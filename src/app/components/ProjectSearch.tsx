"use client";

import { Search } from "lucide-react";

type ProjectSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProjectSearch({
  value,
  onChange,
}: ProjectSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={20}
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
      />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari judul proyek..."
        aria-label="Cari judul proyek"
        className="w-full rounded-full border border-white/10 bg-white/[0.03] py-4 pl-14 pr-5 text-white outline-none transition placeholder:text-white/30 focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400"
      />
    </div>
  );
}