import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.links}>
          <Link to="/terms" className={styles.link}>이용약관</Link>
          <span className={styles.divider} />
          <Link to="/privacy" className={styles.link}>개인정보 처리방침</Link>
        </div>
        <p className={styles.copyright}>Copyright© kt ds All rights reserved.</p>
      </div>
    </footer>
  )
}
