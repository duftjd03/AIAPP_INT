# AI Application Projects 통합

이 저장소는 3가지 AI/웹 애플리케이션 프로젝트를 통합하고 있습니다:
1. **MNIST 손글씨 인식 시스템** (Python 딥러닝)
2. **TODO 플래너** (Vanilla JavaScript)
3. **상식 퀴즈 게임** (React + Vite)

---

## 📋 프로젝트 구조

```
AIAPP/
├── MNIST_Hand/              # 손글씨 인식 프로그램
│   ├── mnist_handwriting_recognition.py
│   ├── test_quick.py
│   ├── README.md
│   ├── data/
│   └── mnist_model.h5 (학습 후 생성)
│
├── study-02/                # TODO 플래너
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── CLAUDE.md
│
├── study-03/                # 상식 퀴즈 게임
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── CLAUDE.md
│
└── README.md               # 이 파일
```

---

## 🧠 프로젝트 1: MNIST 손글씨 인식 시스템

### 📌 기능
- **MNIST 데이터셋 학습**: 60,000장의 손글씨 이미지로 신경망 학습
- **신경망 모델**: 4계층 구조 (128 → 64 → 32 → 10 뉴런)
- **모델 저장/재사용**: 학습된 모델을 저장하여 재사용 가능
- **대화형 드로잉 캔버스**: 마우스로 숫자를 그리고 즉시 인식
- **실시간 예측**: 예측된 숫자와 신뢰도(%) 출력
- **학습 시각화**: 정확도 및 손실 곡선 그래프 저장

### 🛠️ 기술 스택
- **Framework**: TensorFlow/Keras
- **Libraries**: NumPy, Matplotlib, OpenCV, Pillow
- **Python**: 3.8+

### 📦 설치 및 실행

**1. 필수 패키지 설치**
```bash
cd MNIST_Hand
pip install tensorflow keras numpy matplotlib opencv-python Pillow
```

**2. 프로그램 실행**
```bash
python mnist_handwriting_recognition.py
```

**3. 드로잉 조작법**
- **마우스 왼쪽 클릭 + 드래그**: 숫자(0-9) 그리기
- **스페이스바**: 그린 숫자 인식하기
- **C 키**: 캔버스 지우기
- **Q 키**: 프로그램 종료

### 📊 구현 내용

#### 데이터 로딩 (Part 1)
- MNIST 데이터셋 로드: 학습용 60,000장, 테스트용 10,000장
- 픽셀 값 정규화: [0, 255] → [0, 1]
- 이미지 평탄화: 28×28 → 784차원 벡터
- 라벨 원-핫 인코딩

#### 모델 구조 (Part 2)
```
입력층 (784)
  ↓
Dense (128, ReLU) + Dropout(0.2)
  ↓
Dense (64, ReLU) + Dropout(0.2)
  ↓
Dense (32, ReLU) + Dropout(0.2)
  ↓
출력층 (10, Softmax)
```

#### 학습 (Part 3)
- **옵티마이저**: Adam
- **에포크**: 15
- **배치 크기**: 128
- **손실 함수**: Categorical Crossentropy

#### 평가 및 시각화 (Part 4)
- 테스트셋 정확도 및 손실 측정
- 학습 곡선 그래프 저장

#### 대화형 인식 (Part 5)
- OpenCV 기반 드로잉 인터페이스
- 이미지 전처리 및 예측
- 신뢰도 점수 출력

### 📈 예상 성능
- **테스트 정확도**: 약 97~98%
- **학습 시간**: CPU 기준 약 2~3분

### 📁 생성 파일
- `mnist_model.h5` - 학습된 신경망 모델
- `training_history.png` - 학습 곡선 그래프
- `prediction_result.png` - 예측 결과 이미지

### 🔧 커스터마이징
```python
# main() 함수에서 수정 가능
# 에포크 수 변경
history = train_model(model, x_train, y_train, x_test, y_test, epochs=20)

# 배치 크기 변경
history = train_model(model, x_train, y_train, x_test, y_test, batch_size=64)

# build_model()에서 모델 구조 변경
```

---

## ✅ 프로젝트 2: TODO 플래너

### 📌 기능
- **할 일 CRUD**: 추가, 읽기, 수정, 삭제 기능
- **카테고리 필터링**: 전체/업무/개인/공부 카테고리별 필터
- **실시간 검색**: 입력하는 동안 할 일 검색
- **진행률 표시**: 완료율 진행바와 남은 할 일 개수 실시간 표시
- **테마 토글**: 다크모드/라이트모드 전환
- **데이터 영속성**: LocalStorage로 자동 저장/복구
- **단축키 지원**: Ctrl+1~4로 카테고리 필터 전환
- **일괄 삭제**: 완료된 항목 모두 삭제 기능

