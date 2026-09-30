"use client";

import { useState } from "react";

type LoginFormProps = {
  loginAction: (formData: FormData) => Promise<void>;
  error?: string;
};

export default function LoginForm({
  loginAction,
  error,
}: LoginFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    try {
      await loginAction(formData);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {/* ERROR */}
      {error && (
        <div className="animate-[shake_0.4s_ease-in-out] rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* EMAIL */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="admin@gmail.com"
          required
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </div>

      {/* LOGIN BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
      >
        {/* Efek cahaya */}
        {!loading && (
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}

        {loading ? (
          <>
            {/* SPINNER */}
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            <span className="animate-pulse">
              Memproses...
            </span>
          </>
        ) : (
          <>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Login
            </span>

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
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        Secure Admin Panel
      </p>
    </form>
  );
}