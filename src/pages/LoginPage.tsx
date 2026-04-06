import { useState } from 'react'
import { Link } from 'react-router-dom'
import GNB from '../components/GNB'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [saveId, setSaveId] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.page}>
      <GNB variant="light" />

      <div className={styles.body}>
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2 className={styles.bannerTitle}>
              서울 학생 스마트 기기<br />
              통합 지원 서비스
            </h2>
            <p className={styles.bannerDesc}>
              교육용 단말 AS 접수부터 자가 해결까지,<br />
              한 곳에서 빠르게 해결하세요.
            </p>
          </div>
        </div>

        <div className={styles.formArea}>
          <div className={styles.formCard}>
            <h1 className={styles.formTitle}>로그인</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="login-id">아이디</label>
                <input
                  id="login-id"
                  type="text"
                  className={styles.input}
                  placeholder="아이디를 입력하세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="login-pw">비밀번호</label>
                <input
                  id="login-pw"
                  type="password"
                  className={styles.input}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <div className={styles.captchaRow}>
                <div className={styles.captchaBox}>
                  <span className={styles.captchaText}>A8K2</span>
                </div>
                <input
                  type="text"
                  className={styles.captchaInput}
                  placeholder="자동입력 방지 문자"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                />
              </div>

              <div className={styles.saveRow}>
                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={saveId}
                    onChange={(e) => setSaveId(e.target.checked)}
                  />
                  아이디 저장
                </label>
              </div>

              <button type="submit" className={styles.submitBtn}>
                로그인
              </button>
            </form>

            <div className={styles.footer}>
              <Link to="/register" className={styles.footerLink}>회원가입</Link>
              <span className={styles.footerDivider} />
              <Link to="/find-id" className={styles.footerLink}>아이디 찾기</Link>
              <span className={styles.footerDivider} />
              <Link to="/find-pw" className={styles.footerLink}>비밀번호 찾기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
