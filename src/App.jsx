import { useCallback, useEffect, useRef, useState } from 'react'
import { CATEGORIES, QUESTIONS } from './data/questions.js'
import { LANGS, UI } from './i18n.js'
import {
  ROUND_SIZE,
  SECONDS_PER_QUESTION,
  buildRound,
  isCorrect,
  loadBest,
  saveBest,
  scoreRound,
  updateBest,
  wrongAnswers,
} from './logic.js'

const LANG_KEY = 'my-quiz-app:lang'

function loadLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (LANGS.includes(saved)) return saved
  } catch {
    // ignore blocked storage
  }
  return 'az'
}

function saveLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    // ignore blocked storage
  }
}

export default function App() {
  const [lang, setLang] = useState(loadLang)
  const [category, setCategory] = useState('html')
  const [screen, setScreen] = useState('start') // start | quiz | results
  const [round, setRound] = useState([])
  const [answers, setAnswers] = useState([])
  const [best, setBest] = useState(loadBest)
  const [isNewBest, setIsNewBest] = useState(false)
  const t = UI[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `${t.appName} · ${t.tagline}`
  }, [lang, t])

  const changeLang = (next) => {
    setLang(next)
    saveLang(next)
  }

  const startRound = () => {
    setRound(buildRound(QUESTIONS[category], lang, ROUND_SIZE))
    setAnswers([])
    setIsNewBest(false)
    setScreen('quiz')
  }

  const finishRound = (finalAnswers) => {
    const score = scoreRound(round, finalAnswers)
    const result = updateBest(best, category, score)
    if (result.isNew) {
      setBest(result.best)
      saveBest(result.best)
    }
    setIsNewBest(result.isNew)
    setAnswers(finalAnswers)
    setScreen('results')
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            {'{?}'}
          </span>
          <span className="brand-name">{t.appName}</span>
        </div>
        {screen === 'quiz' && (
          <button type="button" className="btn btn-ghost" onClick={() => setScreen('start')}>
            {t.quit}
          </button>
        )}
      </header>

      <main className="stage">
        {screen === 'start' && (
          <StartScreen
            t={t}
            lang={lang}
            onLang={changeLang}
            category={category}
            onCategory={setCategory}
            best={best}
            onStart={startRound}
          />
        )}
        {screen === 'quiz' && (
          <QuizScreen key={round.map((q) => q.id).join()} t={t} category={category} round={round} onFinish={finishRound} />
        )}
        {screen === 'results' && (
          <ResultsScreen
            t={t}
            category={category}
            round={round}
            answers={answers}
            best={best[category]}
            isNewBest={isNewBest}
            onAgain={startRound}
            onHome={() => setScreen('start')}
          />
        )}
      </main>

      <footer className="foot">{t.footer}</footer>
    </div>
  )
}

