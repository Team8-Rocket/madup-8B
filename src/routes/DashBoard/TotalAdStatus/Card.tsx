import BigNumber from 'bignumber.js'

import styles from './card.module.scss'

import { Plus, Minus } from 'assets/index'

interface ICategoryUnitKey {
  [key: string]: string
}

const CATEGORY_UNITS: ICategoryUnitKey = {
  roas: '%',
  cost: '원',
  imp: '회',
  click: '회',
  conv: '회',
  revenue: '원',
}

const convertWonUnit = (money: number): string => {
  if (money >= 100_000_000) return `${Math.round(money / 100_000_000).toLocaleString('ko-kr')}억 `
  if (money >= 10_000) return `${Math.round(money / 10_000).toLocaleString('ko-kr')}만 `
  if (money >= 1000) return `${Math.round(money / 1000).toLocaleString('ko-kr')}천 `
  return `${money}`
}

const convertTimesUnit = (times: number): string => {
  if (times >= 10_000) return `${Math.round(times / 10_000).toLocaleString('ko-kr')}만 `
  return `${times.toLocaleString('ko-kr')}`
}

interface Props {
  cardTitle: string
  currentValue: BigNumber
  previousValue: BigNumber
}

const Card = ({ cardTitle, currentValue, previousValue }: Props) => {
  const title = {
    roas: 'ROAS',
    cost: '광고비',
    imp: '노출 수',
    click: '클릭 수',
    conv: '전환 수',
    revenue: '매출',
  }[cardTitle]

  const convertedValue = {
    roas: currentValue.integerValue().toFormat(),
    cost: convertWonUnit(currentValue.toNumber()),
    imp: convertTimesUnit(currentValue.toNumber()),
    click: convertTimesUnit(currentValue.toNumber()),
    conv: convertTimesUnit(currentValue.toNumber()),
    revenue: convertWonUnit(currentValue.toNumber()),
  }[cardTitle]

  const diffValue = {
    roas: currentValue.minus(previousValue).integerValue().abs().toFormat(),
    cost: convertWonUnit(currentValue.minus(previousValue).abs().toNumber()),
    imp: convertTimesUnit(currentValue.minus(previousValue).abs().toNumber()),
    click: convertTimesUnit(currentValue.minus(previousValue).abs().toNumber()),
    conv: convertTimesUnit(currentValue.minus(previousValue).abs().toNumber()),
    revenue: convertWonUnit(currentValue.minus(previousValue).abs().toNumber()),
  }[cardTitle]

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div>
        <div className={styles.indicator}>
          <div className={styles.currentValue}>
            {convertedValue}
            {CATEGORY_UNITS[cardTitle]}
          </div>

          <div className={styles.diffValue}>
            {currentValue.minus(previousValue).gt(0) && <Plus />}
            {currentValue.minus(previousValue).lt(0) && <Minus />}
            {diffValue}
            {CATEGORY_UNITS[cardTitle]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
