'use client';

import { motion, Variants } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const PHILOSOPHIES = [
  {
    title: "First Principles Thinking",
    text: "I reject superficial abstraction in favor of deep technical comprehension. My approach involves architecting systems from their foundational components to master the underlying constraints. Whether engineering custom models, orchestrating complex agentic workflows, or optimizing inference architectures, I deconstruct challenges to their fundamental truths prior to formulating a solution."
  },
  {
    title: "Production Grade AI",
    text: "While prototyping is accessible, engineering deterministic reliability is complex. My expertise lies in bridging the divide between experimental research and scalable, enterprise-grade software. I implement rigorous observability, comprehensive evaluations, and strict guardrails, ensuring that AI agents exhibit both sophisticated reasoning and steadfast reliability in production environments."
  },
  {
    title: "The End-to-End Mindset",
    text: "Advanced artificial intelligence requires an equally refined interface to deliver true value. Operating with a full-stack perspective, I prioritize seamless user experiences. I architect systems that elegantly abstract the inherent complexity of machine learning models, presenting users with interactions that are intuitive, instantaneous, and exceptionally crafted."
  },
  {
    title: "Continuous Learning",
    text: "In a rapidly evolving AI landscape, I maintain a competitive edge through relentless, hands-on execution rather than passive observation. My most profound insights emerge from synthesizing low-level operating system concepts, pioneering novel LLM reasoning strategies, and engineering bespoke tools to solve emergent technical challenges."
  }
];

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)] relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#4F8CFF]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <SectionHeading 
        title="Engineering Philosophy" 
        subtitle="How I approach building intelligent systems and solving complex problems."
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
      >
        {PHILOSOPHIES.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants} 
            className="group relative p-8 md:p-10 rounded-[32px] bg-[#09090B] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            {/* Giant watermark number */}
            <div className="absolute -right-4 -top-10 text-[140px] leading-none font-heading font-bold text-white/[0.02] group-hover:text-white/[0.04] group-hover:-translate-y-4 transition-all duration-700 pointer-events-none select-none">
              0{index + 1}
            </div>
            
            {/* Hover glow orb */}
            <div className="absolute -left-20 -top-20 w-48 h-48 bg-[#4F8CFF]/5 rounded-full blur-3xl group-hover:bg-[#4F8CFF]/15 transition-all duration-700 pointer-events-none" />

            <h3 className="text-2xl font-heading font-bold text-white mb-6 relative z-10 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#4F8CFF]/50 rounded-full" />
              {item.title}
            </h3>
            
            <p className="font-sans text-[#A1A1AA] leading-relaxed relative z-10 text-[15px]">
              {item.text}
            </p>
            
            {/* Bottom glowing line on hover */}
            <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#4F8CFF]/0 to-transparent group-hover:via-[#4F8CFF]/40 transition-all duration-700" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
