'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-16 md:mb-24 relative">
      {/* Massive Faded Background Text */}
      <div className="absolute -top-12 md:-top-20 left-0 text-[60px] md:text-[120px] font-heading font-black text-white/[0.02] select-none pointer-events-none tracking-tighter whitespace-nowrap overflow-hidden max-w-full z-0">
        {title}
      </div>

      <motion.div
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "4rem" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-[2px] bg-gradient-to-r from-white/30 to-transparent mb-6 rounded-full relative z-10"
      />

      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4 text-[#FFFFFF] relative z-10 flex items-center gap-4"
      >
        <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </span>
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl relative z-10 pl-9"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
