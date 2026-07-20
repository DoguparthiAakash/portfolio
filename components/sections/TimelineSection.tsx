'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const TIMELINE_DATA = [
  {
    year: "Recent",
    title: "Developer",
    company: "Emglitz Technologies",
    description: "Built a Spam Detection system using supervised machine learning techniques. Handled data preprocessing (tokenization, TF-IDF vectorization) and trained classification models achieving reliable detection accuracy."
  },
  {
    year: "Recent",
    title: "Project Manager",
    company: "Infosys Springboard",
    description: "Led development of a Smart Home Energy Manager, overseeing requirements analysis, iterative delivery, and team coordination. Gained practical exposure to project lifecycle management and professional software delivery workflows."
  },
  {
    year: "Recent",
    title: "Data Manager",
    company: "ServiceNow Xanadu",
    description: "Managed end-to-end data operations, ensuring data quality, consistency, and governance across enterprise datasets."
  },
  {
    year: "2024",
    title: "B.E. in Computer Science (AI & ML)",
    company: "V.S.B. Engineering College",
    description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with a CGPA of 7.56 / 10.0."
  }
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)]">
      <SectionHeading 
        title="Experience & Education" 
        subtitle="My journey through academia, research, and industry."
      />

      <div className="relative border-l border-[rgba(255,255,255,0.08)] ml-4 md:ml-8 space-y-12 pb-8">
        {TIMELINE_DATA.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-[#4F8CFF] shadow-[0_0_10px_rgba(79,140,255,0.5)]" />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
              <span className="text-[#A1A1AA] text-sm md:text-base">{item.company}</span>
            </div>
            
            <div className="text-sm font-mono text-[#A1A1AA] mb-4 bg-white/5 inline-block px-3 py-1 rounded-md border border-white/10">
              {item.year}
            </div>
            
            <p className="text-[#A1A1AA] leading-relaxed max-w-2xl">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
