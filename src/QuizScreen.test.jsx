// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Real React scheduling (no act()) so separate commits stay observable;
// only Date.now is controlled to move the quiz countdown.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const text = (el, sel) => el.querySelector(sel)?.textContent
let now
let container
let root

beforeEach(async () => {
  now = 1_000_000
  vi.spyOn(Date, 'now').mockImplementation(() => now)
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  root.render(<App />)
  await wait(30)
  ;[...container.querySelectorAll('button')].find((b) => b.textContent === 'Başla').click()
  await wait(30)
})

afterEach(() => {
  root.unmount()
  container.remove()
  vi.restoreAllMocks()
})

it('ignores auto-repeated key presses', async () => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: '2', repeat: true }))
  await wait(30)
  expect(container.querySelector('.option:disabled')).toBeNull()

  window.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }))
  await wait(30)
  expect(container.querySelectorAll('.option:disabled')).toHaveLength(4)
})

it('never shows the previous countdown on the next question', async () => {
  const firstQuestion = text(container, '#q-text')
  now += 5000
  await wait(300)
  expect(text(container, '.timer-text')).toBe('15 san')

  window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }))
  await wait(30)

  const stale = []
  const observer = new MutationObserver(() => {
    const t = text(container, '.timer-text')
    if (text(container, '#q-text') !== firstQuestion && t !== '20 san') stale.push(t)
  })
  observer.observe(container, { subtree: true, childList: true, characterData: true })

  ;[...container.querySelectorAll('button')].find((b) => b.textContent === 'Növbəti sual').click()
  await wait(100)
  observer.disconnect()

  expect(text(container, '#q-text')).not.toBe(firstQuestion)
  expect(text(container, '.timer-text')).toBe('20 san')
  expect(stale).toEqual([])
})
