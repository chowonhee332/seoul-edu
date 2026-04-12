import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import styles from './HomeLoggedInPage.module.css'

// Quick service bar icons (refreshed from Figma)
const icoConsulting = 'https://www.figma.com/api/mcp/asset/f5a4640a-61c8-45ff-8be1-0e2328f10f3f'
const icoAsReception = 'https://www.figma.com/api/mcp/asset/ead1167b-af56-49e8-b9a8-82692978216f'
const icoTablet = 'https://www.figma.com/api/mcp/asset/2dc71935-de13-4d9a-8004-0192d1c73f10'
const icoSchool = 'https://www.figma.com/api/mcp/asset/611eed75-0da3-417c-b884-acdd3ed773ad'

const QUICK_SERVICES = [
  { label: 'AS 접수', icon: icoConsulting, iconBg: '#eff4ff', path: '/as-reception' },
  { label: 'AS조회 변경', icon: icoAsReception, iconBg: null, path: '/as-lookup' },
  { label: '단말 현황', icon: icoTablet, iconBg: null, path: '/status' },
  { label: '서비스 센터안내', icon: icoAsReception, iconBg: null, path: '/service-center' },
]

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
  { id: 1, type: '동영상', typeColor: '#1a75ff', title: '메모리를 분리하거나 장착할 수 있나요?', date: '2024.06.19.', views: '4,602' },
  { id: 2, type: '동영상', typeColor: '#1a75ff', title: '이 제품은 방수 기능이 있나요?', date: '2024.06.20.', views: '3,781' },
  { id: 3, type: '다운로드', typeColor: '#ff761a', title: '배터리 수명이 얼마나 되나요?', date: '2024.06.21.', views: '5,012' },
  { id: 4, type: '다운로드', typeColor: '#ff761a', title: '지원하는 최대 해상도는 무엇인가요?', date: '2024.06.22.', views: '2,450' },
]

const NOTICES = [
  { id: 1, title: '[안내] 시스템 점검에 따른 일부 서비스 이용 제한 안내 (5월 31일 20시 이후)', date: '2024. 05. 12', isNew: true },
  { id: 2, title: '[안내] 시스템 점검에 따른 일부 서비스 이용 제한 안내 (5월 31일 20시 이후)', date: '2024. 05. 12', isNew: true },
  { id: 3, title: '[공지] 서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024. 06. 10', isNew: false },
  { id: 4, title: '[업데이트] 새로운 기능 추가 안내 (7월 1일 배포 예정)', date: '2024. 06. 25', isNew: true },
]

