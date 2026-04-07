import { Link } from 'react-router-dom'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import styles from './HomePage.module.css'

// 퀵버튼 아이콘 이미지
const icoConsulting = 'https://www.figma.com/api/mcp/asset/c0f5b46e-537f-4d29-bdc0-f7bd26a5ed10'
const icoBuild = 'https://www.figma.com/api/mcp/asset/eda10ca8-cab9-42b7-89aa-7dfe53a20894'
const icoHeadset = 'https://www.figma.com/api/mcp/asset/e1144d01-7c4f-4ed8-8c64-7223631ff331'

const QUICK_MENUS = [
  { icon: icoConsulting, label: 'AS 접수', path: '/as-reception' },
  { icon: icoBuild, label: 'AS조회 변경', path: '/as-lookup' },
  { icon: icoBuild, label: '단말 현황', path: '/status' },
  { icon: icoHeadset, label: '서비스 센터안내', path: '/service-center', color: '#44a0f7' },
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

export default function HomePage() {
  return (
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
        <div className={styles.heroText}>
          <p className={styles.heroTitle1}>안녕하세요,</p>
          <p className={styles.heroTitle2}>무엇을 도와드릴까요?</p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className={styles.main}>
        <div className={styles.inner}>
          {/* 퀵버튼 */}
          <div className={styles.quickGrid}>
            {QUICK_MENUS.map((item) => (
              <Link key={item.label} to={item.path} className={styles.quickCard}>
                <div className={styles.quickIconWrap} style={{ background: item.color || '#1a75ff' }}>
                  <img src={item.icon} alt="" width={24} height={24} className={styles.quickIcon} />
                </div>
                <span className={styles.quickLabel}>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* 로그인 유도 카드 */}
          <div className={styles.loginCard}>
            <div className={styles.loginCardText}>
              <p className={styles.loginCardLine1}>
                <strong>로그인</strong>하고 보유기기의
              </p>
              <p className={styles.loginCardLine2}>맞춤 정보를 확인해보세요.</p>
            </div>
            <Link to="/login" className={styles.loginCardBtn}>
              로그인
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* 스스로 해결 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>스스로 해결</h2>
              <div className={styles.searchBox}>
                <span className={styles.searchPlaceholder}>원하시는 정보를 입력해주세요</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="5.5" stroke="#a0a0a1" strokeWidth="1.5"/>
                  <path d="M13 13l3.5 3.5" stroke="#a0a0a1" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className={styles.card}>
              {SELF_HELP_ITEMS.map((item) => (
                <div key={item.id} className={styles.listRow}>
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
                </div>
              ))}
            </div>
          </div>

          {/* 공지사항 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>공지사항</h2>
              <Link to="/notice" className={styles.moreBtn}>
                전체보기
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className={styles.card}>
              {NOTICES.map((item) => (
                <div key={item.id} className={styles.noticeRow}>
                  <div className={styles.noticeTitle}>
                    <span className={styles.noticeTitleText}>{item.title}</span>
                    {item.isNew && <span className={styles.badge}>N</span>}
                  </div>
                  <span className={styles.noticeDate}>{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* FAB 상단으로 */}
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
