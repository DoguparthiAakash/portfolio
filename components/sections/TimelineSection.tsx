"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { TIMELINE, type TimelineEvent } from "@/lib/constants";
import {
  GraduationCap,
  Award,
  Trophy,
  Code2,
  Briefcase,
  FlaskConical,
  FolderGit2,
} from "lucide-react";

const TYPE_CONFIG: Record<
  TimelineEvent["type"],
  { icon: typeof GraduationCap; color: string }
> = {
  education: { icon: GraduationCap, color: "text-[var(--primary)]" },
  certification: { icon: Award, color: "text-[var(--accent)]" },
  competition: { icon: Trophy, color: "text-yellow-400" },
  hackathon: { icon: Code2, color: "text-[var(--secondary)]" },
  internship: { icon: Briefcase, color: "text-orange-400" },
  research: { icon: FlaskConical, color: "text-[var(--primary)]" },
  project: { icon: FolderGit2, color: "text-[var(--accent)]" },
};

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="section-padding relative" aria-label="Timeline">
      <div className="container-custom">
        <SectionHeader
          title="Journey"
          subtitle="timeline"
          description="Education, certifications, competitions, and experience"
        />

        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* Center line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)]/40 via-[var(--secondary)]/20 to-transparent md:left-1/2" />

          <div className="space-y-8">
            {TIMELINE.map((event, i) => {
              const config = TYPE_CONFIG[event.type];
              const Icon = config.icon;
              const isRight = i % 2 === 1;

              return (
                <motion.div
                  key={event.id}
                  initial={{
                    opacity: 0,
                    x: isRight ? 40 : -40,
                  }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start ${
                    isRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Icon on timeline */}
                  <div className="absolute left-8 z-10 flex -translate-x-1/2 md:left-1/2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] ${config.color}`}
                    >
                      <Icon size={14} />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-16 glass rounded-xl p-5 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isRight ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-[var(--font-mono)] text-xs text-[var(--text-muted)]">
                        {event.date}
                      </span>
                      <span
                        className={`rounded-md bg-white/5 px-2 py-0.5 text-[10px] capitalize ${config.color}`}
                      >
                        {event.type}
                      </span>
                    </div>
                    <h3 className="font-[var(--font-heading)] text-sm font-semibold text-white">
                      {event.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[var(--primary)]">
                      {event.organization}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {event.description}
                    </p>
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
