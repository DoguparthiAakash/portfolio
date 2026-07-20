'use client';

import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import { FaGithub, FaLinkedin, FaFileDownload, FaEnvelope } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#4F8CFF 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="z-10 flex flex-col items-center text-center px-6 mt-16 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-6">
            Systems Programmer & <br className="hidden md:block" />
            <span className="text-[#A1A1AA]">AI Engineer.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mb-12 leading-relaxed">
            Hi, I'm <span className="text-white font-medium">Doguparthi Aakash</span>. I build operating systems from scratch, design programming languages, and engineer applied AI solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          <MagneticButton 
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium transition-colors hover:bg-gray-200"
            as="a" 
            href="/Doguparthi_Aakash_Resume.pdf"
            target="_blank"
          >
            <FaFileDownload />
            <span>Resume</span>
          </MagneticButton>

          <MagneticButton
            className="flex items-center justify-center w-12 h-12 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-full text-[#A1A1AA] hover:text-white transition-colors"
            as="a"
            href="https://github.com/DoguparthiAakash"
            target="_blank"
          >
            <FaGithub size={20} />
          </MagneticButton>

          <MagneticButton
            className="flex items-center justify-center w-12 h-12 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-full text-[#A1A1AA] hover:text-white transition-colors"
            as="a"
            href="https://www.linkedin.com/in/aakash-doguparthi-129251297/"
            target="_blank"
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
    </section>
  );
}
