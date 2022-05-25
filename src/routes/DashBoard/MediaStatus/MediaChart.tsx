import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme, VictoryLegend } from 'victory'
import { mediaData } from 'utils/convert/mediaData'
import CHANNEL_DATA from 'assets/json/wanted_FE-media-channel-data-set.json'

const DATA = mediaData(CHANNEL_DATA)

const getData = () => {
  const data: Record<string, { value: number; category: string }[]> = {
    google: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '전환 수' },
    ],
    facebook: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '전환 수' },
    ],
    naver: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '전환 수' },
    ],
    kakao: [
      { value: 0, category: '광고비' },
      { value: 0, category: '매출' },
      { value: 0, category: '노출 수' },
      { value: 0, category: '클릭 수' },
      { value: 0, category: '전환 수' },
    ],
  }

  DATA.forEach((d) => {
    data[d.channel].find((item) => item.category === '광고비')!.value += d.cost
    data[d.channel].find((item) => item.category === '매출')!.value += d.roas * d.cost * 0.01
    data[d.channel].find((item) => item.category === '노출 수')!.value += d.imp
    data[d.channel].find((item) => item.category === '클릭 수')!.value += d.click
    data[d.channel].find((item) => item.category === '전환 수')!.value += d.cvr * d.click * 0.01
  })

  return data
}
const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수']
const { google, facebook, naver, kakao } = getData()

const total = Array(5).fill(0)

const googleValue = google.filter((v) => {
  const { category } = v
  return category === tickFormat[0]
})[0]

interface IFilteredData {
  cost: number
  revenue: number
  roas: number
  imp: number
  click: number
  cv: number
  ctr: number
  cpc: number
}

const MediaChart = ({ filteredData }: { filteredData: IFilteredData }) => {
  return (
    <VictoryChart domainPadding={40} theme={VictoryTheme.material} width={700} height={300}>
      <VictoryAxis tickValues={tickFormat} tickFormat={tickFormat} />
      <VictoryAxis dependentAxis tickFormat={(x) => `${x / 2_500_000}%`} />
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
        <VictoryBar
          style={{
            data: { stroke: '#FFFFFF', strokeWidth: 0.5, fill: '#AC8AF8' },
          }}
          data={google}
          x='category'
          y='value'
        />
        <VictoryBar
          style={{
            data: { stroke: '#FFFFFF', strokeWidth: 0.5, fill: '#4fadf7' },
          }}
          data={facebook}
          x='category'
          y='value'
        />
        <VictoryBar
          style={{
            data: { stroke: '#FFFFFF', strokeWidth: 0.5, fill: '#85DA47' },
          }}
          data={naver}
          x='category'
          y='value'
        />
        <VictoryBar
          style={{
            data: { stroke: '#FFFFFF', strokeWidth: 0.5, fill: '#f8d849' },
          }}
          cornerRadius={{ top: 3 }}
          data={kakao}
          x='category'
          y='value'
        />
      </VictoryStack>
    </VictoryChart>
  )
}

export default MediaChart
