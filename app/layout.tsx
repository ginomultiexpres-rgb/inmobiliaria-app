import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "InmoCore - Inmobiliaria Digital",
  description: "Encuentra tu hogar ideal en InmoCore",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}