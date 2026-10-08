import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";

interface DetailProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: DetailProps): Promise<Metadata> {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: proyek } = await supabase
    .from("proyek")
    .select("judul, deskripsi")
    .eq("id", id)
    .single();

  if (!proyek) {
    return {
      title: "Proyek Tidak Ditemukan",
      description: "Proyek yang kamu cari tidak ditemukan.",
    };
  }

  return {
    title: proyek.judul,

    description:
      proyek.deskripsi ||
      `Detail proyek ${proyek.judul} milik Shintya.`,

    openGraph: {
      title: proyek.judul,

      description:
        proyek.deskripsi ||
        `Detail proyek ${proyek.judul} milik Shintya.`,

      type: "article",
    },
  };
}

export default async function DetailProyekPage({
  params,
}: DetailProps) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: proyek } = await supabase
    .from("proyek")
    .select("*")
    .eq("id", id)
    .single();

  if (!proyek) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-400">
          Project Detail
        </p>

        <h1 className="mt-5 text-5xl font-black">
          {proyek.judul}
        </h1>

        <p className="mt-6 leading-8 text-white/60">
          {proyek.deskripsi}
        </p>

        <div className="mt-8">
          <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-300">
            {proyek.teknologi}
          </span>
        </div>
      </div>
    </main>
  );
}