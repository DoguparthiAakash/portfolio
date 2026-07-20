// ============================================
// PORTFOLIO DATA — Aakash Doguparthi
// ============================================

import { Terminal, Brain, Microscope, Eye, FileText, Bot, Database, Zap, Server, Cloud, Rocket, LineChart, Image as ImageIcon, Search, MessageSquare, HelpCircle } from "lucide-react";

export const PERSONAL = {
  name: "Aakash Doguparthi",
  firstName: "Aakash",
  lastName: "Doguparthi",
  roles: [
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Deep Learning Enthusiast",
    "AI Systems Developer",
  ],
  tagline:
    "I build intelligent software, autonomous AI systems, deep learning models, and production-ready machine learning applications.",
  bio: `Passionate about pushing the boundaries of artificial intelligence and machine learning. 
  I specialize in designing end-to-end ML pipelines, training deep neural networks, building 
  agentic AI systems, and deploying scalable inference infrastructure. My work spans computer 
  vision, natural language processing, large language models, and reinforcement learning — 
  with a strong focus on bridging research and production.`,
  email: "aakash.doguparthi@gmail.com",
  github: "https://github.com/DoguparthiAakash",
  linkedin: "https://linkedin.com/in/aakash-doguparthi",
  huggingface: "https://huggingface.co/AakashD",
  kaggle: "https://kaggle.com/aakashd",
  resumePath: "/Doguparthi_Aakash_Resume.pdf",
};

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Timeline", href: "#timeline" },
  { label: "Blog", href: "/blog" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { label: "ML Models Trained", value: 50, suffix: "+" },
  { label: "Research Papers Studied", value: 100, suffix: "+" },
  { label: "Projects Completed", value: 30, suffix: "+" },
  { label: "Lines of Python", value: 200, suffix: "K+" },
];

// ============================================
// SKILLS DATA
// ============================================

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  skills: Skill[];
}

