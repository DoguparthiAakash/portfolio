"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User, Briefcase, Mail, BookOpen, FlaskConical, Terminal } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin } from "react-icons/fi";
import { PERSONAL } from "@/lib/constants";

interface CommandItem {
  id: string;
  name: string;
  icon: React.ElementType<any>;
  shortcut?: string;
  perform: () => void;
  section: "Navigation" | "Social" | "Actions";
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle palette on Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      
      // Close on escape
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const navigateTo = useCallback((path: string) => {
    setIsOpen(false);
    router.push(path);
  }, [router]);

  const openUrl = useCallback((url: string) => {
    setIsOpen(false);
    window.open(url, "_blank");
  }, []);

  const commands: CommandItem[] = [
    { id: "home", name: "Home", icon: Home, section: "Navigation", perform: () => navigateTo("/") },
    { id: "about", name: "About Me", icon: User, section: "Navigation", perform: () => navigateTo("/#about") },
    { id: "projects", name: "Projects", icon: Briefcase, section: "Navigation", perform: () => navigateTo("/#projects") },
    { id: "research", name: "Research", icon: FlaskConical, section: "Navigation", perform: () => navigateTo("/#research") },
    { id: "blog", name: "Blog", icon: BookOpen, section: "Navigation", perform: () => navigateTo("/blog") },
    { id: "playground", name: "AI Playground", icon: Terminal, section: "Navigation", perform: () => navigateTo("/playground") },
    { id: "contact", name: "Contact", icon: Mail, section: "Navigation", perform: () => navigateTo("/#contact") },
    
    { id: "github", name: "GitHub", icon: Github, section: "Social", perform: () => openUrl(PERSONAL.github) },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, section: "Social", perform: () => openUrl(PERSONAL.linkedin) },
    
    { id: "resume", name: "Download Resume", icon: Briefcase, section: "Actions", perform: () => openUrl(PERSONAL.resumePath) },
  ];

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(query.toLowerCase())
  );

  // Group by section
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.section]) acc[cmd.section] = [];
    acc[cmd.section].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const flatResults = Object.values(groupedCommands).flat();

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % flatResults.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            flatResults[selectedIndex].perform();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatResults, selectedIndex]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search Input */}
                <div className="flex items-center border-b border-[var(--border)] px-4 py-4">
                  <Search size={18} className="text-[var(--text-muted)]" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a command or search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="ml-3 flex-1 bg-transparent text-sm text-white placeholder-[var(--text-muted)] outline-none"
                  />
                  <div className="flex items-center gap-1 font-[var(--font-mono)] text-[10px] text-[var(--text-muted)]">
                    <span className="rounded border border-[var(--border)] bg-white/5 px-1.5 py-0.5">ESC</span>
                  </div>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-none">
                  {Object.entries(groupedCommands).length === 0 ? (
                    <div className="py-14 text-center text-sm text-[var(--text-muted)]">
                      No results found for "{query}"
                    </div>
                  ) : (
                    Object.entries(groupedCommands).map(([section, items]) => (
                      <div key={section} className="mb-2">
                        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-[var(--font-mono)]">
                          {section}
                        </div>
                        {items.map((cmd) => {
                          const index = flatResults.findIndex((item) => item.id === cmd.id);
                          const isSelected = index === selectedIndex;
                          const Icon = cmd.icon as any;

                          return (
                            <button
                              key={cmd.id}
                              onClick={cmd.perform}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                                isSelected
                                  ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                                  : "text-[var(--text-secondary)] hover:bg-white/5"
                              }`}
                            >
                              <Icon size={16} className={isSelected ? "text-[var(--primary)]" : "text-[var(--text-muted)]"} />
                              {cmd.name}
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between border-t border-[var(--border)] bg-white/[0.02] px-4 py-3 text-[10px] text-[var(--text-muted)] font-[var(--font-mono)]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="rounded border border-[var(--border)] bg-white/5 px-1.5 py-0.5">↑↓</span> to navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="rounded border border-[var(--border)] bg-white/5 px-1.5 py-0.5">↵</span> to select
                    </span>
                  </div>
                  <div>Command Menu</div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
