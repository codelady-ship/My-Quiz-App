export const ROUND_SIZE = 10
export const SECONDS_PER_QUESTION = 20
const BEST_KEY = 'my-quiz-app:best'

/** Fisher–Yates shuffle. Returns a new array; the input is not changed. */
export function shuffle(items, rng = Math.random) {
  const out = items.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Picks `count` random questions from a bank and shuffles each question's options.
 * Returns [{ id, question, options, correctIndex }] in the requested language.
 */
export function buildRound(bank, lang, count = ROUND_SIZE, rng = Math.random) {
  return shuffle(bank, rng)
    .slice(0, count)
    .map((item) => {
      const text = item[lang]
      const order = shuffle(
        text.o.map((_, i) => i),
        rng,
      )
      return {
        id: item.id,
        question: text.q,
        options: order.map((i) => text.o[i]),
        correctIndex: order.indexOf(item.a),
      }
    })
}

/** `chosen` is an option index, or null when the timer ran out. */
export function isCorrect(question, chosen) {
  return chosen !== null && chosen !== undefined && chosen === question.correctIndex
}

export function scoreRound(round, answers) {
  return round.reduce((sum, q, i) => sum + (isCorrect(q, answers[i]) ? 1 : 0), 0)
}

/** Questions answered wrongly or not at all, with the chosen and the right option text. */
export function wrongAnswers(round, answers) {
  return round
    .map((q, i) => ({
      id: q.id,
      question: q.question,
      chosen: answers[i] === null || answers[i] === undefined ? null : q.options[answers[i]],
      correct: q.options[q.correctIndex],
      ok: isCorrect(q, answers[i]),
    }))
    .filter((r) => !r.ok)
}

/** Returns a new best-score map and whether `score` beat the previous best. */
export function updateBest(best, category, score) {
  const previous = best[category]
  const isNew = typeof previous !== 'number' || score > previous
  return { best: isNew ? { ...best, [category]: score } : best, isNew }
}

export function loadBest(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(BEST_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function saveBest(best, storage = globalThis.localStorage) {
  try {
    storage?.setItem(BEST_KEY, JSON.stringify(best))
  } catch {
    // Storage can be blocked (private mode, quota); the game still works without it.
  }
}
