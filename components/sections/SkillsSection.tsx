"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { SKILLS } from "@/lib/constants";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(SKILLS[0].id);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeSkills = SKILLS.find((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="section-padding relative" aria-label="Skills">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(124,77,255,0.04),transparent_70%)]" />

      <div className="container-custom relative">
        <SectionHeader
          title="Technical Arsenal"
          subtitle="skills"
          description="Technologies and frameworks I use to build intelligent systems"
        />

        <div ref={ref}>
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {SKILLS.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative rounded-xl px-4 py-2 text-sm transition-all ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                }`}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-xl bg-white/10 border border-[var(--primary)]/20"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.title}</span>
                </span>
              </button>
            ))}
          </motion.div>

          {/* Skills grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
              {activeSkills?.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group glass glow-border cursor-default rounded-xl p-4 text-center transition-all hover:bg-white/[0.06]"
                >
                  <span className="font-[var(--font-heading)] text-sm font-medium text-white group-hover:text-[var(--primary)] transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Category counter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-[var(--text-muted)]"
          >
            {SKILLS.reduce((acc, cat) => acc + cat.skills.length, 0)}+ technologies
            across {SKILLS.length} categories
          </motion.p>
        </div>
      </div>
    </section>
  );
}
