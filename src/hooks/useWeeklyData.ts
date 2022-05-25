import trendJson from 'assets/json/wanted_FE_trend-data-set.json'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import minMaxn from 'dayjs/plugin/minMax'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(minMaxn)

const TREND_DATA = trendJson.report.daily
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

export const useWeeklyData = (startDate: string, endDate: string, category1: string, category2: string) => {
  const targetData = TREND_DATA.reduce((acc: any, cur: any) => {
    if (dayjs(cur.date).isSameOrAfter(startDate) && dayjs(cur.date).isSameOrBefore(endDate)) {
      acc.push(cur)
    }
    return acc
  }, [])

  const weeklyData = targetData.reduce(
    (acc: any, cur: any) => {
      const i = Math.floor(dayjs(cur.date).diff(startDate) / ONE_WEEK)
      if (!acc[0][i])
        acc[0].push({
          x: `${dayjs(cur.date).format('MM월 DD일')} ~ ${dayjs
            .min(dayjs(cur.date).add(6, 'day'), dayjs(endDate))
            .format('MM월 DD일')}`,
          y: 0,
        })
      if (category1 === 'revenue') acc[0][i].y += cur.roas * cur.cost * 0.01
      else acc[0][i].y += cur[category1]

      if (category2 !== 'none') {
        if (!acc[1][i])
          acc[1].push({
            x: `${dayjs(cur.date).format('MM월 DD일')} ~ ${dayjs
              .min(dayjs(cur.date).add(6, 'day'), dayjs(endDate))
              .format('MM월 DD일')}`,
            y: 0,
          })
        if (category2 === 'revenue') acc[1][i].y += cur.roas * cur.cost * 0.01
        else acc[1][i].y += cur[category2]
      }
      return acc
    },
    [[], []]
  )

  return weeklyData
}
