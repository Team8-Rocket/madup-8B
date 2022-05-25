import { IMediaData } from 'types/ads.d'

export const mediaData = (data: IMediaData[]) => {
  const datas = [...data]

  const converteDatas = datas.map(({ channel, date, imp, click, cost, convValue, ctr, cvr, cpc, cpa, roas }) => ({
    channel,
    date,
    imp,
    click,
    cost,
    convValue,
    ctr,
    cvr,
    cpc,
    cpa,
    roas,
  }))
  return converteDatas
}
