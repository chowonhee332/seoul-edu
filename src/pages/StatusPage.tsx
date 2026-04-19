import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants, itemVariants } from '../lib/animations'
import { MdChevronRight, MdKeyboardArrowDown, MdCheck, MdArrowUpward, MdSchool, MdAccessTime, MdArrowForward, MdDownload, MdSearch } from 'react-icons/md'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import CommonBoard from '../components/CommonBoard'
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
        <Breadcrumb currentLabel="스마트기기 현황" />

        <div className={styles.body}>
          <motion.div className={styles.inner} initial="hidden" animate="visible" variants={containerVariants}>
            <PageTitle title="스마트 기기 현황" variants={itemVariants} />

            <motion.div className={styles.summaryCard} variants={itemVariants}>
              <div className={styles.schoolRow}>
                <MdSchool size={24} color="#3d3f45" className={styles.schoolIcon} />
                <span className={styles.schoolName}>가락고등학교</span>
                <div className={styles.schoolDivider} />
                <span className={styles.schoolClass}>2학년 1반</span>
              </div>

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

            <motion.div className={styles.section} variants={itemVariants}>
              <div className={styles.sectionTop}>
                <h2 className={styles.sectionTitle}>보유제품</h2>
                <div className={styles.actionBtns}>
                  <button className={styles.btnGhost}>임의모델 분실신고</button>
                  <button className={styles.btnGhost}>단말 일괄변경</button>
                  <button className={styles.btnGhost}>엑셀 다운</button>
                  <button className={styles.btnPrimary}>AS 접수</button>
                  <button className={styles.btnPrimary}>분실신고</button>
                  <button className={styles.btnPrimary}>불용처리</button>
                </div>
              </div>

              <CommonBoard
                title="전체"
                totalCount={totalCount}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsCount={currentDevices.length}
                showSearch={false}
                rightElement={
                  <div className={styles.boardRightTools}>
                    <div className={styles.searchSelectArea}>
                      <button className={styles.selectBtn}>
                        관리번호 <MdKeyboardArrowDown size={16} />
                      </button>
                      <div className={styles.searchInputWrapSmall}>
                        <input type="text" placeholder="검색어를 입력해주세요" className={styles.boardSearchInput} />
                        <MdSearch size={18} color="#a0a0a1" />
                      </div>
                    </div>
                    <button className={styles.boardSortBtn}>
                      이름순 <MdKeyboardArrowDown size={16} />
                    </button>
                  </div>
                }
              >
                <div className={styles.tableScroll}>
                  <div className={styles.tableHead}>
                    <div className={styles.checkCell}>
                      <span className={`${styles.checkBox} ${checked.length === currentDevices.length && currentDevices.length > 0 ? styles.checked : ''}`} onClick={toggleAll}>
                        {checked.length === currentDevices.length && currentDevices.length > 0 && <MdCheck size={10} color="white" />}
                      </span>
                    </div>
                    <div className={styles.noCell}>No.</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>제품명</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>제조사</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>시리얼번호</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>관리번호</div>
                    <div className={`${styles.thCell} ${styles.flex1}`}>상태</div>
                    <div className={styles.actionCell} />
                  </div>
                <div className={styles.tableBody}>
                  <AnimatePresence mode="popLayout">
                    {currentDevices.map((device) => (
                      <motion.div key={device.id} className={styles.tableRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className={styles.checkCell}>
                          <span className={`${styles.checkBox} ${checked.includes(device.id) ? styles.checked : ''}`} onClick={() => toggleOne(device.id)}>
                            {checked.includes(device.id) && <MdCheck size={10} color="white" />}
                          </span>
                        </div>
                        <div className={styles.noCell}>{device.no}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>{device.name}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>{device.maker}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>{device.serial}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>{device.mgmt}</div>
                        <div className={`${styles.tdCell} ${styles.flex1}`}>
                          <span className={`${styles.statusBadge} ${device.status === '고장' ? styles.statusBadgeBroken : ''}`}>{device.status}</span>
                        </div>
                        <div className={styles.actionCell}>
                          <button className={styles.detailBtn}>상세보기 <MdChevronRight size={14} /></button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                </div>
              </CommonBoard>
            </motion.div>
          </motion.div>
        </div>

        <Footer />
        <button className={styles.fab} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <MdArrowUpward size={24} color="#171719" />
        </button>
      </div>
    </TransitionLayout>
  )
}
