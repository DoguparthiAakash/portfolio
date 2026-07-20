import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CursorGlow from "@/components/ui/CursorGlow";
import CommandPalette from "@/components/ui/CommandPalette";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import AIChatbar from "@/components/ui/AIChatbar";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <ThemeSwitcher />
          <CursorGlow />
          <CommandPalette />
          <SmoothScroll>
            <main className="flex-grow">
              {children}
            </main>
          </SmoothScroll>
          <AIChatbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
