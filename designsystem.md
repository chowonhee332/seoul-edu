# Seoul.edu Design System

앞으로 만드는 모든 UI는 이 문서의 기준을 따른다.
CSS 변수는 `src/styles/tokens.css`에 정의되어 있다.

---

## 1. 컬러

> CSS 변수는 `src/styles/tokens.css`에 정의. 하드코딩 금지 — 반드시 토큰 사용.  
> 아이콘 색상은 같은 레벨의 text 토큰을 사용 (icon/primary = text/primary 값).

### Brand
| 시맨틱 토큰 | CSS 변수 | 값 | 용도 |
|------------|----------|----|------|
| `primary/default` | `--color-primary-default` | `#1A75FF` | 주요 버튼, 링크, 강조 |
| `primary/bg` | `--color-primary-bg` | `#F0F4FF` | 선택된 항목 배경 |
| `primary/subtle` | `--color-primary-subtle` | `#F5F8FF` | 연한 강조 배경 |
| `secondary/default` | `--color-secondary-default` | `#26B7BC` | 보조 강조색 |
| `secondary/bg` | `--color-secondary-bg` | `#E8F9FA` | 보조 강조 배경 |

### Text
| 시맨틱 토큰 | CSS 변수 | 값 | 용도 |
|------------|----------|----|------|
| `text/primary` | `--color-text-primary` | `#171719` | 제목, 본문 강조 |
| `text/secondary` | `--color-text-secondary` | `rgba(46,47,51,0.88)` | 일반 본문 |
| `text/tertiary` | `--color-text-tertiary` | `rgba(55,56,60,0.61)` | 부가 정보, 날짜, 메타 |
| `text/muted` | `--color-text-muted` | `#989BA2` | placeholder |
| `text/disabled` | `--color-text-disabled` | `#A0A0A1` | 비활성 상태 |
| `text/inverse` | `--color-text-inverse` | `#F7F7F8` | 어두운 배경 위 텍스트 |
| `text/inverse-muted` | `--color-text-inverse-muted` | `rgba(255,255,255,0.8)` | 어두운 배경 위 보조 텍스트 |
| `text/body` | `--color-text-body` | `#2E2F33` | 긴 본문 텍스트 |

### Background
| 시맨틱 토큰 | CSS 변수 | 값 | 용도 |
|------------|----------|----|------|
| `bg/page` | `--color-bg-page` | `#F0F4F9` | 전체 페이지 배경 |
| `bg/surface` | `--color-bg-surface` | `#F4F6FA` | 카드, 팝업 배경 |
| `bg/input` | `--color-bg-input` | `#F6F8FC` | 인풋 필드 기본 배경 |
| `bg/dark` | `--color-bg-dark` | `#111111` | 다크 테마 섹션 배경 |
| `bg/hover` | `--color-bg-hover` | `rgba(112,115,124,0.08)` | 리스트/버튼 호버 |
| `bg/hover-strong` | `--color-bg-hover-strong` | `rgba(112,115,124,0.16)` | 진한 호버 |
| `bg/white` | `--color-white` | `#FFFFFF` | 카드, 모달 배경 |
| `bg/black` | `--color-black` | `#000000` | 완전한 검은색 |

### Border
| 시맨틱 토큰 | CSS 변수 | 값 | 용도 |
|------------|----------|----|------|
| `border/default` | `--color-border-default` | `rgba(112,115,124,0.35)` | 기본 테두리 |
| `border/subtle` | `--color-border-subtle` | `rgba(112,115,124,0.16)` | 연한 테두리, 인풋 |
| `border/light` | `--color-border-light` | `#E0E4EB` | 테이블 행 구분선 |

### Status
| 시맨틱 토큰 | CSS 변수 | 값 | 용도 |
|------------|----------|----|------|
| `status/error` | `--color-status-error` | `#FF4242` | 필수 입력 dot, 오류 |
| `status/active` | `--color-status-active` | `#3186FF` | 진행 중, 활성 상태 |
| `status/success` | `--color-status-success` | `#00B493` | 완료, 성공 |
| `status/warning` | `--color-status-warning` | `#FF8C00` | 경고, 주의 |

### 색상 사용 규칙

| 상황 | 사용 토큰 |
|------|----------|
| 제목, 핵심 본문 | `text/primary` |
| 부제목, 설명 | `text/secondary` |
| 날짜, 메타, 아이콘 | `text/tertiary` |
| 페이지 배경 | `bg/page` |
| 카드 배경 | `bg/white` |
| 테이블 헤더 | `bg/surface` |
| 주 액션 버튼 | `primary/default` |
| 보조 강조 | `secondary/default` |
| 필수 입력 표시 | `status/error` |

