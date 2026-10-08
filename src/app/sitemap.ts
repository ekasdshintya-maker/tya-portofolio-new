import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://www.tyaportfolio.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: daftarProyek, error } = await supabase
    .from("proyek")
    .select("id");

  if (error) {
    console.error("Sitemap Supabase error:", error);
  }

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