import { revalidatePath } from "next/cache";
import Link from "next/link";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";

async function tambahProyekAction(formData: FormData) {
  "use server";

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();

  if (!title) {
    throw new Error("Judul proyek wajib diisi.");
  }

  if (!category) {
    throw new Error("Teknologi/kategori wajib diisi.");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("proyek").insert({
    title,
    description,
    category,
  });

  if (error) {
    console.error("Gagal menambah proyek:", error);
    throw new Error(`Gagal menambah proyek: ${error.message}`);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/proyek");
  revalidatePath("/");
}

export default async function AdminProyekPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: daftarProyek,
    error,
  } = await supabase
    .from("proyek")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-lg font-bold text-red-700">
          Gagal mengambil data proyek
        </h1>

        <p className="mt-2 text-sm text-red-600">
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <p className="text-sm font-semibold text-blue-600">
          Portfolio Admin
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Manajemen Proyek
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Kelola semua proyek portfolio melalui dashboard admin.
        </p>
      </div>


      {/* ================= DAFTAR PROYEK ================= */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* HEADER DAFTAR */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Daftar Proyek
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Proyek yang tersimpan di database Supabase.
            </p>
          </div>

          <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            {daftarProyek?.length || 0} Proyek
          </div>

        </div>


        {/* DATA PROYEK */}
        {daftarProyek && daftarProyek.length > 0 ? (

          <div className="divide-y divide-slate-100">

            {daftarProyek.map((proyek, index) => {

              const isActive =
                proyek.status?.toLowerCase() === "active" ||
                proyek.status?.toLowerCase() === "aktif";

              return (
                <div
                  key={proyek.id}
                  className="group p-6 transition-all duration-300 hover:bg-slate-50"
                  style={{
                    animation: `fadeInUp .4s ease-out ${
                      index * 80
                    }ms both`,
                  }}
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* INFORMASI PROYEK */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                          {proyek.title || "Tanpa Judul"}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            isActive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isActive ? "Active" : "Project"}
                        </span>

                      </div>


                      {/* DESKRIPSI */}
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {proyek.description ||
                          "Tidak ada deskripsi."}
                      </p>


                      {/* TEKNOLOGI */}
                      <div className="mt-3 flex flex-wrap gap-2">

                        {proyek.category
                          ?.split(",")
                          .map(
                            (
                              technology: string,
                              techIndex: number
                            ) => (
                              <span
                                key={techIndex}
                                className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
                              >
                                {technology.trim()}
                              </span>
                            )
                          )}

                      </div>

                    </div>


                    {/* CRUD BUTTON */}
                    <div className="flex shrink-0 gap-2">

                      {/* EDIT */}
                      <Link
                        href={`/admin/proyek/edit/${proyek.id}`}
                        className="group/edit inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-700 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md"
                      >
                        <span className="transition-transform duration-300 group-hover/edit:rotate-12">
                          ✎
                        </span>

                        Edit
                      </Link>


                      {/* HAPUS */}
                      <Link
                        href={`/admin/proyek/hapus/${proyek.id}`}
                        className="group/delete inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition-all duration-300 hover:-translate-y-1 hover:bg-red-100 hover:shadow-md"
                      >
                        <span className="text-base transition-transform duration-300 group-hover/delete:scale-125">
                          ×
                        </span>

                        Hapus
                      </Link>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          /* KOSONG */
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              📁
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Belum ada proyek
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Tambahkan proyek pertama menggunakan tombol
              Tambah Proyek di bawah.
            </p>

          </div>

        )}

      </section>


      {/* ================= TAMBAH PROYEK ================= */}

      {/* SATU-SATUNYA BUTTON TAMBAH PROYEK */}
      <div className="flex justify-end">

        <a
          href="#tambah"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl"
        >

          <span className="text-xl transition-transform duration-300 group-hover:rotate-90">
            +
          </span>

          Tambah Proyek

        </a>

      </div>


      {/* ================= FORM ================= */}

      <section
        id="tambah"
        className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        <div className="mb-6">

          <p className="text-sm font-semibold text-blue-600">
            CREATE
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Tambah Proyek Baru
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Isi data proyek kemudian tekan tombol Simpan Proyek.
          </p>

        </div>


        <form
          action={tambahProyekAction}
          className="space-y-5"
        >

          {/* JUDUL */}
          <div>

            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Judul Proyek
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Contoh: MyApp"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

          </div>


          {/* TEKNOLOGI */}
          <div>

            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Teknologi
            </label>

            <input
              id="category"
              name="category"
              type="text"
              required
              placeholder="Next.js, TypeScript, Tailwind CSS"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

          </div>


          {/* DESKRIPSI */}
          <div>

            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Deskripsi
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Tuliskan deskripsi proyek..."
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

          </div>


          {/* BUTTON SIMPAN */}
          <div className="flex justify-end">

            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl active:translate-y-0"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>

              Simpan Proyek

            </button>

          </div>

        </form>

      </section>


      {/* ================= ANIMATION ================= */}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}