> **규칙:** 하드코딩 금지. 토큰에 없는 색이 필요하면 `tokens.css`에 추가 후 사용.

---

## 2. 타이포그래피

폰트 패밀리: `'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif`

### Font Size (반응형)

| 토큰 | PC (Desktop) | Tablet (≤1024px) | Mobile (≤768px) | 피그마 | 용도 |
|------|-------------|-----------------|----------------|--------|------|
| `--font-size-stat` | `44px` | `36px` | `32px` | - | 대형 수치/카운터 |
| `--font-size-hero` | `36px` | `28px` | `24px` | Hero | 히어로 섹션 대제목 |
| `--font-size-h1` | `32px` | `28px` | `24px` | Heading 1 | 페이지 대제목 |
| `--font-size-h2` | `28px` | `24px` | `20px` | Heading 2 | 섹션 제목 |
| `--font-size-h3` | `24px` | `20px` | `18px` | Heading 3 | 서브 섹션 제목 |
| `--font-size-title1` | `20px` | `18px` | `18px` | Title 1 | 카드 대제목 |
| `--font-size-title2` | `18px` | `16px` | `15px` | Title 2 | 카드 제목 |
| `--font-size-body-lg` | `16px` | `16px` | `15px` | Body 1/Normal | 강조 본문, 레이블 |
| `--font-size-body` | `15px` | `15px` | `14px` | Body 2/Normal | 기본 본문, 리스트 항목 |
| `--font-size-body-sm` | `14px` | `14px` | `14px` | Body 2/Table | 보조 텍스트, 메타 정보 |
| `--font-size-caption` | `13px` | `13px` | `13px` | Label 1/Normal | 캡션, 버튼 소형 |
| `--font-size-micro` | `12px` | `12px` | `12px` | Caption 1 | 태그, 뱃지 |
| `--font-size-caption2` | `11px` | `11px` | `11px` | Caption 2 | 소형 뱃지 텍스트 |

> **규칙:** Heading/Title 계열만 브레이크포인트별 스케일다운. Body 이하는 유지 (가독성 최소치 기준).

### Font Weight
| 토큰 | 값 | 용도 |
|------|----|------|
| `--font-weight-regular` | `400` | 일반 본문 |
| `--font-weight-medium` | `500` | 버튼, 레이블 |
| `--font-weight-semibold` | `600` | 소제목, 강조 |
| `--font-weight-bold` | `700` | 대제목, 히어로 |

### Line Height
| 토큰 | 값 | 피그마 | 용도 |
|------|----|--------|------|
| `--line-height-tight` | `1.3` | 130% | 제목류 (Hero, Heading, Table) |
| `--line-height-medium` | `1.4` | 140% | Title, Label |
| `--line-height-normal` | `1.5` | 150% | Body |

### Letter Spacing
| 토큰 | 값 | 피그마 | 용도 |
|------|----|--------|------|
| `--letter-spacing-hero` | `-0.03em` | -3% | Hero, Heading 1 |
| `--letter-spacing-heading` | `-0.02em` | -2% | Heading 2 |
| `--letter-spacing-title` | `-0.01em` | -1% | Title 1, Title 2, Body 1 |
| `--letter-spacing-body` | `-0.005em` | -0.5% | Body 2, Label 1 |
| `--letter-spacing-none` | `0` | 0% | Caption 1 |

> **규칙:** font-size/weight/line-height/letter-spacing 하드코딩 금지. 반드시 토큰 사용.

---

## 3. Border Radius

카드/버튼/인풋 등 주요 구조 요소는 토큰 기준으로 사용. 아이콘 원형(`50%`) 등 세부 UI는 예외 허용.

| 토큰 | 값 | 용도 |
|------|----|------|
| `--radius-none` | `0px` | 모바일 전체폭 요소 |
| `--radius-4` | `4px` | 태그, 뱃지, 인풋, 소형 버튼 |
| `--radius-8` | `8px` | 버튼, 드롭다운 |
| `--radius-12` | `12px` | 작은 카드 |
| `--radius-16` | `16px` | 중간 카드, 모바일 배너 |
| `--radius-20` | `20px` | 메인 카드 |
| `--radius-32` | `32px` | 대형 카드, 모달 |
| `--radius-full` | `999px` | 알약형 버튼, 칩 |

---

## 5. 그림자

| 토큰 | 값 | 용도 |
|------|----|------|
| `--shadow-card` | `10px 20px 30px 0px rgba(0,0,0,0.02)` | 기본 카드 |
| `--shadow-float` | `0 8px 20px -4px rgba(0,0,0,0.10)` | 드롭다운, 모달, 플로팅 |

---

## 6. 브레이크포인트

3단계 반응형을 기준으로 한다.

