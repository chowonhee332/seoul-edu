import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const logoUrl = '/resources/logo_seoul_light.png'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <img src={logoUrl} alt="서울특별시교육청" className={styles.logoImg} />
        </div>
        <div className={styles.info}>
          <div className={styles.links}>
            <Link to="/terms" className={styles.link}>이용약관</Link>
            <span className={styles.divider} />
            <Link to="/privacy" className={styles.link}>개인정보 처리방침</Link>
          </div>
          <p className={styles.copyright}>Copyright© kt ds All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
