import { Link, useLocation } from 'react-router-dom'
import styles from './GNB.module.css'

const logoGroupUrl = 'https://www.figma.com/api/mcp/asset/a0786f32-553d-4a17-a6c3-58614c32b681'
const logoTextUrl = 'https://www.figma.com/api/mcp/asset/f9044e53-8d45-4953-975c-51330400ea3c'

const MENUS = [
  { label: '현황 관리', path: '/status' },
  { label: '스스로 해결', path: '/self-help' },
  { label: '서비스 예약', path: '/reservation' },
  { label: '고객 지원', path: '/support' },
]

type GNBVariant = 'dark' | 'light'

export default function GNB({ variant = 'dark' }: { variant?: GNBVariant }) {
  const location = useLocation()

  return (
    <header className={`${styles.gnb} ${variant === 'light' ? styles.light : styles.dark}`}>
      <Link to="/" className={styles.logo}>
        <img src={logoGroupUrl} alt="" className={styles.logoIcon} />
        <img src={logoTextUrl} alt="서울특별시교육청" className={styles.logoText} />
      </Link>

      <nav className={styles.menu}>
        {MENUS.map((m) => (
          <Link
            key={m.path}
            to={m.path}
            className={`${styles.menuItem} ${location.pathname === m.path ? styles.active : ''}`}
          >
            {m.label}
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="검색">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <Link to="/login" className={styles.iconBtn} aria-label="프로필">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 19c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </header>
  )
}
