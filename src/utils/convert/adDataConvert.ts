import { IAdData } from 'types/ads.d'
import dayjs from 'dayjs'

const convertTitle = (adType: string) => {
  return adType === 'web' ? '웹광고' : '앱광고'
}

const convertStatus = (status: string) => {
  return status === 'active' ? '진행중' : '중단됨'
}

const convertStartDate = (status: string, startDate: string, endDate: string | null) => {
  if (status === 'active') {
    return dayjs(startDate).format('YYYY-MM-DD')
  }
  return `${dayjs(startDate).format('YYYY-MM-DD')}(${dayjs(endDate).format('YYYY-MM-DD')}) `
}

const convertBudget = (budget: number) => {
  if (budget > 100_000) return `${Math.floor(budget / 10000)}만원`
  return `${Math.floor(budget / 1000)}천원`
}

const commaFomatter = (number: number) => {
  return (number / 10000).toLocaleString('ko-kr')
}

export const adDataConvert = (adDatas: IAdData[]) => {
  const datas = [...adDatas]

  const convertedDatas = datas.map(
    ({ id, adType, budget, status, startDate, endDate, report: { cost, convValue, roas } }) => ({
      id,
      title: `${convertTitle(adType)}_${dayjs(startDate).format('YYYYMMDDHHmmss')}`,
      status: convertStatus(status),
      startDate: convertStartDate(status, startDate, endDate),
      budget: convertBudget(budget),
      roas,
      convValue: commaFomatter(convValue),
      cost: commaFomatter(cost),
    })
  )

  return convertedDatas
}
