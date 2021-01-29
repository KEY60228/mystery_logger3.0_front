import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'

import { asyncLogin } from '../ajax/auth'
import { useAppDispatch } from '../stores/index'
import { setMessage } from '../stores/error'

import { Login as LoginTemp } from './templates/Login'

export const Login: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = () => {
        dispatch(asyncLogin(email, password))
            .then(result => history.push(`/users/${result.account_id}`))
            .catch(() => {return})
    }

    useEffect(() => {
        dispatch(setMessage(null))
    }, [])

    return (
        <>
            <Helmet>
                <title>ログイン - なぞログ</title>
            </Helmet>
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
