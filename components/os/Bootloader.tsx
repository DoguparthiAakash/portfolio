"use client";

import { useEffect, useState } from "react";
import { useOSStore, OSTheme } from "@/store/os-store";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function Bootloader() {
  const { osTheme, setOSTheme, isBooting, setBooting } = useOSStore();
  const [logs, setLogs] = useState<string[]>([]);
  const [bootPhase, setBootPhase] = useState<"grub" | "kernel" | "done">("grub");

  // Removed UA detection to force Linux as the default OS

  useEffect(() => {
    if (!isBooting) return;

    if (bootPhase === "grub") {
      const timer = setTimeout(() => {
        setBootPhase("kernel");
      }, 3000); // 3 seconds on GRUB selection
      return () => clearTimeout(timer);
    }

    if (bootPhase === "kernel") {
      const bootSequence = [
        "Loading Aakash_Kernel_v9.4...",
        "Mounting root filesystem...",
        `Loading ${osTheme} desktop environment...`,
        "Initializing Neural Engine... OK",
        "Loading agentic workflows... OK",
        "Starting display manager... OK"
      ];

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < bootSequence.length) {
          setLogs(prev => [...prev, bootSequence[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setBootPhase("done");
            setBooting(false);
          }, 1000);
        }
      }, 400);

      return () => clearInterval(interval);
    }
  }, [bootPhase, isBooting, osTheme, setBooting]);

  if (!isBooting) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[99999] bg-black text-[#c9d1d9] font-[var(--font-mono)] flex flex-col items-center justify-center p-8 overflow-hidden"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />
        
        {bootPhase === "grub" ? (
          <div className="w-full max-w-2xl bg-[#010101] border-2 border-blue-900 shadow-[0_0_20px_rgba(30,58,138,0.5)] p-1">
            <div className="bg-blue-900 text-white text-center py-1 mb-4 font-bold tracking-widest text-sm">
              AAKASH MULTI-OS BOOT MANAGER v1.0
            </div>
            
            <div className="px-8 pb-8 text-sm md:text-base">
              <p className="mb-6 text-gray-400">Please select the operating system to boot:</p>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setOSTheme("mac")}
                  className={`text-left px-4 py-2 flex items-center justify-between ${osTheme === "mac" ? "bg-white text-black font-bold" : "text-white hover:bg-gray-800"}`}
                >
                  <span>macOS (Sonoma)</span>
                  {osTheme === "mac" && <span>&lt;--</span>}
                </button>
                <button 
                  onClick={() => setOSTheme("windows")}
                  className={`text-left px-4 py-2 flex items-center justify-between ${osTheme === "windows" ? "bg-white text-black font-bold" : "text-white hover:bg-gray-800"}`}
                >
                  <span>Windows 11</span>
                  {osTheme === "windows" && <span>&lt;--</span>}
                </button>
                <button 
                  onClick={() => setOSTheme("linux")}
                  className={`text-left px-4 py-2 flex items-center justify-between ${osTheme === "linux" ? "bg-white text-black font-bold" : "text-white hover:bg-gray-800"}`}
                >
                  <span>Ubuntu (GNOME)</span>
                  {osTheme === "linux" && <span>&lt;--</span>}
                </button>
              </div>

              <div className="mt-12 text-xs text-gray-500 text-center">
                Use the ↑ and ↓ keys to change the selection.
                <br/>
                Press Enter to boot the selected OS, or wait 3 seconds.
              </div>

              <button 
                onClick={() => setBootPhase("kernel")}
                className="mt-6 w-full py-3 bg-blue-900/50 hover:bg-blue-800 text-white border border-blue-500 rounded transition-colors"
              >
                Boot Selected OS
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl flex flex-col gap-2 self-start h-full">
            <div className="flex items-center gap-4 text-green-500 mb-8">
              <Terminal size={24} />
              <h1 className="text-xl font-bold tracking-widest uppercase">Booting Kernel...</h1>
            </div>
            
            <div className="flex flex-col gap-1 text-sm md:text-base">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-green-500">[{ (i * 0.432).toFixed(3) }]</span>
                  <span className="text-gray-300">{log}</span>
                </div>
              ))}
              <div className="flex gap-4 mt-1">
                <span className="text-green-500">[{ (logs.length * 0.432).toFixed(3) }]</span>
                <span className="w-2 h-4 bg-gray-300 animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
