import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl">

        {/* 404 */}
        <p className="text-8xl md:text-9xl font-bold tracking-tight text-fuchsia-400">
          404
        </p>

        {/* Title */}
        <h1 className="mt-6 text-3xl md:text-4xl font-bold">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-400 leading-relaxed">
          Maaf, halaman yang kamu cari tidak ditemukan atau mungkin
          sudah dipindahkan.
        </p>

        {/* Back Home */}
        <Link
          href="/"
          className="inline-flex items-center justify-center mt-8
          rounded-full bg-fuchsia-400 px-6 py-3
          font-semibold text-black
          transition-all duration-300
          hover:bg-fuchsia-300
          hover:-translate-y-1
          hover:shadow-lg hover:shadow-fuchsia-400/20"
        >
          ← Back to Home
        </Link>

      </div>
    </main>
  );
}

