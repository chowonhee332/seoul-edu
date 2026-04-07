import { useState } from 'react'
import { Link } from 'react-router-dom'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import styles from './StatusPage.module.css'

const SUMMARY = [
  { model: 'Android_모델', total: 54, normal: 52, broken: 2, lost: 1 },
  { model: 'iOS_모델', total: 3, normal: '-', broken: '-', lost: '-' },
  { model: 'Windows_모델', total: 125, normal: 52, broken: 2, lost: 1 },
]

const DEVICES = [
  { id: 1, no: 1, name: '충전함', maker: '애플', serial: 'R54T7023ELX', mgmt: 'GRD02', status: '정상' },
  { id: 2, no: 2, name: '충전함', maker: '애플', serial: 'R54T7023ELX', mgmt: 'GRD02', status: '정상' },
  { id: 3, no: 3, name: '충전함', maker: '애플', serial: 'R54T7023ELX', mgmt: 'GRD02', status: '정상' },
]

const PAGES = [1, 2, 3, 4, 5, 6, 7]

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
    <div className={styles.page}>
      <GNB variant="light" />

      {/* 브레드크럼 */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbHome}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 6.5L8 2l6 4.5V14H10v-3H6v3H2V6.5z" fill="#171719"/>
          </svg>
        </Link>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 3l3 3-3 3" stroke="#171719" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span className={styles.breadcrumbText}>스마트 기기 현황</span>
      </div>

      {/* 본문 */}
      <div className={styles.body}>
        <div className={styles.inner}>
          <h1 className={styles.title}>스마트 기기 현황</h1>

          {/* 학교 선택 */}
          <div className={styles.schoolBar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 10.5L12 4l9 6.5V20H15v-4h-6v4H3V10.5z" stroke="#171719" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <span className={styles.schoolName}>가락고등학교</span>
          </div>

          {/* 자산 요약표 */}
          <div className={styles.summaryTable}>
            <div className={styles.summaryHeader}>
              <div className={styles.summaryCell} style={{ width: 220 }}>자산</div>
              <div className={`${styles.summaryCell} ${styles.flex1}`}>전체</div>
              <div className={`${styles.summaryCell} ${styles.flex1}`}>정상</div>
              <div className={`${styles.summaryCell} ${styles.flex1}`}>고장</div>
              <div className={`${styles.summaryCell} ${styles.flex1}`}>분실</div>
            </div>
            {SUMMARY.map((row, i) => (
              <div key={i} className={`${styles.summaryRow} ${i < SUMMARY.length - 1 ? styles.bordered : ''}`}>
                <div className={styles.summaryDataCell} style={{ width: 220 }}>{row.model}</div>
                <div className={`${styles.summaryDataCell} ${styles.flex1}`}>{row.total}</div>
                <div className={`${styles.summaryDataCell} ${styles.flex1}`}>{row.normal}</div>
                <div className={`${styles.summaryDataCell} ${styles.flex1}`}>{row.broken}</div>
                <div className={`${styles.summaryDataCell} ${styles.flex1}`}>{row.lost}</div>
              </div>
            ))}
          </div>

          {/* 보유제품 섹션 */}
          <div className={styles.section}>
            <div className={styles.sectionTop}>
              <h2 className={styles.sectionTitle}>보유제품</h2>
              <div className={styles.actionBtns}>
                <button className={styles.btnGhost}>
                  임의모델 분실신고
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 2v4l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className={styles.btnGhost}>
                  단말 일괄변경
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M10 5l3 3-3 3M6 5L3 8l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className={styles.btnGhost}>
                  엑셀 다운
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8m-3-3l3 3 3-3M4 13h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className={styles.btnPrimary}>AS 접수</button>
                <button className={styles.btnPrimary}>분실신고</button>
                <button className={styles.btnPrimary}>불용처리</button>
              </div>
            </div>

            <div className={styles.tableToolbar}>
              <span className={styles.totalCount}>20건</span>
              <div className={styles.tableFilters}>
                <div className={styles.searchInput}>
                  <span className={styles.searchLabel}>
                    관리번호
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 9l4-4" stroke="#212121" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span className={styles.searchPlaceholder}>검색어를 입력해주세요.</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="4.5" stroke="#171719" strokeWidth="1.2"/>
                    <path d="M10.5 10.5l2.5 2.5" stroke="#171719" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <button className={styles.sortBtn}>
                  이름순
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
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

              {DEVICES.map((device) => (
                <div key={device.id} className={styles.tableRow}>
                  <div className={styles.checkCell}>
                    <span
                      className={`${styles.checkBox} ${checked.includes(device.id) ? styles.checked : ''}`}
                      onClick={() => toggleOne(device.id)}
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
                    <span className={styles.statusBadge}>{device.status}</span>
                  </div>
                  <div className={styles.actionCell}>
                    <button className={styles.detailBtn}>
                      상세보기
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className={styles.pagination}>
              <button className={styles.pageBtn} onClick={() => setCurrentPage(1)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M9 4L5 8l4 4M12 4L8 8l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className={styles.pageBtn} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M9 4L5 8l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
              {PAGES.map((p) => (
                <button
                  key={p}
                  className={`${styles.pageNumBtn} ${currentPage === p ? styles.pageActive : ''}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
              <button className={styles.pageBtn} onClick={() => setCurrentPage(Math.min(7, currentPage + 1))}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className={styles.pageBtn} onClick={() => setCurrentPage(7)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l4 4-4 4M7 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <button
        className={styles.fab}
        aria-label="위로 이동"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
