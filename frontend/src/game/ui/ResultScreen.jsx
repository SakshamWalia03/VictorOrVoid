import React, { useEffect } from 'react'
import { Trophy, RotateCcw, TrendingDown, Sparkles, Skull } from 'lucide-react'
import { useLeaderboard } from '../hooks/useLeaderboard'

const DEAL_MESSAGES = [
  "You actually pulled it off. Victor is impressed.",
  "Sharp move. The deal is done.",
  "Victor didn't see that coming. Well played.",
  "A calculated win. Victor respects it.",
]
const VOID_MESSAGES = [
  "Victor walks away. Into the void you go.",
  "Too far. Victor has his limits.",
  "The deal died. Victor doesn't look back.",
  "Next time, negotiate smarter.",
]

const ResultScreen = ({ state, onPlayAgain }) => {
  const { outcome, dealPrice, product, round, playerName } = state
  const isDeal = outcome === 'deal'
  const { fetchLeaderboard, fetchPlayerRank, entries, playerRank, loading } = useLeaderboard()

  useEffect(() => {
    fetchLeaderboard()
    let t
    if (isDeal && playerName) t = setTimeout(() => fetchPlayerRank(playerName), 1500)
    return () => { if (t) clearTimeout(t) }
  }, [fetchLeaderboard, fetchPlayerRank, isDeal, playerName])

  const randomMsg = (arr) => arr[Math.floor(Math.random() * arr.length)]
  const savings = isDeal && product ? product.listingPrice - dealPrice : 0
  const savingsPct = isDeal && product ? Math.round((savings / product.listingPrice) * 100) : 0

  const STATS = isDeal ? [
    { label: 'Final Price', value: `$${dealPrice?.toLocaleString()}`, color: 'var(--color-neon-green)', glow: true, bg: 'rgba(0,204,106,0.08)', border: 'rgba(0,204,106,0.25)' },
    { label: 'Listed At', value: `$${product?.listingPrice?.toLocaleString()}`, color: 'var(--color-text-muted)', bg: 'var(--color-surface-2)', border: 'var(--color-border)' },
    { label: 'You Saved', value: `${savingsPct}%`, color: '#00d4ff', bg: 'rgba(0,212,255,0.08)', border: 'rgba(0,212,255,0.25)' },
    { label: 'Rounds Used', value: `${round}/8`, color: 'var(--color-victor)', bg: 'rgba(255,117,32,0.08)', border: 'rgba(255,117,32,0.25)' },
  ] : []

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-5" style={{ animation: 'slideUp 0.5s ease-out' }}>

        {/* ── Outcome banner ── */}
        <div
          className="relative rounded-3xl p-8 sm:p-10 text-center space-y-4 overflow-hidden"
          style={{
            background: isDeal
              ? 'linear-gradient(135deg,rgba(0,255,136,0.1),rgba(0,212,255,0.05))'
              : 'linear-gradient(135deg,rgba(255,68,102,0.12),rgba(204,0,255,0.05))',
            border: `2px solid ${isDeal ? 'rgba(0,255,136,0.4)' : 'rgba(255,68,102,0.4)'}`,
          }}
        >
          <div className="absolute inset-0 opacity-15 blur-3xl"
            style={{ background: isDeal ? 'radial-gradient(circle,#00ff88,transparent)' : 'radial-gradient(circle,#ff4466,transparent)' }} />

          <div className="relative z-10 space-y-3">
            <div className="flex justify-center">
              {isDeal
                ? <Sparkles className="w-16 h-16 sm:w-20 sm:h-20" style={{ color: '#00ff88', filter: 'drop-shadow(0 0 20px #00ff88)' }} />
                : <Skull className="w-16 h-16 sm:w-20 sm:h-20" style={{ color: '#ff4466', filter: 'drop-shadow(0 0 20px #ff4466)' }} />
              }
            </div>
            <h1 className="font-display text-5xl sm:text-8xl leading-none"
              style={{
                color: isDeal ? '#00ff88' : '#ff4466',
                textShadow: isDeal ? '0 0 40px rgba(0,255,136,0.7), 0 0 80px rgba(0,255,136,0.3)' : '0 0 40px rgba(255,68,102,0.7)',
              }}>
              {isDeal ? 'DEAL MADE' : 'INTO THE VOID'}
            </h1>
            <p className="text-base sm:text-lg" style={{ color: 'var(--color-text-muted)', fontFamily: 'Syne' }}>
              {isDeal ? randomMsg(DEAL_MESSAGES) : randomMsg(VOID_MESSAGES)}
            </p>
          </div>
        </div>

        {/* ── Stats grid ── */}
        {isDeal && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map((s, i) => (
              <div key={i}
                className="rounded-2xl p-4 text-center space-y-1 transition-all"
                style={{
                  background: s.bg,
                  border: `1.5px solid ${s.border}`,
                  boxShadow: s.glow ? '0 0 24px rgba(0,255,136,0.2)' : 'none',
                }}>
                <p className="section-label">{s.label}</p>
                <p className="font-display text-2xl sm:text-3xl leading-tight"
                  style={{ color: s.color, textShadow: s.glow ? `0 0 20px ${s.color}` : 'none' }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Global rank ── */}
        {isDeal && playerRank && (
          <div className="rounded-2xl p-5 flex items-center justify-between overflow-hidden relative"
            style={{ background: 'rgba(99,99,237,0.1)', border: '1.5px solid rgba(99,99,237,0.35)' }}>
            <div className="absolute inset-0 opacity-10 blur-2xl"
              style={{ background: 'radial-gradient(circle at 30%,#cc00ff,transparent)' }} />
            <div className="relative z-10">
              <p className="section-label mb-1">YOUR GLOBAL RANK</p>
              <p className="font-display text-5xl" style={{ color: 'var(--color-void)', textShadow: '0 0 30px rgba(99,99,237,0.6)' }}>
                #{playerRank.rank}
              </p>
            </div>
            <Trophy className="w-14 h-14 sm:w-16 sm:h-16 opacity-20 relative z-10" style={{ color: 'var(--color-void)' }} />
          </div>
        )}

        {/* ── Mini leaderboard ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl sm:text-3xl" style={{ color: 'var(--color-text)' }}>LEADERBOARD</h2>
            <span className="neon-badge neon-badge-purple">TOP 5</span>
          </div>

          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 rounded-xl animate-pulse" style={{ background: 'var(--color-surface-2)' }} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {entries.slice(0, 5).map((e, i) => (
                <div key={i}
                  className="flex items-center gap-3 sm:gap-4 px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: e.playerName === playerName ? 'rgba(99,99,237,0.13)' : 'var(--color-surface-2)',
                    border: `1.5px solid ${e.playerName === playerName ? 'rgba(99,99,237,0.45)' : 'var(--color-border)'}`,
                    boxShadow: e.playerName === playerName ? '0 0 20px rgba(99,99,237,0.1)' : 'none',
                  }}>
                  <span className="font-mono text-base w-7 text-center flex-shrink-0">
                    {['🥇', '🥈', '🥉'][i] || <span style={{ color: 'var(--color-text-muted)' }}>#{i + 1}</span>}
                  </span>
                  <span className="flex-1 font-semibold text-sm truncate" style={{ color: 'var(--color-text)', fontFamily: 'Syne' }}>
                    {e.playerName}
                    {e.playerName === playerName && (
                      <span className="ml-2 neon-badge neon-badge-blue">YOU</span>
                    )}
                  </span>
                  <span className="price-tag text-base">${e.finalPrice?.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button onClick={onPlayAgain} className="btn-victor flex-1 flex items-center justify-center gap-2 py-4 text-xl">
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
          <button onClick={onPlayAgain} className="btn-void flex-1 flex items-center justify-center gap-2 py-4 text-xl">
            <Trophy className="w-5 h-5" />
            New Challenge
          </button>
        </div>

      </div>
    </div>
  )
}

export default ResultScreen
