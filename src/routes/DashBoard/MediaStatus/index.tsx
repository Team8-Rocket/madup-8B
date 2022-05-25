import styles from './mediaStatus.module.scss'
import Table from './Table'
import MediaChart from './MediaChart'

const MediaStatus = () => {
  return (
    <div className={styles.mediaContainer}>
      <div className={styles.mediaTitle}>매체현황</div>
      <div className={styles.mediaContent}>
        <MediaChart />
        <Table />
      </div>
    </div>
  )
}

export default MediaStatus
