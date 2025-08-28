# 📖 감정 일기장 (Emotions Diary)

## 🎯 프로젝트 소개

감정 일기장은 사용자가 일상의 감정을 기록하고 관리할 수 있는 React 기반 웹 애플리케이션입니다.
<br>
오늘 당신의 기분을 기록하며 하루를 마무리 해보세요!!

## ✨ 주요 기능

- 일기 작성 : 감정 상태와 함께 일기 내용을 기록 
- 감정 표현 : 자신의 감정을 5단계로 나누어 기록 가능
- 일기 관리 : 일기 조회, 수정, 삭제 지원

##    프로젝트 구조

```text
src/
├── components/ # 재사용 가능한 UI 컴포넌트
│ ├── Button.jsx # 버튼 컴포넌트
│ ├── DiaryItem.jsx # 일기 항목 컴포넌트
│ ├── DiaryList.jsx # 일기 목록 컴포넌트
│ ├── Editor.jsx # 일기 편집기 컴포넌트
│ ├── EmotionItem.jsx # 감정 선택 컴포넌트
│ ├── Header.jsx # 헤더 컴포넌트
│ └── Viewer.jsx # 일기 뷰어 컴포넌트
├── Pages/ # 페이지 컴포넌트
│ ├── Home.jsx # 홈 페이지 (일기 목록)
│ ├── New.jsx # 새 일기 작성 페이지
│ ├── Diary.jsx # 일기 상세 보기 페이지
│ ├── Edit.jsx # 일기 수정 페이지
│ └── NotFound.jsx # 404 에러 페이지
├── hooks/ # 커스텀 훅
│ └── useDiary.jsx # 일기 관련 로직 훅
├── util/ # 유틸리티 함수
│ ├── constants.js # 상수 정의
│ ├── get-emotion-image.js # 감정 이미지 매핑
│ └── get-stringed-date.js # 날짜 포맷팅
└── assets/ # 이미지 및 폰트 파일
├── emotion1.png # 감정 아이콘 1
├── emotion2.png # 감정 아이콘 2
├── emotion3.png # 감정 아이콘 3
├── emotion4.png # 감정 아이콘 4
├── emotion5.png # 감정 아이콘 5
└── NanumPenScript-Regular.ttf # 폰트 설정

```


##    시작하기

### 필수 요구사항

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/taegeon2/emotions-diary.git
cd emotions-diary
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm run dev
```

4. **브라우저에서 확인**



## 📱 주요 페이지

### 🏠 홈 페이지 (`/`)
- 작성된 모든 일기를 확인 가능
- 일기 목록을 카드 형태로 표시
- 각 일기의 감정 상태와 작성 날짜 확인

### ✏️ 새 일기 작성 (`/new`)
- 5가지 감정 중 하나를 선택
- 일기 내용을 자유롭게 작성

### 📖 일기 상세 보기 (`/diary`)
- 선택한 일기의 전체 내용 확인
- 일기 수정 및 삭제 버튼 제공

### 🔧 일기 수정 (`/edit`)
- 기존 일기 내용 수정
- 감정 상태 변경 가능
