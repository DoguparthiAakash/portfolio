'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaTimes, FaUser } from 'react-icons/fa';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

export default function Chatbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hi! I'm an AI assistant trained on Aakash's resume and portfolio. What would you like to know about his engineering experience?",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm a simulated AI assistant right now! To implement a real chat-with-resume feature, you'd typically connect me to an LLM using RAG (Retrieval-Augmented Generation) with Aakash's resume as context. For now, feel free to email Aakash directly!",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center justify-center w-14 h-14 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-shadow"
          >
            <FaRobot size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-[calc(100vw-3rem)] md:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-[#111111] border border-[rgba(255,255,255,0.1)] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.08)] bg-[#111111]/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#4F8CFF]/20 flex items-center justify-center text-[#4F8CFF]">
                  <FaRobot size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Ask AI</h3>
                  <p className="text-xs text-[#A1A1AA]">Trained on Aakash's Resume</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#A1A1AA] hover:text-white transition-colors p-2"
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' 
                      ? 'bg-white/10 text-white' 
                      : 'bg-[#4F8CFF]/20 text-[#4F8CFF]'
                  }`}>
                    {msg.role === 'user' ? <FaUser size={12} /> : <FaRobot size={12} />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-tr-sm' 
                      : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#A1A1AA] rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4F8CFF]/20 flex items-center justify-center shrink-0 text-[#4F8CFF]">
                    <FaRobot size={12} />
                  </div>
                  <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-tl-sm flex gap-1">
                    <motion.div className="w-1.5 h-1.5 bg-[#A1A1AA] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-[#A1A1AA] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-[#A1A1AA] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-[rgba(255,255,255,0.08)] bg-[#111111]">
              <form 
                onSubmit={handleSubmit}
                className="relative flex items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-2 focus-within:border-white/20 transition-colors"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my experience..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-[#A1A1AA] pr-10"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center bg-white text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-gray-200"
                >
                  <FaPaperPlane size={12} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
