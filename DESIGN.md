# 서울특별시교육청 디자인 시스템

> **Source of Truth**: `src/styles/tokens.css`  
> 토큰 네이밍 규칙: `카테고리/역할`

---

## 1. Color

### Brand

| Token | CSS Variable | Value | 사용처 |
|-------|-------------|-------|--------|
| `primary/default` | `--color-primary-default` | `#1A75FF` | 주 버튼, 링크, 강조 |
| `primary/bg` | `--color-primary-bg` | `#F0F4FF` | 파란 계열 배경 |
| `primary/subtle` | `--color-primary-subtle` | `#F5F8FF` | 동의 영역 배경 |
| `secondary/default` | `--color-secondary-default` | `#26B7BC` | 서브 강조, 태그 |
| `secondary/bg` | `--color-secondary-bg` | `#E8F9FA` | 초록 계열 배경 |

---

### Text

| Token | CSS Variable | Value | 사용처 |
|-------|-------------|-------|--------|
| `text/primary` | `--color-text-primary` | `#171719` | 제목, 본문 핵심 텍스트 |
| `text/secondary` | `--color-text-secondary` | `#2E2F33` 88% | 부제목, 설명 |
| `text/tertiary` | `--color-text-tertiary` | `#37383C` 61% | 날짜, 메타정보 |
| `text/muted` | `--color-text-muted` | `#989BA2` | placeholder |
| `text/disabled` | `--color-text-disabled` | `#A0A0A1` | 비활성 텍스트 |
| `text/inverse` | `--color-text-inverse` | `#F7F7F8` | 어두운 배경 위 텍스트 |

> 아이콘 색상은 같은 레벨의 text 토큰을 사용 (icon/primary = text/primary 값)

---

### Background

| Token | CSS Variable | Value | 사용처 |
|-------|-------------|-------|--------|
| `bg/page` | `--color-bg-page` | `#F0F4F9` | 페이지 전체 배경 |
| `bg/surface` | `--color-bg-surface` | `#F4F6FA` | 카드 내부, 테이블 헤더 |
| `bg/input` | `--color-bg-input` | `#F6F8FC` | 인풋, 비활성 영역 |
| `bg/white` | `--color-white` | `#FFFFFF` | 카드, 팝업 배경 |

---

### Border

| Token | CSS Variable | Value | 사용처 |
|-------|-------------|-------|--------|
| `border/default` | `--color-border-default` | `#70737C` 35% | 카드 테두리 |
| `border/subtle` | `--color-border-subtle` | `#70737C` 16% | 인풋 테두리 |
| `border/light` | `--color-border-light` | `#E0E4EB` | 테이블 행 구분선 |

---

### Status

| Token | CSS Variable | Value | 사용처 |
|-------|-------------|-------|--------|
| `status/error` | `--color-status-error` | `#FF4242` | 필수 입력 dot, 에러 |
| `status/active` | `--color-status-active` | `#3186FF` | 활성 상태 표시 |

---

## 2. Typography

**Font Family**: `Pretendard`

| Token | Size | Weight | Line Height | Letter Spacing | 사용처 |
|-------|------|--------|-------------|----------------|--------|
| `font/size/3xl` | 32px | 700 | 1.2 | -0.64px | 페이지 섹션 제목 |
| `font/size/2xl` | 28px | 700 | 1.2 | -0.56px | 콘텐츠 상세 제목 |
| `font/size/xl` | 20px | 400 | 1.4 | — | 섹션 소제목 |
| `font/size/lg` | 18px | 600 | 1.4 | — | 동의 제목 |
| `font/size/base` | 16px | 400–600 | 1.5 | -0.16px | GNB, 본문, 버튼 |
| `font/size/md` | 15px | 400–500 | 1.5–1.8 | — | 리스트 제목, 본문 |
| `font/size/sm` | 14px | 400–500 | 1.4 | -0.07px | 테이블 셀, 작은 버튼 |
| `font/size/xs` | 13px | 400–500 | 1.4 | -0.065px | 메타정보, 푸터 |
| `font/size/2xs` | 12px | 500 | 1.4 | — | 태그/배지 |

---

## 3. Spacing

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `spacing/2` | `--spacing-2` | 2px |
| `spacing/4` | `--spacing-4` | 4px |
| `spacing/8` | `--spacing-8` | 8px |
| `spacing/12` | `--spacing-12` | 12px |
| `spacing/16` | `--spacing-16` | 16px |
| `spacing/20` | `--spacing-20` | 20px |
| `spacing/24` | `--spacing-24` | 24px |
| `spacing/32` | `--spacing-32` | 32px |
| `spacing/40` | `--spacing-40` | 40px |
| `spacing/48` | `--spacing-48` | 48px |
| `spacing/60` | `--spacing-60` | 60px |

---

## 4. Border Radius

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `radius/none` | `--radius-none` | 0px |
| `radius/sm` | `--radius-4` | 4px |
| `radius/md` | `--radius-8` | 8px |
| `radius/lg` | `--radius-12` | 12px |
| `radius/xl` | `--radius-16` | 16px |
| `radius/2xl` | `--radius-20` | 20px |
| `radius/3xl` | `--radius-32` | 32px |
| `radius/full` | `--radius-full` | 999px |

---

## 5. Shadow

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `shadow/card` | `--shadow-card` | `10px 20px 30px 0px #00000005` |
| `shadow/float` | `--shadow-float` | `0 8px 20px -4px #0000001A` |

---

## 6. Layout & Breakpoints

| Token | Value | 사용처 |
|-------|-------|--------|
| GNB height | 68px (desktop) / 60px (tablet) | 고정 상단 내비 |
| Content max-width | 1000px | 모든 페이지 inner |
| Body padding | 48px (desktop) / 24px (tablet) / 16px (mobile) | 좌우 여백 |
| Card padding | 28px | 콘텐츠 카드 |
| List row height | 52px | 모든 리스트 행 |
| Table header height | 40px | 테이블 헤더 |

| Breakpoint | 기준 |
|------------|------|
| Desktop | > 1023px |
| Tablet | ≤ 1023px |
| Mobile | ≤ 599px |

---

## 7. Components

### Card
```
bg/white  |  radius/2xl (20px)  |  padding: 28px  |  border: 1px solid #70737C14
```

### Button / Primary
```
bg: primary/default (#1A75FF)  |  color: text/inverse  |  radius/sm (4px)
height: 40px (small) / 52px (large)  |  font/size/sm, weight 500
```

### Button / Ghost
```
border: 1px solid #70737C4C  |  radius/sm (4px)
height: 40px  |  font/size/sm, weight 400
```

### List Row
```
height: 52px  |  border-bottom: border/light (#E0E4EB)
hover: bg/surface (#F4F6FA)
```

### Tag / Badge
```
font/size/2xs (12px, 500)  |  padding: 3px 8px  |  radius/sm (4px)
primary → primary/default  |  secondary → secondary/default
```

### GNB
```
height: 68px (desktop) / 60px (tablet)  |  position: fixed
bg: transparent → bg/white (scrolled)
```

---

## 8. 색상 사용 규칙

| 상황 | 토큰 |
|------|------|
| 제목, 핵심 본문 | `text/primary` |
| 부제목, 설명 | `text/secondary` |
| 날짜, 메타, 아이콘 | `text/tertiary` |
| 페이지 배경 | `bg/page` |
| 카드 배경 | `bg/white` |
| 테이블 헤더 | `bg/surface` |
| 주 액션 | `primary/default` |
| 보조 강조 | `secondary/default` |
| 필수 입력 표시 | `status/error` |
