import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, Variants } from 'framer-motion'
import { MdHome, MdChevronRight, MdChevronLeft, MdFirstPage, MdLastPage, MdCheck } from 'react-icons/md'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import styles from './VideoGuidePage.module.css'

const CATEGORIES = [
  { id: 1, label: '윈도우북', icon: '/resources/guide_1.png' },
  { id: 2, label: '웨일북', icon: '/resources/guide_1.png' },
  { id: 3, label: '아이패드', icon: '/resources/guide_2.png' },
  { id: 4, label: '갤럭시탭', icon: '/resources/guide_2.png' },
  { id: 5, label: '크롬북', icon: '/resources/guide_1.png' },
  { id: 6, label: '애플스쿨매니저', icon: '/resources/guide_3.png' },
]

// 카테고리별 샘플 데이터 생성 함수
const generateMockData = () => {
  const data: any[] = [];
  let globalId = 1;

  CATEGORIES.forEach(cat => {
    for (let i = 1; i <= 20; i++) {
      data.push({
        id: globalId++,
        categoryId: cat.id,
        no: i,
        name: `${cat.label} ${['사용자 가이드', '기초 설정 방법', '주요 기능 안내', '심화 활용 팁', '문제 해결 안내'][i % 5]} - ${i}편`,
        date: `2024.03.${(31 - i).toString().padStart(2, '0')}`
      });
    }
  });
  return data;
};

const VIDEOS = generateMockData();
const PAGES = [1, 2, 3, 4, 5];

// 애니메이션 변수 복구
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

export default function VideoGuidePage() {
  const [checked, setChecked] = useState<number[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeCategory, setActiveCategory] = useState(1)
  const [isSticky, setIsSticky] = useState(false)

  // 스크롤 감지를 통한 Sticky 상태 판단
  useEffect(() => {
    const handleScroll = () => {
      // 카테고리 카드가 고정되는 위치(68px + 여백 등)를 고려하여 threshold 설정
      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ITEMS_PER_PAGE = 10;

  // 선택된 카테고리에 맞는 영상들만 필터링
  const filteredVideos = VIDEOS.filter(v => v.categoryId === activeCategory);
  
  // 현재 페이지에 해당하는 데이터만 추출
  const currentVideos = filteredVideos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const activeCategoryName = CATEGORIES.find(c => c.id === activeCategory)?.label || ''
  const totalCount = filteredVideos.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // 카테고리 변경 시 현재 페이지 초기화
  const handleCategoryChange = (id: number) => {
    setActiveCategory(id);
    setCurrentPage(1);
    setChecked([]);
    setAllChecked(false);
  }

  const toggleAll = () => {
    if (allChecked) {
      setChecked([])
    } else {
      setChecked(currentVideos.map((v) => v.id))
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

        <Breadcrumb currentLabel="동영상 가이드" />

        {/* 본문 */}
        <div className={styles.body}>
          <motion.div 
            className={styles.inner}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <PageTitle title="동영상 가이드" variants={itemVariants} />

            {/* 카테고리 카드 */}
            <motion.div 
              className={`${styles.categoryCard} ${isSticky ? styles.stickyActive : ''}`} 
              variants={itemVariants}
            >
              {CATEGORIES.map((cat, i) => (
                <div key={cat.id} className={styles.categoryItem}>
                  <motion.button
                    className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.categoryActive : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={cat.icon} alt="" width={72} height={72} className={styles.categoryIcon} />
                    <span className={styles.categoryLabel}>{cat.label}</span>
                  </motion.button>
                  {i < CATEGORIES.length - 1 && <div className={styles.categoryDivider} />}
                </div>
              ))}
            </motion.div>

            {/* 테이블 카드 */}
            <motion.div className={styles.tableCard} variants={itemVariants}>
              {/* 툴바 */}
              <div className={styles.tableToolbar}>
                <div className={styles.totalCountArea}>
                  <span className={styles.categoryNameDisplay}>
                    {activeCategoryName}
                  </span>
                  <span className={styles.countDivider}>|</span>
                  <span className={styles.countValueDisplay}>{totalCount}건</span>
                </div>
              </div>

              {/* 테이블 */}
              </div>

              {/* 데스크톱/태블릿 테이블 (CSS 미디어 쿼리에 의해 모바일에서 숨김) */}
              <div className={styles.table}>
                <div className={styles.tableHead}>
                  <div className={styles.noCell}>No.</div>
                  <div className={`${styles.thCell} ${styles.flex1}`}>제품명</div>
                  <div className={`${styles.thCell} ${styles.dateCell}`}>등록일</div>
                </div>

                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {currentVideos.map((video) => (
                    <motion.div key={video.id} className={styles.tableRow} variants={itemVariants}>
                      <div className={styles.noCell}>{video.no}</div>
                      <div className={`${styles.tdCell} ${styles.flex1}`}>{video.name}</div>
                      <div className={`${styles.tdCell} ${styles.dateCell}`}>{video.date}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* 모바일 카드 리스트 (CSS 미디어 쿼리에 의해 모바일에서만 노출) */}
              <div className={styles.mobileCardList}>
                {currentVideos.map((video) => (
                  <motion.div key={video.id} className={styles.videoCard} variants={itemVariants}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardNo}>No.{video.no}</span>
                      <span className={styles.statusBadge}>영상</span>
                    </div>
                    <h3 className={styles.cardTitle}>{video.name}</h3>
                    <div className={styles.cardMeta}>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>등록일</span>
                        <span className={styles.metaValue}>{video.date}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>분류</span>
                        <span className={styles.metaValue}>
                          {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                        </span>
                      </div>
                    </div>
                    <div className={styles.cardFooter}>
                      <motion.button className={styles.detailBtn} whileHover={{ x: 3 }}>
                        상세보기
                        <MdChevronRight size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
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
            </motion.div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </TransitionLayout>
  )
}
