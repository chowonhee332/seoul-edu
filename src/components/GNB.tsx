import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './GNB.module.css'

const logoDarkUrl = '/resources/logo_seoul_dark.png'
const logoLightUrl = '/resources/logo_seoul_light.png'

const MENUS = [
  {
    label: '현황 관리',
    path: '/status',
    children: [
      { label: '스마트기기 현황', path: '/status' },
    ],
  },
  {
    label: '스스로 해결',
    path: '/video-guide',
    children: [
      { label: '동영상 가이드', path: '/video-guide' },
      { label: '문제해결 Q&A', path: '/faq' },
      { label: '다운로드 센터', path: '/download' },
    ],
  },
  {
    label: '서비스 예약',
    path: '/as-reception',
    children: [
      { label: 'A/S접수 예약', path: '/as-reception' },
      { label: 'A/S접수 조회/변경', path: '/as-history' },
      { label: '작업 일정 접수', path: '/schedule' },
      { label: '작업 일정 접수 내역', path: '/schedule-history' },
    ],
  },
  {
    label: '고객 지원',
    path: '/notice',
    children: [
      { label: '공지사항', path: '/notice' },
      { label: '서비스센터 안내', path: '/service-center' },
    ],
  },
]

type GNBVariant = 'dark' | 'light'

function SearchIcon({ invert }: { invert?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="6.5" stroke={invert ? 'white' : '#171719'} strokeWidth="1.5"/>
      <path d="M16 16L20 20" stroke={invert ? 'white' : '#171719'} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ProfileIcon({ invert }: { invert?: boolean }) {
  const color = invert ? 'white' : '#171719'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth="1.5"/>
      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function GNB({ variant = 'light' }: { variant?: GNBVariant }) {
  const location = useLocation()
  const isDark = variant === 'dark'
  const [scrolled, setScrolled] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 다크 테마라도 스크롤하면 라이트처럼 표시
  const showLight = !isDark || scrolled

  return (
    <header className={`${styles.gnb} ${isDark ? styles.dark : styles.light} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        <img src={showLight ? logoLightUrl : logoDarkUrl} alt="서울특별시교육청" className={styles.logoImg} />
      </Link>

      <nav className={styles.menu}>
        {MENUS.map((m) => {
          const isActive = m.children.some((c) => location.pathname === c.path)
          return (
            <div 
              key={m.path} 
              className={styles.menuItemWrap}
              onMouseEnter={() => setHoveredMenu(m.label)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <span className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>
                {m.label}
              </span>
              <AnimatePresence>
                {hoveredMenu === m.label && (
                  <motion.div 
                    className={styles.dropdown}
                    initial={{ opacity: 0, y: -10, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -5, x: '-50%' }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {m.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={styles.dropdownItem}
                      >
                        <motion.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                          {child.label}
                        </motion.span>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M5 9h8M10 6l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="검색">
          <SearchIcon invert={!showLight} />
        </button>
        <Link to="/login" className={styles.iconBtn} aria-label="프로필">
          <ProfileIcon invert={!showLight} />
        </Link>
      </div>
    </header>
  )
}
