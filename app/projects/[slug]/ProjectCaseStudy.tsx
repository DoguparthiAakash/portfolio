"use client";

import { motion } from "framer-motion";
import { type Project } from "@/lib/constants";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Target,
  Layers,
  BarChart3,
  Lightbulb,
  Cpu,
  TrendingUp,
} from "lucide-react";

interface Props {
  project: Project;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectCaseStudy({ project }: Props) {
  const sections = [
    {
      title: "Problem Statement",
      icon: Target,
      content: project.problemStatement,
    },
    {
      title: "Architecture",
      icon: Layers,
      content: project.architecture,
    },
    {
      title: "Results",
      icon: TrendingUp,
      content: project.results,
    },
    {
      title: "Lessons Learned",
      icon: Lightbulb,
      content: project.lessonsLearned,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/#projects"
              className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-md bg-[var(--primary)]/10 px-3 py-1 font-[var(--font-mono)] text-xs uppercase text-[var(--primary)]">
                {project.category}
              </span>
            </div>
            <h1 className="font-[var(--font-heading)] text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
              {project.longDescription}
            </p>

            {/* Links */}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/5 px-5 py-2.5 text-sm text-white transition-all hover:border-[var(--border-hover)] hover:bg-white/10"
                >
                  <Github size={16} />
                  View Source
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-5 py-2.5 text-sm font-semibold text-black"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>

          {/* Metrics */}
          {project.metrics && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-10 glass rounded-2xl p-6"
            >
              <h2 className="mb-4 flex items-center gap-2 font-[var(--font-heading)] text-sm font-semibold text-white">
                <BarChart3 size={16} className="text-[var(--accent)]" />
                Performance Metrics
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="font-[var(--font-heading)] text-2xl font-bold text-white">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {key}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Case study sections */}
          <div className="mt-12 space-y-8">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-2xl p-6"
                >
                  <h2 className="mb-3 flex items-center gap-2 font-[var(--font-heading)] text-lg font-semibold text-white">
                    <Icon size={18} className="text-[var(--primary)]" />
                    {section.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {section.content}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 glass rounded-2xl p-6"
          >
            <h2 className="mb-4 flex items-center gap-2 font-[var(--font-heading)] text-lg font-semibold text-white">
              <Cpu size={18} className="text-[var(--secondary)]" />
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-white/5 border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
