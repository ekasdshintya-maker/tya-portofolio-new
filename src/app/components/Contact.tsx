"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  GitBranch,
  MessageCircle,
} from "lucide-react";

const contacts = [
  {
    icon: Mail,
    title: "Email",
    value: "shintya@example.com",
    href: "mailto:shintya@example.com",
  },
  {
    icon: GitBranch,
    title: "GitHub",
    value: "github.com/shintya",
    href: "#",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Let's chat",
    href: "#",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Main Contact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]"
        >
          <div className="grid lg:grid-cols-[1.2fr_.8fr]">

            {/* Left */}
            <div className="p-8 sm:p-14 lg:p-20">

              <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">
                Get In Touch
              </p>

              <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
                LET'S
                <br />
                <span className="text-fuchsia-400">
                  TALK.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-base leading-8 text-white/40 sm:text-lg">
                Punya ide, project, atau ingin bekerja sama?
                Jangan ragu untuk menghubungi saya. Saya selalu
                terbuka untuk berdiskusi mengenai website dan
                teknologi.
              </p>

              <a
                href="mailto:shintya@example.com"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-fuchsia-400 px-7 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-fuchsia-300"
              >
                Send Me a Message

                <ArrowUpRight
                  size={18}
                  className="transition group-hover:rotate-45"
                />
              </a>
            </div>

            {/* Right */}
            <div className="border-t border-white/10 p-8 sm:p-14 lg:border-l lg:border-t-0 lg:p-12">

              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                Contact Information
              </p>

              <div className="mt-8 space-y-3">
                {contacts.map((contact) => {
                  const Icon = contact.icon;

                  return (
                    <a
                      key={contact.title}
                      href={contact.href}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 p-4 transition duration-300 hover:border-fuchsia-400/40 hover:bg-fuchsia-400/[0.04]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
                        <Icon
                          size={19}
                          className="text-fuchsia-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-white/30">
                          {contact.title}
                        </p>

                        <p className="mt-1 truncate text-sm text-white/70 transition group-hover:text-white">
                          {contact.value}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="ml-auto shrink-0 text-white/20 transition group-hover:rotate-45 group-hover:text-fuchsia-400"
                      />
                    </a>
                  );
                })}
              </div>

            </div>
          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/20">
            Have an idea?
          </p>

          <p className="mt-4 text-2xl font-bold text-white/70 sm:text-3xl">
            Let's turn it into something amazing.
          </p>
        </motion.div>

      </div>
    </section>
  );
}