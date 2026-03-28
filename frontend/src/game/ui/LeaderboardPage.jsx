import React from 'react'
import { Trophy, RefreshCw, ArrowLeft, Crown, Zap } from 'lucide-react'
import LeaderboardTable from './LeaderboardTable'
import { useLeaderboard } from '../hooks/useLeaderboard'
import { useGame } from '../../context/GameContext'

const LeaderboardPage = ({ onBack }) => {
  const { state } = useGame()
  const { entries, loading, error, fetchLeaderboard } = useLeaderboard(true)

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 relative overflow-hidden">
      {/* Bg orbs */}
      <div className="absolute top-20 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#ff7520,transparent)' }} />
      <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#cc00ff,transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-05 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#00ff88,transparent)' }} />

      <div className="max-w-3xl mx-auto space-y-6 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="btn-ghost flex items-center gap-2 text-sm flex-shrink-0">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline">Back</span>
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Crown className="w-6 h-6" style={{ color: '#ffd700', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))' }} />
                <h1 className="font-display text-4xl sm:text-6xl leading-none" style={{ color: 'var(--color-text)' }}>
                  LEADERBOARD
                </h1>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'Syne' }}>
                The best negotiators in VictorOrVoid history
              </p>
            </div>
          </div>

          <button onClick={fetchLeaderboard} className="btn-ghost flex items-center gap-2 self-start sm:self-auto" title="Refresh">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline text-sm">Refresh</span>
          </button>
        </div>

        {/* ── Top 3 Podium (desktop) ── */}
        {!loading && entries.length >= 3 && (
          <div className="hidden sm:grid grid-cols-3 gap-3">
            {[entries[1], entries[0], entries[2]].map((e, idx) => {
              const rank = idx === 0 ? 2 : idx === 1 ? 1 : 3
              const heights = ['h-24', 'h-32', 'h-20']
              const colors = [
                { text: '#c0c0c0', glow: 'rgba(192,192,192,0.4)', border: 'rgba(192,192,192,0.35)' },
                { text: '#ffd700', glow: 'rgba(255,215,0,0.5)',   border: 'rgba(255,215,0,0.4)' },
                { text: '#cd7f32', glow: 'rgba(205,127,50,0.4)',  border: 'rgba(205,127,50,0.35)' },
              ]
              if (!e) return <div key={idx} />
              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="text-center">
                    <p className="font-semibold text-sm truncate max-w-[100px]" style={{ color: 'var(--color-text)', fontFamily: 'Syne' }}>{e.playerName}</p>
                    <p className="price-tag text-sm">${e.finalPrice?.toLocaleString()}</p>
                  </div>
                  <div
                    className={`w-full ${heights[idx]} rounded-t-2xl flex flex-col items-center justify-center gap-1`}
                    style={{
                      background: `rgba(${rank === 1 ? '255,215,0' : rank === 2 ? '192,192,192' : '205,127,50'},0.1)`,
                      border: `2px solid ${colors[idx].border}`,
                      boxShadow: `0 0 20px ${colors[idx].glow}`,
                    }}
                  >
                    <span className="text-2xl">{['🥈','🥇','🥉'][idx]}</span>
                    <span className="font-display text-2xl" style={{ color: colors[idx].text, textShadow: `0 0 12px ${colors[idx].glow}` }}>
                      #{rank}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── Stats bar ── */}
        {!loading && entries.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total Players', value: entries.length, color: 'var(--color-void)', icon: <Zap className="w-4 h-4" /> },
              { label: 'Best Deal', value: `$${entries[0]?.finalPrice?.toLocaleString() || 0}`, color: 'var(--color-neon-green)', icon: <Trophy className="w-4 h-4" /> },
              { label: 'Avg Savings', value: `${Math.round(entries.reduce((a, e) => a + ((e.listingPrice - e.finalPrice) / e.listingPrice * 100), 0) / entries.length)}%`, color: 'var(--color-victor)', icon: <Crown className="w-4 h-4" /> },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-3 sm:p-4 flex items-center gap-3"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                <div style={{ color: s.color }}>{s.icon}</div>
                <div>
                  <p className="section-label">{s.label}</p>
                  <p className="font-mono font-bold text-sm sm:text-base" style={{ color: s.color }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="p-4 rounded-2xl text-sm font-mono"
            style={{ background: 'rgba(255,68,102,0.08)', border: '1px solid rgba(255,68,102,0.25)', color: '#ff4466' }}>
            {error}
          </div>
        )}

        {/* ── Table ── */}
        <div className="space-y-2">
          <LeaderboardTable
            entries={entries}
            loading={loading}
            error={null}
            currentPlayer={state.playerName}
          />
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
