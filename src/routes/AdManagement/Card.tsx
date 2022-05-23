import styles from './card.module.scss'

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardBody}>
        <div className={styles.cardContents}>
          <div className={styles.cardTitle}>
            <p>[샘플]웹광고_20211120123030</p>
          </div>
          <dl className={styles.cardDataSet}>
            <div className={styles.cardData}>
              <dt>상태</dt>
              <dd>진행중</dd>
            </div>
            <div className={styles.cardData}>
              <dt>광고 생성일</dt>
              <dd>2021-11-21 ~ 계속</dd>
            </div>
            <div className={styles.cardData}>
              <dt>일 희망 예산</dt>
              <dd>40만원</dd>
            </div>
            <div className={styles.cardData}>
              <dt>광고 수익률</dt>
              <dd>992%</dd>
            </div>
            <div className={styles.cardData}>
              <dt>매출</dt>
              <dd>159만원</dd>
            </div>
            <div className={styles.cardData}>
              <dt>광고 비용</dt>
              <dd>116만원</dd>
            </div>
          </dl>
        </div>
        <button type='button'>수정하기</button>
      </div>
    </div>
  )
}

export default Card
