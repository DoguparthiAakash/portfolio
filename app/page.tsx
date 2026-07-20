"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MenuBar from "@/components/os/MenuBar";
import Dock from "@/components/os/Dock";
import CommandPalette from "@/components/ui/CommandPalette";

// Lazy load WindowManager so server doesn't complain about window objects
const WindowManager = dynamic(() => import("@/components/os/WindowManager"), {
  ssr: false,
});

export default function Desktop() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Prevent default scrolling on the body to act like an OS
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#050505] text-white">
      {/* Background Wallpaper (Neural/Lab Grid Pattern) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--primary)]/10 via-black to-black" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      </div>

      {/* OS UI Layer */}
      <div className="relative z-10 flex h-full w-full flex-col">
        <MenuBar />
        
        {/* Desktop Space (where windows live) */}
        <div className="relative flex-1 pt-8 pb-20">
          <WindowManager />
        </div>
        
        <Dock />
      </div>

      {/* Global Spotlight Search */}
      <CommandPalette />
    </main>
  );
}
