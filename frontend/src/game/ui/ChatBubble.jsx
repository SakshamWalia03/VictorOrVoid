import React from 'react'
import VictorAvatar from './VictorAvatar'
import { DollarSign, TrendingDown } from 'lucide-react'

const fmt = (ts) => {
  const d = ts instanceof Date ? ts : new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const ChatBubble = ({ message, playerName }) => {
  const isVictor = message.from === 'victor'

  return (
    <div className={`flex gap-2 sm:gap-3 ${isVictor ? 'justify-start' : 'justify-end'}`}
      style={{ animation: 'slideUp 0.3s ease-out' }}>
      {isVictor && <VictorAvatar size="sm" className="mt-1 flex-shrink-0" />}

      <div className={`flex flex-col gap-1 ${isVictor ? 'items-start' : 'items-end'}`}
        style={{ maxWidth: 'min(82%, 420px)' }}>
        <span className="section-label px-1">{isVictor ? 'VICTOR' : (playerName || 'YOU')}</span>

        <div className={isVictor ? 'bubble-victor' : 'bubble-player'}>
          {/* Player offer display */}
          {!isVictor && message.offer != null && (
            <div className="mb-2.5">
              <span className="offer-badge offer-badge-player">
                <DollarSign className="w-3.5 h-3.5" />
                Offer: ${Number(message.offer).toLocaleString()}
              </span>
            </div>
          )}
          {/* Victor counter display */}
          {isVictor && message.counter != null && (
            <div className="mb-2.5">
              <span className="offer-badge offer-badge-victor">
                <TrendingDown className="w-3.5 h-3.5" />
                Counter: ${Number(message.counter).toLocaleString()}
              </span>
            </div>
          )}
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
            {message.text}
          </p>
        </div>

        <span className="text-[10px] px-1 font-mono" style={{ color: 'var(--color-text-muted)' }}>
          {fmt(message.timestamp)}
        </span>
      </div>

      {!isVictor && (
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 font-display text-base sm:text-lg"
          style={{
            background: 'linear-gradient(135deg,#1a1a3e,#6363ed)',
            border: '2px solid rgba(99,99,237,0.6)',
            boxShadow: '0 0 18px rgba(99,99,237,0.35)',
            color: 'white',
          }}
        >
          {(playerName || 'Y')[0].toUpperCase()}
        </div>
      )}
    </div>
  )
}

export default ChatBubble
