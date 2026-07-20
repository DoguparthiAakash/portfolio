"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "@/store/os-store";
import { Search, Power, Settings, User } from "lucide-react";
import { Terminal, Network, Code2, Box, Server } from "lucide-react";
import Image from "next/image";

const PINNED_APPS = [
  { id: "agent", title: "Agentic OS", icon: Terminal, color: "text-green-400" },
  { id: "graph", title: "Neural Graph", icon: Network, color: "text-purple-400" },
  { id: "jupyter", title: "Jupyter Lab", icon: Code2, color: "text-blue-400" },
  { id: "latent", title: "Latent Space", icon: Box, color: "text-pink-400" },
  { id: "mlops", title: "MLOps & Arch", icon: Server, color: "text-orange-400" },
];

export default function StartMenu() {
  const { osTheme, isStartMenuOpen, toggleStartMenu, openApp } = useOSStore();

  if (osTheme !== "windows") return null;

  return (
    <AnimatePresence>
      {isStartMenuOpen && (
        <>
          {/* Backdrop to close on click outside */}
          <div 
            className="fixed inset-0 z-[9998]"
            onClick={toggleStartMenu}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[640px] h-[720px] bg-[#242424]/95 backdrop-blur-3xl border border-[#3c3c3c] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[9999] flex flex-col overflow-hidden"
          >
            {/* Search Bar */}
            <div className="p-6 pb-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Type here to search" 
                  className="w-full bg-[#1c1c1c] border-b-2 border-blue-500 text-white rounded px-10 py-2.5 outline-none placeholder:text-white/50 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleStartMenu();
                    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
                  }}
                />
              </div>
            </div>

            {/* Pinned Apps */}
            <div className="flex-1 px-8 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-sm font-semibold">Pinned</h3>
                <button className="text-xs bg-white/5 hover:bg-white/10 text-white/80 px-2 py-1 rounded transition-colors">
                  All apps &gt;
                </button>
              </div>
              
              <div className="grid grid-cols-6 gap-y-6">
                {PINNED_APPS.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      openApp(app);
                      toggleStartMenu();
                    }}
                    className="flex flex-col items-center gap-2 hover:bg-white/5 rounded-sm p-2 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors shadow-sm">
                      <app.icon className={`w-5 h-5 ${app.color}`} />
                    </div>
                    <span className="text-white/90 text-xs truncate w-full text-center">{app.title}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-8 mb-4">
                <h3 className="text-white text-sm font-semibold">Recommended</h3>
                <button className="text-xs bg-white/5 hover:bg-white/10 text-white/80 px-2 py-1 rounded transition-colors">
                  More &gt;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                    <User className="text-blue-400 w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/90 text-xs font-medium">Resume.pdf</span>
                    <span className="text-white/50 text-[10px]">Just now</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                    <Settings className="text-purple-400 w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/90 text-xs font-medium">System Architecture</span>
                    <span className="text-white/50 text-[10px]">17m ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Profile Bar */}
            <div className="h-16 bg-[#1c1c1c]/50 border-t border-[#3c3c3c] flex items-center justify-between px-10">
              <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded cursor-pointer transition-colors -ml-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
                <span className="text-white text-xs">Aakash Doguparthi</span>
              </div>
              
              <button 
                className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded transition-colors"
                onClick={() => {
                  toggleStartMenu();
                  // In a real app this might trigger a shutdown or lock screen
                  alert("Shutting down... (Not really!)");
                }}
              >
                <Power className="w-4 h-4 text-white/80" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
