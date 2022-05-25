import { useAppSelector, useAppDispatch } from 'hooks'
import dayjs from 'dayjs'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './dashboard.module.scss'
import { setDateRange, getDateRange } from 'states/ads'

import TotalAdStatus from './TotalAdStatus'
import MediaStatus from './MediaStatus'

const START_DATE = new Date('02-01-2022')
const END_DATE = new Date('04-20-2022')

const Dashboard = () => {
  const dateRange = useAppSelector(getDateRange)
  const dispatch = useAppDispatch()

  const [startDate, endDate] = dateRange

  const handleDateChange = (update: [Date | null, Date | null]) => {
    dispatch(setDateRange(update))
  }

  return (
    <div className={styles.content}>
      <div className={styles.menu}>
        <h1 className={styles.title}>대시보드</h1>
        <div className={styles.datePicker}>
          <DatePicker
            selectsRange
            startDate={startDate}
            dateFormat='yyyy년 MM월 dd일'
            endDate={endDate}
            onChange={handleDateChange}
            minDate={START_DATE}
            maxDate={END_DATE}
          />
        </div>
      </div>
      <div className={styles.chartContainer}>
        <TotalAdStatus
          startDate={dayjs(startDate).format('YYYY/MM/DD')}
          endDate={dayjs(endDate).format('YYYY/MM/DD')}
        />
        <MediaStatus startDate={dayjs(startDate).format('YYYY/MM/DD')} endDate={dayjs(endDate).format('YYYY/MM/DD')} />
      </div>
    </div>
  )
}

export default Dashboard
