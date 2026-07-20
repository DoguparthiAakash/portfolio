import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  return (
    <article className="px-6 md:px-12 mx-auto max-w-3xl w-full py-32 min-h-screen">
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors mb-12"
      >
        <FaArrowLeft size={14} /> Back to Blog
      </Link>
      
      <header className="mb-16">
        <time className="text-sm font-mono text-[#A1A1AA] mb-4 block">2024-03-15</time>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Building Fully Offline AI Agents with llama.cpp
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center font-bold text-sm">
            AD
          </div>
          <div>
            <p className="text-white font-medium">Aakash Doguparthi</p>
            <p className="text-sm text-[#A1A1AA]">AI Engineer</p>
          </div>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-[#A1A1AA] prose-a:text-[#4F8CFF] prose-pre:bg-[#111111] prose-pre:border prose-pre:border-[rgba(255,255,255,0.08)]">
        <p>
          This is a mock blog post. In a production environment, this would render MDX content parsed by next-mdx-remote or similar libraries.
        </p>
        <h2>The Architecture</h2>
        <p>
          To make this work fully offline, we have to bypass traditional cloud REST APIs and interface directly with the model weights on disk.
        </p>
        <pre><code>{`import { LLaMA } from 'llama-node';\nimport { LLamaCpp } from 'llama-node/dist/llm/llama-cpp.js';\n\nconst llama = new LLaMA(LLamaCpp);\nllama.load({ path: './models/mistral-7b-v0.1.Q4_K_M.gguf' });`}</code></pre>
        <h2>Conclusion</h2>
        <p>
          The era of cloud-only AI is over. Local inference is fast, private, and surprisingly capable.
        </p>
      </div>
    </article>
  );
}
