import Link from "next/link";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();

  const { data: projects, error } = await supabase
    .from("proyek")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
        Gagal mengambil data proyek.
      </div>
    );
  }

  const totalProjects = projects?.length ?? 0;

  const activeProjects =
    projects?.filter(
      (project) =>
        project.status?.toLowerCase() === "active" ||
        project.status?.toLowerCase() === "aktif"
    ) ?? [];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="animate-[fadeIn_.5s_ease-out]">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Welcome back 👋
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Ringkasan project portfolio kamu.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* TOTAL PROJECT */}
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100 opacity-60 blur-2xl transition-all duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Jumlah Proyek
              </p>

              <h2 className="mt-3 text-4xl font-bold text-slate-900">
                {totalProjects}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Total proyek di database
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              📁
            </div>
          </div>
        </div>

        {/* ACTIVE PROJECT */}
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100 opacity-60 blur-2xl transition-all duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Proyek Status Aktif
              </p>

              <h2 className="mt-3 text-4xl font-bold text-emerald-600">
                {activeProjects.length}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Proyek yang sedang aktif
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              ✓
            </div>
          </div>
        </div>

      </div>

      {/* PROJECT SECTION */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* HEADER */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Proyek Aktif
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Proyek yang sedang ditampilkan sebagai aktif.
            </p>
          </div>

          <Link
            href="/admin/proyek"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg"
          >
            Kelola Proyek

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

        {/* PROJECT LIST */}
        <div>
          {activeProjects.length > 0 ? (
            activeProjects.map((project, index) => (
              <div
                key={project.id}
                className="group flex flex-col gap-4 border-b border-slate-100 p-6 transition-all duration-300 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  animation: `fadeInUp .5s ease-out ${index * 100}ms both`,
                }}
              >
                <div>
                  <h3 className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                    {project.title || project.judul || "Tanpa Judul"}
                  </h3>

                  <p className="mt-1 max-w-3xl text-sm text-slate-500">
                    {project.description || project.deskripsi || "-"}
                  </p>

                  <p className="mt-2 text-xs font-medium text-blue-500">
                    {project.category || project.teknologi || "-"}
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Active
                </span>
              </div>
            ))
          ) : (
            <div className="p-10 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                📂
              </div>

              <p className="font-medium text-slate-700">
                Belum ada proyek aktif
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Tambahkan proyek melalui Manajemen Proyek.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* QUICK ACTION */}
      <div className="rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 p-6 text-white shadow-xl">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-medium text-slate-300">
              Portfolio Management
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Kelola portfolio kamu
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Tambahkan, edit, atau hapus project portfolio.
            </p>
          </div>

          <Link
            href="/admin/proyek"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-lg"
          >
            Buka Manajemen

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

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