import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shintya — Web Developer",
  description: "Personal portfolio website of Shintya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}