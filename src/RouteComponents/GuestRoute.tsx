import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/index'

export const GuestRoute = (props: any) => {
    const isLogin = useSelector((state: RootState) => !! state.auth.user)

    return isLogin ? <Redirect to="/timeline" /> : <Route {...props} />
}
