/**
 * Frontend API Service for Theme 4 Research & Knowledge Agent Backend
 * Connects to live Express backend at VITE_API_BASE_URL, VITE_API_URL, or http://localhost:5000
 */

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000'
).replace(/\/+$/, '');

export function getApiBaseUrl() {
  return API_BASE;
}

export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`${API_BASE}/api/health`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        online: true,
        service: data.service,
        persistenceMode: data.persistenceMode || 'memory',
        geminiConfigured: Boolean(data.geminiConfigured),
        activeModel: data.activeModel || 'gemini-3.8-flash',
        fallbackModel: data.fallbackModel || 'gemini-3.5-flash-lite',
      };
    }
    return { online: false, persistenceMode: 'offline', geminiConfigured: false };
  } catch {
    return { online: false, persistenceMode: 'offline', geminiConfigured: false };
  }
}

export async function executeResearch({
  question,
  audience = 'Researchers',
  enabledSources = { webSearch: true, knowledgeBase: true },
  uploadedNotes = undefined,
  sessionId = undefined,
  followUpQuestion = undefined,
}) {
  const payload = {
    question: (question || '').trim(),
    audience: audience || 'Researchers',
    enabledSources: enabledSources || { webSearch: true, knowledgeBase: true },
  };

  if (uploadedNotes) {
    payload.uploadedNotes = uploadedNotes;
  }
  if (sessionId && typeof sessionId === 'string' && sessionId.trim().length > 0) {
    payload.sessionId = sessionId.trim();
  }
  if (followUpQuestion && typeof followUpQuestion === 'string' && followUpQuestion.trim().length > 0) {
    payload.followUpQuestion = followUpQuestion.trim();
  }

  const res = await fetch(`${API_BASE}/api/research`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    let msg = errData.error || `Research request failed with status ${res.status}`;
    if (errData.details) {
      const fieldErrors = errData.details.fieldErrors || errData.details;
      if (typeof fieldErrors === 'object' && fieldErrors !== null) {
        const detailsStr = Object.entries(fieldErrors)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : JSON.stringify(v)}`)
          .join('; ');
        if (detailsStr) msg += ` (${detailsStr})`;
      }
    }
    throw new Error(msg);
  }

  return await res.json();
}

export async function getResearchSession(sessionId) {
  const res = await fetch(`${API_BASE}/api/research/${encodeURIComponent(sessionId)}`);
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to fetch session ${sessionId}`);
  }
  return await res.json();
}

export async function submitApprovalDecision(sessionId, { decision, actionName = 'export_and_publish_external', notes = '' }) {
  const res = await fetch(`${API_BASE}/api/research/${encodeURIComponent(sessionId)}/approval`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      decision,
      actionName,
      notes,
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to submit approval: status ${res.status}`);
  }

  return await res.json();
}
