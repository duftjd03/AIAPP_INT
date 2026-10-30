const LEADERBOARD_KEY = 'quizLeaderboard'

export const saveScore = (category, pointScore, totalQuestions, correctCount = null) => {
  try {
    const leaderboard = getLeaderboard()
    // correctCount가 없으면 이전 호환성을 위해 pointScore/totalQuestions로 계산
    const actualCorrectCount = correctCount !== null ? correctCount : Math.round((pointScore / totalQuestions) * 100 / 10)

    const newScore = {
      id: Date.now().toString(),
      category,
      score: pointScore,
      totalQuestions,
      correctCount: actualCorrectCount,
      percentage: Math.round((actualCorrectCount / totalQuestions) * 100),
      date: new Date().toLocaleDateString('ko-KR'),
      time: new Date().toLocaleTimeString('ko-KR'),
    }
    leaderboard.push(newScore)
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard))
    return newScore
  } catch (error) {
    console.error('Failed to save score:', error)
    return null
  }
}

export const getLeaderboard = () => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to get leaderboard:', error)
    return []
  }
}

export const getLeaderboardByCategory = (category) => {
  try {
    const leaderboard = getLeaderboard()
    return leaderboard
      .filter((entry) => entry.category === category)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  } catch (error) {
    console.error('Failed to get category leaderboard:', error)
    return []
  }
}

export const getTopScores = (limit = 5) => {
  try {
    const leaderboard = getLeaderboard()
    return leaderboard.sort((a, b) => b.score - a.score).slice(0, limit)
  } catch (error) {
    console.error('Failed to get top scores:', error)
    return []
  }
}

export const clearLeaderboard = () => {
  try {
    localStorage.removeItem(LEADERBOARD_KEY)
  } catch (error) {
    console.error('Failed to clear leaderboard:', error)
  }
}

export const getCategoryName = (categoryId) => {
  const names = {
    'korean-history': '한국사',
    'science': '과학',
    'geography': '지리',
    'general': '일반상식',
  }
  return names[categoryId] || '퀴즈'
}
