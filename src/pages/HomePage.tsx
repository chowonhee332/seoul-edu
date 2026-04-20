import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { containerVariants, heroItemVariants } from '../lib/animations'
import { MdChevronRight, MdAccessTime, MdVisibility, MdArrowUpward } from 'react-icons/md'
import SearchBox from '../components/SearchBox'
import QuickServiceBar from '../components/QuickServiceBar'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import styles from './HomePage.module.css'


const SELF_HELP_ITEMS = [
  { id: 1, type: '동영상', typeColor: 'var(--color-tag-video)', typeBg: 'var(--color-tag-video-bg)', title: '메모리를 분리하거나 장착할 수 있나요?', date: '2024.06.19.', views: '4,602' },
  { id: 2, type: '동영상', typeColor: 'var(--color-tag-video)', typeBg: 'var(--color-tag-video-bg)', title: '이 제품은 방수 기능이 있나요?', date: '2024.06.20.', views: '3,781' },
  { id: 3, type: '다운로드', typeColor: 'var(--color-tag-download)', typeBg: 'var(--color-tag-download-bg)', title: '배터리 수명이 얼마나 되나요?', date: '2024.06.21.', views: '5,012' },
  { id: 4, type: '다운로드', typeColor: 'var(--color-tag-download)', typeBg: 'var(--color-tag-download-bg)', title: '지원하는 최대 해상도는 무엇인가요?', date: '2024.06.22.', views: '2,450' },
]

const NOTICES = [
  { id: 1, title: '시스템 점검에 따른 일부 서비스 이용 제한 안내 (5월 31일 20시 이후)', date: '2024.06.19.', isNew: true },
  { id: 2, title: '서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024.06.19.', isNew: true },
  { id: 3, title: '서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024.06.19.', isNew: true },
  { id: 4, title: '서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024.06.19.', isNew: true },
  { id: 5, title: '서버 유지보수로 인한 서비스 중단 안내 (6월 15일 00시부터 2시간)', date: '2024.06.19.', isNew: true },
  { id: 6, title: '새로운 기능 추가 안내 (7월 1일 배포 예정)', date: '2024.06.19.', isNew: true },
]



export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <TransitionLayout>
      <div className={styles.page}>
        
        {/* 히어로 배너 */}
        <div className={`${styles.hero} ${isScrolled ? styles.heroScrolled : ''}`}>
          <video
            className={styles.heroBg}
            src="/resources/hero_banner.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className={styles.heroOverlay} />
          <motion.div 
            className={styles.heroText}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className={styles.heroTitle1}>안녕하세요,</p>
            <p className={styles.heroTitle2}>무엇을 도와드릴까요?</p>
          </motion.div>
        </div>

        {/* 서비스 카테고리 바 */}
        <QuickServiceBar />

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
              variants={heroItemVariants}
            >
              <div className={styles.loginCardText}>
                <span><strong>로그인</strong>하고 보유기기의</span>
                <span>맞춤 정보를 확인해보세요.</span>
              </div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link to="/login" className={styles.loginCardBtn}>
                  로그인 <MdChevronRight size={18} />
                </Link>
              </motion.div>
            </motion.div>

            {/* 스스로 해결 카드 */}
            <motion.div 
              className={styles.selfHelpCard}
              variants={heroItemVariants}
            >
              <div className={styles.searchContainer}>
                <p className={styles.selfHelpQuestion}>
                  문제에 대한 증상이나 궁금증이 있으신가요?
                </p>
                <SearchBox className={styles.selfHelpSearchBox} />
              </div>
              <div className={styles.selfHelpList}>
                {SELF_HELP_ITEMS.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className={styles.listRow}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.listRowLeft}>
                      <span className={styles.tag} style={{ color: item.typeColor, background: '#f8fafc' }}>
                        {item.type}
                      </span>
                      <span className={styles.listTitle}>{item.title}</span>
                    </div>
                    <div className={styles.listMeta}>
                      <span className={styles.metaItem}>
                        <MdAccessTime size={16} color="rgba(46,47,51,0.88)" />
                        {item.date}
                      </span>
                      <span className={styles.viewsMeta}>
                        <span className={styles.metaDivider} />
                        <span className={styles.metaItem}>
                          <MdVisibility size={16} color="rgba(46,47,51,0.88)" />
                          {item.views}
                        </span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 공지사항 */}
            <motion.div 
              className={styles.noticeSection}
              variants={heroItemVariants}
            >
              <div className={styles.noticeHeader}>
                <h2 className={styles.noticeTitle}>공지사항</h2>
                <div>
                  <Link to="/notice" className={styles.moreBtn}>
                    전체보기
                    <MdChevronRight size={16} />
                  </Link>
                </div>
              </div>
              <div className={styles.noticeCard}>
                {NOTICES.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className={styles.noticeRow}
                                        transition={{ duration: 0.2 }}
                  >
                    <div className={styles.noticeLeft}>
                      <span className={styles.noticeTitleText}>{item.title}</span>
                      {item.isNew && (
                        <span className={styles.badge}>N</span>
                      )}
                    </div>
                    <div className={styles.noticeMeta}>
                      <MdAccessTime size={16} color="rgba(46,47,51,0.88)" />
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
          <MdArrowUpward size={24} color="white" />
        </motion.button>
      </div>
    </TransitionLayout>
  )
}
