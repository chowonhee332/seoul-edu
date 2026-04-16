import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants, itemVariants } from '../lib/animations'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import CommonBoard from '../components/CommonBoard'
import CategoryTabs from '../components/CategoryTabs'

// 스타일 임포트
import styles from './VideoGuidePage.module.css'
import boardStyles from '../components/CommonBoard.module.css'

const CATEGORIES = [
  { id: 1, label: '윈도우북', icon: <img src="/resources/guide_1.png" alt="" /> },
  { id: 2, label: '웨일북', icon: <img src="/resources/guide_1.png" alt="" /> },
  { id: 3, label: '아이패드', icon: <img src="/resources/guide_2.png" alt="" /> },
  { id: 4, label: '갤럭시탭', icon: <img src="/resources/guide_2.png" alt="" /> },
  { id: 5, label: '크롬북', icon: <img src="/resources/guide_1.png" alt="" /> },
  { id: 6, label: '애플스쿨매니저', icon: <img src="/resources/guide_3.png" alt="" /> },
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
        date: `2024.03.${(31 - i).toString().padStart(2, '0')}`,
        views: (100 + i * 42).toString()
      });
    }
  });
  return data;
};

const VIDEOS = generateMockData();


export default function VideoGuidePage() {
  const [activeCategory, setActiveCategory] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isSticky, setIsSticky] = useState(false)
  const [sortBy, setSortBy] = useState<'latest' | 'views'>('latest')
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 120)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredVideos = VIDEOS
    .filter(v => {
      const matchCategory = v.categoryId === activeCategory;
      const matchSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'views') return parseInt(b.views) - parseInt(a.views);
      return b.date.localeCompare(a.date);
    });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / ITEMS_PER_PAGE));
  const currentVideos = filteredVideos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const activeCategoryName = CATEGORIES.find(c => c.id === activeCategory)?.label || ''

  const handleCategoryChange = (id: number) => {
    setActiveCategory(id);
    setCurrentPage(1);
    setSearchQuery('');
  }

  const handleItemClick = (video: any) => {
    navigate('/content-detail', {
      state: {
        item: { ...video, title: video.name, type: '동영상', typeColor: '#1a75ff' },
        list: filteredVideos.map(v => ({ ...v, title: v.name, type: '동영상', typeColor: '#1a75ff' })),
        fromPath: '/video-guide',
        fromLabel: '동영상 가이드',
        parentLabel: '스스로 해결'
      }
    });
  };

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <Breadcrumb currentLabel="동영상 가이드" />

        <div className={styles.body}>
          <motion.div className={styles.inner} initial="hidden" animate="visible" variants={containerVariants}>
            <PageTitle title="동영상 가이드" variants={itemVariants} />

            {/* 카테고리 탭 */}
            <CategoryTabs
              categories={CATEGORIES}
              activeId={activeCategory}
              onChange={handleCategoryChange}
              isSticky={isSticky}
            />

            {/* 공통 보드 컴포넌트 */}
            <CommonBoard
              activeCategoryLabel={activeCategoryName}
              totalCount={filteredVideos.length}
              searchQuery={searchQuery}
              onSearch={(q) => { setSearchQuery(q); setCurrentPage(1); }}
              sortBy={sortBy}
              onSortToggle={() => { setSortBy(prev => prev === 'latest' ? 'views' : 'latest'); setCurrentPage(1); }}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsCount={currentVideos.length}
              header={
                <div className={styles.tableHead}>
                  <div className={styles.noCell}>No.</div>
                  <div className={`${styles.thCell} ${styles.flex1}`}>제품명</div>
                  <div className={`${styles.thCell} ${styles.dateCell}`}>등록일</div>
                </div>
              }
            >
              <AnimatePresence mode="popLayout">
                {currentVideos.length > 0 ? (
                  currentVideos.map((video) => (
                    <motion.div
                      key={video.id}
                      className={styles.tableRow}
                      onClick={() => handleItemClick(video)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className={styles.noCell}>{video.no}</div>
                      <div className={`${styles.tdCell} ${styles.flex1}`}>{video.name}</div>
                      <div className={`${styles.tdCell} ${styles.dateCell}`}>{video.date}</div>
                    </motion.div>
                  ))
                ) : (
                  <div className={boardStyles.emptyState}>검색 결과가 없습니다.</div>
                )}
              </AnimatePresence>
            </CommonBoard>
          </motion.div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  )
}
