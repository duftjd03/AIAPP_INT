# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

상식 퀴즈 게임 - React와 Tailwind CSS를 사용한 대화형 퀴즈 애플리케이션입니다.
사용자가 4개의 카테고리(한국사, 과학, 지리, 일반상식) 중 선택하여 각 10개의 객관식 문제를 풀고, 최종 점수와 등급을 받습니다.

## Setup and Installation

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## Project Structure

```
study-03/
├── src/
│   ├── components/
│   │   ├── MainScreen.jsx      # 메인 화면 (카테고리 선택, 랭킹 탭)
│   │   ├── QuizScreen.jsx      # 퀴즈 문제 화면 (해설 표시)
│   │   ├── ResultScreen.jsx    # 결과 화면 (점수, 등급, 랭킹)
│   │   └── Leaderboard.jsx     # 랭킹 표시 컴포넌트
│   ├── data/
│   │   └── quizData.js         # 퀴즈 데이터 (40문제, 4개 카테고리)
│   ├── utils/
│   │   └── leaderboard.js      # 로컬스토리지 점수 관리 유틸리티
│   ├── App.jsx                  # 상태 관리 및 화면 라우팅
│   ├── main.jsx                 # React 앱 초기화
│   └── index.css                # Tailwind CSS 임포트
├── index.html                   # HTML 진입점
├── package.json                 # 의존성 정의
├── vite.config.js              # Vite 설정
├── tailwind.config.js           # Tailwind CSS 설정
└── postcss.config.js            # PostCSS 설정
```

## Architecture and Design Decisions

**상태 관리:**
- App.jsx에서 게임 상태(main/quiz/result), 선택된 카테고리, 점수를 관리합니다
- 각 컴포넌트는 필요한 상태와 콜백을 prop으로 받습니다

**화면 전환:**
- gameState를 통해 4개의 주요 화면 전환: MainScreen ↔ QuizScreen → ResultScreen → MainScreen
- 다시 하기: 같은 카테고리에서 점수 초기화 후 재시작
- 메인으로 돌아가기: 모든 상태 초기화

**퀴즈 데이터:**
- src/data/quizData.js에 카테고리별 10개씩 총 40문제가 저장됨
- 각 문제는 id, question, options(4개), answer(정답 인덱스), explanation(해설)을 포함
- 해설은 정답/오답 여부와 관계없이 모든 문제 선택 후 사용자에게 표시됨

**로컬스토리지 랭킹:**
- src/utils/leaderboard.js에서 로컬스토리지 관리
- 각 게임 종료 시 자동으로 점수, 카테고리, 날짜/시간, 정답률 저장
- localStorage 키: `quizLeaderboard` (JSON 배열)
- 저장 데이터: id, category, score, totalQuestions, percentage, date, time

**스타일:**
- Tailwind CSS 유틸리티 클래스로 구성
- 반응형 디자인: sm(640px), md(768px) 브레이크포인트 사용
- 그래디언트, 섀도우, 트랜지션으로 인터랙티브한 UI
- 랭킹 표시: 1위 금색, 2위 은색, 3위 동색, 그 외 남색

## Common Development Tasks

**새 카테고리 추가:**
1. MainScreen.jsx의 `categories` 배열에 새 카테고리 객체 추가 (id, name, emoji, color)
2. src/data/quizData.js의 `quizData` 객체에 카테고리 키 추가 및 10개 문제 배열 추가
   - 각 문제: id, question, options(배열), answer(정답 인덱스), explanation(해설 텍스트)
3. src/utils/leaderboard.js의 `getCategoryName()` 함수에 새 카테고리 매핑 추가

**문제 데이터 변경:**
- src/data/quizData.js 수정
- 또는 나중에 백엔드 API로 교체하려면 QuizScreen.jsx의 `useEffect`에서 fetch 로직으로 대체

**해설 표시 로직 변경:**
- QuizScreen.jsx: 답변 선택 후 표시되는 해설 섹션 수정
- explanation 필드를 변경하면 자동으로 표시됨

**랭킹 관련 로직:**
- 랭킹 보기: MainScreen.jsx에서 탭 버튼으로 토글 가능
- 랭킹 초기화: src/utils/leaderboard.js의 `clearLeaderboard()` 함수 호출
- 카테고리별 랭킹: `getLeaderboardByCategory(categoryId)` 함수 사용

**UI/스타일 수정:**
- Tailwind CSS 클래스 수정
- 각 컴포넌트 파일의 className 속성 변경

**등급 계산 로직 변경:**
- ResultScreen.jsx의 `getGrade()` 함수에서 백분율별 등급 기준 수정

## Notes for Claude Code

- **퀴즈 데이터 구조:** question.answer는 정답 선택지의 인덱스 (0-3)
- **해설 표시:** 사용자가 선택지를 클릭하면 즉시 정답/오답 표시 + 해설 + 정답 표시 (오답일 경우)
- **점수 저장:** 게임 종료 시 `handleQuizComplete`에서 `saveScore()` 호출하여 자동 저장
- **로컬스토리지 접근:**
  - 조회: `getLeaderboard()` 전체 기록 반환
  - 저장: `saveScore(category, score, totalQuestions)` 자동 호출
  - 초기화: `clearLeaderboard()` (필요 시에만)
- **색상 코드:**
  - 정답 선택 또는 정답 표시: 초록색 (bg-green-500)
  - 오답 선택: 빨간색 (bg-red-500)
  - 해설 박스: 파란색 배경 (bg-blue-50)
  - 정답 표시: 초록색 배경 (bg-green-50)
  - 랭킹 순위 색상: 1위 금색(#FFD700), 2위 은색(#C0C0C0), 3위 동색(#CD7F32), 기타 남색(#6366F1)
- **로컬스토리지 구조:**
  ```json
  {
    "quizLeaderboard": [
      {
        "id": "timestamp-string",
        "category": "korean-history",
        "score": 8,
        "totalQuestions": 10,
        "percentage": 80,
        "date": "2024. 1. 15.",
        "time": "14:30:45"
      }
    ]
  }
  ```
- 확장성: 나중에 API로 퀴즈 데이터를 동적으로 로드하려면 QuizScreen.jsx의 useEffect에서 fetch 구현
- 접근성 개선 가능: 버튼에 aria-label 추가, 키보드 네비게이션 지원
- 현재 한국어 텍스트만 지원하므로 다국어 지원 필요 시 i18n 라이브러리 고려
- 브라우저 개발자도구 → Application → Local Storage에서 `quizLeaderboard` 확인 가능
