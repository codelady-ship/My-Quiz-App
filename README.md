# My Quiz App

A bilingual (AZ/EN) web-development quiz built with React and Vite.

Live: https://codelady-ship.github.io/My-Quiz-App/

## Features

- Four categories: HTML, CSS, JavaScript, React (12 questions each, in Azerbaijani and English)
- 10 random questions per round, options shuffled, 20-second timer per question
- Instant correct/wrong feedback, progress bar and running score
- Results screen with a review of wrong answers and the right ones
- Best score per category saved in the browser (localStorage)
- Keyboard friendly (keys 1–4 pick an answer), light/dark theme, respects reduced motion, works from 360px phones to wide screens

## Scripts

```bash
npm install
npm run dev          # local dev server
npm test             # vitest unit tests (shuffle, scoring, best score)
npm run build        # production build to dist/
npm run build:pages  # build with base /My-Quiz-App/ for GitHub Pages
```

Stack: React 19, Vite, plain CSS. No UI libraries.
