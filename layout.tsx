import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ChatWidget from "./chat-widget"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard with analytics and chat widget",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}

