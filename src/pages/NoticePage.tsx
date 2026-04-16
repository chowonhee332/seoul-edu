import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants, itemVariants } from '../lib/animations'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import CommonBoard from '../components/CommonBoard'
import styles from './NoticePage.module.css'

// ── 공지사항 샘플 데이터 ─────────────────────────────────
const NOTICES = [
  { id: 12, no: 12, title: '[안내] 2026년 스마트기기 정기 점검 일정 안내',              date: '2026. 04. 10', views: 142 },
  { id: 11, no: 11, title: '[공지] 서버 유지보수로 인한 서비스 중단 안내 (4월 5일)',     date: '2026. 04. 02', views: 310 },
  { id: 10, no: 10, title: '[업데이트] 충전함 펌웨어 v3.1.0 배포 안내',               date: '2026. 03. 27', views: 3 },
  { id: 9,  no: 9,  title: 'SDP 공지사항',                                           date: '2026. 01. 27', views: 24 },
  { id: 8,  no: 8,  title: '0126 테스트 공지사항',                                    date: '2026. 01. 26', views: 28 },
  { id: 7,  no: 7,  title: '[안내] 갤럭시탭 MDM 정책 업데이트 적용 안내',              date: '2025. 12. 20', views: 87 },
  { id: 6,  no: 6,  title: '[공지] 연말 A/S 접수 마감일 안내 (12월 27일)',             date: '2025. 12. 15', views: 204 },
  { id: 5,  no: 5,  title: '[업데이트] Windows 드라이버 패키지 v1.9 배포',            date: '2025. 11. 30', views: 175 },
  { id: 4,  no: 4,  title: '[안내] 학교별 스마트기기 현황 조회 기능 개선 안내',         date: '2025. 11. 10', views: 92 },
  { id: 3,  no: 3,  title: '[공지] 시스템 점검에 따른 일부 서비스 이용 제한 안내',      date: '2025. 10. 28', views: 431 },
  { id: 2,  no: 2,  title: '[안내] A/S 접수 절차 변경 안내 (10월 1일부터 적용)',       date: '2025. 10. 05', views: 318 },
  { id: 1,  no: 1,  title: '[공지] 서울특별시교육청 스마트기기 관리 시스템 오픈 안내',  date: '2025. 09. 01', views: 1024 },
]

const ITEMS_PER_PAGE = 10
type SortOption = 'latest' | 'views'


export default function NoticePage() {
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  const sortedNotices = [...NOTICES].sort((a, b) => {
    if (sortBy === 'views') return b.views - a.views
    return b.no - a.no
  })

  const totalPages = Math.max(1, Math.ceil(sortedNotices.length / ITEMS_PER_PAGE))
  const currentItems = sortedNotices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handleItemClick = (item: typeof NOTICES[0]) => {
    navigate('/content-detail', {
      state: {
        item: { ...item, type: '공지', views: item.views.toString() },
        list: sortedNotices.map((n) => ({ ...n, type: '공지', views: n.views.toString() })),
        fromPath: '/notice',
        fromLabel: '공지사항',
      },
    })
  }

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <Breadcrumb currentLabel="공지사항" />

        <div className={styles.body}>
          <motion.div
            className={styles.inner}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <PageTitle title="공지사항" variants={itemVariants} />

            <CommonBoard
              title="공지사항"
              totalCount={NOTICES.length}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showSearch={false} /* 공지사항은 검색창 일단 비노출 */
              itemsCount={currentItems.length}
              header={
                <div className={styles.tableHead}>
                  <div className={styles.noCell}>No.</div>
                  <div className={`${styles.thCell} ${styles.flex1}`}>제목</div>
                  <div className={`${styles.thCell} ${styles.dateCell}`}>등록일</div>
                  <div className={`${styles.thCell} ${styles.viewsCell}`}>조회수</div>
                </div>
              }
            >
              <div className={styles.table}>
                <AnimatePresence mode="popLayout">
                  {currentItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className={styles.tableRow}
                      onClick={() => handleItemClick(item)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className={styles.noCell}>{item.no}</div>
                      <div className={`${styles.tdCell} ${styles.flex1}`}>{item.title}</div>
                      <div className={`${styles.tdCell} ${styles.dateCell}`}>{item.date}</div>
                      <div className={`${styles.tdCell} ${styles.viewsCell}`}>{item.views}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CommonBoard>
          </motion.div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  )
}
