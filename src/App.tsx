import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MotionProvider } from './lib/motion'
import { TransitionProvider } from './lib/transition'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import Home from './pages/Home'

const Approach = lazy(() => import('./pages/Approach'))
const Funds = lazy(() => import('./pages/Funds'))
const AlignmentPage = lazy(() => import('./pages/AlignmentPage'))
const Investors = lazy(() => import('./pages/Investors'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export function App() {
  return (
    <MotionProvider>
      <TransitionProvider>
        <ScrollProgress />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <Suspense fallback={<div className="min-h-svh bg-ink" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/approach" element={<Approach />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/alignment" element={<AlignmentPage />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </TransitionProvider>
    </MotionProvider>
  )
}
