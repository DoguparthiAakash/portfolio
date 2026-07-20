"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Sparkles, MessageCircle } from 'lucide-react';

type Message = {
  id: string;
  type: 'user' | 'ai';
  text: string;
};

const SUGGESTIONS = [
  {
    label: "What is your experience?",
    answer: "I am a Machine Learning Engineer with experience building autonomous agents and orchestrating LLM workflows. Previously, I was an AI Researcher where I published 2 papers on parameter-efficient fine-tuning (PEFT), and I've also worked as a Developer at Emglitz Technologies building spam detection systems."
  },
  {
    label: "Tell me about Mithl OS",
    answer: "Mithl OS is a high-performance, independent operating system I built entirely from scratch. It focuses on Speed, Aesthetics, and Control, eliminating decades of legacy OS bloat to deliver a premium, distraction-free environment for creators and developers."
  },
  {
    label: "What are your core skills?",
    answer: "I specialize in Python, Java, C, Rust, and systems programming. I have strong experience with AI/ML pipelines, OS development, and frontend technologies like React and Tailwind CSS."
  },
  {
    label: "Education background?",
    answer: "I am a final-year Computer Science undergraduate specializing in AI & ML at V.S.B. Engineering College, with a CGPA of 7.56. My coursework heavily focused on Systems Architecture, Machine Learning, and Deep Learning."
  }
];

export default function AIChatbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'ai', text: "Hi! I am Aakash's AI assistant. Ask me anything about his experience, projects, or skills." }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSuggestionClick = (suggestion: typeof SUGGESTIONS[0]) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: suggestion.label }]);
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'ai', text: suggestion.answer }]);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: userText }]);
    setIsTyping(true);
    
    // Basic keyword matching
    setTimeout(() => {
      setIsTyping(false);
      const lower = userText.toLowerCase();
      let response = "I don't have a specific answer for that, but you can reach out to Aakash directly at doguparthiaakash@gmail.com!";
      
      if (lower.includes('os') || lower.includes('mithl') || lower.includes('uos')) {
        response = SUGGESTIONS[1].answer;
      } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('language')) {
        response = SUGGESTIONS[2].answer;
      } else if (lower.includes('exp') || lower.includes('work') || lower.includes('intern')) {
        response = SUGGESTIONS[0].answer;
      } else if (lower.includes('edu') || lower.includes('college') || lower.includes('degree')) {
        response = SUGGESTIONS[3].answer;
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'ai', text: response }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button for smaller screens or when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent text-white shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium pr-1 hidden md:block">Ask AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 md:right-auto md:left-1/2 md:-translate-x-1/2 z-50 w-[calc(100vw-3rem)] md:w-[450px] max-w-full flex flex-col shadow-2xl rounded-2xl overflow-hidden bg-card border border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-black/5 dark:bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Aakash AI</h3>
                  <p className="text-xs text-secondary">Based on resume data</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-secondary hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 max-h-[300px] min-h-[200px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.type === 'user' 
                        ? 'bg-accent text-white rounded-br-sm' 
                        : 'bg-black/5 dark:bg-white/10 text-foreground rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-black/5 dark:bg-white/10 text-foreground rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center h-10">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-secondary" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-secondary" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-secondary" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/50 backdrop-blur-md border-t border-border">
              {/* Suggestions */}
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 snap-x">
                {SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-border text-xs text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors snap-start"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
              
              <form onSubmit={handleCustomSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full h-12 pl-4 pr-12 rounded-full bg-black/5 dark:bg-white/5 border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm text-foreground placeholder:text-secondary"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-1 top-1 w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
