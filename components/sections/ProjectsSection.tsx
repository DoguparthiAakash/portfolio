"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { PROJECTS } from "@/lib/constants";
import { ArrowUpRight, Github, BarChart3 } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "LLM", "CV", "ML", "NLP", "MLOps"];

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    filter === "All"
      ? PROJECTS.filter((p) => p.featured)
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative" aria-label="Projects">
      <div className="container-custom">
        <SectionHeader
          title="Featured Projects"
          subtitle="portfolio"
          description="End-to-end AI systems — from research to production"
        />

        <div ref={ref}>
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  filter === cat
                    ? "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                    : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="group glass glow-border rounded-2xl p-6 transition-all hover:bg-white/[0.06] h-full flex flex-col">
                    {/* Category badge */}
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-md bg-[var(--primary)]/10 px-2 py-1 font-[var(--font-mono)] text-[10px] uppercase text-[var(--primary)]">
                        {project.category}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-[var(--text-muted)] transition-all group-hover:text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-[var(--font-heading)] text-lg font-semibold text-white group-hover:text-[var(--primary)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] flex-1">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-4">
                        {Object.entries(project.metrics)
                          .slice(0, 4)
                          .map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1.5">
                              <BarChart3
                                size={10}
                                className="text-[var(--accent)]"
                              />
                              <div>
                                <p className="font-[var(--font-mono)] text-xs font-semibold text-white">
                                  {value}
                                </p>
                                <p className="text-[9px] text-[var(--text-muted)]">
                                  {key}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Tech stack */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    {project.github && (
                      <div className="mt-4 flex gap-2">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.github, "_blank");
                          }}
                        >
                          <Github size={12} />
                          Source
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
