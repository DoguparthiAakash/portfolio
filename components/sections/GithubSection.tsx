'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { FaGithub } from 'react-icons/fa';

export default function GithubSection() {
  // Generate a mock contribution graph
  const weeks = 52;
  const daysPerWeek = 7;
  const contributions = Array.from({ length: weeks * daysPerWeek }, () => Math.floor(Math.random() * 4));

  return (
    <section id="github" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
        <SectionHeading 
          title="Open Source" 
          subtitle="I believe in building in public and contributing to the AI ecosystem."
        />
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className="group flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white w-fit"
        >
          <FaGithub size={20} />
          <span>@aakashdoguparthi</span>
        </a>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 md:p-8 rounded-2xl bg-[#111111] border border-[rgba(255,255,255,0.08)] overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-12">
          <div className="text-center md:text-left">
            <h4 className="text-[#A1A1AA] text-sm uppercase tracking-widest mb-1">Total Contributions</h4>
            <p className="text-4xl md:text-5xl font-bold text-white">1,204</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-[#A1A1AA] text-sm uppercase tracking-widest mb-1">Current Streak</h4>
            <p className="text-4xl md:text-5xl font-bold text-white">14 Days</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-[#A1A1AA] text-sm uppercase tracking-widest mb-1">Repositories</h4>
            <p className="text-4xl md:text-5xl font-bold text-white">42</p>
          </div>
        </div>

        {/* Mock Contribution Graph */}
        <div className="overflow-x-auto pb-4 hide-scrollbar">
          <div className="inline-flex flex-col gap-1 min-w-max">
            {Array.from({ length: daysPerWeek }).map((_, dayIndex) => (
              <div key={dayIndex} className="flex gap-1">
                {Array.from({ length: weeks }).map((_, weekIndex) => {
                  const level = contributions[weekIndex * daysPerWeek + dayIndex];
                  
                  // Color mapping matching the dark mode green theme
                  let bgColor = "bg-[#161B22]"; // level 0 (empty)
                  if (level === 1) bgColor = "bg-[#0E4429]";
                  if (level === 2) bgColor = "bg-[#006D32]";
                  if (level === 3) bgColor = "bg-[#26A641]";
                  if (level === 4) bgColor = "bg-[#39D353]";

                  return (
                    <motion.div 
                      key={weekIndex}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: (weekIndex * 0.01) + (dayIndex * 0.01) }}
                      className={`w-3 h-3 rounded-sm ${bgColor}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
