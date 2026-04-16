import { Variants } from 'framer-motion'

/** 페이지 진입 시 자식 요소들을 순차 페이드인하는 컨테이너 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

/** 위에서 아래로 페이드인 (일반 섹션/카드용) */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

/** 위에서 아래로 페이드인 (홈 히어로 — 더 큰 이동 + easing) */
export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/** 테이블 행 순차 페이드인용 컨테이너 */
export const tableContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

/** 테이블 개별 행 */
export const rowVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
}

/** 멀티스텝 폼의 단계 전환 슬라이드 (수평) */
export const stepVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

/** 멀티스텝 폼의 단계 전환 페이드 (수직) */
export const verticalStepVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}
