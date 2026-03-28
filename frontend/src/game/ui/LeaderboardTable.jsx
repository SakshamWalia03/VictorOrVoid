import React from 'react'
import { Trophy, Clock, TrendingDown, Zap } from 'lucide-react'

const medals = ['🥇', '🥈', '🥉']
const rankColors = [
  { bg: 'rgba(255,200,0,0.08)', border: 'rgba(255,200,0,0.3)' },
  { bg: 'rgba(192,192,192,0.08)', border: 'rgba(192,192,192,0.3)' },
  { bg: 'rgba(205,127,50,0.08)', border: 'rgba(205,127,50,0.3)' },
]

const LeaderboardTable = ({ entries, loading, error, currentPlayer }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 sm:h-20 rounded-2xl animate-pulse" style={{ background: 'var(--color-surface-2)' }} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl"
        style={{ background: 'rgba(255,68,102,0.06)', border: '1px solid rgba(255,68,102,0.2)' }}>
        <p className="font-mono text-sm" style={{ color: '#ff4466' }}>{error}</p>
      </div>
    )
  }

  if (!entries.length) {
    return (
      <div className="text-center py-16 space-y-4 rounded-2xl"
        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
        <Trophy className="w-16 h-16 mx-auto opacity-10" style={{ color: 'var(--color-text)' }} />
        <p className="font-display text-2xl" style={{ color: 'var(--color-text-muted)' }}>No entries yet. Be the first!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, idx) => {
        const isCurrentPlayer = currentPlayer && entry.playerName === currentPlayer
        const savingsPct = Math.round(((entry.listingPrice - entry.finalPrice) / entry.listingPrice) * 100)
        const isTop3 = idx < 3

        return (
          <div
            key={entry._id || idx}
            className="relative flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5"
            style={{
              background: isCurrentPlayer
                ? 'linear-gradient(135deg,rgba(99,99,237,0.15),rgba(204,0,255,0.06))'
                : isTop3
                ? rankColors[idx].bg
                : 'var(--color-surface-2)',
              border: `1.5px solid ${isCurrentPlayer ? 'rgba(99,99,237,0.45)' : isTop3 ? rankColors[idx].border : 'var(--color-border)'}`,
              boxShadow: isCurrentPlayer ? '0 0 20px rgba(99,99,237,0.12)' : isTop3 ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            {/* Rank */}
            <div className="w-8 text-center flex-shrink-0">
              {idx < 3
                ? <span className="text-xl">{medals[idx]}</span>
                : <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>#{idx + 1}</span>
              }
            </div>

            {/* Player info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm truncate" style={{ color: 'var(--color-text)', fontFamily: 'Syne' }}>
                  {entry.playerName}
                </span>
                {isCurrentPlayer && <span className="neon-badge neon-badge-blue">YOU</span>}
              </div>
              <span className="text-xs truncate block" style={{ color: 'var(--color-text-muted)' }}>
                {entry.productName}
              </span>
            </div>

            {/* Stats — hidden on small */}
            <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-right">
              <div>
                <p className="section-label">Rounds</p>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" style={{ color: 'var(--color-text-muted)' }} />
                  <span className="font-mono text-sm" style={{ color: 'var(--color-text)' }}>{entry.roundsUsed}</span>
                </div>
              </div>
              <div>
                <p className="section-label">Saved</p>
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" style={{ color: 'var(--color-neon-green)' }} />
                  <span className="font-mono text-sm" style={{ color: 'var(--color-neon-green)' }}>{savingsPct}%</span>
                </div>
              </div>
            </div>

            {/* Final price */}
            <div className="text-right flex-shrink-0">
              <p className="section-label">Final</p>
              <span className="price-tag text-base">${entry.finalPrice?.toLocaleString()}</span>
            </div>

            {/* Score badge */}
            <div className="hidden md:flex w-14 h-12 rounded-xl flex-col items-center justify-center flex-shrink-0"
              style={{
                background: isTop3 ? `${rankColors[idx].bg}` : 'var(--color-surface)',
                border: `1px solid ${isTop3 ? rankColors[idx].border : 'var(--color-border)'}`,
              }}>
              <Zap className="w-3 h-3 mb-0.5" style={{ color: 'var(--color-victor)' }} />
              <span className="font-display text-lg leading-none" style={{ color: 'var(--color-victor)' }}>
                {entry.score}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LeaderboardTable
