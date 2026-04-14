import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { MdNorthEast, MdChevronRight, MdAccessTime, MdVisibility, MdSearch, MdArrowUpward, MdSchool } from 'react-icons/md'
import GNB from '../components/GNB'
import QuickServiceBar from '../components/QuickServiceBar'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import styles from './HomeLoggedInPage.module.css'



const AS_STATUSES = [
  { label: '접수완료', count: 6, hasArrow: false },
  { label: '수리중', count: 2, hasArrow: true },
  { label: '수리완료', count: 4, hasArrow: false },
  { label: '취소', count: 15, hasArrow: false },
]

const PRODUCTS = [
  { id: 0, name: '전체', count: 6 },
  { id: 1, name: '아이패드 Air', count: 3 },
  { id: 2, name: "맥북 프로 15'", count: 2 },
  { id: 3, name: '갤럭시 탭 S7', count: 1 },
]

const SELF_HELP_ITEMS = [
  // 아이패드 Air (ID: 1)
  { id: 1, productId: 1, type: '동영상', typeColor: '#1a75ff', title: 'iPad Air 5세대 메모리를 분리하거나 장착할 수 있나요?', date: '2024.06.19.', views: '4,602' },
  { id: 2, productId: 1, type: '동영상', typeColor: '#1a75ff', title: 'iPad Air(5세대)는 방수 기능이 있나요?', date: '2024.06.20.', views: '3,781' },
  { id: 3, productId: 1, type: '다운로드', typeColor: '#ff761a', title: 'iPad Air 배터리 소모가 너무 빨라요. 수명이 얼마나 되나요?', date: '2024.06.21.', views: '5,012' },
  { id: 4, productId: 1, type: '다운로드', typeColor: '#ff761a', title: 'iPad Air에서 지원하는 최대 해상도는 무엇인가요?', date: '2024.06.22.', views: '2,450' },
  
  // 맥북 프로 (ID: 2)
  { id: 5, productId: 2, type: '동영상', typeColor: '#1a75ff', title: 'MacBook Pro 15인치 램 업그레이드 가이드', date: '2024.05.10.', views: '12,204' },
  { id: 6, productId: 2, type: '다운로드', typeColor: '#ff761a', title: 'MacBook Pro용 최신 펌웨어 업데이트 (v2.4)', date: '2024.05.15.', views: '8,930' },
  
  // 갤럭시 탭 (ID: 3)
  { id: 7, productId: 3, type: '동영상', typeColor: '#1a75ff', title: 'Galaxy Tab S7 S펜 설정 및 활용 팁', date: '2024.04.12.', views: '7,115' },
  { id: 8, productId: 3, type: '다운로드', typeColor: '#ff761a', title: 'Galaxy Tab S7 사용 설명서 PDF', date: '2024.04.20.', views: '3,420' },
]

const NOTICES = [
  { id: 1, title: '[안내] 시스템 점검에 따른 일부 서비스 이용 제한 안내 (5월 31일 20시 이후)', date: '2024. 05. 12', isNew: true },
  { id: 2, title: '[안내] 시스템 점검에 따른 일부 서비스 이용 제한 안내 (5월 31일 20시 이후)', date: '2024. 05. 12', isNew: true },
  { id: 3, title: '[공지] 서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024. 06. 10', isNew: false },
  { id: 4, title: '[업데이트] 새로운 기능 추가 안내 (7월 1일 배포 예정)', date: '2024. 06. 25', isNew: true },
]


// 애니메이션 변수
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
}

