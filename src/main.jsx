import { StrictMode, lazy, Suspense, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// The admin page lives at #/admin, so a direct link works on GitHub Pages
// (https://codelady-ship.github.io/My-Quiz-App/#/admin) without a server-side route.
const Admin = lazy(() => import('./Admin.jsx'))
const isAdminHash = () => /^#\/admin\b/.test(window.location.hash)

function Root() {
  const [admin, setAdmin] = useState(isAdminHash)
  useEffect(() => {
    const onHash = () => setAdmin(isAdminHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return admin ? (
    <Suspense fallback={null}>
      <Admin />
    </Suspense>
  ) : (
    <App />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
