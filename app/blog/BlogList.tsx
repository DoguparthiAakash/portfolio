"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <SectionHeader
          title="Technical Blog"
          subtitle="writing"
          description="Deep dives into machine learning, AI architecture, and systems engineering"
        />

        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <article className="group glass glow-border rounded-2xl p-6 transition-all hover:bg-white/[0.06]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="rounded-md bg-[var(--primary)]/10 px-2 py-0.5 text-[10px] uppercase font-[var(--font-mono)] text-[var(--primary)]">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Calendar size={10} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-[var(--font-heading)] text-xl font-semibold text-white group-hover:text-[var(--primary)] transition-colors">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-[var(--text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-sm text-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100">
                      Read
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
