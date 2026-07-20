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
            I don't just glue APIs together. I build systems from the ground up to understand 
            the underlying constraints. Whether it's writing an operating system from scratch or 
            designing a new programming language, I break problems down to their fundamental truths 
            before engineering a solution.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">Production Grade AI</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            My passion lies at the intersection of low-level performance and high-level machine 
            learning. I enjoy tackling hard problems like building spam detection classifiers 
            and managing VM orchestrations, ensuring software isn't just a prototype, but a 
            fast and reliable production-ready tool.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">The End-to-End Mindset</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            Great systems are useless without a great interface. As a full-stack developer, I care 
            deeply about the user experience. I design applications like TextBeans to abstract away 
            complexity, leaving the user with an elegant, unified, and magical interaction.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-medium text-white">Continuous Learning</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            The technology landscape evolves weekly. I stay ahead not by chasing every trend, but by 
            building. My best insights come from hacking together OS concepts in C, experimenting 
            with machine learning in Python, and bridging the gap between hardware and software.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