function StartScreen({ t, lang, onLang, category, onCategory, best, onStart }) {
  return (
    <section className="card start" aria-labelledby="start-title">
      <p className="eyebrow">{t.tagline}</p>
      <h1 id="start-title" className="title">
        {t.appName}
      </h1>
      <p className="lead">{t.intro}</p>

      <fieldset className="group">
        <legend>{t.language}</legend>
        <div className="segmented">
          {LANGS.map((code) => (
            <label key={code} className="seg">
              <input type="radio" name="lang" value={code} checked={lang === code} onChange={() => onLang(code)} />
              <span>{code.toUpperCase()}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="group">
        <legend>{t.category}</legend>
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <label key={c} className={`cat cat-${c}`}>
              <input type="radio" name="category" value={c} checked={category === c} onChange={() => onCategory(c)} />
              <span className="cat-body">
                <span className="cat-name">{t.categories[c]}</span>
                <span className="cat-best">{typeof best[c] === 'number' ? t.best(best[c], ROUND_SIZE) : t.noBest}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="button" className="btn btn-primary btn-wide" onClick={onStart}>
        {t.start}
      </button>
    </section>
  )
}

function QuizScreen({ t, category, round, onFinish }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [remaining, setRemaining] = useState(SECONDS_PER_QUESTION)
  const nextRef = useRef(null)
  const headingRef = useRef(null)

  const question = round[index]
  const answered = answers.length > index
  const chosen = answered ? answers[index] : undefined
  const isLast = index === round.length - 1
  const score = scoreRound(round.slice(0, answers.length), answers)

  const choose = useCallback(
    (optionIndex) => {
      setAnswers((prev) => (prev.length > index ? prev : [...prev, optionIndex]))
    },
    [index],
  )

  // Per-question countdown, computed from a start time so it does not drift.
  useEffect(() => {
    if (answered) return undefined
    const startedAt = Date.now()
    setRemaining(SECONDS_PER_QUESTION)
    const id = setInterval(() => {
      const left = SECONDS_PER_QUESTION - Math.floor((Date.now() - startedAt) / 1000)
      if (left <= 0) {
        setRemaining(0)
        clearInterval(id)
        choose(null)
      } else {
        setRemaining(left)
      }
    }, 200)
    return () => clearInterval(id)
  }, [index, answered, choose])

  // Keys 1–4 pick an option while the question is open.
  useEffect(() => {
    const onKey = (e) => {
      if (answered || e.altKey || e.ctrlKey || e.metaKey) return
      const n = Number(e.key)
      if (Number.isInteger(n) && n >= 1 && n <= question.options.length) {
        e.preventDefault()
        choose(n - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answered, choose, question])

  useEffect(() => {
    if (answered) nextRef.current?.focus()
  }, [answered])

  useEffect(() => {
    if (index > 0) headingRef.current?.focus()
  }, [index])

  const goNext = () => {
    if (isLast) onFinish(answers)
    else setIndex((i) => i + 1)
  }

  const progress = ((index + (answered ? 1 : 0)) / round.length) * 100
  const timePct = (remaining / SECONDS_PER_QUESTION) * 100
  const urgent = !answered && remaining <= 5

  let feedback = null
  if (answered) {
    const ok = isCorrect(question, chosen)
    const lead = ok ? t.correct : chosen === null ? t.timeout : t.wrong
    feedback = (
      <p className={`feedback ${ok ? 'is-ok' : 'is-bad'}`}>
        <strong>{lead}</strong> {!ok && t.rightAnswerIs(question.options[question.correctIndex])}
      </p>
    )
  }

  return (
    <section className="card quiz" aria-labelledby="q-text">
      <div className="quiz-meta">
        <span className="pill">{t.categories[category]}</span>
        <span>{t.question(index + 1, round.length)}</span>
        <span className="score">{t.score(score)}</span>
      </div>

      <div
        className="bar"
        role="progressbar"
        aria-label={t.question(index + 1, round.length)}
        aria-valuemin={0}
        aria-valuemax={round.length}
        aria-valuenow={index + (answered ? 1 : 0)}
      >
        <span className="bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className={`timer ${urgent ? 'is-urgent' : ''}`} role="timer" aria-label={t.timeLeft(remaining)}>
        <span className="timer-track" aria-hidden="true">
          <span className="timer-fill" style={{ width: `${timePct}%` }} />
        </span>
        <span className="timer-text" aria-hidden="true">
          {t.seconds(remaining)}
        </span>
      </div>

      <h2 id="q-text" className="question" ref={headingRef} tabIndex={-1}>
        {question.question}
      </h2>

      <ol className="options">
        {question.options.map((opt, i) => {
          let state = ''
          if (answered) {
            if (i === question.correctIndex) state = 'is-right'
            else if (i === chosen) state = 'is-wrong'
            else state = 'is-dim'
          }
          return (
            <li key={`${question.id}-${i}`}>
              <button type="button" className={`option ${state}`} onClick={() => choose(i)} disabled={answered}>
                <kbd className="key" aria-hidden="true">
                  {i + 1}
                </kbd>
                <span className="option-text">{opt}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="live" aria-live="polite">
        {feedback}
      </div>

      {answered ? (
        <button type="button" ref={nextRef} className="btn btn-primary btn-wide" onClick={goNext}>
          {isLast ? t.finish : t.next}
        </button>
      ) : (
        <p className="hint">{t.keysHint}</p>
      )}
    </section>
  )
}

function ResultsScreen({ t, category, round, answers, best, isNewBest, onAgain, onHome }) {
  const score = scoreRound(round, answers)
  const misses = wrongAnswers(round, answers)
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <section className="card results" aria-labelledby="r-title">
      <p className="eyebrow">{t.categories[category]}</p>
      <h1 id="r-title" className="title" ref={headingRef} tabIndex={-1}>
        {t.results}
      </h1>

      <div className="score-ring" style={{ '--pct': `${(score / round.length) * 100}%` }}>
        <span className="score-num">
          {score}
          <small>/{round.length}</small>
        </span>
      </div>
      <p className="lead center">{t.resultLine(score, round.length)}</p>
      {isNewBest ? (
        <p className="badge">{t.newBest}</p>
      ) : (
        typeof best === 'number' && <p className="muted center">{t.bestSoFar(best, round.length)}</p>
      )}

      {misses.length === 0 ? (
        <p className="feedback is-ok center">{t.perfect}</p>
      ) : (
        <div className="review">
          <h2 className="review-title">{t.review}</h2>
          <ol className="review-list">
            {misses.map((m) => (
              <li key={m.id} className="review-item">
                <p className="review-q">{m.question}</p>
                <p className="review-row is-bad">
                  <span>{t.yourAnswer}:</span> <code>{m.chosen ?? t.noAnswer}</code>
                </p>
                <p className="review-row is-ok">
                  <span>{t.rightAnswer}:</span> <code>{m.correct}</code>
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onAgain}>
          {t.playAgain}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          {t.changeCategory}
        </button>
      </div>
    </section>
  )
}
