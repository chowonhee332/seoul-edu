import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants, itemVariants } from '../lib/animations'
import { MdPhone, MdAccessTime, MdChevronRight, MdFirstPage, MdLastPage, MdSearch, MdClose } from 'react-icons/md'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'
import styles from './ServiceCenterPage.module.css'

// ── Leaflet 기본 마커 아이콘 경로 수정 (Vite 환경에서 필요)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// 선택된 센터로 지도를 부드럽게 이동시키는 컴포넌트
function MapFlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  map.flyTo([lat, lng], 15, { duration: 1.2 })
  return null
}

// ── 광역시/도 목록 ──────────────────────────────────────
const REGIONS: Record<string, string[]> = {
  '서울특별시':  ['강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구'],
  '경기도':      ['수원시','성남시','의정부시','안양시','부천시','광명시','평택시','동두천시','안산시','고양시','과천시','구리시','남양주시','오산시','시흥시','군포시','의왕시','하남시','용인시','파주시','이천시','안성시','김포시','화성시','광주시','양주시','포천시','여주시'],
  '부산광역시':  ['중구','서구','동구','영도구','부산진구','동래구','남구','북구','해운대구','사하구','금정구','강서구','연제구','수영구','사상구','기장군'],
  '인천광역시':  ['중구','동구','미추홀구','연수구','남동구','부평구','계양구','서구','강화군','옹진군'],
  '대구광역시':  ['중구','동구','서구','남구','북구','수성구','달서구','달성군'],
  '대전광역시':  ['동구','중구','서구','유성구','대덕구'],
  '광주광역시':  ['동구','서구','남구','북구','광산구'],
  '울산광역시':  ['중구','남구','동구','북구','울주군'],
  '세종특별자치시': ['세종시'],
}

// ── 서비스센터 샘플 데이터 ─────────────────────────────
const ALL_CENTERS = [
  { id:1,  no:1,  region:'서울특별시', district:'강남구',   name:'KT플라자 강남역점',   phone:'02-1234-4567',  address:'서울 강남구 테헤란로 120 (역삼동)',      weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.4979, lng:127.0276 },
  { id:2,  no:2,  region:'서울특별시', district:'강남구',   name:'KT플라자 역삼점',     phone:'02-1234-4568',  address:'서울 강남구 역삼로 215 (역삼동)',         weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.5005, lng:127.0333 },
  { id:3,  no:3,  region:'서울특별시', district:'서초구',   name:'KT플라자 서초점',     phone:'02-1234-4569',  address:'서울 서초구 서초대로 77 (서초동)',        weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.4937, lng:127.0162 },
  { id:4,  no:4,  region:'서울특별시', district:'송파구',   name:'KT플라자 잠실점',     phone:'02-1234-4570',  address:'서울 송파구 올림픽로 240 (잠실동)',       weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.5113, lng:127.0988 },
  { id:5,  no:5,  region:'서울특별시', district:'마포구',   name:'KT플라자 홍대점',     phone:'02-1234-4571',  address:'서울 마포구 양화로 188 (동교동)',         weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.5563, lng:126.9238 },
  { id:6,  no:6,  region:'서울특별시', district:'종로구',   name:'KT플라자 광화문점',   phone:'02-1234-4572',  address:'서울 종로구 세종대로 165 (세종로)',       weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.5720, lng:126.9769 },
  { id:7,  no:7,  region:'서울특별시', district:'용산구',   name:'KT플라자 이태원점',   phone:'02-1234-4573',  address:'서울 용산구 이태원로 177 (이태원동)',     weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.5345, lng:126.9950 },
  { id:8,  no:8,  region:'서울특별시', district:'영등포구', name:'KT플라자 여의도점',   phone:'02-1234-4574',  address:'서울 영등포구 여의대로 108 (여의도동)',   weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.5215, lng:126.9245 },
  { id:9,  no:9,  region:'서울특별시', district:'성동구',   name:'KT플라자 왕십리점',   phone:'02-1234-4575',  address:'서울 성동구 왕십리로 83 (하왕십리동)',   weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.5607, lng:127.0384 },
  { id:10, no:10, region:'서울특별시', district:'노원구',   name:'KT플라자 노원점',     phone:'02-1234-4576',  address:'서울 노원구 동일로 1414 (상계동)',       weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.6553, lng:127.0619 },
  { id:11, no:11, region:'경기도',     district:'수원시',   name:'KT플라자 수원역점',   phone:'031-234-5678',  address:'경기도 수원시 팔달구 덕영대로 924',      weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.2663, lng:127.0008 },
  { id:12, no:12, region:'경기도',     district:'성남시',   name:'KT플라자 판교점',     phone:'031-234-5679',  address:'경기도 성남시 분당구 판교역로 166',      weekday:'09:00~18:00', saturday:'09:00~13:00', lat:37.3947, lng:127.1112 },
]

