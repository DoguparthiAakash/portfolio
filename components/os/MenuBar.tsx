"use client";

import { useEffect, useState } from "react";
import { Battery, Wifi, Search, Command, Volume2, Power } from "lucide-react";
import { motion } from "framer-motion";

import { useOSStore } from "@/store/os-store";

export default function MenuBar() {
  const { osTheme } = useOSStore();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (osTheme === "windows") return null;

  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[9999] flex h-8 items-center border-b backdrop-blur-md select-none touch-none text-xs font-medium ${
        osTheme === "mac" 
          ? "bg-white/10 border-white/20 text-white/90 justify-between px-4" 
          : "bg-[#1e1e1e] border-[#3d3d3d] text-white/80 justify-between px-4"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* OS Logo */}
        <div className={`flex items-center gap-1.5 text-white font-bold cursor-pointer hover:text-white/80 transition-colors ${osTheme === "linux" ? "hover:bg-white/10 px-2 py-1 rounded-full -ml-2" : ""}`}
             onClick={() => osTheme === "linux" && window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        >
          {osTheme === "mac" && <Command size={14} className="text-white" />}
          <span>{osTheme === "mac" ? "Aakash OS" : "Activities"}</span>
        </div>
        
        {osTheme === "mac" && (
          <div className="hidden sm:flex items-center gap-4 font-semibold">
            <span className="cursor-default hover:text-white transition-colors">File</span>
            <span className="cursor-default hover:text-white transition-colors">Edit</span>
            <span className="cursor-default hover:text-white transition-colors">View</span>
            <span className="cursor-default hover:text-white transition-colors">Go</span>
            <span className="cursor-default hover:text-white transition-colors">Help</span>
          </div>
        )}
      </div>

      {osTheme === "linux" && (
        <div className="absolute left-1/2 -translate-x-1/2 font-bold text-white">
          {new Date().toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })} {time}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button 
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className={`flex items-center gap-1 hover:text-white transition-colors ${osTheme === "linux" ? "hidden" : ""}`}
        >
          <Search size={14} />
        </button>
        
        <div className={`flex items-center gap-3 ${osTheme === "linux" ? "hover:bg-white/10 px-2 py-1 rounded-full cursor-pointer transition-colors" : ""}`}>
          <Wifi size={14} />
          {osTheme === "linux" && <Volume2 size={14} />}
          <Battery size={14} />
          {osTheme === "linux" && <Power size={14} />}
        </div>
        
        {osTheme === "mac" && (
          <span className="text-white min-w-[60px] text-right font-semibold">{time}</span>
        )}
      </div>
    </motion.div>
  );
}
