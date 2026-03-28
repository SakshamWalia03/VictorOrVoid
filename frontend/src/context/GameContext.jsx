import React, { createContext, useContext, useReducer } from 'react'

const GameContext = createContext()

const initialState = {
  sessionId: null,
  playerName: '',
  product: null,
  messages: [],
  round: 0,
  maxRounds: 8,
  currentAsk: 0,
  outcome: null,   // 'deal' | 'walkaway' | null
  dealPrice: null,
  score: null,
  phase: 'landing', // 'landing' | 'game' | 'result'
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, playerName: action.payload }

    case 'GAME_STARTED':
      return {
        ...state,
        sessionId: action.payload.sessionId,
        product: action.payload.product,
        currentAsk: action.payload.currentAsk,
        round: action.payload.round,
        messages: [
          {
            id: Date.now(),
            from: 'victor',
            text: action.payload.victorMessage,
            timestamp: new Date(),
          },
        ],
        phase: 'game',
        outcome: null,
        dealPrice: null,
      }

    case 'ADD_PLAYER_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: Date.now(),
            from: 'player',
            text: action.payload.text,
            offer: action.payload.offer,
            timestamp: new Date(),
          },
        ],
      }

    case 'VICTOR_RESPONDED':
      return {
        ...state,
        round: action.payload.round,
        currentAsk: action.payload.currentAsk ?? state.currentAsk,
        messages: [
          ...state.messages,
          {
            id: Date.now() + 1,
            from: 'victor',
            text: action.payload.victorMessage,
            counter: action.payload.counter,
            timestamp: new Date(),
          },
        ],
        outcome: action.payload.outcome !== 'continue' ? action.payload.outcome : null,
        dealPrice: action.payload.dealPrice ?? null,
        phase: action.payload.outcome !== 'continue' ? 'result' : 'game',
      }

    case 'RESET':
      return { ...initialState, playerName: state.playerName }

    default:
      return state
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
