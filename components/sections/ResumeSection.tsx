"use client";

import SpotlightCard from "../ui/SpotlightCard";
import { FileSvgIcon } from "../ui/FileSystemIcons";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumeSection() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SpotlightCard className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-white/5 to-white/0 p-12">
          <div className="w-32 h-32 shrink-0">
            <FileSvgIcon color="#F43F5E" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Curriculum Vitae</h2>
            <p className="text-gray-400 mb-8 max-w-xl">
              Comprehensive overview of my academic background, professional experience in machine learning, and published research.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium transition-colors">
              <Download size={18} />
              Download Resume.pdf
            </button>
          </div>
        </SpotlightCard>
      </motion.div>
    </section>
  );
}
