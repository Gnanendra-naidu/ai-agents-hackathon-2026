import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corpusPath = path.resolve(__dirname, '../data/knowledgeCorpus.json');

let cachedCorpus = null;
function getLocalCorpus() {
  if (!cachedCorpus) {
    try {
      const data = fs.readFileSync(corpusPath, 'utf8');
      cachedCorpus = JSON.parse(data);
    } catch {
      cachedCorpus = [];
    }
  }
  return cachedCorpus;
}

// Optional Supabase client initialization
let supabaseClient = null;
if (config.isSupabaseConfigured) {
  try {
    supabaseClient = createClient(config.supabaseUrl, config.supabaseKey);
  } catch (err) {
    supabaseClient = null;
  }
}

/**
 * Real Knowledge Base Tool (query_knowledge_base)
 * Searches:
 * 1) User-provided uploaded notes or raw text
 * 2) Supabase PostgreSQL knowledge_documents table (when configured)
 * 3) Local structured knowledgeCorpus.json (automatic fallback)
 */
export async function queryKnowledgeBase({ query, uploadedNotes = null, maxResults = 3 }) {
  const startTime = Date.now();
  const cleanQuery = (query || '').toLowerCase().trim();
  const searchTerms = cleanQuery.split(/\s+/).filter((t) => t.length > 2);
  const matches = [];

  // 1. Search User-Provided Uploaded Notes (if passed in request)
  if (uploadedNotes) {
    let rawText = '';
    if (typeof uploadedNotes === 'string') {
      rawText = uploadedNotes;
    } else if (Array.isArray(uploadedNotes)) {
      rawText = uploadedNotes.map((n) => `${n.name || 'Note'}: ${n.content || ''}`).join('\n');
    }

    if (rawText.trim().length > 0) {
      const sentences = rawText.split(/[.!?\n]+/).filter((s) => s.trim().length > 15);
      const noteHits = sentences.filter((s) => {
        const sLower = s.toLowerCase();
        return searchTerms.some((term) => sLower.includes(term));
      });

      if (noteHits.length > 0) {
        matches.push({
          id: 'uploaded-note-1',
          title: 'User-Uploaded Document / Working Notes',
          excerpt: noteHits.slice(0, 3).join('. ').trim(),
          author: 'Local Research Workspace',
          year: new Date().getFullYear(),
          url: 'local://uploaded-documents',
          source: 'User Attached Knowledge Base',
          relevanceScore: 0.95,
        });
      }
    }
  }

  // 2. Search Supabase PostgreSQL if credentials configured
  let usedSupabase = false;
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('knowledge_documents')
        .select('*')
        .limit(maxResults);

      if (!error && data && data.length > 0) {
        data.forEach((doc) => {
          const contentLower = `${doc.title} ${doc.content} ${doc.topic}`.toLowerCase();
          const matchCount = searchTerms.filter((term) => contentLower.includes(term)).length;
          const score = matchCount > 0 ? 0.7 + (matchCount / searchTerms.length) * 0.3 : 0.4;

          matches.push({
            id: doc.id,
            title: doc.title,
            excerpt: doc.content.slice(0, 260) + '...',
            author: doc.author || 'Knowledge Author',
            year: doc.year || 2024,
            url: doc.url || 'supabase://knowledge_documents',
            source: 'Supabase Knowledge Base',
            relevanceScore: parseFloat(score.toFixed(2)),
          });
        });
        usedSupabase = true;
      }
    } catch {
      // Gracefully fall through to local corpus
    }
  }

  // 3. Fallback to Local Knowledge Corpus if Supabase was not used or returned no matches
  if (!usedSupabase || matches.length === 0) {
    const corpus = getLocalCorpus();
    corpus.forEach((doc) => {
      const textToSearch = `${doc.title} ${doc.content} ${doc.topic} ${(doc.relevanceKeywords || []).join(' ')}`.toLowerCase();
      const matchCount = searchTerms.filter((term) => textToSearch.includes(term)).length;
      if (matchCount > 0 || searchTerms.length === 0) {
        const score = 0.65 + (matchCount / Math.max(searchTerms.length, 1)) * 0.35;
        matches.push({
          id: doc.id,
          title: doc.title,
          excerpt: doc.content,
          author: doc.author,
          year: doc.year,
          url: doc.url,
          source: 'Curated AI Agent Knowledge Corpus',
          relevanceScore: parseFloat(score.toFixed(2)),
        });
      }
    });
  }

  // Sort by relevance score descending
  matches.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const latencyMs = Date.now() - startTime;

  return {
    tool: 'query_knowledge_base',
    query: cleanQuery,
    sourceEngine: usedSupabase ? 'Supabase PostgreSQL' : 'Local Knowledge Corpus',
    documentsFound: matches.length,
    matches: matches.slice(0, maxResults),
    latencyMs,
    status: matches.length > 0 ? 'success' : 'no_matches',
  };
}
