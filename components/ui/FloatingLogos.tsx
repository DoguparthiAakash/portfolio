'use client';

import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const LOGOS = [
  { id: 'mithlos', src: "/logos/mithlos.png", className: "scale-[1.3] md:scale-[1.5]" },
  { id: 'uos', src: "/logos/uos.png", className: "invert brightness-200 contrast-125 opacity-90" },
  { id: 'nux', src: "/logos/nux.png", className: "" },
  { id: 'plazavm', src: "/logos/plazavm.png", className: "" },
  { id: 'textbeans', src: "/logos/textbeans.png", className: "" },
  { id: 'clerk', src: "/logos/clerk.png", className: "" }
];

function FloatingLogo({ logo, isSuckedIn, index }: { logo: typeof LOGOS[0], isSuckedIn: boolean, index: number }) {
  const [isClient, setIsClient] = useState(false);
  const controls = useAnimation();
  const isMounted = useRef(false);
  
  // High-performance motion values that bypass React state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for buttery smooth follow behavior and snapping
  const smoothX = useSpring(x, { stiffness: 40, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 40, damping: 15 });

  useEffect(() => {
    isMounted.current = true;
    setIsClient(true);
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updatePos = () => {
      // Freeze dynamic updates if sucked in so the suck-in animation can take over
      if (isSuckedIn) return; 
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scrollY = window.scrollY;
      const logoSize = width < 1024 ? 48 : 144; // Mobile vs Desktop size
      
      const marginX = width < 1024 ? 5 : 60; 
      const isLeft = index % 2 === 0;
      const tier = Math.floor(index / 2);
      
      const isOuter = tier % 2 === 0;
      
      // Zigzag phase based on scroll: scrolling 500px completes half a wave
      const phase = (scrollY / 500) * Math.PI; 
      const modifier = isOuter ? 1 : -1;
      const wave = Math.cos(phase) * modifier;
      const normalizedWave = (wave + 1) / 2; // 0 to 1
      const zigzagAmplitude = width < 1024 ? 15 : 90;
      
      // Calculate dynamic X positioning
      const targetX = isLeft 
        ? marginX + (normalizedWave * zigzagAmplitude)
        : width - marginX - logoSize - (normalizedWave * zigzagAmplitude);
        
      // Add scroll parallax so they drift at different speeds vertically
      const scrollParallax = (scrollY * 0.2) * modifier;
      
      // Continuous organic bobbing effect based on time
      const bob = Math.sin(Date.now() / 800 + index) * 15;
      
      const targetY = (height * 0.15) + (tier * (height * 0.3)) + scrollParallax + bob;
      
      x.set(targetX);
      y.set(targetY);
    };

    // Run a highly optimized animation loop outside of React renders
    let frame: number;
    const loop = () => {
      updatePos();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, [isClient, isSuckedIn, index, x, y]);

  // Handle the "Suck in" interaction
  useEffect(() => {
    if (!isClient) return;
    
    // We use a microtask to ensure controls are fully registered before firing
    requestAnimationFrame(() => {
      if (!isMounted.current) return;
      
      if (isSuckedIn) {
        // Animate the springs to the center bottom
        const logoSize = window.innerWidth < 1024 ? 48 : 128;
        x.set(window.innerWidth / 2 - (logoSize / 2));
        y.set(window.innerHeight);
        
        controls.start({
          scale: 0,
          opacity: 0,
          rotate: 180,
          transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0], delay: index * 0.05 }
        });
      } else {
        controls.start({
          scale: 1,
          opacity: 1, // Keep fully visible as requested
          rotate: 0,
          transition: { duration: 0.8, delay: index * 0.05 }
        });
      }
    });
  }, [isSuckedIn, isClient, index, x, y, controls]);

  if (!isClient) return null;

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0, scale: 0 }}
      className="absolute top-0 left-0 w-12 h-12 md:w-36 md:h-36 pointer-events-none z-0 flex items-center justify-center"
      style={{ x: smoothX, y: smoothY, willChange: 'transform' }}
    >
      <div className="relative w-full h-full">
        <Image
          src={logo.src}
          alt={logo.id}
          fill
          sizes="(max-width: 768px) 48px, 144px"
          className={`object-contain drop-shadow-2xl ${logo.className}`}
        />
      </div>
    </motion.div>
  );
}

export default function FloatingLogos() {
  const [isSuckedIn, setIsSuckedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          setIsSuckedIn(true);
        } else {
          setIsSuckedIn(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    const handleResize = () => handleScroll();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {LOGOS.map((logo, i) => (
        <FloatingLogo key={logo.id} logo={logo} isSuckedIn={isSuckedIn} index={i} />
      ))}
    </div>
  );
}
