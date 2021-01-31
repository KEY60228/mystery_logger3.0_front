import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/index'

export const PrivateRoute = (props: any) => {
    const isLogin = useSelector((state: RootState) => !!state.auth.user)

    return isLogin ? <Route {...props} /> : <Redirect to="/login" />
}
