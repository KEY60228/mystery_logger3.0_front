import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { asyncLogin } from '../ajax/auth'
import { RootState } from '../stores/index'
import { Login as LoginTemp } from '../components/templates/Login'
import { setApiStatus } from '../stores/error'

export const Login: FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector((state: RootState) => state.auth.user)
    const apiStatus = useSelector((state: RootState) => state.error.apiStatus)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = () => {
        dispatch(asyncLogin(email, password))
    }

    useEffect(() => {
        if (user) {
            history.push('/')
            dispatch(setApiStatus(null))
        }
    }, [apiStatus])

    return (
        <>
            <LoginTemp
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                login={login}
            />
        </>
    )
}
