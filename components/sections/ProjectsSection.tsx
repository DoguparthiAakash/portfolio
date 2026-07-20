'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaMicrochip, FaMobileAlt, FaCode, FaServer, FaFileCode } from 'react-icons/fa';

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
  bgClass: string;
  icon: any;
};

const PROJECTS: Project[] = [
  {
    id: "mithlos",
    title: "Mithl OS",
    subtitle: "Custom Operating System",
    description: "Independent operating system built entirely from scratch, focused on Speed, Aesthetics, and Control.",
    problem: "Modern operating systems suffer from decades of legacy bloat, degrading performance and introducing distractions for developers and creators.",
    solution: "Built a new operating system from scratch to eliminate legacy overhead and deliver a premium, distraction-free environment.",
    tech: ["C", "Assembly", "Systems Architecture"],
    architecture: "Custom kernel architecture with independent memory management, interrupt handling, and bespoke graphics pipeline.",
    challenges: "Developing a bootloader and managing low-level hardware interactions without relying on standard abstractions or libraries.",
    results: "A functioning, fast, and visually appealing operating system environment built entirely from the ground up.",
    github: "https://github.com/DoguparthiAakash/Mithl",
    demo: "https://github.com/DoguparthiAakash/Mithl",
    bgClass: "from-blue-600 to-indigo-900",
    icon: FaMicrochip
  },
  {
    id: "uos",
    title: "UOS Mobile",
    subtitle: "FreeBSD-based Mobile OS",
    description: "Alternative mobile operating system based on FreeBSD, delivering an iOS-like experience for mobile devices.",
    problem: "The mobile OS duopoly limits user control and developer freedom, while existing open-source alternatives lack stability and premium aesthetics.",
    solution: "Engineered a custom mobile OS built on top of the rock-solid FreeBSD kernel, providing an iOS-like experience.",
    tech: ["FreeBSD", "C", "C++", "ARM", "RISC-V"],
    architecture: "Leverages the FreeBSD kernel tailored for mobile hardware (ARM MediaTek, Qualcomm, and RISC-V processors).",
    challenges: "Adapting a traditionally server/desktop-focused kernel to the constraints and power profiles of mobile processors.",
    results: "High stability and performance with comprehensive architecture support.",
    github: "https://github.com/DoguparthiAakash/freebsd-src/tree/mobile-os/mobile",
    demo: "https://github.com/DoguparthiAakash/freebsd-src/tree/mobile-os/mobile",
    bgClass: "from-emerald-600 to-teal-900",
    icon: FaMobileAlt
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
    bgClass: "from-orange-600 to-red-900",
    icon: FaCode
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
    bgClass: "from-purple-600 to-fuchsia-900",
    icon: FaServer
  },
  {
    id: "textbeans",
    title: "TextBeans",
    subtitle: "Unified Editing Environment",
    description: "A lightweight yet powerful Java-based software designed to work with any file format in one unified editing environment.",
    problem: "Users often need to switch between multiple different applications to edit various file types, breaking workflow focus.",
    solution: "Created a consistent interface across multiple file types, eliminating the need to switch between different apps.",
    tech: ["Java", "Swing/JavaFX", "File I/O"],
    architecture: "Modular plugin-like architecture capable of interpreting and rendering different file formats within a single window instance.",
    challenges: "Building a performant rendering engine in Java that can smoothly handle large text files and binary formats.",
    results: "A highly versatile, unified workspace tool.",
    github: "https://github.com/DoguparthiAakash/Text-Beans",
    demo: "https://github.com/DoguparthiAakash/Text-Beans",
    bgClass: "from-yellow-600 to-amber-900",
    icon: FaFileCode
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
        {PROJECTS.map((project) => {
          const IconComponent = project.icon;
          return (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              className={`cursor-pointer relative overflow-hidden rounded-[2rem] min-h-[450px] flex flex-col justify-between bg-gradient-to-br ${project.bgClass} shadow-2xl transition-transform hover:-translate-y-2`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Content Top */}
              <div className="p-8 z-10">
                <motion.p layoutId={`subtitle-${project.id}`} className="text-white/80 font-medium tracking-wide text-sm md:text-base mb-2">
                  {project.subtitle}
                </motion.p>
                <motion.h3 layoutId={`title-${project.id}`} className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  {project.title}
                </motion.h3>
              </div>

              {/* Card Visual Bottom */}
              <div className="relative h-48 w-full flex items-end justify-end p-8 z-0">
                <IconComponent className="text-white/20 w-48 h-48 absolute -bottom-8 -right-8 transform -rotate-12" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl bg-gradient-to-br ${selectedProject.bgClass}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6 md:p-12">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors z-20"
                >
                  <FaTimes />
                </button>

                <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                  {selectedProject.title}
                </motion.h3>
                <motion.p layoutId={`subtitle-${selectedProject.id}`} className="text-xl md:text-2xl text-white/80 font-medium mb-10">
                  {selectedProject.subtitle}
                </motion.p>

                <div className="bg-[#111111]/90 backdrop-blur-xl rounded-2xl p-6 md:p-10 text-white shadow-xl">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-medium text-white/60 mb-2 uppercase tracking-wider text-sm">Overview</h4>
                      <p className="text-white/90 leading-relaxed text-lg">{selectedProject.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-medium text-white/60 mb-2 uppercase tracking-wider text-sm">The Problem</h4>
                        <p className="text-white/80 leading-relaxed">{selectedProject.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white/60 mb-2 uppercase tracking-wider text-sm">The Solution</h4>
                        <p className="text-white/80 leading-relaxed">{selectedProject.solution}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white/60 mb-3 uppercase tracking-wider text-sm">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map(t => (
                          <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white/60 mb-2 uppercase tracking-wider text-sm">Architecture</h4>
                      <p className="text-white/80 leading-relaxed">{selectedProject.architecture}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-medium text-white/60 mb-2 uppercase tracking-wider text-sm">Challenges</h4>
                        <p className="text-white/80 leading-relaxed">{selectedProject.challenges}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white/60 mb-2 uppercase tracking-wider text-sm">Results</h4>
                        <p className="leading-relaxed text-[#22C55E] font-medium">{selectedProject.results}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-white/10">
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold transition-colors hover:bg-gray-200"
                    >
                      <FaGithub /> Source Code
                    </a>
                    <a 
                      href={selectedProject.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 text-white rounded-full font-semibold transition-colors hover:bg-white/10"
                    >
                      <FaExternalLinkAlt size={12} /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