export const SKILLS: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    icon: Terminal,
    skills: [
      { name: "Python" },
      { name: "C++" },
      { name: "Java" },
      { name: "SQL" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Bash" },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    icon: Brain,
    skills: [
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Scikit-learn" },
      { name: "SciPy" },
      { name: "XGBoost" },
      { name: "LightGBM" },
      { name: "CatBoost" },
    ],
  },
  {
    id: "dl",
    title: "Deep Learning",
    icon: Microscope,
    skills: [
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "Keras" },
      { name: "JAX" },
      { name: "ONNX" },
      { name: "TensorRT" },
      { name: "OpenVINO" },
    ],
  },
  {
    id: "cv",
    title: "Computer Vision",
    icon: Eye,
    skills: [
      { name: "OpenCV" },
      { name: "YOLO" },
      { name: "Detectron2" },
      { name: "MMDetection" },
      { name: "MediaPipe" },
    ],
  },
  {
    id: "nlp",
    title: "NLP",
    icon: FileText,
    skills: [
      { name: "Transformers" },
      { name: "spaCy" },
      { name: "NLTK" },
      { name: "SentenceTransformers" },
      { name: "LangChain" },
      { name: "LlamaIndex" },
      { name: "Haystack" },
    ],
  },
  {
    id: "llm",
    title: "LLMs",
    icon: Bot,
    skills: [
      { name: "OpenAI" },
      { name: "Anthropic" },
      { name: "Gemini" },
      { name: "Ollama" },
      { name: "vLLM" },
      { name: "Llama.cpp" },
      { name: "DeepSeek" },
      { name: "Qwen" },
    ],
  },
  {
    id: "vector",
    title: "Vector Databases",
    icon: Database,
    skills: [
      { name: "FAISS" },
      { name: "Pinecone" },
      { name: "Milvus" },
      { name: "Weaviate" },
      { name: "Qdrant" },
      { name: "ChromaDB" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Zap,
    skills: [
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "Django" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "REST APIs" },
      { name: "GraphQL" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Server,
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "SQLite" },
      { name: "Supabase" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS" },
      { name: "Azure" },
      { name: "Google Cloud" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "GitHub Actions" },
    ],
  },
  {
    id: "deployment",
    title: "ML Deployment",
    icon: Rocket,
    skills: [
      { name: "TorchServe" },
      { name: "TensorRT" },
      { name: "ONNX Runtime" },
      { name: "FastAPI" },
      { name: "Docker" },
    ],
  },
  {
    id: "viz",
    title: "Visualization",
    icon: LineChart,
    skills: [
      { name: "Matplotlib" },
      { name: "Plotly" },
      { name: "Streamlit" },
      { name: "Gradio" },
    ],
  },
];

// ============================================
// PROJECTS DATA
// ============================================

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  github?: string;
  liveDemo?: string;
  featured: boolean;
  metrics?: Record<string, string>;
  problemStatement: string;
  architecture: string;
  results: string;
  lessonsLearned: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "neural-search-assistant",
    title: "Neural Search Assistant",
    description:
      "RAG-powered conversational AI with multi-modal retrieval over enterprise documents, achieving 94% answer accuracy.",
    longDescription:
      "A production-grade Retrieval-Augmented Generation system that enables natural language querying over enterprise document stores. Uses hybrid search combining dense embeddings with BM25 sparse retrieval, re-ranking with cross-encoders, and streaming LLM generation with source attribution.",
    category: "LLM",
    technologies: [
      "Python",
      "LangChain",
      "OpenAI",
      "Pinecone",
      "FastAPI",
      "React",
      "Docker",
    ],
    github: "https://github.com/DoguparthiAakash/neural-search-assistant",
    featured: true,
    metrics: {
      "Answer Accuracy": "94.2%",
      "Retrieval Recall@10": "97.8%",
      "Avg Latency": "1.2s",
      "Documents Indexed": "50K+",
    },
    problemStatement:
      "Enterprise teams struggle to find information buried in thousands of documents across PDFs, Confluence, and internal wikis. Traditional keyword search fails to understand semantic intent.",
    architecture:
      "Multi-stage retrieval pipeline: Document ingestion → Chunking (recursive, semantic) → Embedding (text-embedding-3-large) → Hybrid index (Pinecone + BM25) → Query → Retrieval → Cross-encoder re-ranking → LLM synthesis with citations.",
    results:
      "Achieved 94.2% answer accuracy on an internal evaluation benchmark of 500 questions. Reduced average information lookup time from 15 minutes to 30 seconds. Deployed serving 200+ daily active users.",
    lessonsLearned:
      "Chunking strategy matters more than embedding model choice. Hybrid search (dense + sparse) consistently outperforms pure dense retrieval. Cross-encoder re-ranking provides diminishing returns beyond top-20 candidates.",
  },
  {
    slug: "realtime-object-detector",
    title: "Real-Time Object Detector",
    description:
      "Custom YOLOv8 model with TensorRT optimization achieving 120 FPS on edge devices for industrial inspection.",
    longDescription:
      "Developed and deployed a custom object detection system for manufacturing quality control. Trained on proprietary dataset of 25,000 annotated images, optimized with TensorRT for edge deployment on NVIDIA Jetson platforms.",
    category: "CV",
    technologies: [
      "PyTorch",
      "YOLOv8",
      "TensorRT",
      "OpenCV",
      "CUDA",
      "C++",
      "Docker",
    ],
    github: "https://github.com/DoguparthiAakash/realtime-object-detector",
    featured: true,
    metrics: {
      "mAP@0.5": "96.3%",
      "Inference FPS": "120",
      "Model Size": "12MB",
      "Defect Detection Rate": "99.1%",
    },
    problemStatement:
      "Manual visual inspection in manufacturing lines is slow, inconsistent, and expensive. Automated detection systems require real-time performance with high accuracy on resource-constrained edge hardware.",
    architecture:
      "YOLOv8-small backbone → Custom head for defect categories → Knowledge distillation from YOLOv8-xlarge → INT8 quantization → TensorRT engine → GStreamer video pipeline → Alert system.",
    results:
      "Reduced false rejection rate by 87% compared to manual inspection. Achieved 120 FPS on NVIDIA Jetson Orin with 96.3% mAP. Deployed across 3 production lines processing 10,000 parts daily.",
    lessonsLearned:
      "Knowledge distillation from larger models is highly effective for edge deployment. INT8 quantization with calibration datasets preserves accuracy while doubling throughput. Data augmentation with domain-specific transforms (lighting, rotation) is critical.",
  },
  {
    slug: "medical-imaging-ai",
    title: "Medical Imaging AI",
    description:
      "Deep learning diagnostic system for chest X-ray analysis with attention-guided detection of 14 pathologies.",
    longDescription:
      "An attention-based multi-label classification system for chest X-ray interpretation. Uses DenseNet-121 backbone with custom attention modules to provide interpretable predictions with localization heatmaps.",
    category: "CV",
    technologies: [
      "PyTorch",
      "DenseNet",
      "Grad-CAM",
      "Flask",
      "PostgreSQL",
      "Docker",
    ],
    github: "https://github.com/DoguparthiAakash/medical-imaging-ai",
    featured: true,
    metrics: {
      "Mean AUC": "0.928",
      "Pathologies Detected": "14",
      "Sensitivity": "91.5%",
      "Specificity": "94.2%",
    },
    problemStatement:
      "Radiologist shortages delay diagnosis in underserved regions. An AI-assisted triage system can prioritize urgent cases and provide preliminary readings to support clinical decision-making.",
    architecture:
      "DenseNet-121 backbone → Multi-head attention → 14-way sigmoid classification → Grad-CAM heatmap generation → Clinical report synthesis → PACS integration via DICOM.",
    results:
      "Achieved 0.928 mean AUC across 14 pathology classes on the CheXpert test set. Grad-CAM visualizations correlated with radiologist annotations in 89% of cases. System reduces triage time by 65%.",
    lessonsLearned:
      "Label noise in medical datasets is significant — label smoothing and curriculum learning help. Attention mechanisms improve both performance and interpretability. Clinical deployment requires extensive validation beyond standard ML metrics.",
  },
  {
    slug: "recommendation-engine",
    title: "Recommendation Engine",
    description:
      "Hybrid collaborative-content recommendation system serving 1M+ users with sub-50ms latency using two-tower architecture.",
    longDescription:
      "Production recommendation system combining collaborative filtering with content-based signals. Uses a two-tower neural architecture with approximate nearest neighbor search for real-time serving.",
    category: "ML",
    technologies: [
      "PyTorch",
      "FAISS",
      "Redis",
      "FastAPI",
      "Kafka",
      "PostgreSQL",
      "Kubernetes",
    ],
    featured: true,
    metrics: {
      "CTR Improvement": "+34%",
      "P95 Latency": "45ms",
      "Daily Predictions": "50M+",
      Users: "1M+",
    },
    problemStatement:
      "E-commerce platform needed personalized product recommendations that balance relevance, diversity, and freshness while meeting strict latency requirements at scale.",
    architecture:
      "User Tower (behavioral embeddings) + Item Tower (content embeddings) → Dot-product similarity → FAISS ANN index → Business rule filtering → Re-ranking with diversity constraints → A/B test framework.",
    results:
      "Increased click-through rate by 34% and average order value by 12% compared to the previous rule-based system. Serves 50M+ predictions daily with P95 latency under 45ms.",
    lessonsLearned:
      "Two-tower architecture enables independent scaling of user and item embeddings. FAISS IVF-PQ index provides excellent recall-latency tradeoff. Online learning with hourly model updates captures temporal patterns.",
  },
  {
    slug: "fraud-detection-system",
    title: "Fraud Detection System",
    description:
      "Real-time transaction fraud detection with ensemble models and anomaly detection, processing 10K transactions per second.",
    longDescription:
      "Multi-layered fraud detection pipeline combining gradient boosted trees with deep anomaly detection. Handles extreme class imbalance with adaptive sampling and cost-sensitive learning.",
    category: "ML",
    technologies: [
      "XGBoost",
      "PyTorch",
      "Kafka",
      "Redis",
      "FastAPI",
      "PostgreSQL",
      "Grafana",
    ],
    featured: false,
    metrics: {
      Precision: "99.2%",
      Recall: "97.8%",
      "False Positive Rate": "0.03%",
      Throughput: "10K TPS",
    },
    problemStatement:
      "Financial institutions face mounting losses from sophisticated fraud patterns. Traditional rule-based systems generate excessive false positives and miss novel attack vectors.",
    architecture:
      "Streaming ingestion (Kafka) → Feature engineering (real-time + batch) → Ensemble: XGBoost + Autoencoder anomaly detection → Risk scoring → Threshold-based alerting → Analyst feedback loop.",
    results:
      "Reduced false positive rate from 2.1% to 0.03% while maintaining 97.8% fraud recall. Processes 10,000 transactions per second with P99 latency under 100ms.",
    lessonsLearned:
      "Feature engineering dominates model architecture in tabular fraud detection. Autoencoder-based anomaly detection excels at catching novel fraud patterns not seen in training. Analyst feedback loops are essential for model drift.",
  },
  {
    slug: "predictive-analytics-platform",
    title: "Predictive Analytics Platform",
    description:
      "End-to-end time series forecasting platform with automated feature engineering and model selection via AutoML.",
    longDescription:
      "A self-service forecasting platform that automates the ML pipeline from data ingestion to deployment. Supports multiple forecasting horizons with automatic model selection and ensemble optimization.",
    category: "MLOps",
    technologies: [
      "Python",
      "Prophet",
      "LightGBM",
      "Airflow",
      "MLflow",
      "Streamlit",
      "AWS",
    ],
    featured: false,
    metrics: {
      "MAPE Reduction": "-42%",
      "Models in Production": "150+",
      "Forecast Horizons": "7/30/90 days",
      "Pipeline Runtime": "<15min",
    },
    problemStatement:
      "Business teams need reliable demand and revenue forecasts but lack ML expertise. Manual forecasting processes are slow, inconsistent, and cannot scale across product lines.",
    architecture:
      "Data connectors → Automated feature engineering → Model zoo (Prophet, LightGBM, DeepAR) → Bayesian hyperparameter optimization → Ensemble selection → Deployment via MLflow → Monitoring dashboard.",
    results:
      "Reduced mean absolute percentage error by 42% compared to manual forecasting. Automated pipeline processes 150+ models in under 15 minutes. Self-service interface enabled non-technical users to generate forecasts.",
    lessonsLearned:
      "Ensemble methods with automatic weight optimization consistently outperform individual models. Feature engineering automation (lag features, rolling statistics, calendar effects) provides the biggest lift. MLflow model registry is essential for production model management.",
  },
  {
    slug: "mlops-pipeline",
    title: "MLOps Pipeline",
    description:
      "Production ML infrastructure with automated training, evaluation, deployment, and monitoring using Kubernetes-native tools.",
    longDescription:
      "Complete MLOps platform providing CI/CD for machine learning. Automates the entire lifecycle from data validation through model training, evaluation, deployment, and drift monitoring.",
    category: "MLOps",
    technologies: [
      "Kubernetes",
      "Kubeflow",
      "MLflow",
      "DVC",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
    ],
    featured: true,
    metrics: {
      "Deployment Time": "<30min",
      "Model Rollback": "<5min",
      Uptime: "99.95%",
      "Models Served": "25+",
    },
    problemStatement:
      "ML teams spend 80% of their time on infrastructure instead of modeling. Manual deployment processes are error-prone and create bottlenecks that slow down experimentation.",
    architecture:
      "Git push → GitHub Actions → Data validation (Great Expectations) → Training (Kubeflow) → Evaluation gate → Model registry (MLflow) → Canary deployment (Kubernetes) → Monitoring (Prometheus + Grafana) → Drift detection → Retraining trigger.",
    results:
      "Reduced model deployment time from 2 days to 30 minutes. Zero-downtime deployments with automated canary rollouts. Serves 25+ models in production with 99.95% uptime.",
    lessonsLearned:
      "Data validation is the most impactful quality gate in ML pipelines. Canary deployments with shadow scoring prevent production incidents. Feature stores eliminate training-serving skew.",
  },
  {
    slug: "agentic-research-assistant",
    title: "Agentic Research Assistant",
    description:
      "Multi-agent AI system that autonomously plans, searches, analyzes, and synthesizes research papers with tool-use capabilities.",
    longDescription:
      "An autonomous multi-agent system built on LangGraph that can decompose complex research questions, search academic databases, analyze papers, and produce structured literature reviews with citations.",
    category: "LLM",
    technologies: [
      "LangGraph",
      "OpenAI",
      "Anthropic",
      "Tavily",
      "FastAPI",
      "React",
      "Supabase",
    ],
    github: "https://github.com/DoguparthiAakash/agentic-research-assistant",
    featured: true,
    metrics: {
      "Research Quality Score": "4.2/5",
      "Papers Analyzed": "100+/query",
      "Avg Completion Time": "3min",
      "Citation Accuracy": "96%",
    },
    problemStatement:
      "Researchers spend weeks surveying literature for new domains. LLMs alone hallucinate citations and lack access to current papers. An agentic system with real tool access can automate systematic reviews.",
    architecture:
      "Planner Agent (decomposes query) → Search Agent (Semantic Scholar, arXiv, PubMed) → Analysis Agent (reads, extracts key findings) → Synthesis Agent (structures, generates review) → Critique Agent (validates citations, checks consistency).",
    results:
      "Human evaluation scored outputs 4.2/5 for research quality (vs. 2.8/5 for single-agent baseline). 96% citation accuracy verified against source papers. Reduces literature review time from weeks to minutes.",
    lessonsLearned:
      "Multi-agent architectures with specialized roles outperform monolithic agents. Critique/verification agents are essential for factuality. Tool-use with real APIs eliminates hallucinated citations.",
  },
  {
    slug: "sentiment-market-analyzer",
    title: "Sentiment-Driven Market Analyzer",
    description:
      "NLP pipeline analyzing financial news and social media sentiment for market signal extraction with real-time streaming.",
    longDescription:
      "End-to-end NLP system that ingests financial news, earnings calls, and social media posts to extract market sentiment signals. Uses fine-tuned transformer models with domain-specific pretraining.",
    category: "NLP",
    technologies: [
      "Transformers",
      "PyTorch",
      "Kafka",
      "Elasticsearch",
      "FastAPI",
      "React",
      "AWS",
    ],
    featured: false,
    metrics: {
      "Sentiment Accuracy": "91.7%",
      "Signal Correlation": "0.73",
      "Sources Monitored": "500+",
      "Processing Rate": "1K docs/min",
    },
    problemStatement:
      "Financial analysts cannot manually process the volume of news, social media, and earnings call transcripts that influence market movements. Automated sentiment extraction provides an informational edge.",
    architecture:
      "Data collection (RSS, Twitter API, SEC EDGAR) → Preprocessing → FinBERT fine-tuned classifier → Entity linking (companies, tickers) → Sentiment aggregation → Signal generation → Dashboard + API.",
    results:
      "Achieved 91.7% sentiment classification accuracy on the Financial PhraseBank benchmark. Sentiment signals show 0.73 Pearson correlation with next-day price movements for top-20 monitored tickers.",
    lessonsLearned:
      "Domain-specific pretraining (FinBERT) dramatically outperforms general-purpose models for financial text. Entity disambiguation is critical — the same company name appears in different contexts. Real-time streaming architecture is essential for actionable signals.",
  },
];

