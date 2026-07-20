import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import CommandPalette from "@/components/ui/CommandPalette";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aakash Doguparthi — Machine Learning Engineer & AI Systems Developer",
    template: "%s | Aakash Doguparthi",
  },
  description:
    "Portfolio of Aakash Doguparthi — Machine Learning Engineer specializing in deep learning, computer vision, NLP, LLMs, and production AI systems. Building intelligent software and autonomous AI systems.",
  keywords: [
    "Machine Learning Engineer",
    "AI Engineer",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "LLM",
    "MLOps",
    "PyTorch",
    "TensorFlow",
    "Aakash Doguparthi",
  ],
  authors: [{ name: "Aakash Doguparthi" }],
  creator: "Aakash Doguparthi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aakashd.dev",
    title: "Aakash Doguparthi — Machine Learning Engineer",
    description:
      "Building intelligent software, autonomous AI systems, deep learning models, and production-ready ML applications.",
    siteName: "Aakash Doguparthi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash Doguparthi — Machine Learning Engineer",
    description:
      "Building intelligent software, autonomous AI systems, deep learning models, and production-ready ML applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#050505" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)] antialiased grain">
        <CommandPalette />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
