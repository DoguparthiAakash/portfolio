"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { PERSONAL } from "@/lib/constants";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  FileDown,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 3000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  const SOCIALS = [
    { label: "GitHub", href: PERSONAL.github, icon: Github },
    { label: "LinkedIn", href: PERSONAL.linkedin, icon: Linkedin },
    { label: "Email", href: `mailto:${PERSONAL.email}`, icon: Mail },
  ];

  return (
    <section id="contact" className="section-padding relative" aria-label="Contact">
      <div className="container-custom">
        <SectionHeader
          title="Let's Connect"
          subtitle="contact"
          description="Interested in collaborating on AI/ML projects? Let's build the future of intelligence together."
        />

        <div ref={ref} className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] outline-none transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] outline-none transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] outline-none transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20"
                  placeholder="Collaboration opportunity"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-none rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] outline-none transition-all focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <button
                type="submit"
                disabled={formState === "loading" || formState === "success"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-6 py-3 font-[var(--font-heading)] text-sm font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
              >
                {formState === "loading" && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {formState === "success" && <CheckCircle2 size={16} />}
                {formState === "idle" && <Send size={16} />}
                {formState === "error" && <Send size={16} />}
                {formState === "loading"
                  ? "Sending..."
                  : formState === "success"
                  ? "Message Sent!"
                  : formState === "error"
                  ? "Failed — Try Again"
                  : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Social links */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-[var(--font-heading)] text-sm font-semibold text-white mb-4">
                Find me online
              </h3>
              <div className="space-y-3">
                {SOCIALS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl p-3 text-[var(--text-secondary)] transition-all hover:bg-white/5 hover:text-white"
                  >
                    <link.icon size={18} />
                    <span className="text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-[var(--font-heading)] text-sm font-semibold text-white mb-2">
                Resume
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-4">
                Download my complete resume with experience, skills, and
                education details.
              </p>
              <a
                href={PERSONAL.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--primary)] px-5 py-2.5 text-sm text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-black"
              >
                <FileDown size={16} />
                Download PDF
              </a>
            </div>

            {/* Quick contact */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-[var(--font-heading)] text-sm font-semibold text-white mb-2">
                Direct Contact
              </h3>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="text-sm text-[var(--primary)] hover:underline break-all"
              >
                {PERSONAL.email}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
