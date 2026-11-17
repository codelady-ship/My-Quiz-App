// Client for the Express + MongoDB API in backend/.
// The API URL comes from VITE_API_URL at build time, or from ?api=<url> for testing.
// With no URL, or when the API does not answer within 8 s, the app uses the bundled
// question bank (src/data/questions.js) and hides the online leaderboard.

const TIMEOUT_MS = 8000

function readApiUrl() {
  let fromQuery = null
  try {
    fromQuery = new URLSearchParams(globalThis.location?.search || '').get('api')
  } catch {
    // no location (tests)
  }
  return (fromQuery || import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
}

export const API_URL = readApiUrl()

async function request(path, options = {}) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(API_URL + path, {
      ...options,
      headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
      signal: ctrl.signal,
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      const err = new Error(body.details?.[0]?.message || body.error || `HTTP ${res.status}`)
      err.status = res.status
      throw err
    }
    return body
  } finally {
    clearTimeout(timer)
  }
}

/** Resolves with the question bank from the API, or null when the API is not available. */
export async function loadQuestionBank() {
  if (!API_URL) return null
  try {
    const { questions } = await request('/api/questions')
    const ok = questions && Object.values(questions).every((list) => Array.isArray(list) && list.length > 0)
    return ok ? questions : null
  } catch {
    return null
  }
}

export const getLeaderboard = (category) => request(`/api/leaderboard/${encodeURIComponent(category)}`)

/** answers: [{ id, answer }] where answer is the chosen option text or null. */
export const submitScore = (payload) => request('/api/scores', { method: 'POST', body: JSON.stringify(payload) })