### 🛠️ 기술 스택
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser LocalStorage
- **Responsive**: 모바일/태블릿/데스크톱 대응

### 📦 설치 및 실행

**1. 파일 구조**
```
study-02/
├── index.html      # HTML 구조
├── style.css       # 스타일 및 반응형 레이아웃
├── app.js          # JavaScript 로직
└── CLAUDE.md       # 개발 문서
```

**2. 실행 방법 (3가지)**

**방법 1: Python SimpleHTTPServer**
```bash
cd study-02
python -m http.server 8000
# 브라우저에서 http://localhost:8000 열기
```

**방법 2: VS Code Live Server**
- `index.html` 파일 우클릭 → "Open with Live Server"

**방법 3: 직접 열기**
- `index.html`을 브라우저에서 직접 열기 (권장하지 않음, 일부 기능 제한)

### 📊 구현 내용

#### HTML 구조 (index.html)
- **Header**: 앱 제목 및 설명
- **Progress Section**: 완료율 진행바
- **Category Tabs**: "전체", "업무", "개인", "공부" 필터
- **Task Form**: 할 일 입력창 + 카테고리 선택 + 추가 버튼
- **Task List**: 할 일 목록 렌더링
- **Footer**: 사용 설명

#### CSS 스타일 (style.css)
- **디자인**: 그라데이션 배경, 모던 카드 UI
- **반응형**: 모바일(480px), 태블릿(768px), 데스크톱
- **색상 체계**:
  - Primary: #6366f1 (인디고)
  - 업무: 파란색
  - 개인: 핑크색
  - 공부: 보라색
- **상태**: 완료 항목 취소선/연한 회색, 활성 탭 강조

#### JavaScript 로직 (app.js)

**핵심 함수**:
- `getFilteredTodos()` - 카테고리 + 검색어로 필터링
- `renderTodos()` - 필터된 할 일을 DOM에 렌더링
- `setFilter(category)` - 필터 변경
- `updateProgress()` - 진행률 계산
- `addTodo(text, category)` - 할 일 추가
- `deleteTodo(id)` - 할 일 삭제
- `toggleTodo(id)` - 완료 상태 토글
- `clearCompleted()` - 완료된 항목 삭제
- `toggleTheme()` - 테마 전환
- `saveTodos()` / `loadTodos()` - LocalStorage 저장/복구
- `handleKeypress()` - 단축키 처리

**데이터 구조**:
```javascript
{
  id: 1696...789,           // Date.now() 타임스탬프
  text: "할 일 내용",
  category: "work|personal|study",
  completed: false,
  createdAt: "ISO문자열"
}
```

**동작 흐름**:
1. 페이지 로드 → localStorage에서 데이터 복구
2. 할 일 추가 → 배열에 추가 → saveTodos() → renderTodos()
3. 체크박스 클릭 → toggleTodo() → 상태 변경 → 렌더링
4. 카테고리 탭 클릭 → currentFilter 변경 → 필터링된 결과 표시
5. 검색 입력 → searchQuery 변경 → 실시간 필터링

#### LocalStorage 구조
```javascript
localStorage.todos       // JSON 형식의 할 일 배열
localStorage.theme       // 'light' 또는 'dark'
```

#### 단축키
- **Ctrl+1**: 전체 필터
- **Ctrl+2**: 업무 필터
- **Ctrl+3**: 개인 필터
- **Ctrl+4**: 공부 필터

### 🎨 커스터마이징
- CSS `:root` 색상 변수로 쉽게 색상 변경
- 카테고리 추가: `app.js`의 `categorySelect` 옵션 추가
- 필터 추가: `app.js`에서 현재 필터 로직 확장

---

## 🎮 프로젝트 3: 상식 퀴즈 게임

### 📌 기능
- **카테고리 선택**: 4개 카테고리 (한국사, 과학, 지리, 일반상식)
- **퀴즈 풀이**: 각 카테고리별 10개의 객관식 문제
- **즉시 피드백**: 정답/오답 표시 + 해설
- **점수 계산**: 최종 점수와 등급 (S, A, B, C, D) 표시
- **로컬 랭킹**: 게임 기록을 LocalStorage에 저장
- **랭킹 보기**: 상위 점수 기록 확인 (순위별 색상 표시)
- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화

### 🛠️ 기술 스택
- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.3
- **Node.js**: 14.0+

### 📦 설치 및 실행

**1. 필수 패키지 설치**
```bash
cd study-03
npm install
```

**2. 개발 서버 실행**
```bash
npm run dev
```
브라우저에서 `http://localhost:5173` 열기

**3. 프로덕션 빌드**
```bash
npm run build
```

**4. 빌드 결과 미리보기**
```bash
npm run preview
```

**5. 배치 파일로 실행 (Windows)**
```bash
# study-03 폴더에서
게임 시작.bat
```

### 📊 구현 내용

