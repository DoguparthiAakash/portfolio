"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { Network, ExternalLink } from "lucide-react";
import { FiGithub as Github } from "react-icons/fi";
import Link from "next/link";

export default function NeuralGraphApp() {
  return (
    <div className="relative h-full w-full bg-[#050505] overflow-hidden flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      
      {/* Network Visualization Container */}
      <div className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center p-8">
        
        {/* Input Layer (Experience/Education) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <div className="rounded-full border border-[var(--primary)] bg-[var(--primary)]/10 p-4 shadow-[0_0_30px_rgba(0,245,255,0.2)]">
            <Network className="h-8 w-8 text-[var(--primary)]" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-white tracking-widest uppercase text-xs">Core Model</h2>
            <p className="text-xs text-[var(--text-muted)]">Aakash AI Systems</p>
          </div>
        </motion.div>

        {/* SVG Connectors */}
        <svg className="absolute inset-0 h-full w-full z-0" style={{ pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {PROJECTS.map((_, i: number) => {
            const startX = "50%";
            const startY = "30%";
            const endX = `${20 + (i * (60 / (Math.max(PROJECTS.length - 1, 1))))}%`;
            const endY = "70%";
            
            return (
              <motion.path
                key={i}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                d={`M ${startX} ${startY} C ${startX} 50%, ${endX} 50%, ${endX} ${endY}`}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* Output Layer (Projects) */}
        <div className="relative z-10 mt-32 flex w-full justify-between gap-6 px-4">
          {PROJECTS.map((project: any, i: number) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.2) }}
              className="group relative flex flex-col items-center w-64"
            >
              {/* Node Point */}
              <div className="mb-4 h-4 w-4 rounded-full bg-[var(--primary)] shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-transform group-hover:scale-150" />
              
              {/* Project Card */}
              <div className="w-full rounded-xl border border-[var(--border)] bg-black/80 backdrop-blur p-4 transition-all hover:border-[var(--primary)]/50 hover:bg-black">
                <h3 className="mb-2 font-[var(--font-heading)] text-sm font-bold text-white line-clamp-1">{project.title}</h3>
                <p className="mb-4 text-xs text-[var(--text-secondary)] line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies?.slice(0, 3).map((tag: string, j: number) => (
                    <span key={j} className="text-[10px] text-[var(--primary)] bg-[var(--primary)]/10 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                  {project.github && (
                    <Link href={project.github} target="_blank" className="text-[var(--text-muted)] hover:text-white transition-colors">
                      <Github size={14} />
                    </Link>
                  )}
                  {project.liveDemo && (
                    <Link href={project.liveDemo} target="_blank" className="text-[var(--text-muted)] hover:text-white transition-colors">
                      <ExternalLink size={14} />
                    </Link>
                  )}
                  <Link href={`/projects/${project.slug}`} className="ml-auto text-xs text-[var(--primary)] hover:underline">
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
