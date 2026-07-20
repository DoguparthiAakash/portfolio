"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Terminal, Code2, Network, Box, Cpu } from "lucide-react";
import { useOSStore } from "@/store/os-store";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "agent";
  content: string | React.ReactNode;
}

export default function AgentApp() {
  const { openApp } = useOSStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "System initialized. I am Aakash's portfolio agent. How can I assist you in exploring his work?"
    }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");

    // Mock processing delay
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response: React.ReactNode = "";

      if (lower.includes("skill") || lower.includes("experience") || lower.includes("resume")) {
        response = (
          <div className="flex flex-col gap-2">
            <p>I can show you his skills and experience in the Jupyter Lab environment.</p>
            <button 
              onClick={() => openApp({ id: "jupyter", title: "Jupyter Lab", icon: Code2 as any })}
              className="flex items-center gap-2 rounded bg-[var(--primary)]/10 px-3 py-1.5 text-sm text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors w-max"
            >
              <Code2 size={14} /> Open Jupyter Lab
            </button>
          </div>
        );
      } else if (lower.includes("project") || lower.includes("work")) {
        response = (
          <div className="flex flex-col gap-2">
            <p>Aakash's projects are best visualized as a neural graph. Let me open that for you.</p>
            <button 
              onClick={() => openApp({ id: "graph", title: "Neural Graph", icon: Network as any })}
              className="flex items-center gap-2 rounded bg-purple-500/10 px-3 py-1.5 text-sm text-purple-400 hover:bg-purple-500/20 transition-colors w-max"
            >
              <Network size={14} /> View Neural Graph
            </button>
          </div>
        );
      } else if (lower.includes("3d") || lower.includes("latent") || lower.includes("visual")) {
        response = (
          <div className="flex flex-col gap-2">
            <p>Launching the 3D Latent Space Explorer for high-dimensional visualization.</p>
            <button 
              onClick={() => openApp({ id: "latent", title: "Latent Space", icon: Box as any })}
              className="flex items-center gap-2 rounded bg-pink-500/10 px-3 py-1.5 text-sm text-pink-400 hover:bg-pink-500/20 transition-colors w-max"
            >
              <Box size={14} /> Explore Latent Space
            </button>
          </div>
        );
      } else {
        response = "I'm a simple agent. Try asking about Aakash's 'skills', 'projects', or '3d visualizations'.";
      }

      setMessages(prev => [...prev, { role: "agent", content: response }]);
    }, 600);
  };

  return (
    <div className="flex h-full w-full flex-col bg-black">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-white/10" : "bg-[var(--primary)]/20 text-[var(--primary)]"}`}>
              {msg.role === "user" ? <Terminal size={14} /> : <Cpu size={14} />}
            </div>
            <div className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-white/10 text-white" : "bg-[var(--primary)]/10 text-[var(--text-secondary)] border border-[var(--primary)]/20"}`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-[var(--border)] bg-black/50 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about Aakash's work..."
            className="flex-1 rounded-lg border border-[var(--border)] bg-black/50 px-4 py-2 text-sm text-white placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          <button 
            onClick={() => handleSend()}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-black hover:bg-[var(--primary)]/90 transition-colors"
          >
            <Send size={16} className="ml-1" />
          </button>
        </div>
        
        {/* Quick Prompts */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button onClick={() => handleSend("Show me his skills")} className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)] hover:bg-white/5 transition-colors">Show Skills</button>
          <button onClick={() => handleSend("What are his projects?")} className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)] hover:bg-white/5 transition-colors">View Projects</button>
          <button onClick={() => handleSend("Open Latent Space")} className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)] hover:bg-white/5 transition-colors">3D Visualization</button>
        </div>
      </div>
    </div>
  );
}
