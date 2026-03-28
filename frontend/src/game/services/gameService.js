import api from './api.js'

/**
 * Start a new game session
 * POST /api/game/start
 */
export const startGame = async (playerName) => {
  return api.post('/game/start', { playerName })
}

/**
 * Send a negotiation move to Victor
 * POST /api/game/negotiate
 */
export const negotiate = async ({ sessionId, offer, message }) => {
  return api.post('/game/negotiate', {
    sessionId,
    offer: offer ? Number(offer) : null,
    message: message || '',
  })
}
