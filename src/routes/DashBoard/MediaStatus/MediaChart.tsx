import BigNumber from 'bignumber.js'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryLegend,
  VictoryTooltip,
} from 'victory'
import { v4 } from 'uuid'

const TICK_FORMAT = ['광고비', '매출', '노출 수', '클릭 수', '전환 수']
const TICK_VALUES = ['cost', 'revenue', 'imp', 'click', 'cv']

interface IChannelData {
  [key: string]: string | number
  channel: string
  click: number
  convValue: number
  cost: number
  cpa: number
  cpc: number
  ctr: number
  cvr: number
  date: string
  imp: number
  roas: number
}

const COMPANY_LIST = ['facebook', 'naver', 'google', 'kakao']
const transformData = (filteredData: IChannelData[]) => {
  const totals = TICK_VALUES.map((tValue) =>
    filteredData.reduce((acc, cur) => {
      if (tValue === 'revenue') return acc.plus(Number(cur.roas * cur.cost * 0.01))
      if (tValue === 'cv') return acc.plus(Number(cur.cvr * cur.click * 0.01))
      return acc.plus(Number(cur[tValue]))
    }, new BigNumber(0))
  )

  return COMPANY_LIST.map((cName) =>
    TICK_VALUES.map((tValue, i) => ({
      x: tValue,
      y: filteredData
        .filter((el) => el.channel === cName)
        .reduce((acc, cur) => {
          if (tValue === 'revenue') return acc.plus(Number(cur.roas * cur.cost * 0.01))
          if (tValue === 'cv') return acc.plus(Number(cur.cvr * cur.click * 0.01))
          return acc.plus(Number(cur[tValue]))
        }, new BigNumber(0))
        .dividedBy(totals[i])
        .times(100)
        .toNumber(),
    }))
  )
}

const MediaChart = ({ filteredData }: { filteredData: IChannelData[] }) => {
  const dataset = transformData(filteredData)

  return (
    <VictoryChart domainPadding={{ x: 80 }} theme={VictoryTheme.material} width={700} height={300}>
      <VictoryAxis tickValues={TICK_VALUES} tickFormat={TICK_FORMAT} />
      <VictoryAxis dependentAxis tickValues={[0, 20, 40, 60, 80, 100]} />
      <VictoryLegend
        x={400}
        y={280}
        title=''
        orientation='horizontal'
        gutter={30}
        symbolSpacer={10}
        style={{ border: { stroke: 'none' } }}
        data={[
          { name: '페이스북', symbol: { fill: '#4fadf7' } },
          { name: '네이버', symbol: { fill: '#85DA47' } },
          { name: '구글', symbol: { fill: '#AC8AF8' } },
          { name: '카카오', symbol: { fill: '#f8d849' } },
        ]}
      />
      <VictoryStack colorScale={['#AC8AF8', '#85DA47', '#4FADF7', '#FBE300']}>
        {dataset.map((data) => (
          <VictoryBar
            data={data}
            key={v4()}
            labels={({ datum }) => `${Math.round(datum.y)}%`}
            labelComponent={
              <VictoryTooltip
                pointerOrientation='bottom'
                flyoutWidth={50}
                flyoutHeight={20}
                style={{ fontSize: '14px', fill: '#FFFFFF', fontWeight: '300' }}
                flyoutStyle={{ fill: '#3A474E' }}
              />
            }
          />
        ))}
      </VictoryStack>
    </VictoryChart>
  )
}

export default MediaChart
