import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #3e3ec7, #6363ed)'
          : 'linear-gradient(135deg, #ff7520, #ff9547)',
        boxShadow: isDark
          ? '0 0 12px rgba(99,99,237,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 0 12px rgba(255,117,32,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
    >
      <span
        className="absolute top-1 w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
        style={{
          transform: isDark ? 'translateX(30px)' : 'translateX(4px)',
          background: isDark ? '#c4c4fc' : '#fff8f0',
        }}
      >
        {isDark
          ? <Moon className="w-3 h-3" style={{ color: '#3e3ec7' }} />
          : <Sun className="w-3 h-3" style={{ color: '#ff7520' }} />
        }
      </span>
    </button>
  )
}

export default ThemeToggle
