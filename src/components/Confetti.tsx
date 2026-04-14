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

export default function Confetti({ count = 300 }: { count?: number }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: count,
        spread: 360, // 360도 전 방향으로 확산
        startVelocity: 30, // 폭발 속도 증가
        origin: { y: 0.5 }, // 화면 중앙(아이콘 위치)에서 시작
        colors: COLORS,
        shapes: ['circle'],
        scalar: 0.7,
        gravity: 0.8, // 사방으로 더 잘 퍼지게 중력 소폭 완화
        ticks: 100,
      })
    }, 200) // 200ms 지연 후 실행 (거의 바로 터지도록 단축)

    return () => clearTimeout(timer)
  }, [count])

  // canvas-confetti는 기본적으로 body에 canvas를 생성하여 동작하므로
  // 컴포넌트 자체는 렌더링할 요소를 반환하지 않아도 됩니다.
  return null
}
