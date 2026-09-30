import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";

async function hapusProyekAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    throw new Error("ID proyek tidak ditemukan.");
  }

  const supabase = await createSupabaseServerClient();

  // ==========================================
  // CEK LOGIN
  // ==========================================
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // ==========================================
  // HAPUS DATA DARI SUPABASE
  // ==========================================
  const { error } = await supabase
    .from("proyek")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Gagal menghapus proyek:", error.message);

    throw new Error(
      `Gagal menghapus proyek: ${error.message}`
    );
  }

  // ==========================================
  // REFRESH DATA
  // ==========================================
  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/");

  // ==========================================
  // KEMBALI KE HALAMAN PROYEK
  // DENGAN TOAST SUCCESS
  // ==========================================
  redirect("/admin/proyek?toast=deleted");
}

export default async function HapusProyekPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  // ==========================================
  // CEK LOGIN
  // ==========================================
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // ==========================================
  // AMBIL DATA PROYEK
  // SESUAI STRUKTUR SUPABASE
  //
  // id
  // judul
  // deskripsi
  // teknologi
  // status
  // ==========================================
  const {
    data: proyek,
    error,
  } = await supabase
    .from("proyek")
    .select("id, judul, deskripsi, teknologi, status")
    .eq("id", id)
    .single();

  // ==========================================
  // JIKA PROYEK TIDAK DITEMUKAN
  // ==========================================
  if (error || !proyek) {
    redirect("/admin/proyek?toast=not-found");
  }

  return (
    <div className="mx-auto max-w-xl">

      {/* ====================================== */}
      {/* CARD */}
      {/* ====================================== */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

        {/* ==================================== */}
        {/* HEADER */}
        {/* ==================================== */}
        <div className="border-b border-red-100 bg-gradient-to-br from-red-50 to-white p-8">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-3xl shadow-sm">
            🗑️
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-red-600">
            Delete Project
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Hapus Proyek
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Apakah kamu yakin ingin menghapus proyek ini?
            Data yang sudah dihapus tidak dapat dikembalikan.
          </p>
        </div>

        {/* ==================================== */}
        {/* DETAIL PROYEK */}
        {/* ==================================== */}
        <div className="p-8">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:shadow-md">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Proyek yang akan dihapus
            </p>

            {/* JUDUL */}
            <h2 className="mt-3 text-xl font-bold text-slate-900">
              {proyek.judul || "Tanpa Judul"}
            </h2>

            {/* DESKRIPSI */}
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {proyek.deskripsi || "Tidak ada deskripsi."}
            </p>

            {/* TEKNOLOGI */}
            <div className="mt-5">

              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Teknologi
              </p>

              <div className="flex flex-wrap gap-2">

                {proyek.teknologi ? (
                  proyek.teknologi
                    .split(",")
                    .map((tech: string, index: number) => (
                      <span
                        key={`${tech}-${index}`}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600"
                      >
                        {tech.trim()}
                      </span>
                    ))
                ) : (
                  <span className="text-sm text-slate-400">
                    Tidak ada teknologi
                  </span>
                )}

              </div>
            </div>

            {/* STATUS */}
            <div className="mt-5">

              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </p>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  proyek.status === "active"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    proyek.status === "active"
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />

                {proyek.status === "active"
                  ? "Active"
                  : proyek.status || "Inactive"}
              </span>

            </div>
          </div>

          {/* ==================================== */}
          {/* WARNING */}
          {/* ==================================== */}
          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">

            <div className="flex gap-3">

              <span className="text-lg">
                ⚠️
              </span>

              <div>

                <p className="text-sm font-semibold text-red-700">
                  Perhatian
                </p>

                <p className="mt-1 text-xs leading-5 text-red-600">
                  Setelah proyek dihapus, data proyek ini
                  tidak dapat dipulihkan kembali.
                </p>

              </div>

            </div>
          </div>

          {/* ==================================== */}
          {/* BUTTON */}
          {/* ==================================== */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            {/* BATAL */}
            <Link
              href="/admin/proyek"
              className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
            >
              Batal
            </Link>

            {/* HAPUS */}
            <form
              action={hapusProyekAction}
              className="flex-1"
            >

              <input
                type="hidden"
                name="id"
                value={proyek.id}
              />

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl active:translate-y-0"
              >

                <span className="transition-transform duration-300 group-hover:scale-110">
                  🗑️
                </span>

                Ya, Hapus Proyek

              </button>

            </form>

          </div>

        </div>
      </div>

    </div>
  );
}