'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import { FaCheck } from 'react-icons/fa';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "doguparthiaakash@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 border-t border-[rgba(255,255,255,0.08)] flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* --- Ambient Background Effects --- */}
      {/* Subtle Dot Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} 
      />
      
      {/* Left/Right Glows */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#4F8CFF]/20 blur-[120px] -translate-y-1/2 rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#8B5CF6]/15 blur-[120px] -translate-y-1/2 rounded-full pointer-events-none z-0" />

      {/* Large Hollow Vertical Typography (Hidden on small screens) */}
      <div 
        className="absolute -left-8 lg:-left-4 top-1/2 -translate-y-1/2 hidden md:block text-[100px] lg:text-[180px] font-bold font-heading opacity-5 pointer-events-none select-none z-0 tracking-widest uppercase"
        style={{ 
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%) rotate(180deg)',
          WebkitTextStroke: '2px white',
          color: 'transparent'
        }}
      >
        Connect
      </div>

      <div 
        className="absolute -right-8 lg:-right-4 top-1/2 -translate-y-1/2 hidden md:block text-[100px] lg:text-[180px] font-bold font-heading opacity-5 pointer-events-none select-none z-0 tracking-widest uppercase"
        style={{ 
          writingMode: 'vertical-rl',
          WebkitTextStroke: '2px white',
          color: 'transparent'
        }}
      >
        Collaborate
      </div>
      {/* --------------------------------- */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl relative z-10 px-6"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-8 text-[#FFFFFF] drop-shadow-xl">
          let's build something <span className="text-[#4F8CFF]">InterestinG</span>
        </h2>
        
        <p className="font-serif text-lg md:text-xl text-[#A1A1AA] mb-12 drop-shadow-md">
          I am actively exploring new engineering opportunities. Whether you seek to discuss complex technical challenges, potential collaborations, or architectural inquiries, I look forward to connecting.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton 
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium transition-colors hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            as="a"
            href={`mailto:${email}`}
          >
            Say Hello
          </MagneticButton>

          <MagneticButton 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-full text-white transition-colors hover:bg-white/5 backdrop-blur-md"
            onClick={handleCopy}
            as="button"
          >
            {copied ? (
              <>
                <FaCheck className="text-[#22C55E]" /> Copied!
              </>
            ) : (
              "Copy Email"
            )}
          </MagneticButton>
        </div>
      </motion.div>

      <div className="mt-32 pt-8 border-t border-[rgba(255,255,255,0.08)] w-full flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A1A1AA] px-8 relative z-10">
        <p>© {new Date().getFullYear()} Aakash Doguparthi. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/aakash-doguparthi-129251297/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/DoguparthiAakash" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </section>
  );
}
