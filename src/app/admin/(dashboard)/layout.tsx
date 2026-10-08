import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";
import AdminToast from "@/app/components/AdminToast";

async function logoutAction() {
  "use server";

  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/admin/login");
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminToast />

      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm">
          {/* LOGO */}
          <div className="flex h-20 items-center border-b border-slate-200 px-6">
            <Link href="/admin" className="group block">
              <h1 className="text-xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
                Shintya.
              </h1>

              <p className="text-xs text-slate-500">
                Admin Panel
              </p>
            </Link>
          </div>

          {/* MENU */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </p>

            <div className="space-y-2">
              <Link
                href="/admin"
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:scale-110"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>

                Dashboard
              </Link>

              <Link
                href="/admin/proyek"
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:scale-110"
                >
                  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                </svg>

                Manajemen Proyek
              </Link>

              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:scale-110"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>

                Lihat Portofolio
              </Link>
            </div>
          </nav>

          {/* USER */}
          <div className="border-t border-slate-200 p-4">
            <div className="mb-3 rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-400">
                Login sebagai
              </p>

              <p className="mt-1 truncate text-sm font-medium text-slate-700">
                {user.email}
              </p>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>

                Logout
              </button>
            </form>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="ml-64 min-h-screen flex-1">
          <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-8 shadow-sm backdrop-blur">
            <div>
              <p className="text-sm text-slate-400">
                Admin Panel
              </p>

              <h2 className="text-lg font-semibold text-slate-800">
                Portfolio Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-slate-700">
                  Administrator
                </p>

                <p className="max-w-[220px] truncate text-xs text-slate-400">
                  {user.email}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-sm">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}