import React, { useState, useEffect } from 'react'
import { Trophy, Swords, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useGame } from '../context/GameContext'

const Navbar = ({ onLeaderboard, onHome }) => {
  const { state } = useGame()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-2.5 backdrop-blur-2xl border-b' : 'py-4'}`}
      style={{
        background: scrolled ? 'rgba(7,7,15,0.90)' : 'transparent',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* Logo */}
        <button onClick={onHome} className="flex items-center gap-2 group focus:outline-none flex-shrink-0">
          <div className="relative">
            <Swords className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" style={{ color: 'var(--color-victor)' }} />
            <div className="absolute inset-0 blur-md opacity-50 rounded-full -z-10" style={{ background: 'var(--color-victor)' }} />
          </div>
          <span className="font-display text-xl sm:text-2xl leading-none" style={{ color: 'var(--color-victor)' }}>VICTOR</span>
          <span className="font-display text-base sm:text-lg leading-none text-gray-400 hidden xs:inline">OR</span>
          <span className="font-display text-xl sm:text-2xl leading-none hidden xs:inline" style={{ color: 'var(--color-void)' }}>VOID</span>
        </button>

        {/* Right side — desktop */}
        <div className="hidden sm:flex items-center gap-3">
          {state.phase === 'game' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <span className="section-label">Round</span>
              <div className="flex gap-1">
                {Array.from({ length: state.maxRounds }).map((_, i) => (
                  <div key={i}
                    className="w-1.5 h-4 rounded-full transition-all duration-300"
                    style={
                      i < state.round
                        ? { background: 'linear-gradient(180deg,#ff7520,#ff2d6f)' }
                        : i === state.round
                        ? { background: 'var(--color-victor)', opacity: 0.5 }
                        : { background: 'var(--color-text-muted)', opacity: 0.2 }
                    }
                  />
                ))}
              </div>
              <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                {state.round}/{state.maxRounds}
              </span>
            </div>
          )}

          <button onClick={onLeaderboard} className="btn-ghost flex items-center gap-2 text-sm">
            <Trophy className="w-4 h-4" />
            Leaderboard
          </button>

          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(o => !o)} className="btn-ghost p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t mt-1 px-4 py-4 space-y-2"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <button onClick={() => { onLeaderboard(); setMobileOpen(false); }}
            className="w-full btn-ghost flex items-center gap-2 text-sm justify-center py-3">
            <Trophy className="w-4 h-4" />
            Leaderboard
          </button>
          {state.phase === 'game' && (
            <div className="flex items-center justify-between px-3 py-2 rounded-xl"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <span className="section-label">Round {state.round}/{state.maxRounds}</span>
              <div className="flex gap-1">
                {Array.from({ length: state.maxRounds }).map((_, i) => (
                  <div key={i}
                    className="w-1.5 h-3 rounded-full"
                    style={{
                      background: i < state.round ? 'var(--color-victor)' : 'var(--color-border)',
                      opacity: i < state.round ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
