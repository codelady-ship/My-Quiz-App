import { useEffect, useState } from 'react'
import { getLeaderboard, submitScore } from './api.js'

const NICK_KEY = 'my-quiz-app:nickname'

function loadNick() {
  try {
    return localStorage.getItem(NICK_KEY) || ''
  } catch {
    return ''
  }
}

/** Online leaderboard for one category; shown only when the API is live. */
export default function Leaderboard({ t, lang, category, round, answers }) {
  const [board, setBoard] = useState(null)
  const [nick, setNick] = useState(loadNick)
  const [status, setStatus] = useState('idle') // idle | saving | saved | error
  const [message, setMessage] = useState('')

  useEffect(() => {
    let alive = true
    getLeaderboard(category)
      .then((rows) => alive && setBoard(rows))
      .catch(() => alive && setBoard([]))
    return () => {
      alive = false
    }
  }, [category])

  const save = async (e) => {
    e.preventDefault()
    const name = nick.trim()
    if (name.length < 2 || name.length > 20) {
      setStatus('error')
      setMessage(t.nickHint)
      return
    }
    setStatus('saving')
    setMessage('')
    try {
      const res = await submitScore({
        nickname: name,
        category,
        lang,
        answers: round.map((q, i) => ({ id: q.id, answer: answers[i] === null || answers[i] === undefined ? null : q.options[answers[i]] })),
      })
      try {
        localStorage.setItem(NICK_KEY, name)
      } catch {
        // ignore blocked storage
      }
      setBoard(res.leaderboard)
      setStatus('saved')
      setMessage(res.rank ? t.savedRank(res.rank) : t.saved)
    } catch (err) {
      setStatus('error')
      setMessage(err.status ? err.message : t.saveFailed)
    }
  }

  return (
    <div className="review leaderboard">
      <h2 className="review-title">{t.leaderboard}</h2>
      {status !== 'saved' && (
        <form className="lb-form" onSubmit={save} noValidate>
          <label htmlFor="lb-nick">{t.nickname}</label>
          <div className="lb-row">
            <input id="lb-nick" value={nick} onChange={(e) => setNick(e.target.value)} maxLength={20} autoComplete="nickname" />
            <button type="submit" className="btn btn-primary" disabled={status === 'saving'}>
              {status === 'saving' ? t.saving : t.saveScore}
            </button>
          </div>
        </form>
      )}
      <p className={`lb-msg ${status === 'error' ? 'is-bad' : ''}`} aria-live="polite">
        {message}
      </p>
      {board === null ? (
        <p className="muted">{t.loading}</p>
      ) : board.length === 0 ? (
        <p className="muted">{t.noScores}</p>
      ) : (
        <ol className="lb-list">
          {board.map((r, i) => (
            <li key={`${r.nickname}-${i}`} className="lb-item">
              <span className="lb-rank">{i + 1}</span>
              <span className="lb-name">{r.nickname}</span>
              <span className="lb-score">
                {r.score}/{r.total}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
