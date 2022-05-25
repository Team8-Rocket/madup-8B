import Skeleton from '../Skeleton'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-use'
import Header from 'routes/_shared/Header'
import LNB from 'routes/_shared/LNB'
import styles from './wrapper.module.scss'

const Wrapper = () => {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [pathname])

  return (
    <div className={styles.wrapper}>
      <aside>
        <LNB />
      </aside>
      <main>
        <Header />
        {loading ? <Skeleton pathname={pathname} /> : <Outlet />}
      </main>
    </div>
  )
}

export default Wrapper
