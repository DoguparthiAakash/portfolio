"use client";

import { motion } from "framer-motion";
import { useOSStore } from "@/store/os-store";
import { Terminal, Network, Code2, Box, Command, Server } from "lucide-react";
import { useState } from "react";

const APPS = [
  { id: "agent", title: "Agentic OS", icon: Terminal, color: "text-green-400" },
  { id: "graph", title: "Neural Graph", icon: Network, color: "text-purple-400" },
  { id: "jupyter", title: "Jupyter Lab", icon: Code2, color: "text-blue-400" },
  { id: "latent", title: "Latent Space", icon: Box, color: "text-pink-400" },
  { id: "mlops", title: "MLOps & Arch", icon: Server, color: "text-orange-400" },
];

export default function Dock() {
  const { openApp, windows, osTheme } = useOSStore();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  return (
    <div className={`fixed z-[9999] transition-all duration-500 ${
      osTheme === "mac" 
        ? "bottom-4 left-1/2 -translate-x-1/2" 
        : osTheme === "windows"
        ? "bottom-0 left-0 w-full"
        : "left-0 top-1/2 -translate-y-1/2 ml-2"
    }`}>
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center gap-2 border-[var(--border)] backdrop-blur-xl transition-all duration-500 ${
          osTheme === "mac"
            ? "flex-row rounded-2xl bg-black/50 p-2 shadow-2xl border border-white/20"
            : osTheme === "windows"
            ? "flex-row w-full justify-center bg-[#202020]/90 border-t border-[#3c3c3c] p-1 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]"
            : "flex-col rounded-xl bg-[#1e1e1e]/90 p-2 shadow-xl border border-[#3d3d3d]"
        }`}
      >
        {osTheme === "windows" && (
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            className="flex h-10 w-10 items-center justify-center rounded transition-all duration-200 hover:bg-white/10"
          >
            <div className="w-5 h-5 bg-blue-500 rounded-sm" /> {/* Mock Windows Start Button */}
          </button>
        )}
        {APPS.map((app) => {
          const isOpen = windows.some(w => w.id === app.id);
          const isFocused = windows.some(w => w.id === app.id && w.isFocused);
          
          return (
            <div key={app.id} className="relative group">
              {hoveredApp === app.id && (
                <div className={`absolute rounded px-2 py-1 text-xs text-white border whitespace-nowrap z-[10000] ${
                  osTheme === "mac" 
                    ? "-top-10 left-1/2 -translate-x-1/2 bg-black/80 border-white/20" 
                    : osTheme === "windows"
                    ? "-top-10 left-1/2 -translate-x-1/2 bg-[#2d2d2d] border-[#444]"
                    : "left-14 top-1/2 -translate-y-1/2 bg-[#1e1e1e] border-[#444]"
                }`}>
                  {app.title}
                </div>
              )}
              
              <button
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                onClick={() => openApp(app)}
                className={`relative flex items-center justify-center transition-all duration-200 
                  ${osTheme === "mac" ? "h-12 w-12 rounded-xl" : osTheme === "windows" ? "h-10 w-10 rounded hover:bg-white/10" : "h-12 w-12 rounded-lg"}
                  ${isOpen ? (osTheme === "mac" ? "bg-white/10" : osTheme === "windows" ? "bg-white/5" : "bg-white/10") : "hover:bg-white/5"}
                  ${isFocused ? (osTheme === "mac" ? "ring-1 ring-white/30" : "") : ""}
                `}
              >
                <app.icon className={`h-6 w-6 ${app.color}`} />
                
                {/* Indicator dot if open */}
                {isOpen && (
                  <div className={`absolute rounded-full transition-all ${
                    osTheme === "mac" 
                      ? "-bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 bg-white" 
                      : osTheme === "windows"
                      ? "bottom-0 left-1/2 h-[3px] w-4 -translate-x-1/2 bg-blue-400 rounded-t-md"
                      : "-left-1 top-1/2 h-1 w-1 -translate-y-1/2 bg-[#e95420]"
                  }`} />
                )}
              </button>
            </div>
          );
        })}

        {osTheme !== "windows" && (
          <>
            <div className={`bg-white/10 ${osTheme === "mac" ? "mx-1 h-8 w-px" : "my-1 h-px w-8"}`} />
            
            {/* Spotlight Trigger */}
            <div className="relative group">
              {hoveredApp === "search" && (
                <div className={`absolute rounded px-2 py-1 text-xs text-white border whitespace-nowrap z-[10000] ${
                  osTheme === "mac" 
                    ? "-top-10 left-1/2 -translate-x-1/2 bg-black/80 border-white/20" 
                    : "left-14 top-1/2 -translate-y-1/2 bg-[#1e1e1e] border-[#444]"
                }`}>
                  Spotlight (Cmd+K)
                </div>
              )}
              <button
                onMouseEnter={() => setHoveredApp("search")}
                onMouseLeave={() => setHoveredApp(null)}
                onClick={() => {
                  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
                }}
                className={`flex items-center justify-center transition-all duration-200 hover:bg-white/5 ${
                  osTheme === "mac" ? "h-12 w-12 rounded-xl" : "h-12 w-12 rounded-lg"
                }`}
              >
                <Command className={`h-6 w-6 ${osTheme === "mac" ? "text-white/70" : "text-white/80"}`} />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
