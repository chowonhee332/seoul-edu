import { Link } from 'react-router-dom'
import { MdNorthEast, MdAssignment, MdAssignmentTurnedIn, MdTabletAndroid, MdLocationOn } from 'react-icons/md'
import styles from './QuickServiceBar.module.css'

const QUICK_SERVICES = [
  { icon: MdAssignment, label: 'AS 접수', iconBg: '#1a75ff', path: '/as-reception' },
  { icon: MdAssignmentTurnedIn, label: 'AS조회 변경', iconBg: '#4dc6e5', path: '/as-history' },
  { icon: MdTabletAndroid, label: '단말 현황', iconBg: '#00b4a0', path: '/status' },
  { icon: MdLocationOn, label: '서비스 센터안내', iconBg: '#272727', path: '/service-center' },
]

export default function QuickServiceBar() {
  return (
    <div className={styles.quickBar}>
      <div className={styles.quickBarInner}>
        {QUICK_SERVICES.map((item, idx) => (
          <Link
            key={item.label}
            to={item.path}
            className={`${styles.quickService} ${idx < QUICK_SERVICES.length - 1 ? styles.quickServiceDivider : ''}`}
          >
            <div
              className={styles.quickServiceIconWrap}
              style={{ background: item.iconBg, borderRadius: '50%' }}
            >
              <item.icon size={20} color="#fff" />
            </div>
            <div className={styles.quickServiceContent}>
              <span className={styles.quickServiceLabel}>{item.label}</span>
              <span className={styles.quickServiceArrow}>
                <MdNorthEast color="rgba(23,23,25,1)" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
