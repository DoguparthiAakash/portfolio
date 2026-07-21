'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);

  const [cursorType, setCursorType] = useState(0);
  const NUM_CURSORS = 12;
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
      case 6: // QUANTUM_CORE
        return (
          <div className="relative flex items-center justify-center w-8 h-8">
            <motion.div 
              className="absolute w-4 h-4 bg-cyan-400 rounded-full mix-blend-screen blur-[2px]"
              animate={{ x: [-4, 4, -4], y: [-4, 4, -4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute w-4 h-4 bg-fuchsia-500 rounded-full mix-blend-screen blur-[2px]"
              animate={{ x: [4, -4, 4], y: [4, -4, 4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute w-2 h-2 bg-white rounded-full z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
        );
      case 7: // LIDAR_SCANNER
        return (
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#39D353]/30 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#39D353]/50 to-transparent"
              style={{ transformOrigin: "center" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute w-1.5 h-1.5 bg-[#39D353] rounded-full shadow-[0_0_5px_#39D353]" />
          </div>
        );
      case 8: // NEURAL_SYNAPSE
        return (
          <div className="relative flex items-center justify-center w-10 h-10">
             <motion.svg className="absolute inset-0 text-indigo-400/50" viewBox="0 0 100 100" animate={{ rotate: 180, scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <path d="M50 50 L20 20 M50 50 L80 30 M50 50 L40 90 M50 50 L90 70 M50 50 L10 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
             </motion.svg>
             <div className="absolute w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
             <motion.div className="absolute w-1 h-1 bg-white rounded-full" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity }} />
          </div>
        );
      case 9: // FRACTAL_HEXAGON
        return (
          <div className="relative flex items-center justify-center w-8 h-8">
            <motion.div 
              className="absolute inset-0 border border-[#A1A1AA] opacity-50"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute inset-1 border border-white opacity-80"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute w-1 h-1 bg-white rounded-full" />
          </div>
        );
      case 10: // PULSAR_STAR
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.div 
              className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_4px_rgba(34,211,238,0.8)]" />
            <motion.div 
              className="absolute w-4 h-4 bg-cyan-200 rounded-full mix-blend-screen blur-[2px]"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.3, 0.8] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
          </div>
        );
      case 11: // SINGULARITY
        return (
          <div className="relative flex items-center justify-center w-8 h-8">
             <motion.div 
               className="absolute inset-0 rounded-full border border-white"
               style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
               animate={{ rotate: 360, scale: [1, 0.5, 1] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.div 
               className="absolute inset-1 rounded-full border border-[#A1A1AA]"
               style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
               animate={{ rotate: -360, scale: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             />
             <div className="absolute w-1 h-1 bg-white rounded-full" />
          </div>
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
