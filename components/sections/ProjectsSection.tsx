'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  github: string;
  demo?: string;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    id: "mithlos",
    category: "OS Development",
    title: "Mithl OS",
    description: "A high-performance, independent operating system engineered from the ground up to maximize speed, aesthetic elegance, and granular control. It systematically eliminates legacy bloat to deliver a refined, distraction-free environment.",
    github: "https://github.com/DoguparthiAakash/Mithl",
    gradient: "from-[#FF416C] to-[#FF4B2B]"
  },
  {
    id: "uos",
    category: "Mobile OS",
    title: "UOS",
    description: "An alternative mobile operating system built upon FreeBSD, meticulously designed to emulate the fluidity of an iOS experience. Engineered for exceptional stability and optimal performance across modern ARM and RISC-V architectures.",
    github: "https://github.com/DoguparthiAakash/freebsd-src/tree/mobile-os/mobile",
    gradient: "from-[#4776E6] to-[#8E54E9]"
  },
  {
    id: "nux",
    category: "Language Design",
    title: "NUX Language",
    description: "A custom programming language drawing inspiration from C, Rust, and Assembly. It elegantly harmonizes syntactical simplicity with rapid execution speed and robust memory safety, bridging the gap between low-level hardware control and modern developer ergonomics.",
    github: "https://github.com/DoguparthiAakash",
    gradient: "from-[#00B4DB] to-[#0083B0]"
  },
  {
    id: "plaza",
    category: "Systems",
    title: "Plaza VM",
    description: "A sophisticated virtual machine manager developed in Rust, strategically leveraging the language's strict safety guarantees and performance characteristics to facilitate highly reliable and secure VM orchestration.",
    github: "https://github.com/DoguparthiAakash",
    gradient: "from-[#f12711] to-[#f5af19]"
  },
  {
    id: "textbeans",
    category: "Software",
    title: "TextBeans",
    description: "A highly efficient, Java-based software solution engineered to seamlessly process diverse file formats within a unified, intuitive editing environment. It delivers a consistent and powerful interface tailored for streamlined development workflows.",
    github: "https://github.com/DoguparthiAakash/Text-Beans",
    gradient: "from-[#11998e] to-[#38ef7d]"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)] overflow-hidden">
      <SectionHeading 
        title="My Projects" 
        subtitle="Pioneering systems programming, low-level architecture, and applied artificial intelligence."
      />

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 -mx-4 hide-scrollbar">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="snap-center min-w-[300px] md:min-w-[360px] max-w-[380px] h-[500px] flex flex-col justify-between p-8 rounded-[32px] bg-card border border-border relative overflow-hidden group shadow-xl"
          >
            {/* Background Gradient Effect */}
            <div className={`absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b ${project.gradient} opacity-20 dark:opacity-40 transition-opacity duration-500 group-hover:opacity-30 dark:group-hover:opacity-60 pointer-events-none`} />
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-card via-card pointer-events-none`} />

            <div className="relative z-10">
              <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
                {project.category}
              </h4>
              <h3 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                {project.title}
              </h3>
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              <p className="text-secondary text-sm md:text-base leading-relaxed line-clamp-4">
                {project.description}
              </p>

              <div className="flex items-center gap-3 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background hover:scale-105 transition-transform shadow-lg"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-secondary/10 hover:bg-secondary/20 text-foreground transition-colors font-medium text-sm"
                  >
                    <span>Try it</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
