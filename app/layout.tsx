import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SAMNET Industrials - Tech Solutions & Training Hub",
  description:
    "Leading provider of software solutions, IoT devices, and smart gadgets with a training hub for aspiring tech professionals. Passion is enough — skills will be taught.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
