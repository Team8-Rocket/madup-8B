import styles from './dashboard.module.scss'
import MediaStatus from './MediaStatus'

const DashBoard = () => {
  return (
    <div className={styles.dashboard}>
      <MediaStatus />
    </div>
  )
}

export default DashBoard
