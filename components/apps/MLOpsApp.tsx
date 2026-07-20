"use client";

import { motion } from "framer-motion";
import { Server, Database, Cloud, Zap, Shield, Cpu, Code2 } from "lucide-react";

export default function MLOpsApp() {
  const architectures = [
    {
      category: "Model Training & Fine-Tuning",
      icon: Cpu,
      tools: ["PyTorch", "Hugging Face Transformers", "DeepSpeed", "Ray Tune", "JAX"],
      description: "Distributed training setups for LLMs and deep neural networks using mixed precision and model parallel architectures."
    },
    {
      category: "Inference & Serving",
      icon: Zap,
      tools: ["vLLM", "TensorRT-LLM", "Triton Inference Server", "ONNX Runtime", "TorchServe"],
      description: "High-throughput, low-latency model serving environments deployed on A100/H100 clusters."
    },
    {
      category: "Agentic Workflows",
      icon: Code2,
      tools: ["LangChain", "LlamaIndex", "AutoGen", "DSPy", "OpenAI Functions"],
      description: "Building autonomous agents that plan, reason, and execute tasks via tool calling and RAG."
    },
    {
      category: "MLOps & Infrastructure",
      icon: Server,
      tools: ["Kubernetes (K8s)", "Docker", "MLflow", "Weights & Biases", "Kubeflow"],
      description: "End-to-end model lifecycle management, experiment tracking, and automated deployment pipelines."
    },
    {
      category: "Vector Databases & Retrieval",
      icon: Database,
      tools: ["Pinecone", "Milvus", "Qdrant", "Weaviate", "FAISS"],
      description: "High-performance semantic search and context retrieval architectures for advanced RAG systems."
    },
    {
      category: "Cloud Providers",
      icon: Cloud,
      tools: ["AWS (SageMaker, EC2)", "GCP (Vertex AI)", "Azure ML", "Lambda Labs"],
      description: "Cloud-native deployments utilizing spot instances and optimized GPU provisioning."
    }
  ];

  return (
    <div className="h-full w-full bg-[#0d1117] text-[#c9d1d9] overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 mb-6"
          >
            <Shield className="w-12 h-12 text-blue-400" />
          </motion.div>
          <h1 className="text-3xl font-bold font-[var(--font-heading)] text-white tracking-tight mb-4">
            System Architecture & MLOps
          </h1>
          <p className="text-[#8b949e] max-w-2xl mx-auto text-sm">
            Real-world development requires robust, scalable, and highly optimized tooling. This is the enterprise-grade stack I use to train, deploy, and scale machine learning and agentic models in production.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {architectures.map((arch, idx) => {
            const Icon = arch.icon;
            return (
              <motion.div
                key={arch.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-xl border border-[#30363d] bg-[#161b22] p-6 hover:border-blue-500/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Icon size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-white font-[var(--font-heading)]">
                    {arch.category}
                  </h2>
                </div>
                
                <p className="text-sm text-[#8b949e] mb-5">
                  {arch.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {arch.tools.map(tool => (
                    <span 
                      key={tool} 
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#21262d] border border-[#30363d] text-[#c9d1d9] shadow-sm cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
