-- ==============================================================================
-- Theme 4: Research & Knowledge Agents - PostgreSQL Schema
-- Compatible with Supabase SQL Editor
-- ==============================================================================

-- 1. Knowledge Base Documents Table
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  year INTEGER,
  url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for full-text search over knowledge documents
CREATE INDEX IF NOT EXISTS idx_knowledge_docs_topic ON knowledge_documents(topic);
CREATE INDEX IF NOT EXISTS idx_knowledge_docs_content_fts ON knowledge_documents USING gin(to_tsvector('english', title || ' ' || content));

-- 2. Research Sessions Table
CREATE TABLE IF NOT EXISTS research_sessions (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  audience TEXT NOT NULL DEFAULT 'Researchers',
  status TEXT NOT NULL DEFAULT 'idle',
  enabled_sources JSONB DEFAULT '{"webSearch": true, "knowledgeBase": true}'::jsonb,
  sub_questions JSONB DEFAULT '[]'::jsonb,
  conflict_flag JSONB,
  pending_approval JSONB,
  approval_status TEXT DEFAULT 'none', -- 'none', 'approved', 'rejected'
  approval_notes TEXT,
  report JSONB,
  metrics JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_research_sessions_status ON research_sessions(status);

-- 3. Agent Execution Traces Table
CREATE TABLE IF NOT EXISTS agent_traces (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  trace_type TEXT NOT NULL, -- 'thought', 'tool_call', 'observation', 'error'
  content TEXT,
  tool_name TEXT,
  tool_input JSONB,
  observation JSONB,
  duration_ms INTEGER,
  citations JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agent_traces_session_id ON agent_traces(session_id);

-- ==============================================================================
-- Sample Knowledge Base Seed Rows (AI Agent Research Topics)
-- ==============================================================================
INSERT INTO knowledge_documents (id, title, topic, content, author, year, url, metadata)
VALUES
  (
    'doc-react-001',
    'ReAct: Synergizing Reasoning and Acting in Language Models',
    'multi_agent_architectures',
    'ReAct explores synergistic reasoning traces and task-specific actions. By interleaving reasoning thoughts and external tool actions, LLMs overcome token hallucination and context drift, improving decision accuracy across reasoning benchmarks by 34% over direct acting.',
    'Yao et al.',
    2023,
    'https://arxiv.org/abs/2210.03629',
    '{"citations": 1420, "tier": "peer_reviewed"}'
  ),
  (
    'doc-reflexion-002',
    'Reflexion: Language Agents with Verbal Reinforcement Learning',
    'autonomous_self_correction',
    'Reflexion equips autonomous agents with dynamic memory and self-reflective feedback loops. Agents reflect verbally on task failures and store linguistic critique in episodic buffer memory, reducing repeat tool failures by 44% in coding and synthesis loops.',
    'Shinn et al.',
    2023,
    'https://arxiv.org/abs/2303.11366',
    '{"citations": 890, "tier": "peer_reviewed"}'
  ),
  (
    'doc-swarm-cost-003',
    'Enterprise Multi-Agent Economics and Latency Report 2024',
    'agent_economics',
    'Multi-agent collaborative swarms introduce significant token multiplication overhead (2.4x to 3.8x baseline). While accuracy increases for multi-step reasoning, linear task execution experiences diminishing returns. Strict hierarchical supervisor routing is required to cap API expenditures.',
    'Stanford HAI & Enterprise AI Alliance',
    2024,
    'https://hai.stanford.edu/research',
    '{"tier": "industry_benchmark", "sample_size": 250}'
  ),
  (
    'doc-safety-hitl-004',
    'Human-in-the-Loop Interception Patterns for Destructive Tool Execution',
    'agent_safety',
    'Autonomous agents interacting with external APIs require asynchronous human verification gates for irreversible operations (database mutations, public dissemination, financial transactions). Human verification eliminates 98% of destructive action regressions with a median queue delay of 4.2 minutes.',
    'Center for AI Safety (CAIS)',
    2024,
    'https://safe.ai',
    '{"tier": "safety_standard", "verified": true}'
  )
ON CONFLICT (id) DO NOTHING;
