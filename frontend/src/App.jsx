import React, { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { GameProvider } from './context/GameContext'
import Navbar from './components/Navbar'
import LandingPage from './game/ui/LandingPage'
import GameScreen from './game/ui/GameScreen'
import ResultScreen from './game/ui/ResultScreen'
import LeaderboardPage from './game/ui/LeaderboardPage'
import { useGameSession } from './game/hooks/useGameSession'

const AppInner = () => {
  const {
    state, loading, error, victorTyping,
    handleStartGame, handleNegotiate, handleReset,
  } = useGameSession()

  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const goHome = () => {
    handleReset()
    setShowLeaderboard(false)
  }

  const renderContent = () => {
    if (showLeaderboard) return <LeaderboardPage onBack={() => setShowLeaderboard(false)} />

    switch (state.phase) {
      case 'landing': return <LandingPage onStart={handleStartGame} loading={loading} />
      case 'game':    return <GameScreen state={state} victorTyping={victorTyping} error={error} onNegotiate={handleNegotiate} />
      case 'result':  return <ResultScreen state={state} onPlayAgain={goHome} />
      default:        return null
    }
  }

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* CRT scanline overlay */}
      <div className="scanline-overlay" />

      {/* Persistent ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ background: '#ff7520' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ background: '#6363ed' }}
        />
      </div>

      <Navbar onLeaderboard={() => setShowLeaderboard(true)} onHome={goHome} />
      <main className="relative z-10">{renderContent()}</main>
    </div>
  )
}

const App = () => (
  <ThemeProvider>
    <GameProvider>
      <AppInner />
    </GameProvider>
  </ThemeProvider>
)

export default App
