"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { PLAYGROUND_DEMOS } from "@/lib/constants";
import {
  Upload,
  Send,
  Loader2,
  Zap,
  Clock,
  Cpu,
  BarChart3,
  X,
  ImageIcon,
  MessageSquare,
  Type,
} from "lucide-react";

// Simulated inference results
const MOCK_RESULTS: Record<string, unknown> = {
  "image-classification": {
    predictions: [
      { label: "Golden Retriever", confidence: 0.94 },
      { label: "Labrador Retriever", confidence: 0.03 },
      { label: "Irish Setter", confidence: 0.01 },
      { label: "Cocker Spaniel", confidence: 0.01 },
      { label: "Beagle", confidence: 0.005 },
    ],
    latency: "127ms",
    model: "EfficientNet-B4",
  },
  "object-detection": {
    detections: [
      { label: "person", confidence: 0.97, bbox: "142, 85, 380, 510" },
      { label: "car", confidence: 0.93, bbox: "420, 230, 680, 450" },
      { label: "traffic light", confidence: 0.88, bbox: "310, 20, 340, 80" },
    ],
    latency: "45ms",
    model: "YOLOv8-Large",
  },
  "sentiment-analysis": {
    sentiment: "Positive",
    score: 0.92,
    breakdown: { positive: 0.92, neutral: 0.06, negative: 0.02 },
    latency: "23ms",
    model: "DistilBERT-SST2",
  },
  "text-summarization": {
    summary:
      "The research introduces a novel attention mechanism that achieves state-of-the-art results on multiple NLP benchmarks while reducing computational complexity from quadratic to linear in sequence length.",
    latency: "340ms",
    model: "BART-Large-CNN",
  },
  "llm-chat": {
    response:
      "Machine learning is a subset of artificial intelligence that enables systems to learn patterns from data without being explicitly programmed. It encompasses supervised learning (classification, regression), unsupervised learning (clustering, dimensionality reduction), and reinforcement learning. The field has been revolutionized by deep learning, which uses neural networks with multiple layers to learn hierarchical representations.",
    latency: "1.2s",
    model: "GPT-4o-mini",
  },
  "question-answering": {
    answer:
      "The Transformer architecture uses self-attention mechanisms to process all positions in a sequence simultaneously, replacing the sequential processing of RNNs.",
    confidence: 0.96,
    latency: "89ms",
    model: "RoBERTa-Large-SQuAD",
  },
};

function DemoCard({
  demo,
  onSelect,
}: {
  demo: (typeof PLAYGROUND_DEMOS)[0];
  onSelect: () => void;
}) {
  const typeIcon = {
    image: ImageIcon,
    text: Type,
    chat: MessageSquare,
    audio: Zap,
  }[demo.type];
  const Icon = typeIcon;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="group glass glow-border rounded-2xl p-6 text-left transition-all hover:bg-white/[0.06] w-full"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-2xl">{demo.icon}</span>
        <Icon size={14} className="text-[var(--text-muted)]" />
      </div>
      <h3 className="font-[var(--font-heading)] text-base font-semibold text-white group-hover:text-[var(--primary)] transition-colors">
        {demo.title}
      </h3>
      <p className="mt-1 text-xs text-[var(--text-secondary)]">
        {demo.description}
      </p>
      <p className="mt-3 font-[var(--font-mono)] text-[10px] text-[var(--text-muted)]">
        Model: {demo.model}
      </p>
    </motion.button>
  );
}

