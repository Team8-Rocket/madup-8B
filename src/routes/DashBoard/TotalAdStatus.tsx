import { useState, useEffect } from 'react'
import { useUpdateEffect } from 'react-use'
import BigNumber from 'bignumber.js'
import trendJson from 'assets/json/wanted_FE_trend-data-set.json'
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryGroup,
} from 'victory'
import dayjs from 'dayjs'
import Card from './Card'
import styles from './totalAdStatus.module.scss'
import DropdonwnMenu from 'components/DropdownMenu'
import { useAppSelector, useAppDispatch } from 'hooks'
import { getCategory1, getCategory2, getDayOrWeek, setCategory1, setCategory2, setDayOrWeek } from 'states/ads'
import { useWeeklyData } from 'hooks/useWeeklyData'
import { ITrendData } from 'types/trend.d'

const TREND_DATA = trendJson.report.daily
const xOffsets = [50, 1850]
const tickPadding = [-20, 0]
const anchors = ['start', 'end']
const yAxisColors = ['#94A2AD', '#94A2AD']
const lineColors = ['#4FADF7', '#85DA47']
interface ICategoryUnitKey {
  [key: string]: string
}

const CATEGORY_UNITS: ICategoryUnitKey = {
  roas: '%',
  cost: '만 원',
  imp: '만 회',
  click: '회',
  conv: '회',
  convValue: '만 원',
}

const MENU_LIST1 = ['roas', 'cost', 'imp', 'click', 'conv', 'convValue']
const MENU_LIST2 = ['roas', 'cost', 'imp', 'click', 'conv', 'convValue', 'none']

const filterMenuList = (menuList: string[], category: string) => {
  return menuList.filter((menu) => menu !== category)
}

