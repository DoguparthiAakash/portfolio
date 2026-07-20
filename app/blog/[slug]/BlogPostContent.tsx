"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface Props {
  post: {
    title: string;
    date: string;
    readTime: string;
    tags: string[];
    content: string;
  };
}

function renderMarkdown(content: string) {
  // Simple markdown-to-JSX renderer for blog posts
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = "";
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={key++} className="my-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-black/50 p-5">
            <code className="text-sm leading-relaxed text-[var(--text-secondary)] font-[var(--font-mono)]">
              {codeBuffer.join("\n")}
            </code>
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = line.replace("```", "").trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="mt-10 mb-4 font-[var(--font-heading)] text-2xl font-bold text-white">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="mt-8 mb-3 font-[var(--font-heading)] text-xl font-semibold text-white">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} className="ml-4 mb-1 text-sm text-[var(--text-secondary)] list-disc">
          {line.replace("- ", "")}
        </li>
      );
    } else if (line.startsWith("| ")) {
      // Simple table rendering
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      if (cells.some((c) => c.match(/^-+$/))) {
        continue; // Skip separator row
      }
      elements.push(
        <tr key={key++} className="border-b border-[var(--border)]">
          {cells.map((cell, i) => (
            <td key={i} className="px-4 py-2 text-sm text-[var(--text-secondary)]">
              {cell}
            </td>
          ))}
        </tr>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={key++} className="my-2 text-sm font-semibold text-white">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    } else if (line.trim() === "") {
      // Skip empty lines
    } else {
      // Process inline formatting
      const processed = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/`(.*?)`/g, '<code class="rounded bg-[rgba(0,245,255,0.1)] px-1.5 py-0.5 font-[var(--font-mono)] text-xs text-[var(--primary)]">$1</code>');
      
      elements.push(
        <p
          key={key++}
          className="my-3 text-[15px] leading-relaxed text-[var(--text-secondary)]"
          dangerouslySetInnerHTML={{ __html: processed }}
        />
      );
    }
  }

  return elements;
}

export default function BlogPostContent({ post }: Props) {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <article className="container-custom max-w-3xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4 flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-white leading-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[var(--primary)]/10 px-2.5 py-1 text-xs text-[var(--primary)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-[var(--primary)]/30 via-[var(--secondary)]/30 to-transparent" />
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose-custom"
        >
          {renderMarkdown(post.content)}
        </motion.div>
      </article>
    </main>
  );
}
