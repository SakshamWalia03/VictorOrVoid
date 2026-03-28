import React, { useEffect, useRef, useState } from 'react'
import ChatBubble from './ChatBubble'
import TypingIndicator from './TypingIndicator'
import NegotiationInput from './NegotiationInput'
import ProductCard from './ProductCard'
import RoundProgress from './RoundProgress'
import VictorAvatar from './VictorAvatar'
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

const GameScreen = ({ state, victorTyping, error, onNegotiate }) => {
  const chatEndRef = useRef(null)
  const isFinished = state.phase === 'result' || state.outcome !== null
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.messages, victorTyping])

  const Sidebar = () => (
    <div className="space-y-3">
      {/* Victor header */}
      <div className="glass-card p-4 flex items-center gap-3">
        <VictorAvatar size="md" typing={victorTyping} />
        <div>
          <h2 className="font-display text-2xl leading-none" style={{ color: 'var(--color-victor)' }}>VICTOR</h2>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'Syne' }}>Cold &amp; calculating broker</p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${victorTyping ? 'animate-pulse' : ''}`}
              style={{ background: victorTyping ? 'var(--color-victor)' : '#4ade80' }} />
            <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
              {victorTyping ? 'thinking...' : 'online'}
            </span>
          </div>
        </div>
      </div>

      {/* Round progress */}
      <div className="glass-card p-4">
        <RoundProgress current={state.round} max={state.maxRounds} />
      </div>

      {/* Product */}
      <ProductCard product={state.product} currentAsk={state.currentAsk} />

      {/* Tips */}
      <div className="rounded-2xl p-4 space-y-2"
        style={{ background: 'rgba(99,99,237,0.06)', border: '1px solid rgba(99,99,237,0.18)' }}>
        <p className="section-label">NEGOTIATION TIPS</p>
        <ul className="space-y-1.5">
          {[
            'Make specific, confident offers',
            'Use urgency: "cash, today only"',
            'Cite market value as leverage',
            'Victor responds to strong arguments',
          ].map((tip, i) => (
            <li key={i} className="flex gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span style={{ color: 'var(--color-void)' }}>›</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-16 flex flex-col">

      {/* ── Mobile sidebar toggle ── */}
      <div className="lg:hidden px-3 py-2">
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <VictorAvatar size="sm" typing={victorTyping} />
            <div className="text-left min-w-0">
              <span className="font-display text-lg leading-none" style={{ color: 'var(--color-victor)' }}>VICTOR</span>
              <span className="block text-xs font-mono truncate" style={{ color: 'var(--color-text-muted)' }}>
                Round {state.round}/{state.maxRounds} · Ask: ${state.currentAsk?.toLocaleString()}
              </span>
            </div>
          </div>
          {sidebarOpen
            ? <ChevronUp className="w-4 h-4 flex-shrink-0 ml-2" style={{ color: 'var(--color-text-muted)' }} />
            : <ChevronDown className="w-4 h-4 flex-shrink-0 ml-2" style={{ color: 'var(--color-text-muted)' }} />}
        </button>

        {sidebarOpen && (
          <div className="mt-2 pb-2">
            <Sidebar />
          </div>
        )}
      </div>

      {/* ── Main layout ── */}
      <div className="flex-1 flex flex-col lg:flex-row gap-0 px-2 sm:px-4 pb-4">

        {/* ── Desktop sidebar ── */}
        <aside className="hidden lg:block w-80 xl:w-96 flex-shrink-0 p-4 space-y-3 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <Sidebar />
        </aside>

        {/* ── Chat area ── */}
        <main className="flex-1 flex flex-col p-2 sm:p-4 min-h-0 gap-3">

          {/* Chat messages */}
          <div
            className="flex-1 rounded-2xl p-3 sm:p-5 space-y-4 overflow-y-auto"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              minHeight: '280px',
              maxHeight: 'calc(100vh - 400px)',
            }}
          >
            {state.messages.map(msg => (
              <ChatBubble key={msg.id} message={msg} playerName={state.playerName} />
            ))}
            {victorTyping && <TypingIndicator />}
            <div ref={chatEndRef} />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(255,68,102,0.1)', border: '1px solid rgba(255,68,102,0.3)', color: '#ff4466' }}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Input */}
          {!isFinished && (
            <div
              className="rounded-2xl p-3 sm:p-4"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 -4px 20px rgba(99,99,237,0.06)',
              }}
            >
              <NegotiationInput onSubmit={onNegotiate} disabled={victorTyping} currentAsk={state.currentAsk} />
            </div>
          )}

          {isFinished && (
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="font-display text-xl" style={{ color: 'var(--color-text-muted)' }}>
                {state.outcome === 'deal'
                  ? '🎉 Negotiation complete — see your results!'
                  : '💀 Victor has walked away.'}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default GameScreen
