import { ITrendData } from 'types/trend.d'

export const trendDataConvert = (trendDatas: ITrendData[]) => {
  const datas = [...trendDatas]

  const convertedDatas = datas.map(({ imp, click, cost, conv, convValue, roas, date }) => ({
    date,
    roas,
    cost,
    imp,
    click,
    conv,
    convValue,
  }))

  return convertedDatas
}
