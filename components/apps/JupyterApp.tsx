"use client";

import { useState } from "react";
import { Play, Code2, CheckCircle2 } from "lucide-react";
import { SKILLS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function JupyterApp() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 1200);
  };

  return (
    <div className="h-full w-full bg-[#0d1117] text-[#c9d1d9] font-[var(--font-mono)] text-[13px]">
      {/* Jupyter Header */}
      <div className="flex h-10 items-center gap-4 border-b border-[#30363d] bg-[#161b22] px-4">
        <div className="flex items-center gap-2 text-[#8b949e]">
          <Code2 size={16} />
          <span>portfolio_skills.ipynb</span>
        </div>
        <div className="flex items-center gap-3 border-l border-[#30363d] pl-4 text-xs">
          <button className="hover:text-white transition-colors">File</button>
          <button className="hover:text-white transition-colors">Edit</button>
          <button className="hover:text-white transition-colors">View</button>
          <button className="hover:text-white transition-colors">Run</button>
          <button className="hover:text-white transition-colors">Kernel</button>
        </div>
      </div>

      {/* Notebook Content */}
      <div className="p-6">
        
        {/* Cell 1: Imports */}
        <div className="mb-6 flex gap-4">
          <div className="w-12 shrink-0 pt-1 text-right text-[#8b949e]">In [1]:</div>
          <div className="flex-1 rounded-md border border-[#30363d] bg-[#161b22] p-0 overflow-hidden">
            <div className="bg-[#21262d] px-3 py-1 border-b border-[#30363d] text-[#8b949e] flex justify-between items-center">
              <span>Python 3 (ipykernel)</span>
            </div>
            <pre className="p-3">
              <span className="text-[#ff7b72]">import</span> pandas <span className="text-[#ff7b72]">as</span> pd{"\n"}
              <span className="text-[#ff7b72]">import</span> matplotlib.pyplot <span className="text-[#ff7b72]">as</span> plt{"\n"}
              <span className="text-[#ff7b72]">from</span> portfolio.metrics <span className="text-[#ff7b72]">import</span> load_skills{"\n\n"}
              <span className="text-[#8b949e]"># Initialize engineer profile</span>{"\n"}
              engineer = load_skills(name=<span className="text-[#a5d6ff]">"Doguparthi Aakash"</span>, role=<span className="text-[#a5d6ff]">"AI/ML Systems Engineer"</span>)
            </pre>
          </div>
        </div>

        {/* Cell 2: Execution */}
        <div className="flex gap-4">
          <div className="w-12 shrink-0 pt-1 text-right text-[#8b949e]">
            In [{hasRun ? "2" : (isRunning ? "*" : " ")}]:
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="rounded-md border border-[#30363d] bg-[#161b22] flex group">
              <button 
                onClick={handleRun}
                disabled={isRunning}
                className="w-10 border-r border-[#30363d] flex items-center justify-center hover:bg-[#30363d] transition-colors disabled:opacity-50"
              >
                <Play size={14} className="text-[#3fb950] ml-1" />
              </button>
              <pre className="p-3 flex-1">
                engineer.plot_expertise_matrix()
              </pre>
            </div>

            {/* Output */}
            {hasRun && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2"
              >
                <div className="rounded-xl border border-[var(--border)] bg-black/40 p-6 backdrop-blur-md">
                  <h3 className="mb-6 font-[var(--font-heading)] text-xl text-white font-bold tracking-tight">Expertise Matrix</h3>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {SKILLS.map((category: any, idx: number) => {
                      const Icon = category.icon;
                      return (
                        <div key={idx} className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-[var(--primary)] font-semibold">
                            <Icon size={16} />
                            {category.title}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((item: any, i: number) => (
                              <span key={i} className="rounded bg-white/5 px-2.5 py-1 text-xs text-[var(--text-secondary)] border border-white/10 hover:border-[var(--primary)]/50 transition-colors cursor-default">
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-green-400">
                    <CheckCircle2 size={14} /> Matrix successfully rendered. Status: PRODUCTION_READY
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
