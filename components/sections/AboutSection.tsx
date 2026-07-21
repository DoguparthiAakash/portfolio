'use client';

import { motion, Variants } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

export default function AboutSection() {
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
            I reject superficial abstraction in favor of deep technical comprehension. My approach involves architecting systems from their foundational components to master the underlying constraints. Whether engineering custom models, orchestrating complex agentic workflows, or optimizing inference architectures, I deconstruct challenges to their fundamental truths prior to formulating a solution.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">Production Grade AI</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            While prototyping is accessible, engineering deterministic reliability is complex. My expertise lies in bridging the divide between experimental research and scalable, enterprise-grade software. I implement rigorous observability, comprehensive evaluations, and strict guardrails, ensuring that AI agents exhibit both sophisticated reasoning and steadfast reliability in production environments.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">The End-to-End Mindset</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            Advanced artificial intelligence requires an equally refined interface to deliver true value. Operating with a full-stack perspective, I prioritize seamless user experiences. I architect systems that elegantly abstract the inherent complexity of machine learning models, presenting users with interactions that are intuitive, instantaneous, and exceptionally crafted.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">Continuous Learning</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            In a rapidly evolving AI landscape, I maintain a competitive edge through relentless, hands-on execution rather than passive observation. My most profound insights emerge from synthesizing low-level operating system concepts, pioneering novel LLM reasoning strategies, and engineering bespoke tools to solve emergent technical challenges.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
