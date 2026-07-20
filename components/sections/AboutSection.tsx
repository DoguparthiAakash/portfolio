"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { ABOUT, STATS } from "@/lib/constants";
import { Brain, Rocket, Search, BookOpen } from "lucide-react";

const ICONS = [Brain, Rocket, Search, BookOpen];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="font-[var(--font-heading)] text-3xl font-bold text-white sm:text-4xl">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}
          {suffix}
        </motion.span>
      ) : (
        "0"
      )}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" aria-label="About">
      <div className="container-custom">
        <SectionHeader
          title="About Me"
          subtitle="whoami"
          description="Engineering intelligent systems from research to production"
        />

        <div ref={ref} className="grid gap-12 lg:grid-cols-5">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8">
              <p className="text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                {ABOUT.summary}
              </p>

              {/* Stats grid */}
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {ABOUT.philosophy.map((item, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="group glass rounded-xl p-5 transition-all hover:border-[var(--primary)]/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-[var(--font-heading)] text-sm font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
