import { ITrendData } from 'types/trend.d'
import dayjs from 'dayjs'

// "daily": [
//   {
//       "imp": 51479,          // 노출수
//       "click": 559,          // 클릭수
//       "cost": 371790,        // 광고비
//       "conv": 37,
//       "convValue": 3668610,  // 매출
//       "ctr": 1.09,           // 노출율, 노출 수 = (click / ctr) * 100
//       "cvr": 6.62,           // 전환율, 전환 수 = (click * cvr) / 100
//       "cpc": 665.1,          // 클릭당 비용
//       "cpa": 10048.38,       // 소비자가 특정 행동을 취할 때 마다 발생하는 수익
//       "roas": 986.74,        // roas
//       "date": "2022-02-01"   // x축
//   },

export const trendDataConvert = (trendDatas: ITrendData[]) => {
  const datas = [...trendDatas]

  const convertedDatas = datas.map(({ imp, click, cost, conv, convValue, ctr, cvr, cpc, cpa, roas, date }) => ({
    date,
    roas,
    cost,
    imp,
    click,
    conv,
    convValue,
  }))

  return convertedDatas
}
