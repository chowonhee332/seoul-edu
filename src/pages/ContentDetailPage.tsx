import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MdAccessTime,
  MdVisibility,
  MdPlayArrow,
  MdFileDownload,
  MdList,
} from 'react-icons/md'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import styles from './ContentDetailPage.module.css'

// ── 공통 콘텐츠 아이템 타입 ────────────────────────────
export interface ContentItem {
  id: number
  type: string          // '동영상' | '다운로드' | '공지' 등
  typeColor?: string
  title: string
  date: string
  views: string | number
  content?: string      // 텍스트 본문 (공지/FAQ)
  fileUrl?: string      // 다운로드 URL
  fileName?: string     // 다운로드 파일명
}

// ── 라우터 state 타입 ─────────────────────────────────
interface LocationState {
  item: ContentItem
  list: ContentItem[]   // 이전글/다음글 탐색용 전체 리스트
  fromPath: string      // 목록 경로 (예: '/faq')
  fromLabel: string     // 목록 이름 (예: '문제해결 Q&A')
  parentLabel?: string  // 상위 메뉴명 (예: '스스로 해결')
}

export default function ContentDetailPage() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const state     = location.state as LocationState | null

  // state가 없으면 (직접 URL 접근) 목록 홈으로 보냄
  if (!state) {
    navigate('/', { replace: true })
    return null
  }

  const { fromPath, fromLabel, parentLabel } = state
  const [currentItem] = useState<ContentItem>(state.item)

  // ── 콘텐츠 렌더 ────────────────────────────────────
  const renderContent = () => {
    if (currentItem.type === '동영상') {
      return (
        <div className={styles.videoBox}>
          <div className={styles.videoPlaceholder}>
            <div className={styles.playBtn}>
              <MdPlayArrow size={36} color="#fff" />
            </div>
          </div>
        </div>
      )
    }

    if (currentItem.type === '다운로드') {
      return (
        <div className={styles.downloadBox}>
          <MdFileDownload size={48} className={styles.downloadIcon} />
          <p className={styles.downloadFileName}>
            {currentItem.fileName ?? `${currentItem.title}.pdf`}
          </p>
          <motion.a
            href={currentItem.fileUrl ?? '#'}
            className={styles.downloadBtn}
            whileTap={{ scale: 0.96 }}
            download
          >
            <MdFileDownload size={18} />
            파일 다운로드
          </motion.a>
        </div>
      )
    }

    // 공지/FAQ: 텍스트 본문
    return (
      <div className={styles.textBox}>
        <p className={styles.textContent}>
          {currentItem.content ??
            '등록된 본문 내용이 없습니다. 실제 서비스에서는 여기에 공지 본문이 표시됩니다.'}
        </p>
      </div>
    )
  }

  return (
    <TransitionLayout>
      <div className={styles.page}>

        {/* Breadcrumb: 홈 > 상위메뉴 > 목록명 (다단계) */}
        <Breadcrumb
          items={parentLabel ? [{ label: parentLabel }, { label: fromLabel, path: fromPath }] : [{ label: fromLabel, path: fromPath }]}
          currentLabel={currentItem.title.length > 20 ? currentItem.title.slice(0, 20) + '…' : currentItem.title}
        />

        <div className={styles.body}>
          <motion.div
            key={currentItem.id}
            className={styles.inner}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── 헤더: 제목 + 타입 뱃지 ── */}
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{currentItem.title}</h1>
              {currentItem.typeColor && (
                <span
                  className={styles.typeBadge}
                  style={{
                    color: currentItem.typeColor,
                    background: `${currentItem.typeColor}22`,
                  }}
                >
                  {currentItem.type === '동영상' ? (
                    <MdPlayArrow size={14} />
                  ) : (
                    <MdFileDownload size={14} />
                  )}
                  {currentItem.type}
                </span>
              )}
            </div>

            {/* ── 메타: 날짜 | 조회수 ── */}
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <MdAccessTime size={14} />
                {currentItem.date}
              </span>
              <span className={styles.metaDivider} />
              <span className={styles.metaItem}>
                <MdVisibility size={14} />
                {currentItem.views}
              </span>
            </div>

            {/* ── 본문 카드 ── */}
            <div className={styles.contentCard}>
              {renderContent()}

              {/* ── 목록보기 버튼 ── */}
              <div className={styles.listBtnWrap}>
                <motion.button
                  className={styles.listBtn}
                  onClick={() => navigate(fromPath)}
                  whileTap={{ scale: 0.96 }}
                >
                  <MdList size={18} />
                  목록보기
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </TransitionLayout>
  )
}
