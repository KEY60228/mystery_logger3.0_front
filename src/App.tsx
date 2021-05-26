import React, { FC, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { useAppDispatch } from './stores/index'
import { asyncGetCurrentUser } from './ajax/auth'

import { GuestRoute } from './handlers/RouteHandler/GuestRoute'
import { PrivateRoute } from './handlers/RouteHandler/PrivateRoute'
import { Header } from './handlers/Header'
import { TopPage } from './disposable/TopPage/'
import { Login } from './disposable/Login/'
import { PreRegister } from './disposable/PreRegister/'
import { Register } from './disposable/Register/'
import { UserDetail } from './disposable/UserDetail/'
import { ProductDetail } from './disposable/ProductDetail/'
import { ReviewDetail } from './disposable/ReviewDetail/'
import { Timeline } from './disposable/Timeline/'
import { VerifyFailed } from './disposable/VerifyFailed/'
import { SearchByKeywords } from './disposable/SearchByKeywords/'
import { SearchByRankings } from './disposable/SearchByRankings/'
import { SearchByCategories } from './disposable/SearchByCategories/'
import { SearchByOrganizers } from './disposable/SearchByOrganizers'
import { SearchByVenues } from './disposable/SearchByVenues'
import { SearchResult } from './disposable/SearchResult'
import { About } from './disposable/About'
import { Policy } from './disposable/Policy'
import { Kiyaku } from './disposable/Kiyaku'
import { Guideline } from './disposable/Guideline'

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
                    <Route path="/search/keywords" children={<SearchByKeywords />} />
                    <Route path="/search/rankings" children={<SearchByRankings />} />
                    <Route path="/search/organizers" children={<SearchByOrganizers />} />
                    <Route path="/search/venues" children={<SearchByVenues />} />
                    <Route path="/search/categories" children={<SearchByCategories />} />
                    <Route path="/search" children={<SearchResult />} />
                    <Route path="/about" children={<About />} />
                    <Route path="/policy" children={<Policy />} />
                    <Route path="/kiyaku" children={<Kiyaku />} />
                    <Route path="/guideline" children={<Guideline />} />
                    <Route path="/verify-failed" children={<VerifyFailed />} />
                    <Route path="/500" children={<SystemErrorPage />} />
                    <Route children={<NotFoundPage />} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App
