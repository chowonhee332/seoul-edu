import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardArrowDown,
} from 'react-icons/md'
import styles from './CommonBoard.module.css'
import SearchBox from './SearchBox'

interface CommonBoardProps {
  title?: string
  activeCategoryLabel?: string
  totalCount: number
  searchQuery?: string
  onSearch?: (query: string) => void
  sortBy?: 'latest' | 'views'
  onSortChange?: (sort: 'latest' | 'views') => void
  onSortToggle?: () => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  header?: React.ReactNode
  children: React.ReactNode
  showSearch?: boolean
  itemsCount?: number
  rightElement?: React.ReactNode
}

export default function CommonBoard({
  title,
  activeCategoryLabel,
  totalCount,
  searchQuery = '',
  onSearch,
  sortBy,
  onSortChange,
  onSortToggle,
  currentPage,
  totalPages,
  onPageChange,
  header,
  children,
  itemsCount = 10,
  showSearch = true,
  rightElement,
}: CommonBoardProps) {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSortItemClick = (type: 'latest' | 'views') => {
    if (onSortChange) onSortChange(type)
    setIsSortOpen(false)
  }
  // 동적 높이 계산 규칙:
  // 1. 전체 데이터가 10개를 넘으면(페이지네이션 발생), 어떤 페이지든 무조건 10개 높이(520px) 고정
  // 2. 전체 데이터가 10개 이하라면, 데이터 개수(최소 3개)에 맞춰 실시간으로 높이 조절
  const isPaging = totalCount > 10
  const displayCount = isPaging ? 10 : Math.min(10, Math.max(3, itemsCount))
  const dynamicMinHeight = displayCount * 52

  return (
    <motion.div
      className={styles.contentCard}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 1. 검색 영역 */}
      {showSearch && (
        <div className={styles.searchArea}>
          <p className={styles.searchTitle}>
            <span className={styles.searchHighlight}>{activeCategoryLabel || '전체'}</span>
            {' 관련 궁금한 내용을 검색해보세요.'}
          </p>
          <SearchBox value={searchQuery} onChange={onSearch} />
        </div>
      )}

      {/* 2. 툴바 (카운트 + 소팅) */}
      <div className={styles.listToolbar}>
        <div className={styles.listCount}>
          <span className={styles.listCountName}>{activeCategoryLabel || '전체'}</span>
          <span className={styles.listCountDivider}>|</span>
          <span className={styles.listCountValue}>{totalCount}건</span>
        </div>
        <div className={styles.listToolbarRight}>
          {rightElement}
          {onSortChange && (
            <div className={styles.sortWrapper} ref={sortRef}>
              <motion.button
                className={`${styles.sortBtn} ${isSortOpen ? styles.sortBtnActive : ''}`}
                onClick={() => setIsSortOpen(!isSortOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {sortBy === 'latest' ? '최신순' : '조회순'}
                <MdKeyboardArrowDown 
                  size={18} 
                  style={{ transform: isSortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} 
                />
              </motion.button>
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    className={styles.sortDropdown}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <button 
                      className={`${styles.sortItem} ${sortBy === 'latest' ? styles.sortItemActive : ''}`}
                      onClick={() => handleSortItemClick('latest')}
                    >
                      최신순
                    </button>
                    <button 
                      className={`${styles.sortItem} ${sortBy === 'views' ? styles.sortItemActive : ''}`}
                      onClick={() => handleSortItemClick('views')}
                    >
                      조회순
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* 리스트 영역 */}
      <div className={styles.listWrap}>
        {header && <div className={styles.headerArea}>{header}</div>}
        <div className={styles.listBodyArea} style={{ minHeight: `${dynamicMinHeight}px` }}>
          {children}
        </div>
      </div>

      {/* 4. 페이지네이션 */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <motion.button
            className={styles.pageBtn}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            whileTap={{ scale: 0.9 }}
          >
            <MdFirstPage size={18} />
          </motion.button>
          <motion.button
            className={styles.pageBtn}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            whileTap={{ scale: 0.9 }}
          >
            <MdChevronLeft size={18} />
          </motion.button>

          <div className={styles.pageNums}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <motion.button
                key={p}
                className={`${styles.pageNumBtn} ${currentPage === p ? styles.pageActive : ''}`}
                onClick={() => onPageChange(p)}
                whileTap={{ scale: 0.9 }}
              >
                {p}
              </motion.button>
            ))}
          </div>

          <motion.button
            className={styles.pageBtn}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            whileTap={{ scale: 0.9 }}
          >
            <MdChevronRight size={18} />
          </motion.button>
          <motion.button
            className={styles.pageBtn}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            whileTap={{ scale: 0.9 }}
          >
            <MdLastPage size={18} />
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}
