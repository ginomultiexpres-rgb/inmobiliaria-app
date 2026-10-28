import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InmoCore - Inmobiliaria Digital",
  description: "Plataforma inmobiliaria digital con gestión de propiedades, clientes y contratos. Construida con Next.js, Supabase y Tailwind CSS.",
  keywords: ["inmobiliaria", "propiedades", "bienes raíces", "inmocore", "nextjs", "supabase"],
  authors: [{ name: "InmoCore Team" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