export default function HomeLoggedInPage() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[1].id)

  const currentProduct = PRODUCTS.find(p => p.id === selectedProduct) ?? PRODUCTS[1]

  const filteredItems = selectedProduct === 0 
    ? SELF_HELP_ITEMS 
    : SELF_HELP_ITEMS.filter(item => item.productId === selectedProduct)

  return (
    <TransitionLayout>
      <div className={styles.page}>
        {/* 히어로 배너 영역 */}
        <div className={styles.hero}>
          <video
            className={styles.heroBg}
            src="/resources/hero_banner.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className={styles.heroOverlay} />
          <GNB variant="dark" />

          {/* 히어로 텍스트 */}
          <motion.div 
            className={styles.heroText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={styles.heroName}>조원희님</p>
            <p className={styles.heroSubtitle}>무엇을 도와드릴까요?</p>
          </motion.div>
        </div>

        {/* 퀵 서비스 바 */}
        <QuickServiceBar />

        {/* 메인 콘텐츠 */}
        <div className={styles.main}>
          <motion.div 
            className={styles.inner}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >

            {/* 최근활동 섹션 */}
            <motion.div className={styles.section} variants={itemVariants}>
              <div className={styles.activityHeader}>
                <h2 className={styles.activityTitle}>최근활동</h2>
                <span className={styles.activityPeriod}>최근 3개월 기준</span>
              </div>

              {/* 외부 흰색 카드 */}
              <div className={styles.asCardOuter}>
                {/* 학교 정보 행 */}
                <div className={styles.asSchoolRow}>
                  <MdSchool size={24} color="#3d3f45" className={styles.asSchoolIcon} />
                  <span className={styles.asSchoolName}>가락고등학교</span>
                  <div className={styles.asSchoolDivider} />
                  <span className={styles.asSchoolClass}>2학년 1반</span>
                </div>

                {/* AS 카드 */}
                <div className={styles.asCard}>
                  {/* 왼쪽: 그라디언트 블루 */}
                  <Link to="/as-history" className={styles.asCardLeft}>
                    <div className={styles.asCardTopRow}>
                      <span className={styles.asCardLabel}>A/S 예약</span>
                      <MdNorthEast color="rgba(255,255,255,0.9)" className={styles.asCardHoverArrow} />
                    </div>
                    <div className={styles.asCardCount}>
                      <span className={styles.asCardNum}>27</span>
                      <span className={styles.asCardUnit}>건</span>
                    </div>
                  </Link>

                  {/* 오른쪽: 상태 컬럼들 */}
                  <div className={styles.asStatusArea}>
                    {AS_STATUSES.map((status, idx) => (
                      <Link
                        key={status.label}
                        to="/as-history"
                        className={`${styles.asStatusCol} ${idx < AS_STATUSES.length - 1 ? styles.asStatusColDivider : ''}`}
                      >
                          <div className={styles.asStatusLabelRow}>
                            <span className={styles.asStatusLabel}>{status.label}</span>
                            <MdNorthEast size={16} color="#171719" className={styles.hoverArrow} />
                          </div>
                          <div className={styles.asStatusCount}>
                            <span className={styles.asStatusNum}>{status.count}</span>
                            <span className={styles.asStatusUnit}>건</span>
                          </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 보유 제품 섹션 */}
            <motion.div className={styles.section} variants={itemVariants}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>보유 제품</h2>
              </div>
              <div className={styles.chipRow}>
                {PRODUCTS.map((product) => (
                  <motion.button
                    key={product.id}
                    className={`${styles.chip} ${selectedProduct === product.id ? styles.chipActive : ''}`}
                    onClick={() => setSelectedProduct(product.id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.chipName}>{product.name}</span>
                    <span className={`${styles.chipBadge} ${selectedProduct === product.id ? styles.chipBadgeActive : ''}`}>
                      {product.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* 스스로 해결 카드 (검색 + 목록) */}
            <motion.div className={styles.selfHelpCard} variants={itemVariants}>
              <div className={styles.searchArea}>
                <p className={styles.searchCardTitle}>
                  {currentProduct.id !== 0 && (
                    <span className={styles.searchCardProduct}>{currentProduct.name}</span>
                  )}
                  <span className={styles.searchCardQuestion}>
                    {currentProduct.id === 0 ? '' : ' '}문제에 대한 증상이나 궁금증을 검색해주세요.
                  </span>
                </p>
                <div className={styles.searchInputWrap}>
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="검색어를 입력해주세요"
                  />
                  <MdSearch size={24} color="#a0a0a1" />
                </div>
              </div>
              <div className={styles.selfHelpList}>
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <motion.div 
                      key={item.id} 
                      className={styles.listRow}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.listRowLeft}>
                        <span
                          className={styles.tag}
                          style={{ color: item.typeColor, background: `${item.typeColor}1a` }}
                        >
                          {item.type}
                        </span>
                        <span className={styles.listTitle}>{item.title}</span>
                      </div>
                      <div className={styles.listMeta}>
                        <span className={styles.metaItem}>
                          <MdAccessTime size={16} color="rgba(46,47,51,0.88)" />
                          {item.date}
                        </span>
                        <span className={styles.metaDivider} />
                        <span className={styles.metaItem}>
                          <MdVisibility size={16} color="rgba(46,47,51,0.88)" />
                          {item.views}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* 공지사항 */}
            <motion.div className={styles.section} variants={itemVariants}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>공지사항</h2>
                <Link to="/notice" className={styles.moreBtn}>
                  전체보기
                  <MdChevronRight />
                </Link>
              </div>
              <div className={styles.card}>
                {NOTICES.map((item) => (
                  <motion.div key={item.id} className={styles.noticeRow} >
                    <div className={styles.noticeTitle}>
                      <span className={styles.noticeTitleText}>{item.title}</span>
                      <span className={styles.badge}>
                        {item.isNew ? 'N' : 'Y'}
                      </span>
                    </div>
                    <span className={styles.noticeDate}>{item.date}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <Footer />

        {/* FAB 상단으로 */}
        <motion.button
          className={styles.fab}
          aria-label="위로 이동"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
          whileTap={{ scale: 0.9 }}
        >
          <MdArrowUpward size={24} color="#171719" />
        </motion.button>
      </div>
    </TransitionLayout>
  )
}
