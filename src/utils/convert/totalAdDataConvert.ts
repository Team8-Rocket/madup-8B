import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'

import { ITrendData } from 'types/trend.d'

export const filterMenuList = (menuList: string[], category: string) => {
  return menuList.filter((menu) => menu !== category)
}

const convertWonUnit = (money: number): number => {
  if (money >= 100_000_000) return Math.round(money / 100_000_000)
  if (money >= 10_000) return Math.round(money / 10_000)
  if (money > 1000) return Math.round(money / 1000)
  return money
}

const convertTimesUnit = (times: number): number => {
  if (times >= 10_000) return Math.round(times / 10_000)
  return Math.trunc(times)
}

export const convertedValue = (category: string, currentValue: BigNumber) => {
  const value = {
    roas: currentValue.integerValue(),
    cost: convertWonUnit(currentValue.toNumber()),
    imp: convertTimesUnit(currentValue.toNumber()),
    click: convertTimesUnit(currentValue.toNumber()),
    conv: convertTimesUnit(currentValue.toNumber()),
    revenue: convertWonUnit(currentValue.toNumber()),
  }[category]
  return Number(value)
}

export const getSum = (TREND_DATA: ITrendData[], startDate: string, endDate: string, key: string) => {
  return TREND_DATA.reduce((sum, cur: { [key: string]: any }) => {
    if (dayjs(cur.date) >= dayjs(startDate) && dayjs(cur.date) <= dayjs(endDate)) {
      if (key === 'revenue') return sum.plus(cur.roas * cur.cost * 0.01)
      return sum.plus(cur[key])
    }
    return sum
  }, new BigNumber(0))
}
