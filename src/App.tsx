import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header } from './organisms/Header'
import { BottomNav } from './organisms/BottomNav'
import { TopPage } from './pages/TopPage'
import { Login } from './pages/Login'
import { PreRegister } from './pages/PreRegister'
import { Register } from './pages/Register'
import { UserDetail } from './pages/UserDetail'
import { ProductDetail } from './pages/ProductDetail'

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact children={<TopPage />} />
          <Route path='/login' children={<Login />} />
          <Route path='/preregister' children={<PreRegister />} />
          <Route path='/register' children={<Register />} />
          <Route path='/users/:id' children={<UserDetail />} />
          <Route path="/products/:id" children={<ProductDetail />} />
        </Switch>
        <BottomNav />
      </BrowserRouter>
    </>
  )
}

export default App