"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MenuBar from "@/components/os/MenuBar";
import Dock from "@/components/os/Dock";
import CommandPalette from "@/components/ui/CommandPalette";
import Bootloader from "@/components/os/Bootloader";
import { useOSStore } from "@/store/os-store";

// Lazy load WindowManager so server doesn't complain about window objects
const WindowManager = dynamic(() => import("@/components/os/WindowManager"), {
  ssr: false,
});

export default function Desktop() {
  const [mounted, setMounted] = useState(false);
  const { osTheme, isBooting } = useOSStore();

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
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Bootloader Layer */}
      <Bootloader />

      {/* Background Wallpaper */}
      <div className="absolute inset-0 z-0 overflow-hidden transition-all duration-1000">
        {osTheme === "mac" && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] via-[#091b35] to-[#040914]" />
        )}
        {osTheme === "windows" && (
          <div className="absolute inset-0 bg-[#005ea5]">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Windows_11_bloom_light.svg')] bg-cover bg-center opacity-80 mix-blend-screen blur-3xl" />
          </div>
        )}
        {osTheme === "linux" && (
          <div className="absolute inset-0 bg-[#2c001e] bg-gradient-to-br from-[#2c001e] via-[#4d1036] to-[#e95420]/30" />
        )}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 pointer-events-none" />
      </div>

      {/* OS UI Layer */}
      <div 
        className="relative z-10 flex h-full w-full flex-col transition-opacity duration-1000"
        style={{ opacity: isBooting ? 0 : 1 }}
      >
        <MenuBar />
        
        {/* Desktop Space (where windows live) */}
        <div className={`relative flex-1 ${osTheme === "mac" ? "pt-8 pb-20" : osTheme === "windows" ? "pb-12" : "pt-8 pl-16"}`}>
          <WindowManager />
        </div>
        
        <Dock />
      </div>

      {/* Global Spotlight Search */}
      <CommandPalette />
    </main>
  );
}
