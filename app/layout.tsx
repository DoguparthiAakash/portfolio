import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CommandPalette from "@/components/ui/CommandPalette";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading", display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: 'swap' });

export const metadata: Metadata = {
  title: "Aakash Doguparthi | AI Engineer",
  description: "Building intelligent software that learns, reasons and solves real-world problems.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${jakarta.variable} ${spaceGrotesk.variable} ${jetbrains.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground relative`}>
          {/* Global Ambient Corner Lights */}
          <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            {/* Top Left Light */}
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] md:w-[800px] md:h-[800px] bg-white/5 rounded-full blur-[120px]" />
            {/* Top Right Light */}
            <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] md:w-[800px] md:h-[800px] bg-white/5 rounded-full blur-[120px]" />
          </div>

          <ServiceWorkerRegistration />
          <CommandPalette />
          <SmoothScroll>
            <main className="flex-grow">
              {children}
            </main>
          </SmoothScroll>
      </body>
    </html>
  );
}
