import React from 'react'
import VictorAvatar from './VictorAvatar'

const TypingIndicator = () => (
  <div className="flex gap-2 sm:gap-3 justify-start items-end" style={{ animation: 'slideUp 0.3s ease-out' }}>
    <VictorAvatar size="sm" typing className="mt-1 flex-shrink-0" />
    <div className="flex flex-col gap-1 items-start">
      <span className="section-label px-1">VICTOR</span>
      <div
        className="bubble-victor flex items-center gap-1.5 py-3.5 px-5"
        style={{ minWidth: '72px' }}
      >
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  </div>
)

export default TypingIndicator
