import BigNumber from 'bignumber.js'
import { convertedValue } from 'utils/convert/totalAdDataConvert'
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory'

const victoryOption = {
  xOffsets: [50, 1850],
  tickPadding: [-20, 0],
  anchors: ['start', 'end'],
  yAxisColors: ['#94A2AD', '#94A2AD'],
  lineColors: ['#4FADF7', '#85DA47'],
}

interface ICategoryUnitKey {
  [key: string]: string
}

const CATEGORY_UNITS: ICategoryUnitKey = {
  roas: '%',
  cost: '만 원',
  imp: '만 회',
  click: '회',
  conv: '회',
  revenue: '만 원',
}

interface Props {
  targetData: any
  category1: string
  category2: string
  maxima: number[]
}

const Chart = ({ targetData, category1, category2, maxima }: Props) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={1900}
      height={800}
      domain={{ y: [0, 1] }}
      domainPadding={{ x: 150 }}
      containerComponent={<VictoryVoronoiContainer />}
    >
      <VictoryAxis
        style={{
          axis: { stroke: '#EDEFF1' },
          tickLabels: { fontSize: 25, padding: 5 },
          grid: { display: 'none' },
          ticks: { display: 'none' },
        }}
      />

      {targetData.map((_: any, i: number) => {
        const key = `victory-yAXis-${i}`
        if (category2 === 'none' && i === 1) return null
        return (
          <VictoryAxis
            dependentAxis
            key={key}
            offsetX={victoryOption.xOffsets[i]}
            style={{
              axis: { stroke: 'none' },
              ticks: { display: 'none' },
              tickLabels: {
                fill: victoryOption.yAxisColors[i],
                textAnchor: victoryOption.anchors[i],
                fontSize: 25,
              },
              grid: { stroke: '#EDEFF1', strokeDasharray: 1 },
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
        {targetData.map((d: any, i: number) => {
          const key = `victory-line-${i}`
          return (
            <VictoryLine
              labels={({ datum }) => Math.round(datum.y).toLocaleString('ko-kr')}
              labelComponent={
                <VictoryTooltip
                  flyoutWidth={150}
                  flyoutHeight={100}
                  style={{ fontSize: '40px', fill: '#FFFFFF', fontWeight: '300' }}
                  flyoutStyle={{ fill: '#3A474E' }}
                />
              }
              key={key}
              data={d}
              style={{ data: { stroke: victoryOption.lineColors[i], strokeWidth: 5 } }}
              y={(datum) => datum.y / maxima[i]}
            />
          )
        })}
      </VictoryGroup>
    </VictoryChart>
  )
}

export default Chart
