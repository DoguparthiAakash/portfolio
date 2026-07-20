"use client";

import SpotlightCard from "../ui/SpotlightCard";
import { FolderSvgIcon, FileSvgIcon } from "../ui/FileSystemIcons";
import { motion } from "framer-motion";

export default function BentoGridSection() {
  const projects = [
    {
      title: "Agentic OS",
      description: "A multi-agent operating system built on Next.js.",
      color: "#3B82F6",
      type: "folder"
    },
    {
      title: "Neural Graph",
      description: "Real-time visualization of LLM latent spaces.",
      color: "#8B5CF6",
      type: "file"
    },
    {
      title: "MLOps Pipeline",
      description: "End-to-end Kubeflow pipeline for model training.",
      color: "#10B981",
      type: "file"
    },
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Work</h2>
        <p className="text-gray-400 text-lg">A collection of my latest projects and research.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <SpotlightCard className="h-full flex flex-col items-start gap-6 hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16">
                {project.type === "folder" ? (
                  <FolderSvgIcon />
                ) : (
                  <FileSvgIcon color={project.color} />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
