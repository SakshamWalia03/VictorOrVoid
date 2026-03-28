import React from 'react'

const VictorAvatar = ({ size = 'md', typing = false, className = '' }) => {
  const sizes = {
    sm: { wrap: 'w-9 h-9', text: 'text-base', dot: 'w-2.5 h-2.5' },
    md: { wrap: 'w-14 h-14', text: 'text-2xl', dot: 'w-3 h-3' },
    lg: { wrap: 'w-20 h-20', text: 'text-4xl', dot: 'w-3.5 h-3.5' },
    xl: { wrap: 'w-28 h-28', text: 'text-5xl', dot: 'w-4 h-4' },
  }
  const s = sizes[size] || sizes.md

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {/* Typing pulse ring */}
      {typing && (
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-35"
          style={{ background: 'radial-gradient(circle,rgba(255,117,32,0.7),transparent)', animationDuration: '1.4s' }}
        />
      )}

      {/* Static outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(255,117,32,0.22) 0%,transparent 70%)' }}
      />

      {/* Avatar circle */}
      <div
        className={`relative ${s.wrap} rounded-full flex items-center justify-center font-display select-none`}
        style={{
          background: 'linear-gradient(135deg,#1a0500,#4d1a00)',
          border: `2px solid rgba(255,117,32,${typing ? 1 : 0.65})`,
          boxShadow: typing
            ? '0 0 35px rgba(255,117,32,0.9), 0 0 70px rgba(255,45,111,0.4), inset 0 0 20px rgba(255,117,32,0.12)'
            : '0 0 22px rgba(255,117,32,0.45), inset 0 0 10px rgba(255,117,32,0.06)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <span role="img" aria-label="Victor" className={`relative z-10 ${s.text}`}>🎭</span>
        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle at 38% 28%,rgba(255,117,32,0.9),transparent 58%)' }}
        />
      </div>

      {/* Status dot */}
      <div
        className={`absolute bottom-0 right-0 ${s.dot} rounded-full`}
        style={{
          background: typing
            ? 'linear-gradient(135deg,#ff7520,#ff2d6f)'
            : '#4ade80',
          border: '2px solid var(--color-surface)',
          boxShadow: typing ? '0 0 10px rgba(255,117,32,0.9)' : '0 0 8px rgba(74,222,128,0.6)',
          animation: typing ? 'pulse 1s ease-in-out infinite' : 'none',
        }}
      />
    </div>
  )
}

export default VictorAvatar
