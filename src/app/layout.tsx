import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"
export const runtime = 'edge';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arsana Labs - Open Source Innovation",
  description: "Building the future through open-source innovation and expert software consulting.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}

