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
    <section id="contact" className="py-32 md:py-48 border-t border-[rgba(255,255,255,0.08)] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-[#FFFFFF]">
          Let's build something <span className="text-[#4F8CFF]">interesting.</span>
        </h2>
        
        <p className="text-lg md:text-xl text-[#A1A1AA] mb-12">
          I'm currently open for new opportunities. Whether you have a question or just want to say hi, 
          I'll try my best to get back to you!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton 
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium transition-colors hover:bg-gray-200"
            as="a"
            href={`mailto:${email}`}
          >
            Say Hello
          </MagneticButton>

          <MagneticButton 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-full text-white transition-colors hover:bg-white/5"
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

      <div className="mt-32 pt-8 border-t border-[rgba(255,255,255,0.08)] w-full flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A1A1AA]">
        <p>© {new Date().getFullYear()} Aakash Doguparthi. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/aakash-doguparthi-129251297/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/DoguparthiAakash" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </section>
  );
}
