import { describe, expect, it } from 'vitest'
import { CATEGORIES, QUESTIONS } from './data/questions.js'
import { buildRound, isCorrect, loadBest, saveBest, scoreRound, shuffle, updateBest, wrongAnswers } from './logic.js'

// Small deterministic PRNG so shuffles are reproducible in tests.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

describe('shuffle', () => {
  it('keeps every item and does not change the input', () => {
    const input = [1, 2, 3, 4, 5, 6]
    const out = shuffle(input, seeded(1))
    expect(input).toEqual([1, 2, 3, 4, 5, 6])
    expect([...out].sort()).toEqual(input)
  })

  it('changes the order for a typical seed', () => {
    const input = Array.from({ length: 12 }, (_, i) => i)
    expect(shuffle(input, seeded(42))).not.toEqual(input)
  })
})

describe('buildRound', () => {
  it('returns 10 unique questions and keeps the correct answer after shuffling options', () => {
    const bank = QUESTIONS.javascript
    const round = buildRound(bank, 'en', 10, seeded(7))
    expect(round).toHaveLength(10)
    expect(new Set(round.map((q) => q.id)).size).toBe(10)
    for (const q of round) {
      const source = bank.find((b) => b.id === q.id)
      expect(q.options).toHaveLength(4)
      expect(q.options[q.correctIndex]).toBe(source.en.o[source.a])
    }
  })
})

describe('scoring', () => {
  const round = [
    { id: 'a', question: 'A?', options: ['x', 'y', 'z', 'w'], correctIndex: 0 },
    { id: 'b', question: 'B?', options: ['x', 'y', 'z', 'w'], correctIndex: 2 },
    { id: 'c', question: 'C?', options: ['x', 'y', 'z', 'w'], correctIndex: 3 },
  ]

  it('treats a timeout (null) as wrong', () => {
    expect(isCorrect(round[0], null)).toBe(false)
    expect(isCorrect(round[0], 0)).toBe(true)
  })

  it('counts correct answers', () => {
    expect(scoreRound(round, [0, 2, 1])).toBe(2)
    expect(scoreRound(round, [null, null, null])).toBe(0)
  })

  it('lists wrong and missed answers with the right option', () => {
    expect(wrongAnswers(round, [0, 1, null])).toEqual([
      { id: 'b', question: 'B?', chosen: 'y', correct: 'z', ok: false },
      { id: 'c', question: 'C?', chosen: null, correct: 'w', ok: false },
    ])
  })
})

describe('best score', () => {
  it('only replaces a lower score', () => {
    expect(updateBest({}, 'css', 4)).toEqual({ best: { css: 4 }, isNew: true })
    expect(updateBest({ css: 7 }, 'css', 5)).toEqual({ best: { css: 7 }, isNew: false })
    expect(updateBest({ css: 7 }, 'css', 9).best.css).toBe(9)
  })

  it('survives broken or blocked storage', () => {
    const broken = {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      },
    }
    expect(loadBest(broken)).toEqual({})
    expect(() => saveBest({ css: 1 }, broken)).not.toThrow()
    expect(loadBest({ getItem: () => '{not json' })).toEqual({})
  })
})

describe('question bank', () => {
  it('has at least 12 well-formed questions per category in both languages', () => {
    for (const c of CATEGORIES) {
      expect(QUESTIONS[c].length).toBeGreaterThanOrEqual(12)
      for (const q of QUESTIONS[c]) {
        for (const lang of ['az', 'en']) {
          expect(q[lang].q.length).toBeGreaterThan(0)
          expect(q[lang].o).toHaveLength(4)
          expect(new Set(q[lang].o).size).toBe(4)
        }
        expect(q.a).toBeGreaterThanOrEqual(0)
        expect(q.a).toBeLessThan(4)
      }
    }
  })
})
