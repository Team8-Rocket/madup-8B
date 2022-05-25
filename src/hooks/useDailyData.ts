import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import trendJson from 'assets/json/wanted_FE_trend-data-set.json'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const TREND_DATA = trendJson.report.daily

export const useDailyData = (startDate: string, endDate: string, category1: string, category2: string) => {
  const targetData = TREND_DATA.reduce((acc: any, cur: any) => {
    if (dayjs(cur.date).isSameOrAfter(startDate) && dayjs(cur.date).isSameOrBefore(endDate)) {
      acc.push(cur)
    }
    return acc
  }, [])

  const dailyData = targetData.reduce(
    (acc: any, cur: { [key: string]: any }) => {
      if (dayjs(cur.date) >= dayjs(startDate) && dayjs(cur.date) <= dayjs(endDate)) {
        if (category1 === 'revenue')
          acc[0].push({ x: dayjs(cur.date).format('MM월 DD일'), y: cur.roas * cur.cost * 0.01 })
        else acc[0].push({ x: dayjs(cur.date).format('MM월 DD일'), y: cur[category1] })

        if (category2 !== 'none') {
          if (category2 === 'revenue')
            acc[1].push({ x: dayjs(cur.date).format('MM월 DD일'), y: cur.roas * cur.cost * 0.01 })
          else acc[1].push({ x: dayjs(cur.date).format('MM월 DD일'), y: cur[category2] })
        }
      }
      return acc
    },
    [[], []]
  )

  return dailyData
}
