'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';

const TITLES = [
  "AI & ML Engineer",
  "Systems Programmer",
  "Full-Stack Developer",
  "OS Developer"
];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#4F8CFF 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-[#FFFFFF]">
            Doguparthi Aakash
          </h1>
          <p className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mb-8 leading-relaxed">
            I'm a final-year CS undergrad passionate about low-level systems. I build operating systems from scratch, design programming languages, and engineer applied AI solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-10 md:h-12 flex items-center justify-center mb-6 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-xl md:text-3xl font-medium text-[#A1A1AA]"
            >
              {TITLES[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base md:text-lg text-[#A1A1AA] mb-12"
        >
          Creator of Mithl OS, UOS Mobile OS, and NUX programming language. Focused on performance engineering, systems architecture, and machine learning pipelines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          <MagneticButton 
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium transition-colors hover:bg-gray-200"
            as="a" 
            href="/resume.pdf"
          >
            <FaFileDownload />
            <span>Resume</span>
          </MagneticButton>

          <MagneticButton
            className="flex items-center justify-center w-12 h-12 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-full text-[#A1A1AA] hover:text-white transition-colors"
            as="a"
            href="https://github.com/DoguparthiAakash"
          >
            <FaGithub size={20} />
          </MagneticButton>

          <MagneticButton
            className="flex items-center justify-center w-12 h-12 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-full text-[#A1A1AA] hover:text-white transition-colors"
            as="a"
            href="https://www.linkedin.com/in/aakash-doguparthi-129251297/"
          >
            <FaLinkedin size={20} />
          </MagneticButton>

          <MagneticButton
            className="flex items-center justify-center w-12 h-12 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-full text-[#A1A1AA] hover:text-white transition-colors"
            as="a"
            href="mailto:doguparthiaakash@gmail.com"
          >
            <FaEnvelope size={20} />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs tracking-widest text-[#A1A1AA] uppercase">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-[#A1A1AA] to-transparent"
          animate={{
            scaleY: [0, 1, 0],
            originY: [0, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
}
