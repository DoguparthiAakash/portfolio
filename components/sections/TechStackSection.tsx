'use client';

import { motion, Variants } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const TECH_CATEGORIES = [
  {
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "Go", "Rust"]
  },
  {
    title: "Frameworks & Libraries",
    items: ["PyTorch", "TensorFlow", "React", "Next.js", "FastAPI", "TailwindCSS", "Framer Motion", "Electron"]
  },
  {
    title: "AI & ML",
    items: ["LangChain", "HuggingFace", "OpenAI", "Ollama", "Whisper", "ONNX", "llama.cpp"]
  },
  {
    title: "Databases & Tools",
    items: ["PostgreSQL", "SQLite", "MongoDB", "Vector DBs", "Docker", "Git", "Linux", "Vercel"]
  }
];

export default function TechStackSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="tech" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)]">
      <SectionHeading 
        title="Technical Arsenal" 
        subtitle="The core technologies and frameworks I leverage to engineer scalable, high-performance software systems."
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {TECH_CATEGORIES.map((category, index) => (
          <motion.div 
            key={category.title} 
            variants={itemVariants}
            className="relative w-full h-[380px] [perspective:2000px] group hover:z-50 cursor-pointer"
          >
            {/* Inside Pages */}
            <div className="absolute inset-0 bg-[#09090B] rounded-2xl rounded-l-md border-r-8 border-[#1A1A1A] shadow-[inset_20px_0_40px_rgba(0,0,0,0.8)] p-6 md:p-8 flex flex-col justify-center border-t border-b border-white/5">
              <ul className="space-y-4 relative z-10">
                {category.items.map(item => (
                  <li key={item} className="text-[#A1A1AA] font-mono text-xs md:text-[13px] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
                    {item}
                  </li>
                ))}
              </ul>
              
              {/* Page edge effect */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-white/[0.02]" />
            </div>

            {/* Book Cover Container */}
            <div className="absolute inset-0 origin-left transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[transform:rotateY(-160deg)] z-10 [transform-style:preserve-3d]">
              
              {/* Cover Front */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E22] to-[#111113] rounded-2xl rounded-l-md border border-[rgba(255,255,255,0.1)] shadow-[10px_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-8 [backface-visibility:hidden]">
                {/* Spine gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white/[0.07] to-transparent rounded-l-md" />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/20" />
                
                <span className="text-[#4F8CFF] font-mono text-3xl mb-6 font-bold opacity-80">0{index + 1}</span>
                <h3 className="text-2xl font-heading font-semibold text-white text-center leading-tight">
                  {category.title}
                </h3>
                
                {/* Decorative Line */}
                <div className="mt-10 w-12 h-1 bg-gradient-to-r from-[#4F8CFF] to-transparent rounded-full opacity-50" />
              </div>

              {/* Cover Back (Inside Cover) */}
              <div className="absolute inset-0 bg-gradient-to-bl from-[#111] to-[#0A0A0A] rounded-2xl rounded-r-md border border-[rgba(255,255,255,0.05)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                 {/* Inner spine shadow */}
                 <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/50 to-transparent rounded-r-md" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
