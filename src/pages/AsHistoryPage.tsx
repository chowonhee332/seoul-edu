import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { MdHome, MdChevronRight, MdChevronLeft, MdKeyboardArrowDown, MdFirstPage, MdLastPage } from 'react-icons/md'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import styles from './AsHistoryPage.module.css'

const PERIOD_TABS = ['1주일', '1개월', '3개월', '6개월']

const SAMPLE_ROWS = [
  {
    no: 3,
    date: '2026.04.10',
    productName: '갤럭시 탭 S9 FE',
    serialNumber: 'R3CWX1234567A',
    symptom: '화면 불량 (줄 생김 현상)',
    status: '정상',
  },
  {
    no: 2,
    date: '2026.04.10',
    productName: '갤럭시 탭 S9 FE',
    serialNumber: 'R3CWX1234567A',
    symptom: '화면 안나옴 (전원 불량 의심)',
    status: '정상',
  },
  {
    no: 1,
    date: '2026.04.10',
    productName: '갤럭시 탭 S9 FE',
    serialNumber: 'R3CWX1234567A',
    symptom: '충전 불량 (충전기 인식 안됨)',
    status: '정상',
  },
]

// 애니메이션 변수
const stepVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const tableContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 }
}

export default function AsHistoryPage() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [consent, setConsent] = useState(false)
  const [activePeriod, setActivePeriod] = useState(2)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleNext = () => {
    setStep(1)
  }

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <GNB variant="light" />

        <Breadcrumb currentLabel="AS 접수 조회·변경" />

        <div className={styles.body}>
          <div className={styles.inner}>
            <PageTitle>
              {step === 0 ? 'AS 접수 조회 · 변경' : 'A/S 접수 조회 · 변경'}
            </PageTitle>

            <AnimatePresence mode="wait">
              {step === 0 ? (
                /* ── Step 0: Identity verification ── */
                <motion.div 
                  key="step0"
                  className={styles.formCard}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.formInner}>
                    <h2 className={styles.formTitle}>접수자 정보를 입력해주세요.</h2>

                    <div className={styles.fields}>
                      {/* 이름 */}
                      <div className={styles.field}>
                        <label className={styles.label}>이름</label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="이름을 입력해주세요."
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      {/* 휴대폰 */}
                      <div className={styles.field}>
                        <label className={styles.label}>휴대폰</label>
                        <div className={styles.inputWithBtn}>
                          <input
                            type="tel"
                            className={styles.input}
                            placeholder="'-'를 제외하고 숫자 입력"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <motion.button 
                            type="button" 
                            className={styles.btnVerify}
                            whileTap={{ scale: 0.95 }}
                          >
                            인증 받기
                          </motion.button>
                        </div>
                        <div className={styles.codeRow}>
                          <div className={styles.inputTimerWrap}>
                            <input
                              type="text"
                              className={styles.input}
                              placeholder="123456"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                            />
                            <span className={styles.inputTimer}>00:00</span>
                          </div>
                          <motion.button 
                            type="button" 
                            className={styles.btnConfirm}
                            whileTap={{ scale: 0.95 }}
                          >
                            확인
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* 동의 */}
                    <div className={styles.consentRow}>
                      <div className={styles.consentLeft}>
                        <input
                          type="checkbox"
                          id="consent"
                          className={styles.checkbox}
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                        />
                        <label htmlFor="consent" className={styles.consentLabel}>
                          개인정보 수집/이용 동의
                        </label>
                      </div>
                      <motion.button 
                        type="button" 
                        className={styles.btnTextLink} 
                        whileHover={{ x: 3 }}
                      >
                        전문보기 <MdChevronRight size={18} />
                      </motion.button>
                    </div>
                  </div>

                  {/* 다음 버튼: formInner 밖으로 이동하여 카드 우측 끝 정렬 */}
                  <div className={styles.actions}>
                    <motion.button 
                      type="button" 
                      className={styles.btnNext}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(1)}
                    >
                      다음
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* ── Step 1: Results ── */
                <motion.div 
                  key="step1"
                  className={styles.resultsSection}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {/* 검색 필터 카드 */}
                  <div className={styles.filterCard}>
                    <label className={styles.filterLabel}>조회기간</label>
                    <div className={styles.periodTabs}>
                      {PERIOD_TABS.map((tab, i) => (
                        <motion.button
                          key={tab}
                          type="button"
                          className={`${styles.periodTab} ${i === activePeriod ? styles.periodTabActive : ''}`}
                          onClick={() => setActivePeriod(i)}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tab}
                        </motion.button>
                      ))}
                    </div>
                    <input
                      type="date"
                      className={styles.dateInput}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="YYYY / MM / DD"
                    />
                    <span className={styles.dateSep}>-</span>
                    <input
                      type="date"
                      className={styles.dateInput}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      placeholder="YYYY / MM / DD"
                    />
                    <motion.button 
                      type="button" 
                      className={styles.btnSearch}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ opacity: 0.9 }}
                    >
                      조회
                    </motion.button>
                  </div>

                  {/* A/S 접수 내역 섹션 */}
                  <h2 className={styles.sectionTitle}>A/S 접수 내역</h2>

                  {/* 결과 테이블 */}
                  <div className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                      <span className={styles.totalCount}>총 {SAMPLE_ROWS.length}건</span>
                      <div className={styles.sortSelect}>
                        <span>이름순</span>
                        <MdKeyboardArrowDown size={16} color="#70737c" />
                      </div>
                    </div>

                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th className={styles.th}>No.</th>
                          <th className={styles.th}>접수일</th>
                          <th className={styles.th}>제품명</th>
                          <th className={styles.th}>일련번호</th>
                          <th className={styles.th}>증상</th>
                          <th className={styles.th}>처리현황</th>
                        </tr>
                      </thead>
                      <motion.tbody
                        variants={tableContainerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {SAMPLE_ROWS.map((row) => (
                          <motion.tr key={row.no} className={styles.tr} variants={rowVariants}>
                            <td className={styles.td}>{row.no}</td>
                            <td className={styles.td}>{row.date}</td>
                            <td className={styles.td}>{row.productName}</td>
                            <td className={styles.td}>{row.serialNumber}</td>
                            <td className={`${styles.td} ${styles.flex1}`}>{row.symptom}</td>
                            <td className={styles.td}>
                              <span className={styles.statusBadge}>{row.status}</span>
                            </td>
                          </motion.tr>
                        ))}
                      </motion.tbody>
                    </table>

                    {/* 페이지네이션 */}
                    <div className={styles.pagination}>
                      <motion.button className={styles.pageBtn} aria-label="첫 페이지" whileTap={{ scale: 0.9 }}>
                        <MdFirstPage size={16} />
                      </motion.button>
                      <motion.button className={styles.pageBtn} aria-label="이전 페이지" whileTap={{ scale: 0.9 }}>
                        <MdChevronLeft size={16} />
                      </motion.button>
                      {[1,2,3,4,5,6,7].map((p) => (
                        <motion.button 
                          key={p} 
                          className={`${styles.pageNumBtn} ${p === 1 ? styles.pageActive : ''}`}
                          whileHover={{ backgroundColor: '#f4f6fa' }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {p}
                        </motion.button>
                      ))}
                      <motion.button className={styles.pageBtn} aria-label="다음 페이지" whileTap={{ scale: 0.9 }}>
                        <MdChevronRight size={16} />
                      </motion.button>
                      <motion.button className={styles.pageBtn} aria-label="마지막 페이지" whileTap={{ scale: 0.9 }}>
                        <MdLastPage size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Footer />
      </div>
    </TransitionLayout>
  )
}
