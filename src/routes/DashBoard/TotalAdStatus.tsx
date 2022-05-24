import { useState, useEffect, MouseEvent } from 'react'
import BigNumber from 'bignumber.js'
import trendJson from 'assets/json/wanted_FE_trend-data-set.json'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory'
import dayjs from 'dayjs'
import Card from './Card'
import styles from './totalAdStatus.module.scss'
import DropdonwnMenu from 'components/DropdownMenu'

const TREND_DATA = trendJson.report.daily
const xOffsets = [50, 1850]
const tickPadding = [-20, 0]
const anchors = ['start', 'end']
const colors = ['#4FADF7', '#85DA47']

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

const getSum = (fromDate: string, toDate: string, key: string) => {
  return TREND_DATA.reduce((sum, cur: { [key: string]: any }) => {
    if (dayjs(cur.date) >= dayjs(fromDate) && dayjs(cur.date) <= dayjs(toDate)) {
      return sum.plus(cur[key])
    }
    return sum
  }, new BigNumber(0))
}

interface Props {
  fromDate: string
  toDate: string
}

const TotalAdStatus = ({ fromDate, toDate }: Props) => {
  const [category1, setCategory1] = useState('roas')
  const [category2, setCategory2] = useState('click') // 클수 수
  const [dayOrWeek, setDayOrWeek] = useState('주간') // 주간, 일간
  const [targetData, setTargetData] = useState(INIT_DATA)
  const [previousData, setPrevousDate] = useState(INIT_DATA)
  const diffDays = (Number(dayjs(toDate)) - Number(dayjs(fromDate))) / (1000 * 24 * 60 * 60) + 1
  const [maxima, setMaxima] = useState(testData.map((dataset) => Math.max(...dataset.map((d) => d.y))))

  const handleClickDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    setCategory1(e.currentTarget.value)
  }

  useEffect(() => {
    setTargetData(
      TREND_DATA.reduce(
        (acc: any, cur: { [key: string]: any }) => {
          if (dayjs(cur.date) >= dayjs(fromDate) && dayjs(cur.date) <= dayjs(toDate)) {
            acc[0].push({ x: cur.date, y: cur[category1] })
            acc[1].push({ x: cur.date, y: cur[category2] })
          }
          return acc
        },
        [[], []]
      )
    )

    setPrevousDate(
      TREND_DATA.reduce(
        (acc: any, cur: { [key: string]: any }) => {
          if (
            dayjs(cur.date) >= dayjs(fromDate).subtract(diffDays, 'day') &&
            dayjs(cur.date) <= dayjs(toDate).subtract(diffDays, 'day')
          ) {
            acc[0].push({ x: cur.date, y: cur[category1] })
            acc[1].push({ x: cur.date, y: cur[category2] })
          }
          return acc
        },
        [[], []]
      )
    )
  }, [fromDate, toDate, category1, category2, dayOrWeek, diffDays])

  useEffect(() => {
    setMaxima(targetData.map((dataset: any) => Math.max(...dataset.map((d: any) => d.y))))
  }, [targetData])

  return (
    <div>
      <h2>통합 광고 현황</h2>
      <div className={styles.content}>
        <div className={styles.cardContainer}>
          {['roas', 'cost', 'imp', 'click', 'conv', 'convValue'].map((el) => (
            <Card
              cardTitle={el}
              currentValue={getSum(fromDate, toDate, el)}
              previousValue={getSum(
                dayjs(fromDate).subtract(diffDays, 'day').format('YYYY-MM-DD'),
                dayjs(toDate).subtract(diffDays, 'day').format('YYYY-MM-DD'),
                el
              )}
              key={el}
            />
          ))}
        </div>
        <div className={styles.selectCategoryContainer}>
          <DropdonwnMenu
            menuList={['roas', 'cost', 'imp', 'click', 'conv', 'convValue']}
            category={category1}
            setCategory={setCategory1}
          />
          <DropdonwnMenu
            menuList={['roas', 'cost', 'imp', 'click', 'conv', 'convValue']}
            category={category2}
            setCategory={setCategory2}
          />
        </div>
        <div className={styles.chartContainer}>
          <VictoryChart theme={VictoryTheme.material} width={1900} height={800} domain={{ y: [0, 1] }}>
            <VictoryAxis />
            {targetData.map((_: any, i: any) => (
              <VictoryAxis
                dependentAxis
                key={i}
                offsetX={xOffsets[i]}
                style={{
                  // axis: { stroke: colors[i] },
                  ticks: { padding: tickPadding[i] },
                  tickLabels: {
                    fill: colors[i],
                    textAnchor: anchors[i],
                    fontSize: 15,
                    padding: 10,
                  },
                }}
                // Use normalized tickValues (0 - 1)
                // tickValues={[0.25, 0.5, 0.75, 1]}
                // Re-scale ticks by multiplying by correct maxima
                tickFormat={(t) => `${t * maxima[i]} 만원`}
              />
            ))}
            {targetData.map((d: any, i: any) => (
              <VictoryLine
                key={i}
                data={d}
                style={{ data: { stroke: colors[i] } }}
                // normalize data
                y={(datum) => datum.y / maxima[i]}
              />
            ))}
          </VictoryChart>
        </div>
      </div>
    </div>
  )
}

export default TotalAdStatus
