import { getTopScores, getCategoryName } from '../utils/leaderboard'

export default function Leaderboard() {
  const topScores = getTopScores(10)

  if (topScores.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800">🏆 랭킹</h3>
        <p className="text-gray-500 text-center py-4">아직 기록이 없습니다</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="font-bold text-lg mb-4 text-gray-800">🏆 랭킹 TOP 10</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2 px-2 text-gray-600">순위</th>
              <th className="text-left py-2 px-2 text-gray-600">카테고리</th>
              <th className="text-center py-2 px-2 text-gray-600">점수</th>
              <th className="text-center py-2 px-2 text-gray-600">정답률</th>
              <th className="text-right py-2 px-2 text-gray-600">날짜</th>
            </tr>
          </thead>
          <tbody>
            {topScores.map((score, index) => (
              <tr key={score.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-white"
                    style={{
                      backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#6366F1'
                    }}>
                    {index + 1}
                  </span>
                </td>
                <td className="py-3 px-2 font-medium text-gray-800">{getCategoryName(score.category)}</td>
                <td className="py-3 px-2 text-center font-bold text-indigo-600">{score.score}/{score.totalQuestions}</td>
                <td className="py-3 px-2 text-center text-gray-700">{score.percentage}%</td>
                <td className="py-3 px-2 text-right text-gray-500 text-xs">{score.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
