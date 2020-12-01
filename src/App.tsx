import React, { FC, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CssBaseline } from '@material-ui/core'

import { GuestRoute } from './RouteComponents/GuestRoute'
import { PrivateRoute } from './RouteComponents/PrivateRoute'
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
import { Search } from './containers/Search'
import { asyncGetCurrentUser } from './ajax/auth'

const App: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetCurrentUser())
    }, [])

    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact children={<TopPage />} />
                    <GuestRoute path="/login" children={<Login />} />
                    <GuestRoute path="/preregister" children={<PreRegister />} />
                    <GuestRoute path="/register" children={<Register />} />
                    <Route
                        path="/users/:account_id"
                        children={<UserDetail />}
                    />
                    <Route path="/products/:id" children={<ProductDetail />} />
                    <Route path="/reviews/:id" children={<ReviewDetail />} />
                    <PrivateRoute path="/timeline" children={<Timeline />} />
                    <Route path="/search" children={<Search />} />
                </Switch>
                <BottomNav />
            </BrowserRouter>
        </>
    )
}

export default App
