// Data layer for the admin page (#/admin).
// - "api" mode talks to the Express API with a Bearer token (real admin, or the read-only
//   demo admin whose writes the server answers with 403).
// - "sandbox" mode is used when the API is not configured or does not answer: it starts from
//   the bundled question bank (src/data/questions.js) and keeps every change in
//   sessionStorage only, so nothing real is ever changed and a new tab starts fresh.
import { CATEGORIES, QUESTIONS } from './data/questions.js'
import { API_URL } from './api.js'

export const DEMO_LOGIN = { email: 'demo@codecheck.az', password: 'demo1234' }

const TIMEOUT_MS = 8000
const SESSION_KEY = 'my-quiz-app:admin-session'
const SANDBOX_KEY = 'my-quiz-app:admin-sandbox'

// sessionStorage with an in-memory fallback (storage can be blocked, e.g. in some iframes).
const memory = {}
const storage = {
  get(key) {
    try {
      const saved = sessionStorage.getItem(key)
      if (saved !== null) return JSON.parse(saved)
    } catch {
      // blocked or broken: use the in-memory copy
    }
    return memory[key] ?? null
  },
  set(key, value) {
    memory[key] = value
    try {
      if (value === null) sessionStorage.removeItem(key)
      else sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage blocked: the session lasts until the page reloads
    }
  },
}

export const loadSession = () => storage.get(SESSION_KEY)
export const saveSession = (session) => storage.set(SESSION_KEY, session)

async function call(path, { method = 'GET', body, token } = {}) {
  if (!API_URL) throw Object.assign(new Error('offline'), { offline: true })
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const headers = {}
    if (body) headers['Content-Type'] = 'application/json'
    if (token) headers.Authorization = `Bearer ${token}`
    const res = await fetch(API_URL + path, { method, headers, body: body ? JSON.stringify(body) : undefined, signal: ctrl.signal })
    const data = res.status === 204 ? {} : await res.json().catch(() => ({}))
    if (!res.ok) throw Object.assign(new Error(data.details?.[0]?.message || data.error || `HTTP ${res.status}`), { status: res.status })
    return data
  } catch (err) {
    if (!err.status) err.offline = true // network error or timeout
    throw err
  } finally {
    clearTimeout(timer)
  }
}

/** Logs in through the API. Resolves { mode: 'api', token, role }; offline errors carry err.offline. */
export async function apiLogin(email, password) {
  const { token, role } = await call('/api/auth/login', { method: 'POST', body: { email, password } })
  return { mode: 'api', token, role: role || 'admin' }
}

/* ---------- sandbox (in-browser copy) ---------- */

const DEMO_PLAYERS = ['Aysel', 'Murad', 'Leyla', 'Kamran', 'Nigar']

function freshSandbox() {
  const questions = CATEGORIES.flatMap((category) =>
    QUESTIONS[category].map((q, i) => ({ qid: q.id, category, a: q.a, az: q.az, en: q.en, active: true, order: i })),
  )
  const scores = CATEGORIES.flatMap((category, c) =>
    DEMO_PLAYERS.map((nickname, i) => ({ nickname, category, score: Math.max(3, 10 - ((i * 2 + c) % 7)), total: 10, at: new Date(Date.UTC(2026, 10, 1 + i + c)).toISOString() })),
  )
  return { questions, scores }
}

const readSandbox = () => storage.get(SANDBOX_KEY) || freshSandbox()

function writeSandbox(fn) {
  const data = readSandbox()
  const out = fn(data)
  storage.set(SANDBOX_KEY, data)
  return out
}

export const resetSandbox = () => storage.set(SANDBOX_KEY, null)

const notFound = () => Object.assign(new Error('Question not found'), { status: 404 })

function checkQuestion(q) {
  if (!/^[a-z0-9-]+$/.test(q.qid || '')) return 'ID: lowercase letters, digits and dashes'
  if (q.az.o.length < 2 || q.az.o.length > 6) return 'Each question needs 2 to 6 options'
  if (q.az.o.length !== q.en.o.length) return 'az and en need the same number of options'
  if (!(q.a >= 0 && q.a < q.az.o.length)) return 'The right answer must point to an existing option'
  if (q.az.q.trim().length < 3 || q.en.q.trim().length < 3) return 'Question text: at least 3 characters'
  return null
}

const sandboxStore = {
  mode: 'sandbox',
  async listQuestions() {
    return readSandbox().questions
  },
  async saveQuestion(q, originalQid) {
    const problem = checkQuestion(q)
    if (problem) throw Object.assign(new Error(problem), { status: 400 })
    return writeSandbox((data) => {
      const i = data.questions.findIndex((x) => x.qid === (originalQid || q.qid))
      if (!originalQid && i !== -1) throw Object.assign(new Error('Already exists'), { status: 409 })
      if (originalQid && i === -1) throw notFound()
      const row = { active: true, order: 999, ...(i === -1 ? {} : data.questions[i]), ...q, qid: originalQid || q.qid }
      if (i === -1) data.questions.push(row)
      else data.questions[i] = row
      return row
    })
  },
  async setActive(qid, active) {
    return writeSandbox((data) => {
      const row = data.questions.find((x) => x.qid === qid)
      if (!row) throw notFound()
      row.active = active
      return row
    })
  },
  async deleteQuestion(qid) {
    writeSandbox((data) => {
      data.questions = data.questions.filter((x) => x.qid !== qid)
    })
  },
  async leaderboard(category) {
    return readSandbox()
      .scores.filter((s) => s.category === category)
      .sort((a, b) => b.score - a.score || a.at.localeCompare(b.at))
  },
  async deleteScores(nickname) {
    return writeSandbox((data) => {
      const before = data.scores.length
      data.scores = data.scores.filter((s) => s.nickname.toLowerCase() !== nickname.toLowerCase())
      return { deleted: before - data.scores.length }
    })
  },
}

/** Same methods as the sandbox, backed by the API. */
function apiStore(token) {
  const auth = (path, opts = {}) => call(path, { ...opts, token })
  return {
    mode: 'api',
    listQuestions: () => auth('/api/admin/questions'),
    saveQuestion: (q, originalQid) =>
      originalQid
        ? auth(`/api/admin/questions/${encodeURIComponent(originalQid)}`, { method: 'PUT', body: q })
        : auth('/api/admin/questions', { method: 'POST', body: q }),
    setActive: (qid, active) => auth(`/api/admin/questions/${encodeURIComponent(qid)}`, { method: 'PATCH', body: { active } }),
    deleteQuestion: (qid) => auth(`/api/admin/questions/${encodeURIComponent(qid)}`, { method: 'DELETE' }),
    leaderboard: (category) => call(`/api/leaderboard/${encodeURIComponent(category)}`),
    deleteScores: (nickname) => auth(`/api/admin/scores/${encodeURIComponent(nickname)}`, { method: 'DELETE' }),
  }
}

export const storeFor = (session) => (session.mode === 'api' ? apiStore(session.token) : sandboxStore)
