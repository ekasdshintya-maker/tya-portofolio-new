import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://www.tyaportfolio.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Shintya — Web Developer",
    template: "%s | Shintya",
  },

  description:
    "Personal portfolio website of Shintya, a creative web developer specializing in modern, interactive, and responsive websites.",

  keywords: [
    "Shintya",
    "Web Developer",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
  ],

  authors: [
    {
      name: "Shintya",
    },
  ],

  creator: "Shintya",

  openGraph: {
    title: "Shintya — Web Developer",
    description:
      "Personal portfolio website of Shintya, a creative web developer specializing in modern, interactive, and responsive websites.",
    url: BASE_URL,
    siteName: "Shintya — Web Developer",
    type: "website",
    locale: "id_ID",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shintya — Web Developer",
    description:
      "Personal portfolio website of Shintya, a creative web developer specializing in modern, interactive, and responsive websites.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}