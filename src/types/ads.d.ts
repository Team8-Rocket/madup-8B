export interface IAdData {
  id: number
  adType: string
  title: string
  budget: number
  status: string
  startDate: string
  endDate: string | null
  report: {
    cost: number
    convValue: number
    roas: number
  }
}

export interface IConvertedAdData {
  id: number
  title: string
  budget: string
  status: string
  startDate: string
  cost: string
  convValue: string
  roas: number
}

export interface IMediaData {
  channel: string
  date: string
  imp: number
  click: number
  cost: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
  value?: number
}
