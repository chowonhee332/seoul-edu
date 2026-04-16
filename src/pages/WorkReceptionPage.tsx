import { useState } from 'react'
import { motion } from 'framer-motion'
import { MdCheck } from 'react-icons/md'
import Footer from '../components/Footer'
import TransitionLayout from '../components/TransitionLayout'
import Breadcrumb from '../components/Breadcrumb'
import styles from './WorkReceptionPage.module.css'

export default function WorkReceptionPage() {
  const [consent, setConsent] = useState(false)

  return (
    <TransitionLayout>
      <div className={styles.page}>
        <Breadcrumb currentLabel="작업 일정 접수" />

        <main className={styles.body}>
          <div className={styles.inner}>
            <h1 className={styles.sectionTitle}>기본정보수집</h1>

            {/* 사업 선택 */}
            <motion.div 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.row}>
                <div className={styles.labelWrap}>
                  <label className={styles.label}>사업선택</label>
                  <span className={styles.required}>*</span>
                </div>
                <div className={styles.inputWrap}>
                  <select className={`${styles.input} ${styles.select}`}>
                    <option value="">사업을 선택해주세요</option>
                    <option value="1">스마트단말 보급사업</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* 교육청/학교 정보 */}
            <motion.div 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.compactFields}>
                <div className={styles.row}>
                  <div className={styles.labelWrap}>
                    <label className={styles.label}>교육청</label>
                    <span className={styles.required}>*</span>
                  </div>
                  <div className={styles.inputWrap}>
                    <input type="text" className={`${styles.input} ${styles.inputDisabled}`} value="서울특별시교육청" readOnly />
                  </div>
                </div>
                <div className={styles.row} style={{ marginTop: '16px' }}>
                  <div className={styles.labelWrap}>
                    <label className={styles.label}>학교</label>
                    <span className={styles.required}>*</span>
                  </div>
                  <div className={styles.inputWrap}>
                    <input type="text" className={`${styles.input} ${styles.inputDisabled}`} value="가락고등학교" readOnly />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 담당자 정보 & 개인정보 동의 그리드 */}
            <div className={styles.gridTwoColumn}>
              {/* 왼쪽: 담당자 정보 */}
              <motion.div 
                className={styles.card}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className={styles.compactFields}>
                  <div className={styles.compactRow}>
                    <div className={styles.labelWrap}>
                      <span className={styles.label}>담당자명</span>
                      <span className={styles.required}>*</span>
                    </div>
                    <input type="text" className={styles.input} placeholder="담당자명을 입력해주세요." />
                  </div>
                  <div className={styles.compactRow}>
                    <div className={styles.labelWrap}>
                      <span className={styles.label}>연락처1</span>
                      <span className={styles.required}>*</span>
                    </div>
                    <input type="tel" className={styles.input} placeholder="'-'를 제외하고 숫자만 입력" />
                  </div>
                  <div className={styles.compactRow}>
                    <div className={styles.labelWrap}>
                      <span className={styles.label}>연락처2</span>
                    </div>
                    <input type="tel" className={styles.input} placeholder="'-'를 제외하고 숫자만 입력" />
                  </div>
                  <div className={styles.compactRow}>
                    <div className={styles.labelWrap}>
                      <span className={styles.label}>이메일</span>
                    </div>
                    <input type="email" className={styles.input} placeholder="name@example.com" />
                  </div>
                  <div className={styles.compactRow}>
                    <div className={styles.labelWrap}>
                      <span className={styles.label}>요청내용</span>
                    </div>
                    <input type="text" className={styles.input} />
                  </div>
                </div>
              </motion.div>

              {/* 오른쪽: 개인정보 동의 */}
              <motion.div 
                className={styles.card}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className={styles.consentSection}>
                  <h3 className={styles.consentTitle}>작업 일정 개인정보 수집·이용</h3>
                  <div className={styles.consentBox}>
                    <strong style={{ display: 'block', marginBottom: '12px', fontSize: '15px' }}>개인정보 제공 동의</strong>
                    <div className={styles.consentText}>
                      스마트단말의 작업 일정 접수를 위해 아래와 같이 개인정보를 수집·이용하고자 합니다.<br/>
                      내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오.<br/><br/>
                      1. 수집항목(필수) : 성명, 연락처, E-Mail
                    </div>
                  </div>
                  
                  <button 
                    className={`${styles.consentBtn} ${consent ? styles.consentBtnActive : ''}`}
                    onClick={() => setConsent(!consent)}
                  >
                    <div className={`${styles.checkCircle} ${consent ? styles.checkCircleActive : ''}`}>
                      {consent && <MdCheck size={14} color="white" />}
                    </div>
                    개인정보 제공 동의 합니다
                  </button>
                </div>
              </motion.div>
            </div>

            {/* 제출 버튼 */}
            <div className={styles.footerActions}>
              <motion.button 
                className={styles.btnSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                다음
              </motion.button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </TransitionLayout>
  )
}
