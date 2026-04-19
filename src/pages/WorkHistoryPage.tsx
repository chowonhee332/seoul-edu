import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { rowVariants } from '../lib/animations'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import CommonBoard from '../components/CommonBoard'
import styles from './WorkHistoryPage.module.css'

const PERIOD_TABS = ['1주일', '1개월', '3개월', '6개월']

const SAMPLE_ROWS = [
  { no: 11, manager: '조원희', visitDate: '2026-04-19 09:00', receptionDate: '2026-04-19 09:00', phone1: '010-1234-5678', phone2: '-', canCancel: true },
  { no: 10, manager: '조원희', visitDate: '2026-04-19 09:00', receptionDate: '2026-04-19 09:00', phone1: '010-1234-5678', phone2: '010-2345-6789', canCancel: true },
  { no: 9, manager: '박수진', visitDate: '2026-04-18 10:00', receptionDate: '2026-04-15 11:20', phone1: '010-2233-4455', phone2: '-', canCancel: false },
  { no: 8, manager: '박수진', visitDate: '2026-03-24 14:00', receptionDate: '2026-03-20 16:37', phone1: '010-5566-7788', phone2: '-', canCancel: false },
  { no: 7, manager: '이철수', visitDate: '2026-03-12 09:00', receptionDate: '2026-03-10 10:00', phone1: '010-9988-7766', phone2: '010-1122-3344', canCancel: false },
  { no: 6, manager: '김영희', visitDate: '2026-02-28 11:00', receptionDate: '2026-02-25 14:10', phone1: '010-4455-6677', phone2: '-', canCancel: false },
  { no: 5, manager: '조원희', visitDate: '2026-02-15 13:00', receptionDate: '2026-02-14 09:50', phone1: '010-1234-5678', phone2: '-', canCancel: false },
  { no: 4, manager: '박수진', visitDate: '2026-02-05 15:00', receptionDate: '2026-02-01 13:20', phone1: '010-2233-4455', phone2: '-', canCancel: false },
  { no: 3, manager: '이철수', visitDate: '2026-01-30 09:00', receptionDate: '2026-01-25 09:00', phone1: '010-9988-7766', phone2: '-', canCancel: false },
  { no: 2, manager: '김영희', visitDate: '2026-01-20 10:00', receptionDate: '2026-01-15 11:10', phone1: '010-4455-6677', phone2: '-', canCancel: false },
  { no: 1, manager: '조원희', visitDate: '2026-01-10 14:00', receptionDate: '2026-01-08 16:30', phone1: '010-1234-5678', phone2: '-', canCancel: false },
]


export default function WorkHistoryPage() {
  const [activePeriod, setActivePeriod] = useState(2)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedRows = SAMPLE_ROWS.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const totalPages = Math.ceil(SAMPLE_ROWS.length / ITEMS_PER_PAGE)

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <Breadcrumb currentLabel="작업 일정 접수 내역" />

        <div className={styles.body}>
          <div className={styles.inner}>
            <h1 className={styles.sectionTitle}>작업 일정 접수 내역</h1>
            <div className={styles.resultsSection}>
              <div className={styles.filterCard}>
                <div className={styles.filterRow}>
                  <label className={styles.filterLabel}>조회기간</label>
                  <div className={styles.periodTabs}>
                    {PERIOD_TABS.map((tab, i) => (
                      <button key={tab} className={`${styles.periodTab} ${i === activePeriod ? styles.periodTabActive : ''}`} onClick={() => setActivePeriod(i)}>{tab}</button>
                    ))}
                  </div>
                </div>
                <div className={styles.dateRow}>
                  <input type="text" className={styles.dateInput} placeholder="YYYY / MM / DD" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  <span className={styles.dateSep}>-</span>
                  <input type="text" className={styles.dateInput} placeholder="YYYY / MM / DD" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className={styles.filterActions}>
                  <button type="button" className={styles.btnSearch}>조회</button>
                </div>
              </div>

              <CommonBoard
                title="작업 일정 접수 내역"
                totalCount={SAMPLE_ROWS.length}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsCount={displayedRows.length}
                showSearch={false}
              >
                <div className={styles.tableScroll}>
                <div className={styles.tableHeaderRow}>
                    <div className={styles.thNo}>No.</div>
                    <div className={styles.thManager}>담당자</div>
                    <div className={styles.thVisit}>방문 일시</div>
                    <div className={styles.thReception}>접수 일시</div>
                    <div className={styles.thPhone}>연락처1</div>
                    <div className={styles.thPhone}>연락처2</div>
                    <div className={styles.thCancel}>취소</div>
                  </div>
                <div className={styles.tableBody}>
                  <AnimatePresence mode="popLayout">
                    {displayedRows.map((row) => (
                      <motion.div key={row.no} className={styles.tr} variants={rowVariants} initial="hidden" animate="visible">
                        <div className={styles.tdNo}>{row.no}</div>
                        <div className={styles.tdManager}>{row.manager}</div>
                        <div className={styles.tdVisit}>{row.visitDate}</div>
                        <div className={styles.tdReception}>{row.receptionDate}</div>
                        <div className={styles.tdPhone}>{row.phone1}</div>
                        <div className={styles.tdPhone}>{row.phone2}</div>
                        <div className={styles.tdCancel}>
                          {row.canCancel && (
                            <button className={styles.statusBadge} style={{ cursor: 'pointer', background: 'white' }}>취소</button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                </div>
              </CommonBoard>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  )
}
