import { Link, useLocation } from 'react-router-dom'
import styles from './GNB.module.css'

const logoDarkUrl = '/resources/logo_seoul_dark.png'
const logoLightUrl = '/resources/logo_seoul_light.png'
const searchIconDarkUrl = 'https://www.figma.com/api/mcp/asset/404582d3-04c4-4d95-9162-c673c614fe63'
const profileIconDarkUrl = 'https://www.figma.com/api/mcp/asset/5f465e9f-5dc9-4128-ad6c-39d9ebb8e650'

const MENUS = [
  { label: '현황 관리', path: '/status' },
  { label: '스스로 해결', path: '/self-help' },
  { label: '서비스 예약', path: '/reservation' },
  { label: '고객 지원', path: '/support' },
]

type GNBVariant = 'dark' | 'light'

export default function GNB({ variant = 'light' }: { variant?: GNBVariant }) {
  const location = useLocation()
  const isDark = variant === 'dark'

  return (
    <header className={`${styles.gnb} ${isDark ? styles.dark : styles.light}`}>
      <Link to="/" className={styles.logo}>
        <img src={isDark ? logoDarkUrl : logoLightUrl} alt="서울특별시교육청" className={styles.logoImg} />
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
          <img src={searchIconDarkUrl} alt="" width={24} height={24} className={isDark ? styles.iconInvert : ''} />
        </button>
        <Link to="/login" className={styles.iconBtn} aria-label="프로필">
          <img src={profileIconDarkUrl} alt="" width={24} height={24} className={isDark ? styles.iconInvert : ''} />
        </Link>
      </div>
    </header>
  )
}
