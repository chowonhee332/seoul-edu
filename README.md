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
