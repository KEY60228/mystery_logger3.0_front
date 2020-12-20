import React, { FC, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { useAppDispatch } from './stores/index'
import { asyncGetCurrentUser } from './ajax/auth'

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
import { OrganizerDetail } from './containers/OrganizerDetail'
import { VenueDetail } from './containers/VenueDetail'
import { Accompanies } from './containers/Accompanies'

import { ErrorHandler } from './ErrorHandler/ErrorHandler'
import { SystemErrorPage } from './ErrorHandler/SystemErrorPage'
import { NotFoundPage } from './ErrorHandler/NotFoundPage'

import { PopHandler } from './PopHandler/PopHandler'

const App: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(asyncGetCurrentUser())
    }, [])

    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <ErrorHandler />
                <Header />
                <PopHandler />
                <Switch>
                    <Route path="/" exact children={<TopPage />} />
                    <GuestRoute path="/login" children={<Login />} />
                    <GuestRoute
                        path="/preregister"
                        children={<PreRegister />}
                    />
                    <GuestRoute path="/register" children={<Register />} />
                    <Route
                        path="/users/:account_id"
                        children={<UserDetail />}
                    />
                    <Route path="/products/:id" children={<ProductDetail />} />
                    <Route path="/reviews/:id" children={<ReviewDetail />} />
                    <PrivateRoute path="/timeline" children={<Timeline />} />
                    <Route path="/search" children={<Search />} />
                    <Route path="/organizers/:id" children={<OrganizerDetail />} />
                    <Route path="/venues/:id" children={<VenueDetail />} />
                    <Route path="/accompany" children={<Accompanies />} />
                    <Route path="/404" children={<NotFoundPage />} />
                    <Route path="/500" children={<SystemErrorPage />} />
                </Switch>
                <BottomNav />
            </BrowserRouter>
        </>
    )
}

export default App
