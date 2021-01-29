import React, { FC, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { useAppDispatch } from './stores/index'
import { asyncGetCurrentUser } from './ajax/auth'

import { GuestRoute } from './handlers/RouteHandler/GuestRoute'
import { PrivateRoute } from './handlers/RouteHandler/PrivateRoute'
import { Header } from './components/organisms/Header'
import { BottomNav } from './components/organisms/BottomNav'
import { TopPage } from './disposable/TopPage'
import { Login } from './disposable/Login'
import { PreRegister } from './disposable/PreRegister'
import { Register } from './disposable/Register'
import { UserDetail } from './disposable/UserDetail'
import { ProductDetail } from './disposable/ProductDetail'
import { ReviewDetail } from './disposable/ReviewDetail'
import { Timeline } from './disposable/Timeline'
import { Search } from './disposable/Search'
import { OrganizerDetail } from './disposable/OrganizerDetail'
import { VenueDetail } from './disposable/VenueDetail'
import { Accompanies } from './disposable/Accompanies'
import { Notifications } from './disposable/Notifications'

import { ErrorHandler } from './handlers/ErrorHandler/ErrorHandler'
import { SystemErrorPage } from './handlers/ErrorHandler/SystemErrorPage'
import { NotFoundPage } from './handlers/ErrorHandler/NotFoundPage'

import { PopHandler } from './handlers/PopHandler/'

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
                    <Route
                        path="/organizers/:id"
                        children={<OrganizerDetail />}
                    />
                    <Route path="/venues/:id" children={<VenueDetail />} />
                    <Route path="/accompany" children={<Accompanies />} />
                    <Route path="/notifications" children={<Notifications />} />
                    <Route path="/404" children={<NotFoundPage />} />
                    <Route path="/500" children={<SystemErrorPage />} />
                </Switch>
                <BottomNav />
            </BrowserRouter>
        </>
    )
}

export default App
