import { z } from 'zod';

// Helper to normalize empty strings, null, and undefined
const nullishString = z.preprocess((val) => {
  if (val === null || val === undefined || val === '') return undefined;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return String(val);
}, z.string().optional());

// Helper to normalize audience casing (e.g. 'researchers' -> 'Researchers')
const audienceSchema = z.preprocess((val) => {
  if (typeof val === 'string') {
    const normalized = val.trim().toLowerCase();
    const map = {
      researchers: 'Researchers',
      researcher: 'Researchers',
      founders: 'Founders',
      founder: 'Founders',
      students: 'Students',
      student: 'Students',
      journalists: 'Journalists',
      journalist: 'Journalists',
    };
    if (map[normalized]) return map[normalized];
  }
  return 'Researchers';
}, z.enum(['Researchers', 'Founders', 'Students', 'Journalists']).default('Researchers'));

// Helper to normalize enabledSources (accepts object or array or undefined)
const enabledSourcesSchema = z.preprocess((val) => {
  if (Array.isArray(val)) {
    return {
      webSearch: val.includes('webSearch') || val.includes('web') || val.includes('Web Search'),
      knowledgeBase: val.includes('knowledgeBase') || val.includes('kb') || val.includes('Knowledge Base'),
    };
  }
  if (val && typeof val === 'object') {
    return {
      webSearch: val.webSearch !== false,
      knowledgeBase: val.knowledgeBase !== false,
    };
  }
  return { webSearch: true, knowledgeBase: true };
}, z.object({
  webSearch: z.boolean().default(true),
  knowledgeBase: z.boolean().default(true),
}).default({ webSearch: true, knowledgeBase: true }));

// Helper to normalize uploaded notes/documents (string, array of file objects, or nullish)
const uploadedNotesSchema = z.preprocess((val) => {
  if (val === null || val === undefined || val === '') return undefined;
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) {
    return val.map((item) => {
      if (typeof item === 'string') return { name: 'Note', content: item };
      return {
        name: item.name || 'Document',
        content: item.content || item.text || item.snippet || item.name || '',
        size: item.size || '',
      };
    });
  }
  return undefined;
}, z.union([
  z.string(),
  z.array(z.object({
    name: z.string().optional(),
    content: z.string().optional(),
    size: z.string().optional(),
  })),
]).optional());

export const ResearchRequestSchema = z.preprocess((raw) => {
  if (!raw || typeof raw !== 'object') return {};
  const data = { ...raw };
  // Support field aliases like researchQuestion -> question
  if (!data.question && data.researchQuestion) {
    data.question = data.researchQuestion;
  }
  if (!data.audience && data.targetAudience) {
    data.audience = data.targetAudience;
  }
  return data;
}, z.object({
  question: z.string({ required_error: 'Research question is required' }).trim().min(3, 'Research question must be at least 3 characters'),
  audience: audienceSchema,
  enabledSources: enabledSourcesSchema,
  uploadedNotes: uploadedNotesSchema,
  sessionId: nullishString,
  followUpQuestion: nullishString,
}));

export const ApprovalRequestSchema = z.object({
  decision: z.enum(['approve', 'reject'], {
    required_error: "Decision must be either 'approve' or 'reject'",
  }),
  actionName: z.string().default('export_and_publish_external'),
  notes: nullishString,
});
