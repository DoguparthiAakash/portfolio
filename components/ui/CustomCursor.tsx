'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);

  const [cursorType, setCursorType] = useState(0);
  const NUM_CURSORS = 16;
  const hitEdgeCooldown = useRef(false);

  // We use spring for smooth scaling and movement
  const springConfig = { stiffness: 400, damping: 25 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const springScale = useSpring(scale, { stiffness: 200, damping: 15 });

  useEffect(() => {
    let history: { x: number; y: number; time: number }[] = [];
    let timeout: NodeJS.Timeout;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if cursor hit the edge of the display
      if (
        e.clientX <= 5 ||
        e.clientY <= 5 ||
        e.clientX >= window.innerWidth - 5 ||
        e.clientY >= window.innerHeight - 5
      ) {
        if (!hitEdgeCooldown.current) {
          setCursorType(prev => (prev + Math.floor(Math.random() * (NUM_CURSORS - 1)) + 1) % NUM_CURSORS);
          hitEdgeCooldown.current = true;
          setTimeout(() => {
            hitEdgeCooldown.current = false;
          }, 1000); // 1 second cooldown before it can switch again
        }
      }

      const now = performance.now();
      history.push({ x: e.clientX, y: e.clientY, time: now });

      // Keep only last 250ms of history
      history = history.filter(p => now - p.time < 250);

      if (history.length > 5) {
        let pathLength = 0;
        for (let i = 1; i < history.length; i++) {
          const dx = history[i].x - history[i - 1].x;
          const dy = history[i].y - history[i - 1].y;
          pathLength += Math.sqrt(dx * dx + dy * dy);
        }

        const first = history[0];
        const last = history[history.length - 1];
        const netDx = last.x - first.x;
        const netDy = last.y - first.y;
        const netDisplacement = Math.sqrt(netDx * netDx + netDy * netDy) || 1;

        // If moved a lot, and path length is significantly larger than net displacement (back-and-forth)
        // Or if the sheer path length is extremely high in 250ms (frantic shaking)
        if ((pathLength > 500 && pathLength / netDisplacement > 2) || pathLength > 1500) {
          scale.set(6); // Grow significantly like macOS
        } else if (pathLength < 200) {
          scale.set(1);
        }
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        scale.set(1);
        history = [];
      }, 100);
    };

    // Ensure it's only active on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', moveCursor);
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearTimeout(timeout);
    };
  }, [cursorX, cursorY, scale]);

  // If it's a touch device, don't render the custom cursor
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  const renderCursorDesign = () => {
    switch (cursorType) {
      case 0: // BLACK_HOLE
        return (
          <div className="relative flex items-center justify-center w-8 h-8">
            <motion.div 
              className="absolute inset-0 rounded-full backdrop-blur-[1px] bg-white/5"
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute inset-[2px] rounded-full border-t-[2px] border-r-[1px] border-[#f97316] blur-[1px] opacity-80"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-[5px] rounded-full border-b-[2px] border-l-[1px] border-[#fbbf24] blur-[0.5px] opacity-90"
              animate={{ rotate: -360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute w-3 h-3 bg-black rounded-full shadow-[0_0_10px_2px_rgba(249,115,22,0.6)] z-10" />
          </div>
        );
      case 1: // GLOWING_DOT
        return <div className="w-4 h-4 bg-white rounded-full mix-blend-difference" />;
      case 2: // CYBER_CROSSHAIR
        return (
          <div className="relative flex items-center justify-center w-8 h-8 text-[#39D353]">
            <div className="absolute w-1 h-1 bg-[#39D353] rounded-full shadow-[0_0_8px_2px_#39D353]" />
            <div className="absolute w-[2px] h-3 top-0 bg-[#39D353]/80" />
            <div className="absolute w-[2px] h-3 bottom-0 bg-[#39D353]/80" />
            <div className="absolute h-[2px] w-3 left-0 bg-[#39D353]/80" />
            <div className="absolute h-[2px] w-3 right-0 bg-[#39D353]/80" />
            <motion.div 
              className="absolute inset-0 border border-[#39D353]/30" 
              animate={{ rotate: 90 }} 
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
            />
          </div>
        );
      case 3: // LIQUID_ORB
        return (
          <div className="w-8 h-8 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center">
            <div className="w-2 h-2 bg-white/50 rounded-full blur-[1px]" />
          </div>
        );
      case 4: // MINIMAL_SQUARE
        return (
          <motion.div 
            className="w-5 h-5 border-2 border-white mix-blend-difference flex items-center justify-center"
            animate={{ rotate: 180 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-1 h-1 bg-white" />
          </motion.div>
        );
      case 5: // ORBITING_MOONS
        return (
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="w-2 h-2 bg-white rounded-full mix-blend-difference" />
            <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#A1A1AA] rounded-full" />
            </motion.div>
            <motion.div className="absolute inset-[-4px]" animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#39D353] rounded-full shadow-[0_0_5px_1px_#39D353]" />
            </motion.div>
          </div>
        );
      case 6: // RADAR
        return (
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#39D353]/30 bg-[#0A0A0A]/50 overflow-hidden">
            <motion.div 
              className="absolute top-1/2 left-1/2 w-6 h-6 bg-gradient-to-br from-[#39D353] to-transparent origin-top-left opacity-60"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute w-1.5 h-1.5 bg-[#39D353] rounded-full shadow-[0_0_5px_#39D353]" />
            <div className="absolute inset-2 rounded-full border border-[#39D353]/20" />
          </div>
        );
      case 7: // PULSATING_BEACON
        return (
          <div className="relative flex items-center justify-center w-8 h-8">
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-[#ec4899]"
              animate={{ scale: [0.5, 2], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-[#ec4899]"
              animate={{ scale: [0.5, 2], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.75 }}
            />
            <div className="absolute w-3 h-3 bg-[#ec4899] rounded-full shadow-[0_0_10px_#ec4899]" />
          </div>
        );
      case 8: // NEON_DIAMOND
        return (
          <motion.div 
            className="relative flex items-center justify-center w-6 h-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute w-full h-full border-2 border-[#8b5cf6] shadow-[0_0_10px_#8b5cf6,inset_0_0_10px_#8b5cf6]" style={{ transform: "rotate(45deg)" }} />
            <div className="absolute w-2 h-2 bg-[#8b5cf6] rounded-full" />
          </motion.div>
        );
      case 9: // ATOM_MODEL
        return (
          <div className="relative flex items-center justify-center w-10 h-10">
            <div className="absolute inset-0" style={{ transform: "rotateZ(0deg) rotateX(70deg)" }}>
              <motion.div className="w-full h-full border border-[#0ea5e9]/80 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            </div>
            <div className="absolute inset-0" style={{ transform: "rotateZ(60deg) rotateX(70deg)" }}>
              <motion.div className="w-full h-full border border-[#0ea5e9]/80 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            </div>
            <div className="absolute inset-0" style={{ transform: "rotateZ(120deg) rotateX(70deg)" }}>
              <motion.div className="w-full h-full border border-[#0ea5e9]/80 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            </div>
            <div className="w-2.5 h-2.5 bg-[#0ea5e9] rounded-full shadow-[0_0_10px_#0ea5e9]" />
          </div>
        );
      case 10: // COMPASS_NEEDLE
        return (
          <div className="relative flex items-center justify-center w-8 h-8">
            <motion.div 
              className="w-1.5 h-10 bg-gradient-to-b from-[#ef4444] via-white to-[#3b82f6] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        );
      case 11: // SOLAR_SYSTEM
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <div className="absolute w-4 h-4 bg-[#eab308] rounded-full shadow-[0_0_15px_#eab308]" />
            <motion.div className="absolute inset-0 flex items-center" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <div className="w-2.5 h-2.5 bg-[#3b82f6] rounded-full shadow-[0_0_5px_#3b82f6] -ml-1" />
            </motion.div>
            <motion.div className="absolute inset-2 flex items-center" animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <div className="w-1.5 h-1.5 bg-[#ef4444] rounded-full shadow-[0_0_5px_#ef4444] -ml-1" />
            </motion.div>
          </div>
        );
      case 12: // MINECRAFT_SWORD (Sweezy Fun Style)
        return (
          <div className="text-4xl drop-shadow-lg" style={{ transform: "rotate(-45deg)" }}>
            🗡️
          </div>
        );
      case 13: // PIZZA
        return (
          <motion.div 
            className="text-4xl drop-shadow-lg"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🍕
          </motion.div>
        );
      case 14: // ALIEN_UFO
        return (
          <motion.div 
            className="text-4xl drop-shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🛸
          </motion.div>
        );
      case 15: // MAGIC_WAND
        return (
          <motion.div 
            className="text-4xl drop-shadow-[0_0_15px_#a855f7]"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🪄
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: springScale,
        }}
      >
        {renderCursorDesign()}
      </motion.div>
    </>
  );
}
