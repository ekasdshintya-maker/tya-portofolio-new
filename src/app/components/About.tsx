"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Smartphone,
  Sparkles,
} from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Membangun website modern, cepat, responsive, dan mudah digunakan.",
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    description:
      "Membuat tampilan interface yang menarik dengan pengalaman pengguna yang nyaman.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Memastikan website dapat tampil dengan baik di desktop, tablet, maupun smartphone.",
  },
  {
    icon: Sparkles,
    title: "Creative Development",
    description:
      "Menggabungkan desain, animasi, dan teknologi untuk membuat website lebih hidup.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">
            About Me
          </p>

          <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            WHO IS
            <br />
            <span className="text-fuchsia-400">SHINTYA?</span>
          </h2>
        </motion.div>

        {/* Content */}
        <div className="mt-20 grid gap-16 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-4xl border border-white/10 bg-white/3 p-8 sm:p-10">

              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-400 text-2xl font-black text-black">
                  S
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Shintya
                  </h3>

                  <p className="text-sm text-white/40">
                    Web Developer
                  </p>
                </div>
              </div>

              <p className="text-lg leading-8 text-white/60">
                Halo! Saya <span className="font-semibold text-white">
                  Shintya
                </span>, seorang yang memiliki ketertarikan
                pada dunia teknologi, website development, dan
                desain digital.
              </p>

              <p className="mt-6 text-lg leading-8 text-white/60">
                Saya suka mempelajari teknologi baru dan mengubah
                ide menjadi sebuah website yang memiliki tampilan
                menarik, responsive, dan mudah digunakan.
              </p>

              <p className="mt-6 text-lg leading-8 text-white/60">
                Bagi saya, sebuah website bukan hanya tentang kode.
                Desain, pengalaman pengguna, performa, dan detail
                kecil juga menjadi bagian penting dalam proses
                pembuatannya.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-3xl font-black text-fuchsia-400">
                    01
                  </p>
                  <p className="mt-2 text-sm text-white/40">
                    Creative
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-3xl font-black text-fuchsia-400">
                    02
                  </p>
                  <p className="mt-2 text-sm text-white/40">
                    Developer
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  className="group rounded-3xl border border-white/10 bg-white/3 p-7 transition duration-300 hover:border-fuchsia-400/40 hover:bg-fuchsia-400/4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 transition group-hover:border-fuchsia-400/50">
                    <Icon
                      size={22}
                      className="text-fuchsia-400"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {skill.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/40">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}