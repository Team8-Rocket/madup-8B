import { Notify, Profile, Settings } from 'assets'
import styles from './header.module.scss'

const Header = () => {
  return (
    <header className={styles.container}>
      <ul>
        <li className={styles.notify}>
          <Notify />
        </li>
        <li>
          <Settings />
        </li>
        <li>
          <Profile className={styles.profile} />
          원티드님
        </li>
      </ul>
    </header>
  )
}

export default Header