// ============================================
// RESEARCH PAPERS
// ============================================

export interface ResearchPaper {
  title: string;
  authors: string;
  year: number;
  keyContribution: string;
  status: "studied" | "implemented" | "extended";
  tags: string[];
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    year: 2017,
    keyContribution:
      "Introduced the Transformer architecture with self-attention, eliminating recurrence for sequence modeling.",
    status: "implemented",
    tags: ["Transformers", "NLP", "Attention"],
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Devlin et al.",
    year: 2018,
    keyContribution:
      "Bidirectional pre-training with masked language modeling and next sentence prediction.",
    status: "implemented",
    tags: ["NLP", "Pre-training", "Transformers"],
  },
  {
    title: "Language Models are Few-Shot Learners (GPT-3)",
    authors: "Brown et al.",
    year: 2020,
    keyContribution:
      "Demonstrated that scaling language models enables few-shot learning without fine-tuning.",
    status: "studied",
    tags: ["LLM", "Few-shot", "Scaling"],
  },
  {
    title: "Learning Transferable Visual Models (CLIP)",
    authors: "Radford et al.",
    year: 2021,
    keyContribution:
      "Contrastive learning between images and text enables zero-shot visual classification.",
    status: "implemented",
    tags: ["Vision", "Multi-modal", "Contrastive Learning"],
  },
  {
    title: "Segment Anything (SAM)",
    authors: "Kirillov et al.",
    year: 2023,
    keyContribution:
      "Foundation model for promptable image segmentation, trained on 1B+ masks.",
    status: "studied",
    tags: ["Vision", "Segmentation", "Foundation Model"],
  },
  {
    title: "Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)",
    authors: "Radford et al.",
    year: 2022,
    keyContribution:
      "Weakly-supervised training on 680K hours of web audio achieves near-human speech recognition.",
    status: "implemented",
    tags: ["Speech", "ASR", "Weak Supervision"],
  },
  {
    title: "You Only Look Once (YOLO)",
    authors: "Redmon et al.",
    year: 2016,
    keyContribution:
      "Framed object detection as a single regression problem from image pixels to bounding boxes.",
    status: "implemented",
    tags: ["Vision", "Object Detection", "Real-time"],
  },
  {
    title: "Deep Residual Learning for Image Recognition (ResNet)",
    authors: "He et al.",
    year: 2015,
    keyContribution:
      "Skip connections enable training of very deep networks (100+ layers) without degradation.",
    status: "implemented",
    tags: ["Vision", "Architecture", "Deep Networks"],
  },
  {
    title: "EfficientNet: Rethinking Model Scaling",
    authors: "Tan & Le",
    year: 2019,
    keyContribution:
      "Compound scaling of depth, width, and resolution yields more efficient architectures.",
    status: "studied",
    tags: ["Vision", "Efficiency", "Architecture"],
  },
  {
    title: "Denoising Diffusion Probabilistic Models",
    authors: "Ho et al.",
    year: 2020,
    keyContribution:
      "Iterative denoising process generates high-quality images rivaling GANs.",
    status: "studied",
    tags: ["Generative", "Diffusion", "Image Synthesis"],
  },
  {
    title: "Highly Accurate Protein Structure Prediction (AlphaFold 2)",
    authors: "Jumper et al.",
    year: 2021,
    keyContribution:
      "Evoformer architecture with attention over MSAs achieves atomic-level protein structure prediction.",
    status: "studied",
    tags: ["Biology", "Structure Prediction", "Attention"],
  },
];

