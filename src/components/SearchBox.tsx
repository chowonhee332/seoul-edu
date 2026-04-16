import { MdSearch } from 'react-icons/md'
import styles from './SearchBox.module.css'

interface SearchBoxProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBox({
  value,
  onChange,
  placeholder = '검색어를 입력해주세요',
  className = '',
}: SearchBoxProps) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <MdSearch size={22} color="#a0a0a1" />
    </div>
  )
}
