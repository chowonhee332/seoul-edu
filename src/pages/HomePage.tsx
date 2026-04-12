import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import styles from './HomePage.module.css'

const icoConsulting = 'https://www.figma.com/api/mcp/asset/fdc9da30-170a-485f-8756-ad7d4da30dd0'
const icoAsReception = 'https://www.figma.com/api/mcp/asset/5d99a4d2-144a-4c49-a042-2f731abf07cc'
const icoTablet = 'https://www.figma.com/api/mcp/asset/2136d5f6-6c41-4c68-a056-42fa1cd2a227'

const QUICK_MENUS = [
  { icon: icoConsulting, label: 'AS 접수', path: '/as-reception' },
  { icon: icoAsReception, label: 'AS조회 변경', path: '/as-history' },
  { icon: icoTablet, label: '단말 현황', path: '/status' },
  { icon: icoAsReception, label: '서비스 센터안내', path: '/video-guide' },
]

function ArrowUpRight({ color = 'rgba(23,23,25,1)' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 15L15 5M15 5H7M15 5v8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const SELF_HELP_ITEMS = [
  { id: 1, type: '동영상', typeColor: '#1a75ff', typeBg: 'rgba(26,117,255,0.1)', title: '메모리를 분리하거나 장착할 수 있나요?', date: '2024.06.19.', views: '4,602' },
  { id: 2, type: '동영상', typeColor: '#1a75ff', typeBg: 'rgba(26,117,255,0.1)', title: '이 제품은 방수 기능이 있나요?', date: '2024.06.20.', views: '3,781' },
  { id: 3, type: '다운로드', typeColor: '#41bb18', typeBg: 'rgba(65,187,24,0.1)', title: '배터리 수명이 얼마나 되나요?', date: '2024.06.21.', views: '5,012' },
  { id: 4, type: '다운로드', typeColor: '#41bb18', typeBg: 'rgba(65,187,24,0.1)', title: '지원하는 최대 해상도는 무엇인가요?', date: '2024.06.22.', views: '2,450' },
]

const NOTICES = [
  { id: 1, title: '시스템 점검에 따른 일부 서비스 이용 제한 안내 (5월 31일 20시 이후)', date: '2024.06.19.', isNew: true },
  { id: 2, title: '서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024.06.19.', isNew: true },
  { id: 3, title: '서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024.06.19.', isNew: true },
  { id: 4, title: '서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024.06.19.', isNew: true },
  { id: 5, title: '서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024.06.19.', isNew: true },
  { id: 6, title: '새로운 기능 추가 안내 (7월 1일 배포 예정)', date: '2024.06.19.', isNew: true },
]

function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IcoDate() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="rgba(46,47,51,0.88)" strokeWidth="1.1"/>
      <path d="M8 5v3l2 2" stroke="rgba(46,47,51,0.88)" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function IcoView() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="rgba(46,47,51,0.88)" strokeWidth="1.1"/>
      <circle cx="8" cy="8" r="2" stroke="rgba(46,47,51,0.88)" strokeWidth="1.1"/>
    </svg>
  )
}

// 애니메이션 변수 정의
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function HomePage() {
  return (
    <TransitionLayout>
      <div className={styles.page}>
        {/* 히어로 배너 */}
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
          <motion.div 
            className={styles.heroText}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className={styles.heroTitle1}>안녕하세요,</p>
            <p className={styles.heroTitle2}>무엇을 도와드릴까요?</p>
          </motion.div>
        </div>

        {/* 서비스 카테고리 바 */}
        <motion.div 
          className={styles.quickBar}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className={styles.quickBarInner}>
            {QUICK_MENUS.map((item, i) => (
              <Link
                key={item.label}
                to={item.path}
                className={`${styles.quickService} ${i < QUICK_MENUS.length - 1 ? styles.quickServiceDivider : ''}`}
              >
                <motion.div 
                  className={styles.quickServiceItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <div className={styles.quickServiceIconWrap}>
                    <img src={item.icon} alt="" width={24} height={24} />
                  </div>
                  <div className={styles.quickServiceContent}>
                    <span className={styles.quickServiceLabel}>{item.label}</span>
                    <span className={styles.quickServiceArrow}>
                      <ArrowUpRight />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* 메인 콘텐츠 */}
        <div className={styles.main}>
          <motion.div 
            className={styles.inner}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >

            {/* 로그인 유도 */}
            <motion.div 
              className={styles.loginSection}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              <div className={styles.loginCardText}>
                <p>로그인하고 보유기기의</p>
                <p>맞춤 정보를 확인해보세요.</p>
              </div>
              <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className={styles.loginCardBtn}>
                  로그인
                  <ChevronRight size={20} />
                </Link>
              </motion.div>
            </motion.div>

            {/* 스스로 해결 카드 */}
            <motion.div 
              className={styles.selfHelpCard}
              variants={itemVariants}
            >
              <div className={styles.searchContainer}>
                <p className={styles.selfHelpQuestion}>
                  문제에 대한 증상이나 궁금증이 있으신가요?
                </p>
                <div className={styles.selfHelpSearchWrap}>
                  <input
                    type="text"
                    className={styles.selfHelpSearchInput}
                    placeholder="검색어를 입력해주세요"
                  />
                  <motion.button 
                    className={styles.selfHelpSearchBtn} 
                    aria-label="검색"
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="7" stroke="rgba(46,47,51,0.5)" strokeWidth="1.5"/>
                      <path d="M16.5 16.5l4 4" stroke="rgba(46,47,51,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </motion.button>
                </div>
              </div>
              <div className={styles.selfHelpList}>
                {SELF_HELP_ITEMS.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className={styles.listRow}
                    whileHover={{ backgroundColor: 'rgba(244, 246, 250, 0.5)', x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.listRowLeft}>
                      <span className={styles.tag} style={{ color: item.typeColor, background: item.typeBg }}>
                        {item.type}
                      </span>
                      <span className={styles.listTitle}>{item.title}</span>
                    </div>
                    <div className={styles.listMeta}>
                      <span className={styles.metaItem}>
                        <IcoDate />
                        {item.date}
                      </span>
                      <span className={styles.metaDivider} />
                      <span className={styles.metaItem}>
                        <IcoView />
                        {item.views}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 공지사항 */}
            <motion.div 
              className={styles.noticeSection}
              variants={itemVariants}
            >
              <div className={styles.noticeHeader}>
                <h2 className={styles.noticeTitle}>공지사항</h2>
                <motion.div whileHover={{ x: 3 }}>
                  <Link to="/notice" className={styles.moreBtn}>
                    전체보기
                    <ChevronRight size={16} />
                  </Link>
                </motion.div>
              </div>
              <div className={styles.noticeCard}>
                {NOTICES.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className={styles.noticeRow}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.noticeLeft}>
                      <span className={styles.noticeTitleText}>{item.title}</span>
                      {item.isNew && (
                        <motion.span 
                          className={styles.badge}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          N
                        </motion.span>
                      )}
                    </div>
                    <div className={styles.noticeMeta}>
                      <IcoDate />
                      <span className={styles.noticeDateText}>{item.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>

        <Footer />

        {/* FAB */}
        <motion.button
          className={styles.fab}
          aria-label="위로 이동"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </TransitionLayout>
  )
}
