'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)]">
      <SectionHeading 
        title="Engineering Philosophy" 
        subtitle="How I approach building intelligent systems and solving complex problems."
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">First Principles Thinking</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            I don't just glue APIs together. I build systems from the ground up to understand 
            the underlying constraints. Whether it's training custom models, designing agentic 
            workflows, or optimizing inference architectures, I break problems down to their 
            fundamental truths before designing the solution.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">Production Grade AI</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            A demo is easy; a reliable product is hard. My focus is on crossing the chasm 
            between research prototypes and scalable, robust software. I build with observability, 
            evaluations, and guardrails in mind so that AI agents don't just sound smart—they 
            act reliably in the real world.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">The End-to-End Mindset</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            Great AI is useless without a great interface. As a full-stack engineer, I care 
            deeply about the user experience. I design systems where the complexity of the 
            machine learning models is abstracted away, leaving the user with an elegant, 
            instant, and magical interaction.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">Continuous Learning</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            The AI landscape evolves weekly. I stay ahead not by chasing every trend, but by 
            building. My best insights come from hacking together OS concepts, experimenting 
            with new LLM reasoning strategies, and building tools I personally need.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
