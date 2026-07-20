import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';

const MOCK_POSTS = [
  {
    slug: 'building-offline-ai-agents',
    title: 'Building Fully Offline AI Agents with llama.cpp',
    date: '2024-03-15',
    excerpt: 'How to run large language models locally on your machine without sacrificing speed or privacy, exploring ONNX and GGML formats.'
  },
  {
    slug: 'system-design-for-mlops',
    title: 'System Design for Modern MLOps',
    date: '2024-02-02',
    excerpt: 'Architecting robust machine learning pipelines from data ingestion to model deployment using Kubernetes, Ray, and MLflow.'
  },
  {
    slug: 'reasoning-in-llms',
    title: 'Eliciting Reasoning in LLMs: Beyond Chain of Thought',
    date: '2023-11-20',
    excerpt: 'A deep dive into advanced prompting techniques and fine-tuning strategies to make language models actually think before they speak.'
  }
];

export default function BlogPage() {
  return (
    <div className="px-6 md:px-12 lg:px-24 xl:px-48 mx-auto max-w-7xl w-full py-32 min-h-screen">
      <SectionHeading 
        title="Technical Writing" 
        subtitle="Thoughts on AI, machine learning, systems architecture, and engineering."
      />
      
      <div className="mt-16 space-y-12">
        {MOCK_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <article className="border-b border-[rgba(255,255,255,0.08)] pb-12 transition-colors hover:border-white/20">
              <time className="text-sm font-mono text-[#A1A1AA] mb-4 block">{post.date}</time>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#4F8CFF] transition-colors">
                {post.title}
              </h3>
              <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
