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
            className="p-6 rounded-2xl bg-[#111111] border border-[rgba(255,255,255,0.08)] hover:border-white/20 transition-colors"
          >
            <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-3">
              <span className="text-[#4F8CFF]">0{index + 1}</span>
              {category.title}
            </h3>
            
            <ul className="space-y-3">
              {category.items.map(item => (
                <li key={item} className="text-[#A1A1AA] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
