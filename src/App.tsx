import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header } from './components/organisms/Header'
import { BottomNav } from './components/organisms/BottomNav'
import { TopPage } from './containers/TopPage'
import { Login } from './containers/Login'
import { PreRegister } from './containers/PreRegister'
import { Register } from './containers/Register'
import { UserDetail } from './containers/UserDetail'
import { ProductDetail } from './containers/ProductDetail'
import { ReviewDetail } from './containers/ReviewDetail'
import { Timeline } from './containers/Timeline'

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
          <Route path='/users/:account_id' children={<UserDetail />} />
          <Route path="/products/:id" children={<ProductDetail />} />
          <Route path="/reviews/:id" children={<ReviewDetail />} />
          <Route path="/timeline" children={<Timeline />} />
        </Switch>
        <BottomNav />
      </BrowserRouter>
    </>
  )
}

export default App