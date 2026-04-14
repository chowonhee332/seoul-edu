import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MdSearch, MdPerson, MdArrowForward, MdMenu, MdClose } from 'react-icons/md'
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 드로어 열릴 때 스크롤 방지
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isDrawerOpen])

  useEffect(() => {
    // 페이지 이동 시 드로어 닫기
    setIsDrawerOpen(false)
  }, [location.pathname])

  // 다크 테마라도 스크롤하면 라이트처럼 표시
  const showLight = !isDark || scrolled

  return (
    <>
      <header className={`${styles.gnb} ${isDark ? styles.dark : styles.light} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo}>
            <img src={showLight ? logoLightUrl : logoDarkUrl} alt="서울특별시교육청" className={styles.logoImg} />
          </Link>
        </div>

        <nav className={styles.desktopMenu}>
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
          
          {/* 모바일 햄버거 버튼 - 우측 배치 */}
          <button 
            className={styles.menuToggleButton} 
            onClick={() => setIsDrawerOpen(true)}
            aria-label="메뉴 열기"
          >
            <MdMenu size={24} color={!showLight ? 'white' : '#171719'} />
          </button>
        </div>
      </header>

      {/* 모바일 내비게이션 드로어 */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              className={styles.drawerOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div 
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className={styles.drawerHeader}>
                <img src={logoLightUrl} alt="Logo" className={styles.logoImg} />
                <button className={styles.closeBtn} onClick={() => setIsDrawerOpen(false)}>
                  <MdClose size={24} />
                </button>
              </div>
              
              <div className={styles.drawerContent}>
                {MENUS.map((menu) => (
                  <div key={menu.label} className={styles.drawerSection}>
                    <h3 className={styles.drawerSectionTitle}>{menu.label}</h3>
                    <div className={styles.drawerLinks}>
                      {menu.children.map((child) => (
                        <Link 
                          key={child.path} 
                          to={child.path} 
                          className={`${styles.drawerLink} ${location.pathname === child.path ? styles.drawerLinkActive : ''}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
