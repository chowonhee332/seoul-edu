import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants, itemVariants } from '../lib/animations'
import {
  MdChevronRight,
  MdAccessTime,
  MdVisibility,
  MdElectricalServices,
  MdPhoneAndroid,
  MdLaptopWindows,
  MdHeadsetMic,
  MdBuild,
} from 'react-icons/md'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import CommonBoard from '../components/CommonBoard'
import CategoryTabs from '../components/CategoryTabs'

// 스타일 임포트
import styles from './DownloadCenterPage.module.css'
import boardStyles from '../components/CommonBoard.module.css'

const CATEGORIES = [
  { id: 1, label: '충전함', icon: <MdElectricalServices size={32} /> },
  { id: 2, label: 'Android', icon: <MdPhoneAndroid size={32} /> },
  { id: 3, label: 'Windows', icon: <MdLaptopWindows size={32} /> },
]

const ALL_ITEMS = [
  { id: 1,  categoryId: 1, type: '자주묻는질문', typeColor: '#1a75ff', title: '메모리를 분리하거나 장착할 수 있나요?',           date: '2024.06.19.', views: '4,602' },
  { id: 2,  categoryId: 1, type: '자주묻는질문', typeColor: '#1a75ff', title: '이 제품은 방수 기능이 있나요?',                   date: '2024.06.19.', views: '4,602' },
  { id: 3,  categoryId: 1, type: '자주묻는질문', typeColor: '#1a75ff', title: '배터리 수명이 얼마나 되나요?',                   date: '2024.06.19.', views: '4,602' },
  { id: 4,  categoryId: 1, type: '자주묻는질문', typeColor: '#1a75ff', title: '충전함 도어가 열리지 않을 때 어떻게 하나요?',      date: '2024.05.20.', views: '3,210' },
  { id: 5,  categoryId: 1, type: '자주묻는질문', typeColor: '#1a75ff', title: '충전함 전원이 켜지지 않는 경우 조치 방법은?',      date: '2024.05.15.', views: '2,880' },
  { id: 6,  categoryId: 1, type: '자주묻는질문', typeColor: '#1a75ff', title: '충전이 제대로 안 될 때 확인해야 할 사항',          date: '2024.05.10.', views: '1,940' },
  { id: 7,  categoryId: 1, type: '자주묻는질문', typeColor: '#1a75ff', title: 'LED 표시등이 빨간색으로 깜빡이는 이유는?',         date: '2024.04.28.', views: '1,560' },
]


export default function FaqPage() {
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

  const filteredItems = ALL_ITEMS
    .filter((item) => {
      const matchCategory = item.categoryId === activeCategory
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
    .sort((a, b) => {
      if (sortBy === 'views') {
        return parseInt(b.views.replace(/,/g, '')) - parseInt(a.views.replace(/,/g, ''))
      }
      return b.date.localeCompare(a.date)
    })

  const ITEMS_PER_PAGE = 10
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE))
  const currentItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const activeCategoryLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label ?? ''

  const handleCategoryChange = (id: number) => {
    setActiveCategory(id)
    setCurrentPage(1)
    setSearchQuery('')
  }

  const handleItemClick = (item: any) => {
    navigate('/content-detail', {
      state: { item, list: filteredItems, fromPath: '/faq', fromLabel: '문제해결 Q&A' },
    })
  }

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <Breadcrumb currentLabel="문제해결 Q&A" />

        <div className={styles.body}>
          <motion.div className={styles.inner} initial="hidden" animate="visible" variants={containerVariants}>
            <PageTitle title="문제해결 Q&A" variants={itemVariants} />

            <CategoryTabs
              categories={CATEGORIES}
              activeId={activeCategory}
              onChange={handleCategoryChange}
              isSticky={isSticky}
            />

            <CommonBoard
              activeCategoryLabel={activeCategoryLabel}
              totalCount={filteredItems.length}
              searchQuery={searchQuery}
              onSearch={(q) => { setSearchQuery(q); setCurrentPage(1); }}
              sortBy={sortBy}
              onSortToggle={() => { setSortBy(prev => prev === 'latest' ? 'views' : 'latest'); setCurrentPage(1); }}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsCount={currentItems.length}
            >
              <AnimatePresence mode="popLayout">
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className={boardStyles.listRow}
                      onClick={() => handleItemClick(item)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className={boardStyles.listRowLeft}>
                        <span className={boardStyles.tag} style={{ color: item.typeColor, background: `${item.typeColor}1a` }}>
                          {item.type}
                        </span>
                        <span className={boardStyles.listTitle}>{item.title}</span>
                      </div>
                      <div className={boardStyles.listMeta}>
                        <span className={boardStyles.metaItem}><MdAccessTime size={15} />{item.date}</span>
                        <span className={boardStyles.metaDivider} />
                        <span className={boardStyles.metaItem}><MdVisibility size={15} />{item.views}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div className={boardStyles.emptyState}>검색 결과가 없습니다.</motion.div>
                )}
              </AnimatePresence>
            </CommonBoard>

            <motion.div className={styles.bottomSection} variants={itemVariants}>
              <p className={styles.bottomTitle}>원하시는 정보를 못 찾으셨다면 아래 서비스를 이용해보세요.</p>
              <div className={styles.bottomCards}>
                <Link to="/service-center" className={styles.bottomCard}>
                  <div className={styles.bottomCardIcon} style={{ background: 'linear-gradient(135deg, #1a75ff, #609fff)' }}>
                    <MdHeadsetMic size={22} color="#fff" />
                  </div>
                  <div className={styles.bottomCardText}>
                    <span className={styles.bottomCardTitle}>서비스센터 안내</span>
                    <span className={styles.bottomCardDesc}>서비스센터 위치정보 확인</span>
                  </div>
                  <MdChevronRight size={20} className={styles.bottomCardArrow} />
                </Link>
                <Link to="/as-reception" className={styles.bottomCard}>
                  <div className={styles.bottomCardIcon} style={{ background: 'linear-gradient(135deg, #0da160, #34d399)' }}>
                    <MdBuild size={22} color="#fff" />
                  </div>
                  <div className={styles.bottomCardText}>
                    <span className={styles.bottomCardTitle}>A/S 접수</span>
                    <span className={styles.bottomCardDesc}>제품의 A/S 접수 예약</span>
                  </div>
                  <MdChevronRight size={20} className={styles.bottomCardArrow} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  )
}
