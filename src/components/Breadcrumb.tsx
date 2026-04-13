import { Link } from 'react-router-dom'
import { MdHome, MdChevronRight } from 'react-icons/md'
import styles from './Breadcrumb.module.css'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  currentLabel?: string
}

export default function Breadcrumb({ items = [], currentLabel }: BreadcrumbProps) {
  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbInner}>
        <Link to="/" className={styles.breadcrumbHome}>
          <MdHome size={16} />
        </Link>
        <MdChevronRight size={12} className={styles.separator} />
        
        {items.map((item, index) => (
          <div key={index} className={styles.itemWrap}>
            {item.path ? (
              <Link to={item.path} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.text}>{item.label}</span>
            )}
            <MdChevronRight size={12} className={styles.separator} />
          </div>
        ))}
        
        {currentLabel && (
          <span className={styles.current}>{currentLabel}</span>
        )}
      </div>
    </div>
  )
}