// ============================================
// TIMELINE
// ============================================

export interface TimelineEvent {
  id: string;
  type: "education" | "certification" | "competition" | "hackathon" | "internship" | "research" | "project";
  title: string;
  organization: string;
  date: string;
  description: string;
}

export const TIMELINE: TimelineEvent[] = [
  {
    id: "t1",
    type: "education",
    title: "Bachelor of Science in Computer Science",
    organization: "University",
    date: "2021 – 2025",
    description:
      "Specialized in Artificial Intelligence and Machine Learning. Relevant coursework: Deep Learning, Computer Vision, NLP, Distributed Systems, Algorithm Design.",
  },
  {
    id: "t2",
    type: "certification",
    title: "Deep Learning Specialization",
    organization: "DeepLearning.AI / Coursera",
    date: "2023",
    description:
      "5-course specialization covering neural networks, hyperparameter tuning, structuring ML projects, CNNs, and sequence models by Andrew Ng.",
  },
  {
    id: "t3",
    type: "certification",
    title: "Machine Learning Engineering for Production (MLOps)",
    organization: "DeepLearning.AI / Coursera",
    date: "2023",
    description:
      "4-course specialization covering ML pipelines, data lifecycle, model deployment, and monitoring in production environments.",
  },
  {
    id: "t4",
    type: "hackathon",
    title: "AI Hackathon — First Place",
    organization: "Major Tech Company",
    date: "2024",
    description:
      "Built a multi-modal AI assistant that combines vision and language understanding. Won first place among 150+ teams for technical innovation and practical impact.",
  },
  {
    id: "t5",
    type: "competition",
    title: "Kaggle Competition — Top 5%",
    organization: "Kaggle",
    date: "2024",
    description:
      "Achieved top 5% ranking in a tabular prediction competition using advanced feature engineering and stacked ensemble methods.",
  },
  {
    id: "t6",
    type: "internship",
    title: "Machine Learning Engineering Intern",
    organization: "AI Startup",
    date: "Summer 2024",
    description:
      "Designed and deployed a real-time recommendation system serving 500K+ users. Reduced model inference latency by 60% through ONNX optimization and quantization.",
  },
  {
    id: "t7",
    type: "research",
    title: "Undergraduate Research — Vision Transformers",
    organization: "University AI Lab",
    date: "2024 – 2025",
    description:
      "Researched efficient Vision Transformer architectures for medical image analysis. Developed a novel attention pruning method reducing compute by 40% with minimal accuracy loss.",
  },
];

