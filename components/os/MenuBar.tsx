"use client";

import { useEffect, useState } from "react";
import { Battery, Wifi, Search, Command } from "lucide-react";
import { motion } from "framer-motion";

export default function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[9999] flex h-8 items-center justify-between border-b border-[var(--border)] bg-black/40 px-4 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-md select-none touch-none"
    >
      <div className="flex items-center gap-4">
        {/* OS Logo */}
        <div className="flex items-center gap-1.5 text-white font-bold cursor-pointer hover:text-[var(--primary)] transition-colors">
          <Command size={14} />
          <span>Aakash OS</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-4">
          <span className="cursor-default hover:text-white transition-colors">File</span>
          <span className="cursor-default hover:text-white transition-colors">Edit</span>
          <span className="cursor-default hover:text-white transition-colors">View</span>
          <span className="cursor-default hover:text-white transition-colors">Go</span>
          <span className="cursor-default hover:text-white transition-colors">Help</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <Search size={14} />
        </button>
        
        <Wifi size={14} />
        <Battery size={14} />
        
        <span className="text-white min-w-[60px] text-right">{time}</span>
      </div>
    </motion.div>
  );
}
