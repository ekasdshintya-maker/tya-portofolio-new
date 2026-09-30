import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";

type EditProyekPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateProyekAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const description = String(
    formData.get("description") || ""
  ).trim();
  const category = String(
    formData.get("category") || ""
  ).trim();
  const status = String(
    formData.get("status") || "active"
  ).trim();

  // ==============================
  // VALIDASI
  // ==============================

  if (!id) {
    throw new Error("ID proyek tidak ditemukan.");
  }

  if (!title) {
    throw new Error("Judul proyek wajib diisi.");
  }

  if (!category) {
    throw new Error("Kategori/teknologi proyek wajib diisi.");
  }

  // ==============================
  // SUPABASE
  // ==============================

  const supabase = await createSupabaseServerClient();

  // Pastikan user sudah login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // ==============================
  // UPDATE PROYEK
  // ==============================

  const { error } = await supabase
    .from("proyek")
    .update({
      title,
      description,
      category,
      status,
    })
    .eq("id", id);

  // Jika gagal
  if (error) {
    console.error(
      "Gagal mengupdate proyek:",
      error.message
    );

    throw new Error(
      `Gagal mengupdate proyek: ${error.message}`
    );
  }

  // ==============================
  // REFRESH CACHE
  // ==============================

  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath(`/admin/proyek/edit/${id}`);
  revalidatePath("/");

  // ==============================
  // REDIRECT + TOAST
  // ==============================

  redirect(
    `/admin/proyek?toast=updated`
  );
}

export default async function EditProyekPage({
  params,
}: EditProyekPageProps) {
  const { id } = await params;

  const supabase =
    await createSupabaseServerClient();

  // ==============================
  // CEK LOGIN
  // ==============================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // ==============================
  // AMBIL DATA PROYEK
  // ==============================

  const {
    data: proyek,
    error,
  } = await supabase
    .from("proyek")
    .select(
      "id, title, description, category, status"
    )
    .eq("id", id)
    .single();

  // ==============================
  // JIKA DATA TIDAK DITEMUKAN
  // ==============================

  if (error || !proyek) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

          {/* ICON */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl">
            ⚠️
          </div>

          {/* TITLE */}
          <h1 className="mt-5 text-2xl font-bold text-red-700">
            Proyek Tidak Ditemukan
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-2 text-sm text-red-600">
            Data proyek tidak dapat ditemukan
            di database Supabase.
          </p>

          {/* ID */}
          <p className="mt-2 text-xs text-red-500">
            ID proyek: {id}
          </p>

          {/* ERROR SUPABASE */}
          {error?.message && (
            <p className="mt-2 text-xs text-red-500">
              Error: {error.message}
            </p>
          )}

          {/* BACK */}
          <Link
            href="/admin/proyek"
            className="mt-6 inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg"
          >
            Kembali ke Manajemen Proyek
          </Link>

        </div>
      </div>
    );
  }

  // ==============================
  // FORM EDIT
  // ==============================

  return (
    <div className="mx-auto max-w-3xl">

      {/* ============================== */}
      {/* HEADER */}
      {/* ============================== */}

      <div className="mb-8">

        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">

          <Link
            href="/admin/proyek"
            className="transition hover:text-blue-600"
          >
            Manajemen Proyek
          </Link>

          <span>/</span>

          <span className="text-slate-700">
            Edit
          </span>

        </div>

        <p className="text-sm font-medium text-blue-600">
          Portfolio Management
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Edit Proyek
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Perbarui informasi proyek portfolio kamu.
        </p>

      </div>

      {/* ============================== */}
      {/* FORM CARD */}
      {/* ============================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        <form
          action={updateProyekAction}
          className="space-y-6"
        >

          {/* ============================== */}
          {/* ID */}
          {/* ============================== */}

          <input
            type="hidden"
            name="id"
            value={proyek.id}
          />

          {/* ============================== */}
          {/* TITLE */}
          {/* ============================== */}

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
              defaultValue={proyek.title ?? ""}
              placeholder="Contoh: MyApp"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

          </div>

          {/* ============================== */}
          {/* CATEGORY / TEKNOLOGI */}
          {/* ============================== */}

          <div>

            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Teknologi / Kategori
            </label>

            <input
              id="category"
              name="category"
              type="text"
              required
              defaultValue={proyek.category ?? ""}
              placeholder="Contoh: Next.js, TypeScript, Tailwind CSS"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <p className="mt-1.5 text-xs text-slate-400">
              Masukkan teknologi atau kategori yang digunakan
              pada proyek.
            </p>

          </div>

          {/* ============================== */}
          {/* DESCRIPTION */}
          {/* ============================== */}

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
              rows={5}
              defaultValue={
                proyek.description ?? ""
              }
              placeholder="Jelaskan tentang proyek ini..."
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <p className="mt-1.5 text-xs text-slate-400">
              Jelaskan secara singkat mengenai proyek ini.
            </p>

          </div>

          {/* ============================== */}
          {/* STATUS */}
          {/* ============================== */}

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
              defaultValue={
                proyek.status ?? "active"
              }
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

          {/* ============================== */}
          {/* BUTTON */}
          {/* ============================== */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            {/* BATAL */}

            <Link
              href="/admin/proyek"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              Batal
            </Link>

            {/* SIMPAN */}

            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-xl active:scale-[0.98]"
            >

              {/* SAVE ICON */}

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
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />

                <polyline points="17 21 17 13 7 13 7 21" />

                <polyline points="7 3 7 8 15 8" />
              </svg>

              Simpan Perubahan

            </button>

          </div>

        </form>

      </div>

      {/* ============================== */}
      {/* INFO */}
      {/* ============================== */}

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">

        <p className="text-sm text-blue-700">
          Perubahan akan langsung disimpan ke
          database Supabase setelah tombol{" "}
          <strong>Simpan Perubahan</strong> ditekan.
        </p>

      </div>

    </div>
  );
}