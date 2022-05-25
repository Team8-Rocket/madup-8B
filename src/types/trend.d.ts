/**
 * ROAS, 광고비, 노출 수, 클릭 수, 전환 수, 매출
 */
// "daily": [
//   {
//       "imp": 51479,          // 노출수
//       "click": 559,          // 클릭수
//       "cost": 371790,        // 광고비
//       "conv": 37,            // 전환수
//       "convValue": 3668610,  // 매출
//       "ctr": 1.09,           // 노출율, 노출 수 = (click / ctr) * 100
//       "cvr": 6.62,           // 전환율, 전환 수 = (click * ctr) / 100
//       "cpc": 665.1,          // 클릭당 비용
//       "cpa": 10048.38,       // 소비자가 특정 행동을 취할 때 마다 발생하는 수익
//       "roas": 986.74,        // roas
//       "date": "2022-02-01"   // x축
//   },

export interface ITrendData {
  [key: string]: any
  imp: number
  click: number
  cost: number
  conv: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
  date: string
}

// export interface ITrendData {
//   [imp: string]: number
//   [click: string]: number
//   [cost: string]: number
//   [conv: string]: number
//   [convValue: string]: number
//   [ctr: string]: number
//   [cvr: string]: number
//   [cpc: string]: number
//   [cpa: string]: number
//   [roas: string]: number
//   [date: string]: string
// }

export interface IConvertedTrendData {
  date: string // 날짜
  roas: number // roas
  cost: number // 광고비
  imp: number // 노출 수
  click: number // 클릭 수
  conv: number // 전환 수
  convValue: number // 매출
}
