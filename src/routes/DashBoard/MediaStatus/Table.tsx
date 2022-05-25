import CHANNEL_DATA from 'assets/json/wanted_FE-media-channel-data-set.json'
import { mediaData } from 'utils/convert/mediaData'
import styles from './table.module.scss'

const DATA = mediaData(CHANNEL_DATA)
const getTableData = () => {
  const data: Record<string, { value: number; category: string }[]> = {
    google: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: 'roas' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '클릭 률' },
      { value: 0, category: '클릭 당 비용' },
    ],
    facebook: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: 'roas' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '클릭 률' },
      { value: 0, category: '클릭 당 비용' },
    ],
    naver: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: 'roas' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '클릭 률' },
      { value: 0, category: '클릭 당 비용' },
    ],
    kakao: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: 'roas' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '클릭 률' },
      { value: 0, category: '클릭 당 비용' },
    ],
  }

  DATA.forEach((d) => {
    data[d.channel].find((item) => item.category === '광고비')!.value += d.cost
    data[d.channel].find((item) => item.category === '매출')!.value += d.roas * d.cost * 0.01
    data[d.channel].find((item) => item.category === 'roas')!.value += d.roas * d.cost * 0.01
    data[d.channel].find((item) => item.category === '노출 수')!.value += d.imp
    data[d.channel].find((item) => item.category === '클릭 수')!.value += d.click
    data[d.channel].find((item) => item.category === '클릭 률')!.value += d.ctr
    data[d.channel].find((item) => item.category === '클릭 당 비용')!.value += d.cpc
  })
  return data
}
const { google, facebook, naver, kakao } = getTableData()
const arr = Array.from({ length: 7 }, (value, index) => index)

const totalnum = (n: number) => google[n].value + facebook[n].value + naver[n].value + kakao[n].value

const Table = () => {
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
            {facebook.map((item) => {
              return <td key={`${item.category}-${item.value}`}>{item.value}</td>
            })}
          </tr>
          <tr>
            <th>네이버</th>
            {naver.map((item) => {
              return <td key={`${item.category}-${item.value}`}>{item.value}</td>
            })}
          </tr>
          <tr>
            <th>구글</th>
            {google.map((item) => {
              return <td key={`${item.category}-${item.value}`}>{item.value}</td>
            })}
          </tr>
          <tr>
            <th>카카오</th>
            {kakao.map((item) => {
              return <td key={`${item.category}-${item.value}`}>{item.value}</td>
            })}
          </tr>
          <tr className={styles.totalValue}>
            <th>총계</th>

            {arr.map((value, index) => {
              return <td key={`arr-${value}`}>{totalnum(index)}</td>
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
