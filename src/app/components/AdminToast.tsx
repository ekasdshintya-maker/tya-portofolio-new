"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ToastType = "created" | "updated" | "deleted" | "error";

export default function AdminToast() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const toast = searchParams.get("toast") as ToastType | null;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Toast hanya boleh muncul di dashboard
    if (pathname !== "/admin") {
      setVisible(false);
      return;
    }

    if (!toast) {
      setVisible(false);
      return;
    }

    // Tampilkan toast
    setVisible(true);

    // Hilangkan otomatis setelah 4 detik
    const timer = setTimeout(() => {
      setVisible(false);

      const params = new URLSearchParams(
        searchParams.toString()
      );

      params.delete("toast");

      const query = params.toString();

      router.replace(
        query ? `/admin?${query}` : "/admin",
        {
          scroll: false,
        }
      );
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, toast, router, searchParams]);

  // Jangan render kalau bukan dashboard
  if (pathname !== "/admin") {
    return null;
  }

  if (!visible || !toast) {
    return null;
  }

  const toastData: Record<
    ToastType,
    {
      title: string;
      message: string;
      icon: string;
      type: "success" | "error";
    }
  > = {
    created: {
      title: "Berhasil!",
      message: "Proyek berhasil ditambahkan.",
      icon: "✓",
      type: "success",
    },

    updated: {
      title: "Berhasil!",
      message: "Proyek berhasil diperbarui.",
      icon: "✓",
      type: "success",
    },

    deleted: {
      title: "Berhasil!",
      message: "Proyek berhasil dihapus.",
      icon: "✓",
      type: "success",
    },

    error: {
      title: "Gagal!",
      message: "Terjadi kesalahan saat memproses proyek.",
      icon: "!",
      type: "error",
    },
  };

  const data = toastData[toast];

  if (!data) {
    return null;
  }

  return (
    <div className="fixed right-6 top-6 z-99999">
      <div
        className={`
          flex
          w-90
          items-start
          gap-4
          rounded-2xl
          border
          bg-white
          p-4
          shadow-2xl
          ${
            data.type === "success"
              ? "border-emerald-200"
              : "border-red-200"
          }
        `}
      >
        {/* ICON */}
        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            text-lg
            font-bold
            ${
              data.type === "success"
                ? "bg-emerald-100 text-emerald-600"
                : "bg-red-100 text-red-600"
            }
          `}
        >
          {data.icon}
        </div>

        {/* CONTENT */}
        <div className="flex-1 pt-1">
          <p className="text-sm font-bold text-slate-900">
            {data.title}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {data.message}
          </p>
        </div>

        {/* CLOSE */}
        <button
          type="button"
          onClick={() => {
            setVisible(false);

            const params = new URLSearchParams(
              searchParams.toString()
            );

            params.delete("toast");

            const query = params.toString();

            router.replace(
              query ? `/admin?${query}` : "/admin",
              {
                scroll: false,
              }
            );
          }}
          className="
            rounded-lg
            px-2
            py-1
            text-lg
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
        >
          ×
        </button>
      </div>
    </div>
  );
}