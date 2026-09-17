"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["Home", "About", "Projects", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="#home"
          className="text-2xl font-black tracking-tight"
        >
          Shintya<span className="text-fuchsia-400">.</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-white/60 transition hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full border border-fuchsia-400/40 px-5 py-2 text-sm transition hover:bg-fuchsia-400 hover:text-black md:block"
        >
          Let's Talk
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}