import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const COLORS = [
  '#1A75FF', // 메인 블루
  '#00C853', // 메인 그린
  '#64B5F6', // 라이트 블루
  '#81C784', // 라이트 그린
  '#0D47A1', // 다크 블루
  '#1B5E20', // 다크 그린
]

export default function Confetti({ count = 200 }: { count?: number }) {
  useEffect(() => {
    confetti({
      particleCount: count,
      spread: 60, // 확산 범위를 좁게 조절 (기존 70 -> 60)
      origin: { y: 0.6 }, // 화면 중앙 약간 아래에서 폭발
      colors: COLORS,
      shapes: ['circle'], // 원형 조각만 사용
      scalar: 0.7, // 크기를 조금 더 작고 귀엽게 조정
      gravity: 1.1, // 중력 효과를 주어 자연스럽게 낙하
      drift: 0,
      ticks: 200, // 지속 시간 조절
    })
  }, [])

  // canvas-confetti는 기본적으로 body에 canvas를 생성하여 동작하므로
  // 컴포넌트 자체는 렌더링할 요소를 반환하지 않아도 됩니다.
  return null
}
