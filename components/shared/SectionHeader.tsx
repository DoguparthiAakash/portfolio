"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
}: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span className="mb-3 inline-block font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--primary)]">
        {subtitle}
      </span>
      <h2 className="font-[var(--font-heading)] text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
          {description}
        </p>
      )}
      <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
    </motion.div>
  );
}
