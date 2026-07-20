import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogList from "./BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles on machine learning, deep learning, NLP, computer vision, and AI systems engineering by Aakash Doguparthi.",
};

// Blog posts data (in production, could be sourced from MDX files or CMS)
export const BLOG_POSTS = [
  {
    slug: "transformer-architecture-deep-dive",
    title: "Understanding the Transformer Architecture: A Deep Dive",
    excerpt:
      "A comprehensive walkthrough of the Transformer architecture from 'Attention Is All You Need' — covering self-attention, multi-head attention, positional encoding, and implementation details in PyTorch.",
    date: "2025-01-15",
    readTime: "15 min",
    tags: ["Transformers", "Deep Learning", "NLP", "PyTorch"],
    category: "Architecture",
  },
  {
    slug: "building-production-rag-systems",
    title: "Building Production RAG Systems: From Prototype to Scale",
    excerpt:
      "A practical guide to building Retrieval-Augmented Generation systems that actually work in production — covering chunking strategies, hybrid search, re-ranking, evaluation, and deployment patterns.",
    date: "2025-03-22",
    readTime: "20 min",
    tags: ["RAG", "LLMs", "Vector Databases", "LangChain"],
    category: "MLOps",
  },
  {
    slug: "cuda-optimization-deep-learning",
    title: "CUDA Optimization Techniques for Deep Learning Training",
    excerpt:
      "Practical techniques for optimizing deep learning training throughput — mixed precision, gradient accumulation, data loading, memory optimization, and profiling with NVIDIA Nsight.",
    date: "2025-05-10",
    readTime: "18 min",
    tags: ["CUDA", "GPU", "Optimization", "PyTorch"],
    category: "Performance",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <BlogList posts={BLOG_POSTS} />
      <Footer />
    </>
  );
}
