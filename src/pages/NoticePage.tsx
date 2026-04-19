import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants, itemVariants } from '../lib/animations'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import CommonBoard from '../components/CommonBoard'
import styles from './NoticePage.module.css'

// ── 공지사항 샘플 데이터 ─────────────────────────────────
const NOTICES = [
  {
    id: 12, no: 12, title: '[안내] 2026년 스마트기기 정기 점검 일정 안내', date: '2026. 04. 10', views: 142,
    content: '안녕하세요, 서울특별시교육청 스마트기기 관리 시스템입니다.\n\n2026년 스마트기기 정기 점검 일정을 아래와 같이 안내드립니다.\n\n■ 점검 기간\n- 1차: 2026년 5월 12일(화) ~ 5월 16일(토)\n- 2차: 2026년 9월 7일(월) ~ 9월 11일(금)\n\n■ 점검 대상\n- 서울시 내 초·중·고등학교 지급 스마트기기 전체\n\n■ 점검 내용\n- 기기 외관 상태 확인 및 파손 여부 점검\n- 배터리 성능 측정 및 교체 대상 선별\n- MDM 에이전트 최신 버전 업데이트\n- 펌웨어 및 OS 업데이트 적용\n\n■ 유의사항\n- 점검 기간 중 일부 원격 관리 기능이 일시 제한될 수 있습니다.\n- 점검 대상 기기는 사전에 개별 공문을 통해 안내됩니다.\n- 문의사항은 스마트기기 지원센터(1588-0000)로 연락 바랍니다.\n\n감사합니다.',
  },
  {
    id: 11, no: 11, title: '[공지] 서버 유지보수로 인한 서비스 중단 안내 (4월 5일)', date: '2026. 04. 02', views: 310,
    content: '안녕하세요, 서울특별시교육청 스마트기기 관리 시스템입니다.\n\n서비스 안정화를 위한 서버 유지보수 작업으로 인해 아래와 같이 서비스가 일시 중단될 예정입니다.\n\n■ 중단 일시\n- 2026년 4월 5일(일) 오전 2:00 ~ 오전 6:00 (약 4시간)\n\n■ 중단 서비스\n- 스마트기기 관리 시스템 전체 서비스\n- A/S 접수 및 처리 현황 조회\n- 원격 MDM 관리 기능\n\n■ 유의사항\n- 위 시간 중에는 시스템 접속이 불가합니다.\n- 긴급 A/S 문의는 전화(1588-0000)로 접수해 주시기 바랍니다.\n- 작업 일정은 내부 사정에 따라 변경될 수 있습니다.\n\n이용에 불편을 드려 죄송합니다. 감사합니다.',
  },
  {
    id: 10, no: 10, title: '[업데이트] 충전함 펌웨어 v3.1.0 배포 안내', date: '2026. 03. 27', views: 3,
    content: '안녕하세요, 서울특별시교육청 스마트기기 관리 시스템입니다.\n\n스마트 충전함 펌웨어 v3.1.0이 배포되었습니다. 주요 변경 사항은 아래와 같습니다.\n\n■ 업데이트 버전\n- v3.1.0 (이전 버전: v3.0.7)\n\n■ 주요 변경 사항\n- 충전 포트별 개별 전원 제어 기능 추가\n- 과전압 감지 시 자동 차단 로직 개선\n- 네트워크 연결 불안정 환경에서의 동기화 오류 수정\n- 관리자 앱 연동 속도 개선 (평균 1.2초 → 0.4초)\n\n■ 업데이트 방법\n- 스마트기기 관리 시스템 > 충전함 관리 > 펌웨어 업데이트 메뉴에서 진행\n- 업데이트 소요 시간: 기기당 약 5분\n\n■ 유의사항\n- 업데이트 중에는 충전함 전원을 끄지 마십시오.\n- 업데이트 전 충전함에 연결된 기기를 분리해 주세요.\n\n감사합니다.',
  },
  {
    id: 9, no: 9, title: 'SDP 공지사항', date: '2026. 01. 27', views: 24,
    content: 'SDP(Smart Device Platform) 관련 공지사항입니다.\n\n2026년 1분기 SDP 운영 현황 및 주요 정책 변경 사항을 안내드립니다.\n\n■ 정책 변경 사항\n- 기기 등록 승인 절차 간소화 (기존 3단계 → 2단계)\n- 학교 관리자 계정 비밀번호 주기적 변경 의무화 (90일 주기)\n\n■ 신규 기능 안내\n- 기기별 사용 통계 리포트 다운로드 기능 추가\n- 모바일 앱을 통한 A/S 접수 기능 베타 서비스 시작\n\n문의사항은 담당자(sdp@sen.go.kr)에게 이메일로 연락 바랍니다.\n\n감사합니다.',
  },
  {
    id: 8, no: 8, title: '0126 테스트 공지사항', date: '2026. 01. 26', views: 28,
    content: '이 공지사항은 시스템 테스트 목적으로 작성된 임시 게시물입니다.\n\n실제 서비스에서는 표시되지 않을 수 있습니다.\n\n테스트 항목:\n- 공지사항 등록 및 조회 기능\n- 첨부파일 업로드/다운로드\n- 페이지네이션 동작\n- 조회수 카운트\n\n테스트 완료 후 해당 게시물은 삭제 처리될 예정입니다.',
  },
  {
    id: 7, no: 7, title: '[안내] 갤럭시탭 MDM 정책 업데이트 적용 안내', date: '2025. 12. 20', views: 87,
    content: '안녕하세요, 서울특별시교육청 스마트기기 관리 시스템입니다.\n\n삼성 갤럭시탭 기기를 대상으로 MDM 정책이 업데이트되었습니다.\n\n■ 적용 대상\n- 갤럭시탭 A8, A9, S6 Lite (교육청 지급 기기 한정)\n\n■ 주요 변경 정책\n- 스크린 타임 관리 기능 강화 (수업 시간 외 앱 사용 제한)\n- 카메라 앱 사용 정책 세분화 (학교별 설정 가능)\n- 외부 앱 설치 차단 정책 업데이트\n- Knox 보안 패치 최신화\n\n■ 적용 방법\n- 기기 전원 ON 후 Wi-Fi 연결 시 자동 적용\n- 미적용 기기는 관리 시스템에서 강제 푸시 가능\n\n정책 변경 관련 문의는 스마트기기 지원센터로 연락 바랍니다.\n\n감사합니다.',
  },
  {
    id: 6, no: 6, title: '[공지] 연말 A/S 접수 마감일 안내 (12월 27일)', date: '2025. 12. 15', views: 204,
    content: '안녕하세요, 서울특별시교육청 스마트기기 관리 시스템입니다.\n\n연말 업무 종료에 따른 A/S 접수 마감일을 안내드립니다.\n\n■ 2025년 연말 A/S 접수 마감\n- 온라인 접수: 2025년 12월 27일(토) 오후 6시\n- 방문 접수: 2025년 12월 26일(금) 오후 5시\n\n■ 업무 재개\n- 2026년 1월 2일(금)부터 정상 운영\n\n■ 유의사항\n- 마감일 이후 접수된 A/S 요청은 2026년 1월 이후 순차 처리됩니다.\n- 긴급 장애의 경우 비상 연락망(1588-0000)을 이용해 주세요.\n\n연말연시 건강하고 행복한 시간 보내시기 바랍니다.\n감사합니다.',
  },
  {
    id: 5, no: 5, title: '[업데이트] Windows 드라이버 패키지 v1.9 배포', date: '2025. 11. 30', views: 175,
    content: '안녕하세요, 서울특별시교육청 스마트기기 관리 시스템입니다.\n\nWindows 환경용 스마트기기 드라이버 패키지 v1.9가 배포되었습니다.\n\n■ 업데이트 버전\n- v1.9.0 (이전 버전: v1.7.3)\n\n■ 주요 변경 사항\n- Windows 11 24H2 호환성 추가\n- USB 연결 인식 오류 수정\n- 드라이버 서명 방식 변경 (SHA-256 적용)\n- 설치 패키지 용량 최적화 (기존 280MB → 195MB)\n\n■ 다운로드\n- 스마트기기 관리 시스템 > 다운로드 센터에서 다운로드 가능\n- 파일명: SEN_DeviceDriver_v1.9.0_Win.exe\n\n■ 설치 방법\n1. 기존 드라이버 제거 후 재시작\n2. 새 드라이버 패키지 실행 및 설치\n3. 설치 완료 후 재시작\n\n감사합니다.',
  },
  {
    id: 4, no: 4, title: '[안내] 학교별 스마트기기 현황 조회 기능 개선 안내', date: '2025. 11. 10', views: 92,
    content: '안녕하세요, 서울특별시교육청 스마트기기 관리 시스템입니다.\n\n학교별 스마트기기 현황 조회 기능이 개선되었습니다.\n\n■ 개선 내용\n- 기기 상태(정상/수리중/분실/폐기)별 필터링 기능 추가\n- 엑셀 다운로드 시 학급별 정렬 옵션 추가\n- 대시보드 차트 시각화 개선 (원형 → 막대 그래프)\n- 기기 이력 조회 기간 확장 (기존 1년 → 3년)\n\n■ 적용 일시\n- 2025년 11월 10일(월)부터 즉시 적용\n\n■ 이용 방법\n- 관리자 로그인 > 기기 현황 > 학교별 조회 메뉴 이용\n\n개선된 기능 이용에 불편함이 있으실 경우 지원센터로 문의해 주세요.\n감사합니다.',
  },
  {
    id: 3, no: 3, title: '[공지] 시스템 점검에 따른 일부 서비스 이용 제한 안내', date: '2025. 10. 28', views: 431,
    content: '안녕하세요, 서울특별시교육청 스마트기기 관리 시스템입니다.\n\n정기 시스템 점검으로 인해 일부 서비스 이용이 제한됩니다.\n\n■ 점검 일시\n- 2025년 10월 31일(금) 오후 11:00 ~ 11월 1일(토) 오전 5:00\n\n■ 제한 서비스\n- A/S 온라인 접수 기능\n- 기기 현황 조회 및 다운로드\n- 알림 발송 기능\n\n■ 정상 운영 서비스\n- 접수 현황 조회 (읽기 전용)\n- 공지사항 열람\n\n이용에 불편을 드려 죄송합니다. 감사합니다.',
  },
  {
    id: 2, no: 2, title: '[안내] A/S 접수 절차 변경 안내 (10월 1일부터 적용)', date: '2025. 10. 05', views: 318,
    content: '안녕하세요, 서울특별시교육청 스마트기기 관리 시스템입니다.\n\n2025년 10월 1일부터 A/S 접수 절차가 변경되었습니다.\n\n■ 변경 전\n1. 온라인 접수 → 2. 담당자 확인 연락 → 3. 방문 수거 또는 택배 발송\n\n■ 변경 후\n1. 온라인 접수 (증상 사진 첨부 필수) → 2. 자동 분류 및 접수 확인 문자 발송 → 3. 방문 수거 또는 택배 발송\n\n■ 주요 변경 사항\n- 접수 시 증상 사진 1~3장 첨부 필수화\n- 접수 확인 문자 자동 발송 (처리 시간 단축)\n- 수리 진행 상황 실시간 알림 서비스 추가\n\n더 빠르고 편리한 서비스를 위해 지속적으로 노력하겠습니다.\n감사합니다.',
  },
  {
    id: 1, no: 1, title: '[공지] 서울특별시교육청 스마트기기 관리 시스템 오픈 안내', date: '2025. 09. 01', views: 1024,
    content: '안녕하세요, 서울특별시교육청입니다.\n\n서울특별시교육청 스마트기기 관리 시스템이 2025년 9월 1일부터 정식 오픈되었습니다.\n\n■ 주요 서비스\n- A/S 접수: 스마트기기 고장 및 파손 시 온라인으로 간편하게 접수\n- 접수 현황: 접수된 A/S 진행 상황을 실시간으로 확인\n- 기기 현황: 학교별 스마트기기 보유 및 운영 현황 조회\n- 다운로드 센터: 드라이버, 매뉴얼 등 관련 파일 다운로드\n- 동영상 가이드: 스마트기기 사용법 및 문제 해결 영상 제공\n\n■ 이용 대상\n- 서울시 내 초·중·고등학교 교직원 및 관리자\n\n■ 문의\n- 스마트기기 지원센터: 1588-0000\n- 운영 시간: 평일 오전 9시 ~ 오후 6시\n\n스마트기기 관리 시스템을 통해 더욱 편리하게 서비스를 이용하시기 바랍니다.\n감사합니다.',
  },
]

