import { createSupabaseServerClient } from "@/app/lib/supabase-server";
import { redirect } from "next/navigation";
import LoginForm from "../login/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect(
      "/admin/login?error=Email dan password wajib diisi"
    );
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      `/admin/login?error=${encodeURIComponent(
        "Email atau password salah"
      )}`
    );
  }

  redirect("/admin");
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4">
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 animate-pulse rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 animate-pulse rounded-full bg-purple-200/30 blur-3xl [animation-delay:1s]" />
      </div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-10">
          {/* LOGO */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white shadow-lg shadow-slate-900/20">
              S.
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Login ke Admin Panel Portfolio
            </p>
          </div>

          {/* FORM */}
          <LoginForm
            loginAction={loginAction}
            error={params.error}
          />

          {/* FOOTER */}
          <div className="mt-8 border-t border-slate-100 pt-6 text-center">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Shintya Portfolio
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}