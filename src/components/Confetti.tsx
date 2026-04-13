import { motion } from 'framer-motion'
import { useMemo } from 'react'

const COLORS = ['#1A75FF', '#FF761A', '#00C853', '#FFD600', '#FF4242', '#E8F0FE']

interface ConfettiPieceProps {
  delay: number
  color: string
  angle: number
  distance: number
}

const ConfettiPiece = ({ delay, color, angle, distance }: ConfettiPieceProps) => {
  const radian = (angle * Math.PI) / 180
  const x = Math.cos(radian) * distance
  const y = Math.sin(radian) * distance

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
      animate={{
        x: [0, x, x + (Math.random() - 0.5) * 20],
        y: [0, y, y + 150 + Math.random() * 100], // 폭발 후 아래로 떨어짐
        scale: [0, 1, 0.5, 0],
        opacity: [1, 1, 0.8, 0],
        rotate: [0, Math.random() * 360, Math.random() * 720],
      }}
      transition={{
        duration: 2.5 + Math.random() * 1,
        delay: delay,
        ease: [0.23, 1, 0.32, 1], // 초기 폭발은 빠르게, 이후 부드럽게
      }}
      style={{
        position: 'absolute',
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '2px' : '50%',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    />
  )
}

export default function Confetti({ count = 50 }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      delay: Math.random() * 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * 360,
      distance: 100 + Math.random() * 150,
    }))
  }, [count])

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'visible' }}>
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} {...p} />
      ))}
    </div>
  )
}
