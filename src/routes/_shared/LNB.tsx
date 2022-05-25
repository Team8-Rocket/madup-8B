import { useState, useEffect, useRef, MouseEvent } from 'react'
import cx from 'classnames'
import { NavLink } from 'react-router-dom'

import { Logo, Dashboard, Ads, Guide, ArrowDown } from 'assets'
import styles from './lnb.module.scss'

const DROPDOWN_ITEM = ['매드업', '서비스 추가하기']

const LNB = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState('매드업')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const clickDropdownOutside = (e: CustomEvent<MouseEvent>) => {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  const handleClickDropdownItem = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedWord(e.currentTarget.value)
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickDropdownOutside as EventListener)

    return () => {
      document.removeEventListener('mousedown', clickDropdownOutside as EventListener)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <hr />
      <div className={styles.serviceContainer}>
        <p>서비스</p>
        <div ref={dropdownRef}>
          <button
            type='button'
            className={cx(styles.dropdown, { [styles.clicked]: !isOpen })}
            onClick={handleClickDropdown}
          >
            {selectedWord}
            <ArrowDown />
          </button>
          <ul className={cx(styles.dropdownMenu, { [styles.clicked]: isOpen })}>
            {DROPDOWN_ITEM.map((item) => {
              return (
                <li className={styles.dropdownList} key={item}>
                  <button type='button' value={item} onClick={handleClickDropdownItem}>
                    {item}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <nav>
        <p>광고 센터</p>
        <ul>
          <li>
            <NavLink to='/' className={({ isActive }) => cx({ [styles.active]: isActive })}>
              <Dashboard />
              대시보드
            </NavLink>
          </li>
          <li>
            <NavLink to='ad' className={({ isActive }) => cx({ [styles.active]: isActive })}>
              <Ads />
              광고관리
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.tutorial}>
        <Guide />
        <div className={styles.tutorialText}>
          <strong>레버 이용 가이드</strong>
          <p>시작하기 전에 알아보기</p>
        </div>
      </div>

      <div className={styles.termsCondition}>
        <div>레버는 함께 만들어갑니다.</div>
        <div>이용약관</div>
      </div>
    </div>
  )
}

export default LNB