#### 프로젝트 구조
```
src/
├── components/
│   ├── MainScreen.jsx       # 메인 화면 (카테고리 선택, 랭킹)
│   ├── QuizScreen.jsx       # 퀴즈 화면 (문제 + 선택지 + 해설)
│   ├── ResultScreen.jsx     # 결과 화면 (점수, 등급)
│   └── Leaderboard.jsx      # 랭킹 컴포넌트
├── data/
│   └── quizData.js          # 40개 문제 (4개 카테고리 × 10개)
├── utils/
│   └── leaderboard.js       # LocalStorage 점수 관리
├── App.jsx                  # 상태 관리 + 화면 라우팅
├── main.jsx                 # React 초기화
└── index.css                # Tailwind CSS 임포트
```

#### 주요 컴포넌트

**MainScreen.jsx**
- 4개의 카테고리 카드 표시 (한국사, 과학, 지리, 일반상식)
- 카테고리 선택 시 QuizScreen으로 이동
- "랭킹" 탭에서 기록 확인
- 카테고리별 이모지와 색상 구분

**QuizScreen.jsx**
- 선택된 카테고리의 10개 문제 순차 표시
- 4개의 선택지 버튼
- 선택 시 정답/오답 표시 (색상: 초록색/빨간색)
- 해설(explanation) 표시
- 오답 시 정답 표시
- 진행 상황 표시 (현재 문제/총 문제)

**ResultScreen.jsx**
- **점수 표시**: 획득한 점수 / 총 점수
- **정답률**: 백분율 (%)
- **등급 표시**:
  - S: 100%
  - A: 90~99%
  - B: 80~89%
  - C: 70~79%
  - D: 70% 이하
- **버튼**:
  - "다시 하기": 같은 카테고리에서 재시작
  - "메인으로": 카테고리 선택 화면으로 돌아가기

**Leaderboard.jsx**
- 모든 게임 기록 표시
- 순위별 색상 (1위 금색, 2위 은색, 3위 동색, 기타 남색)
- 카테고리, 점수, 정답률, 날짜/시간 표시
- 카테고리별 필터링 가능

#### 데이터 구조 (quizData.js)
```javascript
const quizData = {
  'korean-history': [
    {
      id: 1,
      question: "질문 텍스트",
      options: ["선택지1", "선택지2", "선택지3", "선택지4"],
      answer: 0,  // 정답 선택지 인덱스
      explanation: "해설 텍스트"
    },
    // ... 총 10개 문제
  ],
  'science': [...],
  'geography': [...],
  'general-knowledge': [...]
};
```

#### LocalStorage 구조 (leaderboard.js)
```javascript
// localStorage.quizLeaderboard
[
  {
    id: "timestamp",
    category: "korean-history",
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    date: "2024. 1. 15.",
    time: "14:30:45"
  },
  // ... 이전 기록들
]
```

#### 상태 관리 (App.jsx)
```javascript
const [gameState, setGameState] = useState('main');  // main, quiz, result
const [selectedCategory, setSelectedCategory] = useState(null);
const [score, setScore] = useState(0);
const [totalQuestions, setTotalQuestions] = useState(10);
```

#### 주요 함수

**App.jsx**:
- `startQuiz(categoryId)` - 카테고리 선택 후 퀴즈 시작
- `handleQuizComplete(finalScore)` - 퀴즈 완료 시 결과 화면으로 이동
- `handleRestart()` - 같은 카테고리에서 재시작
- `handleBackToMain()` - 메인 화면으로 돌아가기

**leaderboard.js**:
- `saveScore(category, score, totalQuestions)` - 점수 저장
- `getLeaderboard()` - 모든 기록 조회
- `getLeaderboardByCategory(categoryId)` - 카테고리별 기록 조회
- `clearLeaderboard()` - 모든 기록 초기화

#### 등급 계산 (ResultScreen.jsx)
```javascript
function getGrade(percentage) {
  if (percentage === 100) return 'S';
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  return 'D';
}
```

### 🎨 스타일 (Tailwind CSS)
- **반응형 브레이크포인트**: sm(640px), md(768px)
- **그래디언트**: 배경, 카드, 버튼
- **색상**:
  - 정답: 초록색 (bg-green-500, bg-green-50)
  - 오답: 빨간색 (bg-red-500)
  - 기본: 파란색/보라색 (bg-indigo-600, bg-purple-600)
  - 랭킹: 금색, 은색, 동색, 남색

### 🔧 커스터마이징

**새 카테고리 추가**:
1. `MainScreen.jsx`의 `categories` 배열에 추가
2. `src/data/quizData.js`에 새 카테고리 키와 10개 문제 추가
3. `src/utils/leaderboard.js`의 `getCategoryName()` 함수에 매핑 추가

