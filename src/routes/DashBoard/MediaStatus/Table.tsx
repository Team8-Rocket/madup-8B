import BigNumber from 'bignumber.js'

import styles from './table.module.scss'

interface IChannelData {
  [key: string]: string | number
  channel: string
  click: number
  convValue: number
  cost: number
  cpa: number
  cpc: number
  ctr: number
  cvr: number
  date: string
  imp: number
  roas: number
}

const COLUMN_ORDER = ['cost', 'revenue', 'roas', 'imp', 'click', 'ctr', 'cpc']

const transformData = (data: IChannelData[]) => {
  const facebookData = COLUMN_ORDER.map((column) =>
    data
      .filter((el) => el.channel === 'facebook')
      .reduce((acc, cur) => {
        if (column === 'revenue') return acc.plus(Number(cur.roas * cur.cost * 0.01))
        return acc.plus(Number(cur[column]))
      }, new BigNumber(0))
  )

  const naverData = COLUMN_ORDER.map((column) =>
    data
      .filter((el) => el.channel === 'naver')
      .reduce((acc, cur) => {
        if (column === 'revenue') return acc.plus(Number(cur.roas * cur.cost * 0.01))
        return acc.plus(Number(cur[column]))
      }, new BigNumber(0))
  )

  const googleData = COLUMN_ORDER.map((column) =>
    data
      .filter((el) => el.channel === 'google')
      .reduce((acc, cur) => {
        if (column === 'revenue') return acc.plus(Number(cur.roas * cur.cost * 0.01))
        return acc.plus(Number(cur[column]))
      }, new BigNumber(0))
  )

  const kakaoData = COLUMN_ORDER.map((column) =>
    data
      .filter((el) => el.channel === 'kakao')
      .reduce((acc, cur) => {
        if (column === 'revenue') return acc.plus(Number(cur.roas * cur.cost * 0.01))
        return acc.plus(Number(cur[column]))
      }, new BigNumber(0))
  )

  const totalData = COLUMN_ORDER.map((column) =>
    data.reduce((acc, cur) => {
      if (column === 'revenue') return acc.plus(Number(cur.roas * cur.cost * 0.01))
      return acc.plus(Number(cur[column]))
    }, new BigNumber(0))
  )

  return { facebookData, naverData, googleData, kakaoData, totalData }
}

const Table = ({ filteredData }: { filteredData: IChannelData[] }) => {
  const { facebookData, naverData, googleData, kakaoData, totalData } = transformData(filteredData)

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.columnGroup} />
        </colgroup>
        <thead className={styles.tableHeader}>
          <tr>
            <th> </th>
            <th className={styles.short}>광고비</th>
            <th>매출</th>
            <th>ROAS</th>
            <th className={styles.short}>노출수</th>
            <th className={styles.short}>클릭 수</th>
            <th>클릭률(CTR)</th>
            <th>클릭당비용(CPC)</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <tr>
            <th>페이스북</th>
            {facebookData.map((item) => {
              return <td key={Math.random()}>{item.integerValue().toFormat()}</td>
            })}
          </tr>
          <tr>
            <th>네이버</th>
            {naverData.map((item) => {
              return <td key={Math.random()}>{item.integerValue().toFormat()}</td>
            })}
          </tr>
          <tr>
            <th>구글</th>
            {googleData.map((item) => {
              return <td key={Math.random()}>{item.integerValue().toFormat()}</td>
            })}
          </tr>
          <tr>
            <th>카카오</th>
            {kakaoData.map((item) => {
              return <td key={Math.random()}>{item.integerValue().toFormat()}</td>
            })}
          </tr>
          <tr className={styles.totalValue}>
            <th>총계</th>
            {totalData.map((item) => {
              return <td key={Math.random()}>{item.integerValue().toFormat()}</td>
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
