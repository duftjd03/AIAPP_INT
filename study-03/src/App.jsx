import { useState } from 'react'
import MainScreen from './components/MainScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import { saveScore } from './utils/leaderboard'

function App() {
  const [gameState, setGameState] = useState('main') // main, quiz, result
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [gameMode, setGameMode] = useState(null) // category, marathon, speedrun
  const [totalScore, setTotalScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(10)

  const handleStartGame = (category, mode) => {
    setSelectedCategory(category)
    setGameMode(mode)
    setGameState('quiz')
    setTotalScore(0)
    setStreak(0)
    // 모드에 따라 총 문제 수 설정
    if (mode === 'marathon') {
      setTotalQuestions(20)
    } else {
      setTotalQuestions(10)
    }
  }

  const handleQuizComplete = (finalScore, streak, correctCount) => {
    setTotalScore(finalScore)
    setCorrectCount(correctCount)
    // 로컬스토리지에 점수 저장
    saveScore(selectedCategory, finalScore, totalQuestions, correctCount)
    setGameState('result')
  }

  const handleReturnToMain = () => {
    setGameState('main')
    setSelectedCategory(null)
    setTotalScore(0)
    setStreak(0)
  }

  const handleRetry = () => {
    setGameState('quiz')
    setTotalScore(0)
    setStreak(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {gameState === 'main' && (
        <MainScreen onStartGame={handleStartGame} />
      )}
      {gameState === 'quiz' && (
        <QuizScreen
          category={selectedCategory}
          gameMode={gameMode}
          totalQuestions={totalQuestions}
          onComplete={handleQuizComplete}
          initialStreak={streak}
          onStreakUpdate={setStreak}
        />
      )}
      {gameState === 'result' && (
        <ResultScreen
          category={selectedCategory}
          score={totalScore}
          correctCount={correctCount}
          totalQuestions={totalQuestions}
          onReturnToMain={handleReturnToMain}
          onRetry={handleRetry}
        />
      )}
    </div>
  )
}

export default App
