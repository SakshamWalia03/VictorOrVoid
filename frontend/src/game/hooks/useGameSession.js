import { useState, useCallback } from 'react'
import { useGame } from '../../context/GameContext'
import { startGame, negotiate } from '../services/gameService'

export const useGameSession = () => {
  const { state, dispatch } = useGame()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [victorTyping, setVictorTyping] = useState(false)

  const handleStartGame = useCallback(async (playerName) => {
    setLoading(true)
    setError(null)
    try {
      dispatch({ type: 'SET_PLAYER', payload: playerName })
      const data = await startGame(playerName)
      dispatch({ type: 'GAME_STARTED', payload: data })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  const handleNegotiate = useCallback(async ({ offer, message }) => {
    if (!state.sessionId) return
    if (state.round >= state.maxRounds) return

    setError(null)

    // Add player message immediately
    const offerNum = offer ? Number(offer) : null
    const displayText = message || (offerNum ? `My offer: $${offerNum.toLocaleString()}` : '')
    dispatch({
      type: 'ADD_PLAYER_MESSAGE',
      payload: { text: displayText, offer: offerNum },
    })

    // Victor is typing...
    setVictorTyping(true)

    try {
      const data = await negotiate({
        sessionId: state.sessionId,
        offer: offerNum,
        message,
      })

      // Small delay for UX
      await new Promise(r => setTimeout(r, 600))

      dispatch({ type: 'VICTOR_RESPONDED', payload: data })
    } catch (err) {
      setError(err.message)
    } finally {
      setVictorTyping(false)
    }
  }, [state.sessionId, state.round, state.maxRounds, dispatch])

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' })
    setError(null)
    setVictorTyping(false)
  }, [dispatch])

  return {
    state,
    loading,
    error,
    victorTyping,
    handleStartGame,
    handleNegotiate,
    handleReset,
  }
}
