import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import styles from './LoginPage.module.css'

const captchaImg = 'https://www.figma.com/api/mcp/asset/b0dfba29-3480-4499-9a73-3320007c54c6'
const logoDarkUrl = '/resources/logo_seoul_dark.png'

const TEMP_CREDENTIALS = { id: 'admin', password: '1234' }

// 애니메이션 변수
const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const formItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [id, setId] = useState('admin')
  const [password, setPassword] = useState('1234')
  const [captcha, setCaptcha] = useState('')
  const [saveId, setSaveId] = useState(true)
  const [error, setError] = useState('')
  const [captchaTimeLeft, setCaptchaTimeLeft] = useState(180)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCaptchaTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const handleRefreshCaptcha = () => {
    setCaptchaTimeLeft(180)
    startTimer()
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (id === TEMP_CREDENTIALS.id && password === TEMP_CREDENTIALS.password) {
      navigate('/home-loggedin')
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <GNB variant="light" />

        {/* 로그인 카드 */}
        <div className={styles.cardWrap}>
          <motion.div 
            className={styles.card}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* 왼쪽 배너 */}
            <div className={styles.banner}>
              <motion.video
                className={styles.bannerVideo}
                src="/resources/hero_banner.mp4"
                autoPlay
                loop
                muted
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <div className={styles.bannerOverlay} />
              <motion.div 
                className={styles.bannerLogo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <img src={logoDarkUrl} alt="서울특별시교육청" className={styles.bannerLogoImg} />
              </motion.div>
            </div>

            {/* 오른쪽 폼 */}
            <motion.div 
              className={styles.formArea}
              variants={formContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 className={styles.formTitle} variants={formItemVariants}>로그인</motion.h1>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formFields}>
                  <motion.div className={styles.field} variants={formItemVariants}>
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
                        <motion.button 
                          type="button" 
                          className={styles.clearBtn} 
                          onClick={() => setId('')}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="7" fill="#9ba5b7"/>
                            <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>

                  <motion.div className={styles.field} variants={formItemVariants}>
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
                  </motion.div>

                  <motion.div className={styles.captchaField} variants={formItemVariants}>
                    <label className={styles.label}>아래 문자를 보이는 대로 입력해주세요.</label>
                    <div className={styles.captchaRow}>
                      <img src={captchaImg} alt="captcha" className={styles.captchaImg} />
                      <div className={styles.captchaSide}>
                        <span className={styles.captchaTimer}>{formatTime(captchaTimeLeft)}</span>
                        <motion.button
                          type="button"
                          className={styles.captchaRefreshBtn}
                          onClick={handleRefreshCaptcha}
                          aria-label="새로고침"
                          whileHover={{ rotate: 180 }}
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M3.5 10a6.5 6.5 0 1 0 1.4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M3.5 5.5V10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                    <input
                      type="text"
                      className={`${styles.input} ${styles.captchaInput}`}
                      placeholder="자동입력 방지 문자"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                    />
                  </motion.div>
                </div>

                <div className={styles.formBottom}>
                  <motion.div className={styles.bottomRow} variants={formItemVariants}>
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
                  </motion.div>

                  <motion.div className={styles.loginBtnArea} variants={formItemVariants}>
                    {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--color-status-negative)', fontSize: 13, textAlign: 'center', margin: 0 }}>{error}</motion.p>}
                    <motion.button 
                      type="submit" 
                      className={styles.loginBtn}
                      whileHover={{ scale: 1.02, backgroundColor: '#1a73e8' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      로그인
                    </motion.button>
                    <div className={styles.registerRow}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="rgba(55,56,60,0.61)" strokeWidth="1.2"/>
                        <path d="M8 7v4M8 5.5v.5" stroke="rgba(55,56,60,0.61)" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <span className={styles.registerText}>계정이 없으신가요? </span>
                      <Link to="/register" className={styles.registerLink}>회원가입</Link>
                    </div>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  )
}
