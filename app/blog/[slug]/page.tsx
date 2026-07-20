import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPostContent from "./BlogPostContent";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Complete blog post content
const BLOG_CONTENT: Record<
  string,
  { title: string; date: string; readTime: string; tags: string[]; content: string }
> = {
  "transformer-architecture-deep-dive": {
    title: "Understanding the Transformer Architecture: A Deep Dive",
    date: "2025-01-15",
    readTime: "15 min",
    tags: ["Transformers", "Deep Learning", "NLP", "PyTorch"],
    content: `
## The Revolution That Changed NLP

In 2017, Vaswani et al. published "Attention Is All You Need," introducing the Transformer architecture that would fundamentally reshape natural language processing and eventually impact nearly every domain of deep learning. Before Transformers, sequence modeling was dominated by recurrent neural networks (RNNs and LSTMs) that processed tokens sequentially — creating a computational bottleneck that limited both training efficiency and the ability to capture long-range dependencies.

The Transformer's key insight was elegantly simple: **replace recurrence with self-attention**, allowing every position in a sequence to directly attend to every other position in a single computational step.

## Self-Attention: The Core Mechanism

Self-attention computes a weighted sum of value vectors, where the weights are determined by the compatibility between query and key vectors. For an input sequence of embeddings X, we compute:

\`\`\`python
import torch
import torch.nn as nn
import math

class SelfAttention(nn.Module):
    def __init__(self, d_model: int, d_k: int):
        super().__init__()
        self.d_k = d_k
        self.W_q = nn.Linear(d_model, d_k, bias=False)
        self.W_k = nn.Linear(d_model, d_k, bias=False)
        self.W_v = nn.Linear(d_model, d_k, bias=False)

    def forward(self, x: torch.Tensor, mask=None):
        Q = self.W_q(x)  # (batch, seq_len, d_k)
        K = self.W_k(x)  # (batch, seq_len, d_k)
        V = self.W_v(x)  # (batch, seq_len, d_k)

        # Scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        
        attn_weights = torch.softmax(scores, dim=-1)
        output = torch.matmul(attn_weights, V)
        return output, attn_weights
\`\`\`

The **scaling factor** √d_k is critical — without it, for large d_k values, the dot products grow large in magnitude, pushing the softmax into regions with extremely small gradients (the saturation problem).

## Multi-Head Attention

Rather than performing a single attention function, the Transformer uses **multi-head attention** — running h parallel attention heads with different learned projections. This allows the model to jointly attend to information from different representation subspaces:

\`\`\`python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, n_heads: int):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_k = d_model // n_heads
        self.n_heads = n_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        batch_size, seq_len, d_model = x.shape
        
        # Project and reshape for multi-head
        Q = self.W_q(x).view(batch_size, seq_len, self.n_heads, self.d_k).transpose(1, 2)
        K = self.W_k(x).view(batch_size, seq_len, self.n_heads, self.d_k).transpose(1, 2)
        V = self.W_v(x).view(batch_size, seq_len, self.n_heads, self.d_k).transpose(1, 2)
        
        # Scaled dot-product attention per head
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        attn = torch.softmax(scores, dim=-1)
        context = torch.matmul(attn, V)
        
        # Concatenate heads and project
        context = context.transpose(1, 2).contiguous().view(batch_size, seq_len, d_model)
        return self.W_o(context)
\`\`\`

## Positional Encoding

Since self-attention is permutation-invariant (it has no notion of position), the Transformer adds **positional encodings** to inject sequence order information. The original paper uses sinusoidal functions:

\`\`\`python
class PositionalEncoding(nn.Module):
    def __init__(self, d_model: int, max_len: int = 5000):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1).float()
        div_term = torch.exp(
            torch.arange(0, d_model, 2).float() * -(math.log(10000.0) / d_model)
        )
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe.unsqueeze(0))  # (1, max_len, d_model)

    def forward(self, x):
        return x + self.pe[:, :x.size(1)]
\`\`\`

The sinusoidal design has an elegant property: the model can learn to attend to relative positions, since PE(pos+k) can be represented as a linear function of PE(pos) for any fixed offset k.

## Key Takeaways

1. **Parallelism**: Self-attention processes all positions simultaneously, enabling efficient GPU utilization — unlike sequential RNNs.
2. **Long-range dependencies**: Direct connections between all position pairs mean the path length between any two tokens is O(1), versus O(n) for RNNs.
3. **Scalability**: The Transformer architecture scales remarkably well with data and compute, enabling the training of models with hundreds of billions of parameters.
4. **Universality**: Originally designed for machine translation, Transformers now power language models (GPT, BERT), vision models (ViT), protein folding (AlphaFold), and multi-modal systems (CLIP).

The Transformer didn't just improve NLP — it provided a general-purpose architecture for learning from sequential and structured data that has proven to be one of the most important contributions in the history of deep learning.

## References

- Vaswani, A., et al. "Attention Is All You Need." NeurIPS 2017.
- The Illustrated Transformer by Jay Alammar.
- Annotated Transformer by Harvard NLP.
    `,
  },
  "building-production-rag-systems": {
    title: "Building Production RAG Systems: From Prototype to Scale",
    date: "2025-03-22",
    readTime: "20 min",
    tags: ["RAG", "LLMs", "Vector Databases", "LangChain"],
    content: `
## Why RAG Matters

Large Language Models are powerful but have fundamental limitations: they hallucinate, their knowledge has a training cutoff, and they cannot access private or domain-specific data. **Retrieval-Augmented Generation (RAG)** addresses these issues by grounding LLM responses in retrieved evidence from a knowledge base.

The concept is straightforward: instead of relying solely on parametric knowledge (model weights), we augment the prompt with relevant documents retrieved from an external corpus. This gives the model access to up-to-date, domain-specific, and verifiable information.

However, building a RAG system that actually works in production is significantly harder than the typical tutorial suggests.

## The Production RAG Pipeline

A production RAG system consists of several critical stages, each with its own set of engineering challenges:

### 1. Document Ingestion and Chunking

The first and most underappreciated step is chunking — how you split documents directly determines retrieval quality.

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Naive approach — fixed size chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", ". ", " ", ""]
)

# Better approach — semantic chunking
# Split on natural boundaries (paragraphs, sections)
# while respecting a maximum size
def semantic_chunk(text: str, max_tokens: int = 512):
    """Split text on semantic boundaries."""
    paragraphs = text.split("\\n\\n")
    chunks = []
    current_chunk = []
    current_length = 0
    
    for para in paragraphs:
        para_length = len(para.split())
        if current_length + para_length > max_tokens and current_chunk:
            chunks.append("\\n\\n".join(current_chunk))
            current_chunk = [para]
            current_length = para_length
        else:
            current_chunk.append(para)
            current_length += para_length
    
    if current_chunk:
        chunks.append("\\n\\n".join(current_chunk))
    return chunks
\`\`\`

**Key insight**: Chunk size matters enormously. Too small and you lose context. Too large and you dilute relevance. I've found 300-500 tokens with 50-token overlap works well for most use cases.

### 2. Hybrid Search: Dense + Sparse

Pure dense retrieval (embedding similarity) misses exact keyword matches. Pure sparse retrieval (BM25) misses semantic similarity. The solution is **hybrid search**:

\`\`\`python
from rank_bm25 import BM25Okapi
import numpy as np

class HybridRetriever:
    def __init__(self, documents, embeddings, alpha=0.7):
        self.documents = documents
        self.embeddings = embeddings  # Pre-computed dense embeddings
        self.alpha = alpha  # Weight for dense vs sparse
        
        # Initialize BM25
        tokenized = [doc.split() for doc in documents]
        self.bm25 = BM25Okapi(tokenized)
    
    def search(self, query: str, query_embedding, top_k: int = 10):
        # Dense scores (cosine similarity)
        dense_scores = np.dot(self.embeddings, query_embedding)
        dense_scores = (dense_scores - dense_scores.min()) / (dense_scores.max() - dense_scores.min())
        
        # Sparse scores (BM25)
        sparse_scores = np.array(self.bm25.get_scores(query.split()))
        sparse_scores = (sparse_scores - sparse_scores.min()) / (sparse_scores.max() - sparse_scores.min() + 1e-8)
        
        # Combine with weighting
        combined = self.alpha * dense_scores + (1 - self.alpha) * sparse_scores
        top_indices = np.argsort(combined)[-top_k:][::-1]
        
        return [(self.documents[i], combined[i]) for i in top_indices]
\`\`\`

### 3. Cross-Encoder Re-ranking

After initial retrieval, a **cross-encoder** re-ranks candidates by jointly encoding the query and each document. This is more accurate than bi-encoder similarity but too expensive for the initial retrieval stage:

\`\`\`python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-12-v2")

def rerank(query: str, candidates: list[str], top_k: int = 5):
    pairs = [(query, doc) for doc in candidates]
    scores = reranker.predict(pairs)
    ranked = sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)
    return ranked[:top_k]
\`\`\`

### 4. Evaluation: The Most Overlooked Step

You cannot improve what you don't measure. Build an evaluation dataset with question-answer-context triples:

- **Retrieval metrics**: Recall@K, MRR, NDCG
- **Generation metrics**: Faithfulness (does the answer match the source?), Answer relevance, Completeness
- **End-to-end**: Human evaluation on a sample set

## Production Lessons

1. **Chunking strategy > embedding model**: I've seen 15-20% retrieval improvement from better chunking with the same embedding model.
2. **Metadata filtering is essential**: Filter by date, source, category before semantic search to reduce noise.
3. **Monitor and evaluate continuously**: RAG quality degrades as your knowledge base grows. Build automated evaluation pipelines.
4. **Cache aggressively**: Cache embedding computations and frequently asked queries.
5. **Use structured extraction**: For complex queries, extract entities and intent before retrieval.

## References

- Lewis, P., et al. "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." NeurIPS 2020.
- LangChain Documentation: Retrieval and RAG patterns.
- Pinecone Learning Center: Vector Database fundamentals.
    `,
  },
  "cuda-optimization-deep-learning": {
    title: "CUDA Optimization Techniques for Deep Learning Training",
    date: "2025-05-10",
    readTime: "18 min",
    tags: ["CUDA", "GPU", "Optimization", "PyTorch"],
    content: `
## Why GPU Optimization Matters

Training deep learning models is expensive. A single GPT-3 training run cost an estimated $4.6M in compute. Even at smaller scales, inefficient GPU utilization directly translates to wasted time and money. Understanding how to maximize GPU throughput is a critical skill for any ML engineer working with non-trivial models.

The good news: most training runs leave significant performance on the table. By applying systematic optimization techniques, I've consistently achieved 2-4x training speedups without any changes to model architecture or hyperparameters.

## Mixed Precision Training (AMP)

The single highest-impact optimization. Modern GPUs (Volta and newer) have Tensor Cores that compute float16 matrix multiplications 2-8x faster than float32. **Automatic Mixed Precision (AMP)** handles the complexity of managing precision:

\`\`\`python
import torch
from torch.amp import autocast, GradScaler

model = MyModel().cuda()
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)
scaler = GradScaler()  # Handles loss scaling for float16

for batch in dataloader:
    optimizer.zero_grad()
    
    # Forward pass in mixed precision
    with autocast(device_type='cuda', dtype=torch.float16):
        outputs = model(batch['input'].cuda())
        loss = criterion(outputs, batch['target'].cuda())
    
    # Backward pass with gradient scaling
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
\`\`\`

**Why it works**: Most operations (matrix multiplications, convolutions) are safe in float16 and run faster on Tensor Cores. A few operations (loss computation, softmax, layer norm) are kept in float32 for numerical stability. The GradScaler prevents underflow by dynamically scaling the loss.

**Typical speedup**: 1.5-2x with no accuracy loss on most architectures.

## Gradient Accumulation

When your desired batch size exceeds GPU memory, gradient accumulation simulates larger batches:

\`\`\`python
accumulation_steps = 4  # Effective batch = batch_size * 4

for i, batch in enumerate(dataloader):
    with autocast(device_type='cuda', dtype=torch.float16):
        loss = model(batch) / accumulation_steps  # Scale loss
    
    scaler.scale(loss).backward()
    
    if (i + 1) % accumulation_steps == 0:
        scaler.step(optimizer)
        scaler.update()
        optimizer.zero_grad()
\`\`\`

**Key detail**: Divide the loss by accumulation_steps to keep gradient magnitudes consistent.

## Data Loading Optimization

Data loading is often the hidden bottleneck. Profile first:

\`\`\`python
from torch.utils.data import DataLoader

dataloader = DataLoader(
    dataset,
    batch_size=64,
    num_workers=8,        # Parallel data loading processes
    pin_memory=True,      # Pre-allocate in page-locked memory
    persistent_workers=True,  # Keep workers alive between epochs
    prefetch_factor=3,    # Batches prefetched per worker
)
\`\`\`

**pin_memory=True** allocates the data in page-locked (pinned) memory, which enables faster CPU→GPU transfers via DMA. This alone can reduce data transfer overhead by 2-3x.

## Memory Optimization with Gradient Checkpointing

For very large models, gradient checkpointing trades compute for memory by recomputing activations during the backward pass instead of storing them:

\`\`\`python
from torch.utils.checkpoint import checkpoint

class LargeModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.ModuleList([TransformerBlock() for _ in range(24)])
    
    def forward(self, x):
        for layer in self.layers:
            # Recompute activations during backward — saves ~60% memory
            x = checkpoint(layer, x, use_reentrant=False)
        return x
\`\`\`

**Trade-off**: ~30% more compute for ~60% less memory. This enables training models that otherwise wouldn't fit in GPU memory.

## Profiling: Measure Before Optimizing

Never optimize blindly. Use PyTorch's built-in profiler:

\`\`\`python
from torch.profiler import profile, ProfilerActivity, tensorboard_trace_handler

with profile(
    activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
    schedule=torch.profiler.schedule(wait=1, warmup=1, active=3),
    on_trace_ready=tensorboard_trace_handler('./profiler_logs'),
    record_shapes=True,
    profile_memory=True,
    with_stack=True,
) as prof:
    for step, batch in enumerate(dataloader):
        train_step(model, batch)
        prof.step()
        if step >= 5:
            break
\`\`\`

Look for:
- **GPU idle time**: Indicates CPU bottleneck (data loading, preprocessing)
- **Memory peaks**: Identify which operations consume the most memory
- **Kernel launch overhead**: Too many small operations can starve the GPU

## Summary of Impact

| Technique | Typical Speedup | Memory Impact |
|-----------|----------------|---------------|
| Mixed Precision (AMP) | 1.5-2x | -30% memory |
| Gradient Accumulation | Enables larger batch | Fixed memory |
| Optimized DataLoader | 1.2-1.5x | Minimal |
| Gradient Checkpointing | 0.7x (slower) | -60% memory |
| torch.compile | 1.2-1.5x | Slight increase |
| FlashAttention | 2-4x (attention) | -5x memory |

The most important lesson: **profile first, optimize second**. The bottleneck is rarely where you think it is.

## References

- NVIDIA Mixed Precision Training documentation.
- PyTorch Performance Tuning Guide.
- Efficient Training on Multiple GPUs — Hugging Face documentation.
    `,
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(BLOG_CONTENT).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_CONTENT[slug];
  if (!post) return {};
  return { title: post.title, description: post.content.slice(0, 160) };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_CONTENT[slug];
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <BlogPostContent post={post} />
      <Footer />
    </>
  );
}
