import { useState } from 'react'
import { Link } from 'react-router-dom'
import GNB from '../components/GNB'
import styles from './LoginPage.module.css'

const captchaImg = 'https://www.figma.com/api/mcp/asset/b0dfba29-3480-4499-9a73-3320007c54c6'
const refreshIcon = 'https://www.figma.com/api/mcp/asset/d50057af-b1b0-41e2-80e7-1cfbf6b83e30'
const soundIcon = 'https://www.figma.com/api/mcp/asset/ce182548-e0ff-449c-ba2c-0e483e6228cb'
const logoDarkUrl = '/resources/logo_seoul_dark.png'
const homeIcon = 'https://www.figma.com/api/mcp/asset/364910a3-8642-423b-82f2-cfffc8704d4f'

export default function LoginPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [saveId, setSaveId] = useState(true)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.page}>
      <GNB variant="light" />

      {/* 브레드크럼 */}
      <div className={styles.breadcrumb}>
        <img src={homeIcon} alt="홈" width={16} height={16} />
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 3l3 3-3 3" stroke="#171719" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span className={styles.breadcrumbCurrent}>로그인</span>
      </div>

      {/* 로그인 카드 */}
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          {/* 왼쪽 배너 */}
          <div className={styles.banner}>
            <video
              className={styles.bannerVideo}
              src="/resources/hero_banner.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className={styles.bannerOverlay} />
            <div className={styles.bannerLogo}>
              <img src={logoDarkUrl} alt="서울특별시교육청" className={styles.bannerLogoImg} />
            </div>
          </div>

          {/* 오른쪽 폼 */}
          <div className={styles.formArea}>
            <h1 className={styles.formTitle}>로그인</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formFields}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="login-id">아이디</label>
                  <div className={styles.inputWrap}>
                    <input
                      id="login-id"
                      type="text"
                      className={styles.input}
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      autoComplete="username"
                    />
                    {id && (
                      <button type="button" className={styles.clearBtn} onClick={() => setId('')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="7" fill="#9ba5b7"/>
                          <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="login-pw">비밀번호</label>
                  <input
                    id="login-pw"
                    type="password"
                    className={styles.input}
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>

                <div className={styles.captchaField}>
                  <label className={styles.label}>아래 문자를 보이는 대로 입력해주세요.</label>
                  <div className={styles.captchaRow}>
                    <img src={captchaImg} alt="captcha" className={styles.captchaImg} />
                    <div className={styles.captchaActions}>
                      <button type="button" className={styles.captchaActionBtn}>
                        <img src={refreshIcon} alt="" width={24} height={24} />
                        <span>새로고침</span>
                      </button>
                      <button type="button" className={styles.captchaActionBtn}>
                        <img src={soundIcon} alt="" width={24} height={24} />
                        <span>음성듣기</span>
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    className={`${styles.input} ${styles.captchaInput}`}
                    placeholder="자동입력 방지 문자"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formBottom}>
                <div className={styles.bottomRow}>
                  <label className={styles.checkLabel}>
                    <span className={`${styles.checkBox} ${saveId ? styles.checked : ''}`}>
                      {saveId && (
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      className={styles.checkHidden}
                      checked={saveId}
                      onChange={(e) => setSaveId(e.target.checked)}
                    />
                    아이디 저장
                  </label>
                  <div className={styles.findLinks}>
                    <Link to="/find-id" className={styles.findLink}>아이디 찾기</Link>
                    <span className={styles.pipe}>|</span>
                    <Link to="/find-pw" className={styles.findLink}>비밀번호 찾기</Link>
                  </div>
                </div>

                <div className={styles.loginBtnArea}>
                  <button type="submit" className={styles.loginBtn}>로그인</button>
                  <div className={styles.registerRow}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="rgba(55,56,60,0.61)" strokeWidth="1.2"/>
                      <path d="M8 7v4M8 5.5v.5" stroke="rgba(55,56,60,0.61)" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span className={styles.registerText}>계정이 없으신가요? </span>
                    <Link to="/register" className={styles.registerLink}>회원가입</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
