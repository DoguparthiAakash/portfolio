"use client";

import { motion, useDragControls } from "framer-motion";
import { X, Minus, Square, Terminal } from "lucide-react";
import { useOSStore, OSWindow } from "@/store/os-store";
import { ReactNode } from "react";

interface WindowProps {
  windowData: OSWindow;
  children: ReactNode;
}

export default function OSWindowComponent({ windowData, children }: WindowProps) {
  const {
    focusApp,
    closeApp,
    minimizeApp,
    maximizeApp,
    updateWindowPosition,
  } = useOSStore();
  const dragControls = useDragControls();

  if (windowData.isMinimized) return null;

  return (
    <motion.div
      drag={!windowData.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        updateWindowPosition(windowData.id, windowData.x + info.offset.x, windowData.y + info.offset.y);
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: windowData.isMaximized ? 0 : windowData.x,
        y: windowData.isMaximized ? 0 : windowData.y,
        width: windowData.isMaximized ? "100%" : windowData.width,
        height: windowData.isMaximized ? "100%" : windowData.height,
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      onPointerDown={() => focusApp(windowData.id)}
      style={{ zIndex: windowData.zIndex }}
      className={`absolute overflow-hidden rounded-xl border border-[var(--border)] bg-black/80 backdrop-blur-xl shadow-2xl flex flex-col ${
        windowData.isFocused ? "ring-1 ring-[var(--primary)]/50 shadow-[var(--primary)]/20" : "opacity-95"
      }`}
    >
      {/* Title Bar */}
      <div 
        className="flex h-10 w-full shrink-0 items-center justify-between border-b border-[var(--border)] bg-black/40 px-3 select-none touch-none"
        onPointerDown={(e) => {
          dragControls.start(e);
        }}
        onDoubleClick={() => maximizeApp(windowData.id)}
      >
        <div className="flex items-center gap-2">
          {/* Traffic Lights */}
          <div className="flex gap-1.5 group">
            <button 
              onClick={(e) => { e.stopPropagation(); closeApp(windowData.id); }}
              className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center"
            >
              <X className="h-2 w-2 opacity-0 group-hover:opacity-100 text-black" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); minimizeApp(windowData.id); }}
              className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center"
            >
              <Minus className="h-2 w-2 opacity-0 group-hover:opacity-100 text-black" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); maximizeApp(windowData.id); }}
              className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors flex items-center justify-center"
            >
              <Square className="h-2 w-2 opacity-0 group-hover:opacity-100 text-black" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-1 items-center justify-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
          <Terminal size={12} className="text-[var(--primary)]" />
          {windowData.title}
        </div>

        {/* Spacer for symmetry */}
        <div className="w-12"></div>
      </div>

      {/* App Content */}
      <div className="relative flex-1 overflow-auto bg-black/20">
        {children}
      </div>
    </motion.div>
  );
}
