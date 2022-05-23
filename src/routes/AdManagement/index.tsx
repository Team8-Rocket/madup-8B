import { useState, useEffect, useRef, MouseEvent } from 'react'
import styles from './adManagement.module.scss'
import { ArrowDown } from 'assets'
import Card from './Card'

const DROPDOWN_ITEM = ['전체 광고', '진행중', '중단됨']

const AdManagement = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState('전체 광고')
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
    <div className={styles.content}>
      <h1 className={styles.title}>광고관리</h1>

      <div className={styles.cardContainer}>
        <div className={styles.cardMenu}>
          <div ref={dropdownRef}>
            <button type='button' className={styles.dropdownButton} onClick={handleClickDropdown}>
              {selectedWord}
              <ArrowDown />
            </button>
            {isOpen && (
              <ul className={styles.dropdownMenu}>
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
            )}
          </div>

          <button type='button' className={styles.addAdButton}>
            광고 만들기
          </button>
        </div>
        <div className={styles.gridContainer}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default AdManagement
