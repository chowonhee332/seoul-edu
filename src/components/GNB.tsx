import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MdSearch, MdPerson, MdArrowForward } from 'react-icons/md'
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
                        <MdArrowForward size={18} />
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
          <MdSearch size={24} color={!showLight ? 'white' : '#171719'} />
        </button>
        <Link to="/login" className={styles.iconBtn} aria-label="프로필">
          <MdPerson size={24} color={!showLight ? 'white' : '#171719'} />
        </Link>
      </div>
    </header>
  )
}
