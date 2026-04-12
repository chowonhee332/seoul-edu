import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import styles from './StatusPage.module.css'

const icoSchool = 'https://www.figma.com/api/mcp/asset/611eed75-0da3-417c-b884-acdd3ed773ad'

const SUMMARY = [
  { model: '태블릿 (iOS/Android)', total: 125, normal: 122, broken: 2, lost: 1 },
  { model: '노트북 (Chrome/Windows)', total: 54, normal: 52, broken: 2, lost: 0 },
  { model: '기타 기기', total: 3, normal: 3, broken: 0, lost: 0 },
]

const DEVICES = [
  { id: 1, no: 1, name: 'iPad Air 5세대', maker: '애플', serial: 'R54T7023ELX', mgmt: 'GRD-01-001', status: '정상' },
  { id: 2, no: 2, name: 'iPad Air 5세대', maker: '애플', serial: 'R54T7023EM1', mgmt: 'GRD-01-002', status: '정상' },
  { id: 3, no: 3, name: 'iPad Air 5세대', maker: '애플', serial: 'R54T7024K92', mgmt: 'GRD-01-003', status: '고장' },
  { id: 4, no: 4, name: 'Galaxy Tab S8', maker: '삼성', serial: 'S98F2021A1B', mgmt: 'GRD-02-001', status: '정상' },
  { id: 5, no: 5, name: 'Galaxy Tab S8', maker: '삼성', serial: 'S98F2021A1C', mgmt: 'GRD-02-002', status: '정상' },
]

const PAGES = [1, 2, 3, 4, 5, 6, 7]

