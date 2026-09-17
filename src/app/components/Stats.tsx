"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "01",
    title: "Web Developer",
    text: "Building modern websites",
  },
  {
    number: "02",
    title: "UI / UX",
    text: "Designing useful interfaces",
  },
  {
    number: "03",
    title: "Responsive",
    text: "Mobile friendly experience",
  },
  {
    number: "04",
    title: "Creative",
    text: "Ideas into digital products",
  },
];

export default function Stats() {
  return (
    <section className="border-y border-white/10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((stat, index) => (
          <motion.div
            key={stat.number}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
            }}
            className="group border-b border-white/10 p-8 transition duration-300 hover:bg-fuchsia-400/3 sm:border-r lg:border-b-0 last:border-r-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-fuchsia-400">
                {stat.number}
              </span>

              <span className="text-xs text-white/20">
                2026
              </span>
            </div>

            <h3 className="mt-8 text-xl font-bold transition group-hover:text-fuchsia-300">
              {stat.title}
            </h3>

            <p className="mt-2 text-sm text-white/30">
              {stat.text}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}