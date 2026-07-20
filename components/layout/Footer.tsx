"use client";

import { PERSONAL, NAV_ITEMS } from "@/lib/constants";
import { Github, Linkedin, Mail, Heart, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "GitHub", href: PERSONAL.github, icon: Github },
  { label: "LinkedIn", href: PERSONAL.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${PERSONAL.email}`, icon: Mail },
];

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Three.js",
  "Framer Motion",
  "Tailwind CSS",
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg)]">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />

      <div className="container-custom py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]">
                <span className="font-[var(--font-heading)] text-lg font-bold text-black">
                  A
                </span>
              </div>
              <div>
                <p className="font-[var(--font-heading)] font-semibold text-white">
                  Aakash Doguparthi
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Machine Learning Engineer
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Building intelligent software, autonomous AI systems, and
              production-ready machine learning applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const isExternal = !item.href.startsWith("#");
                return isExternal ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-1 text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
              Connect
            </h3>
            <div className="flex gap-3 mb-6">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
            <a
              href={PERSONAL.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--primary)] px-4 py-2 text-sm text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-black"
            >
              Download Resume
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Aakash Doguparthi. Built with{" "}
            <Heart size={12} className="text-red-400" /> and lots of compute.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