function DemoPanel({
  demo,
  onClose,
}: {
  demo: (typeof PLAYGROUND_DEMOS)[0];
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);

    // Simulate inference
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

    setResult(MOCK_RESULTS[demo.id] as Record<string, unknown>);
    setIsRunning(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl">{demo.icon}</span>
          <div>
            <h3 className="font-[var(--font-heading)] text-lg font-semibold text-white">
              {demo.title}
            </h3>
            <p className="font-[var(--font-mono)] text-xs text-[var(--text-muted)]">
              {demo.model}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-white/5 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Input */}
      <div className="mb-4">
        {demo.type === "image" ? (
          <label className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-white/[0.02] transition-colors hover:border-[var(--primary)]/30">
            <div className="text-center">
              <Upload size={24} className="mx-auto mb-2 text-[var(--text-muted)]" />
              <p className="text-sm text-[var(--text-secondary)]">
                Drop an image or click to upload
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                (Demo uses simulated inference)
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() => setInput("image_uploaded")}
            />
          </label>
        ) : (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] outline-none focus:border-[var(--primary)] resize-none"
            placeholder={
              demo.type === "chat"
                ? "Ask me anything about AI or machine learning..."
                : demo.id === "question-answering"
                ? "Paste context here, then ask a question..."
                : "Enter text to analyze..."
            }
          />
        )}
      </div>

      {/* Run button */}
      <button
        onClick={handleRun}
        disabled={isRunning}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {isRunning ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {isRunning ? "Running Inference..." : "Run Model"}
      </button>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-xl border border-[var(--border)] bg-white/[0.02] p-5"
          >
            {/* Metadata bar */}
            <div className="mb-4 flex flex-wrap items-center gap-4 border-b border-[var(--border)] pb-3">
              <span className="flex items-center gap-1.5 text-xs text-[var(--accent)]">
                <Clock size={12} />
                {(result as Record<string, string>).latency}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <Cpu size={12} />
                {(result as Record<string, string>).model}
              </span>
            </div>

            {/* Demo-specific result rendering */}
            {demo.id === "image-classification" && (
              <div className="space-y-2">
                {((result as Record<string, { label: string; confidence: number }[]>).predictions || []).map(
                  (pred: { label: string; confidence: number }, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-36 text-sm text-white truncate">
                        {pred.label}
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pred.confidence * 100}%` }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                        />
                      </div>
                      <span className="font-[var(--font-mono)] text-xs text-[var(--text-secondary)] w-12 text-right">
                        {(pred.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  )
                )}
              </div>
            )}

            {demo.id === "object-detection" && (
              <div className="space-y-2">
                {((result as Record<string, { label: string; confidence: number; bbox: string }[]>).detections || []).map(
                  (det: { label: string; confidence: number; bbox: string }, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2"
                    >
                      <span className="text-sm text-white">{det.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-[var(--font-mono)] text-xs text-[var(--accent)]">
                          {(det.confidence * 100).toFixed(0)}%
                        </span>
                        <span className="font-[var(--font-mono)] text-[10px] text-[var(--text-muted)]">
                          [{det.bbox}]
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {demo.id === "sentiment-analysis" && (
              <div>
                <div className="mb-4 text-center">
                  <p className="text-3xl font-bold text-[var(--accent)]">
                    {(result as Record<string, string>).sentiment}
                  </p>
                  <p className="font-[var(--font-mono)] text-sm text-[var(--text-secondary)]">
                    Score: {String((result as Record<string, number>).score)}
                  </p>
                </div>
                <div className="flex gap-2">
                  {Object.entries(
                    (result as Record<string, Record<string, number>>).breakdown || {}
                  ).map(([key, val]) => (
                    <div key={key} className="flex-1 rounded-lg bg-white/5 p-3 text-center">
                      <p className="text-xs capitalize text-[var(--text-muted)]">{key}</p>
                      <p className="font-[var(--font-mono)] text-sm text-white">
                        {((val as number) * 100).toFixed(0)}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(demo.id === "text-summarization" || demo.id === "llm-chat") && (
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {(result as Record<string, string>).summary || (result as Record<string, string>).response}
                </p>
              </div>
            )}

            {demo.id === "question-answering" && (
              <div>
                <div className="rounded-lg bg-white/5 p-4 mb-2">
                  <p className="text-sm text-white">
                    {(result as Record<string, string>).answer}
                  </p>
                </div>
                <p className="font-[var(--font-mono)] text-xs text-[var(--accent)]">
                  Confidence: {String((result as Record<string, number>).confidence)}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PlaygroundHub() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const activeDemo = PLAYGROUND_DEMOS.find((d) => d.id === selectedDemo);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container-custom max-w-5xl">
        <SectionHeader
          title="AI Playground"
          subtitle="interactive demos"
          description="Try different AI models — upload images, analyze text, and chat with language models"
        />

        <AnimatePresence mode="wait">
          {selectedDemo && activeDemo ? (
            <DemoPanel
              key={selectedDemo}
              demo={activeDemo}
              onClose={() => setSelectedDemo(null)}
            />
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {PLAYGROUND_DEMOS.map((demo, i) => (
                <motion.div
                  key={demo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <DemoCard
                    demo={demo}
                    onSelect={() => setSelectedDemo(demo.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
