import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CursorGlow from "@/components/ui/CursorGlow";
import CommandPalette from "@/components/ui/CommandPalette";
import Chatbar from "@/components/ui/Chatbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Aakash Doguparthi | AI Engineer",
  description: "Building intelligent software that learns, reasons and solves real-world problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#090909] text-white selection:bg-[#4F8CFF]/30 selection:text-white min-h-screen flex flex-col`}>
        <CursorGlow />
        <CommandPalette />
        <Chatbar />
        <SmoothScroll>
          <main className="flex-grow">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
