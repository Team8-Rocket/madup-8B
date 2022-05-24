import React from 'react'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from 'victory'
import styles from './mediaStatus.module.scss'
import CHANNEL_DATA from 'assets/json/wanted_FE-media-channel-data-set.json'
import BigNumber from 'bignumber.js'
import { mediaData } from 'utils/convert/mediaData'

const DATA = mediaData(CHANNEL_DATA)

// console.log(DATA)

// {
//   "channel": "google",
//   "date": "2022-02-01",
//   "imp": 50, //노출수
//   "click": 7, // 클릭수
//   "cost": 2098, //광고비
//   "convValue": 0,//전환비용
//   "ctr": 14.0000,//클릭률
//   "cvr": 0.0000,//전환률
//   "cpc": 299.7143,//click per click
//   "cpa": 0.0000,// click per action
//   "roas": 0.0000 //광고 지출 대비 수익률
// },
// ['cost','cost * roas * 0.01', 'imp','click','click * cvr * 0.01']

const getData = () => {
  const data: Record<string, { value: number; category: string }[]> = {
    google: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '전환 수' },
    ],
    facebook: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '전환 수' },
    ],
    naver: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '전환 수' },
    ],
    kakao: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '전환 수' },
    ],
  }

  DATA.forEach((d) => {
    data[d.channel].find((item) => item.category === '광고비')!.value += d.cost
    data[d.channel].find((item) => item.category === '매출')!.value += d.roas * d.cost * 0.01
    data[d.channel].find((item) => item.category === '노출 수')!.value += d.imp
    data[d.channel].find((item) => item.category === '클릭 수')!.value += d.click
    data[d.channel].find((item) => item.category === '전환 수')!.value += d.cvr * d.click * 0.01
  })
  return data
}

const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수']

const { google, facebook, naver, kakao } = getData()
const MediaStatus = () => {
  return (
    <div className={styles.mediaContainer}>
      <p>매체현황</p>
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={tickFormat} />
        <VictoryAxis dependentAxis tickFormat={(x) => `${(x / 5_000_000) * 2}%`} />
        <VictoryStack colorScale={['#AC8AF8', '#85DA47', '#4FADF7', '#FBE300']}>
          <VictoryBar
            style={{
              data: { stroke: '#FFFFFF', strokeWidth: 0.5 },
            }}
            data={google}
            x='category'
            y='value'
          />
          <VictoryBar
            style={{
              data: { stroke: '#FFFFFF', strokeWidth: 0.5 },
            }}
            data={facebook}
            x='category'
            y='value'
          />
          <VictoryBar
            style={{
              data: { stroke: '#FFFFFF', strokeWidth: 0.5 },
            }}
            data={naver}
            x='category'
            y='value'
          />
          <VictoryBar
            style={{
              data: { stroke: '#FFFFFF', strokeWidth: 0.5 },
            }}
            cornerRadius={{ top: 3 }}
            data={kakao}
            x='category'
            y='value'
          />
        </VictoryStack>
      </VictoryChart>
      <div className={styles.tableContainer}>
        <table>
          <thead className={styles.tableHeader}>
            <tr>
              <th> </th>
              <th>광고비</th>
              <th>매출</th>
              <th>ROAS</th>
              <th>노출수</th>
              <th>클릭 수</th>
              <th>클릭률(CTR)</th>
              <th>클릭당비용(CPC)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* {facebook.map((item, index) => {
                return (
                  <tr key={`${item.category}-${index}`}>
                    <th>페이스북</th>
                    <td>{item.value}</td>
                  </tr>
                )
              })} */}
              <th>페이스북</th>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
            </tr>
            <tr>
              <th>네이버</th>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
            </tr>
            <tr>
              <th>구글</th>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
            </tr>
            <tr>
              <th>카카오</th>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
            </tr>
            <tr className={styles.totalValue}>
              <th>총계</th>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
              <td>12,345</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MediaStatus
