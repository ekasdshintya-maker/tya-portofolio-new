import type { MetadataRoute } from "next";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";

const BASE_URL = "https://tya-portofolio-new-5638.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createSupabaseServerClient();

  const { data: daftarProyek } = await supabase
    .from("proyek")
    .select("id");

  const halamanProyek = (daftarProyek ?? []).map((proyek) => ({
    url: `${BASE_URL}/proyek/${proyek.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/proyek`,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/tentang`,
      lastModified: new Date(),
    },

    ...halamanProyek,
  ];
}