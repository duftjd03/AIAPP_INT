import { useState } from 'react'
import Leaderboard from './Leaderboard'
import { getTopScores } from '../utils/leaderboard'

const categories = [
  { id: 'korean-history', name: '한국사', emoji: '📜', color: 'from-red-400 to-red-600' },
  { id: 'science', name: '과학', emoji: '🔬', color: 'from-green-400 to-green-600' },
  { id: 'geography', name: '지리', emoji: '🌍', color: 'from-blue-400 to-blue-600' },
  { id: 'general', name: '일반상식', emoji: '💡', color: 'from-yellow-400 to-yellow-600' },
]

export default function MainScreen({ onStartGame }) {
  const [gameMode, setGameMode] = useState(null) // null, 'category', 'marathon', 'speedrun'
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const topScores = getTopScores(5)

  const handleModeSelect = (mode) => {
    if (mode === 'marathon') {
      // 종합 마라톤 모드는 카테고리 선택 없이 바로 시작
      onStartGame(null, mode)
    } else {
      // 카테고리 집중 모드와 스피드 모드는 카테고리 선택 필요
      setGameMode(mode)
    }
  }

  const handleCategorySelect = (categoryId) => {
    onStartGame(categoryId, gameMode)
  }

  const handleBackToModeSelect = () => {
    setGameMode(null)
  }

  // 모드 선택 화면
  if (gameMode === null && !showLeaderboard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🧠 상식 퀴즈 게임
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            플레이하실 게임 모드를 선택해 주세요!
          </p>
        </div>

        {/* 게임 모드 선택 */}
        <div className="w-full max-w-2xl space-y-4 mb-8">
          {/* 모드 1: 카테고리 집중 모드 */}
          <button
            onClick={() => handleModeSelect('category')}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white font-bold text-left shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-2xl mb-2">🎯 [1] 카테고리 집중 모드</div>
                <p className="text-sm opacity-90">원하는 종목 1개 집중 · 총 10문제</p>
                <p className="text-xs opacity-80 mt-1">제한시간: 15초/문제</p>
              </div>
              <div className="text-4xl group-hover:scale-110 transition-transform">📚</div>
            </div>
          </button>

          {/* 모드 2: 종합 마라톤 모드 */}
          <button
            onClick={() => handleModeSelect('marathon')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white font-bold text-left shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-2xl mb-2">🏃 [2] 종합 마라톤 모드</div>
                <p className="text-sm opacity-90">전체 종목 믹스 · 총 20문제</p>
                <p className="text-xs opacity-80 mt-1">제한시간: 15초/문제 · 균형 잡힌 도전</p>
              </div>
              <div className="text-4xl group-hover:scale-110 transition-transform">🏆</div>
            </div>
          </button>

          {/* 모드 3: 타임어택 스피드 모드 */}
          <button
            onClick={() => handleModeSelect('speedrun')}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 text-white font-bold text-left shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-2xl mb-2">⚡ [3] 타임어택 스피드 모드</div>
                <p className="text-sm opacity-90">초단기 제한시간 + 고득점 보너스 · 총 10문제</p>
                <p className="text-xs opacity-80 mt-1">제한시간: 7.5초/문제 · 점수 ×1.5배</p>
              </div>
              <div className="text-4xl group-hover:scale-110 transition-transform">🔥</div>
            </div>
          </button>
        </div>

        {/* 탭 버튼 */}
        <div className="max-w-2xl w-full flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setShowLeaderboard(false)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              !showLeaderboard
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            📋 게임 규칙
          </button>
          <button
            onClick={() => setShowLeaderboard(true)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              showLeaderboard
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            🏆 랭킹 ({topScores.length})
          </button>
        </div>

        {/* 하단 설명 또는 랭킹 */}
        {!showLeaderboard ? (
          <div className="max-w-lg bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-3 text-gray-800">📋 게임 규칙</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start"><span className="mr-2">•</span> <span>모드를 선택한 후 게임을 시작합니다</span></li>
              <li className="flex items-start"><span className="mr-2">•</span> <span>각 문제마다 제한시간 내에 답변해야 합니다</span></li>
              <li className="flex items-start"><span className="mr-2">•</span> <span>난이도별 점수 + 시간 보너스가 지급됩니다</span></li>
              <li className="flex items-start"><span className="mr-2">•</span> <span>연속 정답 시 스트릭 보너스를 받습니다</span></li>
              <li className="flex items-start"><span className="mr-2">•</span> <span>모든 점수는 자동으로 기록됩니다</span></li>
            </ul>
          </div>
        ) : (
          <div className="max-w-2xl w-full">
            <Leaderboard />
          </div>
        )}
      </div>
    )
  }

  // 카테고리 선택 화면 (집중 모드 또는 스피드 모드)
  if ((gameMode === 'category' || gameMode === 'speedrun') && !showLeaderboard) {
    const modeTitle = gameMode === 'category' ? '카테고리 집중 모드' : '타임어택 스피드 모드'
    const modeDescription = gameMode === 'category'
      ? '집중할 종목을 선택해주세요 (총 10문제)'
      : '도전할 종목을 선택해주세요 (총 10문제, 제한시간 7.5초, 점수 ×1.5배)'

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <button
            onClick={handleBackToModeSelect}
            className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            ← 모드 선택으로 돌아가기
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            {gameMode === 'category' ? '🎯' : '⚡'} {modeTitle}
          </h1>
          <p className="text-lg text-gray-600">
            {modeDescription}
          </p>
        </div>

        {/* 카테고리 그리드 */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-white font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {category.emoji}
              </div>
              <div className="text-2xl">{category.name}</div>
              <div className="text-sm mt-2 opacity-80">클릭하여 선택</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // 랭킹 화면
  if (showLeaderboard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center mb-8">
          <button
            onClick={() => setShowLeaderboard(false)}
            className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            ← 메인으로 돌아가기
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🏆 랭킹
          </h1>
        </div>
        <div className="max-w-4xl w-full">
          <Leaderboard />
        </div>
      </div>
    )
  }
}
