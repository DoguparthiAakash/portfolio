"use client";

import { motion } from "framer-motion";
import { PERSONAL } from "@/lib/constants";
import TypewriterText from "./TypewriterText";
import ParticleField from "./ParticleField";
import dynamic from "next/dynamic";
import { ArrowDown, Github, FlaskConical, FileDown, Mail } from "lucide-react";

const NeuralNetwork3D = dynamic(
  () => import("@/components/three/NeuralNetwork3D"),
  { ssr: false }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <ParticleField />

      {/* Radial gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,245,255,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,77,255,0.06),transparent_50%)]" />

      {/* Content */}
      <div className="container-custom relative z-10 py-32">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/5 px-4 py-1.5 text-xs text-[var(--text-secondary)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-[var(--font-heading)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="text-white">{PERSONAL.firstName}</span>
              <br />
              <span className="gradient-text">{PERSONAL.lastName}</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              variants={itemVariants}
              className="mt-4 min-h-[2rem] font-[var(--font-mono)] text-lg text-[var(--primary)] sm:text-xl"
            >
              <TypewriterText texts={PERSONAL.roles} />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
            >
              {PERSONAL.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-6 py-3 font-[var(--font-heading)] text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <FlaskConical size={16} />
                Explore Projects
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-0 blur-xl transition-opacity group-hover:opacity-40" />
              </a>
              <a
                href="#research"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/5 px-6 py-3 text-sm text-white transition-all hover:border-[var(--primary)] hover:bg-white/10"
              >
                Research
              </a>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm text-white transition-all hover:border-[var(--border-hover)] hover:bg-white/10"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm text-white transition-all hover:border-[var(--border-hover)] hover:bg-white/10"
                aria-label="Contact"
              >
                <Mail size={16} />
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-8 border-t border-[var(--border)] pt-6"
            >
              {[
                { label: "ML Models", value: "50+" },
                { label: "Papers Studied", value: "100+" },
                { label: "Projects", value: "30+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-[var(--font-heading)] text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Neural Network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden aspect-square lg:block"
          >
            {/* Glow ring behind the 3D scene */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.1)_0%,transparent_70%)]" />
            <div className="absolute inset-[10%] rounded-full border border-[var(--primary)]/10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-[20%] rounded-full border border-[var(--secondary)]/5 animate-[spin_45s_linear_infinite_reverse]" />
            <NeuralNetwork3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
