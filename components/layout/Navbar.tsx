"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, PERSONAL } from "@/lib/constants";
import { Menu, X, Command, Github, FileDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = NAV_ITEMS.filter((item) => item.href.startsWith("#")).map(
        (item) => item.href.slice(1)
      );

      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Command palette will be implemented in Phase 6
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "py-3"
            : "py-5"
        }`}
      >
        <div className="container-custom">
          <nav
            className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
              isScrolled
                ? "glass-strong shadow-lg shadow-black/20"
                : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="Home"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]">
                <span className="font-[var(--font-heading)] text-lg font-bold text-black">
                  A
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-0 blur-lg transition-opacity group-hover:opacity-50" />
              </div>
              <div className="hidden sm:block">
                <p className="font-[var(--font-heading)] text-sm font-semibold text-white">
                  Aakash
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  ML Engineer
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href.startsWith("#") &&
                  activeSection === item.href.slice(1);
                const isExternal = !item.href.startsWith("#");

                return isExternal ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative rounded-lg px-3 py-2 text-sm transition-colors hover:text-white ${
                      isActive
                        ? "text-white"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative rounded-lg px-3 py-2 text-sm transition-colors hover:text-white ${
                      isActive
                        ? "text-white"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-white/5"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Cmd+K hint */}
              <button
                className="hidden items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-white lg:flex"
                aria-label="Open command palette"
              >
                <Command size={12} />
                <span>K</span>
              </button>

              {/* GitHub */}
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-white"
                aria-label="GitHub profile"
              >
                <Github size={18} />
              </a>

              {/* Resume */}
              <a
                href={PERSONAL.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white transition-all hover:bg-white/10 sm:flex"
              >
                <FileDown size={14} />
                Resume
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/5 lg:hidden"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-xl lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 border-l border-[var(--border)] bg-[var(--bg-elevated)] p-6 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => {
                  const isExternal = !item.href.startsWith("#");
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {isExternal ? (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block rounded-lg px-4 py-3 text-lg text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className="block w-full rounded-lg px-4 py-3 text-left text-lg text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {item.label}
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-[var(--border)] pt-6">
                <a
                  href={PERSONAL.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-4 py-3 font-semibold text-black transition-transform hover:scale-[1.02]"
                >
                  <FileDown size={16} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