function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// 애니메이션 변수
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export default function StatusPage() {
  const [checked, setChecked] = useState<number[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const toggleAll = () => {
    if (allChecked) {
      setChecked([])
    } else {
      setChecked(DEVICES.map((d) => d.id))
    }
    setAllChecked(!allChecked)
  }

  const toggleOne = (id: number) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <GNB variant="light" />

        {/* 브레드크럼 */}
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbInner}>
            <Link to="/" className={styles.breadcrumbHome}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 6.5L8 2l6 4.5V14H10v-3H6v3H2V6.5z" fill="#171719"/>
              </svg>
            </Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 3l3 3-3 3" stroke="#a0a0a1" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className={styles.breadcrumbText}>스마트 기기 현황</span>
          </div>
        </div>

        {/* 본문 */}
        <div className={styles.body}>
          <motion.div 
            className={styles.inner}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 className={styles.title} variants={itemVariants}>스마트 기기 현황</motion.h1>

            {/* 기기 요약 카드 */}
            <motion.div 
              className={styles.summaryCard}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              {/* 학교/학급 정보 */}
              <div className={styles.schoolRow}>
                <img src={icoSchool} alt="" width={24} height={24} className={styles.schoolIcon} />
                <span className={styles.schoolName}>가락고등학교</span>
                <div className={styles.schoolDivider} />
                <span className={styles.schoolClass}>2학년 1반</span>
              </div>

              {/* 자산 요약표 */}
              <div className={styles.summaryTable}>
                <div className={styles.summaryHeader}>
                  <div className={`${styles.summaryHeaderCell} ${styles.colAsset}`}>자산</div>
                  <div className={`${styles.summaryHeaderCell} ${styles.colFlex}`}>전체</div>
                  <div className={`${styles.summaryHeaderCell} ${styles.colFlex}`}>정상</div>
                  <div className={`${styles.summaryHeaderCell} ${styles.colFlex}`}>고장</div>
                  <div className={`${styles.summaryHeaderCell} ${styles.colFlex}`}>분실</div>
                </div>
                {SUMMARY.map((row) => (
                  <div key={row.model} className={styles.summaryRow}>
                    <div className={`${styles.summaryDataCell} ${styles.colAsset}`}>{row.model}</div>
                    <div className={`${styles.summaryDataCell} ${styles.colFlex}`}>{row.total}</div>
                    <div className={`${styles.summaryDataCell} ${styles.colFlex}`}>{row.normal}</div>
                    <div className={`${styles.summaryDataCell} ${styles.colFlex}`}>{row.broken}</div>
                    <div className={`${styles.summaryDataCell} ${styles.colFlex}`}>{row.lost}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 보유제품 섹션 */}
            <motion.div className={styles.section} variants={itemVariants}>
              <div className={styles.sectionTop}>
                <h2 className={styles.sectionTitle}>보유제품</h2>
                <div className={styles.actionBtns}>
                  <motion.button className={styles.btnGhost} whileHover={{ backgroundColor: '#f4f6fa' }} whileTap={{ scale: 0.95 }}>
                    임의모델 분실신고
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </motion.button>
                  <motion.button className={styles.btnGhost} whileHover={{ backgroundColor: '#f4f6fa' }} whileTap={{ scale: 0.95 }}>
                    단말 일괄변경
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                  <motion.button className={styles.btnGhost} whileHover={{ backgroundColor: '#f4f6fa' }} whileTap={{ scale: 0.95 }}>
                    엑셀 다운
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v8m-3-3l3 3 3-3M4 13h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </motion.button>
                  <motion.button className={styles.btnPrimary} whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.95 }}>AS 접수</motion.button>
                  <motion.button className={styles.btnPrimary} whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.95 }}>분실신고</motion.button>
                  <motion.button className={styles.btnPrimary} whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.95 }}>불용처리</motion.button>
                </div>
              </div>

              {/* 테이블 카드 */}
              <motion.div className={styles.tableCard} whileHover={{ scale: 1.005 }} transition={{ duration: 0.3 }}>
                {/* 툴바 */}
                <div className={styles.tableToolbar}>
                  <span className={styles.totalCount}>총 20건</span>
                  <div className={styles.tableFilters}>
                    <div className={styles.searchBox}>
                      <button className={styles.searchDropdown}>
                        관리번호
                        <ChevronDown size={14} />
                      </button>
                      <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="검색어를 입력해주세요."
                      />
                      <motion.button className={styles.searchBtn} aria-label="검색" whileTap={{ scale: 0.9 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="7" cy="7" r="4.5" stroke="#171719" strokeWidth="1.2"/>
                          <path d="M10.5 10.5l2.5 2.5" stroke="#171719" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </motion.button>
                    </div>
                    <button className={styles.sortBtn}>
                      이름순
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>

                {/* 테이블 */}
                <div className={styles.table}>
                  <div className={styles.tableHead}>
                    <div className={styles.checkCell}>
                      <span
                        className={`${styles.checkBox} ${allChecked ? styles.checked : ''}`}
                        onClick={toggleAll}
                        role="checkbox"
                        aria-checked={allChecked}
                      >
                        {allChecked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                    </div>
                    <div className={styles.noCell}>No.</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>제품명</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>제조사</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>일련번호</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>관리번호</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>상태</div>
                    <div className={`${styles.actionCell} ${styles.tableHead}`} />
                  </div>

                  <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    {DEVICES.map((device) => (
                      <motion.div key={device.id} className={styles.tableRow} variants={itemVariants} whileHover={{ backgroundColor: '#fbfcfd' }}>
                        <div className={styles.checkCell}>
                          <span
                            className={`${styles.checkBox} ${checked.includes(device.id) ? styles.checked : ''}`}
                            onClick={() => toggleOne(device.id)}
                            role="checkbox"
                            aria-checked={checked.includes(device.id)}
                          >
                            {checked.includes(device.id) && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </span>
                        </div>
                        <div className={styles.noCell}>{device.no}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>{device.name}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>{device.maker}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>{device.serial}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>{device.mgmt}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>
                          <span className={`${styles.statusBadge} ${device.status === '고장' ? styles.statusBadgeBroken : ''}`}>
                            {device.status}
                          </span>
                        </div>
                        <div className={styles.actionCell}>
                          <motion.button className={styles.detailBtn} whileHover={{ x: 3 }}>
                            상세보기
                            <ChevronRight size={14} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* 페이지네이션 */}
                <div className={styles.pagination}>
                  <motion.button
                    className={styles.pageBtn}
                    onClick={() => setCurrentPage(1)}
                    aria-label="첫 페이지"
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M9 4L5 8l4 4M12 4L8 8l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    className={styles.pageBtn}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    aria-label="이전 페이지"
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M9 4L5 8l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                  {PAGES.map((p) => (
                    <motion.button
                      key={p}
                      className={`${styles.pageNumBtn} ${currentPage === p ? styles.pageActive : ''}`}
                      onClick={() => setCurrentPage(p)}
                      whileHover={{ backgroundColor: '#f4f6fa' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {p}
                    </motion.button>
                  ))}
                  <motion.button
                    className={styles.pageBtn}
                    onClick={() => setCurrentPage(Math.min(7, currentPage + 1))}
                    aria-label="다음 페이지"
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    className={styles.pageBtn}
                    onClick={() => setCurrentPage(7)}
                    aria-label="마지막 페이지"
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l4 4-4 4M7 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <Footer />

        <motion.button
          className={styles.fab}
          aria-label="위로 이동"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="#171719" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </TransitionLayout>
  )
}