const testData = [
  [
    { x: '2월 3일', y: 10 },
    { x: '2월 4일', y: 20 },
    { x: '2월 5일', y: 30 },
  ],
  [
    { x: '2월 3일', y: 559 }, // click
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

const getSum = (startDate: string, endDate: string, key: string) => {
  return TREND_DATA.reduce((sum, cur: { [key: string]: any }) => {
    if (dayjs(cur.date) >= dayjs(startDate) && dayjs(cur.date) <= dayjs(endDate)) {
      return sum.plus(cur[key])
    }
    return sum
  }, new BigNumber(0))
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

const convertedValue = (category: string, currentValue: BigNumber) => {
  const value = {
    roas: currentValue.integerValue(),
    cost: convertWonUnit(currentValue.toNumber()),
    imp: convertTimesUnit(currentValue.toNumber()),
    click: convertTimesUnit(currentValue.toNumber()),
    conv: convertTimesUnit(currentValue.toNumber()),
    convValue: convertWonUnit(currentValue.toNumber()),
  }[category]
  return Number(value)
}

const getLabel = (value: number) => {
  return 'hh'
}

interface Props {
  startDate: string
  endDate: string
}

const TotalAdStatus = ({ startDate, endDate }: Props) => {
  const category1 = useAppSelector(getCategory1)
  const category2 = useAppSelector(getCategory2)
  const dayOrWeek = useAppSelector(getDayOrWeek)
  const dispatch = useAppDispatch()

  const [targetData, setTargetData] = useState(INIT_DATA)
  // const [weeklyData, setWeklyData] = useState(INIT_DATA)
  const weeklyData = useWeeklyData(startDate, endDate, category1, category2)
  // const [previousData, setPrevousDate] = useState(INIT_DATA)
  const diffDays = (Number(dayjs(endDate)) - Number(dayjs(startDate))) / (1000 * 24 * 60 * 60) + 1
  const [maxima, setMaxima] = useState(testData.map((dataset) => Math.max(...dataset.map((d) => d.y))))

  // acc  ->  [[], []] : [[{x:string, y: number}], [{x:string, y: number}]] | [[{x:string, y: number}], []]

  useEffect(() => {
    if (dayOrWeek === 'day') {
      setTargetData(
        TREND_DATA.reduce(
          (acc: any, cur: { [key: string]: any }) => {
            if (dayjs(cur.date) >= dayjs(startDate) && dayjs(cur.date) <= dayjs(endDate)) {
              acc[0].push({ x: dayjs(cur.date).format('MM월 DD일'), y: cur[category1] })
              if (category2 !== 'none') acc[1].push({ x: dayjs(cur.date).format('MM월 DD일'), y: cur[category2] })
            }
            return acc
          },
          [[], []]
        )
      )
    } else if (dayOrWeek === 'week') {
      setTargetData(weeklyData)
    }

    // setPrevousDate(
    //   TREND_DATA.reduce(
    //     (acc: any, cur: { [key: string]: any }) => {
    //       if (
    //         dayjs(cur.date) >= dayjs(startDate).subtract(diffDays, 'day') &&
    //         dayjs(cur.date) <= dayjs(endDate).subtract(diffDays, 'day')
    //       ) {
    //         acc[0].push({ x: cur.date, y: cur[category1] })
    //         acc[1].push({ x: cur.date, y: cur[category2] })
    //       }
    //       return acc
    //     },
    //     [[], []]
    //   )
    // )
  }, [startDate, endDate, category1, category2, dayOrWeek, diffDays])

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
    <div>
      <h2>통합 광고 현황</h2>
      <div className={styles.content}>
        <div className={styles.cardContainer}>
          {MENU_LIST1.map((el) => (
            <Card
              cardTitle={el}
              currentValue={getSum(startDate, endDate, el)}
              previousValue={getSum(
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
          <VictoryChart
            theme={VictoryTheme.material}
            // style={{
            //   parent: {
            //     border: '1px solid #ccc',
            //   },
            // }}
            width={1900}
            height={800}
            domain={{ y: [0, 1] }}
            containerComponent={<VictoryVoronoiContainer />}
          >
            <VictoryAxis
              style={{
                axis: { stroke: 'none' },
                tickLabels: { fontSize: 25, padding: 5 },
              }}
            />

            {targetData.map((_: any, i: any) => {
              const key = `victory-yAXis-${i}`
              if (category2 === 'none' && i === 1) return null
              return (
                <VictoryAxis
                  dependentAxis
                  key={key}
                  offsetX={xOffsets[i]}
                  style={{
                    axis: { stroke: 'none' },
                    // axisLabel: { fontSize: 20, padding: 32 },
                    ticks: { padding: tickPadding[i] },
                    tickLabels: {
                      fill: yAxisColors[i],
                      textAnchor: anchors[i],
                      fontSize: 20,
                      padding: 10,
                      marginTop: 5,
                    },
                  }}
                  // Use normalized tickValues (0 - 1)
                  tickValues={[0.25, 0.5, 0.75, 1]}
                  // Re-scale ticks by multiplying by correct maxima

                  tickFormat={(t) => {
                    if (i === 0) {
                      const convertMaxima = convertedValue(category1, new BigNumber(maxima[i]))
                      return `${t * convertMaxima} ${CATEGORY_UNITS[category1]}`
                    }
                    const convertMaxima = convertedValue(category2, new BigNumber(maxima[i]))
                    return `${t * convertMaxima} ${CATEGORY_UNITS[category2]}`
                  }}
                />
              )
            })}
            <VictoryGroup>
              {targetData.map((d: any, i: any) => {
                const key = `victory-line-${i}`
                return (
                  <VictoryLine
                    labels={({ datum }) => Math.round(datum.y).toLocaleString('ko-kr')}
                    labelComponent={
                      <VictoryTooltip style={{ fontSize: '40px' }} flyoutStyle={{ fill: 'transparent' }} />
                    }
                    key={key}
                    data={d}
                    style={{ data: { stroke: lineColors[i], strokeWidth: 5 } }}
                    // normalize data
                    y={(datum) => datum.y / maxima[i]}
                  />
                )
              })}
              {/* <VictoryScatter size={7} data={targetData} /> */}
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    </div>
  )
}

export default TotalAdStatus
