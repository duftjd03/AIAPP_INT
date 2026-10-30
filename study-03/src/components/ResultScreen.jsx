import { getTopScores, getCategoryName } from '../utils/leaderboard'

const getGrade = (score, total) => {
  const percentage = (score / total) * 100
  if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bgColor: 'bg-green-100' }
  if (percentage >= 80) return { grade: 'A', color: 'text-green-500', bgColor: 'bg-green-50' }
  if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bgColor: 'bg-blue-100' }
  if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
  return { grade: 'F', color: 'text-red-600', bgColor: 'bg-red-100' }
}

const getMessage = (percentage) => {
  if (percentage >= 90) return '완벽합니다! 당신은 진정한 상식 박사입니다! 🌟'
  if (percentage >= 80) return '아주 잘했습니다! 당신의 지식을 자랑해도 좋습니다! 👏'
  if (percentage >= 70) return '잘했습니다! 조금 더 열심히 하면 더 좋아질 거예요! 💪'
  if (percentage >= 60) return '괜찮은 결과입니다! 계속 학습해보세요! 📚'
  return '다시 한 번 도전해보세요! 당신은 할 수 있습니다! 🚀'
}

export default function ResultScreen({ category, score, correctCount, totalQuestions, onReturnToMain, onRetry }) {
  const percentage = (correctCount / totalQuestions) * 100
  const gradeInfo = getGrade(correctCount, totalQuestions)
  const message = getMessage(percentage)
  const topScores = getTopScores(5)
  const incorrectCount = totalQuestions - correctCount

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🎉 게임 완료!
          </h1>
          <p className="text-lg text-gray-600">
            {getCategoryName(category)} 퀴즈 결과입니다
          </p>
        </div>

        {/* 점수 카드 */}
        <div className={`${gradeInfo.bgColor} rounded-2xl p-8 md:p-12 text-center mb-8 shadow-xl`}>
          {/* 등급 */}
          <div className={`text-7xl font-bold ${gradeInfo.color} mb-4`}>
            {gradeInfo.grade}
          </div>

          {/* 점수 표시 */}
          <div className="mb-6">
            <p className="text-gray-600 text-lg mb-2">정답한 문제</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-bold text-green-600">{correctCount}</span>
              <span className="text-3xl text-gray-400">/ {totalQuestions}</span>
            </div>
            <p className="text-2xl font-bold text-gray-700 mt-2">{percentage.toFixed(1)}%</p>
            <p className="text-lg text-gray-600 mt-4">획득 포인트</p>
            <p className="text-4xl font-bold text-indigo-600">{score.toLocaleString()}</p>
          </div>

          {/* 메시지 */}
          <p className="text-xl text-gray-800 font-semibold">
            {message}
          </p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <p className="text-gray-600 text-sm">정답</p>
            <p className="text-3xl font-bold text-green-600">{correctCount}문제</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <p className="text-gray-600 text-sm">오답</p>
            <p className="text-3xl font-bold text-red-600">{incorrectCount}문제</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center col-span-2 md:col-span-1">
            <p className="text-gray-600 text-sm">정답률</p>
            <p className="text-3xl font-bold text-blue-600">{percentage.toFixed(0)}%</p>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            🔄 같은 카테고리 다시 풀기
          </button>
          <button
            onClick={onReturnToMain}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            📋 다른 카테고리 선택하기
          </button>
          <button
            onClick={onReturnToMain}
            className="w-full bg-white text-gray-700 font-bold py-4 rounded-lg border-2 border-gray-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            🏠 메인 화면으로
          </button>
        </div>

        {/* 팁 */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center mb-8">
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> 부족한 부분을 보충하고 다시 도전해보세요!
          </p>
        </div>

        {/* 랭킹 표시 */}
        {topScores.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">🏆 최근 랭킹</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-2 text-gray-600">순위</th>
                    <th className="text-left py-2 px-2 text-gray-600">카테고리</th>
                    <th className="text-center py-2 px-2 text-gray-600">점수</th>
                    <th className="text-center py-2 px-2 text-gray-600">정답률</th>
                  </tr>
                </thead>
                <tbody>
                  {topScores.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className={`border-b border-gray-100 ${
                        entry.id === String(new Date(entry.date).getTime()) ? 'bg-yellow-50' : ''
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <td className="py-3 px-2">
                        <span
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-white text-xs"
                          style={{
                            backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#6366F1'
                          }}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-medium text-gray-800 text-xs md:text-sm">
                        {getCategoryName(entry.category)}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-indigo-600">
                        {entry.correctCount || 0}/{entry.totalQuestions} (P:{entry.score})
                      </td>
                      <td className="py-3 px-2 text-center text-gray-700">
                        {entry.percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
