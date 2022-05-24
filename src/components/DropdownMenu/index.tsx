import { MouseEvent, useEffect, useRef, useState } from 'react'

import { ArrowDown } from 'assets'
import styles from './dropdownMenu.module.scss'

interface MemuTitle {
  [key: string]: string
}

const MENU_TITLE: MemuTitle = {
  roas: 'ROAS',
  cost: '광고비',
  imp: '노출수',
  click: '클릭수',
  conv: '전환수',
  convValue: '매출',
}

interface Props {
  menuList: string[]
  category: string
  setCategory: (item: string) => void
}

const DropdonwnMenu = ({ menuList, category, setCategory }: Props) => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggleDropdown = () => {
    setToggleDropdown((prev) => !prev)
  }

  const handleClickDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    setCategory(e.currentTarget.value)
    setToggleDropdown(false)
  }

  const clickDropdownOutside = (e: CustomEvent<MouseEvent>) => {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      setToggleDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickDropdownOutside as EventListener)

    return () => {
      document.removeEventListener('mousedown', clickDropdownOutside as EventListener)
    }
  }, [])

  return (
    <div ref={dropdownRef}>
      <button className={styles.dropdownButton} onClick={handleToggleDropdown} type='button'>
        {MENU_TITLE[category]}
        <ArrowDown />
      </button>
      {toggleDropdown && (
        <ul className={styles.dropdownMenu}>
          {menuList.map((item) => {
            return (
              <li className={styles.dropdownList} key={item}>
                <button type='button' value={item} onClick={handleClickDropdown}>
                  {MENU_TITLE[item]}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DropdonwnMenu
