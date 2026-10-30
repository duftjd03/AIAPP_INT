import { useState, useEffect } from 'react'
import { quizData } from '../data/quizData'

export default function QuizScreen({ category, gameMode, totalQuestions, onComplete, initialStreak, onStreakUpdate }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(initialStreak || 0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(15)
  const [showHint, setShowHint] = useState(false)
  const [scoreBreakdown, setScoreBreakdown] = useState(null)
  const [questions, setQuestions] = useState([])

  const difficultyPoints = {
    easy: 100,
    normal: 200,
    hard: 300,
  }

  // 게임 모드별 설정
  const isSpeedrun = gameMode === 'speedrun'
  const isMarathon = gameMode === 'marathon'
  const TOTAL_TIME = isSpeedrun ? 7.5 : 15
  const HINT_THRESHOLD = TOTAL_TIME / 3
  const SPEEDRUN_MULTIPLIER = 1.5

  // 마라톤 모드: 4개 카테고리에서 총 20문제 가져오기
  const getMarathonQuestions = () => {
    const categories = ['korean-history', 'science', 'geography', 'general']
    const allQuestions = []

    // 각 카테고리에서 5문제씩 가져오기
    categories.forEach(cat => {
      const categoryQuestions = quizData[cat] || []
      allQuestions.push(...categoryQuestions.slice(0, 5))
    })

    // 섞기
    return allQuestions.sort(() => Math.random() - 0.5)
  }

  // 문제 초기화
  useEffect(() => {
    let questionsToUse = []

    if (isMarathon) {
      questionsToUse = getMarathonQuestions()
    } else {
      questionsToUse = quizData[category] || []
    }

    setQuestions(questionsToUse)
    setIsLoading(false)
  }, [category, isMarathon])

  const getStreakMultiplier = (currentStreak) => {
    if (currentStreak === 0) return 1.0
    if (currentStreak === 1) return 1.2
    if (currentStreak === 2) return 1.5
    return 2.0
  }

  useEffect(() => {
    if (answered || isLoading || questions.length === 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 0.1

        if (newTime <= HINT_THRESHOLD && newTime > 0) {
          setShowHint(true)
        }

        if (newTime <= 0) {
          clearInterval(timer)
          handleTimeOut()
          return 0
        }

        return newTime
      })
    }, 100)

    return () => clearInterval(timer)
  }, [answered, currentQuestion, isLoading, questions.length])

  useEffect(() => {
    if (!answered) {
      setTimeLeft(TOTAL_TIME)
      setShowHint(false)
    }
  }, [currentQuestion, answered, TOTAL_TIME])

  if (isLoading || questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">로딩 중...</div>
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleTimeOut = () => {
    setSelectedAnswer(null)
    setAnswered(true)
    setScoreBreakdown(null)
    updateStreak(false)
  }

  const calculateScore = (isCorrect, timeRemaining) => {
    const basePoints = difficultyPoints[question.difficulty] || 200
    const timeBonus = Math.max(0, timeRemaining * (basePoints * 0.1))
    const subtotal = basePoints + timeBonus
    let multiplier = getStreakMultiplier(streak)
    let finalScore = Math.round(subtotal * multiplier)

    // 스피드런 모드에서 최종 점수에 1.5배 추가 보너스
    if (isSpeedrun) {
      finalScore = Math.round(finalScore * SPEEDRUN_MULTIPLIER)
    }

    return {
      basePoints,
      timeBonus: Math.round(timeBonus),
      subtotal: Math.round(subtotal),
      multiplier,
      finalScore,
      speedrunBonus: isSpeedrun,
    }
  }

  const updateStreak = (isCorrect) => {
    if (isCorrect) {
      const newStreak = streak + 1
      setStreak(newStreak)
      onStreakUpdate(newStreak)
    } else {
      setStreak(0)
      onStreakUpdate(0)
    }
  }

  const handleSelectAnswer = (index) => {
    if (!answered) {
      const isCorrect = index === question.answer
      setSelectedAnswer(index)
      setAnswered(true)

      if (isCorrect) {
        const breakdown = calculateScore(true, timeLeft)
        setTotalScore((prev) => prev + breakdown.finalScore)
        setCorrectCount((prev) => prev + 1)
        setScoreBreakdown(breakdown)
        updateStreak(true)
      } else {
        setScoreBreakdown(null)
        updateStreak(false)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      onComplete(totalScore, streak, correctCount)
    }
  }

  const isCorrect = selectedAnswer === question.answer
  const timePercentage = (timeLeft / TOTAL_TIME) * 100
  const isWarning = timeLeft <= HINT_THRESHOLD

  const getDifficultyLabel = (difficulty) => {
    const labels = { easy: '하', normal: '중', hard: '상' }
    return labels[difficulty] || '중'
  }

  const getModeLabel = () => {
    if (isMarathon) return '종합 마라톤 모드'
    if (isSpeedrun) return '타임어택 스피드 모드'
    return '카테고리 집중 모드'
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 md:py-10">
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="text-sm text-indigo-600 font-semibold mb-1">
            {isMarathon ? '🏃' : isSpeedrun ? '⚡' : '🎯'} {getModeLabel()}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 퀴즈 풀기</h1>
          <div className="flex justify-between items-center text-gray-600">
            <p>
              문제 <span className="font-bold text-indigo-600">{currentQuestion + 1}</span> / {totalQuestions}
            </p>
            <p className="text-lg font-bold text-indigo-600">
              총점: <span className="text-2xl">{totalScore}</span>점
            </p>
          </div>
        </div>

        {/* 타이머 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-semibold ${isSpeedrun ? 'text-red-600' : 'text-gray-600'}`}>
              {isSpeedrun ? '⚡ 제한시간 (스피드 모드)' : '⏱️ 제한시간'}
            </span>
            <span className={`font-bold text-lg ${isWarning ? 'text-red-600' : isSpeedrun ? 'text-red-500' : 'text-indigo-600'}`}>
              {timeLeft.toFixed(1)}초
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-100 ${
                isWarning ? 'bg-red-500' : isSpeedrun ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-indigo-500 to-blue-500'
              }`}
              style={{ width: `${timePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 스트릭 표시 */}
        {streak > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="font-bold text-yellow-800">
              🔥 연속 정답 스트릭: {streak}연속! ({Math.round(getStreakMultiplier(streak) * 100)}% 보너스)
            </p>
          </div>
        )}

        {/* 프로그레스 바 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>진행률</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 질문 영역 */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 flex-1 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* 보기 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={answered}
              className={`p-4 md:p-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                selectedAnswer === index
                  ? isCorrect
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-red-500 text-white shadow-lg scale-105'
                  : answered && index === question.answer
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-indigo-500 shadow-md'
              } ${answered && 'cursor-not-allowed'}`}
            >
              <div className="flex items-center justify-start">
                <span className="inline-block w-8 h-8 rounded-full border-2 border-current mr-3 flex items-center justify-center text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* 힌트 표시 */}
        {showHint && !answered && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6 animate-pulse">
            <p className="font-semibold text-gray-800 mb-1">💡 힌트</p>
            <p className="text-gray-700 text-sm md:text-base">
              {question.hint}
            </p>
          </div>
        )}

        {/* 답변 피드백 및 점수 내역 */}
        {answered && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg text-center font-semibold text-lg ${
              selectedAnswer !== null && isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {selectedAnswer === null
                ? '⏱️ 시간이 다 되었습니다!'
                : isCorrect
                ? '✓ 정답입니다! 🎉'
                : '✗ 오답입니다'}
            </div>

            {/* 정답일 때 점수 내역 */}
            {isCorrect && scoreBreakdown && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg space-y-2">
                <p className="font-bold text-gray-800">📊 점수 내역</p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>난이도 점수: <span className="font-semibold text-blue-600">+{scoreBreakdown.basePoints}점</span> ({getDifficultyLabel(question.difficulty)})</p>
                  <p>시간 보너스: <span className="font-semibold text-blue-600">+{scoreBreakdown.timeBonus}점</span> (남은 시간 {timeLeft.toFixed(1)}초)</p>
                  {streak > 0 && (
                    <p>연속 정답 보너스: <span className="font-semibold text-blue-600">{streak}연속!</span> (×{scoreBreakdown.multiplier} 배율 적용)</p>
                  )}
                  {isSpeedrun && (
                    <p>⚡ 스피드 모드 보너스: <span className="font-semibold text-red-600">×{SPEEDRUN_MULTIPLIER}배 적용</span></p>
                  )}
                  <div className="border-t border-blue-300 pt-1 mt-2 font-bold text-lg text-blue-700">
                    이번 문제 획득 점수: {scoreBreakdown.finalScore}점
                  </div>
                </div>
              </div>
            )}

            {/* 해설 영역 */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">💡 해설</p>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {question.explanation}
              </p>
            </div>

            {/* 정답 표시 (오답일 경우) */}
            {selectedAnswer !== question.answer && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-1">✓ 정답</p>
                <p className="text-gray-700 text-sm md:text-base">
                  {String.fromCharCode(65 + question.answer)}. {question.options[question.answer]}
                </p>
              </div>
            )}

            <button
              onClick={handleNextQuestion}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 md:py-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {currentQuestion === totalQuestions - 1 ? '결과 보기' : '다음 문제'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
