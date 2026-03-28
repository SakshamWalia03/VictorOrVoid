import { useState, useEffect, useCallback } from 'react'
import { getLeaderboard, getPlayerRank } from '../services/leaderboardService'

export const useLeaderboard = (autoFetch = false) => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [playerRank, setPlayerRank] = useState(null)

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getLeaderboard()
      setEntries(data.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchPlayerRank = useCallback(async (playerName) => {
    if (!playerName) return
    try {
      const data = await getPlayerRank(playerName)
      setPlayerRank(data.data)
    } catch {
      setPlayerRank(null)
    }
  }, [])

  useEffect(() => {
    if (autoFetch) fetchLeaderboard()
  }, [autoFetch, fetchLeaderboard])

  return {
    entries,
    loading,
    error,
    playerRank,
    fetchLeaderboard,
    fetchPlayerRank,
  }
}
