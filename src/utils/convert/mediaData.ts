import { IMediaData } from 'types/ads.d'

export const mediaData = (data: IMediaData[]) => {
  const datas = [...data]

  // {
  //   "channel": "google",
  //   "date": "2022-02-01",
  //   "imp": 50, //노출수
  //   "click": 7, // 클릭수
  //   "cost": 2098, //광고비
  //   "convValue": 0,//전환비용
  //   "ctr": 14.0000,//클릭률
  //   "cvr": 0.0000,//전환률
  //   "cpc": 299.7143,//click per click
  //   "cpa": 0.0000,// click per action
  //   "roas": 0.0000 //광고 지출 대비 수익률
  // },
  // ['cost','cost * roas * 0.01', 'imp','click','click * cvr * 0.01']

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
