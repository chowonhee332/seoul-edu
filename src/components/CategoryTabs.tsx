import { motion, Variants } from 'framer-motion'
import { itemVariants } from '../lib/animations'
import styles from './CategoryTabs.module.css'

export interface CategoryItem {
  id: number
  label: string
  icon: React.ReactNode
}

interface CategoryTabsProps {
  categories: CategoryItem[]
  activeId: number
  onChange: (id: number) => void
  isSticky: boolean
  variants?: Variants
}

export default function CategoryTabs({
  categories,
  activeId,
  onChange,
  isSticky,
  variants,
}: CategoryTabsProps) {
  return (
    <motion.div
      className={`${styles.card} ${isSticky ? styles.stickyActive : ''}`}
      variants={variants ?? itemVariants}
    >
      {categories.map((cat, i) => (
        <div key={cat.id} className={styles.item}>
          <motion.button
            className={`${styles.btn} ${activeId === cat.id ? styles.btnActive : ''}`}
            onClick={() => onChange(cat.id)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.icon}>{cat.icon}</span>
            <span className={styles.label}>{cat.label}</span>
          </motion.button>
          {i < categories.length - 1 && <div className={styles.divider} />}
        </div>
      ))}
    </motion.div>
  )
}
