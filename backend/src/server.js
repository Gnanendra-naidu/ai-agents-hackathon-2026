import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { ResearchRequestSchema, ApprovalRequestSchema } from './validation/schemas.js';
import { runResearchAgent } from './agent/researchAgent.js';
import { storageService } from './services/storageService.js';

const app = express();

// CORS configuration to support local development and production origins
const allowedOrigins = [
  config.frontendOrigin,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:5176',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

/**
 * 1. Health Check Endpoint
 * Reports API status, persistence engine (supabase vs memory), and Gemini availability
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Theme 4: Research & Knowledge Agent Backend',
    persistenceMode: storageService.getPersistenceMode(),
    geminiConfigured: config.isGeminiConfigured,
    activeModel: config.geminiModel,
    fallbackModel: config.geminiFallbackModel,
    timestamp: new Date().toISOString(),
  });
});

/**
 * 2. Execute Research Agent Loop
 * Decomposes sub-questions, executes real web and KB tools, resolves conflicts, and synthesizes report
 */
app.post('/api/research', async (req, res, next) => {
  try {
    const parsed = ResearchRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten(),
      });
    }

    const {
      question,
      audience,
      enabledSources,
      uploadedNotes,
      sessionId,
      followUpQuestion,
    } = parsed.data;

    const result = await runResearchAgent({
      question,
      audience,
      enabledSources,
      uploadedNotes,
      sessionId,
      followUpQuestion,
    });

    // Persist to Supabase or in-memory fallback
    await storageService.saveSession({
      id: result.sessionId,
      question: result.researchQuestion,
      audience: result.audience,
      status: 'completed',
      enabledSources,
      subQuestions: result.subQuestions,
      conflictFlag: result.conflictFlag,
      pendingApproval: result.pendingApproval,
      report: result.report,
      metrics: result.metrics,
    });

    await storageService.saveTraces(result.sessionId, result.traces);

    return res.status(200).json({
      ...result,
      persistenceMode: storageService.getPersistenceMode(),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 3. Retrieve Saved Research Session
 */
app.get('/api/research/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const session = await storageService.getSession(sessionId);

    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        sessionId,
      });
    }

    return res.status(200).json(session);
  } catch (err) {
    next(err);
  }
});

/**
 * 4. Human Approval Gate Decision
 * Approves or rejects external report dissemination with audit logging
 */
app.post('/api/research/:sessionId/approval', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const parsed = ApprovalRequestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: 'Invalid approval request body',
        details: parsed.error.flatten(),
      });
    }

    const { decision, notes } = parsed.data;
    const updatedSession = await storageService.updateApproval(sessionId, { decision, notes });

    if (!updatedSession) {
      return res.status(404).json({
        error: 'Session not found to apply approval',
        sessionId,
      });
    }

    return res.status(200).json({
      message: `Action ${decision}ed successfully`,
      sessionId,
      approvalStatus: updatedSession.approvalStatus,
      approvalNotes: updatedSession.approvalNotes,
      status: updatedSession.status,
    });
  } catch (err) {
    next(err);
  }
});

// Centralized error handling middleware
app.use((err, req, res, _next) => {
  const status = err.status || 500;
  return res.status(status).json({
    error: err.message || 'Internal Research Agent execution error',
    statusCode: status,
  });
});

const server = app.listen(config.port, () => {
  console.log(`[Research & Knowledge Agent API] Running on http://localhost:${config.port}`);
  console.log(`[Persistence Mode]: ${storageService.getPersistenceMode()}`);
  console.log(`[Gemini Configured]: ${config.isGeminiConfigured ? `Yes (${config.geminiModel})` : 'No (Using Heuristic Resilience)'}`);
});

server.on('error', (err) => {
  console.error('[Server Error]:', err);
});

server.on('close', () => {
  console.log('[Server Closed]');
});

// Explicit keepalive timer to ensure Node event loop remains active
const keepAlive = setInterval(() => {}, 1000000);
process.on('SIGINT', () => {
  clearInterval(keepAlive);
  server.close();
});
