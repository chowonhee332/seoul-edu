import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import styles from './VideoGuidePage.module.css'

const laptopIcon = 'https://www.figma.com/api/mcp/asset/a846f534-4240-4403-b3eb-c4640ba35fbc'

const CATEGORIES = [
  { id: 1, label: '윈도우북' },
  { id: 2, label: '윈도우북' },
  { id: 3, label: '윈도우북' },
  { id: 4, label: '윈도우북' },
  { id: 5, label: '윈도우북' },
  { id: 6, label: '윈도우북' },
]

const VIDEOS = [
  { id: 1, no: 1, name: '윈도우북', maker: '삼성', serial: 'SN-001234', mgmt: 'GRD01', status: '정상' },
  { id: 2, no: 2, name: '윈도우북', maker: '삼성', serial: 'SN-001235', mgmt: 'GRD02', status: '정상' },
  { id: 3, no: 3, name: '윈도우북', maker: '삼성', serial: 'SN-001236', mgmt: 'GRD03', status: '정상' },
]

const PAGES = [1, 2, 3, 4, 5, 6, 7]

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

export default function VideoGuidePage() {
  const [checked, setChecked] = useState<number[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeCategory, setActiveCategory] = useState(1)

  const toggleAll = () => {
    if (allChecked) {
      setChecked([])
    } else {
      setChecked(VIDEOS.map((v) => v.id))
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
            <span className={styles.breadcrumbSub}>고객지원</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 3l3 3-3 3" stroke="#a0a0a1" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className={styles.breadcrumbText}>동영상 가이드</span>
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
            <motion.h1 className={styles.title} variants={itemVariants}>동영상 가이드</motion.h1>

            {/* 카테고리 카드 */}
            <motion.div className={styles.categoryCard} variants={itemVariants} whileHover={{ scale: 1.005 }}>
              {CATEGORIES.map((cat, i) => (
                <div key={cat.id} className={styles.categoryItem}>
                  <motion.button
                    className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.categoryActive : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ backgroundColor: '#f4f6fa' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={laptopIcon} alt="" width={32} height={32} className={styles.categoryIcon} />
                    <span className={styles.categoryLabel}>{cat.label}</span>
                  </motion.button>
                  {i < CATEGORIES.length - 1 && <div className={styles.categoryDivider} />}
                </div>
              ))}
            </motion.div>

            {/* 테이블 카드 */}
            <motion.div className={styles.tableCard} variants={itemVariants} whileHover={{ scale: 1.002 }}>
              {/* 툴바 */}
              <div className={styles.tableToolbar}>
                <span className={styles.totalCount}>총 20건</span>
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
                  <div className={styles.actionCell} />
                </div>

                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {VIDEOS.map((video) => (
                    <motion.div key={video.id} className={styles.tableRow} variants={itemVariants} whileHover={{ backgroundColor: '#fbfcfd' }}>
                      <div className={styles.checkCell}>
                        <span
                          className={`${styles.checkBox} ${checked.includes(video.id) ? styles.checked : ''}`}
                          onClick={() => toggleOne(video.id)}
                          role="checkbox"
                          aria-checked={checked.includes(video.id)}
                        >
                          {checked.includes(video.id) && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                      </div>
                      <div className={styles.noCell}>{video.no}</div>
                      <div className={`${styles.tdCell} ${styles.flex1}`}>{video.name}</div>
                      <div className={`${styles.tdCell} ${styles.flex1}`}>{video.maker}</div>
                      <div className={`${styles.tdCell} ${styles.flex1}`}>{video.serial}</div>
                      <div className={`${styles.tdCell} ${styles.flex1}`}>{video.mgmt}</div>
                      <div className={`${styles.tdCell} ${styles.flex1}`}>
                        <span className={styles.statusBadge}>{video.status}</span>
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
        </div>
      </div>

      <Footer />
    </TransitionLayout>
  )
}
