"use client";

import { motion } from "framer-motion";

export default function Loading() {
  const INIT_STEPS = [
    "Initializing Neural Networks...",
    "Loading Model Weights...",
    "Compiling Computation Graph...",
    "Allocating GPU Memory...",
    "Ready.",
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--bg)]">
      <div className="w-full max-w-md px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]">
            <span className="font-[var(--font-heading)] text-2xl font-bold text-black">
              A
            </span>
          </div>
        </motion.div>

        {/* Terminal output */}
        <div className="rounded-xl border border-[var(--border)] bg-black/50 p-4 font-[var(--font-mono)] text-xs">
          {INIT_STEPS.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.3 }}
              className={`mb-1 ${
                i === INIT_STEPS.length - 1
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              <span className="text-[var(--primary)] mr-2">$</span>
              {step}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
          />
        </div>
      </div>
    </div>
  );
}
