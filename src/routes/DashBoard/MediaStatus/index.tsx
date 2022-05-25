import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import BigNumber from 'bignumber.js'

import styles from './mediaStatus.module.scss'
import CHANNEL_DATA from 'assets/json/wanted_FE-media-channel-data-set.json'

import Table from './Table'
import MediaChart from './MediaChart'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

interface Props {
  startDate: string
  endDate: string
}

const INIT_DATA = {
  cost: {},
  revenue: {},
  roas: {},
  imp: {},
  click: {},
  cv: {},
  ctr: {},
  cpc: {},
}

const MediaStatus = ({ startDate, endDate }: Props) => {
  const filteredData = CHANNEL_DATA.reduce((acc: any, cur: any) => {
    if (dayjs(cur.date).isSameOrAfter(startDate) && dayjs(cur.date).isSameOrBefore(endDate)) {
      // 광고비
      acc.cost.total = (acc.cost.total || 0) + cur.cost
      acc.cost[cur.channel] = (acc.cost[cur.channel] || 0) + cur.cost
      // 매출
      acc.revenue.total = (acc.revenue.total || 0) + cur.roas * cur.cost * 0.01
      acc.revenue[cur.channel] = (acc.revenue[cur.channel] || 0) + cur.roas * cur.cost * 0.01
      // ROAS
      acc.roas.total = (acc.roas.total || 0) + cur.roas
      acc.roas[cur.channel] = (acc.roas[cur.channel] || 0) + cur.roas
      // 노출수
      acc.imp.total = (acc.imp.total || 0) + cur.imp
      acc.imp[cur.channel] = (acc.imp[cur.channel] || 0) + cur.imp
      // 클릭수
      acc.click.total = (acc.click.total || 0) + cur.click
      acc.click[cur.channel] = (acc.click[cur.channel] || 0) + cur.click
      // 전환수
      acc.cv.total = (acc.cv.total || 0) + cur.cvr * cur.click * 0.01
      acc.cv[cur.channel] = (acc.cv[cur.channel] || 0) + cur.cvr * cur.click * 0.01
      // 클릭율
      acc.ctr.total = (acc.ctr.total || 0) + cur.ctr
      acc.ctr[cur.channel] = (acc.ctr[cur.channel] || 0) + cur.ctr
      // 클릭당 비용
      acc.cpc.total = (acc.cpc.total || 0) + cur.cpc
      acc.cpc[cur.channel] = (acc.cpc[cur.channel] || 0) + cur.cpc
    }

    return acc
  }, INIT_DATA)

  console.log(filteredData)
  return (
    <div className={styles.mediaContainer}>
      <div className={styles.mediaTitle}>매체현황</div>
      <div className={styles.mediaContent}>
        <MediaChart filteredData={filteredData} />
        <Table filteredData={filteredData} />
      </div>
    </div>
  )
}

export default MediaStatus
