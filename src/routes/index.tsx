import { Routes, Route } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import loadable from '@loadable/component'

// import DashBoard from './DashBoard'
// import AdManagement from './AdManagement'
// import Wrapper from './Wrapper'

import styles from './routes.module.scss'

// const Header = loadable(() => import(/* webpackChunkName: "Header" */ './_shared/Header'))

const Wrapper = loadable(() => import(/* webpackChunkName: "Wrapper" */ './Wrapper/index'))
const DashBoard = loadable(() => import(/* webpackChunkName: "DashBoard" */ './DashBoard/index'))
const AdManagement = loadable(() => import(/* webpackChunkName: "AdManagement" */ './AdManagement/index'))

const App = () => {
  return (
    <div className={styles.app}>
      <HelmetProvider>
        <Helmet>
          <title>madup-8B</title>
        </Helmet>
      </HelmetProvider>
      <main>
        <Routes>
          <Route element={<Wrapper />}>
            <Route path='/' element={<DashBoard />} />
            <Route path='ad' element={<AdManagement />} />
          </Route>
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
