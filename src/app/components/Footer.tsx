export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-white/40 md:flex-row">
        <p>
          © 2026 Shintya. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a href="#" className="transition hover:text-white">
            Instagram
          </a>

          <a href="#" className="transition hover:text-white">
            GitHub
          </a>

          <a href="#" className="transition hover:text-white">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}