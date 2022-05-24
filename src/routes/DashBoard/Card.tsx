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
  convValue: '원',
}

interface Props {
  cardTitle: string
  currentValue: BigNumber
  previousValue: BigNumber
}

const Card = ({ cardTitle, currentValue, previousValue }: Props) => {
  // le에 따라서 단위 맞게 조정
  return (
    <div className={styles.container}>
      <h3>{cardTitle}</h3>
      <div>
        <div className={styles.indicator}>
          <div className={styles.currentValue}>
            {currentValue.valueOf()}
            {CATEGORY_UNITS[cardTitle]}
          </div>

          <div className={styles.diffValue}>
            {currentValue.minus(previousValue).gt(0) && <Plus />}
            {currentValue.minus(previousValue).lt(0) && <Minus />}
            {currentValue.minus(previousValue).absoluteValue().valueOf()}
            {CATEGORY_UNITS[cardTitle]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
