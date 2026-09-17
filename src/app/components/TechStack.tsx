const tech = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "TAILWIND",
  "SUPABASE",
  "GIT",
  "FIGMA",
];

export default function TechStack() {
  return (
    <section className="overflow-hidden py-24">
      <p className="mb-10 text-center text-xs uppercase tracking-[.4em] text-white/30">
        Technologies I Work With
      </p>

      <div className="relative flex w-max animate-[marquee_25s_linear_infinite]">
        {[...tech, ...tech].map((item, index) => (
          <div
            key={index}
            className="mx-5 rounded-full border border-white/10 bg-white/3 px-8 py-4 text-sm font-bold text-white/50"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}