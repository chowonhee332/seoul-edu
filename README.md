# 서울시교육청 스마트기기 관리 시스템

서울시교육청 스마트기기 A/S 및 현황 관리 웹 서비스입니다.

## 기술 스택

| 항목 | 버전 |
|------|------|
| React | 19 |
| TypeScript | 5.6 |
| Vite | 6 |
| React Router | 7 |
| Framer Motion | 12 |
| CSS Modules | — |

## 시작하기

```bash
# 패키지 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

## 폴더 구조

```
src/
├── main.tsx              # 앱 진입점
├── App.tsx               # 라우터 설정
│
├── pages/                # 페이지 단위 컴포넌트
│   ├── HomePage.tsx              # 비로그인 홈
│   ├── HomeLoggedInPage.tsx      # 로그인 후 홈
│   ├── LoginPage.tsx             # 로그인
│   ├── StatusPage.tsx            # 스마트기기 현황
│   ├── AsReceptionPage.tsx       # A/S 접수
│   ├── AsHistoryPage.tsx         # A/S 이력 조회
│   ├── WorkReceptionPage.tsx     # 작업 접수
│   ├── WorkHistoryPage.tsx       # 작업 이력 조회
│   ├── NoticePage.tsx            # 공지사항
│   ├── FaqPage.tsx               # FAQ
│   ├── VideoGuidePage.tsx        # 동영상 가이드
│   ├── DownloadCenterPage.tsx    # 다운로드 센터
│   ├── ContentDetailPage.tsx     # 콘텐츠 상세 (공지/FAQ/영상 공통)
│   └── ServiceCenterPage.tsx     # 서비스센터 찾기
│
├── components/           # 재사용 공통 컴포넌트
│   ├── GNB.tsx                   # 전역 내비게이션 바
│   ├── Footer.tsx                # 푸터
│   ├── Breadcrumb.tsx            # 브레드크럼
│   ├── PageTitle.tsx             # 페이지 제목 + 브레드크럼 영역
│   ├── CommonBoard.tsx           # 게시판 공통 레이아웃
│   ├── CategoryTabs.tsx          # 카테고리 탭
│   ├── QuickServiceBar.tsx       # 홈 퀵 서비스 바
│   ├── SearchBox.tsx             # 검색창
│   ├── TransitionLayout.tsx      # 페이지 전환 애니메이션 래퍼
│   ├── Confetti.tsx              # 컨페티 이펙트
│   └── ScrollToTop.tsx           # 라우트 변경 시 스크롤 최상단 이동
│
└── styles/               # 전역 스타일
    ├── tokens.css                # 디자인 토큰 (색상, 타이포, 반경, 브레이크포인트 등)
    ├── global.css                # body, reset 등 전역 기본 스타일
    └── pageLayout.module.css     # 페이지 공통 레이아웃 (.page / .body / .inner)
```

## 스타일 가이드

### 디자인 토큰

모든 색상, 반경, 간격은 `src/styles/tokens.css`의 CSS 변수를 사용합니다.

```css
/* 주요 토큰 예시 */
var(--color-primary-default)   /* 브랜드 블루 #1A75FF */
var(--color-text-primary)      /* 본문 텍스트 */
var(--color-bg-page)           /* 페이지 배경 */
var(--radius-20)               /* 카드 모서리 20px */
```

전체 토큰 목록은 [designsystem.md](./designsystem.md)를 참고하세요.

### 반응형 브레이크포인트

| 구분 | 범위 |
|------|------|
| Mobile | ≤ 768px |
| Tablet | ≤ 1024px |
| Desktop | 1025px 이상 |

```css
@media (max-width: 1024px) { /* 태블릿 이하 */ }
@media (max-width: 768px)  { /* 모바일 이하 */ }
```

### 페이지 레이아웃 패턴

모든 페이지는 `pageLayout.module.css`의 공통 클래스를 `composes:`로 재사용합니다.

```css
/* 페이지 CSS 파일 */
.page  { composes: page  from '../styles/pageLayout.module.css'; }
.body  { composes: body  from '../styles/pageLayout.module.css'; }
.inner { composes: inner from '../styles/pageLayout.module.css'; }
```

### 테이블 컬럼 표시 규칙

| 컬럼 | 데스크탑 | 태블릿 | 모바일 |
|------|----------|--------|--------|
| 제목, 날짜, 상태 | O | O | O |
| 번호, 카테고리 | O | O | 숨김 |
| 조회수, 첨부파일 | O | 숨김 | 숨김 |

## 라우팅

`src/App.tsx`에서 React Router v7로 관리합니다.

| 경로 | 페이지 |
|------|--------|
| `/` | 홈 (비로그인) |
| `/home-loggedin` | 홈 (로그인) |
| `/login` | 로그인 |
| `/status` | 스마트기기 현황 |
| `/as-reception` | A/S 접수 |
| `/as-history` | A/S 이력 조회 |
| `/work-history` | 작업 이력 조회 |
| `/notice` | 공지사항 |
| `/faq` | FAQ |
| `/video-guide` | 동영상 가이드 |
| `/download` | 다운로드 센터 |
| `/content/:id` | 콘텐츠 상세 |
| `/service-center` | 서비스센터 찾기 |

## 참고 문서

- [designsystem.md](./designsystem.md) — 색상, 타이포, 간격, 컴포넌트 규격 등 디자인 시스템 전체 명세
- [FIGMA_VARIABLES.md](./FIGMA_VARIABLES.md) — Figma 변수 매핑 테이블