const ITEMS_PER_PAGE = 10
type SortOption = 'latest' | 'views'


export default function NoticePage() {
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  const sortedNotices = [...NOTICES].sort((a, b) => {
    if (sortBy === 'views') return b.views - a.views
    return b.no - a.no
  })

  const totalPages = Math.max(1, Math.ceil(sortedNotices.length / ITEMS_PER_PAGE))
  const currentItems = sortedNotices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handleItemClick = (item: typeof NOTICES[0]) => {
    navigate('/content-detail', {
      state: {
        item: { ...item, type: '공지', views: item.views.toString() },
        list: sortedNotices.map((n) => ({ ...n, type: '공지', views: n.views.toString() })),
        fromPath: '/notice',
        fromLabel: '공지사항',
      },
    })
  }

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <Breadcrumb currentLabel="공지사항" />

        <div className={styles.body}>
          <motion.div
            className={styles.inner}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <PageTitle title="공지사항" variants={itemVariants} />

            <CommonBoard
              title="공지사항"
              totalCount={NOTICES.length}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showSearch={false} /* 공지사항은 검색창 일단 비노출 */
              itemsCount={currentItems.length}
              header={
                <div className={styles.tableHead}>
                  <div className={styles.noCell}>No.</div>
                  <div className={`${styles.thCell} ${styles.flex1}`}>제목</div>
                  <div className={`${styles.thCell} ${styles.dateCell}`}>등록일</div>
                  <div className={`${styles.thCell} ${styles.viewsCell}`}>조회수</div>
                </div>
              }
            >
              <div className={styles.table}>
                <AnimatePresence mode="popLayout">
                  {currentItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className={styles.tableRow}
                      onClick={() => handleItemClick(item)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className={styles.noCell}>{item.no}</div>
                      <div className={`${styles.tdCell} ${styles.flex1}`}>{item.title}</div>
                      <div className={`${styles.tdCell} ${styles.dateCell}`}>{item.date}</div>
                      <div className={`${styles.tdCell} ${styles.viewsCell}`}>{item.views}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CommonBoard>
          </motion.div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  )
}
