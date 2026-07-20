"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { RESEARCH_PAPERS } from "@/lib/constants";
import { BookOpen, CheckCircle2, Eye, Pencil } from "lucide-react";

const STATUS_CONFIG = {
  implemented: {
    label: "Implemented",
    icon: CheckCircle2,
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent)]/10",
  },
  studied: {
    label: "Studied",
    icon: Eye,
    color: "text-[var(--primary)]",
    bg: "bg-[var(--primary)]/10",
  },
  extended: {
    label: "Extended",
    icon: Pencil,
    color: "text-[var(--secondary)]",
    bg: "bg-[var(--secondary)]/10",
  },
};

export default function ResearchSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="research" className="section-padding relative" aria-label="Research">
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,245,255,0.03),transparent_70%)]" />

      <div className="container-custom relative">
        <SectionHeader
          title="Research Exploration"
          subtitle="papers"
          description="Key papers I've studied, implemented, and drawn inspiration from"
        />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)]/30 via-[var(--secondary)]/30 to-transparent md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {RESEARCH_PAPERS.map((paper, i) => {
              const status = STATUS_CONFIG[paper.status];
              const StatusIcon = status.icon;
              const isRight = i % 2 === 1;

              return (
                <motion.div
                  key={paper.title}
                  initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex items-start gap-8 ${
                    isRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 z-10 flex h-3 w-3 items-center justify-center md:left-1/2 md:-translate-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-[var(--primary)]" />
                    <div className="absolute h-3 w-3 animate-ping rounded-full bg-[var(--primary)] opacity-20" />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-12 glass rounded-xl p-5 transition-all hover:bg-white/[0.06] md:ml-0 md:w-[calc(50%-2rem)] ${
                      isRight ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-[var(--font-mono)] text-xs text-[var(--text-muted)]">
                            {paper.year}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] ${status.bg} ${status.color}`}
                          >
                            <StatusIcon size={10} />
                            {status.label}
                          </span>
                        </div>
                        <h3 className="font-[var(--font-heading)] text-sm font-semibold text-white leading-snug">
                          {paper.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                          {paper.authors}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                          {paper.keyContribution}
                        </p>
                      </div>
                      <BookOpen
                        size={16}
                        className="mt-1 shrink-0 text-[var(--text-muted)]"
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {paper.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-[var(--text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