// ============================================
// ABOUT SECTION
// ============================================

export const ABOUT = {
  summary: `I am a Machine Learning Engineer and AI Systems Developer focused on bridging 
  the gap between cutting-edge research and production-grade systems. My expertise spans 
  the full ML lifecycle — from data engineering and model development to optimization, 
  deployment, and monitoring at scale.`,
  philosophy: [
    {
      title: "Research-Driven Engineering",
      description:
        "Every production system I build is grounded in a deep understanding of the underlying algorithms. I read papers, implement architectures from scratch, and then optimize for real-world constraints.",
    },
    {
      title: "Production-First Mindset",
      description:
        "A model that only works in a notebook is not a solution. I design for latency, throughput, reliability, and observability from day one — not as an afterthought.",
    },
    {
      title: "Systematic Problem Solving",
      description:
        "I approach every challenge with a structured methodology: understand the problem deeply, explore the solution space, prototype rapidly, evaluate rigorously, and iterate continuously.",
    },
    {
      title: "Continuous Learning",
      description:
        "The AI field moves at breakneck speed. I dedicate time every week to reading papers, implementing new techniques, and experimenting with emerging tools and frameworks.",
    },
  ],
};

// ============================================
// PLAYGROUND DEMOS
// ============================================

export interface PlaygroundDemo {
  id: string;
  title: string;
  description: string;
  model: string;
  type: "image" | "text" | "chat" | "audio";
  icon: any;
}

