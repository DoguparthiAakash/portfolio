'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHome, FaUser, FaCode, FaEnvelope, FaTerminal, FaFileAlt } from 'react-icons/fa';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const handleSelect = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const commands = [
    { id: 'home', title: 'Home', icon: <FaHome />, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'about', title: 'About', icon: <FaUser />, action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'projects', title: 'Projects', icon: <FaCode />, action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'contact', title: 'Contact', icon: <FaEnvelope />, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'resume', title: 'Download Resume', icon: <FaFileAlt />, action: () => window.open('/resume.pdf', '_blank') },
    { id: 'terminal', title: 'Open Terminal', icon: <FaTerminal />, action: () => alert('Terminal Easter Egg! (Coming soon)') },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#111111] border border-[rgba(255,255,255,0.1)] rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center px-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
                <FaSearch className="text-[#A1A1AA] mr-3" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#A1A1AA] text-lg"
                  placeholder="Type a command or search..."
                />
                <div className="px-2 py-1 text-xs text-[#A1A1AA] bg-white/5 rounded border border-white/10">ESC</div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto py-2">
                {filteredCommands.length > 0 ? (
                  <ul className="px-2 space-y-1">
                    {filteredCommands.map((cmd) => (
                      <li key={cmd.id}>
                        <button
                          onClick={() => handleSelect(cmd.action)}
                          className="w-full flex items-center px-3 py-3 text-left text-sm text-[#A1A1AA] hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
                        >
                          <span className="mr-3 text-[#A1A1AA] group-hover:text-white transition-colors">{cmd.icon}</span>
                          {cmd.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center text-[#A1A1AA] text-sm">
                    No results found.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
