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
    osTheme,
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
      className={`absolute overflow-hidden flex flex-col transition-shadow ${
        osTheme === "mac" 
          ? "rounded-xl border border-white/20 bg-black/50 backdrop-blur-2xl shadow-2xl" 
          : osTheme === "windows"
          ? "rounded-md border border-[#3c3c3c] bg-[#202020]/90 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "rounded-t-lg border border-[#3d3d3d] bg-[#1e1e1e] shadow-xl"
      } ${
        windowData.isFocused 
          ? osTheme === "mac" ? "ring-1 ring-white/30" : osTheme === "windows" ? "border-[#545454]" : "ring-1 ring-[#e95420]/50" 
          : "opacity-95"
      }`}
    >
      {/* Title Bar */}
      <div 
        className={`flex h-10 w-full shrink-0 items-center justify-between select-none touch-none ${
          osTheme === "mac"
            ? "bg-transparent px-3 border-b border-white/10"
            : osTheme === "windows"
            ? "bg-transparent pl-3 pr-0"
            : "bg-[#252525] px-3 border-b border-[#3d3d3d]"
        }`}
        onPointerDown={(e) => dragControls.start(e)}
        onDoubleClick={() => maximizeApp(windowData.id)}
      >
        {/* Mac Controls (Left) */}
        {osTheme === "mac" && (
          <div className="flex gap-2 group w-16">
            <button onClick={(e) => { e.stopPropagation(); closeApp(windowData.id); }} className="h-3 w-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center">
              <X className="h-2 w-2 opacity-0 group-hover:opacity-100 text-black" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); minimizeApp(windowData.id); }} className="h-3 w-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center">
              <Minus className="h-2 w-2 opacity-0 group-hover:opacity-100 text-black" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); maximizeApp(windowData.id); }} className="h-3 w-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center">
              <Square className="h-2 w-2 opacity-0 group-hover:opacity-100 text-black" />
            </button>
          </div>
        )}

        {/* Title */}
        <div className={`flex flex-1 items-center gap-2 text-xs font-semibold ${
          osTheme === "mac" ? "justify-center text-white/70" : osTheme === "windows" ? "justify-start text-white/90" : "justify-center text-white/80 font-bold"
        }`}>
          {osTheme !== "mac" && <Terminal size={14} className={osTheme === "linux" ? "text-[#e95420]" : "text-blue-400"} />}
          {windowData.title}
        </div>

        {/* Mac Spacer */}
        {osTheme === "mac" && <div className="w-16"></div>}

        {/* Windows / Linux Controls (Right) */}
        {(osTheme === "windows" || osTheme === "linux") && (
          <div className={`flex ${osTheme === "windows" ? "h-full items-start" : "items-center"}`}>
            <button onClick={(e) => { e.stopPropagation(); minimizeApp(windowData.id); }} className={`flex items-center justify-center transition-colors ${osTheme === "windows" ? "h-full w-[46px] hover:bg-white/10" : "hover:bg-white/10 rounded-full h-6 w-6 mr-1"}`}>
              <Minus className="h-3 w-3 text-white" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); maximizeApp(windowData.id); }} className={`flex items-center justify-center transition-colors ${osTheme === "windows" ? "h-full w-[46px] hover:bg-white/10" : "hover:bg-white/10 rounded-full h-6 w-6 mr-1"}`}>
              <Square className="h-3 w-3 text-white" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); closeApp(windowData.id); }} className={`flex items-center justify-center transition-colors ${osTheme === "windows" ? "h-full w-[46px] hover:bg-[#e81123]" : "hover:bg-[#e95420] rounded-full h-6 w-6 bg-[#3d3d3d]"}`}>
              <X className="h-3 w-3 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* App Content */}
      <div className="relative flex-1 overflow-auto bg-black/20">
        {children}
      </div>
    </motion.div>
  );
}
