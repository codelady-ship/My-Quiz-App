import { useCallback, useEffect, useMemo, useState } from 'react'
import { CATEGORIES } from './data/questions.js'
import { DEMO_LOGIN, apiLogin, loadSession, resetSandbox, saveSession, storeFor } from './adminStore.js'
import './admin.css'

const CATEGORY_NAMES = { html: 'HTML', css: 'CSS', javascript: 'JavaScript', react: 'React' }

/** Small admin page for the question bank and the leaderboard (route: #/admin). */
export default function Admin() {
  const [session, setSession] = useState(loadSession)
  const [toast, setToast] = useState('')

  useEffect(() => {
    // The admin is English-only; lang="en" also keeps uppercase headings from turning i into İ.
    document.documentElement.lang = 'en'
    document.title = 'Admin · Code Check'
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const id = setTimeout(() => setToast(''), 5000)
    return () => clearTimeout(id)
  }, [toast])

  const start = (next) => {
    saveSession(next)
    setSession(next)
  }

  const logout = useCallback((message = '') => {
    saveSession(null)
    setSession(null)
    setToast(message)
  }, [])

  return (
    <div className="shell admin-shell">
      <header className="topbar">
        <a className="brand" href="#/" aria-label="Code Check: back to the quiz">
          <span className="brand-mark" aria-hidden="true">
            {'{?}'}
          </span>
          <span className="brand-name">Code Check</span>
          <span className="pill">Admin</span>
        </a>
        {session && (
          <button type="button" className="btn btn-ghost" onClick={() => logout()}>
            Log out
          </button>
        )}
      </header>

      <main className="stage">
        {session ? <Panel session={session} onToast={setToast} onLogout={logout} /> : <Login onLogin={start} />}
      </main>

      <div className="admin-toast-slot" aria-live="polite">
        {toast && (
          <p className="admin-toast" role="status">
            {toast}
          </p>
        )}
      </div>
    </div>
  )
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      onLogin(await apiLogin(email.trim(), password))
    } catch (err) {
      setError(err.offline ? 'The API is offline right now. Use “Demo admin” to try the panel.' : err.message)
    } finally {
      setBusy(false)
    }
  }

  // Signs in as the read-only demo admin on the API, or opens the in-browser sandbox when the API is offline.
  const demo = async () => {
    setBusy(true)
    setError('')
    try {
      onLogin(await apiLogin(DEMO_LOGIN.email, DEMO_LOGIN.password))
    } catch (err) {
      if (err.offline || err.status >= 500 || err.status === 401) onLogin({ mode: 'sandbox', role: 'demo' })
      else setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="card admin-login" aria-labelledby="login-title">
      <p className="eyebrow">Admin</p>
      <h1 id="login-title" className="title">
        Sign in
      </h1>
      <p className="lead">Manage the question bank and moderate the leaderboard.</p>

      <button type="button" className="btn btn-primary btn-wide" onClick={demo} disabled={busy}>
        Demo admin
      </button>
      <p className="muted admin-small">
        Public demo login: <code>{DEMO_LOGIN.email}</code> / <code>{DEMO_LOGIN.password}</code> (read-only, changes are not saved).
      </p>

      <form className="admin-form" onSubmit={submit} noValidate>
        <label htmlFor="admin-email">Email</label>
        <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && (
          <p className="lb-msg is-bad" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-ghost btn-wide" disabled={busy || !email || !password}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  )
}

function Panel({ session, onToast, onLogout }) {
  const [tab, setTab] = useState('questions')
  const store = useMemo(() => storeFor(session), [session])
  const sandbox = session.mode === 'sandbox'

  // 403 (demo admin) and validation errors become a toast; 401 ends the session.
  const fail = useCallback(
    (err) => {
      if (err.status === 401) onLogout('Your session expired. Please sign in again.')
      else if (err.offline) onToast('The API did not answer. Try again in a moment.')
      else onToast(err.message)
    },
    [onLogout, onToast],
  )

  return (
    <section className="card admin-panel" aria-labelledby="panel-title">
      <h1 id="panel-title" className="sr-only">
        Admin panel
      </h1>
      {sandbox ? (
        <p className="admin-note">
          <strong>Demo mode — changes are not saved.</strong> The API is offline, so this panel runs on the bundled question bank
          inside your browser tab.{' '}
          <button
            type="button"
            className="admin-link"
            onClick={() => {
              resetSandbox()
              window.location.reload()
            }}
          >
            Reset demo data
          </button>
        </p>
      ) : (
        session.role === 'demo' && (
          <p className="admin-note">
            <strong>Read-only demo admin — changes are not saved.</strong> You can browse everything; edits are blocked by the
            server.
          </p>
        )
      )}

      <div className="admin-tabs" role="tablist" aria-label="Admin sections">
        {[
          ['questions', 'Questions'],
          ['scores', 'Leaderboard'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            className={`admin-tab ${tab === id ? 'is-active' : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'questions' ? <Questions store={store} onToast={onToast} fail={fail} /> : <Scores store={store} onToast={onToast} fail={fail} />}
      </div>
    </section>
  )
}

const emptyQuestion = (category) => ({ qid: '', category, a: 0, az: { q: '', o: ['', ''] }, en: { q: '', o: ['', ''] } })

function Questions({ store, onToast, fail }) {
  const [rows, setRows] = useState(null)
  const [category, setCategory] = useState('all')
  const [editing, setEditing] = useState(null) // { original, draft }
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let alive = true
    store
      .listQuestions()
      .then((list) => alive && setRows(list))
      .catch((err) => {
        if (alive) setRows([])
        fail(err)
      })
    return () => {
      alive = false
    }
  }, [store, reload, fail])

  const refresh = () => setReload((n) => n + 1)
  const shown = (rows || []).filter((q) => category === 'all' || q.category === category)

  const run = async (action, okMessage) => {
    try {
      await action()
      onToast(okMessage)
      refresh()
      return true
    } catch (err) {
      fail(err)
      return false
    }
  }

  const save = async (draft) => {
    const ok = await run(() => store.saveQuestion(draft, editing.original), editing.original ? 'Question updated.' : 'Question added.')
    if (ok) setEditing(null)
  }

  return (
    <div className="admin-section">
      <div className="admin-toolbar">
        <label htmlFor="admin-cat">Category</label>
        <select id="admin-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_NAMES[c]}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setEditing({ original: null, draft: emptyQuestion(category === 'all' ? 'html' : category) })}
        >
          Add question
        </button>
      </div>

      {editing && <QuestionForm key={editing.original || 'new'} initial={editing.draft} isNew={!editing.original} onSave={save} onCancel={() => setEditing(null)} />}

      {rows === null ? (
        <p className="muted">Loading…</p>
      ) : (
        <>
          <p className="muted admin-small">{shown.length} questions</p>
          <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Questions">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Category</th>
                  <th scope="col">Question (EN)</th>
                  <th scope="col">Right answer</th>
                  <th scope="col">Active</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((q) => (
                  <tr key={q.qid} className={q.active === false ? 'is-off' : ''}>
                    <td>
                      <code>{q.qid}</code>
                    </td>
                    <td>{CATEGORY_NAMES[q.category]}</td>
                    <td className="admin-q">{q.en.q}</td>
                    <td>
                      <code>{q.en.o[q.a]}</code>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`admin-switch ${q.active !== false ? 'is-on' : ''}`}
                        aria-pressed={q.active !== false}
                        aria-label={`${q.qid} active`}
                        onClick={() => run(() => store.setActive(q.qid, q.active === false), q.active === false ? 'Question enabled.' : 'Question disabled.')}
                      >
                        {q.active !== false ? 'On' : 'Off'}
                      </button>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          type="button"
                          className="btn btn-ghost admin-btn"
                          onClick={() => setEditing({ original: q.qid, draft: { qid: q.qid, category: q.category, a: q.a, az: q.az, en: q.en } })}
                        >
                          Edit
                        </button>
                        <ConfirmButton label="Delete" onConfirm={() => run(() => store.deleteQuestion(q.qid), 'Question deleted.')} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

const toLines = (list) => list.join('\n')
const fromLines = (text) =>
  text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)

function QuestionForm({ initial, isNew, onSave, onCancel }) {
  const [qid, setQid] = useState(initial.qid)
  const [category, setCategory] = useState(initial.category)
  const [a, setA] = useState(initial.a)
  const [azQ, setAzQ] = useState(initial.az.q)
  const [enQ, setEnQ] = useState(initial.en.q)
  const [azO, setAzO] = useState(toLines(initial.az.o))
  const [enO, setEnO] = useState(toLines(initial.en.o))
  const optionCount = Math.max(fromLines(azO).length, 2)

  const submit = (e) => {
    e.preventDefault()
    onSave({ qid: qid.trim(), category, a: Number(a), az: { q: azQ.trim(), o: fromLines(azO) }, en: { q: enQ.trim(), o: fromLines(enO) } })
  }

  return (
    <form className="admin-edit" onSubmit={submit}>
      <h2 className="review-title">{isNew ? 'New question' : `Edit ${initial.qid}`}</h2>
      <div className="admin-grid">
        <div>
          <label htmlFor="f-qid">ID</label>
          <input id="f-qid" value={qid} onChange={(e) => setQid(e.target.value)} disabled={!isNew} placeholder="html-21" required />
        </div>
        <div>
          <label htmlFor="f-cat">Category</label>
          <select id="f-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_NAMES[c]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-az-q">Question (AZ)</label>
          <textarea id="f-az-q" rows={2} value={azQ} onChange={(e) => setAzQ(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="f-en-q">Question (EN)</label>
          <textarea id="f-en-q" rows={2} value={enQ} onChange={(e) => setEnQ(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="f-az-o">Options (AZ), one per line</label>
          <textarea id="f-az-o" rows={4} value={azO} onChange={(e) => setAzO(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="f-en-o">Options (EN), same order</label>
          <textarea id="f-en-o" rows={4} value={enO} onChange={(e) => setEnO(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="f-a">Right answer</label>
          <select id="f-a" value={a} onChange={(e) => setA(e.target.value)}>
            {Array.from({ length: optionCount }, (_, i) => (
              <option key={i} value={i}>
                Option {i + 1}
                {fromLines(enO)[i] ? `: ${fromLines(enO)[i]}` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="actions">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

function Scores({ store, onToast, fail }) {
  const [category, setCategory] = useState('html')
  const [rows, setRows] = useState(null)
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let alive = true
    setRows(null)
    store
      .leaderboard(category)
      .then((list) => alive && setRows(list))
      .catch((err) => {
        if (alive) setRows([])
        fail(err)
      })
    return () => {
      alive = false
    }
  }, [store, category, reload, fail])

  const remove = async (nickname) => {
    try {
      const { deleted } = await store.deleteScores(nickname)
      onToast(`${deleted} score(s) of ${nickname} removed.`)
      setReload((n) => n + 1)
    } catch (err) {
      fail(err)
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-toolbar">
        <label htmlFor="admin-lb-cat">Category</label>
        <select id="admin-lb-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_NAMES[c]}
            </option>
          ))}
        </select>
      </div>
      <p className="muted admin-small">Top 10 per category. Removing a nickname deletes all of its scores (moderation).</p>
      {rows === null ? (
        <p className="muted">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="muted">No scores yet.</p>
      ) : (
        <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Leaderboard">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nickname</th>
                <th scope="col">Score</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.nickname}-${i}`}>
                  <td>{i + 1}</td>
                  <td>{r.nickname}</td>
                  <td>
                    <code>
                      {r.score}/{r.total}
                    </code>
                  </td>
                  <td>{r.at ? new Date(r.at).toLocaleDateString('en-GB') : '—'}</td>
                  <td>
                    <ConfirmButton label="Remove scores" onConfirm={() => remove(r.nickname)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// Two-step delete button. window.confirm() is blocked inside a sandboxed iframe (no allow-modals),
// so the first tap arms the button and the second one confirms; it disarms after 4 s.
function ConfirmButton({ label, onConfirm }) {
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!armed) return undefined
    const id = setTimeout(() => setArmed(false), 4000)
    return () => clearTimeout(id)
  }, [armed])
  return (
    <button
      type="button"
      className={`btn btn-ghost admin-btn is-danger ${armed ? 'is-armed' : ''}`}
      onClick={() => {
        if (!armed) return setArmed(true)
        setArmed(false)
        onConfirm()
      }}
    >
      {armed ? 'Tap again to confirm' : label}
    </button>
  )
}
