import { useAppSelector, useAppDispatch } from 'hooks'
import dayjs from 'dayjs'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'

import { ArrowDown } from 'assets'

import { setDateRange, getDateRange } from 'states/ads'

import styles from './dashboard.module.scss'

import TotalAdStatus from './TotalAdStatus'
import MediaStatus from './MediaStatus'

const START_DATE = new Date('02-01-2022')
const END_DATE = new Date('04-20-2022')

const Dashboard = () => {
  const dateRange = useAppSelector(getDateRange)
  const dispatch = useAppDispatch()

  const [startDate, endDate] = dateRange

  return (
    <div className={styles.content}>
      <div className={styles.menu}>
        <h1 className={styles.title}>대시보드</h1>
        <div className={styles.datePicker}>
          <DatePicker
            selectsRange
            startDate={startDate}
            locale={ko}
            dateFormat='yyyy.MM.dd (eee)'
            endDate={endDate}
            onChange={(update) => {
              dispatch(setDateRange(update))
            }}
            minDate={START_DATE}
            maxDate={END_DATE}
          />
          <ArrowDown />
        </div>
      </div>
      <TotalAdStatus startDate={dayjs(startDate).format('YYYY/MM/DD')} endDate={dayjs(endDate).format('YYYY/MM/DD')} />
      <MediaStatus startDate={dayjs(startDate).format('YYYY/MM/DD')} endDate={dayjs(endDate).format('YYYY/MM/DD')} />
    </div>
  )
}

export default Dashboard
