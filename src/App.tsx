import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header } from './organisms/Header'
import { BottomNav } from './organisms/BottomNav'
import { TopPage } from './pages/TopPage'
import { Login } from './pages/Login'
import { PreRegister } from './pages/PreRegister'

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact children={<TopPage />} />
          <Route path='/login' children={<Login />} />
          <Route path='/register' children={<PreRegister />} />
        </Switch>
        <BottomNav />
      </BrowserRouter>
    </>
  )
}

export default App