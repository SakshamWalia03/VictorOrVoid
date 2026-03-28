import React from 'react'
import { AlertTriangle, Flame } from 'lucide-react'

const RoundProgress = ({ current, max }) => {
  const remaining = max - current
  const urgency = remaining <= 2
  const pct = Math.round((current / max) * 100)

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="section-label">ROUNDS REMAINING</span>
        <span
          className={`font-mono text-sm font-bold flex items-center gap-1 ${urgency ? 'animate-pulse' : ''}`}
          style={{ color: urgency ? '#ff4466' : 'var(--color-text)' }}
        >
          {urgency && <Flame className="w-3.5 h-3.5" />}
          {remaining} left
        </span>
      </div>

      {/* Gradient progress bar */}
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: urgency
              ? 'linear-gradient(90deg, #ff4466, #ff0099)'
              : 'linear-gradient(90deg, #ff7520, #ff2d6f)',
            boxShadow: urgency
              ? '0 0 10px rgba(255,68,102,0.6)'
              : '0 0 10px rgba(255,117,32,0.5)',
          }}
        />
      </div>

      {/* Pip row */}
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-2 rounded-full transition-all duration-500"
            style={
              i < current
                ? {
                    background: urgency
                      ? 'linear-gradient(90deg,#ff4466,#ff0099)'
                      : 'linear-gradient(90deg,#ff7520,#ff2d6f)',
                    boxShadow: urgency ? '0 0 5px rgba(255,68,102,0.5)' : '0 0 5px rgba(255,117,32,0.4)',
                  }
                : { background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }
            }
          />
        ))}
      </div>

      {urgency && (
        <div className="flex items-center gap-1.5 p-2 rounded-lg"
          style={{ background: 'rgba(255,68,102,0.08)', border: '1px solid rgba(255,68,102,0.25)' }}>
          <AlertTriangle className="w-3 h-3 flex-shrink-0" style={{ color: '#ff4466' }} />
          <p className="text-xs font-mono animate-pulse" style={{ color: '#ff4466' }}>
            Final rounds — Victor may get desperate
          </p>
        </div>
      )}
    </div>
  )
}

export default RoundProgress
