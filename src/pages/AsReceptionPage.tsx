import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { MdHome, MdChevronRight, MdCheck } from 'react-icons/md'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Confetti from '../components/Confetti'
import Breadcrumb from '../components/Breadcrumb'
import styles from './AsReceptionPage.module.css'

const STEPS = ['접수자 정보', '학교정보 입력', '제품/증상 선택', '접수 완료']


// 애니메이션 변수
const stepVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export default function AsReceptionPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [consent, setConsent] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (codeSent && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [codeSent, timeLeft])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const handleSendCode = () => {
    setCodeSent(true)
    setTimeLeft(180)
  }

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  const handleComplete = () => {
    navigate('/as-history')
  }

  const renderStep1 = () => (
    <motion.div key="step1" className={styles.formInner} variants={stepVariants} initial="initial" animate="animate" exit="exit">
      <h2 className={styles.formTitle}>접수자 정보를 입력해주세요.</h2>
      <div className={styles.fields}>
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label className={styles.label} htmlFor="as-name">이름</label>
            <span className={styles.dot} />
          </div>
          <input
            id="as-name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.labelRowCompact}>
            <label className={styles.label} htmlFor="as-phone">휴대폰</label>
            <span className={styles.dot} />
          </div>
          <div className={styles.inputWithBtn}>
            <input
              id="as-phone"
              type="tel"
              className={styles.input}
              placeholder="'-'를 제외하고 숫자 입력"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <motion.button
              type="button"
              className={`${styles.btnVerify} ${!phone ? styles.btnVerifyDisabled : ''}`}
              onClick={handleSendCode}
              disabled={!phone}
              whileTap={{ scale: 0.95 }}
            >
              인증 받기
            </motion.button>
          </div>

          {codeSent && (
            <motion.div className={styles.inputWithBtn} style={{ marginTop: 8 }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <div className={styles.inputTimerWrap}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="인증번호 6자리 숫자 입력"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  maxLength={6}
                />
                {timeLeft > 0 && (
                  <span className={styles.inputTimer}>{formatTime(timeLeft)}</span>
                )}
              </div>
              <motion.button
                type="button"
                className={styles.btnConfirm}
                whileTap={{ scale: 0.95 }}
              >
                확인
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      <div className={styles.consentRow}>
        <div className={styles.consentLeft}>
          <input
            type="checkbox"
            id="as-consent"
            className={styles.checkbox}
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label htmlFor="as-consent" className={styles.consentLabel}>
            개인정보 수집/이용 동의
          </label>
        </div>
        <motion.button type="button" className={styles.btnTextLink} whileHover={{ x: 3 }}>
          전문보기
          <MdChevronRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div key="step2" className={styles.formInner} variants={stepVariants} initial="initial" animate="animate" exit="exit">
      <h2 className={styles.formTitle}>학교정보를 입력해주세요.</h2>
      <div className={styles.placeholderBox}>
        <p className={styles.placeholderText}>학교정보 입력 영역</p>
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div key="step3" className={styles.formInner} variants={stepVariants} initial="initial" animate="animate" exit="exit">
      <h2 className={styles.formTitle}>제품/증상을 선택해주세요.</h2>
      <div className={styles.placeholderBox}>
        <p className={styles.placeholderText}>제품 및 증상 선택 영역</p>
      </div>
    </motion.div>
  )

  const renderStep4 = () => (
    <motion.div key="step4" className={styles.formInner} variants={stepVariants} initial="initial" animate="animate" exit="exit">
      <div className={styles.completionBox}>
        <Confetti count={60} />
        <motion.div 
          className={styles.completionIcon}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ 
            scale: [0, 1.4, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ 
            duration: 0.6,
            times: [0, 0.7, 1],
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
        >
          <MdCheck size={28} color="#1a75ff" />
        </motion.div>
        <h2 className={styles.completionTitle}>접수가 완료되었습니다.</h2>
        <p className={styles.completionDesc}>
          AS 접수가 정상적으로 완료되었습니다.<br/>
          접수 내역은 'AS 접수내역' 메뉴에서 확인하실 수 있습니다.
        </p>
      </div>
    </motion.div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderStep1()
      case 1: return renderStep2()
      case 2: return renderStep3()
      case 3: return renderStep4()
      default: return null
    }
  }

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <GNB variant="light" />

        <Breadcrumb currentLabel="AS 접수하기" />

        <div className={styles.body}>
          <div className={styles.inner}>
            <motion.h1 className={styles.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>AS 접수하기</motion.h1>

            {/* 스텝 인디케이터 */}
            <motion.div className={styles.stepCard} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className={styles.stepList}>
                {STEPS.map((label, i) => [
                  <div key={`step-${i}`} className={styles.stepItem}>
                    <motion.div 
                      className={`${styles.stepCircle} ${i === currentStep ? styles.stepActive : ''} ${i < currentStep ? styles.stepDone : ''}`}
                      animate={i === currentStep ? { scale: [1, 1.1, 1] } : {}}
                    >
                      {i < currentStep ? (
                        <MdCheck size={20} color="white" />
                      ) : String(i + 1).padStart(2, '0')}
                    </motion.div>
                    <span className={`${styles.stepLabel} ${i === currentStep ? styles.stepLabelActive : ''} ${i < currentStep ? styles.stepLabelDone : ''}`}>
                      {label}
                    </span>
                  </div>,
                  i < STEPS.length - 1 && (
                    <div 
                      key={`line-${i}`} 
                      className={`${styles.stepLine} ${i < currentStep ? styles.stepLineDone : ''}`} 
                    />
                  ),
                ])}
              </div>
            </motion.div>

            {/* 폼 카드 */}
            <motion.div className={styles.formCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>

              {/* 네비게이션 버튼 */}
              <div className={`${styles.actions} ${currentStep > 0 ? styles.actionsRow : ''}`}>
                {currentStep > 0 && currentStep < STEPS.length - 1 && (
                  <motion.button type="button" className={styles.btnPrev} onClick={handlePrevStep} whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
                    이전
                  </motion.button>
                )}
                {currentStep < STEPS.length - 1 && (
                  <motion.button type="button" className={styles.btnNext} onClick={handleNextStep} whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
                    다음
                  </motion.button>
                )}
                {currentStep === STEPS.length - 1 && (
                  <motion.button type="button" className={styles.btnNext} onClick={handleComplete} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    접수 내역 확인
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </TransitionLayout>
  )
}
