import { Routes, Route } from 'react-router-dom'

import LNB from './_shared/LNB'
import Header from './_shared/Header'
import DashBoard from './DashBoard'
import AdManagement from './AdManagement'

import styles from './routes.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <LNB />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<DashBoard />} />
          <Route path='ad' element={<AdManagement />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