function ArrowUpRight({ color = 'rgba(255,255,255,0.7)' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 15L15 5M15 5H7M15 5v8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRight({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// 애니메이션 변수
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
}

export default function HomeLoggedInPage() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[1].id)

  const currentProduct = PRODUCTS.find(p => p.id === selectedProduct) ?? PRODUCTS[1]

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

        {/* 퀵 서비스 바 (히어로 아래 흰색 바) */}
        <motion.div 
          className={styles.quickBar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={styles.quickBarInner}>
            {QUICK_SERVICES.map((item, idx) => (
              <Link
                key={item.label}
                to={item.path}
                className={`${styles.quickService} ${idx < QUICK_SERVICES.length - 1 ? styles.quickServiceDivider : ''}`}
              >
                <motion.div className={styles.quickServiceIconWrap} whileHover={{ rotate: [0, -10, 10, 0] }}>
                  <img src={item.icon} alt="" width={24} height={24} />
                </motion.div>
                <div className={styles.quickServiceContent}>
                  <span className={styles.quickServiceLabel}>{item.label}</span>
                  <span className={styles.quickServiceArrow}>
                    <ArrowUpRight color="rgba(23,23,25,1)" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

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
                  <img src={icoSchool} alt="" width={24} height={24} className={styles.asSchoolIcon} />
                  <span className={styles.asSchoolName}>가락고등학교</span>
                  <div className={styles.asSchoolDivider} />
                  <span className={styles.asSchoolClass}>2학년 1반</span>
                </div>

                {/* AS 카드 */}
                <div className={styles.asCard}>
                  {/* 왼쪽: 그라디언트 블루 */}
                  <motion.div whileHover={{ scale: 1.02 }} className={styles.asCardLeftWrapper}>
                    <Link to="/as-history" className={styles.asCardLeft}>
                      <div className={styles.asCardTopRow}>
                        <span className={styles.asCardLabel}>A/S 예약</span>
                        <ArrowUpRight color="rgba(255,255,255,0.7)" />
                      </div>
                      <div className={styles.asCardCount}>
                        <span className={styles.asCardNum}>27</span>
                        <span className={styles.asCardUnit}>건</span>
                      </div>
                    </Link>
                  </motion.div>

                  {/* 오른쪽: 상태 컬럼들 */}
                  <div className={styles.asStatusArea}>
                    {AS_STATUSES.map((status, idx) => (
                      <Link
                        key={status.label}
                        to="/as-history"
                        className={`${styles.asStatusCol} ${idx < AS_STATUSES.length - 1 ? styles.asStatusColDivider : ''}`}
                      >
                        <motion.div className={styles.asStatusColInner} whileHover={{ y: -5 }}>
                          <div className={styles.asStatusLabelRow}>
                            <span className={styles.asStatusLabel}>{status.label}</span>
                            {status.hasArrow && <ArrowUpRight color="#171719" />}
                          </div>
                          <div className={styles.asStatusCount}>
                            <span className={styles.asStatusNum}>{status.count}</span>
                            <span className={styles.asStatusUnit}>건</span>
                          </div>
                        </motion.div>
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
                <span className={styles.infoHint}>학급에서 가장 많이 보유한 제품순으로 노출됩니다.</span>
              </div>
              <div className={styles.chipRow}>
                {PRODUCTS.map((product) => (
                  <motion.button
                    key={product.id}
                    className={`${styles.chip} ${selectedProduct === product.id ? styles.chipActive : ''}`}
                    onClick={() => setSelectedProduct(product.id)}
                    whileHover={{ y: -2 }}
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
                  <span className={styles.searchCardProduct}>{currentProduct.name}</span>
                  <span className={styles.searchCardQuestion}> 문제에 대한 증상이나 궁금증을 검색해주세요.</span>
                </p>
                <div className={styles.searchInputWrap}>
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="검색어를 입력해주세요"
                  />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="6.5" stroke="#a0a0a1" strokeWidth="1.5"/>
                    <path d="M16 16L20 20" stroke="#a0a0a1" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className={styles.selfHelpList}>
                {SELF_HELP_ITEMS.map((item) => (
                  <motion.div key={item.id} className={styles.listRow} whileHover={{ x: 5, backgroundColor: '#fbfcfd' }}>
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
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 2v4l2.5 2.5" stroke="rgba(46,47,51,0.88)" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        {item.date}
                      </span>
                      <span className={styles.metaDivider} />
                      <span className={styles.metaItem}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="rgba(46,47,51,0.88)" strokeWidth="1.2"/>
                          <circle cx="8" cy="8" r="2" stroke="rgba(46,47,51,0.88)" strokeWidth="1.2"/>
                        </svg>
                        {item.views}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 공지사항 */}
            <motion.div className={styles.section} variants={itemVariants}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>공지사항</h2>
                <Link to="/notice" className={styles.moreBtn}>
                  전체보기
                  <ChevronRight />
                </Link>
              </div>
              <div className={styles.card}>
                {NOTICES.map((item) => (
                  <motion.div key={item.id} className={styles.noticeRow} whileHover={{ x: 5, backgroundColor: '#fbfcfd' }}>
                    <div className={styles.noticeTitle}>
                      <span className={styles.noticeTitleText}>{item.title}</span>
                      <motion.span 
                        className={styles.badge}
                        animate={item.isNew ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        {item.isNew ? 'N' : 'Y'}
                      </motion.span>
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="#171719" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </TransitionLayout>
  )
}