const ITEMS_PER_PAGE = 5

type SearchTab = 'region' | 'name'


export default function ServiceCenterPage() {
  const [activeTab, setActiveTab]             = useState<SearchTab>('region')
  const [selectedRegion, setSelectedRegion]   = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [nameQuery, setNameQuery]             = useState('')
  const [appliedRegion, setAppliedRegion]     = useState('')
  const [appliedDistrict, setAppliedDistrict] = useState('')
  const [appliedName, setAppliedName]         = useState('')
  const [currentPage, setCurrentPage]         = useState(1)
  const [selectedCenter, setSelectedCenter]   = useState<typeof ALL_CENTERS[0] | null>(null)

  const handleTabChange = (tab: SearchTab) => {
    setActiveTab(tab)
    setSelectedRegion(''); setSelectedDistrict(''); setNameQuery('')
    setAppliedRegion('');  setAppliedDistrict('');  setAppliedName('')
    setCurrentPage(1); setSelectedCenter(null)
  }

  const handleSearch = () => {
    if (activeTab === 'region') {
      setAppliedRegion(selectedRegion)
      setAppliedDistrict(selectedDistrict)
    } else {
      setAppliedName(nameQuery)
    }
    setCurrentPage(1); setSelectedCenter(null)
  }

  const filteredCenters = ALL_CENTERS.filter((c) => {
    if (activeTab === 'region') {
      const matchRegion   = appliedRegion   ? c.region   === appliedRegion   : true
      const matchDistrict = appliedDistrict ? c.district === appliedDistrict : true
      return matchRegion && matchDistrict
    }
    return appliedName ? c.name.includes(appliedName) : true
  })

  const totalPages   = Math.max(1, Math.ceil(filteredCenters.length / ITEMS_PER_PAGE))
  const currentItems = filteredCenters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )
  const districts = selectedRegion ? (REGIONS[selectedRegion] ?? []) : []

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <Breadcrumb currentLabel="서비스센터 안내" />

        <div className={styles.body}>
          <motion.div
            className={styles.inner}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <PageTitle title="서비스센터 안내" variants={itemVariants} />

            <motion.div className={styles.layout} variants={itemVariants}>

              {/* ── 좌측 패널 ── */}
              <div className={styles.leftPanel}>

                {/* 탭 */}
                <div className={styles.tabs}>
                  {(['region', 'name'] as SearchTab[]).map((tab) => (
                    <button
                      key={tab}
                      className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab === 'region' ? '지역' : '지역명'}
                    </button>
                  ))}
                </div>

                {/* 필터 */}
                <div className={styles.filterArea}>
                  {activeTab === 'region' ? (
                    <>
                      <div className={styles.selectWrap}>
                        <select
                          className={styles.select}
                          value={selectedRegion}
                          onChange={(e) => { setSelectedRegion(e.target.value); setSelectedDistrict('') }}
                        >
                          <option value="">광역시/도</option>
                          {Object.keys(REGIONS).map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                      <div className={styles.districtRow}>
                        <div className={`${styles.selectWrap} ${styles.flex1}`}>
                          <select
                            className={styles.select}
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedRegion}
                          >
                            <option value="">시/군/구 선택</option>
                            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <motion.button className={styles.searchBtn} onClick={handleSearch} whileTap={{ scale: 0.95 }}>
                          검색
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    <div className={styles.nameSearchRow}>
                      <div className={styles.nameInputWrap}>
                        <MdSearch size={18} color="#a0a0a1" />
                        <input
                          type="text"
                          className={styles.nameInput}
                          placeholder="서비스센터명 검색"
                          value={nameQuery}
                          onChange={(e) => setNameQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                      </div>
                      <motion.button className={styles.searchBtn} onClick={handleSearch} whileTap={{ scale: 0.95 }}>
                        검색
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* 결과 수 */}
                <div className={styles.resultCount}>
                  <span className={styles.resultLabel}>전체</span>
                  <span className={styles.resultValue}>{filteredCenters.length}개</span>
                </div>

                {/* 센터 리스트 */}
                <div className={styles.centerList}>
                  <AnimatePresence mode="popLayout">
                    {currentItems.map((center, idx) => (
                      <motion.div
                        key={center.id}
                        className={`${styles.centerItem} ${selectedCenter?.id === center.id ? styles.centerItemActive : ''}`}
                        onClick={() => setSelectedCenter(center)}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className={`${styles.badge} ${selectedCenter?.id === center.id ? styles.badgeActive : ''}`}>
                          {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                        </div>
                        <div className={styles.centerInfo}>
                          <div className={styles.centerTopRow}>
                            <span className={styles.centerName}>{center.name}</span>
                            <span className={styles.centerPhone}><MdPhone size={13} />{center.phone}</span>
                          </div>
                          <p className={styles.centerAddress}>{center.address}</p>
                          <div className={styles.centerHours}>
                            <span className={styles.hoursItem}><MdAccessTime size={12} />평일: {center.weekday}</span>
                            <span className={styles.hoursDivider}>|</span>
                            <span className={styles.hoursItem}>토요일: {center.saturday}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <motion.button className={styles.pageBtn} onClick={() => setCurrentPage(1)} whileTap={{ scale: 0.9 }}><MdFirstPage size={16} /></motion.button>
                    <motion.button className={styles.pageBtn} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} whileTap={{ scale: 0.9 }}><MdChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /></motion.button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <motion.button key={p} className={`${styles.pageNumBtn} ${currentPage === p ? styles.pageActive : ''}`} onClick={() => setCurrentPage(p)} whileTap={{ scale: 0.9 }}>{p}</motion.button>
                    ))}
                    <motion.button className={styles.pageBtn} onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} whileTap={{ scale: 0.9 }}><MdChevronRight size={16} /></motion.button>
                    <motion.button className={styles.pageBtn} onClick={() => setCurrentPage(totalPages)} whileTap={{ scale: 0.9 }}><MdLastPage size={16} /></motion.button>
                  </div>
                )}
              </div>

              {/* ── 우측 지도 패널 (Leaflet) ── */}
              <div className={styles.mapPanel}>
                <MapContainer
                  center={[37.5326, 127.0246]}
                  zoom={12}
                  className={styles.map}
                  zoomControl={true}
                >
                  {/* OpenStreetMap 타일 */}
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />

                  {/* 선택 시 지도 이동 */}
                  {selectedCenter && (
                    <MapFlyTo lat={selectedCenter.lat} lng={selectedCenter.lng} />
                  )}

                  {/* 필터된 센터 마커 */}
                  {filteredCenters.map((center) => (
                    <Marker
                      key={center.id}
                      position={[center.lat, center.lng]}
                      eventHandlers={{ click: () => setSelectedCenter(center) }}
                    >
                      <Popup>
                        <div className={styles.leafletPopup}>
                          <strong>{center.name}</strong>
                          <span>{center.address}</span>
                          <span style={{ color: '#1a75ff' }}>{center.phone}</span>
                          <span>평일: {center.weekday} | 토요일: {center.saturday}</span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {/* 선택 센터 정보 오버레이 */}
                <AnimatePresence>
                  {selectedCenter && (
                    <motion.div
                      className={styles.mapPopup}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.popupHeader}>
                        <span className={styles.popupName}>{selectedCenter.name}</span>
                        <button className={styles.popupClose} onClick={() => setSelectedCenter(null)}><MdClose size={18} /></button>
                      </div>
                      <p className={styles.popupAddress}>{selectedCenter.address}</p>
                      <p className={styles.popupPhone}>{selectedCenter.phone}</p>
                      <div className={styles.popupHours}>
                        <span>평일: {selectedCenter.weekday}</span>
                        <span className={styles.hoursDivider}>|</span>
                        <span>토요일: {selectedCenter.saturday}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  )
}
