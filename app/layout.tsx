import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
import "./profile.css";
import "./texture.css";
import "./hero-cut.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mintesnot Saleamlak — Video Editor & Visual Storyteller",
    template: "%s — Mintesnot Saleamlak",
  },
  description:
    "Portfolio of Mintesnot Saleamlak, a video editor and visual storyteller creating brand films, social content, motion graphics, color and sound-driven stories.",
  keywords: [
    "Mintesnot Saleamlak",
    "video editor Ethiopia",
    "visual storyteller",
    "motion graphics",
    "Premiere Pro",
    "After Effects",
    "social media editor",
    "brand video editor",
  ],
  authors: [{ name: "Mintesnot Saleamlak" }],
  creator: "Mintesnot Saleamlak",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Mintesnot Saleamlak — Visual Stories",
    description: "Video editing, motion, sound and storytelling built for brands and digital platforms.",
    siteName: "Mintesnot Saleamlak Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mintesnot Saleamlak — Visual Stories",
    description: "Video editor and visual storyteller creating memorable brand and social content.",
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ed",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
