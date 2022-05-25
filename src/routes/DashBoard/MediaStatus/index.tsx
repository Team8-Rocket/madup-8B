import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import styles from './mediaStatus.module.scss'
import CHANNEL_DATA from 'assets/json/wanted_FE-media-channel-data-set.json'

import Table from './Table'
import MediaChart from './MediaChart'
import { useEffect, useState } from 'react'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

interface Props {
  startDate: string
  endDate: string
}

const MediaStatus = ({ startDate, endDate }: Props) => {
  const [filteredData, setFilteredData] = useState(
    CHANNEL_DATA.filter((el) => dayjs(el.date).isSameOrAfter(startDate) && dayjs(el.date).isSameOrBefore(endDate))
  )

  useEffect(() => {
    setFilteredData(
      CHANNEL_DATA.filter((el) => dayjs(el.date).isSameOrAfter(startDate) && dayjs(el.date).isSameOrBefore(endDate))
    )
  }, [startDate, endDate])

  return (
    <div className={styles.mediaContainer}>
      <h2 className={styles.mediaTitle}>매체현황</h2>
      <div className={styles.mediaContent}>
        <MediaChart filteredData={filteredData} />
        <Table filteredData={filteredData} />
      </div>
    </div>
  )
}

export default MediaStatus
