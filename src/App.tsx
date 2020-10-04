import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header } from './organisms/Header'
import { TopPage } from './pages/TopPage'
import { BottomNav } from './organisms/BottomNav'

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact children={<TopPage />} />
        </Switch>
        <BottomNav />
      </BrowserRouter>
    </>
  )
}

export default App