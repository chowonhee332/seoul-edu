import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, Variants } from 'framer-motion'
import { MdHome, MdChevronRight, MdChevronLeft, MdKeyboardArrowDown, MdFirstPage, MdLastPage, MdCheck, MdSearch, MdAccessTime, MdArrowForward, MdDownload, MdArrowUpward, MdSchool } from 'react-icons/md'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import styles from './StatusPage.module.css'


const SUMMARY = [
  { model: '태블릿 (iOS/Android)', total: 125, normal: 122, broken: 2, lost: 1 },
  { model: '노트북 (Chrome/Windows)', total: 54, normal: 52, broken: 2, lost: 0 },
  { model: '기타 기기', total: 3, normal: 3, broken: 0, lost: 0 },
]

const DEVICES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  no: i + 1,
  name: i < 10 ? 'iPad Air 5세대' : 'Galaxy Tab S8',
  maker: i < 10 ? '애플' : '삼성',
  serial: `SN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  mgmt: `GRD-${(i < 10 ? '01' : '02')}-${(i + 1).toString().padStart(3, '0')}`,
  status: i === 2 ? '고장' : '정상'
}));

// 애니메이션 변수
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export default function StatusPage() {
  const [checked, setChecked] = useState<number[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const ITEMS_PER_PAGE = 10;
  const totalCount = DEVICES.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const currentDevices = DEVICES.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleAll = () => {
    if (allChecked) {
      setChecked([])
    } else {
      setChecked(currentDevices.map((d) => d.id))
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

        <Breadcrumb currentLabel="스마트기기 현황" />

        {/* 본문 */}
        <div className={styles.body}>
          <motion.div 
            className={styles.inner}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <PageTitle title="스마트 기기 현황" variants={itemVariants} />

            {/* 기기 요약 카드 */}
            <motion.div
              className={styles.summaryCard}
              variants={itemVariants}
            >
              {/* 학교/학급 정보 */}
              <div className={styles.schoolRow}>
                <MdSchool size={24} color="#3d3f45" className={styles.schoolIcon} />
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
                  <motion.button className={styles.btnGhost} whileTap={{ scale: 0.95 }}>
                    임의모델 분실신고
                    <MdAccessTime size={14} />
                  </motion.button>
                  <motion.button className={styles.btnGhost} whileTap={{ scale: 0.95 }}>
                    단말 일괄변경
                    <MdArrowForward size={14} />
                  </motion.button>
                  <motion.button className={styles.btnGhost} whileTap={{ scale: 0.95 }}>
                    엑셀 다운
                    <MdDownload size={14} />
                  </motion.button>
                  <motion.button className={styles.btnPrimary} whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.95 }}>AS 접수</motion.button>
                  <motion.button className={styles.btnPrimary} whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.95 }}>분실신고</motion.button>
                  <motion.button className={styles.btnPrimary} whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.95 }}>불용처리</motion.button>
                </div>
              </div>

              {/* 테이블 카드 */}
              <div className={styles.tableCard}>
                {/* 툴바 */}
                <div className={styles.tableToolbar}>
                  <div className={styles.totalCountArea}>
                    <span className={styles.categoryNameDisplay}>전체</span>
                    <span className={styles.countDivider}>|</span>
                    <span className={styles.countValueDisplay}>{totalCount}건</span>
                  </div>
                  <div className={styles.tableFilters}>
                    <div className={styles.searchBox}>
                      <button className={styles.searchDropdown}>
                        관리번호
                        <MdKeyboardArrowDown size={14} />
                      </button>
                      <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="검색어를 입력해주세요."
                      />
                      <motion.button className={styles.searchBtn} aria-label="검색" whileTap={{ scale: 0.9 }}>
                        <MdSearch size={16} color="#171719" />
                      </motion.button>
                    </div>
                    <button className={styles.sortBtn}>
                      이름순
                      <MdKeyboardArrowDown size={14} />
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
                        {allChecked && <MdCheck size={10} color="white" />}
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
                    {currentDevices.map((device) => (
                      <motion.div key={device.id} className={styles.tableRow} variants={itemVariants}>
                        <div className={styles.checkCell}>
                          <span
                            className={`${styles.checkBox} ${checked.includes(device.id) ? styles.checked : ''}`}
                            onClick={() => toggleOne(device.id)}
                            role="checkbox"
                            aria-checked={checked.includes(device.id)}
                          >
                            {checked.includes(device.id) && <MdCheck size={10} color="white" />}
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
                            <MdChevronRight size={14} />
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
                    <MdFirstPage size={16} />
                  </motion.button>
                  <motion.button
                    className={styles.pageBtn}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    aria-label="이전 페이지"
                    whileTap={{ scale: 0.9 }}
                  >
                    <MdChevronLeft size={16} />
                  </motion.button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    aria-label="다음 페이지"
                    whileTap={{ scale: 0.9 }}
                  >
                    <MdChevronRight size={16} />
                  </motion.button>
                  <motion.button
                    className={styles.pageBtn}
                    onClick={() => setCurrentPage(totalPages)}
                    aria-label="마지막 페이지"
                    whileTap={{ scale: 0.9 }}
                  >
                    <MdLastPage size={16} />
                  </motion.button>
                </div>
              </div>
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
          <MdArrowUpward size={24} color="#171719" />
        </motion.button>
      </div>
    </TransitionLayout>
  )
}
