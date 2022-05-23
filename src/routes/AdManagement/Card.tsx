import styles from './card.module.scss'
import { IConvertedAdData } from 'types/ads.d'

const Card = ({ title, budget, status, startDate, cost, convValue, roas }: IConvertedAdData) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardBody}>
        <div className={styles.cardContents}>
          <div className={styles.cardTitle}>
            <p>{title}</p>
          </div>
          <dl className={styles.cardDataSet}>
            <div className={styles.cardData}>
              <dt>상태</dt>
              <dd>{status}</dd>
            </div>
            <div className={styles.cardData}>
              <dt>광고 생성일</dt>
              <dd>{startDate}</dd>
            </div>
            <div className={styles.cardData}>
              <dt>일 희망 예산</dt>
              <dd>{budget}</dd>
            </div>
            <div className={styles.cardData}>
              <dt>광고 수익률</dt>
              <dd>{roas}%</dd>
            </div>
            <div className={styles.cardData}>
              <dt>매출</dt>
              <dd>{convValue}만원</dd>
            </div>
            <div className={styles.cardData}>
              <dt>광고 비용</dt>
              <dd>{cost}만원</dd>
            </div>
          </dl>
        </div>
        <button type='button'>수정하기</button>
      </div>
    </div>
  )
}

export default Card