| 이름 | 범위 | 용도 |
|------|------|------|
| Desktop | 1025px ~ | PC 기본 레이아웃 |
| Tablet | 769px ~ 1024px | 태블릿 |
| Mobile | ~ 768px | 스마트폰 |

### 미디어쿼리 사용법
```css
/* Tablet */
@media (max-width: 1024px) { ... }

/* Mobile */
@media (max-width: 768px) { ... }
```

### 페이지 좌우 패딩
| 브레이크포인트 | 패딩 |
|---------------|------|
| Desktop | `0 48px` |
| Tablet | `0 24px` |
| Mobile | `0 16px` |

### GNB 높이
| 브레이크포인트 | 높이 |
|---------------|------|
| Desktop | `68px` |
| Tablet / Mobile | `60px` |

### 카드 패딩
| 브레이크포인트 | 패딩 |
|---------------|------|
| Desktop | `28px` |
| Tablet | `28px` |
| Mobile | `20px ~ 24px` (콘텐츠 밀도에 따라 조정) |

### 폼 레이아웃
| 항목 | 값 |
|------|----|
| 폼 인풋 최대 가로폭 | `480px` |
| 적용 페이지 | 로그인, AS접수, 접수조회 등 단일 폼 페이지 |

---

## 7. 컴포넌트

### 공통 컴포넌트 목록
| 컴포넌트 | 파일 | 용도 |
|----------|------|------|
| `GNB` | `components/GNB.tsx` | 상단 네비게이션 |
| `Footer` | `components/Footer.tsx` | 하단 푸터 |
| `Breadcrumb` | `components/Breadcrumb.tsx` | 경로 표시 |
| `PageTitle` | `components/PageTitle.tsx` | 페이지 상단 제목 |
| `CommonBoard` | `components/CommonBoard.tsx` | 목록/테이블 (공지, 이력 등) |
| `CategoryTabs` | `components/CategoryTabs.tsx` | 탭 필터 |
| `SearchBox` | `components/SearchBox.tsx` | 검색 입력 |
| `QuickServiceBar` | `components/QuickServiceBar.tsx` | 퀵 서비스 바 |

> **규칙:** 동일한 UI 패턴이 2곳 이상 반복되면 컴포넌트로 분리.

---

## 8. 리스트/테이블 반응형 규칙

### 테이블형 목록 (CommonBoard 등)

컬럼 우선순위 기준: **사용자가 클릭 여부를 결정하는 데 필요한 정보 = 핵심**

| 컬럼 | Desktop | Tablet | Mobile | 이유 |
|------|---------|--------|--------|------|
| 제목 | ✓ | ✓ | ✓ | 클릭 결정의 핵심 |
| 날짜 | ✓ | ✓ | ✓ | 최신 여부 판단 |
| 상태/진행상황 | ✓ | ✓ | ✓ | 액션과 직결 |
| 카테고리/분류 | ✓ | ✓ | ✗ | 페이지 맥락으로 대체 가능 |
| 번호 | ✓ | ✗ | ✗ | 장식용 |
| 첨부파일 | ✓ | ✗ | ✗ | 상세 페이지에서 확인 가능 |
| 조회수 | ✓ | ✗ | ✗ | 참고용, 클릭 결정 무관 |

- 모바일에서도 카드형 전환 없이 테이블 유지
- 핵심 컬럼만 표시하여 가독성 확보

### 가로 스크롤 정책

컬럼이 많아 화면 너비를 초과하는 테이블(예: 방문이력, A/S이력 등)은 테이블을 카드형으로 변환하지 않고 **가로 스크롤**을 적용한다.

```css
/* 테이블 카드 래퍼 */
.tableCard {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* 테이블 행에 최소 너비 지정 */
.tableHeaderRow,
.tr {
  min-width: 700px; /* 컬럼 합산 너비에 맞게 조정 */
}
```

> **규칙:** 컬럼 수가 4개 이하인 단순 테이블(공지, FAQ 등)은 가로 스크롤 없이 컬럼 숨김 정책 적용. 컬럼 5개 이상이거나 고정 너비 컬럼 합산이 600px 초과 시 가로 스크롤 적용.

### 카드형 그리드

| 브레이크포인트 | 열 수 |
|---------------|-------|
| Desktop | 4열 |
| Tablet | 2열 |
| Mobile | 1열 |

---

## 9. 페이지 레이아웃 구조

```
<div class="page">        ← min-height: 100vh, padding-top: 68px (GNB 높이)
  <GNB />
  <div class="body">      ← flex: 1, 좌우 패딩 (브레이크포인트별 상이)
    <div class="inner">   ← max-width: 1000px, margin: 0 auto
      ...page content
    </div>
  </div>
  <Footer />
</div>
```

공통 레이아웃은 `src/styles/pageLayout.module.css`를 `composes:`로 재사용.

