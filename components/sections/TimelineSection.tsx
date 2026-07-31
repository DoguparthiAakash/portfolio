'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const TIMELINE_DATA = [
  {
    year: "Internship",
    title: "Developer",
    company: "Emglitz Technologies",
    description: "Engineered a sophisticated Spam Detection system leveraging supervised machine learning methodologies. Orchestrated rigorous data preprocessing pipelines—including advanced tokenization and TF-IDF vectorization—and trained classification models to achieve highly reliable detection accuracy."
  },
  {
    year: "Internship",
    title: "Project Manager",
    company: "Infosys Springboard",
    description: "Spearheaded the development of a Smart Home Energy Manager, directing comprehensive requirements analysis, iterative software delivery, and cross-functional team coordination to ensure seamless project lifecycle execution."
  },
  {
    year: "Internship",
    title: "Data Manager",
    company: "ServiceNow Xanadu",
    description: "Directed end-to-end data operations, enforcing rigorous data quality standards, architectural consistency, and robust governance policies across critical enterprise datasets."
  },
  {
    year: "Education",
    title: "B.E. Computer Science (AI & ML)",
    company: "V.S.B. Engineering College",
    description: "Pursued an intensive specialization in Artificial Intelligence and Machine Learning, cultivating deep theoretical and practical expertise. Graduated with a CGPA of 7.56 / 10.0."
  }
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4F8CFF]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

    <SectionHeading
      title="Experience & Education"
      subtitle="My journey through academia, research, and industry."
    />

    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      {/* The Central Glowing Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#4F8CFF]/40 to-transparent transform md:-translate-x-1/2" />

      <div className="space-y-12 md:space-y-24">
        {TIMELINE_DATA.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#0A0A0A] border-2 border-[#4F8CFF] transform -translate-x-[7px] md:-translate-x-1/2 shadow-[0_0_15px_rgba(79,140,255,0.8)] z-10">
                <div className="absolute inset-0 rounded-full bg-[#4F8CFF] animate-ping opacity-20" />
              </div>

              {/* Empty Space for layout */}
              <div className="hidden md:block md:w-1/2" />

              {/* The Content Card */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <div className="group relative p-8 rounded-3xl bg-[#09090B] border border-white/5 hover:border-[#4F8CFF]/30 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(79,140,255,0.15)] overflow-hidden">

                  {/* Inner glowing orb effect on hover */}
                  <div className={`absolute top-0 w-32 h-32 bg-[#4F8CFF]/5 rounded-full blur-3xl -z-10 transition-all duration-500 group-hover:bg-[#4F8CFF]/20 ${isEven ? 'right-0 -mr-10' : 'left-0 -ml-10'}`} />

                  {/* Top glass reflection */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] font-mono text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(79,140,255,0.1)]">
                    {item.year}
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-[#4F8CFF] transition-colors">{item.title}</h3>

                  <div className={`text-[#A1A1AA] font-mono text-sm mb-6 flex items-center gap-3 ${isEven ? 'md:justify-end' : ''}`}>
                    {!isEven && <span className="w-8 h-[1px] bg-white/20 hidden md:block" />}
                    {item.company}
                    {isEven && <span className="w-8 h-[1px] bg-white/20 hidden md:block" />}
                  </div>

                  <p className="font-sans text-[#A1A1AA] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
    </section>
  );
}
