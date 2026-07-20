"use client";

import { motion } from "framer-motion";
import { useOSStore } from "@/store/os-store";
import { Terminal, Network, Code2, Box, Command } from "lucide-react";
import { useState } from "react";

const APPS = [
  { id: "agent", title: "Agentic OS", icon: Terminal, color: "text-green-400" },
  { id: "graph", title: "Neural Graph", icon: Network, color: "text-purple-400" },
  { id: "jupyter", title: "Jupyter Lab", icon: Code2, color: "text-blue-400" },
  { id: "latent", title: "Latent Space", icon: Box, color: "text-pink-400" },
];

export default function Dock() {
  const { openApp, windows } = useOSStore();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999]">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-black/60 p-2 shadow-2xl backdrop-blur-xl"
      >
        {APPS.map((app) => {
          const isOpen = windows.some(w => w.id === app.id);
          const isFocused = windows.some(w => w.id === app.id && w.isFocused);
          
          return (
            <div key={app.id} className="relative group">
              {hoveredApp === app.id && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-black/80 px-2 py-1 text-xs text-white border border-[var(--border)] whitespace-nowrap">
                  {app.title}
                </div>
              )}
              
              <button
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                onClick={() => openApp(app)}
                className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 
                  ${isOpen ? "bg-white/10" : "hover:bg-white/5"}
                  ${isFocused ? "ring-1 ring-[var(--primary)]/50 shadow-[0_0_15px_rgba(0,245,255,0.2)]" : ""}
                `}
              >
                <app.icon className={`h-6 w-6 ${app.color}`} />
                
                {/* Indicator dot if open */}
                {isOpen && (
                  <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--primary)]" />
                )}
              </button>
            </div>
          );
        })}

        <div className="mx-1 h-8 w-px bg-[var(--border)]" />
        
        {/* Spotlight Trigger */}
        <div className="relative group">
          {hoveredApp === "search" && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-black/80 px-2 py-1 text-xs text-white border border-[var(--border)] whitespace-nowrap">
              Spotlight (Cmd+K)
            </div>
          )}
          <button
            onMouseEnter={() => setHoveredApp("search")}
            onMouseLeave={() => setHoveredApp(null)}
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            className="flex h-12 w-12 items-center justify-center rounded-xl hover:bg-white/5 transition-all duration-200"
          >
            <Command className="h-6 w-6 text-[var(--text-secondary)]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