**문제 데이터 수정**:
- `src/data/quizData.js` 파일 수정
- 또는 나중에 API로 교체 가능 (QuizScreen.jsx의 useEffect에서 fetch 로직)

**등급 기준 변경**:
- `ResultScreen.jsx`의 `getGrade()` 함수에서 백분율 기준 수정

**UI 색상 변경**:
- 각 컴포넌트의 Tailwind CSS 클래스 수정
- `tailwind.config.js`에서 커스텀 색상 정의

---

## 🚀 통합 설정

### 전체 프로젝트 실행 가이드

**단계 1: MNIST 손글씨 인식 (Python)**
```bash
cd MNIST_Hand
pip install -r requirements.txt  # 또는 pip install tensorflow keras numpy matplotlib opencv-python Pillow
python mnist_handwriting_recognition.py
```

**단계 2: TODO 플래너 (Vanilla JavaScript)**
```bash
cd study-02
python -m http.server 8000
# 브라우저에서 http://localhost:8000 열기
```

**단계 3: 상식 퀴즈 게임 (React)**
```bash
cd study-03
npm install
npm run dev
# 브라우저에서 http://localhost:5173 열기
```

### GitHub 업로드 확인

```bash
# 저장소 상태 확인
git status

# 모든 파일 스테이징
git add .

# 커밋 생성
git commit -m "AI Application Projects 통합 - 손글씨 인식, TODO 플래너, 퀴즈 게임"

# GitHub에 푸시
git push origin main
```

---

## 📚 각 프로젝트별 자세한 설명

더 자세한 정보는 각 프로젝트 폴더의 README.md 및 CLAUDE.md 파일을 참고하세요:

- `MNIST_Hand/README.md` - 손글씨 인식 시스템 상세 가이드
- `study-02/CLAUDE.md` - TODO 플래너 개발 문서
- `study-03/CLAUDE.md` - 퀴즈 게임 개발 문서

---

## 💡 주요 기술 개념

### 1. 딥러닝 (MNIST_Hand)
- **신경망**: 입력층 → 은닉층(3개) → 출력층
- **활성화 함수**: ReLU (은닉층), Softmax (출력층)
- **정규화**: Dropout (과적합 방지)
- **최적화**: Adam 알고리즘
- **손실 함수**: Categorical Crossentropy

### 2. Vanilla JavaScript (study-02)
- **상태 관리**: 전역 변수 사용 (간단한 아키텍처)
- **DOM 조작**: 쿼리셀렉터, 이벤트 리스너
- **비동기**: LocalStorage (동기식)
- **성능**: 이벤트 위임, 배열 조작

### 3. React + Vite (study-03)
- **컴포넌트 아키텍처**: 재사용 가능한 UI 컴포넌트
- **상태 관리**: useState 훅
- **빌드 최적화**: Vite (매우 빠른 개발 서버, 번들링)
- **스타일링**: Utility-first CSS (Tailwind)
- **로컬스토리지**: 게임 기록 영속성

---

## 🎯 학습 목표 달성 확인

이 프로젝트 모음을 통해 습득할 수 있는 기술:

✅ **Python & 딥러닝**
- TensorFlow/Keras로 신경망 구현
- MNIST 데이터셋 로드 및 전처리
- 모델 학습, 평가, 예측
- OpenCV를 이용한 이미지 처리

✅ **Vanilla JavaScript**
- DOM 조작 및 이벤트 처리
- LocalStorage를 통한 데이터 영속성
- CSS로 반응형 디자인
- 함수형 프로그래밍 패턴

✅ **현대 웹 개발 (React + Vite)**
- React 컴포넌트 작성
- 상태 관리 (useState)
- Tailwind CSS로 효율적인 스타일링
- npm 패키지 관리
- 빌드 도구 활용

---

## 🐛 문제 해결

### MNIST 프로그램
- **캔버스 창 미열기**: `pip install opencv-python` 재설치
- **학습 시간 오래 걸림**: GPU 가속 설정 확인 또는 에포크 감소
- **낮은 예측 정확도**: 숫자를 더 크고 선명하게 작성

### TODO 플래너
- **데이터 미저장**: 브라우저 개발자도구에서 LocalStorage 활성화 확인
- **스타일 미적용**: CSS 파일 로드 확인, 캐시 초기화 (Ctrl+Shift+Delete)

### 퀴즈 게임
- **페이지 미로드**: `npm install` 확인, 포트 5173 사용 가능 여부 확인
- **랭킹 미표시**: 브라우저 개발자도구 → Application → LocalStorage에서 `quizLeaderboard` 확인

---

## 📞 지원 및 연락

문제가 발생하거나 추가 기능이 필요한 경우, 각 프로젝트 폴더의 CLAUDE.md 파일에서 개발 가이드를 참고하세요.

---

**생성일**: 2024년 10월
**최종 업데이트**: 2026년 10월 30일
