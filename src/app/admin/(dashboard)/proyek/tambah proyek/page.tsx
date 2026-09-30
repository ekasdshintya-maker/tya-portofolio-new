import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";

async function tambahProyekAction(formData: FormData) {
  "use server";

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const status = String(formData.get("status") || "active").trim();

  // ==========================================
  // VALIDASI
  // ==========================================

  if (!title) {
    redirect(
      "/admin/proyek?toast=Judul proyek wajib diisi&type=error"
    );
  }

  if (!category) {
    redirect(
      "/admin/proyek?toast=Kategori proyek wajib diisi&type=error"
    );
  }

  // ==========================================
  // SUPABASE
  // ==========================================

  const supabase = await createSupabaseServerClient();

  // Pastikan user sudah login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // ==========================================
  // INSERT DATA
  // ==========================================

  const { error } = await supabase
    .from("proyek")
    .insert({
      title,
      description,
      category,
      status,
    });

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    console.error("Gagal menambah proyek:", error.message);

    redirect(
      `/admin/proyek?toast=${encodeURIComponent(
        `Gagal menambah proyek: ${error.message}`
      )}&type=error`
    );
  }

  // ==========================================
  // REFRESH CACHE
  // ==========================================

  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/");
  revalidatePath("/proyek");

  // ==========================================
  // BERHASIL
  // ==========================================

  redirect(
    "/admin/proyek?toast=Proyek berhasil ditambahkan&type=success"
  );
}

export default async function AdminProyekPage() {
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
  // ==========================================

  const {
    data: daftarProyek,
    error,
  } = await supabase
    .from("proyek")
    .select(
      "id, title, description, category, status"
    )
    .order("id", {
      ascending: false,
    });

  // ==========================================
  // ERROR DATABASE
  // ==========================================

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Gagal mengambil data proyek
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-medium text-blue-600">
            Portfolio Management
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Manajemen Proyek
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Tambahkan, lihat, edit, atau hapus proyek portfolio kamu.
          </p>
        </div>

        {/* TOMBOL TAMBAH */}

        <a
          href="#tambah"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl"
        >
          <span className="text-lg transition-transform duration-300 group-hover:rotate-90">
            +
          </span>

          Tambah Proyek
        </a>

      </div>

      {/* ==========================================
          DAFTAR PROYEK
      ========================================== */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* HEADER TABLE */}

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Daftar Proyek
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Semua proyek yang tersimpan di database Supabase.
              </p>
            </div>

            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              {daftarProyek?.length ?? 0} Proyek
            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px] text-sm">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left font-semibold text-slate-600">
                  Judul
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-600">
                  Kategori
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-600">
                  Deskripsi
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-600">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {daftarProyek?.map((proyek) => (

                <tr
                  key={proyek.id}
                  className="group transition-all duration-200 hover:bg-slate-50"
                >

                  {/* JUDUL */}

                  <td className="px-6 py-5">

                    <p className="font-semibold text-slate-900">
                      {proyek.title || "Tanpa Judul"}
                    </p>

                  </td>

                  {/* KATEGORI */}

                  <td className="px-6 py-5">

                    <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                      {proyek.category || "-"}
                    </span>

                  </td>

                  {/* DESKRIPSI */}

                  <td className="px-6 py-5">

                    <p className="max-w-sm truncate text-xs text-slate-500">
                      {proyek.description || "-"}
                    </p>

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">

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

                  </td>

                  {/* AKSI */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      {/* EDIT */}

                      <Link
                        href={`/admin/proyek/edit/${proyek.id}`}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white"
                      >
                        Edit
                      </Link>

                      {/* HAPUS */}

                      <Link
                        href={`/admin/proyek/hapus/${proyek.id}`}
                        className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:text-white"
                      >
                        Hapus
                      </Link>

                    </div>

                  </td>

                </tr>

              ))}

              {/* TIDAK ADA DATA */}

              {(!daftarProyek ||
                daftarProyek.length === 0) && (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center"
                  >

                    <div className="mx-auto flex max-w-sm flex-col items-center">

                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                        📁
                      </div>

                      <h3 className="font-semibold text-slate-800">
                        Belum ada proyek
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Tambahkan proyek pertama kamu menggunakan form di bawah.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* ==========================================
          FORM TAMBAH PROYEK
      ========================================== */}

      <section
        id="tambah"
        className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >

        <div className="mb-6">

          <p className="text-sm font-medium text-blue-600">
            Create Project
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Tambah Proyek Baru
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Isi informasi proyek kemudian simpan ke database Supabase.
          </p>

        </div>

        {/* FORM */}

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
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

          </div>

          {/* KATEGORI */}

          <div>

            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Kategori
            </label>

            <input
              id="category"
              name="category"
              type="text"
              required
              placeholder="Contoh: Web Application"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <p className="mt-1.5 text-xs text-slate-400">
              Contoh: Web Application, Management System, Sleep Tracker.
            </p>

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
              placeholder="Jelaskan tentang proyek ini..."
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

          </div>

          {/* STATUS */}

          <div>

            <label
              htmlFor="status"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Status Proyek
            </label>

            <select
              id="status"
              name="status"
              defaultValue="active"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>

            </select>

          </div>

          {/* BUTTON */}

          <div className="flex flex-col gap-3 pt-3 sm:flex-row">

            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl active:scale-95"
            >

              <span className="text-lg transition-transform duration-300 group-hover:rotate-90">
                +
              </span>

              Simpan Proyek

            </button>

            <Link
              href="/admin/proyek"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50"
            >
              Batal
            </Link>

          </div>

        </form>

      </section>

    </div>
  );
}