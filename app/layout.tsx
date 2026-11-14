import type { Metadata } from "next";
import { Crimson_Text, DM_Sans } from "next/font/google";
import { content } from "./content";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-school-sans",
  subsets: ["latin"],
});

const serif = Crimson_Text({
  variable: "--font-school-serif",
  weight: ["600", "700"],
  subsets: ["latin"],
});

const { title, description, language } = content.School.metadata;

export const metadata: Metadata = { title, description };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={language}
      className={`${sans.variable} ${serif.variable} antialiased motion-safe:scroll-smooth`}
    >
      <body className="min-h-screen bg-white font-sans text-navy">{children}</body>
    </html>
  );
}
