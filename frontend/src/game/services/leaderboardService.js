import api from './api.js'

/**
 * Get full leaderboard (top 20)
 * GET /api/leaderboard
 */
export const getLeaderboard = async () => {
  return api.get('/leaderboard')
}

/**
 * Get top N entries
 * GET /api/leaderboard/top/:n
 */
export const getTopN = async (n = 10) => {
  return api.get(`/leaderboard/top/${n}`)
}

/**
 * Get player rank by name
 * GET /api/leaderboard/rank/:playerName
 */
export const getPlayerRank = async (playerName) => {
  return api.get(`/leaderboard/rank/${encodeURIComponent(playerName)}`)
}
