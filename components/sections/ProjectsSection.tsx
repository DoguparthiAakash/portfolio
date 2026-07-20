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
    id: "clerk",
    title: "Clerk",
    subtitle: "Offline AI Desktop Assistant",
    description: "A fast, fully offline desktop AI assistant utilizing local LLMs for extreme privacy and speed.",
    problem: "Cloud-based AI assistants compromise privacy, require internet, and often have noticeable latency.",
    solution: "Built a native desktop application that runs quantized models (Llama 3, Mistral) locally using ONNX and llama.cpp integrations.",
    tech: ["Electron", "React", "TypeScript", "TailwindCSS", "llama.cpp", "SQLite"],
    architecture: "Electron handles the native windowing and IPC. The main process runs a C++ inference engine bridged to Node.js, while the React renderer provides a 60fps chat interface.",
    challenges: "Managing memory usage when loading 4GB+ models and keeping the UI thread unblocked during token generation.",
    results: "Achieved 30+ tokens/s on M-series MacBooks and modern Windows PCs with zero cloud dependencies.",
    github: "https://github.com",
    demo: "https://example.com",
    imageColor: "from-blue-500/20 to-purple-600/20"
  },
  {
    id: "textbeans",
    title: "TextBeans",
    subtitle: "Modern AI-Powered Text Editor",
    description: "A lightweight text editor infused with AI capabilities to autocomplete, refactor, and generate code seamlessly.",
    problem: "Most AI editors are either too heavy (Electron-based IDEs) or lack deep context awareness.",
    solution: "Developed a custom text rendering engine and integrated semantic search to feed relevant workspace context to the AI.",
    tech: ["Rust", "Tauri", "React", "TypeScript", "LangChain", "Vector DB"],
    architecture: "Tauri for the native backend (Rust) to handle file system operations and vector embeddings. React frontend with Monaco editor for syntax highlighting.",
    challenges: "Implementing a fast, local vector database for instant code retrieval without hogging CPU resources.",
    results: "Sub-100ms context retrieval and a buttery smooth editing experience with a memory footprint under 150MB.",
    github: "https://github.com",
    demo: "https://example.com",
    imageColor: "from-green-500/20 to-emerald-600/20"
  },
  {
    id: "mithlos",
    title: "Mithl OS",
    subtitle: "Operating System from Scratch",
    description: "A hobbyist 32-bit x86 operating system written from scratch to deeply understand computer architecture.",
    problem: "High-level abstractions often hide the fundamental mechanisms of how software interacts with hardware.",
    solution: "Built a custom bootloader, kernel, memory allocator, and simple file system.",
    tech: ["C", "x86 Assembly", "Make", "QEMU"],
    architecture: "Monolithic kernel architecture with a custom interrupt descriptor table (IDT) and paging system.",
    challenges: "Debugging triple faults and writing a reliable memory manager from scratch without any standard libraries.",
    results: "Successfully boots on bare metal (and QEMU), handles hardware interrupts, and provides a basic command-line interface.",
    github: "https://github.com",
    demo: "https://example.com",
    imageColor: "from-orange-500/20 to-red-600/20"
  },
  {
    id: "smartagri",
    title: "Smart Agri Manager",
    subtitle: "AI Agriculture Platform",
    description: "An AI-driven platform that predicts crop yields and recommends optimal planting schedules based on weather data.",
    problem: "Farmers lack accessible tools to make data-driven decisions regarding crop management.",
    solution: "Aggregated satellite data, weather forecasts, and soil metrics to feed into a time-series forecasting model.",
    tech: ["Python", "PyTorch", "FastAPI", "Next.js", "PostgreSQL"],
    architecture: "Microservices architecture. FastAPI serves the PyTorch model, Next.js handles the dashboard, and a cron job orchestrates data ingestion from external APIs.",
    challenges: "Dealing with missing or noisy satellite data and normalizing it for the deep learning model.",
    results: "Deployed to beta testers, showing a 15% predicted improvement in resource allocation.",
    github: "https://github.com",
    demo: "https://example.com",
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
