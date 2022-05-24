import { useState, ChangeEvent } from 'react'
import styles from './dashboard.module.scss'
import TotalAdStatus from './TotalAdStatus'

// 날짜에 맞게 데이터를 가공

const Dashboard = () => {
  const [fromDate, setFromDate] = useState('2022-02-11')
  const [toDate, setToDate] = useState('2022-02-16')

  const handleChangeFromDate = (e: ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.currentTarget.value)
  }
  const handleChangetoDate = (e: ChangeEvent<HTMLInputElement>) => {
    setToDate(e.currentTarget.value)
  }

  return (
    <div className={styles.content}>
      <div>
        <h1 className={styles.title}>대시보드</h1>
        <p>datetime picker</p>
      </div>

      <input type='date' value={fromDate} onChange={handleChangeFromDate} />
      <input type='date' value={toDate} onChange={handleChangetoDate} />

      <TotalAdStatus fromDate={fromDate} toDate={toDate} />
    </div>
  )
}

export default Dashboard
