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
export interface IConvertedTrendData {
  date: string
  roas: number
  cost: number
  imp: number
  click: number
  conv: number
  revenue: number
}
