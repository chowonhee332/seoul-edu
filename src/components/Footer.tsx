import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const logoGroupUrl = 'https://www.figma.com/api/mcp/asset/a0786f32-553d-4a17-a6c3-58614c32b681'
const logoTextUrl = 'https://www.figma.com/api/mcp/asset/f9044e53-8d45-4953-975c-51330400ea3c'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoArea}>
          <img src={logoGroupUrl} alt="" className={styles.logoIcon} />
          <img src={logoTextUrl} alt="서울특별시교육청" className={styles.logoText} />
        </div>

        <div className={styles.links}>
          <Link to="/terms" className={styles.link}>이용약관</Link>
          <span className={styles.divider} />
          <Link to="/privacy" className={styles.linkBold}>개인정보처리방침</Link>
        </div>

        <p className={styles.copyright}>
          Copyright © 2025 Seoul Metropolitan Office of Education. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
