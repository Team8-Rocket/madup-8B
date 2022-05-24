import styles from './dashboard.module.scss'
import MediaStatus from './MediaStatus'

const DashBoard = () => {
  return (
    <div className={styles.dashboard}>
      DashBoard
      <MediaStatus />
    </div>
  )
}

export default DashBoard
