'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  architecture: string;
  challenges: string;
  results: string;
  github: string;
  demo: string;
  imageColor: string;
};

const PROJECTS: Project[] = [
  {
    id: "mithlos",
    title: "Mithl OS",
    subtitle: "High-performance Operating System",
    description: "Independent operating system built entirely from scratch, focused on Speed, Aesthetics, and Control.",
    problem: "Modern operating systems suffer from decades of legacy bloat, degrading performance and introducing distractions for developers and creators.",
    solution: "Built a new operating system from scratch to eliminate legacy overhead and deliver a premium, distraction-free environment.",
    tech: ["C", "Assembly", "Systems Architecture"],
    architecture: "Custom kernel architecture with independent memory management, interrupt handling, and bespoke graphics pipeline.",
    challenges: "Developing a bootloader and managing low-level hardware interactions without relying on standard abstractions or libraries.",
    results: "A functioning, fast, and visually appealing operating system environment built entirely from the ground up.",
    github: "https://github.com/DoguparthiAakash/Mithl",
    demo: "https://github.com/DoguparthiAakash/Mithl",
    imageColor: "from-blue-500/20 to-purple-600/20"
  },
  {
    id: "uos",
    title: "UOS — Mobile OS",
    subtitle: "FreeBSD-based Mobile Operating System",
    description: "Alternative mobile operating system based on FreeBSD, delivering an iOS-like experience for mobile devices.",
    problem: "The mobile OS duopoly limits user control and developer freedom, while existing open-source alternatives lack stability and premium aesthetics.",
    solution: "Engineered a custom mobile OS built on top of the rock-solid FreeBSD kernel, providing an iOS-like experience.",
    tech: ["FreeBSD", "C", "C++", "ARM", "RISC-V"],
    architecture: "Leverages the FreeBSD kernel tailored for mobile hardware (ARM MediaTek, Qualcomm, and RISC-V processors).",
    challenges: "Adapting a traditionally server/desktop-focused kernel to the constraints and power profiles of mobile processors.",
    results: "High stability and performance with comprehensive architecture support.",
    github: "https://github.com/DoguparthiAakash/freebsd-src/tree/mobile-os/mobile",
    demo: "https://github.com/DoguparthiAakash/freebsd-src/tree/mobile-os/mobile",
    imageColor: "from-green-500/20 to-emerald-600/20"
  },
  {
    id: "nux",
    title: "NUX Language",
    subtitle: "Systems Programming Language",
    description: "A programming language inspired by C, Rust, and Assembly — designed for simplicity, high execution speed, and memory safety.",
    problem: "There is often a harsh trade-off between the low-level control of C/Assembly and the memory safety/ergonomics of modern languages like Rust.",
    solution: "Designed and implemented a new compiler and runtime that bridges the gap between low-level control and modern language ergonomics.",
    tech: ["Compiler Design", "LLVM", "C++", "Assembly"],
    architecture: "Custom lexer, parser, and semantic analyzer generating optimized machine code.",
    challenges: "Balancing strict memory safety rules without compromising on bare-metal execution speed.",
    results: "A fast, memory-safe language that feels as simple to write as modern high-level languages while performing like C.",
    github: "https://github.com/DoguparthiAakash",
    demo: "https://github.com/DoguparthiAakash",
    imageColor: "from-orange-500/20 to-red-600/20"
  },
  {
    id: "plaza",
    title: "Plaza",
    subtitle: "Virtual Machine Manager",
    description: "A virtual machine manager built with Rust, leveraging Rust's safety and performance guarantees for reliable VM orchestration.",
    problem: "Existing virtual machine managers can be bloated or prone to memory-safety vulnerabilities in their hypervisor implementations.",
    solution: "Built a lightweight VM manager entirely in Rust to ensure memory safety without sacrificing native virtualization performance.",
    tech: ["Rust", "Virtualization", "Systems Programming"],
    architecture: "Interacts directly with KVM/hypervisor APIs to orchestrate isolated virtual environments efficiently.",
    challenges: "Mapping complex hypervisor ioctls to safe Rust abstractions.",
    results: "A highly reliable, secure, and performant virtual machine manager.",
    github: "https://github.com/DoguparthiAakash",
    demo: "https://github.com/DoguparthiAakash",
    imageColor: "from-indigo-500/20 to-blue-600/20"
  },
  {
    id: "textbeans",
    title: "TextBeans",
    subtitle: "Unified File Editing Environment",
    description: "A lightweight yet powerful Java-based software designed to work with any file format in one unified editing environment.",
    problem: "Users often need to switch between multiple different applications to edit various file types, breaking workflow focus.",
    solution: "Created a consistent interface across multiple file types, eliminating the need to switch between different apps.",
    tech: ["Java", "Swing/JavaFX", "File I/O"],
    architecture: "Modular plugin-like architecture capable of interpreting and rendering different file formats within a single window instance.",
    challenges: "Building a performant rendering engine in Java that can smoothly handle large text files and binary formats.",
    results: "A highly versatile, unified workspace tool.",
    github: "https://github.com/DoguparthiAakash/Text-Beans",
    demo: "https://github.com/DoguparthiAakash/Text-Beans",
    imageColor: "from-yellow-500/20 to-amber-600/20"
  }
];

export default function ProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)]">
      <SectionHeading 
        title="Featured Work" 
        subtitle="Select projects that showcase my ability to build complex, production-ready software."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className="cursor-pointer group relative rounded-2xl bg-[#111111] border border-[rgba(255,255,255,0.08)] overflow-hidden transition-colors hover:border-[#4F8CFF]/50"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`h-48 md:h-64 w-full bg-gradient-to-br ${project.imageColor} transition-transform duration-700 group-hover:scale-105`} />
            <div className="p-6 md:p-8">
              <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold text-white mb-2">
                {project.title}
              </motion.h3>
              <motion.p layoutId={`subtitle-${project.id}`} className="text-[#A1A1AA]">
                {project.subtitle}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#111111] rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className={`h-48 md:h-64 w-full bg-gradient-to-br ${selectedProject.imageColor}`} />
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6 md:p-12">
                <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {selectedProject.title}
                </motion.h3>
                <motion.p layoutId={`subtitle-${selectedProject.id}`} className="text-xl text-[#4F8CFF] mb-8">
                  {selectedProject.subtitle}
                </motion.p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Overview</h4>
                    <p className="text-[#A1A1AA] leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">The Problem</h4>
                      <p className="text-[#A1A1AA] leading-relaxed">{selectedProject.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">The Solution</h4>
                      <p className="text-[#A1A1AA] leading-relaxed">{selectedProject.solution}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-[#A1A1AA]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Architecture</h4>
                    <p className="text-[#A1A1AA] leading-relaxed">{selectedProject.architecture}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Challenges</h4>
                    <p className="text-[#A1A1AA] leading-relaxed">{selectedProject.challenges}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Results</h4>
                    <p className="text-[#A1A1AA] leading-relaxed text-[#22C55E]">{selectedProject.results}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium transition-colors hover:bg-gray-200"
                  >
                    <FaGithub /> Source Code
                  </a>
                  <a 
                    href={selectedProject.demo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 text-white rounded-full font-medium transition-colors hover:bg-white/10"
                  >
                    <FaExternalLinkAlt size={12} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
