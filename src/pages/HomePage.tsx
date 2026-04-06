import { Link } from 'react-router-dom'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import styles from './HomePage.module.css'

const QUICK_MENUS = [
  { icon: '📋', label: 'AS 접수' },
  { icon: '🔍', label: 'AS 조회/변경' },
  { icon: '💻', label: '단말 현황' },
  { icon: '📍', label: '서비스센터 안내' },
]

const SELF_HELP_ITEMS = [
  { id: 1, title: '노트북이 켜지지 않아요', category: '전원/배터리' },
  { id: 2, title: '화면이 검게 나와요', category: '디스플레이' },
  { id: 3, title: '인터넷 연결이 안 돼요', category: '네트워크' },
  { id: 4, title: '키보드 일부 키가 동작하지 않아요', category: '키보드/마우스' },
  { id: 5, title: '소리가 나오지 않아요', category: '사운드' },
]

const NOTICES = [
  { id: 1, date: '2025.03.20', title: '2025년 1학기 교육용 단말 AS 일정 안내' },
  { id: 2, date: '2025.03.15', title: '서비스센터 운영 시간 변경 안내 (4월~)' },
  { id: 3, date: '2025.03.10', title: '노트북 배터리 관련 안전 공지사항' },
  { id: 4, date: '2025.03.05', title: '교육용 단말 관리 시스템 업데이트 안내' },
]

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <GNB variant="dark" />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            서울 학생 스마트 기기<br />
            통합 지원 서비스
          </h1>
          <p className={styles.heroDesc}>
            교육용 단말 AS 접수부터 자가 해결까지,<br />
            한 곳에서 빠르게 해결하세요.
          </p>
        </div>
      </div>

      <div className={styles.quickSection}>
        <div className={styles.inner}>
          <div className={styles.quickGrid}>
            {QUICK_MENUS.map((item) => (
              <button key={item.label} className={styles.quickBtn}>
                <span className={styles.quickIcon}>{item.icon}</span>
                <span className={styles.quickLabel}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.loginPrompt}>
        <div className={styles.inner}>
          <div className={styles.loginCard}>
            <p className={styles.loginMsg}>로그인하고 더 많은 서비스를 이용하세요.</p>
            <Link to="/login" className={styles.loginBtn}>로그인</Link>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.inner}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>스스로 해결</h2>
                <Link to="/self-help" className={styles.moreLink}>더보기</Link>
              </div>
              <ul className={styles.selfHelpList}>
                {SELF_HELP_ITEMS.map((item) => (
                  <li key={item.id} className={styles.selfHelpItem}>
                    <span className={styles.selfHelpCategory}>{item.category}</span>
                    <span className={styles.selfHelpTitle}>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.column}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>공지사항</h2>
                <Link to="/notice" className={styles.moreLink}>더보기</Link>
              </div>
              <ul className={styles.noticeList}>
                {NOTICES.map((item) => (
                  <li key={item.id} className={styles.noticeItem}>
                    <span className={styles.noticeTitle}>{item.title}</span>
                    <span className={styles.noticeDate}>{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
