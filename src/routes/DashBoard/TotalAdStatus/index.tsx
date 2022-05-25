import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useAppSelector } from 'hooks'
import { useWeeklyData } from 'hooks/useWeeklyData'
import { getCategory1, getCategory2, getDayOrWeek, setCategory1, setCategory2, setDayOrWeek } from 'states/ads'

import { filterMenuList, getSum } from 'utils/convert/totalAdDataConvert'

import trendJson from 'assets/json/wanted_FE_trend-data-set.json'
import styles from './totalAdStatus.module.scss'

import DropdonwnMenu from 'components/DropdownMenu'
import Card from './Card'
import { useDailyData } from 'hooks/useDailyData'
import Chart from './Chart'

const TREND_DATA = trendJson.report.daily

const MENU_LIST1 = ['roas', 'cost', 'imp', 'click', 'conv', 'revenue']
const MENU_LIST2 = ['roas', 'cost', 'imp', 'click', 'conv', 'revenue', 'none']

const testData = [
  [
    { x: '2월 3일', y: 10 },
    { x: '2월 4일', y: 20 },
    { x: '2월 5일', y: 30 },
  ],
  [
    { x: '2월 3일', y: 559 },
    { x: '2월 4일', y: 690 },
    { x: '2월 5일', y: 693 },
  ],
]

const INIT_DATA = TREND_DATA.reduce(
  (acc: any, cur: { [key: string]: any }) => {
    if (dayjs(cur.date) >= dayjs('2022-04-01') && dayjs(cur.date) <= dayjs('2022-04-03')) {
      acc[0].push({ x: cur.date, y: cur.roas })
      acc[1].push({ x: cur.date, y: cur.click })
    }
    return acc
  },
  [[], []]
)
interface Props {
  startDate: string
  endDate: string
}

const TotalAdStatus = ({ startDate, endDate }: Props) => {
  const category1 = useAppSelector(getCategory1)
  const category2 = useAppSelector(getCategory2)
  const dayOrWeek = useAppSelector(getDayOrWeek)

  const [targetData, setTargetData] = useState(INIT_DATA)
  const [maxima, setMaxima] = useState(testData.map((dataset) => Math.max(...dataset.map((d) => d.y))))

  const dailyData = useDailyData(startDate, endDate, category1, category2)
  const weeklyData = useWeeklyData(startDate, endDate, category1, category2)
  const diffDays = (Number(dayjs(endDate)) - Number(dayjs(startDate))) / (1000 * 24 * 60 * 60) + 1

  useEffect(() => {
    if (dayOrWeek === 'day') {
      setTargetData(dailyData)
    } else if (dayOrWeek === 'week') {
      setTargetData(weeklyData)
    }
  }, [category1, category2, dayOrWeek, dailyData, weeklyData])

  useEffect(() => {
    setMaxima(
      targetData.map((dataset: any) =>
        Math.max(
          ...dataset.map((d: any) => {
            return d.y + d.y / 2
          })
        )
      )
    )
  }, [targetData])

  return (
    <div className={styles.container}>
      <h2 className={styles.totalAdStatusTitle}>통합 광고 현황</h2>
      <div className={styles.content}>
        <div className={styles.cardContainer}>
          {MENU_LIST1.map((el) => (
            <Card
              cardTitle={el}
              currentValue={getSum(TREND_DATA, startDate, endDate, el)}
              previousValue={getSum(
                TREND_DATA,
                dayjs(startDate).subtract(diffDays, 'day').format('YYYY-MM-DD'),
                dayjs(endDate).subtract(diffDays, 'day').format('YYYY-MM-DD'),
                el
              )}
              key={el}
            />
          ))}
        </div>
        <div className={styles.selectCategoryContainer}>
          <DropdonwnMenu
            menuList={filterMenuList(MENU_LIST1, category2)}
            category={category1}
            setCategory={setCategory1}
          />
          <DropdonwnMenu
            menuList={filterMenuList(MENU_LIST2, category1)}
            category={category2}
            setCategory={setCategory2}
          />
          <DropdonwnMenu menuList={['day', 'week']} category={dayOrWeek} setCategory={setDayOrWeek} />
        </div>
        <div className={styles.chartContainer}>
          <Chart targetData={targetData} category1={category1} category2={category2} maxima={maxima} />
        </div>
      </div>
    </div>
  )
}

export default TotalAdStatus
