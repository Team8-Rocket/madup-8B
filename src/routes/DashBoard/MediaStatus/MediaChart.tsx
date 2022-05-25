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

interface ICompanyData {
  total: number
  facebook: number
  naver: number
  google: number
  kakao: number
}

interface IFilteredData {
  cost: ICompanyData
  revenue: ICompanyData
  roas: ICompanyData
  imp: ICompanyData
  click: ICompanyData
  cv: ICompanyData
  ctr: ICompanyData
  cpc: ICompanyData
}

const MediaChart = ({ filteredData }: { filteredData: IFilteredData }) => {
  console.log((filteredData.cost.google / filteredData.cost.total) * 100)

  const INIT_DATA = {
    google: [
      { value: (filteredData.cost.google / filteredData.cost.total) * 100, category: '광고비' },
      { value: (filteredData.revenue.google / filteredData.cost.total) * 100, category: '매출' },
      { value: (filteredData.imp.google / filteredData.cost.total) * 100, category: '노출 수' },
      { value: (filteredData.click.google / filteredData.cost.total) * 100, category: '클릭 수' },
      { value: (filteredData.cv.google / filteredData.cost.total) * 100, category: '전환 수' },
    ],
    facebook: [
      { value: (filteredData.cost.facebook / filteredData.cost.total) * 100, category: '광고비' },
      { value: (filteredData.revenue.facebook / filteredData.cost.total) * 100, category: '매출' },
      { value: (filteredData.imp.facebook / filteredData.cost.total) * 100, category: '노출 수' },
      { value: (filteredData.click.facebook / filteredData.cost.total) * 100, category: '클릭 수' },
      { value: (filteredData.cv.facebook / filteredData.cost.total) * 100, category: '전환 수' },
    ],
    naver: [
      { value: (filteredData.cost.naver / filteredData.cost.total) * 100, category: '광고비' },
      { value: (filteredData.revenue.naver / filteredData.cost.total) * 100, category: '매출' },
      { value: (filteredData.imp.naver / filteredData.cost.total) * 100, category: '노출 수' },
      { value: (filteredData.click.naver / filteredData.cost.total) * 100, category: '클릭 수' },
      { value: (filteredData.cv.naver / filteredData.cost.total) * 100, category: '전환 수' },
    ],
    kakao: [
      { value: (filteredData.cost.kakao / filteredData.cost.total) * 100, category: '광고비' },
      { value: (filteredData.revenue.kakao / filteredData.cost.total) * 100, category: '매출' },
      { value: (filteredData.imp.kakao / filteredData.cost.total) * 100, category: '노출 수' },
      { value: (filteredData.click.kakao / filteredData.cost.total) * 100, category: '클릭 수' },
      { value: (filteredData.cv.kakao / filteredData.cost.total) * 100, category: '전환 수' },
    ],
  }
  console.log(INIT_DATA.google)
  console.log(INIT_DATA.kakao)
  console.log(INIT_DATA.naver)
  console.log(INIT_DATA.facebook)

  return (
    <VictoryChart domainPadding={40} theme={VictoryTheme.material} width={700} height={300}>
      <VictoryAxis tickValues={tickFormat} tickFormat={tickFormat} />
      <VictoryAxis dependentAxis tickFormat={(x) => `${x * 100}%`} />
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
          data={INIT_DATA.google}
          x='category'
          y='value'
        />
        <VictoryBar
          style={{
            data: { stroke: '#FFFFFF', strokeWidth: 0.5, fill: '#4fadf7' },
          }}
          data={INIT_DATA.facebook}
          x='category'
          y='value'
        />
        <VictoryBar
          style={{
            data: { stroke: '#FFFFFF', strokeWidth: 0.5, fill: '#85DA47' },
          }}
          data={INIT_DATA.naver}
          x='category'
          y='value'
        />
        <VictoryBar
          style={{
            data: { stroke: '#FFFFFF', strokeWidth: 0.5, fill: '#f8d849' },
          }}
          cornerRadius={{ top: 3 }}
          data={INIT_DATA.kakao}
          x='category'
          y='value'
        />
      </VictoryStack>
    </VictoryChart>
  )
}

export default MediaChart