export const PLAYGROUND_DEMOS: PlaygroundDemo[] = [
  {
    id: "image-classification",
    title: "Image Classification",
    description: "Upload an image and get top-5 predictions with confidence scores.",
    model: "EfficientNet-B4",
    type: "image",
    icon: ImageIcon,
  },
  {
    id: "object-detection",
    title: "Object Detection",
    description: "Detect and localize objects in images with bounding boxes.",
    model: "YOLOv8-Large",
    type: "image",
    icon: Search,
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    description: "Analyze the sentiment of any text — positive, negative, or neutral.",
    model: "DistilBERT-SST2",
    type: "text",
    icon: MessageSquare,
  },
  {
    id: "text-summarization",
    title: "Text Summarization",
    description: "Generate concise summaries of long-form content.",
    model: "BART-Large-CNN",
    type: "text",
    icon: FileText,
  },
  {
    id: "llm-chat",
    title: "Chat with AI",
    description: "Have a conversation with a large language model.",
    model: "GPT-4o-mini",
    type: "chat",
    icon: Bot,
  },
  {
    id: "question-answering",
    title: "Question Answering",
    description: "Provide context and ask questions — the model extracts answers.",
    model: "RoBERTa-Large-SQuAD",
    type: "text",
    icon: HelpCircle,
  },
];
