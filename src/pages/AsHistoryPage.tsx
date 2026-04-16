import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { verticalStepVariants, tableContainerVariants, rowVariants } from '../lib/animations'
import { MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import CommonBoard from '../components/CommonBoard'
import styles from './AsHistoryPage.module.css'

const PERIOD_TABS = ['1주일', '1개월', '3개월', '6개월']

const SAMPLE_ROWS = [
  { no: 9, date: '2026.04.14', productName: '갤럭시 탭 S9 FE', serialNumber: 'R3CWX1234567A', symptom: '화면 불량 (줄 생김 현상)', status: '정상' },
  { no: 8, date: '2026.04.13', productName: '갤럭시 탭 S9 FE', serialNumber: 'R3CWX1234567A', symptom: '화면 안나옴 (전원 불량 의심)', status: '정상' },
  { no: 7, date: '2026.04.12', productName: '갤럭시 탭 S9 FE', serialNumber: 'R3CWX1234567A', symptom: '충전 불량 (충전기 인식 안됨)', status: '정상' },
  { no: 6, date: '2026.04.11', productName: '갤럭시 탭 S9 FE', serialNumber: 'R3CWX1234567A', symptom: '소리 안들림 (스피커 불량)', status: '정상' },
  { no: 5, date: '2026.04.10', productName: '갤럭시 탭 S9 FE', serialNumber: 'R3CWX1234567A', symptom: '와이파이 연결 안됨', status: '정상' },
  { no: 4, date: '2026.04.09', productName: '갤럭시 탭 S9 FE', serialNumber: 'R3CWX1234567A', symptom: '발열 심함', status: '정상' },
  { no: 3, date: '2026.04.08', productName: '갤럭시 탭 S9 FE', serialNumber: 'R3CWX1234567A', symptom: '기기 속도 저하', status: '정상' },
  { no: 2, date: '2026.04.07', productName: '갤럭시 탭 S9 FE', serialNumber: 'R3CWX1234567A', symptom: '카메라 인식 불량', status: '정상' },
  { no: 1, date: '2026.04.06', productName: '갤럭시 탭 S9 FE', serialNumber: 'R3CWX1234567A', symptom: '배터리 광탈 현상', status: '정상' },
]


export default function AsHistoryPage() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [consent, setConsent] = useState(false)
  const [activePeriod, setActivePeriod] = useState(2)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <Breadcrumb currentLabel="AS 접수 조회·변경" />

        <div className={styles.body}>
          <div className={styles.inner}>
            <PageTitle>
              {step === 0 ? 'AS 접수 조회 · 변경' : 'A/S 접수 조회 · 변경'}
            </PageTitle>

            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div 
                  key="step0"
                  className={styles.formCard}
                  variants={verticalStepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className={styles.formInner}>
                    <h2 className={styles.formTitle}>접수자 정보를 입력해주세요.</h2>
                    <div className={styles.fields}>
                      <div className={styles.field}>
                        <label className={styles.label}>이름</label>
                        <input type="text" className={styles.input} placeholder="이름을 입력해주세요." value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>휴대폰</label>
                        <div className={styles.inputWithBtn}>
                          <input type="tel" className={styles.input} placeholder="'-'를 제외하고 숫자 입력" value={phone} onChange={(e) => setPhone(e.target.value)} />
                          <button type="button" className={styles.btnVerify}>인증 받기</button>
                        </div>
                        <div className={styles.codeRow}>
                          <div className={styles.inputTimerWrap}>
                            <input type="text" className={styles.input} placeholder="123456" value={code} onChange={(e) => setCode(e.target.value)} />
                            <span className={styles.inputTimer}>00:00</span>
                          </div>
                          <button type="button" className={styles.btnConfirm}>확인</button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.consentRow}>
                      <div className={styles.consentLeft}>
                        <input type="checkbox" id="consent" className={styles.checkbox} checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                        <label htmlFor="consent" className={styles.consentLabel}>개인정보 수집/이용 동의</label>
                      </div>
                      <button type="button" className={styles.btnTextLink}>전문보기 <MdChevronRight size={18} /></button>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button type="button" className={styles.btnNext} onClick={() => setStep(1)}>다음</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="step1"
                  className={styles.resultsSection}
                  variants={verticalStepVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className={styles.filterCard}>
                    <label className={styles.filterLabel}>조회기간</label>
                    <div className={styles.periodTabs}>
                      {PERIOD_TABS.map((tab, i) => (
                        <button key={tab} className={`${styles.periodTab} ${i === activePeriod ? styles.periodTabActive : ''}`} onClick={() => setActivePeriod(i)}>{tab}</button>
                      ))}
                    </div>
                    <input type="date" className={styles.dateInput} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <span className={styles.dateSep}>-</span>
                    <input type="date" className={styles.dateInput} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <button type="button" className={styles.btnSearch}>조회</button>
                  </div>

                  <CommonBoard
                    title="A/S 접수 내역"
                    totalCount={17}
                    currentPage={currentPage}
                    totalPages={Math.ceil(17 / 10)}
                    onPageChange={setCurrentPage}
                    itemsCount={currentPage === 1 ? 10 : 7}
                    showSearch={false}
                    header={
                      <div className={styles.tableHeaderRow}>
                        <div className={styles.thNo}>No.</div>
                        <div className={styles.thDate}>접수일</div>
                        <div className={styles.thProduct}>제품명</div>
                        <div className={styles.thSerial}>일련번호</div>
                        <div className={styles.thSymptom}>증상</div>
                        <div className={styles.thStatus}>처리현황</div>
                      </div>
                    }
                  >
                    <div className={styles.tableBody}>
                      <AnimatePresence mode="popLayout">
                        {Array.from({ length: 17 }).map((_, idx) => {
                          const no = 17 - idx;
                          const pageStart = (currentPage - 1) * 10;
                          const pageEnd = currentPage * 10;
                          if (idx < pageStart || idx >= pageEnd) return null;

                          return (
                            <motion.div 
                              key={no} 
                              className={styles.tr} 
                              variants={rowVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              <div className={styles.tdNo}>{no}</div>
                              <div className={styles.tdDate}>2026.04.10</div>
                              <div className={styles.tdProduct}>LG 노트북 Gram</div>
                              <div className={styles.tdSerial}>ABC123456789</div>
                              <div className={styles.tdSymptom}>부팅 속도가 너무 느리고 가끔 멈춤 현상이 발생합니다.</div>
                              <div className={styles.tdStatus}>
                                <span className={styles.statusBadge}>정상</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </CommonBoard>
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
